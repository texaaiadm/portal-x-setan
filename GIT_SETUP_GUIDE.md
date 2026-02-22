# Setup Git Repository untuk Portal Extension

## ✅ Git Repository Initialized!

Repository telah di-setup dengan:
- `.gitignore` untuk exclude backup files dan temporary files
- `README.md` comprehensive dengan dokumentasi lengkap
- Initial commit dengan semua modified files

---

## 📝 Next Steps: Connect ke GitHub

### 1. Create GitHub Repository

1. Buka [github.com](https://github.com)
2. Login ke account Anda
3. Click tombol **"+"** (kanan atas) → **New repository**
4. Isi form:
   - **Repository name**: `premium-portal-extension` (atau nama lain)
   - **Description**: `Standalone Premium Portal Extension without tracking`
   - **Visibility**: 
     - `Private` (recommended untuk personal use)
     - `Public` (jika ingin share)
   - ❌ **Jangan** centang "Initialize with README" (kita sudah punya)
5. Click **Create repository**

### 2. Connect Local Repo ke GitHub

Setelah create repository, GitHub akan menampilkan instruksi. Copy dan run command ini:

```bash
cd "c:\Users\Administrator\Desktop\New folder\Portal\portal ekstensi"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

**Ganti**:
- `YOUR_USERNAME` dengan GitHub username Anda
- `YOUR_REPO_NAME` dengan nama repository yang Anda buat

### 3. Verify Upload

1. Refresh halaman GitHub repository
2. Anda akan melihat semua files ter-upload
3. README.md akan otomatis ditampilkan

---

## 🔄 Workflow untuk Update Kedepan

### Membuat Perubahan

```bash
# 1. Edit files yang ingin diubah
# 2. Add changes ke staging
git add .

# 3. Commit dengan message yang jelas
git commit -m "Descriptive message about changes"

# 4. Push ke GitHub
git push origin main
```

### Contoh Update Scenarios

#### Update 1: Fix Bug
```bash
git add static/background/index.js
git commit -m "Fix: Resolve tracking blocker issue with new API endpoint"
git push origin main
```

#### Update 2: Add Feature
```bash
git add .
git commit -m "Feature: Add dark mode support to popup UI"
git push origin main
```

#### Update 3: Update Documentation
```bash
git add README.md
git commit -m "Docs: Update troubleshooting section with new solutions"
git push origin main
```

---

## 📊 Best Practices

### Commit Messages

Format yang bagus:
```
Type: Short description

Longer explanation if needed
```

Types:
- `Feature:` - New feature
- `Fix:` - Bug fix
- `Docs:` - Documentation changes
- `Refactor:` - Code refactoring
- `Style:` - Formatting changes
- `Test:` - Adding tests
- `Chore:` - Maintenance tasks

### Branching (Optional - untuk development yang lebih complex)

```bash
# Create new branch untuk feature
git checkout -b feature/new-tracking-blocker

# Buat changes...
git add .
git commit -m "Feature: Enhanced tracking blocker v3"

# Push branch
git push origin feature/new-tracking-blocker

# Merge ke main (via GitHub PR atau locally)
git checkout main
git merge feature/new-tracking-blocker
git push origin main
```

---

## 🔍 Useful Git Commands

### Check Status
```bash
git status
```
Shows which files changed

### View History
```bash
git log --oneline
```
Shows commit history

### View Changes
```bash
git diff
```
Shows uncommitted changes

### Undo Changes
```bash
# Discard changes to specific file
git checkout -- filename.js

# Discard all uncommitted changes
git reset --hard
```

### Pull Latest from GitHub
```bash
git pull origin main
```

---

## 📂 What's Included in Repo

### Committed Files
✅ All extension files (modified)
✅ README.md
✅ .gitignore
✅ manifest.json
✅ popup files
✅ static/background/index.js (modified version)

### Excluded (via .gitignore)
❌ Backup files (*.backup, *.backup2, *.backup3)
❌ Temporary/development scripts
❌ Node modules
❌ OS-specific files

---

## 🔐 Security Considerations

### For Private Repository
- ✅ Safe to include all files
- ✅ No sensitive credentials in code
- ✅ Only you can see the repo

### For Public Repository
⚠️ **Caution**: 
- Remove any personal API keys
- Remove any hardcoded credentials
- Review all files before pushing
- Consider if you want to share modifications publicly

---

## 🎯 Quick Reference

### Initial Setup (Done ✅)
```bash
git init
git add .
git commit -m "Initial commit"
```

### Connect to GitHub (Do This Next)
```bash
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

### Regular Updates
```bash
git add .
git commit -m "Update: description"
git push origin main
```

---

## 📞 Need Help?

### Git Issues
- Check: `git status` untuk lihat state
- Error messages usually descriptive
- Google error message untuk solutions

### GitHub Issues
- Verify remote URL: `git remote -v`
- Check authentication (token/SSH)
- GitHub docs: https://docs.github.com

---

**Status**: ✅ Git Initialized  
**Next Step**: Create GitHub repo and push  
**Ready to Push**: Yes
