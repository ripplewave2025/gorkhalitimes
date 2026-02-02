# Gorkha AI - Swipeable News App

A modern, AI-powered news platform for the Gorkha diaspora with swipeable cards, chat interface, and voice mode in English, Nepali, and Hindi.

## ✨ Features

- **Swipeable News Feed** - TikTok-style news cards
- **AI Chat** - Discuss articles and ask questions
- **Voice Mode** - Hands-free news consumption
- **Tri-lingual** - Full support for English, नेपाली, and हिंदी
- **Real-time Language Switching** - Change language and see content update instantly
- **Mobile-First Design** - Optimized for 96% mobile users
- **Dark Theme** - Easy on the eyes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ripplewave2025/Gorkhalitimes.git
   cd Gorkhalitimes
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Vercel (Recommended)

### Option 1: Deploy from GitHub

1. **Push your code to GitHub** (see instructions below)

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub

3. **Import Repository**
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

4. **Configure & Deploy**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-filled)
   - Click "Deploy"

5. **Done!** 
   - Your app will be live at `https://your-project.vercel.app`
   - Vercel automatically deploys on every push to main branch

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 📤 Push to GitHub

### First Time Setup

```bash
# Navigate to your project
cd /path/to/gorkhalitimes

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Gorkha AI news app"

# Add remote repository
git remote add origin https://github.com/ripplewave2025/Gorkhalitimes.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Future Updates

```bash
# After making changes
git add .
git commit -m "Description of changes"
git push
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Deployment**: Vercel
- **Future**: Claude API, ElevenLabs TTS

## 📁 Project Structure

```
gorkhalitimes/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage (feed)
│   ├── chat/              # Chat interface
│   ├── voice/             # Voice mode
│   ├── explore/           # Explore page
│   └── settings/          # Settings page
├── components/            # Reusable components
│   ├── SwipeCard.tsx     # News card
│   ├── LanguageToggle.tsx
│   └── BottomNav.tsx
├── lib/                   # Utilities
│   ├── translations.ts   # Language data
│   └── LanguageContext.tsx
├── types/                 # TypeScript types
├── public/                # Static assets
└── package.json
```

## 🌐 Language Support

The app fully supports three languages:

- **English** (`en`)
- **नेपाली** (`ne`) 
- **हिंदी** (`hi`)

Language preference is saved to localStorage and persists across sessions.

## 🎨 Customization

### Adding New News Articles

Edit `lib/translations.ts` and add to the `sampleNews` array:

```typescript
{
  id: '5',
  category: 'diaspora',
  headline: {
    en: 'Your English headline',
    ne: 'तपाईंको नेपाली शीर्षक',
    hi: 'आपकी हिंदी शीर्षक',
  },
  summary: {
    en: 'English summary...',
    ne: 'नेपाली सारांश...',
    hi: 'हिंदी सारांश...',
  },
  timeAgo: '1 hour ago',
  factChecked: true,
  imageUrl: 'https://images.unsplash.com/...',
}
```

### Changing Colors/Theme

Edit `tailwind.config.ts` to customize brand colors:

```typescript
theme: {
  extend: {
    colors: {
      'brand-blue': '#1e3a8a',  // Change this
      'brand-light': '#3b82f6', // And this
    },
  },
},
```

## 🔮 Next Steps (Phase 2)

- [ ] Integrate Claude API for real AI responses
- [ ] Add ElevenLabs for text-to-speech
- [ ] Connect to real news RSS feeds
- [ ] Implement actual swipe gestures (Framer Motion)
- [ ] Add user authentication
- [ ] Create admin panel for content management
- [ ] Add fact-checking integration
- [ ] Build mobile apps (React Native)

## 🐛 Known Issues

- Swipe gestures use buttons (not touch) - will add Hammer.js later
- Chat responses are demo only - needs Claude API
- Voice mode is UI only - needs Web Speech API integration
- Images are placeholders - will add real images

## 📄 License

MIT License - feel free to use this for your project!

## 🙏 Credits

Built with love for the Gorkha diaspora community.

---

## 🆘 Need Help?

If you run into issues:

1. **Check Node.js version**: `node -v` (should be 18+)
2. **Clear cache**: `rm -rf .next node_modules && npm install`
3. **Vercel docs**: https://vercel.com/docs
4. **Next.js docs**: https://nextjs.org/docs

## 📞 Contact

Questions? Open an issue on GitHub or reach out to the community!
