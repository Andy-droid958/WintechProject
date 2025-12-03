# Fix for SPA Routing Issue on Render

## Problem
When you reload a page like `/about`, you get "Not Found" because the server doesn't know about client-side routes.

## Solution Applied

### 1. Express Server (Recommended for Web Service)
Created `server.js` that handles all routes and serves `index.html` for React Router.

### 2. Updated Configuration
- ✅ Added `express` to `package.json`
- ✅ Updated `render.yaml` to use `node server.js`
- ✅ `_redirects` file in `public/` (for static sites)
- ✅ `static.json` file (alternative for static sites)

## Deployment Options

### Option A: Web Service (Current Setup)
Your `render.yaml` is configured for Web Service deployment:
- Uses Express server (`server.js`)
- Handles all routes automatically
- More reliable for SPA routing

**To use this:**
1. In Render Dashboard, make sure you're using **Web Service** (not Static Site)
2. The `render.yaml` will be used automatically
3. Deploy and test

### Option B: Static Site (Alternative)
If you prefer Static Site deployment:

1. **In Render Dashboard:**
   - Go to your service settings
   - Find "Redirects and Rewrites" section
   - Add redirect rule: `/*` → `/index.html` (200 status)

2. **Or use the `_redirects` file:**
   - The file in `public/_redirects` should work
   - Format: `/*    /index.html   200`

## Testing After Deployment

1. Deploy to Render
2. Test these URLs:
   - `https://wintechproject.onrender.com/` ✅
   - `https://wintechproject.onrender.com/about` ✅ (reload page)
   - `https://wintechproject.onrender.com/why-us` ✅ (reload page)
   - `https://wintechproject.onrender.com/business` ✅ (reload page)
   - `https://wintechproject.onrender.com/projects` ✅ (reload page)
   - `https://wintechproject.onrender.com/contact` ✅ (reload page)

All should work when you:
- Navigate via links (already works)
- Reload the page (should now work)
- Access directly via URL (should now work)

## If Still Not Working

### Check Render Dashboard:
1. Go to your service in Render
2. Check the **Settings** tab
3. Verify:
   - **Type**: Should be "Web Service" (not Static Site)
   - **Start Command**: Should be `node server.js`
   - **Build Command**: Should be `npm install && npm run build`

### Manual Fix in Render Dashboard:
If using Static Site:
1. Go to Settings → Redirects and Rewrites
2. Add: `/*` → `/index.html` with status `200`
3. Save and redeploy

## Files Changed
- ✅ `server.js` - Express server for SPA routing
- ✅ `package.json` - Added express dependency
- ✅ `render.yaml` - Updated to use Express server
- ✅ `public/_redirects` - For static site fallback
- ✅ `public/static.json` - Alternative static config

## Next Steps
1. Commit and push these changes
2. Render will auto-deploy
3. Test all routes after deployment
4. All pages should work on reload now! 🎉

