'use client'
import VideoCard from '@/components/VideoCard'
import { MOCK_VIDEOS } from '@/utils/mockData'

export default function Page() {
  const label = 'live'.charAt(0).toUpperCase() + 'live'.slice(1)
  const videos = MOCK_VIDEOS.slice(0, 12)
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <h1 className="font-display font-bold text-2xl text-white mb-6">{label}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map(v => <VideoCard key={v.id} video={v} />)}
      </div>
    </div>
  )
}
