#!/bin/bash

# Git Push Helper Script for WHOOP Demo App
# This script helps you push the code to GitHub

echo "🚀 WHOOP Demo App - Git Push Helper"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the project directory"
    echo "Please run this script from the whoop-demo directory"
    exit 1
fi

echo "✅ Project directory found"
echo ""

# Check git status
echo "📋 Current Git Status:"
git status --short
echo ""

# Check if remote is set
echo "🔗 Remote Configuration:"
git remote -v
echo ""

# Show commit history
echo "📝 Recent Commits:"
git log --oneline -5
echo ""

echo "🚀 Ready to push to GitHub!"
echo ""
echo "To complete the push, you have several options:"
echo ""
echo "Option 1: Use GitHub CLI (if installed)"
echo "  gh auth login"
echo "  gh repo create iunikolaev-dot/health_app_ilya --public --source=. --remote=origin --push"
echo ""
echo "Option 2: Use Personal Access Token"
echo "  git push https://YOUR_TOKEN@github.com/iunikolaev-dot/health_app_ilya.git main"
echo ""
echo "Option 3: Use SSH (if SSH key is set up)"
echo "  git remote set-url origin git@github.com:iunikolaev-dot/health_app_ilya.git"
echo "  git push -u origin main"
echo ""
echo "Option 4: Manual upload"
echo "  1. Go to https://github.com/iunikolaev-dot/health_app_ilya"
echo "  2. Create the repository if it doesn't exist"
echo "  3. Upload files manually or use GitHub Desktop"
echo ""
echo "📦 Alternative: Git Bundle created"
echo "  File: whoop-demo.bundle"
echo "  You can upload this bundle to GitHub or use:"
echo "  git clone whoop-demo.bundle temp-repo && cd temp-repo && git push origin main"
echo ""

# Try to push with different methods
echo "🔄 Attempting automatic push..."

# Method 1: Try with token in URL (will prompt for token)
echo "Trying HTTPS push (will prompt for credentials)..."
if git push -u origin main 2>/dev/null; then
    echo "✅ Successfully pushed to GitHub!"
    exit 0
fi

echo "❌ Automatic push failed. Please use one of the manual methods above."
echo ""
echo "💡 Quick setup commands:"
echo "  npm install                    # Install dependencies"
echo "  cp env.local.example .env.local # Copy environment template"
echo "  npm run dev                    # Start development server"
