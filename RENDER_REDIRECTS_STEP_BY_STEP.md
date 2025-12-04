# Step-by-Step: Configure Redirects in Render Dashboard

## Current Location
You're in: **Settings** → **General** section

## Where to Find Redirects

### Option 1: Look for "Redirects and Rewrites"
1. In the **Settings** page, scroll down
2. Look for a section called:
   - **"Redirects and Rewrites"** OR
   - **"Custom Headers"** OR
   - **"Headers"** OR
   - **"Advanced"**

### Option 2: Check Build & Deploy Section
1. Click on **"Build & Deploy"** in the left sidebar
2. Scroll down to find redirect options

### Option 3: If Redirects Not Available
**Render Static Sites** on some plans don't have redirect options in the dashboard.

## Solution: Switch to Web Service

Since redirects might not be available, let's switch to **Web Service** which will use your Express server:

### Steps to Switch:

1. **Note your current settings:**
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Environment: Static

2. **Create New Web Service:**
   - Click **"New +"** button (top right)
   - Select **"Web Service"** (NOT Static Site)
   - Connect your GitHub repository: `Andy-droid958/WintechProject`
   - Render will auto-detect `render.yaml`

3. **Configure (if needed):**
   - **Name**: `wintech-website` (or any name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node server.js` (should auto-detect from render.yaml)

4. **Deploy:**
   - Click **"Create Web Service"**
   - Wait for deployment
   - Your Express server will handle all routes!

5. **Update Custom Domain (if you have one):**
   - Go to **Custom Domains** in new service
   - Add your domain
   - Update DNS if needed

6. **Delete Old Static Site (optional):**
   - After confirming new service works
   - Go to old service → **Settings** → **Delete or suspend**

## Why Web Service is Better

✅ Express server handles all routes automatically  
✅ No need to configure redirects manually  
✅ More reliable for SPAs  
✅ Can add API endpoints later if needed  
✅ Works out of the box with your `server.js`

## Quick Test After Switch

Once Web Service is deployed:
1. Visit: `https://wintechproject.onrender.com/about`
2. **Reload the page** (F5)
3. Should work! ✅

---

**Note:** If you want to keep the Static Site, you'll need to contact Render support or upgrade your plan to get redirect options. Switching to Web Service is the easiest solution.

