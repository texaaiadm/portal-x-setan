/* Member Validation System for Premium Portal Extension */

// Configuration
const FIRESTORE_CONFIG = {
    projectId: 'tekno-335f8',
    appId: 'tekno-subscription-app',
    collectionName: 'public_tokens'
};

const API_URL = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_CONFIG.projectId}/databases/(default)/documents/artifacts/${FIRESTORE_CONFIG.appId}/public/data:runQuery`;

const SESSION_KEY = 'portal_member_session';
const SAVED_EMAIL_KEY = 'portal_saved_email';
const SESSION_EXPIRY_HOURS = 24;

// Initialize validation on page load
document.addEventListener('DOMContentLoaded', () => {
    initMemberValidation();
});

/**
 * Initialize member validation system
 */
async function initMemberValidation() {
    // Check if user already has valid session
    const session = await getValidSession();

    if (session) {
        console.log('[MemberValidation] Valid session found:', session.email);
        hideLoginOverlay();
        displayWelcomeMessage(session);
        checkCookieSession();
    } else {
        console.log('[MemberValidation] No valid session, showing login');
        showLoginOverlay();

        // Auto-fill last saved email
        await autoFillSavedEmail();
    }

    setupEventListeners();
}

/**
 * Setup event listeners for login form and logout button
 */
function setupEventListeners() {
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Enter key support
    const emailInput = document.getElementById('emailInput');
    if (emailInput) {
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleLogin(e);
            }
        });
    }
}

/**
 * Handle login form submission
 */
async function handleLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim().toLowerCase();

    if (!email) {
        showError('Silakan masukkan email Anda');
        return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
        showError('Format email tidak valid');
        return;
    }

    // Show loading state
    showLoading(true);
    hideError();

    try {
        // Check member status via Firestore API
        const result = await checkMemberStatus(email);

        if (result.active) {
            // Member is active, save session and grant access
            const sessionData = {
                email: email,
                daysLeft: result.daysLeft,
                endDate: result.endDate,
                validatedAt: new Date().toISOString()
            };

            await saveSession(sessionData);
            await saveSavedEmail(email);

            hideLoginOverlay();
            displayWelcomeMessage(sessionData);

            console.log('[MemberValidation] Login successful:', email);
            checkCookieSession();
        } else {
            // Member is not active
            handleInactiveStatus(result.reason, email);
        }
    } catch (error) {
        console.error('[MemberValidation] Login error:', error);
        showError('Terjadi kesalahan. Periksa koneksi internet atau hubungi admin.');
    } finally {
        showLoading(false);
    }
}

/**
 * Check member status via Firestore REST API
 */
async function checkMemberStatus(email) {
    const queryPayload = {
        structuredQuery: {
            from: [{ collectionId: FIRESTORE_CONFIG.collectionName }],
            where: {
                fieldFilter: {
                    field: { fieldPath: "email" },
                    op: "EQUAL",
                    value: { stringValue: email }
                }
            },
            limit: 1
        }
    };

    console.log('[MemberValidation] Checking status for:', email);

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queryPayload)
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    // Check if member found
    if (!data[0] || !data[0].document) {
        console.log('[MemberValidation] Member not found');
        return { active: false, reason: 'NOT_FOUND' };
    }

    // Extract member data
    const docFields = data[0].document.fields;
    const endDateString = docFields.endDate.stringValue;
    const endDate = new Date(endDateString);
    const now = new Date();

    // Check if subscription is active
    if (endDate > now) {
        const diffTime = endDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        console.log('[MemberValidation] Member active, days left:', diffDays);
        return {
            active: true,
            daysLeft: diffDays,
            endDate: endDateString
        };
    } else {
        console.log('[MemberValidation] Subscription expired');
        return { active: false, reason: 'EXPIRED' };
    }
}

/**
 * Handle inactive member status
 */
function handleInactiveStatus(reason, email) {
    let errorMessage = '';

    switch (reason) {
        case 'NOT_FOUND':
            errorMessage = `
                <strong>Email Tidak Ditemukan</strong><br>
                Email <strong>${email}</strong> tidak terdaftar di sistem.<br>
                <small>Silakan hubungi admin untuk mendaftar.</small>
            `;
            break;
        case 'EXPIRED':
            errorMessage = `
                <strong>Langganan Berakhir</strong><br>
                Langganan Anda sudah habis.<br>
                <small>Silakan perpanjang untuk melanjutkan akses.</small>
            `;
            break;
        default:
            errorMessage = 'Akses ditolak. Silakan hubungi admin.';
    }

    showError(errorMessage);
}

/**
 * Save validated session using localStorage
 */
async function saveSession(sessionData) {
    const sessionWithExpiry = {
        ...sessionData,
        expiresAt: new Date(Date.now() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000).toISOString()
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionWithExpiry));
    console.log('[MemberValidation] Session saved');
}

/**
 * Get valid session (returns null if expired or invalid)
 */
async function getValidSession() {
    const sessionStr = localStorage.getItem(SESSION_KEY);

    if (!sessionStr) {
        return null;
    }

    try {
        const session = JSON.parse(sessionStr);
        const now = new Date();
        const expiresAt = new Date(session.expiresAt);

        // Check if session expired
        if (now > expiresAt) {
            console.log('[MemberValidation] Session expired');
            clearSession();
            return null;
        }

        return session;
    } catch (error) {
        console.error('[MemberValidation] Invalid session data:', error);
        clearSession();
        return null;
    }
}

/**
 * Clear session (logout)
 */
async function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    console.log('[MemberValidation] Session cleared');
}

/**
 * Save email for auto-fill
 */
async function saveSavedEmail(email) {
    localStorage.setItem(SAVED_EMAIL_KEY, email);
    console.log('[MemberValidation] Email saved for auto-fill:', email);
}

/**
 * Get saved email for auto-fill
 */
async function getSavedEmail() {
    return localStorage.getItem(SAVED_EMAIL_KEY) || null;
}

/**
 * Auto-fill saved email into input field
 */
async function autoFillSavedEmail() {
    const savedEmail = await getSavedEmail();
    const emailInput = document.getElementById('emailInput');

    if (savedEmail && emailInput) {
        emailInput.value = savedEmail;
        emailInput.placeholder = 'Last: ' + savedEmail;
        console.log('[MemberValidation] Auto-filled email:', savedEmail);
    }
}

/**
 * Handle logout
 */
async function handleLogout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        await clearSession();
        location.reload();
    }
}

/**
 * Show login overlay
 */
function showLoginOverlay() {
    const overlay = document.getElementById('loginOverlay');
    const mainApp = document.getElementById('main-app');

    if (overlay) {
        overlay.style.display = 'flex';
    }
    if (mainApp) {
        mainApp.style.display = 'none';
    }
}

/**
 * Hide login overlay
 */
function hideLoginOverlay() {
    const overlay = document.getElementById('loginOverlay');
    const mainApp = document.getElementById('main-app');

    if (overlay) {
        overlay.style.display = 'none';
    }
    if (mainApp) {
        mainApp.style.display = 'block';
    }
}

/**
 * Show loading state
 */
function showLoading(show) {
    const loading = document.getElementById('loginLoading');
    const loginBtn = document.getElementById('loginBtn');
    const emailInput = document.getElementById('emailInput');

    if (loading) {
        loading.style.display = show ? 'flex' : 'none';
    }

    if (loginBtn) {
        loginBtn.disabled = show;
        loginBtn.textContent = show ? 'Memverifikasi...' : 'Masuk';
    }

    if (emailInput) {
        emailInput.disabled = show;
    }
}

/**
 * Show error message
 */
function showError(message) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.innerHTML = message;
        errorDiv.style.display = 'block';
    }
}

/**
 * Hide error message
 */
function hideError() {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

/**
 * Display welcome message with member info
 */
function displayWelcomeMessage(session) {
    const userBadge = document.getElementById('userBadge');

    if (userBadge && session.daysLeft) {
        userBadge.textContent = `👤 ${session.email} | ⏳ ${session.daysLeft} hari`;
        userBadge.style.display = 'block';

        // Add warning color if less than 7 days
        if (session.daysLeft <= 7) {
            userBadge.style.borderColor = '#ff9800';
            userBadge.style.color = '#ff9800';
        }
        if (session.daysLeft <= 3) {
            userBadge.style.borderColor = '#ff0000';
            userBadge.style.color = '#ff0000';
        }
    }
}

async function checkCookieSession() {
    if (typeof chrome === 'undefined' || !chrome.runtime || !chrome.runtime.sendMessage) {
        return;
    }
    try {
        chrome.runtime.sendMessage({ name: 'CHECK_COOKIE_SESSION' }, function (response) {
            if (chrome.runtime.lastError) {
                console.warn('[MemberValidation] Cookie check message error:', chrome.runtime.lastError);
                return;
            }
            if (!response) {
                return;
            }
            if (response.ok === false) {
                showAdminContactPopup(response.reason);
            }
        });
    } catch (error) {
        console.error('[MemberValidation] Cookie check error:', error);
    }
}

function showAdminContactPopup(reason) {
    if (document.getElementById('adminPopupOverlay')) {
        return;
    }
    var overlay = document.createElement('div');
    overlay.id = 'adminPopupOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '100000';

    var container = document.createElement('div');
    container.style.background = 'rgba(20, 20, 30, 0.95)';
    container.style.border = '1px solid #00ff88';
    container.style.borderRadius = '16px';
    container.style.padding = '24px';
    container.style.maxWidth = '360px';
    container.style.width = '90%';
    container.style.textAlign = 'center';
    container.style.color = '#ffffff';
    container.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.2)';

    var title = document.createElement('h2');
    title.textContent = 'Session Premium Portal habis';
    title.style.marginBottom = '12px';
    title.style.color = '#00ff88';
    title.style.fontSize = '18px';

    var message = document.createElement('p');
    message.style.fontSize = '14px';
    message.style.marginBottom = '20px';
    message.innerHTML = 'Sesi login Premium Portal sudah tidak aktif. Silakan hubungi admin atau lapor ke grup WhatsApp untuk refresh cookies.';

    var waButton = document.createElement('a');
    waButton.href = 'https://chat.whatsapp.com/GV9iIEPdopi2gnJwsyZoR7';
    waButton.target = '_blank';
    waButton.rel = 'noopener noreferrer';
    waButton.textContent = 'Hubungi Admin via WA';
    waButton.style.display = 'inline-block';
    waButton.style.padding = '10px 18px';
    waButton.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)';
    waButton.style.color = '#ffffff';
    waButton.style.borderRadius = '8px';
    waButton.style.textDecoration = 'none';
    waButton.style.fontWeight = 'bold';
    waButton.style.marginRight = '8px';

    var closeButton = document.createElement('button');
    closeButton.textContent = 'Tutup';
    closeButton.style.padding = '10px 18px';
    closeButton.style.background = '#333333';
    closeButton.style.color = '#ffffff';
    closeButton.style.borderRadius = '8px';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', function () {
        overlay.remove();
    });

    container.appendChild(title);
    container.appendChild(message);
    container.appendChild(waButton);
    container.appendChild(closeButton);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
