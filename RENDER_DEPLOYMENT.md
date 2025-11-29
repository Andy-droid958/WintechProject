# Deploying to Render.com

This guide will help you deploy your Wintech Project website to Render.com.

## Option 1: Static Site (Recommended - Free Tier Available)

1. **Push your code to GitHub/GitLab/Bitbucket**
   - Make sure all your code is committed and pushed to your repository

2. **Create a new Static Site on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Static Site"
   - Connect your repository

3. **Configure the Static Site:**
   - **Name**: `wintech-website` (or your preferred name)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: `Static`

4. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy your site
   - Your site will be available at `https://your-site-name.onrender.com`

## Option 2: Web Service (If you need server-side features)

If you prefer to use a Web Service instead:

1. **Create a new Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your repository

2. **Configure the Web Service:**
   - **Name**: `wintech-website`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s dist -l 10000`
   - **Plan**: Choose your preferred plan (Free tier available)

3. **Add Environment Variables (if needed)**
   - None required for this project

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your site

## Important Notes

- The `render.yaml` file is included for Web Service deployment
- For Static Site deployment, you can ignore the `render.yaml` file
- Make sure your repository is public or connected to Render
- Render will automatically rebuild on every push to your main branch

## Custom Domain

After deployment, you can add a custom domain:
1. Go to your service settings
2. Click "Custom Domains"
3. Add your domain and follow the DNS configuration instructions

