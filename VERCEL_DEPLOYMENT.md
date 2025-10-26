# Vercel Deployment Guide for WHOOP Demo App

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/dashboard
   - Sign in with your GitHub account

2. **Import Project**:
   - Click "New Project"
   - Import from GitHub: `iunikolaev-dot/health_app_ilya`
   - Vercel will automatically detect it's a Next.js app

3. **Configure Environment Variables**:
   ```
   WHOOP_CLIENT_ID=your_client_id_here
   WHOOP_CLIENT_SECRET=your_client_secret_here
   WHOOP_REDIRECT_URI=https://your-app-name.vercel.app/api/whoop/callback
   COOKIE_SECRET=your_random_secret_here
   NEXTAUTH_URL=https://your-app-name.vercel.app
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete

### Option 2: Deploy via CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd "/Users/ilyanikolaev/Desktop/WHOOP app/whoop-demo"
   vercel
   ```

4. **Set Environment Variables**:
   ```bash
   vercel env add WHOOP_CLIENT_ID
   vercel env add WHOOP_CLIENT_SECRET
   vercel env add WHOOP_REDIRECT_URI
   vercel env add COOKIE_SECRET
   vercel env add NEXTAUTH_URL
   ```

## 🔧 Important Configuration Updates

### 1. Update WHOOP App Settings
After deployment, update your WHOOP developer app:
- **Redirect URI**: Change from `http://localhost:3000/api/whoop/callback` to `https://your-app-name.vercel.app/api/whoop/callback`

### 2. Environment Variables
Make sure to set these in Vercel dashboard:
- `WHOOP_CLIENT_ID`: Your WHOOP client ID
- `WHOOP_CLIENT_SECRET`: Your WHOOP client secret
- `WHOOP_REDIRECT_URI`: Your Vercel app URL + `/api/whoop/callback`
- `COOKIE_SECRET`: Random string for cookie signing
- `NEXTAUTH_URL`: Your Vercel app URL

### 3. Production Considerations
- ✅ HTTPS is automatically handled by Vercel
- ✅ Environment variables are secure
- ✅ Automatic deployments on Git push
- ✅ Global CDN for fast loading

## 🧪 Testing the Deployment

1. **Visit your Vercel URL**
2. **Click "Connect WHOOP"**
3. **Complete OAuth flow**
4. **Test data fetching**

## 📱 Vercel Features You Get

- **Automatic HTTPS**
- **Global CDN**
- **Automatic deployments** (when you push to GitHub)
- **Environment variable management**
- **Analytics and monitoring**
- **Custom domains** (if you want)

## 🔗 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Repository**: https://github.com/iunikolaev-dot/health_app_ilya
- **Vercel Documentation**: https://vercel.com/docs




