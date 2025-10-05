# WHOOP Demo App

A minimal Next.js demo application that demonstrates OAuth2 authentication with WHOOP and fetches raw v2 API data.

## Features

- **Next.js 14+** with TypeScript strict mode and App Router
- **OAuth2 Authentication** with WHOOP API
- **Session Management** using signed HTTP-only cookies
- **WHOOP API Integration** for profile and cycle data
- **Modern UI** with Tailwind CSS

## Prerequisites

1. **Node.js** (v18 or higher)
2. **WHOOP Developer Account** and API credentials
3. **Git** for version control

## Setup Instructions

### 1. WHOOP Developer Dashboard Setup

1. Go to [WHOOP Developer Dashboard](https://developer.whoop.com/)
2. Create a new application
3. Note down your `Client ID` and `Client Secret`
4. Set the redirect URI to: `http://localhost:3000/api/whoop/callback`

### 2. Environment Configuration

1. Copy the environment template:
   ```bash
   cp env.local.example .env.local
   ```

2. Update `.env.local` with your credentials:
   ```env
   WHOOP_CLIENT_ID=your_client_id_here
   WHOOP_CLIENT_SECRET=your_client_secret_here
   WHOOP_REDIRECT_URI=http://localhost:3000/api/whoop/callback
   COOKIE_SECRET=your_random_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

3. Generate a random cookie secret:
   ```bash
   openssl rand -base64 32
   ```

### 3. Installation and Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run type checking:
   ```bash
   npm run type-check
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

### Authentication
- `GET /api/whoop/login` - Initiates OAuth2 flow
- `GET /api/whoop/callback` - Handles OAuth2 callback

### Data Fetching
- `GET /api/whoop/profile` - Fetches user profile data
- `GET /api/whoop/cycle?start=...&end=...` - Fetches cycle data

## Usage Examples

### Using cURL

1. **Authenticate** (redirects to WHOOP):
   ```bash
   curl -L http://localhost:3000/api/whoop/login
   ```

2. **Fetch Profile** (requires authentication):
   ```bash
   curl -H "Cookie: session=your_session_token" \
        http://localhost:3000/api/whoop/profile
   ```

3. **Fetch Cycles** (requires authentication):
   ```bash
   curl -H "Cookie: session=your_session_token" \
        "http://localhost:3000/api/whoop/cycle?start=2025-01-01T00:00:00Z&end=2025-01-08T00:00:00Z"
   ```

### Using the Web Interface

1. Click "Connect WHOOP" to authenticate
2. After successful authentication, use the buttons to:
   - Load Profile: Fetches and displays user profile data
   - Load Cycles: Fetches and displays cycle data for the last 7 days

## Project Structure

```
src/
├── app/
│   ├── api/whoop/
│   │   ├── login/route.ts      # OAuth2 login endpoint
│   │   ├── callback/route.ts   # OAuth2 callback handler
│   │   ├── profile/route.ts    # Profile data endpoint
│   │   └── cycle/route.ts      # Cycle data endpoint
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page component
└── lib/
    ├── session.ts              # Session management utilities
    └── whoop.ts                 # WHOOP API helpers
```

## WHOOP API Details

### Authentication Flow
- **Auth URL**: `https://api.prod.whoop.com/oauth/oauth2/auth`
- **Token URL**: `https://api.prod.whoop.com/oauth/oauth2/token`
- **Scopes**: `read:profile read:cycles`

### API Endpoints Used
- `GET /user/profile/basic` - User profile information
- `GET /cycle?start=...&end=...` - Cycle data with date range

### Data Formats
- **Date Format**: ISO-8601 (e.g., `2025-01-01T00:00:00Z`)
- **Response Format**: JSON

## Security Notes

- Tokens are stored in signed HTTP-only cookies
- Session data is encrypted using JWT
- Environment variables are used for sensitive configuration
- This is a demo application - not suitable for production use

## Troubleshooting

### Common Issues

1. **"Not authenticated" error**:
   - Ensure you've completed the OAuth2 flow
   - Check that cookies are enabled in your browser
   - Verify your session hasn't expired

2. **"Failed to fetch profile/cycles" error**:
   - Check your WHOOP API credentials
   - Verify the redirect URI matches your WHOOP app configuration
   - Ensure your WHOOP app has the correct scopes enabled

3. **TypeScript errors**:
   - Run `npm run type-check` to see detailed error messages
   - Ensure all dependencies are installed correctly

### Development Tips

- Use browser developer tools to inspect network requests
- Check the server console for detailed error logs
- Verify environment variables are loaded correctly

## License

This project is for demonstration purposes only.
