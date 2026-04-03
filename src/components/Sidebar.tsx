'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home, Compass, Clock, ThumbsUp, BookMarked, ListVideo,
  History, TrendingUp, Music2, Gamepad2, Newspaper, Trophy,
  Flame, Settings, HelpCircle, ChevronRight, PlaySquare,
  Radio, Tv, Dumbbell, FlaskConical, Plane, Utensils
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import clsx from 'clsx'

const mainLinks = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/explore', icon: Compass, label: 'Explore' },
  { href: '/shorts', icon: Flame, label: 'Shorts' },
  { href: '/subscriptions', icon: Tv, label: 'Subscriptions' },
]

const libraryLinks = [
  { href: '/history', icon: History, label: 'History' },
  { href: '/watch-later', icon: Clock, label: 'Watch Later' },
  { href: '/liked', icon: ThumbsUp, label: 'Liked Videos' },
  { href: '/playlists', icon: ListVideo, label: 'Playlists' },
  { href: '/your-videos', icon: PlaySquare, label: 'Your Videos' },
]

const trendingLinks = [
  { href: '/trending', icon: TrendingUp, label: 'Trending' },
  { href: '/music', icon: Music2, label: 'Music' },
  { href: '/gaming', icon: Gamepad2, label: 'Gaming' },
  { href: '/news', icon: Newspaper, label: 'News' },
  { href: '/sports', icon: Trophy, label: 'Sports' },
  { href: '/live', icon: Radio, label: 'Live' },
  { href: '/fitness', icon: Dumbbell, label: 'Fitness' },
  { href: '/science', icon: FlaskConical, label: 'Science' },
  { href: '/travel', icon: Plane, label: 'Travel' },
  { href: '/food', icon: Utensils, label: 'Food' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed } = useStore()

  if (sidebarCollapsed) {
    return (
      <aside className="hidden lg:flex flex-col w-20 h-[calc(100vh-64px)] sticky top-16 flex-shrink-0 border-r border-white/[0.04] overflow-y-auto scrollbar-hide pt-3 pb-6 gap-1">
        {mainLinks.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex flex-col items-center gap-1 py-3 mx-2 rounded-xl transition-all text-xs font-medium',
              pathname === href
                ? 'bg-brand-500/10 text-brand-400'
                : 'text-white/40 hover:text-white hover:bg-white/[0.06]'
            )}
          >
            <Icon size={20} />
            <span className="text-[10px]">{label}</span>
          </Link>
        ))}
      </aside>
    )
  }

  return (
    <aside className="hidden lg:flex flex-col w-60 h-[calc(100vh-64px)] sticky top-16 flex-shrink-0 border-r border-white/[0.04] overflow-y-auto scrollbar-hide pt-3 pb-6">

      {/* Main Navigation */}
      <nav className="px-3 space-y-0.5">
        {mainLinks.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'sidebar-link',
              pathname === href && 'active'
            )}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mx-4 my-4 h-px bg-white/[0.06]" />

      {/* Library */}
      <div className="px-3">
        <p className="px-4 mb-2 text-[11px] font-semibold text-white/30 uppercase tracking-wider">Library</p>
        <nav className="space-y-0.5">
          {libraryLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx('sidebar-link', pathname === href && 'active')}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-4 my-4 h-px bg-white/[0.06]" />

      {/* Explore */}
      <div className="px-3">
        <p className="px-4 mb-2 text-[11px] font-semibold text-white/30 uppercase tracking-wider">Explore</p>
        <nav className="space-y-0.5">
          {trendingLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx('sidebar-link', pathname === href && 'active')}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-4 my-4 h-px bg-white/[0.06]" />

      {/* Bottom */}
      <div className="px-3 space-y-0.5">
        <Link href="/settings" className="sidebar-link">
          <Settings size={18} />
          <span>Settings</span>
        </Link>
        <Link href="/help" className="sidebar-link">
          <HelpCircle size={18} />
          <span>Help & Feedback</span>
        </Link>
      </div>

      <div className="px-6 mt-6">
        <p className="text-[11px] text-white/20 leading-relaxed">
          © 2025 StreamVibe · Privacy · Terms · About
        </p>
      </div>
    </aside>
  )
}
