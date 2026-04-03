'use client'
import { PlaySquare, Upload } from 'lucide-react'
import VideoCard from '@/components/VideoCard'
import { MOCK_VIDEOS } from '@/utils/mockData'
import Link from 'next/link'

export default function YourVideosPage() {
  const videos = MOCK_VIDEOS.slice(0, 4)
  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <PlaySquare size={22} className="text-white/50" />
          <h1 className="font-display font-bold text-2xl text-white">Your Videos</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-all shadow-glow-red">
          <Upload size={15} />Upload
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(v => <VideoCard key={v.id} video={v} showChannel={false} />)}
      </div>
    </div>
  )
}
