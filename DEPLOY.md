# 🚀 Deployment Guide - Step by Step

## Prerequisites Checklist

- [ ] You have a GitHub account
- [ ] You have Git installed (`git --version`)
- [ ] You have Node.js 18+ installed (`node -v`)
- [ ] You have the project files

## Step 1: Push to GitHub

### Copy the project files to your machine

If you're on the same machine, files are in `/home/claude/gorkhalitimes/`

If you need to transfer, download the folder from Claude.

### Navigate to the project

```bash
cd /path/to/gorkhalitimes
```

### Initialize Git and push

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init

# Add all files
git add .

# Check what will be committed
git status

# Commit
git commit -m "Initial commit: Gorkha AI app with working language toggle"

# Add your GitHub repo as remote
git remote add origin https://github.com/ripplewave2025/Gorkhalitimes.git

# Check remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**If you get authentication errors:**

```bash
# You may need to use a Personal Access Token
# Go to: GitHub → Settings → Developer settings → Personal access tokens
# Generate a token with "repo" permissions
# Use it as your password when pushing
```

## Step 2: Deploy to Vercel

### Method A: Through Vercel Website (Easiest)

1. **Go to Vercel**
   - Open https://vercel.com
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Your Repository**
   - Click "Add New Project"
   - You'll see a list of your GitHub repos
   - Find "Gorkhalitimes"
   - Click "Import"

3. **Configure Project**
   ```
   Framework Preset: Next.js (should be auto-detected)
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```
   Leave everything as default - Vercel knows Next.js!

4. **Click "Deploy"**
   - Vercel will:
     - Install dependencies
     - Build your app
     - Deploy to a URL
   - Takes 2-3 minutes

5. **Get Your URL**
   - You'll get a URL like: `https://gorkhalitimes.vercel.app`
   - Share it with anyone!

### Method B: Through CLI (For Developers)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Step 3: Custom Domain (Optional)

### On Vercel Dashboard:

1. Go to your project
2. Click "Settings"
3. Click "Domains"
4. Add your domain (e.g., `gorkhaai.com`)
5. Follow DNS instructions
6. Wait for propagation (5-60 minutes)

## Step 4: Set Up Auto-Deploy

**Already done!** Vercel automatically:
- Deploys every push to `main` branch
- Creates preview deployments for pull requests
- Gives you a unique URL for each deployment

## Troubleshooting

### "Failed to compile"

```bash
# Locally, make sure it builds
npm run build

# If it fails, check the error message
# Usually it's a TypeScript issue
```

### "Module not found"

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "Push rejected"

```bash
# If you're pushing to an existing repo
git pull origin main --rebase
git push origin main
```

### "Vercel deployment failed"

1. Check build logs in Vercel dashboard
2. Make sure `package.json` is correct
3. Try deploying from your local machine:
   ```bash
   vercel --prod
   ```

## Verification Checklist

After deployment, test these:

- [ ] Homepage loads (swipeable cards)
- [ ] Language toggle works (EN ↔ नेपाली ↔ हिंदी)
- [ ] Chat page loads
- [ ] Voice page loads
- [ ] Bottom navigation works
- [ ] Mobile responsive (test on phone)
- [ ] All text changes when switching language

## What's Next?

Your app is live! Now you can:

1. **Share the URL** with friends/family
2. **Get feedback** - what do they like?
3. **Add real features**:
   - Connect Claude API
   - Add real news RSS feeds
   - Implement voice recognition
4. **Monitor usage** with Vercel Analytics

## Quick Update Workflow

```bash
# 1. Make changes to code
# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Added new feature"

# 4. Push to GitHub
git push

# 5. Vercel auto-deploys (check dashboard)
# Done! Live in 2-3 minutes
```

## Cost Breakdown

- **GitHub**: Free
- **Vercel**: 
  - Hobby (Free): Perfect for MVP
    - Unlimited deployments
    - 100GB bandwidth/month
    - Automatic HTTPS
  - Pro ($20/mo): When you get users
    - More bandwidth
    - Team features
    - Better analytics

## Need Help?

- Vercel Discord: https://discord.gg/vercel
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Or ask me (Claude)!

---

🎉 **Congratulations on deploying your first app!**
