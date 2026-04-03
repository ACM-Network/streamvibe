'use client'
import Link from 'next/link'
import {
  Music2, Gamepad2, Newspaper, Trophy, FlaskConical,
  Plane, Utensils, Dumbbell, Palette, Briefcase,
  Film, Radio, Tv, BookOpen, Heart, Globe
} from 'lucide-react'

const categories = [
  { label: 'Music', icon: Music2, color: 'from-purple-900 to-purple-700', href: '/music' },
  { label: 'Gaming', icon: Gamepad2, color: 'from-green-900 to-green-700', href: '/gaming' },
  { label: 'News', icon: Newspaper, color: 'from-blue-900 to-blue-700', href: '/news' },
  { label: 'Sports', icon: Trophy, color: 'from-orange-900 to-orange-700', href: '/sports' },
  { label: 'Science', icon: FlaskConical, color: 'from-cyan-900 to-cyan-700', href: '/science' },
  { label: 'Travel', icon: Plane, color: 'from-sky-900 to-sky-700', href: '/travel' },
  { label: 'Food', icon: Utensils, color: 'from-yellow-900 to-yellow-700', href: '/food' },
  { label: 'Fitness', icon: Dumbbell, color: 'from-red-900 to-red-700', href: '/fitness' },
  { label: 'Art', icon: Palette, color: 'from-pink-900 to-pink-700', href: '/art' },
  { label: 'Business', icon: Briefcase, color: 'from-slate-700 to-slate-600', href: '/business' },
  { label: 'Movies', icon: Film, color: 'from-amber-900 to-amber-700', href: '/movies' },
  { label: 'Live', icon: Radio, color: 'from-rose-900 to-rose-700', href: '/live' },
  { label: 'TV Shows', icon: Tv, color: 'from-violet-900 to-violet-700', href: '/tv' },
  { label: 'Education', icon: BookOpen, color: 'from-teal-900 to-teal-700', href: '/education' },
  { label: 'Health', icon: Heart, color: 'from-emerald-900 to-emerald-700', href: '/health' },
  { label: 'World', icon: Globe, color: 'from-indigo-900 to-indigo-700', href: '/world' },
]

export default function ExplorePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="font-display font-bold text-2xl text-white mb-2">Explore</h1>
      <p className="text-white/40 text-sm mb-8">Browse every category on StreamVibe</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map(({ label, icon: Icon, color, href }) => (
          <Link
            key={label}
            href={href}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-5 group hover:scale-[1.02] transition-all duration-300 shadow-card-dark`}
          >
            <Icon size={28} className="text-white/80 mb-3" />
            <p className="font-display font-bold text-white text-base">{label}</p>
            <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icon size={80} className="text-white" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
