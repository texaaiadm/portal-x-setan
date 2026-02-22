# GitHub Push Automation Script
# Run this in PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Push Helper - PowerShell Version" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Change to extension directory
Set-Location "c:\Users\Administrator\Desktop\New folder\Portal\portal ekstensi"

Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 1: Setup Instructions" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Before continuing, you need to:" -ForegroundColor White
Write-Host "1. Go to: https://github.com/new" -ForegroundColor Green
Write-Host "2. Create a new repository" -ForegroundColor Green
Write-Host "3. Name it (example: premium-portal-extension)" -ForegroundColor Green
Write-Host "4. Choose Private or Public" -ForegroundColor Green
Write-Host "5. DO NOT check 'Add README file'" -ForegroundColor Yellow
Write-Host "6. Click 'Create repository'" -ForegroundColor Green
Write-Host ""

Read-Host "Press Enter when you've created the repository"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 2: Enter Your GitHub Info" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$githubUser = Read-Host "Enter your GitHub username"
$repoName = Read-Host "Enter your repository name"

Write-Host ""
Write-Host "You entered:" -ForegroundColor Yellow
Write-Host "  Username: $githubUser" -ForegroundColor White
Write-Host "  Repository: $repoName" -ForegroundColor White
Write-Host "  Full URL: https://github.com/$githubUser/$repoName" -ForegroundColor White
Write-Host ""

$confirm = Read-Host "Is this correct? (Y/N)"
if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "Cancelled. Please run the script again." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 3: Adding GitHub Remote" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    git remote add origin "https://github.com/$githubUser/$repoName.git" 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Remote already exists, removing and re-adding..." -ForegroundColor Yellow
        git remote remove origin
        git remote add origin "https://github.com/$githubUser/$repoName.git"
    }
    Write-Host "✓ Remote added successfully" -ForegroundColor Green
} catch {
    Write-Host "Error adding remote: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 4: Renaming Branch to main" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

git branch -M main
Write-Host "✓ Branch renamed to 'main'" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 5: Pushing to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: GitHub Authentication" -ForegroundColor Yellow
Write-Host "  • Username: your GitHub username" -ForegroundColor White
Write-Host "  • Password: Personal Access Token (NOT your password!)" -ForegroundColor White
Write-Host ""
Write-Host "If you don't have a token:" -ForegroundColor Yellow
Write-Host "  1. Go to: https://github.com/settings/tokens/new" -ForegroundColor Green
Write-Host "  2. Select scope: [x] repo" -ForegroundColor Green
Write-Host "  3. Generate token" -ForegroundColor Green
Write-Host "  4. Copy and use as password below" -ForegroundColor Green
Write-Host ""

Read-Host "Press Enter to continue with push"

git push -u origin main

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✅ SUCCESS!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your repository is now at:" -ForegroundColor White
    Write-Host "https://github.com/$githubUser/$repoName" -ForegroundColor Cyan
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "❌ Push Failed" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "  • Wrong username/token" -ForegroundColor White
    Write-Host "  • Repository doesn't exist" -ForegroundColor White
    Write-Host "  • Token doesn't have 'repo' permission" -ForegroundColor White
}

Write-Host ""
Read-Host "Press Enter to exit"
