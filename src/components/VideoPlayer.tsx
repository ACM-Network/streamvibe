'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play, Pause, Volume2, VolumeX, Volume1,
  Maximize, Minimize, Settings, Subtitles,
  SkipBack, SkipForward, ChevronRight, ChevronLeft,
  PictureInPicture2, RotateCcw, RotateCw,
  Gauge, Layers, Check, Theater, Cast,
  Bookmark, Share2, Download, Keyboard, X
} from 'lucide-react'
import { Video, formatDuration } from '@/utils/mockData'
import { useStore } from '@/store/useStore'
import clsx from 'clsx'

interface Props {
  video: Video
  autoplay?: boolean
  onEnded?: () => void
  theaterMode?: boolean
  onTheaterToggle?: () => void
}

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

export default function VideoPlayer({ video, autoplay = false, onEnded, theaterMode, onTheaterToggle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const { playerVolume, setPlayerVolume, playerMuted, setPlayerMuted, addToHistory } = useStore()

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [volume, setVolume] = useState(playerVolume)
  const [muted, setMuted] = useState(playerMuted)
  const [fullscreen, setFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [quality, setQuality] = useState(video.quality?.[0] || '1080p')
  const [speed, setSpeed] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const [settingsTab, setSettingsTab] = useState<'main' | 'quality' | 'speed' | 'subtitles'>('main')
  const [showSubtitles, setShowSubtitles] = useState(false)
  const [selectedSubtitle, setSelectedSubtitle] = useState('English')
  const [pip, setPip] = useState(false)
  const [hoveredTime, setHoveredTime] = useState<number | null>(null)
  const [hoveredX, setHoveredX] = useState(0)
  const [miniPlayer, setMiniPlayer] = useState(false)
  const [showKeyShortcuts, setShowKeyShortcuts] = useState(false)
  const [seekPreview, setSeekPreview] = useState<string | null>(null)
  const [looping, setLooping] = useState(false)
  const [showBookmarkToast, setShowBookmarkToast] = useState(false)

  const controlsTimeout = useRef<NodeJS.Timeout>()

  const resetControlsTimer = useCallback(() => {
    setShowControls(true)
    clearTimeout(controlsTimeout.current)
    controlsTimeout.current = setTimeout(() => {
      if (playing) setShowControls(false)
    }, 3000)
  }, [playing])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    const onLoadedMetadata = () => setDuration(vid.duration)
    const onTimeUpdate = () => {
      setCurrentTime(vid.currentTime)
      if (vid.buffered.length > 0) {
        setBuffered(vid.buffered.end(vid.buffered.length - 1))
      }
    }
    const onEnded = () => { setPlaying(false); setShowControls(true) }

    vid.addEventListener('loadedmetadata', onLoadedMetadata)
    vid.addEventListener('timeupdate', onTimeUpdate)
    vid.addEventListener('ended', onEnded)
    return () => {
      vid.removeEventListener('loadedmetadata', onLoadedMetadata)
      vid.removeEventListener('timeupdate', onTimeUpdate)
      vid.removeEventListener('ended', onEnded)
    }
  }, [])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    if (playing) vid.play().catch(() => setPlaying(false))
    else vid.pause()
  }, [playing])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.volume = volume / 100
    vid.muted = muted
  }, [volume, muted])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.playbackRate = speed
  }, [speed])

  useEffect(() => {
    if (currentTime > 5) {
      addToHistory(video, currentTime / (duration || 1))
    }
  }, [Math.floor(currentTime / 10)])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const vid = videoRef.current
      switch (e.key) {
        case ' ': case 'k': e.preventDefault(); setPlaying(p => !p); break
        case 'ArrowRight': case 'l': e.preventDefault(); if (vid) vid.currentTime = Math.min(vid.currentTime + 10, duration); break
        case 'ArrowLeft': case 'j': e.preventDefault(); if (vid) vid.currentTime = Math.max(vid.currentTime - 10, 0); break
        case 'ArrowUp': e.preventDefault(); setVolume(v => Math.min(v + 5, 100)); break
        case 'ArrowDown': e.preventDefault(); setVolume(v => Math.max(v - 5, 0)); break
        case 'm': setMuted(m => !m); break
        case 'f': toggleFullscreen(); break
        case 'c': setShowSubtitles(s => !s); break
        case '?': setShowKeyShortcuts(s => !s); break
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7': case '8': case '9':
          if (vid) vid.currentTime = (parseInt(e.key) / 10) * duration
          break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [duration])

  const toggleFullscreen = async () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen()
      setFullscreen(true)
    } else {
      await document.exitFullscreen()
      setFullscreen(false)
    }
  }

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const togglePip = async () => {
    const vid = videoRef.current
    if (!vid) return
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture()
      setPip(false)
    } else {
      await vid.requestPictureInPicture()
      setPip(true)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current!.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    if (videoRef.current) videoRef.current.currentTime = pct * duration
  }

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressRef.current!.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    setHoveredTime(pct * duration)
    setHoveredX(e.clientX - rect.left)
  }

  const getChapterTitle = (time: number) => {
    if (!video.chapters) return null
    const chapter = [...video.chapters].reverse().find(c => time >= c.time)
    return chapter?.title || null
  }

  const progressPct = duration ? (currentTime / duration) * 100 : 0
  const bufferedPct = duration ? (buffered / duration) * 100 : 0

  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2

  return (
    <>
      <div
        ref={containerRef}
        className={clsx(
          'vp-container select-none',
          theaterMode ? 'rounded-none' : 'rounded-2xl',
          fullscreen && 'rounded-none'
        )}
        onMouseMove={resetControlsTimer}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => { if (playing) setShowControls(false) }}
        onClick={() => setPlaying(p => !p)}
        onDoubleClick={toggleFullscreen}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={video.url}
          autoPlay
          className="w-full h-full object-contain"
          preload="metadata"
          loop={looping}
          playsInline
          onClick={e => e.stopPropagation()}
        />

        {/* Play/Pause overlay flash */}
        <div
          className={clsx(
            'absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200',
            showControls ? 'opacity-0' : ''
          )}
        />

        {/* Controls */}
        <div
          className={clsx(
            'vp-controls',
            showControls ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-300'
          )}
          onClick={e => e.stopPropagation()}
        >
          {/* Chapter Title */}
          {video.chapters && (
            <div className="mb-3">
              <span className="text-xs font-medium text-white/60 bg-white/10 px-2 py-1 rounded-full">
                {getChapterTitle(currentTime) || 'Intro'}
              </span>
            </div>
          )}

          {/* Progress Bar */}
          <div
            ref={progressRef}
            className="relative h-1 hover:h-2 bg-white/20 rounded-full mb-4 cursor-pointer transition-all duration-150 group"
            onClick={handleProgressClick}
            onMouseMove={handleProgressHover}
            onMouseLeave={() => setHoveredTime(null)}
          >
            {/* Buffered */}
            <div
              className="absolute left-0 top-0 h-full bg-white/30 rounded-full"
              style={{ width: `${bufferedPct}%` }}
            />
            {/* Progress */}
            <div
              className="absolute left-0 top-0 h-full bg-brand-500 rounded-full"
              style={{ width: `${progressPct}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2" />
            </div>

            {/* Chapter markers */}
            {video.chapters?.map((c, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-0.5 h-2 bg-white/50 rounded-full"
                style={{ left: `${(c.time / duration) * 100}%` }}
              />
            ))}

            {/* Time tooltip on hover */}
            {hoveredTime !== null && (
              <div
                className="absolute bottom-5 glass px-2 py-1 rounded-lg text-xs text-white whitespace-nowrap pointer-events-none"
                style={{ left: `${hoveredX}px`, transform: 'translateX(-50%)' }}
              >
                {formatDuration(Math.floor(hoveredTime))}
                {video.chapters && (
                  <div className="text-white/50">{getChapterTitle(hoveredTime)}</div>
                )}
              </div>
            )}
          </div>

          {/* Bottom controls */}
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              className="p-1 text-white hover:text-brand-300 transition-colors"
              onClick={() => setPlaying(p => !p)}
            >
              {playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
            </button>

            {/* Skip */}
            <button
              className="p-1 text-white/70 hover:text-white transition-colors"
              onClick={() => { if (videoRef.current) videoRef.current.currentTime -= 10 }}
              title="Back 10s (J)"
            >
              <SkipBack size={18} />
            </button>
            <button
              className="p-1 text-white/70 hover:text-white transition-colors"
              onClick={() => { if (videoRef.current) videoRef.current.currentTime += 10 }}
              title="Forward 10s (L)"
            >
              <SkipForward size={18} />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 group/vol">
              <button
                className="p-1 text-white/70 hover:text-white transition-colors"
                onClick={() => setMuted(m => !m)}
              >
                <VolumeIcon size={18} />
              </button>
              <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={muted ? 0 : volume}
                  onChange={e => { setVolume(+e.target.value); setMuted(false); setPlayerVolume(+e.target.value) }}
                  className="w-20"
                  style={{
                    background: `linear-gradient(to right, var(--brand) 0%, var(--brand) ${muted ? 0 : volume}%, rgba(255,255,255,0.2) ${muted ? 0 : volume}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
              </div>
            </div>

            {/* Time */}
            <span className="text-sm font-mono text-white/80 whitespace-nowrap">
              {formatDuration(Math.floor(currentTime))} / {formatDuration(Math.floor(duration))}
            </span>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Speed indicator */}
            {speed !== 1 && (
              <span className="text-xs font-bold text-brand-400 px-2 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20">
                {speed}x
              </span>
            )}

            {/* Subtitles */}
            {(video.subtitles?.length || 0) > 0 && (
              <button
                className={clsx('p-1 transition-colors', showSubtitles ? 'text-brand-400' : 'text-white/70 hover:text-white')}
                onClick={() => setShowSubtitles(s => !s)}
                title="Subtitles (C)"
              >
                <Subtitles size={18} />
              </button>
            )}

            {/* Bookmark */}
            <button
              className="p-1 text-white/70 hover:text-white transition-colors"
              onClick={() => { setShowBookmarkToast(true); setTimeout(() => setShowBookmarkToast(false), 2000) }}
              title="Bookmark current time"
            >
              <Bookmark size={17} />
            </button>

            {/* PiP */}
            <button className="p-1 text-white/70 hover:text-white transition-colors hidden md:block" onClick={togglePip} title="Picture in Picture">
              <PictureInPicture2 size={17} />
            </button>

            {/* Theater */}
            {onTheaterToggle && (
              <button className="p-1 text-white/70 hover:text-white transition-colors hidden md:block" onClick={onTheaterToggle} title="Theater Mode">
                <Theater size={17} />
              </button>
            )}

            {/* Settings */}
            <div className="relative">
              <button
                className={clsx('p-1 transition-colors', showSettings ? 'text-brand-400' : 'text-white/70 hover:text-white')}
                onClick={() => { setShowSettings(s => !s); setSettingsTab('main') }}
                title="Settings"
              >
                <Settings size={17} className={showSettings ? 'animate-spin-slow' : ''} />
              </button>

              {showSettings && (
                <div className="absolute bottom-10 right-0 glass rounded-2xl border border-white/[0.08] shadow-xl z-30 w-64 overflow-hidden animate-scale-in">
                  {settingsTab === 'main' && (
                    <div className="py-2">
                      <p className="px-4 py-2 text-xs font-semibold text-white/30 uppercase tracking-wider">Playback Settings</p>
                      {[
                        { label: 'Quality', value: quality, tab: 'quality' as const, icon: Layers },
                        { label: 'Speed', value: `${speed}x`, tab: 'speed' as const, icon: Gauge },
                        { label: 'Subtitles', value: showSubtitles ? selectedSubtitle : 'Off', tab: 'subtitles' as const, icon: Subtitles },
                      ].map(({ label, value, tab, icon: Icon }) => (
                        <button
                          key={label}
                          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.06] transition-colors"
                          onClick={() => setSettingsTab(tab)}
                        >
                          <div className="flex items-center gap-3 text-sm text-white/80">
                            <Icon size={15} className="text-white/40" />
                            {label}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/40">
                            <span>{value}</span>
                            <ChevronRight size={14} />
                          </div>
                        </button>
                      ))}
                      <div className="mx-4 my-2 h-px bg-white/[0.06]" />
                      <button
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.06]"
                        onClick={() => setLooping(l => !l)}
                      >
                        <span className="text-sm text-white/80">Loop</span>
                        <div className={clsx('w-9 h-5 rounded-full transition-colors relative', looping ? 'bg-brand-500' : 'bg-white/20')}>
                          <div className={clsx('absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform', looping ? 'translate-x-4' : 'translate-x-0.5')} />
                        </div>
                      </button>
                    </div>
                  )}

                  {settingsTab === 'quality' && (
                    <div className="py-2">
                      <button className="flex items-center gap-2 px-4 py-2 text-sm text-white/50 hover:text-white" onClick={() => setSettingsTab('main')}>
                        <ChevronLeft size={16} /> Quality
                      </button>
                      {(video.quality || ['1080p', '720p', '480p']).map(q => (
                        <button
                          key={q}
                          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.06] text-sm"
                          onClick={() => { setQuality(q); setSettingsTab('main') }}
                        >
                          <span className={quality === q ? 'text-brand-400 font-semibold' : 'text-white/80'}>{q}</span>
                          {quality === q && <Check size={14} className="text-brand-400" />}
                        </button>
                      ))}
                    </div>
                  )}

                  {settingsTab === 'speed' && (
                    <div className="py-2">
                      <button className="flex items-center gap-2 px-4 py-2 text-sm text-white/50 hover:text-white" onClick={() => setSettingsTab('main')}>
                        <ChevronLeft size={16} /> Playback Speed
                      </button>
                      {SPEEDS.map(s => (
                        <button
                          key={s}
                          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.06] text-sm"
                          onClick={() => { setSpeed(s); setSettingsTab('main') }}
                        >
                          <span className={speed === s ? 'text-brand-400 font-semibold' : 'text-white/80'}>{s === 1 ? 'Normal' : `${s}x`}</span>
                          {speed === s && <Check size={14} className="text-brand-400" />}
                        </button>
                      ))}
                    </div>
                  )}

                  {settingsTab === 'subtitles' && (
                    <div className="py-2">
                      <button className="flex items-center gap-2 px-4 py-2 text-sm text-white/50 hover:text-white" onClick={() => setSettingsTab('main')}>
                        <ChevronLeft size={16} /> Subtitles
                      </button>
                      <button
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.06] text-sm"
                        onClick={() => { setShowSubtitles(false); setSettingsTab('main') }}
                      >
                        <span className={!showSubtitles ? 'text-brand-400 font-semibold' : 'text-white/80'}>Off</span>
                        {!showSubtitles && <Check size={14} className="text-brand-400" />}
                      </button>
                      {(video.subtitles || []).map(sub => (
                        <button
                          key={sub}
                          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.06] text-sm"
                          onClick={() => { setSelectedSubtitle(sub); setShowSubtitles(true); setSettingsTab('main') }}
                        >
                          <span className={showSubtitles && selectedSubtitle === sub ? 'text-brand-400 font-semibold' : 'text-white/80'}>{sub}</span>
                          {showSubtitles && selectedSubtitle === sub && <Check size={14} className="text-brand-400" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button
              className="p-1 text-white/70 hover:text-white transition-colors"
              onClick={toggleFullscreen}
              title="Fullscreen (F)"
            >
              {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>

        {/* Center play/pause visual */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={clsx(
            'w-16 h-16 rounded-full bg-black/50 flex items-center justify-center transition-all duration-200',
            showControls && !playing ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          )}>
            <Play size={28} fill="white" className="text-white ml-1" />
          </div>
        </div>

        {/* Subtitle display */}
        {showSubtitles && (
          <div className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none px-4">
            <span className="bg-black/80 text-white text-sm px-3 py-1 rounded-lg font-medium text-center">
              [Subtitle text would appear here - {selectedSubtitle}]
            </span>
          </div>
        )}

        {/* Bookmark toast */}
        {showBookmarkToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full text-sm text-white border border-white/10 animate-fade-in">
            <Bookmark size={14} className="inline mr-2 text-brand-400" />
            Bookmarked at {formatDuration(Math.floor(currentTime))}
          </div>
        )}
      </div>

      {/* Keyboard shortcuts modal */}
      {showKeyShortcuts && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowKeyShortcuts(false)}>
          <div className="glass rounded-3xl p-6 w-full max-w-lg border border-white/10 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg">Keyboard Shortcuts</h3>
              <button onClick={() => setShowKeyShortcuts(false)} className="p-2 rounded-full hover:bg-white/10 text-white/50">
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                ['Space / K', 'Play / Pause'],
                ['← / J', 'Back 10 seconds'],
                ['→ / L', 'Forward 10 seconds'],
                ['↑ / ↓', 'Volume up / down'],
                ['M', 'Mute / Unmute'],
                ['F', 'Toggle Fullscreen'],
                ['C', 'Toggle Subtitles'],
                ['0-9', 'Seek to 0%-90%'],
                ['?', 'Show shortcuts'],
              ].map(([key, action]) => (
                <div key={key} className="flex items-center gap-3 py-2 border-b border-white/[0.05]">
                  <kbd className="px-2 py-0.5 bg-white/10 rounded-md text-xs font-mono text-white/70 whitespace-nowrap">{key}</kbd>
                  <span className="text-white/60">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
