'use client'
import { Clock } from 'lucide-react'
import VideoCard from '@/components/VideoCard'
import { MOCK_VIDEOS } from '@/utils/mockData'
import { useStore } from '@/store/useStore'

export default function WatchLaterPage() {
  const { savedVideos } = useStore()
  const videos = savedVideos.length
    ? MOCK_VIDEOS.filter(v => savedVideos.includes(v.id))
    : MOCK_VIDEOS.slice(0, 5)

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
          <Clock size={20} className="text-white/70" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Watch Later</h1>
          <p className="text-sm text-white/40">{videos.length} videos</p>
        </div>
      </div>
      <div className="space-y-4">
        {videos.map(v => <VideoCard key={v.id} video={v} layout="list" />)}
      </div>
    </div>
  )
}
