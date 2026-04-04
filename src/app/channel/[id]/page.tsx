'use client'
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation'
import { CheckCircle2, Bell, BellOff, Search, Grid, List } from 'lucide-react'
import VideoCard from '@/components/VideoCard'
import { formatSubscribers, formatViews } from '@/utils/mockData'
import { useStore } from '@/store/useStore'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const tabs = ['Home', 'Videos', 'Shorts', 'Playlists', 'Community', 'About']
export default function ChannelPage() {
  const { id } = useParams<{ id: string }>()
  const { subscriptions, notificationsEnabled, toggleSubscription, toggleNotification } = useStore()

  const [activeTab, setActiveTab] = useState('Videos')
  const [videos, setVideos] = useState<any[]>([])
  useEffect(() => {
  const fetchvideos = async () => {
    const snapshot = await getDocs(collection(db, "videos"))
    const data: any[] = []

    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() })
    })

    const filtered = data.filter(v => v.channelId === id)
    setVideos(filtered)
  }

  fetchvideos()
}, [id])
  const video = videos[0]
if (!video) return <div className="text-white p-6">Loading...</div>
  const subscribed = subscriptions.includes(video.channelId)
  const notifications = notificationsEnabled.includes(video.channelId)
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div>
      {/* Banner */}
      <div className="relative h-44 md:h-52 bg-gradient-to-br from-brand-900 to-surface-800 overflow-hidden">
        <img
          src={`https://picsum.photos/seed/banner${id}/1280/320`}
          alt="banner"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent" />
      </div>

      {/* Channel Info */}
      <div className="px-6 pb-0">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 relative z-10 mb-6">
          <img
            src={video.channelAvatar || "https://via.placeholder.com/100"}
            alt={video.channelName || "Unknown"}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-surface-950"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display font-bold text-2xl text-white">{video.channelName || "Unknown"}</h1>
              <CheckCircle2 size={18} className="text-brand-400" />
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-white/40">
              <span>@{(video.channelName || "unknown").toLowerCase().replace(/\s/g, '')}</span>
              <span>·</span>
              <span>{formatSubscribers(video.channelSubscribers || 0)} subscribers</span>
              <span>·</span>
              <span>{videos.length} videos</span>
              <span>·</span>
              <span>{formatViews(video.views * 50)} views</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {subscribed && (
              <button
                onClick={() => toggleNotification(video.channelId)}
                className="p-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/50 hover:text-white transition-all"
              >
                {notifications ? <Bell size={18} className="text-brand-400" /> : <BellOff size={18} />}
              </button>
            )}
            <button
              onClick={() => { toggleSubscription(video.channelId); toast(subscribed ? 'Unsubscribed' : `Subscribed to ${video.channelName || "Unknown"}!`) }}
              className={clsx(
                'px-6 py-2.5 rounded-full font-semibold text-sm transition-all',
                subscribed ? 'bg-white/10 text-white/60 hover:bg-white/[0.15]' : 'bg-white text-black hover:bg-white/90 shadow-lg'
              )}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-white/[0.06] overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2 -mb-px',
                activeTab === tab
                  ? 'text-white border-white'
                  : 'text-white/40 border-transparent hover:text-white/70'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {activeTab === 'Videos' && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 flex items-center gap-2 bg-surface-800 border border-white/10 rounded-xl px-3 py-2">
                <Search size={14} className="text-white/30" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search channel videos..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none"
                />
              </div>
              <div className="flex">
                <button onClick={() => setLayout('grid')} className={clsx('p-2 rounded-l-xl border-y border-l border-white/10', layout === 'grid' ? 'bg-white/10 text-white' : 'text-white/40')}><Grid size={16} /></button>
                <button onClick={() => setLayout('list')} className={clsx('p-2 rounded-r-xl border border-white/10', layout === 'list' ? 'bg-white/10 text-white' : 'text-white/40')}><List size={16} /></button>
              </div>
            </div>
            {layout === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map(v => <VideoCard key={v.id} video={v} showChannel={false} />)}
              </div>
            ) : (
              <div className="space-y-6">
                {videos.map(v => <VideoCard key={v.id} video={v} layout="list" showChannel={false} />)}
              </div>
            )}
          </>
        )}

        {activeTab === 'About' && (
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-lg mb-4">About</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Welcome to {video.channelName || "Unknown"}! We create high-quality content about technology, science, and the future. Join {formatSubscribers(video.channelSubscribers)} subscribers on this journey.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-white/50">
                <span className="text-white/30 w-24">Joined</span>
                <span>March 15, 2018</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <span className="text-white/30 w-24">Views</span>
                <span>{formatViews(video.views * 50)} total views</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <span className="text-white/30 w-24">Country</span>
                <span>United States</span>
              </div>
            </div>
          </div>
        )}

        {['Home', 'Shorts', 'Playlists', 'Community'].includes(activeTab) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.slice(0, 8).map(v => <VideoCard key={v.id} video={v} showChannel={false} />)}
          </div>
        )}
      </div>
    </div>
  )
}
