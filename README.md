# Premium Portal Extension - Standalone Edition

A Chrome extension for accessing Premium Portal items without tracking and without requiring the Premium Tools Extension.

## 🎯 Features

- ✅ **Standalone Operation** - Works independently without Premium Tools Extension
- ✅ **Privacy-Focused** - All activity tracking disabled
- ✅ **One-Click Access** - Quick access to premium credentials
- ✅ **Auto-Fill Support** - Automatic credential filling
- ✅ **Cookie Management** - Efficient cookie handling

## 🚀 Installation

### Load Unpacked Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `portal ekstensi` folder
5. Extension will appear in your toolbar

### First Time Setup

1. Click the extension icon
2. Login with your Premium Portal credentials
3. Start accessing premium items

## 🔧 Modifications from Original

This is a modified version with the following enhancements:

### 1. Activity Tracking Removal ✅

**What was removed:**
- Tracking requests to `/app-tracker` endpoints
- Activity reporting to `/report-item` 
- Dashboard activity logging at `/dashboard/log-activity`

**How it works:**
- Enhanced Tracking Blocker v2.0
- Intercepts: `fetch()`, `XMLHttpRequest`, and `Axios`
- Returns fake success responses
- No data sent to tracking servers

### 2. Dependency Removal ✅

**Original behavior:**
- Required "Premium Tools Extension" to be installed
- Showed error if Premium Tools was missing

**Modified behavior:**
- Runs completely standalone
- Works even if Premium Tools is uninstalled
- No dependency checks or error messages

**Technical implementation:**
- Override `chrome.storage.local` API
- Override `chrome.management` API
- Inject fake extension object
- Stub all management event listeners

## 📁 Project Structure

```
portal ekstensi/
├── manifest.json           # Extension manifest
├── popup.html             # Extension popup UI
├── popup.100f6462.js      # Popup logic (minified)
├── popup.df89bfed.css     # Popup styles
├── static/
│   └── background/
│       ├── index.js       # Background service worker (MODIFIED)
│       ├── index.js.backup    # Original backup
│       ├── index.js.backup2   # After tracking blocker
│       └── index.js.backup3   # After standalone v1
└── assets/                # Images and icons
```

## 🔒 Privacy & Security

### What This Extension Does

- ✅ Manages cookies for premium sites
- ✅ Auto-fills credentials from Premium Portal
- ✅ Provides quick access to account information
- ❌ **Does NOT** send your activity to tracking servers
- ❌ **Does NOT** require Premium Tools Extension

### Data Handling

- All credential data comes from `premiumportal.id`
- No third-party data collection
- Local storage only for extension settings
- No analytics or tracking

## 🛠️ Development

### Rollback to Original

If you need to restore the original functionality:

```powershell
cd "static/background"
Copy-Item "index.js.backup" "index.js" -Force
```

Then reload the extension in Chrome.

### Modify Tracking Blocker

The tracking blocker code is at the top of `static/background/index.js`:

```javascript
// ============================================================
// ENHANCED TRACKING BLOCKER v2.0
// ...
// ============================================================
```

### Modify Standalone Mode

The standalone mode code follows the tracking blocker:

```javascript
// ============================================================
// ENHANCED STANDALONE MODE v2
// ...
// ============================================================
```

## 🐛 Troubleshooting

### Extension doesn't load

1. Check `chrome://extensions/` for errors
2. Try disabling and re-enabling
3. Reload the extension

### Still shows Premium Tools error

1. Verify you're using the modified version
2. Check background console for `[STANDALONE v2]` logs
3. Clear extension storage: `chrome.storage.local.clear()`
4. Reload extension

### Tracking still happening

1. Open DevTools → Console
2. Look for `[BLOCKED ...]` messages
3. Check Network tab for blocked requests
4. Verify no requests to `/app-tracker`

## 📝 Console Logs

When working correctly, background console should show:

```
[TRACKING BLOCKER v2.0] ✅ All interceptors installed
[STANDALONE v2] ✅ Extension running in complete independence mode
[STANDALONE v2] Premium Tools Extension is NOT required
```

When blocking tracking:

```
[BLOCKED AXIOS] POST /app-tracker/
[BLOCKED FETCH] https://consumer-api.premiumportal.id/...
```

## 🔄 Updates

### Pulling Latest Changes

```bash
git pull origin main
```

### Making Changes

1. Make your modifications
2. Test thoroughly
3. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

## ⚠️ Disclaimers

- This is a modified version for personal use
- Original functionality may differ
- Use at your own discretion
- Not affiliated with Premium Portal official team

## 📄 License

Personal use only. Modifications made for privacy and independence.

## 🤝 Contributing

This is a personal project. If you want to suggest improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📮 Support

For issues with:
- **Original features**: Contact Premium Portal support
- **Modifications**: Check troubleshooting section above

---

**Version**: 2.0 (Standalone Edition)  
**Last Updated**: January 2026  
**Status**: ✅ Active Development
