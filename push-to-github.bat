@echo off
echo ========================================
echo GitHub Push Helper Script
echo ========================================
echo.

REM Change to extension directory
cd /d "c:\Users\Administrator\Desktop\New folder\Portal\portal ekstensi"

echo Current directory: %CD%
echo.

echo ========================================
echo Step 1: Setup Instructions
echo ========================================
echo.
echo Before running the push commands, you need to:
echo 1. Create a GitHub repository at: https://github.com/new
echo 2. Name it (example): premium-portal-extension
echo 3. Make it Private or Public (your choice)
echo 4. DO NOT check "Add README file"
echo 5. Click "Create repository"
echo.

pause

echo.
echo ========================================
echo Step 2: Enter Your GitHub Info
echo ========================================
echo.

set /p GITHUB_USER="Enter your GitHub username: "
set /p REPO_NAME="Enter your repository name: "

echo.
echo You entered:
echo   Username: %GITHUB_USER%
echo   Repo: %REPO_NAME%
echo   Full URL: https://github.com/%GITHUB_USER%/%REPO_NAME%
echo.

set /p CONFIRM="Is this correct? (Y/N): "
if /i not "%CONFIRM%"=="Y" (
    echo.
    echo Cancelled. Please run the script again.
    pause
    exit
)

echo.
echo ========================================
echo Step 3: Adding GitHub Remote
echo ========================================
echo.

git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git
if errorlevel 1 (
    echo Warning: Remote might already exist. Trying to remove and re-add...
    git remote remove origin
    git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git
)

echo.
echo ========================================
echo Step 4: Renaming Branch to main
echo ========================================
echo.

git branch -M main

echo.
echo ========================================
echo Step 5: Pushing to GitHub
echo ========================================
echo.
echo NOTE: GitHub will ask for authentication.
echo   - Username: your GitHub username
echo   - Password: your Personal Access Token (NOT your GitHub password)
echo.
echo If you don't have a token, create one at:
echo https://github.com/settings/tokens/new
echo   - Select scope: repo
echo   - Copy the token and use it as password
echo.

pause

git push -u origin main

echo.
echo ========================================
echo Done!
echo ========================================
echo.
echo If successful, your repository is now at:
echo https://github.com/%GITHUB_USER%/%REPO_NAME%
echo.

pause
