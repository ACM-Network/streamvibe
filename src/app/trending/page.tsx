'use client'
import { useState } from 'react'
import { TrendingUp, Flame, Music2, Gamepad2, Newspaper, Trophy, Film } from 'lucide-react'
import VideoCard from '@/components/VideoCard'
import { MOCK_VIDEOS } from '@/utils/mockData'

const tabs = [
  { label: 'Trending', icon: TrendingUp },
  { label: 'Music', icon: Music2 },
  { label: 'Gaming', icon: Gamepad2 },
  { label: 'Movies', icon: Film },
  { label: 'News', icon: Newspaper },
  { label: 'Sports', icon: Trophy },
]

export default function TrendingPage() {
  const [activeTab, setActiveTab] = useState('Trending')
  const sorted = [...MOCK_VIDEOS].sort((a, b) => b.views - a.views)

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
          <TrendingUp size={20} className="text-brand-400" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Trending</h1>
          <p className="text-sm text-white/40">What the world is watching right now</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8 pb-1">
        {tabs.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === label
                ? 'bg-brand-500 text-white shadow-glow-red'
                : 'bg-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.1] border border-white/10'
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Top 3 Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
        {sorted.slice(0, 3).map((v, i) => (
          <div key={v.id} className="relative">
            <div className="absolute -top-3 -left-2 z-10 font-display font-black text-6xl text-white/[0.06]">{i + 1}</div>
            <VideoCard video={v} />
          </div>
        ))}
      </div>

      {/* List */}
      <h2 className="font-display font-bold text-lg text-white mb-4">More Trending</h2>
      <div className="space-y-6">
        {sorted.slice(3).map((v, i) => (
          <VideoCard key={v.id} video={v} layout="list" rank={i + 4} />
        ))}
      </div>
    </div>
  )
}
