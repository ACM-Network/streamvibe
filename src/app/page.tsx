'use client'
import { useState, useEffect } from 'react'
import { TrendingUp, Zap, Clock, Radio } from 'lucide-react'
import VideoCard from '@/components/VideoCard'
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`chip ${active ? 'chip-active' : 'chip-default'}`}
    >
      {label}
    </button>
  )
}

function SkeletonCard() {
  return (
    <div className="space-y-3">
      <div className="aspect-video rounded-xl skeleton" />
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full skeleton flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 skeleton rounded-full" />
          <div className="h-3 skeleton rounded-full w-2/3" />
          <div className="h-3 skeleton rounded-full w-1/2" />
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  const fetchVideos = async () => {
    setLoading(true)

    const querySnapshot = await getDocs(collection(db, "videos"))

    const data: any[] = []
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() })
    })

    setVideos(data)
    setLoading(false)
  }

  fetchVideos()
}, [])

    const liveVideos = videos.filter(v => v.isLive)

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-surface-850 to-surface-950 px-6 py-8 mb-2">
        <div className="absolute inset-0 noise" />
        <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-brand-500/5 blur-[100px] rounded-full" />
        <div className="relative max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-brand-400" />
            <span className="text-sm text-brand-400 font-semibold">Trending Now</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
            What will you watch <span className="gradient-text">today?</span>
          </h1>
          <p className="text-white/50 text-base max-w-xl">
            Discover videos you love. Stream in stunning 4K HDR with the most advanced player on the web.
          </p>
        </div>
      </div>

      {/* Live Now Strip */}
      {liveVideos.length > 0 && (
        <div className="px-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Radio size={16} className="text-red-500 live-indicator" />
            <span className="text-sm font-semibold text-white/70">LIVE NOW</span>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
            {liveVideos.map(v => (
              <div key={v.id} className="flex-shrink-0 w-72">
                <VideoCard video={v} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="sticky top-16 z-30 bg-surface-950/90 backdrop-blur-md border-b border-white/[0.04] px-6 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {['All'].map(cat => (
            <CategoryChip
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="px-6 py-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <>
            {/* Featured row */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-brand-400" />
                <h2 className="font-display font-bold text-lg text-white">Recommended For You</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.slice(0, 4).map(v => (
                  <VideoCard key={v.id} video={v} />
                ))}
              </div>
            </div>

            {/* Watch Again */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-brand-400" />
                <h2 className="font-display font-bold text-lg text-white">Continue Watching</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.slice(4, 8).map(v => (
                  <VideoCard key={v.id} video={v} />
                ))}
              </div>
            </div>

            {/* All */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-lg text-white">
                  {activeCategory === 'All' ? 'All Videos' : activeCategory}
                </h2>
                <span className="text-sm text-white/30">{videos.length} videos</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               videos.map(v => (
  <VideoCard key={v.id} video={v} />
))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
