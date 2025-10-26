#!/bin/bash

# Final Git Push Script
# This script will help you push the WHOOP demo app to GitHub

echo "🎯 WHOOP Demo App - Final Push Script"
echo "====================================="
echo ""

# Check if GitHub token is provided
if [ -n "$GITHUB_TOKEN" ]; then
    echo "🔑 Using GitHub token for authentication..."
    git remote set-url origin https://$GITHUB_TOKEN@github.com/iunikolaev-dot/health_app_ilya.git
    git push -u origin main
    if [ $? -eq 0 ]; then
        echo "✅ Successfully pushed to GitHub!"
        echo "🔗 Repository: https://github.com/iunikolaev-dot/health_app_ilya"
        exit 0
    fi
fi

echo "📋 Manual Push Instructions:"
echo ""
echo "Since automatic push requires authentication, here are your options:"
echo ""
echo "1. 🌐 Create repository on GitHub.com:"
echo "   - Go to https://github.com/iunikolaev-dot"
echo "   - Click 'New repository'"
echo "   - Name: health_app_ilya"
echo "   - Make it public"
echo "   - Don't initialize with README (we already have one)"
echo ""
echo "2. 🔑 Push with Personal Access Token:"
echo "   - Get a token from: https://github.com/settings/tokens"
echo "   - Run: git push https://YOUR_TOKEN@github.com/iunikolaev-dot/health_app_ilya.git main"
echo ""
echo "3. 📦 Use Git Bundle (already created):"
echo "   - File: whoop-demo.bundle"
echo "   - Upload to GitHub or use GitHub Desktop"
echo ""
echo "4. 🖥️ Use GitHub Desktop:"
echo "   - Open GitHub Desktop"
echo "   - Add existing repository"
echo "   - Select this folder"
echo "   - Publish to GitHub"
echo ""

# Show current status
echo "📊 Current Status:"
echo "✅ All code committed locally"
echo "✅ Repository configured"
echo "✅ Ready for push"
echo ""
echo "📁 Project location: $(pwd)"
echo "🔗 Target repository: https://github.com/iunikolaev-dot/health_app_ilya.git"
echo ""
echo "🚀 Next steps after pushing:"
echo "1. npm install"
echo "2. cp env.local.example .env.local"
echo "3. Edit .env.local with your WHOOP credentials"
echo "4. npm run dev"




