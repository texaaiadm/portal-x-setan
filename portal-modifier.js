/* Premium Portal Header Modifier - premiumportal.id */

(function () {
    'use strict';

    const EXTENSION_URL = (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL)
        ? chrome.runtime.getURL('index.html')
        : 'chrome-extension://ggebclcdhkfbeeknkkkajhmmkgojajcc/index.html';
    const NOT_LOGIN_URL = EXTENSION_URL + '#/not-login';
    const WARUNG_URL = 'https://hayo.teknoaiglobal.com/';

    function shouldRedirectToWarung(href) {
        try {
            const base = window.location && window.location.origin ? window.location.origin : 'https://premiumportal.id';
            const url = new URL(href || window.location.href, base);
            if (!url.hostname || url.hostname.indexOf('premiumportal.id') === -1) {
                return false;
            }
            const path = url.pathname || '';
            if (path === '/dashboard' || path.indexOf('/dashboard') === 0) {
                return true;
            }
        } catch (e) {
        }
        return false;
    }

    if (shouldRedirectToWarung(window.location.href)) {
        window.location.replace(WARUNG_URL);
        return;
    }

    if (window.location && window.location.pathname && window.location.pathname.indexOf('/auth/login') === 0) {
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL) {
            window.location.replace(NOT_LOGIN_URL);
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                showLoginBlockedOverlay();
            });
        }
        return;
    }

    if (window.history && typeof window.history.pushState === 'function') {
        const originalPushState = window.history.pushState;
        window.history.pushState = function (state, title, url) {
            const result = originalPushState.apply(this, arguments);
            if (shouldRedirectToWarung(url)) {
                window.location.replace(WARUNG_URL);
            }
            return result;
        };

        const originalReplaceState = window.history.replaceState;
        window.history.replaceState = function (state, title, url) {
            const result = originalReplaceState.apply(this, arguments);
            if (shouldRedirectToWarung(url)) {
                window.location.replace(WARUNG_URL);
            }
            return result;
        };

        window.addEventListener('popstate', function () {
            if (shouldRedirectToWarung(window.location.href)) {
                window.location.replace(WARUNG_URL);
            }
        });
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('[Premium Portal] Initializing header modifier...');

        hideSpecificHeader();
        hideDashboardSidebar();
        hideTopHeaderAndSupport();
        addCustomHeader();
        modifyHomeButton();
        observeDOM();
    }

    function showLoginBlockedOverlay() {
        document.documentElement.style.background = '#000000';
        document.body.innerHTML = '';

        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0, 0, 0, 0.9)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '2147483647';
        overlay.style.padding = '20px';
        overlay.style.boxSizing = 'border-box';

        const container = document.createElement('div');
        container.style.background = 'rgba(20, 20, 30, 0.95)';
        container.style.border = '1px solid #00ff88';
        container.style.borderRadius = '16px';
        container.style.padding = '24px';
        container.style.maxWidth = '360px';
        container.style.width = '100%';
        container.style.textAlign = 'center';
        container.style.color = '#ffffff';
        container.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.4)';

        const title = document.createElement('h2');
        title.textContent = 'Session Premium Portal habis';
        title.style.marginBottom = '12px';
        title.style.color = '#00ff88';
        title.style.fontSize = '18px';

        const message = document.createElement('p');
        message.style.fontSize = '14px';
        message.style.marginBottom = '20px';
        message.innerHTML = 'Halaman login Premium Portal diblokir oleh ekstensi.<br>Silakan hubungi admin atau lapor ke grup WhatsApp untuk refresh cookies.';

        const waButton = document.createElement('a');
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

        container.appendChild(title);
        container.appendChild(message);
        container.appendChild(waButton);
        overlay.appendChild(container);
        document.body.appendChild(overlay);
    }

    function hideSpecificHeader() {
        try {
            const xpathsToHide = [
                '/html/body/div[4]/header',
                '/html/body/div[2]/div[3]/div/div/div/div[1]/div[2]/div',
                '/html/body/div[2]/div[3]/div/div/div/div[1]/div[2]/div/div/svg',
                '/html/body/div[2]/div[3]/div/div/div/div[1]/div[2]/div/div/svg/path',
                '/html/body/div[4]/ul'
            ];

            xpathsToHide.forEach((xpath, index) => {
                const result = document.evaluate(
                    xpath,
                    document,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                );

                if (result.singleNodeValue) {
                    result.singleNodeValue.style.cssText = 'display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important;';
                    console.log('[Premium Portal] Element ' + (index + 1) + ' hidden');
                }
            });

            const style = document.createElement('style');
            style.textContent = `
                body > div:nth-of-type(4) > header,
                body > div:nth-of-type(4) > ul {
                    display: none !important;
                    visibility: hidden !important;
                    height: 0 !important;
                    overflow: hidden !important;
                }
                
                [data-slot="sheet-trigger"],
                div[aria-haspopup="dialog"].w-6.h-6,
                div.outline-none.relative.w-6.h-6.flex.items-center.justify-center[aria-haspopup="dialog"],
                div.outline-none.relative.w-6.h-6.flex.items-center.justify-center,
                body > div:nth-of-type(2) > div:nth-of-type(3) > div > div > div > div:first-child > div:nth-of-type(2) > div,
                body > div:nth-of-type(2) > div:nth-of-type(3) > div > div > div > div:first-child > div:nth-of-type(2),
                body > div:nth-of-type(2) > div:nth-of-type(3) > div > div > div > div:first-child > div:nth-of-type(2) > div > div > svg,
                body > div:nth-of-type(2) > div:nth-of-type(3) > div > div > div > div:first-child > div:nth-of-type(2) > div > div > svg path {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                    width: 0 !important;
                    height: 0 !important;
                }
                
                svg path[d*="400 145.49"],
                svg path[d*="366.51 112"],
                svg path[d*="M32 96v64h448V96"],
                svg path[d*="M32 96v64h448"] {
                    display: none !important;
                    visibility: hidden !important;
                }
            `;
            document.head.appendChild(style);
        } catch (e) {
            console.error('[Premium Portal] Error hiding header:', e);
        }
    }

    function hideDashboardSidebar() {
        try {
            const sidebar = document.querySelector('div.flex-1.space-y-4.px-4.py-6');
            if (sidebar) {
                sidebar.style.display = 'none';
                sidebar.style.visibility = 'hidden';
                sidebar.style.height = '0';
                sidebar.style.overflow = 'hidden';
            }

            const style = document.createElement('style');
            style.textContent = `
                div.flex-1.space-y-4.px-4.py-6,
                a[href="/dashboard/subscription"],
                a[href="/dashboard"],
                a[href="/dashboard/tutorial"],
                a[href="/dashboard/payment-history"],
                a[href="/dashboard/request-app"],
                a[href="/dashboard/feedback"],
                a[href="/dashboard/log-activity"],
                a[href="/dashboard/profile"],
                a[href="https://reseller.premiumportal.id"] {
                    display: none !important;
                    visibility: hidden !important;
                    height: 0 !important;
                    overflow: hidden !important;
                }
            `;
            document.head.appendChild(style);
        } catch (e) {
            console.error('[Premium Portal] Error hiding sidebar:', e);
        }
    }

    function hideTopHeaderAndSupport() {
        try {
            const header = document.querySelector('header.sticky.top-0');
            if (header) {
                header.style.display = 'none';
                header.style.visibility = 'hidden';
                header.style.height = '0';
                header.style.overflow = 'hidden';
            }

            const supportImg = document.querySelector('img[alt="Contact Support"][src*="support_ramadhan"]');
            if (supportImg) {
                supportImg.style.display = 'none';
                supportImg.style.visibility = 'hidden';
                supportImg.style.height = '0';
                supportImg.style.overflow = 'hidden';
            }

            const style = document.createElement('style');
            style.textContent = `
                header.sticky.top-0,
                img[alt="Contact Support"][src*="support_ramadhan"] {
                    display: none !important;
                    visibility: hidden !important;
                    height: 0 !important;
                    overflow: hidden !important;
                }
            `;
            document.head.appendChild(style);
        } catch (e) {
            console.error('[Premium Portal] Error hiding header/support:', e);
        }
    }

    function addCustomHeader() {
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.id = 'portal-header-overlay';
        overlay.innerHTML = `
            <style>
                #portal-header-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 50px;
                    background: rgba(0, 0, 0, 0.95);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 20px;
                    border-bottom: 1px solid #00ff88;
                    box-sizing: border-box;
                }
                
                #portal-header-overlay .portal-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                #portal-header-overlay .portal-logo {
                    width: 100px;
                    height: 40px;
                    border-radius: 4px;
                    border: 2px solid #00ff88;
                    animation: portalGlow 2s ease-in-out infinite;
                    object-fit: cover;
                }
                
                @keyframes portalGlow {
                    0%, 100% { box-shadow: 0 0 8px rgba(0, 255, 136, 0.4); }
                    50% { box-shadow: 0 0 15px rgba(0, 255, 136, 0.8); }
                }
                
                #portal-header-overlay .portal-title {
                    color: #00ff88;
                    font-size: 16px;
                    font-weight: bold;
                    font-family: 'Segoe UI', Tahoma, sans-serif;
                }
                
                #portal-header-overlay .portal-home-btn {
                    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                    color: #fff;
                    padding: 8px 20px;
                    border: none;
                    border-radius: 6px;
                    font-weight: bold;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-family: 'Segoe UI', Tahoma, sans-serif;
                }
                
                #portal-header-overlay .portal-home-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(37, 211, 102, 0.5);
                }
                
                /* Push page content down */
                body {
                    padding-top: 50px !important;
                }
            </style>
            
            <div class="portal-left">
                <img class="portal-logo" src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDVqODllNmwzN283OW10NTAyMWJkdmpncWpxemYycnVlNGNvM3l2dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/p2osL7gT4jE7bLHqRu/giphy.gif" alt="Logo">
                <span class="portal-title">Setan Tools</span>
            </div>
            
            <button class="portal-home-btn" id="portalHomeBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
            </button>
        `;

        document.body.insertBefore(overlay, document.body.firstChild);

        // Add click handler for WhatsApp button
        document.getElementById('portalHomeBtn').addEventListener('click', function (e) {
            e.preventDefault();
            window.open('https://chat.whatsapp.com/GV9iIEPdopi2gnJwsyZoR7', '_blank');
        });

        console.log('[Premium Portal] Custom header added');
    }

    function modifyHomeButton() {
        // Find all links/buttons that might be HOME
        document.querySelectorAll('a, button').forEach(el => {
            const text = el.textContent.trim().toUpperCase();
            if (text === 'HOME' || text.includes('HOME')) {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = EXTENSION_URL;
                });
            }
        });
    }

    function observeDOM() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    hideSpecificHeader();
                    hideDashboardSidebar();
                    hideTopHeaderAndSupport();
                    modifyHomeButton();
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();
