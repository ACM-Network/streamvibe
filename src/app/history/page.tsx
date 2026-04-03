'use client'
import { useState } from 'react'
import { History, Search, Trash2, Pause } from 'lucide-react'
import VideoCard from '@/components/VideoCard'
import { MOCK_VIDEOS } from '@/utils/mockData'
import { useStore } from '@/store/useStore'
import toast from 'react-hot-toast'

export default function HistoryPage() {
  const { watchHistory, clearHistory } = useStore()
  const [search, setSearch] = useState('')
  const [paused, setPaused] = useState(false)

  const displayVideos = watchHistory.length > 0
    ? watchHistory.map(h => h.video)
    : MOCK_VIDEOS.slice(0, 10)

  const filtered = displayVideos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    v.channelName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
            <History size={20} className="text-white/70" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-white">Watch History</h1>
            <p className="text-sm text-white/40">{filtered.length} videos</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaused(p => !p)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-sm text-white/60 hover:text-white transition-all"
          >
            <Pause size={14} />
            {paused ? 'Resume history' : 'Pause history'}
          </button>
          <button
            onClick={() => { clearHistory(); toast.success('History cleared') }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 border border-white/10 text-sm text-white/60 transition-all"
          >
            <Trash2 size={14} />
            Clear all
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-surface-800 border border-white/10 rounded-xl px-4 py-2.5 mb-8">
        <Search size={15} className="text-white/30" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search history..."
          className="flex-1 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none"
        />
      </div>

      {paused && (
        <div className="mb-6 p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-300">
          History is paused — videos you watch won't appear here.
        </div>
      )}

      <div className="space-y-4">
        {filtered.length ? (
          filtered.map(v => <VideoCard key={v.id} video={v} layout="list" />)
        ) : (
          <div className="text-center py-20">
            <History size={48} className="mx-auto mb-4 text-white/10" />
            <h2 className="font-display font-bold text-xl text-white/40 mb-2">No history yet</h2>
            <p className="text-white/25 text-sm">Videos you watch will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}
