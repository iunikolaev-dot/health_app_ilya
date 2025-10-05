#!/bin/bash

# Vercel Deployment Script for WHOOP Demo App

echo "🚀 WHOOP Demo App - Vercel Deployment"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the project directory"
    echo "Please run this script from the whoop-demo directory"
    exit 1
fi

echo "✅ Project directory found"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Vercel CLI"
        echo "Please install manually: npm install -g vercel"
        exit 1
    fi
fi

echo "✅ Vercel CLI ready"
echo ""

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔑 Please login to Vercel:"
    vercel login
fi

echo "✅ Vercel authentication ready"
echo ""

echo "🚀 Starting deployment..."
echo ""

# Deploy to Vercel
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Update your WHOOP app redirect URI to your Vercel URL"
    echo "2. Set environment variables in Vercel dashboard"
    echo "3. Test the deployed app"
    echo ""
    echo "🔗 Vercel Dashboard: https://vercel.com/dashboard"
else
    echo "❌ Deployment failed"
    echo "Please check the error messages above"
fi
