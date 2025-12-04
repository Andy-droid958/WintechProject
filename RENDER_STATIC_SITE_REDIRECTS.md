# Fix SPA Routing for Render Static Site

## Problem
Your site is deployed as a **Static Site** on Render, not a Web Service. This means the Express server (`server.js`) is not running, so routes like `/about` show "Not Found" on refresh.

## Solution: Configure Redirects in Render Dashboard

### Step-by-Step Instructions:

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Sign in to your account

2. **Select Your Service**
   - Click on your `wintech-website` service

3. **Go to Settings**
   - Click on **Settings** in the left sidebar

4. **Find "Redirects and Rewrites" Section**
   - Scroll down to find this section
   - If you don't see it, look for "Custom Headers" or "Environment" sections

5. **Add Redirect Rule**
   - Click **Add Redirect** or **Add Rule**
   - Configure as follows:
     - **Source Path**: `/*`
     - **Destination**: `/index.html`
     - **Status Code**: `200` (not 301 or 302)
     - **Force**: Optional (check if available)

6. **Save Changes**
   - Click **Save** or **Update**
   - Render will automatically redeploy

7. **Wait for Redeployment**
   - Check the **Events** or **Logs** tab
   - Wait for "Your site is live 🎉" message

8. **Test**
   - Try reloading: `https://wintechproject.onrender.com/about`
   - Should work now!

## Alternative: Switch to Web Service

If redirects don't work or you prefer Web Service:

1. **Delete Current Static Site** (optional - you can keep both)
2. **Create New Web Service**
   - Click **New +** → **Web Service**
   - Connect your GitHub repository
   - Render will use `render.yaml` automatically
   - The Express server will run

## Quick Check: Which Type Are You Using?

**Static Site:**
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- No Start Command
- Message: "Your site is live 🎉"

**Web Service:**
- Build Command: `npm install && npm run build`
- Start Command: `node server.js`
- Message: "Your service is live"

## If Redirects Section Not Available

Some Render plans might not have the redirects option. In that case:

1. **Switch to Web Service** (recommended)
   - Create new Web Service
   - Use the same repository
   - Render will auto-detect `render.yaml`

2. **Or use a different hosting** that supports SPA routing:
   - Netlify (supports `_redirects` file)
   - Vercel (automatic SPA support)
   - Cloudflare Pages (supports redirects)

## Testing After Fix

Test all these URLs with **reload** (F5):
- ✅ `https://wintechproject.onrender.com/`
- ✅ `https://wintechproject.onrender.com/about`
- ✅ `https://wintechproject.onrender.com/why-us`
- ✅ `https://wintechproject.onrender.com/business`
- ✅ `https://wintechproject.onrender.com/projects`
- ✅ `https://wintechproject.onrender.com/contact`

All should work on direct access AND reload!

