'use client'
import { Tv } from 'lucide-react'
import VideoCard from '@/components/VideoCard'
import { MOCK_VIDEOS } from '@/utils/mockData'
import { useStore } from '@/store/useStore'
import Link from 'next/link'

export default function SubscriptionsPage() {
  const { subscriptions } = useStore()
  const subVideos = subscriptions.length
    ? MOCK_VIDEOS.filter(v => subscriptions.includes(v.channelId))
    : MOCK_VIDEOS.slice(0, 8)

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
          <Tv size={20} className="text-white/70" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Subscriptions</h1>
          <p className="text-sm text-white/40">{subscriptions.length} channels · {subVideos.length} videos</p>
        </div>
      </div>

      {subscriptions.length === 0 && (
        <div className="mb-8 p-4 rounded-2xl bg-surface-850 border border-white/[0.05] text-center">
          <p className="text-white/40 text-sm">Subscribe to channels to see their latest videos here.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subVideos.map(v => <VideoCard key={v.id} video={v} />)}
      </div>
    </div>
  )
}
