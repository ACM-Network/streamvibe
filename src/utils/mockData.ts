// src/utils/mockData.ts

export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  durationSeconds: number
  views: number
  likes: number
  dislikes: number
  uploadedAt: string
  channelId: string
  channelName: string
  channelAvatar: string
  channelSubscribers: number
  tags: string[]
  category: string
  url: string
  isLive?: boolean
  is4K?: boolean
  isHDR?: boolean
  chapters?: Chapter[]
  subtitles?: string[]
  quality?: string[]
}

export interface Chapter {
  time: number
  title: string
}

export interface Channel {
  id: string
  name: string
  avatar: string
  banner: string
  subscribers: number
  description: string
  verified: boolean
  joinedAt: string
  totalViews: number
  videoCount: number
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  text: string
  likes: number
  dislikes: number
  replies: Comment[]
  timestamp: string
  pinned?: boolean
  creatorHeart?: boolean
}

const SAMPLE_THUMBNAILS = [
  'https://picsum.photos/seed/vid1/640/360',
  'https://picsum.photos/seed/vid2/640/360',
  'https://picsum.photos/seed/vid3/640/360',
  'https://picsum.photos/seed/vid4/640/360',
  'https://picsum.photos/seed/vid5/640/360',
  'https://picsum.photos/seed/vid6/640/360',
  'https://picsum.photos/seed/vid7/640/360',
  'https://picsum.photos/seed/vid8/640/360',
  'https://picsum.photos/seed/vid9/640/360',
  'https://picsum.photos/seed/vid10/640/360',
  'https://picsum.photos/seed/vid11/640/360',
  'https://picsum.photos/seed/vid12/640/360',
  'https://picsum.photos/seed/vid13/640/360',
  'https://picsum.photos/seed/vid14/640/360',
  'https://picsum.photos/seed/vid15/640/360',
  'https://picsum.photos/seed/vid16/640/360',
]

const AVATARS = [
  'https://picsum.photos/seed/ava1/100/100',
  'https://picsum.photos/seed/ava2/100/100',
  'https://picsum.photos/seed/ava3/100/100',
  'https://picsum.photos/seed/ava4/100/100',
  'https://picsum.photos/seed/ava5/100/100',
]

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'v001',
    title: 'Building the Future: Inside the World\'s Most Advanced AI Lab',
    description: `A deep dive into the cutting-edge research happening at the world's top AI laboratories. We explore how teams of researchers are pushing boundaries and solving problems that were once thought impossible.\n\nIn this documentary-style video, we visit state-of-the-art facilities, interview leading researchers, and witness experiments that could change the way we live.\n\n📌 Chapters:\n0:00 Introduction\n5:30 The Research Lab\n15:45 How Neural Networks Learn\n28:00 Real-World Applications\n45:12 The Future Ahead`,
    thumbnail: SAMPLE_THUMBNAILS[0],
    duration: '52:34',
    durationSeconds: 3154,
    views: 4821000,
    likes: 198400,
    dislikes: 2100,
    uploadedAt: '2024-12-01',
    channelId: 'ch001',
    channelName: 'TechHorizon',
    channelAvatar: AVATARS[0],
    channelSubscribers: 8400000,
    tags: ['AI', 'Technology', 'Research', 'Future', 'Machine Learning'],
    category: 'Technology',
    url: 'url: "https://www.w3schools.com/html/mov_bbb.mp4',
    is4K: true,
    isHDR: true,
    chapters: [
      { time: 0, title: 'Introduction' },
      { time: 330, title: 'The Research Lab' },
      { time: 945, title: 'How Neural Networks Learn' },
      { time: 1680, title: 'Real-World Applications' },
      { time: 2712, title: 'The Future Ahead' },
    ],
    quality: ['4K', '1080p', '720p', '480p', '360p'],
    subtitles: ['English', 'Spanish', 'French', 'German', 'Japanese'],
  },
  {
    id: 'v002',
    title: 'Epic Mountain Biking — Red Bull Rampage 2024 Full Highlights',
    description: 'The most extreme freeride mountain biking event on the planet. Watch the best riders in the world take on impossible terrain in St. George, Utah.',
    thumbnail: SAMPLE_THUMBNAILS[1],
    duration: '28:15',
    durationSeconds: 1695,
    views: 12500000,
    likes: 520000,
    dislikes: 4200,
    uploadedAt: '2024-11-15',
    channelId: 'ch002',
    channelName: 'RedBull Sports',
    channelAvatar: AVATARS[1],
    channelSubscribers: 22000000,
    tags: ['Mountain Biking', 'Extreme Sports', 'Red Bull', 'Rampage'],
    category: 'Sports',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    is4K: true,
    quality: ['4K', '1080p', '720p', '480p'],
    subtitles: ['English'],
  },
  {
    id: 'v003',
    title: 'Mastering TypeScript in 2025 — Full Course for Beginners',
    description: 'Complete TypeScript tutorial covering everything from basics to advanced patterns. Includes React, Node.js and real-world project examples.',
    thumbnail: SAMPLE_THUMBNAILS[2],
    duration: '6:22:00',
    durationSeconds: 22920,
    views: 2100000,
    likes: 95000,
    dislikes: 1200,
    uploadedAt: '2025-01-10',
    channelId: 'ch003',
    channelName: 'CodeWithPro',
    channelAvatar: AVATARS[2],
    channelSubscribers: 3200000,
    tags: ['TypeScript', 'Programming', 'Web Dev', 'Tutorial'],
    category: 'Education',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    quality: ['1080p', '720p', '480p', '360p'],
    subtitles: ['English', 'Hindi', 'Portuguese'],
  },
  {
    id: 'v004',
    title: 'Gordon Ramsay Makes Perfect Beef Wellington — Step by Step',
    description: 'The ultimate Beef Wellington recipe from Gordon Ramsay himself. Learn the secrets to perfect pastry, tender beef, and the signature mushroom duxelles.',
    thumbnail: SAMPLE_THUMBNAILS[3],
    duration: '18:42',
    durationSeconds: 1122,
    views: 8700000,
    likes: 310000,
    dislikes: 3800,
    uploadedAt: '2025-02-20',
    channelId: 'ch004',
    channelName: 'Gordon Ramsay',
    channelAvatar: AVATARS[3],
    channelSubscribers: 19000000,
    tags: ['Cooking', 'Beef Wellington', 'Recipe', 'Gordon Ramsay'],
    category: 'Food',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    quality: ['1080p', '720p', '480p'],
    subtitles: ['English', 'Spanish', 'Italian'],
  },
  {
    id: 'v005',
    title: 'Exploring Tokyo\'s Hidden Neighborhoods — A Night Guide',
    description: 'Tokyo after dark is a completely different city. Join me as we explore izakayas, underground clubs, and the hidden gems locals know about.',
    thumbnail: SAMPLE_THUMBNAILS[4],
    duration: '42:08',
    durationSeconds: 2528,
    views: 3400000,
    likes: 145000,
    dislikes: 2100,
    uploadedAt: '2025-01-28',
    channelId: 'ch005',
    channelName: 'Wanderlust World',
    channelAvatar: AVATARS[4],
    channelSubscribers: 5100000,
    tags: ['Tokyo', 'Travel', 'Japan', 'Night Life', 'Food'],
    category: 'Travel',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    quality: ['4K', '1080p', '720p'],
    subtitles: ['English', 'Japanese', 'Korean'],
  },
  {
    id: 'v006',
    title: 'Lo-fi Hip Hop Radio 🎵 Beats to Study/Relax To — 24/7 Live Stream',
    description: 'Your favorite chill beats are back! Perfect for studying, relaxing, coding, or just vibing. New tracks added weekly. 💙',
    thumbnail: SAMPLE_THUMBNAILS[5],
    duration: 'LIVE',
    durationSeconds: 0,
    views: 88000,
    likes: 12400,
    dislikes: 180,
    uploadedAt: '2025-03-01',
    channelId: 'ch006',
    channelName: 'ChillBeats',
    channelAvatar: AVATARS[0],
    channelSubscribers: 920000,
    tags: ['Lo-fi', 'Music', 'Study', 'Chill', 'Live'],
    category: 'Music',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    isLive: true,
    quality: ['1080p', '720p', '480p'],
    subtitles: [],
  },
  {
    id: 'v007',
    title: 'The Philosophy of Stoicism — How Ancient Wisdom Can Transform Your Life',
    description: 'A deep exploration of Stoic philosophy and how the teachings of Marcus Aurelius, Epictetus, and Seneca can help you build mental resilience.',
    thumbnail: SAMPLE_THUMBNAILS[6],
    duration: '1:15:22',
    durationSeconds: 4522,
    views: 6200000,
    likes: 285000,
    dislikes: 5400,
    uploadedAt: '2024-10-05',
    channelId: 'ch007',
    channelName: 'PhilosoThinkers',
    channelAvatar: AVATARS[1],
    channelSubscribers: 2800000,
    tags: ['Philosophy', 'Stoicism', 'Self Improvement', 'Mental Health'],
    category: 'Education',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    quality: ['1080p', '720p', '480p', '360p'],
    subtitles: ['English', 'German', 'French', 'Spanish'],
  },
  {
    id: 'v008',
    title: 'I Survived 30 Days in the Amazon Rainforest — No Food, No Shelter',
    description: 'The most extreme survival challenge of my life. 30 days completely alone in the Amazon with nothing but a knife and my knowledge.',
    thumbnail: SAMPLE_THUMBNAILS[7],
    duration: '1:32:44',
    durationSeconds: 5564,
    views: 22000000,
    likes: 890000,
    dislikes: 12000,
    uploadedAt: '2025-02-01',
    channelId: 'ch008',
    channelName: 'Bear Grylls',
    channelAvatar: AVATARS[2],
    channelSubscribers: 14000000,
    tags: ['Survival', 'Amazon', 'Adventure', 'Wildlife', 'Nature'],
    category: 'Adventure',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    is4K: true,
    isHDR: true,
    quality: ['4K', '1080p', '720p', '480p'],
    subtitles: ['English', 'Spanish', 'Portuguese'],
  },
  {
    id: 'v009',
    title: 'Kendrick Lamar — GNX Full Album Reaction & Review',
    description: 'We break down every track on the surprise album drop. The production, the lyrics, the hidden messages — all covered.',
    thumbnail: SAMPLE_THUMBNAILS[8],
    duration: '1:08:30',
    durationSeconds: 4110,
    views: 5800000,
    likes: 240000,
    dislikes: 8200,
    uploadedAt: '2024-11-22',
    channelId: 'ch009',
    channelName: 'MusicTheory Lab',
    channelAvatar: AVATARS[3],
    channelSubscribers: 4100000,
    tags: ['Music', 'Hip Hop', 'Album Review', 'Kendrick Lamar'],
    category: 'Music',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    quality: ['1080p', '720p', '480p'],
    subtitles: ['English'],
  },
  {
    id: 'v010',
    title: 'NASA\'s Most Stunning Space Footage Ever Captured — 4K HDR',
    description: 'A breathtaking collection of NASA\'s most extraordinary footage from the James Webb Telescope, ISS, and deep space missions.',
    thumbnail: SAMPLE_THUMBNAILS[9],
    duration: '38:55',
    durationSeconds: 2335,
    views: 18000000,
    likes: 720000,
    dislikes: 6200,
    uploadedAt: '2025-01-05',
    channelId: 'ch010',
    channelName: 'NASA Official',
    channelAvatar: AVATARS[4],
    channelSubscribers: 25000000,
    tags: ['Space', 'NASA', '4K', 'James Webb', 'Universe'],
    category: 'Science',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    is4K: true,
    isHDR: true,
    quality: ['4K', '1080p', '720p'],
    subtitles: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese'],
  },
  {
    id: 'v011',
    title: 'My $50,000 Home Studio Setup — Every Piece of Gear Explained',
    description: 'Complete tour of my professional music production setup. From acoustics to plugins, every detail covered with pricing and alternatives.',
    thumbnail: SAMPLE_THUMBNAILS[10],
    duration: '24:18',
    durationSeconds: 1458,
    views: 1800000,
    likes: 78000,
    dislikes: 1400,
    uploadedAt: '2025-02-14',
    channelId: 'ch011',
    channelName: 'StudioMaestro',
    channelAvatar: AVATARS[0],
    channelSubscribers: 1200000,
    tags: ['Music Production', 'Studio', 'Gear', 'Setup', 'Recording'],
    category: 'Music',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    quality: ['4K', '1080p', '720p'],
    subtitles: ['English'],
  },
  {
    id: 'v012',
    title: 'How to Build a $1M Startup with No Code — 2025 Complete Guide',
    description: 'Real strategies from founders who built multi-million dollar companies without writing a single line of code. Tools, tactics, and case studies.',
    thumbnail: SAMPLE_THUMBNAILS[11],
    duration: '2:15:40',
    durationSeconds: 8140,
    views: 4500000,
    likes: 210000,
    dislikes: 8800,
    uploadedAt: '2025-03-10',
    channelId: 'ch012',
    channelName: 'StartupFounders',
    channelAvatar: AVATARS[1],
    channelSubscribers: 2100000,
    tags: ['Startup', 'No Code', 'Entrepreneurship', 'Business', 'Side Hustle'],
    category: 'Business',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    quality: ['1080p', '720p', '480p'],
    subtitles: ['English', 'Hindi', 'Spanish'],
  },
  {
    id: 'v013',
    title: 'The Last of Us Season 3 — Full Trailer Breakdown & Easter Eggs',
    description: 'Every detail, easter egg, and theory from the new TLOU Season 3 trailer. Ellie\'s journey continues and we\'re not ready.',
    thumbnail: SAMPLE_THUMBNAILS[12],
    duration: '22:50',
    durationSeconds: 1370,
    views: 9800000,
    likes: 425000,
    dislikes: 18000,
    uploadedAt: '2025-03-18',
    channelId: 'ch013',
    channelName: 'ScreenBreak',
    channelAvatar: AVATARS[2],
    channelSubscribers: 6800000,
    tags: ['The Last of Us', 'TV Shows', 'HBO', 'Gaming', 'Trailer Breakdown'],
    category: 'Entertainment',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    quality: ['4K', '1080p', '720p'],
    subtitles: ['English', 'Spanish', 'French'],
  },
  {
    id: 'v014',
    title: 'Full Body Workout — No Equipment 45 Minutes HIIT Training',
    description: 'The most effective no-equipment full body HIIT workout. Burn calories and build strength at home with this 45-minute routine.',
    thumbnail: SAMPLE_THUMBNAILS[13],
    duration: '45:12',
    durationSeconds: 2712,
    views: 7200000,
    likes: 298000,
    dislikes: 4200,
    uploadedAt: '2025-01-20',
    channelId: 'ch014',
    channelName: 'FitLife Academy',
    channelAvatar: AVATARS[3],
    channelSubscribers: 7500000,
    tags: ['Fitness', 'HIIT', 'Workout', 'No Equipment', 'Health'],
    category: 'Health',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    quality: ['1080p', '720p', '480p'],
    subtitles: ['English', 'Spanish', 'Portuguese'],
  },
  {
    id: 'v015',
    title: 'Painting a Hyper-Realistic Portrait in Oil — Time Lapse',
    description: 'Watch as a photorealistic portrait comes to life over 120 hours condensed into this mesmerizing time-lapse video. Techniques explained throughout.',
    thumbnail: SAMPLE_THUMBNAILS[14],
    duration: '15:30',
    durationSeconds: 930,
    views: 3100000,
    likes: 138000,
    dislikes: 1800,
    uploadedAt: '2025-02-28',
    channelId: 'ch015',
    channelName: 'ArtisanCanvas',
    channelAvatar: AVATARS[4],
    channelSubscribers: 890000,
    tags: ['Art', 'Oil Painting', 'Time Lapse', 'Portrait', 'Realistic'],
    category: 'Art',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    quality: ['4K', '1080p', '720p'],
    subtitles: ['English', 'French', 'Italian'],
  },
  {
    id: 'v016',
    title: 'Deep Ocean Expedition — Never Before Seen Creatures at 6000m',
    description: 'Join marine biologists as they descend to 6000 meters beneath the Pacific Ocean, discovering species science has never recorded before.',
    thumbnail: SAMPLE_THUMBNAILS[15],
    duration: '58:22',
    durationSeconds: 3502,
    views: 14000000,
    likes: 580000,
    dislikes: 8900,
    uploadedAt: '2024-12-15',
    channelId: 'ch016',
    channelName: 'OceanExplorer',
    channelAvatar: AVATARS[0],
    channelSubscribers: 9200000,
    tags: ['Ocean', 'Deep Sea', 'Science', 'Marine Biology', 'Documentary'],
    category: 'Science',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    is4K: true,
    isHDR: true,
    quality: ['4K', '1080p', '720p'],
    subtitles: ['English', 'Spanish', 'French', 'German'],
  },
]

export const MOCK_CHANNELS: Channel[] = [
  {
    id: 'ch001',
    name: 'TechHorizon',
    avatar: AVATARS[0],
    banner: 'https://picsum.photos/seed/banner1/1280/320',
    subscribers: 8400000,
    description: 'Exploring the cutting edge of technology, AI, and the future of humanity.',
    verified: true,
    joinedAt: '2018-03-15',
    totalViews: 450000000,
    videoCount: 284,
  },
]

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c001',
    userId: 'u001',
    userName: 'Alex Chen',
    userAvatar: 'https://picsum.photos/seed/user1/50/50',
    text: 'This is genuinely one of the most informative videos on this topic. The production quality is absolutely incredible. Subscribed instantly! 🔥',
    likes: 8420,
    dislikes: 12,
    replies: [
      {
        id: 'c001r1',
        userId: 'u002',
        userName: 'Sarah M.',
        userAvatar: 'https://picsum.photos/seed/user2/50/50',
        text: 'Completely agree! The part about neural networks blew my mind.',
        likes: 1240,
        dislikes: 3,
        replies: [],
        timestamp: '2025-01-15T09:22:00Z',
      },
    ],
    timestamp: '2025-01-14T14:30:00Z',
    pinned: true,
    creatorHeart: true,
  },
  {
    id: 'c002',
    userId: 'u003',
    userName: 'Marcus Rivera',
    userAvatar: 'https://picsum.photos/seed/user3/50/50',
    text: 'Been following this channel for 3 years and every single upload is better than the last. Keep doing what you\'re doing.',
    likes: 5810,
    dislikes: 8,
    replies: [],
    timestamp: '2025-01-14T16:45:00Z',
  },
  {
    id: 'c003',
    userId: 'u004',
    userName: 'Priya Nair',
    userAvatar: 'https://picsum.photos/seed/user4/50/50',
    text: 'The section at 15:45 is gold. I\'ve watched it 5 times and I learn something new each time. The depth here is incredible.',
    likes: 3200,
    dislikes: 5,
    replies: [
      {
        id: 'c003r1',
        userId: 'u005',
        userName: 'Tom K.',
        userAvatar: 'https://picsum.photos/seed/user5/50/50',
        text: 'Yes! That timestamp deserves a whole separate video honestly.',
        likes: 890,
        dislikes: 2,
        replies: [],
        timestamp: '2025-01-15T11:00:00Z',
      },
    ],
    timestamp: '2025-01-14T19:20:00Z',
  },
  {
    id: 'c004',
    userId: 'u006',
    userName: 'Dmitri V.',
    userAvatar: 'https://picsum.photos/seed/user6/50/50',
    text: 'Finally a content creator who doesn\'t just skim the surface. The research that goes into these videos is obvious. Absolute banger. 💯',
    likes: 2100,
    dislikes: 4,
    replies: [],
    timestamp: '2025-01-15T08:10:00Z',
  },
  {
    id: 'c005',
    userId: 'u007',
    userName: 'Emma Johansson',
    userAvatar: 'https://picsum.photos/seed/user7/50/50',
    text: 'Showed this to my entire team at work. We had a 2-hour discussion about the implications. Best 52 minutes I\'ve spent this year.',
    likes: 4400,
    dislikes: 7,
    replies: [],
    timestamp: '2025-01-15T12:30:00Z',
  },
]

export const CATEGORIES = [
  'All', 'Technology', 'Sports', 'Music', 'Gaming', 'Education',
  'Entertainment', 'Science', 'Travel', 'Food', 'Health', 'Art',
  'Business', 'Adventure', 'News', 'Comedy', 'Fashion', 'DIY',
]

export function formatViews(views: number): string {
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B`
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`
  return views.toString()
}

export function formatSubscribers(subs: number): string {
  return formatViews(subs)
}

export function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays < 1) return 'Today'
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  const diffWeeks = Math.floor(diffDays / 7)
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
  const diffYears = Math.floor(diffDays / 365)
  return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  return `${m}:${s.toString().padStart(2, '0')}`
}
