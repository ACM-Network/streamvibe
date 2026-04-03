'use client'
import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Share2, MessageSquare, Music2, MoreVertical, Flame } from 'lucide-react'
import { MOCK_VIDEOS, formatViews } from '@/utils/mockData'
import Link from 'next/link'

export default function ShortsPage() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const shorts = MOCK_VIDEOS.slice(0, 8)
  const current = shorts[currentIdx]

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-black py-4 px-4">
      <div className="w-full max-w-sm relative">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 px-2">
          <Flame size={18} className="text-brand-400" />
          <span className="font-display font-bold text-white">Shorts</span>
        </div>

        {/* Short Video */}
        <div className="relative rounded-3xl overflow-hidden bg-surface-900 aspect-[9/16] shadow-2xl">
          {/* Thumbnail as placeholder */}
          <img
            src={current.thumbnail}
            alt={current.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-16 p-4">
            <Link href={`/channel/${current.channelId}`} className="flex items-center gap-2 mb-2">
              <img src={current.channelAvatar} alt={current.channelName} className="w-8 h-8 rounded-full border border-white/30" />
              <span className="text-white font-semibold text-sm">{current.channelName}</span>
              <button className="text-xs text-white border border-white/60 px-2 py-0.5 rounded-full hover:bg-white hover:text-black transition-all">
                Follow
              </button>
            </Link>
            <p className="text-white text-sm line-clamp-2">{current.title}</p>
            <div className="flex items-center gap-2 mt-2">
              <Music2 size={12} className="text-white/60" />
              <span className="text-white/60 text-xs">Original audio · {current.channelName}</span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5">
            <button
              className="flex flex-col items-center gap-1"
              onClick={() => setLiked(s => { const n = new Set(s); n.has(current.id) ? n.delete(current.id) : n.add(current.id); return n })}
            >
              <div className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <ThumbsUp size={20} className={liked.has(current.id) ? 'text-brand-400 fill-current' : 'text-white'} />
              </div>
              <span className="text-white text-xs font-medium">{formatViews(current.likes + (liked.has(current.id) ? 1 : 0))}</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <ThumbsDown size={20} className="text-white" />
              </div>
              <span className="text-white text-xs">Dislike</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <MessageSquare size={20} className="text-white" />
              </div>
              <span className="text-white text-xs font-medium">284</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <Share2 size={20} className="text-white" />
              </div>
              <span className="text-white text-xs">Share</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <MoreVertical size={20} className="text-white" />
              </div>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
            className="px-6 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-white/60 hover:text-white transition-all disabled:opacity-30 text-sm"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentIdx(i => Math.min(shorts.length - 1, i + 1))}
            disabled={currentIdx === shorts.length - 1}
            className="px-6 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-white/60 hover:text-white transition-all disabled:opacity-30 text-sm"
          >
            Next
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {shorts.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`rounded-full transition-all ${i === currentIdx ? 'w-4 h-1.5 bg-brand-500' : 'w-1.5 h-1.5 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
