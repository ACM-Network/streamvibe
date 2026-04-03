'use client'
import { ThumbsUp } from 'lucide-react'
import VideoCard from '@/components/VideoCard'
import { MOCK_VIDEOS } from '@/utils/mockData'
import { useStore } from '@/store/useStore'

export default function LikedPage() {
  const { likedVideos } = useStore()
  const videos = likedVideos.length
    ? MOCK_VIDEOS.filter(v => likedVideos.includes(v.id))
    : MOCK_VIDEOS.slice(0, 6)

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
          <ThumbsUp size={20} className="text-brand-400" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Liked Videos</h1>
          <p className="text-sm text-white/40">{videos.length} videos</p>
        </div>
      </div>
      {videos.length ? (
        <div className="space-y-4">
          {videos.map(v => <VideoCard key={v.id} video={v} layout="list" />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <ThumbsUp size={48} className="mx-auto mb-4 text-white/10" />
          <h2 className="font-display font-bold text-xl text-white/40 mb-2">No liked videos yet</h2>
          <p className="text-white/25 text-sm">Like videos to save them here</p>
        </div>
      )}
    </div>
  )
}
