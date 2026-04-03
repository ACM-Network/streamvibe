'use client'
import { useState } from 'react'
import { ListVideo, Plus, Lock, Globe, Pencil, Trash2, Play } from 'lucide-react'
import Link from 'next/link'
import { MOCK_VIDEOS } from '@/utils/mockData'
import { useStore } from '@/store/useStore'
import toast from 'react-hot-toast'

export default function PlaylistsPage() {
  const { playlists, createPlaylist } = useStore()
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)

  const handleCreate = () => {
    if (newName.trim()) {
      createPlaylist(newName.trim())
      setNewName('')
      setCreating(false)
      toast.success(`Playlist "${newName}" created!`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
            <ListVideo size={20} className="text-white/70" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-white">Playlists</h1>
            <p className="text-sm text-white/40">{playlists.length} playlists</p>
          </div>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-all shadow-glow-red"
        >
          <Plus size={15} />
          New Playlist
        </button>
      </div>

      {creating && (
        <div className="mb-6 p-5 rounded-2xl bg-surface-850 border border-white/[0.08] animate-slide-down">
          <h3 className="font-semibold text-white mb-3">New Playlist</h3>
          <input
            autoFocus
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
            placeholder="Playlist name..."
            className="w-full bg-surface-700 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-500/50 mb-3"
          />
          <div className="flex gap-2">
            <button onClick={handleCreate} className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors">Create</button>
            <button onClick={() => setCreating(false)} className="px-5 py-2 rounded-xl hover:bg-white/[0.06] text-white/50 text-sm transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {playlists.map(pl => {
          const thumb = pl.videoIds.length
            ? MOCK_VIDEOS.find(v => v.id === pl.videoIds[0])?.thumbnail
            : MOCK_VIDEOS[Math.floor(Math.random() * MOCK_VIDEOS.length)].thumbnail

          return (
            <div key={pl.id} className="group rounded-2xl bg-surface-850 border border-white/[0.05] overflow-hidden hover:border-white/10 transition-all">
              <div className="relative aspect-video bg-surface-800 overflow-hidden">
                {thumb && <img src={thumb} alt={pl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70" />}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                    <Play size={20} fill="white" className="text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-medium">
                  {pl.videoIds.length} videos
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-white text-sm line-clamp-1">{pl.name}</h3>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg hover:bg-white/[0.08] text-white/40 hover:text-white transition-all"><Pencil size={13} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Lock size={11} className="text-white/30" />
                  <span className="text-xs text-white/30">Private</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
