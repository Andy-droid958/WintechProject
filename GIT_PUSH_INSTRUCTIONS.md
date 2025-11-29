# Git Push Instructions

Follow these steps to push your code to GitHub:

## Prerequisites
1. Install Git if not already installed: https://git-scm.com/download/win
2. Make sure you're authenticated with GitHub (you may need to set up SSH keys or use HTTPS)

## Steps to Push Code

Open PowerShell or Command Prompt in the project directory (`D:\Wintech`) and run these commands:

### 1. Initialize Git Repository (if not already done)
```bash
git init
```

### 2. Add the Remote Repository
```bash
git remote add origin https://github.com/Andy-droid958/WintechProject.git
```

### 3. Add All Files
```bash
git add .
```

### 4. Create Initial Commit
```bash
git commit -m "Initial commit: Wintech Project website"
```

### 5. Set Main Branch (if needed)
```bash
git branch -M main
```

### 6. Push to GitHub
```bash
git push -u origin main
```

## If You Get Authentication Errors

If you encounter authentication issues, you have two options:

### Option A: Use Personal Access Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `repo` permissions
3. When prompted for password, use the token instead

### Option B: Use GitHub Desktop
1. Download GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. File → Add Local Repository → Select `D:\Wintech`
4. Click "Publish repository" and select the remote repository

## After Pushing

Once pushed, you can:
1. View your code at: https://github.com/Andy-droid958/WintechProject
2. Deploy to Render.com using the instructions in `RENDER_DEPLOYMENT.md`

