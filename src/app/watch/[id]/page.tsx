'use client'
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ThumbsUp, ThumbsDown, Share2, Download, BookMarked,
  MoreHorizontal, Bell, BellOff, ChevronDown, ChevronUp,
  CheckCircle2, ListVideo, Shuffle, Theater, X, Plus,
  Flag, Scissors, Lightbulb, MessageSquare, SortDesc
} from 'lucide-react'
import VideoPlayer from '@/components/VideoPlayer'
import VideoCard from '@/components/VideoCard'
import { MOCK_VIDEOS, MOCK_COMMENTS, Video, Comment, formatViews, formatTimeAgo, formatSubscribers } from '@/utils/mockData'
import { useStore } from '@/store/useStore'
import clsx from 'clsx'
import toast from 'react-hot-toast'

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [showReplies, setShowReplies] = useState(false)
  const [views, setViews] = useState(0);
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [replying, setReplying] = useState(false)
  const [replyText, setReplyText] = useState('')

  return (
    <div className={clsx('flex gap-3', depth > 0 && 'ml-10')}>
      <img src={comment.userAvatar} alt={comment.userName} className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-white/90">{comment.userName}</span>
          {comment.pinned && (
            <span className="text-xs text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full border border-brand-500/20">Pinned</span>
          )}
          <span className="text-xs text-white/30">{formatTimeAgo(comment.timestamp)}</span>
        </div>
        <p className="text-sm text-white/75 mt-1 leading-relaxed">{comment.text}</p>
        {comment.creatorHeart && (
          <div className="flex items-center gap-1 mt-1.5">
            <img src="https://picsum.photos/seed/ava1/20/20" alt="" className="w-4 h-4 rounded-full" />
            <span className="text-xs text-red-400 font-medium">❤️ Creator heart</span>
          </div>
        )}
        <div className="flex items-center gap-4 mt-2">
          <button
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
            onClick={() => setLiked(l => !l)}
          >
            <ThumbsUp size={13} className={liked ? 'text-brand-400 fill-current' : ''} />
            <span>{formatViews(comment.likes + (liked ? 1 : 0))}</span>
          </button>
          <button className="text-xs text-white/40 hover:text-white transition-colors" onClick={() => setDisliked(d => !d)}>
            <ThumbsDown size={13} className={disliked ? 'text-red-400 fill-current' : ''} />
          </button>
          <button className="text-xs text-white/40 hover:text-white transition-colors font-medium" onClick={() => setReplying(r => !r)}>
            Reply
          </button>
        </div>
        {replying && (
          <div className="mt-3 flex gap-2">
            <input
              autoFocus
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Add a reply..."
              className="flex-1 bg-surface-700 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-500/50"
            />
            <button
              className="px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors"
              onClick={() => { setReplying(false); setReplyText(''); toast.success('Reply posted!') }}
            >Reply</button>
            <button className="px-3 py-2 rounded-xl hover:bg-white/10 text-white/50 text-sm" onClick={() => setReplying(false)}>Cancel</button>
          </div>
        )}
        {comment.replies.length > 0 && (
          <button
            className="mt-3 flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors"
            onClick={() => setShowReplies(s => !s)}
          >
            {showReplies ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
          </button>
        )}
        {showReplies && (
          <div className="mt-4 space-y-4">
            {comment.replies.map(r => <CommentItem key={r.id} comment={r} depth={depth + 1} />)}
          </div>
        )}
      </div>
    </div>
  )
}

export default function WatchPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const video = MOCK_VIDEOS.find(v => v.id === id) || MOCK_VIDEOS[0]
  const related = MOCK_VIDEOS.filter(v => v.id !== video.id)

  const { likedVideos, dislikedVideos, savedVideos, subscriptions, notificationsEnabled, toggleLike, toggleDislike, toggleSaved, toggleSubscription, toggleNotification, addToQueue, autoplay, setAutoplay } = useStore()

  const liked = likedVideos.includes(video.id)
  const disliked = dislikedVideos.includes(video.id)
  const saved = savedVideos.includes(video.id)
  const subscribed = subscriptions.includes(video.channelId)
  const notifications = notificationsEnabled.includes(video.channelId)

  const [descExpanded, setDescExpanded] = useState(false)
  const [theaterMode, setTheaterMode] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [sortComments, setSortComments] = useState<'top' | 'new'>('top')
  const [shareModal, setShareModal] = useState(false)
  const [playlistModal, setPlaylistModal] = useState(false)
  const [showQueue, setShowQueue] = useState(false)

  const { playlists, createPlaylist, addToPlaylist, queue } = useStore()
  const [newPlaylistName, setNewPlaylistName] = useState('')

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
    setShareModal(false)
  }

  const handleAutoplayNext = () => {
    const idx = MOCK_VIDEOS.findIndex(v => v.id === video.id)
    const next = MOCK_VIDEOS[(idx + 1) % MOCK_VIDEOS.length]
    router.push(`/watch/${next.id}`)
  }

  return (
    <div className={clsx('min-h-screen', theaterMode && 'bg-black')}>
      <div className={clsx(
        'flex gap-6',
        theaterMode ? 'flex-col' : 'flex-col xl:flex-row',
        theaterMode ? 'max-w-none px-0' : 'max-w-[1800px] mx-auto px-6 py-6'
      )}>

        {/* Main Content */}
        <div className={clsx('flex-1 min-w-0', theaterMode && 'px-0')}>

          {/* Player */}
          <div className={clsx(theaterMode ? 'w-full max-h-[80vh]' : '')}>
            <VideoPlayer
              video={video}
              theaterMode={theaterMode}
              onTheaterToggle={() => setTheaterMode(t => !t)}
              onEnded={autoplay ? handleAutoplayNext : undefined}
            />
          </div>

          {/* Video Info */}
          <div className={clsx('mt-4', theaterMode && 'px-6')}>
            {/* Title */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-display font-bold text-xl text-white leading-tight flex-1">
                {video.title}
              </h1>
              <button className="p-2 rounded-xl hover:bg-white/[0.06] text-white/40 hover:text-white transition-all flex-shrink-0">
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Stats + Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
              <p className="text-sm text-white/40">
                {video.isLive
                  ? <><span className="text-red-400 font-semibold">{formatViews(video.views)} watching live</span></>
                  : <>{formatViews(video.views)} views · {formatTimeAgo(video.uploadedAt)}</>
                }
              </p>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Like/Dislike */}
                <div className="flex rounded-full overflow-hidden border border-white/10">
                  <button
                    onClick={() => { toggleLike(video.id); liked ? toast('Like removed') : toast.success('Liked!') }}
                    className={clsx(
                      'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all border-r border-white/10',
                      liked ? 'bg-brand-500/15 text-brand-400' : 'bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white'
                    )}
                  >
                    <ThumbsUp size={15} className={liked ? 'fill-current' : ''} />
                    <span>{formatViews(video.likes + (liked ? 1 : 0))}</span>
                  </button>
                  <button
                    onClick={() => toggleDislike(video.id)}
                    className={clsx(
                      'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all',
                      disliked ? 'bg-red-500/15 text-red-400' : 'bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white'
                    )}
                  >
                    <ThumbsDown size={15} className={disliked ? 'fill-current' : ''} />
                  </button>
                </div>

                {/* Share */}
                <button
                  onClick={() => setShareModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-sm font-medium text-white/70 hover:text-white transition-all"
                >
                  <Share2 size={15} />
                  <span className="hidden sm:inline">Share</span>
                </button>

                {/* Save */}
                <button
                  onClick={() => { toggleSaved(video.id); toast(saved ? 'Removed from Watch Later' : 'Saved to Watch Later') }}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all',
                    saved
                      ? 'bg-brand-500/15 border-brand-500/30 text-brand-400'
                      : 'bg-white/[0.06] border-white/10 text-white/70 hover:text-white hover:bg-white/[0.12]'
                  )}
                >
                  <BookMarked size={15} className={saved ? 'fill-current' : ''} />
                  <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
                </button>

                {/* Add to Playlist */}
                <button
                  onClick={() => setPlaylistModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-sm font-medium text-white/70 hover:text-white transition-all"
                >
                  <Plus size={15} />
                  <span className="hidden sm:inline">Playlist</span>
                </button>

                {/* Queue */}
                <button
                  onClick={() => { addToQueue(video); toast.success('Added to queue') }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-sm font-medium text-white/70 hover:text-white transition-all"
                >
                  <ListVideo size={15} />
                </button>

                {/* Download */}
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-sm font-medium text-white/70 hover:text-white transition-all">
                  <Download size={15} />
                </button>

                {/* Clip */}
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-sm font-medium text-white/70 hover:text-white transition-all hidden md:flex">
                  <Scissors size={15} />
                  <span>Clip</span>
                </button>
              </div>
            </div>

            {/* Channel Info */}
            <div className="mt-4 p-4 rounded-2xl bg-surface-850/60 border border-white/[0.05]">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <Link href={`/channel/${video.channelId}`} className="flex items-center gap-3 group">
                  <img src={video.channelAvatar} alt={video.channelName} className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-brand-500/40 transition-all" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-white group-hover:text-brand-300 transition-colors">{video.channelName}</span>
                      <CheckCircle2 size={14} className="text-brand-400" />
                    </div>
                    <p className="text-xs text-white/40">{formatSubscribers(video.channelSubscribers)} subscribers</p>
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  {subscribed && (
                    <button
                      onClick={() => toggleNotification(video.channelId)}
                      className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/50 hover:text-white transition-all"
                    >
                      {notifications ? <Bell size={16} className="text-brand-400" /> : <BellOff size={16} />}
                    </button>
                  )}
                  <button
                    onClick={() => { toggleSubscription(video.channelId); toast(subscribed ? 'Unsubscribed' : `Subscribed to ${video.channelName}!`) }}
                    className={clsx(
                      'px-5 py-2 rounded-full text-sm font-semibold transition-all',
                      subscribed
                        ? 'bg-white/10 text-white/60 hover:bg-white/[0.15]'
                        : 'bg-white text-black hover:bg-white/90 shadow-lg'
                    )}
                  >
                    {subscribed ? 'Subscribed' : 'Subscribe'}
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <div className={clsx('text-sm text-white/60 leading-relaxed', !descExpanded && 'line-clamp-3')}>
                  {video.description}
                </div>
                <button
                  onClick={() => setDescExpanded(e => !e)}
                  className="mt-2 text-sm font-semibold text-white/80 hover:text-white transition-colors flex items-center gap-1"
                >
                  {descExpanded ? <><ChevronUp size={14} /> Show less</> : <><ChevronDown size={14} /> Show more</>}
                </button>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {video.tags.map(tag => (
                    <Link key={tag} href={`/search?q=${tag}`} className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Chapters */}
            {video.chapters && (
              <div className="mt-4 p-4 rounded-2xl bg-surface-850/60 border border-white/[0.05]">
                <h3 className="font-display font-semibold text-sm text-white/80 mb-3">Chapters</h3>
                <div className="space-y-2">
                  {video.chapters.map((c, i) => (
                    <button key={i} className="w-full flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-white/[0.06] transition-colors group text-left">
                      <span className="text-xs font-mono text-brand-400 w-12 flex-shrink-0">{Math.floor(c.time / 60)}:{(c.time % 60).toString().padStart(2, '0')}</span>
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors">{c.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MessageSquare size={18} className="text-white/40" />
                  <h3 className="font-display font-semibold text-base text-white">{formatViews(Math.floor(MOCK_COMMENTS.length * 840))} Comments</h3>
                </div>
                <button
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                  onClick={() => setSortComments(s => s === 'top' ? 'new' : 'top')}
                >
                  <SortDesc size={15} />
                  Sort: {sortComments === 'top' ? 'Top' : 'Newest'}
                </button>
              </div>

              {/* Comment Input */}
              <div className="flex gap-3 mb-6">
                <img src="https://picsum.photos/seed/me/50/50" alt="You" className="w-9 h-9 rounded-full flex-shrink-0 object-cover" />
                <div className="flex-1">
                  <input
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-transparent border-b border-white/10 focus:border-brand-500/50 pb-2 text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
                  />
                  {commentText && (
                    <div className="flex justify-end gap-2 mt-2">
                      <button className="px-4 py-1.5 rounded-full text-sm text-white/50 hover:text-white hover:bg-white/[0.06] transition-all" onClick={() => setCommentText('')}>Cancel</button>
                      <button
                        className="px-4 py-1.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-all"
                        onClick={() => { setCommentText(''); toast.success('Comment posted!') }}
                      >Comment</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {MOCK_COMMENTS.map(c => <CommentItem key={c.id} comment={c} />)}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Related */}
        <div className={clsx(
          'flex-shrink-0',
          theaterMode ? 'w-full px-6 pb-6' : 'xl:w-96',
        )}>
          {/* Autoplay Toggle */}
          <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-surface-850/60 border border-white/[0.05]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white/80">Autoplay</span>
            </div>
            <button
              onClick={() => setAutoplay(!autoplay)}
              className={clsx('w-10 h-5.5 rounded-full transition-colors relative h-5', autoplay ? 'bg-brand-500' : 'bg-white/20')}
            >
              <div className={clsx('absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform', autoplay ? 'translate-x-5' : 'translate-x-0.5')} />
            </button>
          </div>

          {/* Up Next */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm text-white/70">Up Next</h3>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all">
                  <Shuffle size={14} />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {related.map(v => (
                <VideoCard key={v.id} video={v} layout="compact" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShareModal(false)}>
          <div className="glass rounded-3xl p-6 w-full max-w-md border border-white/10 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg">Share Video</h3>
              <button onClick={() => setShareModal(false)} className="p-2 rounded-full hover:bg-white/10 text-white/50"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {['Twitter/X', 'Reddit', 'Discord', 'WhatsApp', 'Telegram', 'Email', 'Embed', 'More'].map(platform => (
                <button key={platform} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/[0.06] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Share2 size={16} className="text-white/60" />
                  </div>
                  <span className="text-xs text-white/50">{platform}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <div className="flex-1 bg-surface-700 border border-white/10 rounded-xl px-4 py-2 text-sm text-white/50 overflow-hidden whitespace-nowrap">
                {typeof window !== 'undefined' ? window.location.href : ''}
              </div>
              <button onClick={handleShare} className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors">
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Playlist Modal */}
      {playlistModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setPlaylistModal(false)}>
          <div className="glass rounded-3xl p-6 w-full max-w-sm border border-white/10 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg">Save to Playlist</h3>
              <button onClick={() => setPlaylistModal(false)} className="p-2 rounded-full hover:bg-white/10 text-white/50"><X size={18} /></button>
            </div>
            <div className="space-y-2 mb-4">
              {playlists.map(pl => (
                <button
                  key={pl.id}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] transition-colors text-left"
                  onClick={() => { addToPlaylist(pl.id, video.id); toast.success(`Added to "${pl.name}"`); setPlaylistModal(false) }}
                >
                  <div className="flex items-center gap-3">
                    <ListVideo size={16} className="text-white/40" />
                    <span className="text-sm text-white/80">{pl.name}</span>
                  </div>
                  <span className="text-xs text-white/30">{pl.videoIds.length} videos</span>
                </button>
              ))}
            </div>
            <div className="border-t border-white/[0.06] pt-4">
              <p className="text-xs text-white/30 mb-2">Create new playlist</p>
              <div className="flex gap-2">
                <input
                  value={newPlaylistName}
                  onChange={e => setNewPlaylistName(e.target.value)}
                  placeholder="Playlist name..."
                  className="flex-1 bg-surface-700 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-500/50"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newPlaylistName.trim()) {
                      const { createPlaylist } = useStore.getState()
                      createPlaylist(newPlaylistName)
                      setNewPlaylistName('')
                      toast.success('Playlist created!')
                    }
                  }}
                />
                <button
                  className="px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-colors"
                  onClick={() => {
                    if (newPlaylistName.trim()) {
                      const { createPlaylist } = useStore.getState()
                      createPlaylist(newPlaylistName)
                      setNewPlaylistName('')
                      toast.success('Playlist created!')
                    }
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
