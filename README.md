# 🎬 StreamVibe

A next-generation video streaming platform built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Features a world-class video player experience and a sleek, modern UI that surpasses YouTube's design.

## ✨ Features

### 🎥 Advanced Video Player
- Custom-built HTML5 video player with full controls
- **4K / HDR badge** display
- Playback speed control (0.25x – 2x)
- Multi-quality selection (4K, 1080p, 720p, etc.)
- Chapter markers with timeline tooltips
- Picture-in-Picture (PiP) mode
- Theater mode for distraction-free viewing
- Full keyboard shortcuts (Space, J, L, F, M, C, 0-9…)
- Volume with animated expand on hover
- Buffering progress bar
- Bookmark current timestamp
- Auto subtitle display
- Loop toggle
- Fullscreen with double-click support

### 🏠 Home Page
- Category filter chips (scrollable)
- Live stream strip
- Trending, Continue Watching sections
- Responsive 4-column grid

### 🔍 Search
- Real-time search suggestions dropdown
- Voice search button
- Advanced filters (date, duration, category, quality)
- Grid / List view toggle

### 📺 Watch Page
- Full video player with all features
- Like / Dislike with animated feedback
- Subscribe + Notification bell
- Share modal with multiple platforms
- Add to playlist modal
- Add to Watch Later / Queue
- Download + Clip buttons
- Expandable description with tags
- Chapter navigation
- Nested comment system with replies & likes
- Creator heart badge
- Autoplay next video toggle
- Theater mode
- Related videos sidebar
- Compact video cards sidebar

### 📱 Shorts
- Vertical video UI (TikTok/YouTube Shorts style)
- Like, comment, share actions
- Dot navigation + prev/next buttons

### 📚 Library
- Watch History (with pause/clear)
- Watch Later
- Liked Videos
- Playlists (create, manage)
- Your Videos + Upload

### 🔔 Subscriptions
- Subscribed channel videos feed
- Notification toggle per channel

### 🧭 Explore
- 16 category tiles with gradient colors + icons
- Trending with #1-3 hero row + full list
- All category pages

### ⚙️ Settings
- Appearance (dark mode, accent color, motion)
- Playback (autoplay, quality, volume)
- Notifications
- Privacy
- Keyboard Shortcuts reference

### 🛠 Technical
- **State persistence** with Zustand + localStorage
- **Toast notifications** for all actions
- **Skeleton loading** states
- **Responsive** for mobile, tablet, desktop
- **Keyboard shortcut** modal in player
- **Glass morphism** UI throughout
- **Custom scrollbars** and animations
- Ready for **Vercel** deployment

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/streamvibe.git
cd streamvibe

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deploy to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. Push this project to a new GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Vercel auto-detects Next.js — click **Deploy**
6. Done! Your site is live in ~2 minutes ✅

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

---

## 📁 Project Structure

```
streamvibe/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home
│   │   ├── layout.tsx          # Root layout (Navbar + Sidebar)
│   │   ├── globals.css         # Global styles
│   │   ├── watch/[id]/         # Video watch page
│   │   ├── search/             # Search results
│   │   ├── channel/[id]/       # Channel page
│   │   ├── trending/           # Trending page
│   │   ├── explore/            # Explore categories
│   │   ├── shorts/             # Shorts (vertical video)
│   │   ├── history/            # Watch history
│   │   ├── liked/              # Liked videos
│   │   ├── playlists/          # Playlists manager
│   │   ├── watch-later/        # Watch Later queue
│   │   ├── subscriptions/      # Subscriptions feed
│   │   ├── settings/           # Settings page
│   │   └── [category]/         # Music, Gaming, etc.
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation + search
│   │   ├── Sidebar.tsx         # Left sidebar navigation
│   │   ├── VideoCard.tsx       # Grid/List/Compact card
│   │   └── VideoPlayer.tsx     # Full-featured video player
│   ├── store/
│   │   └── useStore.ts         # Zustand global state
│   └── utils/
│       └── mockData.ts         # Mock videos, channels, comments
├── tailwind.config.js
├── next.config.js
├── vercel.json
└── package.json
```

---

## 🎨 Design System

- **Primary font**: Syne (display/headings)
- **Body font**: DM Sans
- **Mono font**: JetBrains Mono
- **Brand color**: `#ff3b3b` (StreamVibe Red)
- **Theme**: Dark-first, glass morphism, subtle grain textures
- **Animations**: Spring curves, staggered reveals, smooth transitions

---

## 🔮 Future Enhancements

- [ ] Real backend / database (Supabase, PlanetScale)
- [ ] Auth (NextAuth.js / Clerk)
- [ ] Real video upload & storage (Cloudflare Stream / Mux)
- [ ] Live streaming support (HLS)
- [ ] AI-powered recommendations
- [ ] Real-time comments (WebSockets)
- [ ] Progressive Web App (PWA)
- [ ] Mobile app (React Native)

---

Built with ❤️ using Next.js 14, TypeScript, Tailwind CSS, Zustand, and Framer Motion.
