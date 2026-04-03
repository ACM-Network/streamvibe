'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Search, Mic, Bell, Upload, Menu, X,
  Sun, Moon, ChevronRight, Sparkles, Flame
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { MOCK_VIDEOS } from '@/utils/mockData'

export default function Navbar() {
  const router = useRouter()
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isDark, setIsDark] = useState(true)
  const [uploadModal, setUploadModal] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toggleSidebar } = useStore()

  useEffect(() => {
    if (searchValue.length > 1) {
      const filtered = MOCK_VIDEOS
        .filter(v => v.title.toLowerCase().includes(searchValue.toLowerCase()))
        .slice(0, 6)
        .map(v => v.title)
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [searchValue])

  const handleSearch = (q: string) => {
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`)
      setSuggestions([])
      setSearchValue(q)
      inputRef.current?.blur()
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch(searchValue)
    if (e.key === 'Escape') { setSuggestions([]); inputRef.current?.blur() }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass border-b border-white/[0.06] flex items-center px-4 gap-4">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-white/[0.06] transition-all text-white/70 hover:text-white"
          >
            <Menu size={20} />
          </button>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-glow-red group-hover:shadow-glow-red-lg transition-all">
              <Flame size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight hidden sm:block">
              Stream<span className="gradient-text">Vibe</span>
            </span>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 flex items-center justify-center max-w-2xl mx-auto">
          <div className={`relative flex-1 transition-all duration-300 ${searchFocused ? 'scale-[1.02]' : ''}`}>
            <div className={`flex items-center rounded-full border transition-all duration-200 overflow-hidden ${
              searchFocused
                ? 'border-brand-500 shadow-glow-red bg-surface-800'
                : 'border-white/10 bg-surface-800 hover:border-white/20'
            }`}>
              <Search size={16} className="ml-4 text-white/40 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search videos, channels, playlists..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => { setSearchFocused(false); setSuggestions([]) }, 200)}
                onKeyDown={handleKey}
                className="flex-1 px-3 py-2.5 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none"
              />
              {searchValue && (
                <button
                  onClick={() => { setSearchValue(''); setSuggestions([]) }}
                  className="mr-2 p-1 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all"
                >
                  <X size={14} />
                </button>
              )}
              <button
                onClick={() => handleSearch(searchValue)}
                className="h-full px-5 py-2.5 bg-white/[0.07] hover:bg-white/[0.12] border-l border-white/10 text-white/60 hover:text-white transition-all flex-shrink-0"
              >
                <Search size={16} />
              </button>
            </div>

            {/* Search Suggestions */}
            {suggestions.length > 0 && searchFocused && (
              <div className="absolute top-full mt-2 left-0 right-0 glass rounded-2xl overflow-hidden shadow-xl border border-white/[0.08] z-50 animate-slide-down">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.06] text-left transition-colors group"
                    onMouseDown={() => handleSearch(s)}
                  >
                    <Search size={14} className="text-white/30 flex-shrink-0" />
                    <span className="text-sm text-white/80 group-hover:text-white flex-1 line-clamp-1">{s}</span>
                    <ChevronRight size={14} className="text-white/20 group-hover:text-white/40" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Voice Search */}
          <button className="ml-3 p-2.5 rounded-full bg-surface-800 hover:bg-surface-700 border border-white/10 hover:border-white/20 transition-all text-white/60 hover:text-white tooltip" data-tip="Voice search">
            <Mic size={18} />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Upload */}
          <button
            onClick={() => setUploadModal(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass-light hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all text-sm font-medium text-white/80 hover:text-white"
          >
            <Upload size={15} />
            <span>Upload</span>
          </button>

          {/* AI */}
          <button className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-purple-900/40 to-brand-900/40 border border-purple-500/20 hover:border-purple-500/40 transition-all text-sm text-purple-300 hover:text-purple-200">
            <Sparkles size={15} />
            <span>AI</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-white/[0.06] transition-all text-white/60 hover:text-white">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-500 border-2 border-surface-950" />
          </button>

          {/* Avatar */}
          <Link href="/channel/me" className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/10 hover:ring-brand-500/50 transition-all">
            <img src="https://picsum.photos/seed/me/100/100" alt="You" className="w-full h-full object-cover" />
          </Link>
        </div>
      </nav>

      {/* Upload Modal */}
      {uploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setUploadModal(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative glass rounded-3xl p-8 w-full max-w-md animate-scale-in border border-white/10" onClick={e => e.stopPropagation()}>
            <button onClick={() => setUploadModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all">
              <X size={20} />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
                <Upload size={28} className="text-brand-400" />
              </div>
              <h2 className="font-display font-bold text-xl mb-2">Upload Video</h2>
              <p className="text-white/50 text-sm mb-6">Share your video with the StreamVibe community</p>
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 hover:border-brand-500/40 transition-colors cursor-pointer mb-4 group">
                <Upload size={32} className="mx-auto mb-3 text-white/20 group-hover:text-brand-400 transition-colors" />
                <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors">Drag & drop or click to select</p>
                <p className="text-white/30 text-xs mt-1">MP4, MOV, AVI up to 20GB</p>
              </div>
              <button className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-all shadow-glow-red hover:shadow-glow-red-lg">
                Select File
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
