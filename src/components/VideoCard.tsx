'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { MoreVertical, Clock, ListVideo, Share2, Flag, Radio, Sparkles } from 'lucide-react'
import { Video, formatViews, formatTimeAgo } from '@/utils/mockData'
import { useStore } from '@/store/useStore'
import clsx from 'clsx'

interface Props {
  video: Video
  layout?: 'grid' | 'list' | 'compact'
  showChannel?: boolean
  rank?: number
}

export default function VideoCard({ video, layout = 'grid', showChannel = true, rank }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { toggleSaved, savedVideos, addToQueue } = useStore()
  const isSaved = savedVideos.includes(video.id)

  if (layout === 'compact') {
    return (
      <Link href={`/watch/${video.id}`} className="flex gap-3 group hover:bg-white/[0.04] p-2 rounded-xl transition-all">
        <div className="relative flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-surface-800">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {video.isLive ? (
            <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white live-indicator" />
              LIVE
            </span>
          ) : (
            <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-black/80 text-white">
              {video.duration}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white/90 line-clamp-2 group-hover:text-white transition-colors leading-snug">
            {video.title}
          </p>
          <p className="text-xs text-white/40 mt-1">{video.channelName}</p>
          <p className="text-xs text-white/30 mt-0.5">
            {formatViews(video.views)} views · {formatTimeAgo(video.uploadedAt)}
          </p>
        </div>
      </Link>
    )
  }

  if (layout === 'list') {
    return (
      <div className="flex gap-4 group">
        {rank && (
          <span className="text-2xl font-display font-bold text-white/10 w-8 flex-shrink-0 text-center pt-4">
            {rank}
          </span>
        )}
        <Link href={`/watch/${video.id}`} className="relative flex-shrink-0 w-48 aspect-video rounded-xl overflow-hidden bg-surface-800">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {video.isLive ? (
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs font-bold bg-red-600 text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white live-indicator" />LIVE
            </span>
          ) : (
            <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-xs font-semibold bg-black/80 text-white">{video.duration}</span>
          )}
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/watch/${video.id}`}>
            <h3 className="font-display font-semibold text-white/90 line-clamp-2 group-hover:text-white transition-colors text-base leading-snug">{video.title}</h3>
          </Link>
          <div className="flex items-center gap-2 mt-1.5">
            <Link href={`/channel/${video.channelId}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={video.channelAvatar} alt={video.channelName} className="w-5 h-5 rounded-full" />
              <span className="text-sm text-white/50 hover:text-white/80 transition-colors">{video.channelName}</span>
            </Link>
          </div>
          <p className="text-sm text-white/35 mt-1">{formatViews(video.views)} views · {formatTimeAgo(video.uploadedAt)}</p>
          <p className="text-sm text-white/40 mt-2 line-clamp-2 hidden sm:block">{video.description}</p>
        </div>
      </div>
    )
  }

  // Grid layout (default)
  return (
    <div
      className="video-card group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <Link href={`/watch/${video.id}`} className="relative block aspect-video rounded-xl overflow-hidden bg-surface-800 shadow-card-dark">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="card-thumb w-full h-full object-cover"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {video.is4K && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-black/70 text-white/80 border border-white/10">4K</span>
          )}
          {video.isHDR && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-yellow-500/80 text-black">HDR</span>
          )}
        </div>

        {/* Duration */}
        {video.isLive ? (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-xs font-bold bg-red-600 text-white flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white live-indicator" />
            LIVE
          </span>
        ) : (
          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-xs font-semibold bg-black/80 text-white">
            {video.duration}
          </span>
        )}

        {/* Hover overlay */}
        <div className={clsx(
          'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300',
          hovered ? 'opacity-100' : 'opacity-0'
        )} />

        {/* Quick actions */}
        <div className={clsx(
          'absolute bottom-10 right-2 flex flex-col gap-1.5 transition-all duration-300',
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        )}>
          <button
            onClick={(e) => { e.preventDefault(); toggleSaved(video.id) }}
            className="p-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white/80 hover:text-white transition-all"
            title={isSaved ? 'Remove from Watch Later' : 'Save to Watch Later'}
          >
            <Clock size={14} className={isSaved ? 'text-brand-400' : ''} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); addToQueue(video) }}
            className="p-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white/80 hover:text-white transition-all"
            title="Add to Queue"
          >
            <ListVideo size={14} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3 flex gap-3">
        {showChannel && (
          <Link href={`/channel/${video.channelId}`} className="flex-shrink-0 mt-0.5">
            <img
              src={video.channelAvatar}
              alt={video.channelName}
              className="w-9 h-9 rounded-full object-cover hover:opacity-80 transition-opacity"
            />
          </Link>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/watch/${video.id}`}>
              <h3 className="font-medium text-[14px] text-white/90 line-clamp-2 leading-snug hover:text-white transition-colors group-hover:text-white">
                {video.title}
              </h3>
            </Link>
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1 rounded-lg hover:bg-white/[0.08] text-white/30 hover:text-white/80 transition-all opacity-0 group-hover:opacity-100"
              >
                <MoreVertical size={16} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-8 glass rounded-xl border border-white/[0.08] shadow-xl z-20 w-52 py-1 animate-scale-in">
                  {[
                    { icon: Clock, label: 'Save to Watch Later' },
                    { icon: ListVideo, label: 'Add to Playlist' },
                    { icon: ListVideo, label: 'Add to Queue' },
                    { icon: Share2, label: 'Share' },
                    { icon: Flag, label: 'Report' },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Icon size={15} />
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {showChannel && (
            <Link href={`/channel/${video.channelId}`} className="block mt-1">
              <span className="text-xs text-white/45 hover:text-white/70 transition-colors">{video.channelName}</span>
            </Link>
          )}
          <p className="text-xs text-white/35 mt-0.5">
            {video.isLive
              ? <><span className="text-red-400 font-medium">{formatViews(video.views)} watching</span></>
              : <>{formatViews(video.views)} views · {formatTimeAgo(video.uploadedAt)}</>
            }
          </p>
        </div>
      </div>
    </div>
  )
}
