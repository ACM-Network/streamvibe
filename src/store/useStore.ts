// src/store/useStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Video } from '@/utils/mockData'

interface WatchHistoryEntry {
  video: Video
  watchedAt: string
  progress: number
}

interface AppState {
  // Sidebar
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void

  // Search
  searchQuery: string
  setSearchQuery: (q: string) => void

  // Liked videos
  likedVideos: string[]
  toggleLike: (id: string) => void

  // Disliked videos
  dislikedVideos: string[]
  toggleDislike: (id: string) => void

  // Saved / Watch Later
  savedVideos: string[]
  toggleSaved: (id: string) => void

  // Subscriptions
  subscriptions: string[]
  toggleSubscription: (channelId: string) => void

  // Watch history
  watchHistory: WatchHistoryEntry[]
  addToHistory: (video: Video, progress: number) => void
  clearHistory: () => void

  // Player
  playerVolume: number
  setPlayerVolume: (v: number) => void
  playerMuted: boolean
  setPlayerMuted: (v: boolean) => void
  autoplay: boolean
  setAutoplay: (v: boolean) => void

  // Playlist queue
  queue: Video[]
  addToQueue: (video: Video) => void
  removeFromQueue: (id: string) => void
  clearQueue: () => void

  // Notifications
  notificationsEnabled: string[]
  toggleNotification: (channelId: string) => void

  // User playlists
  playlists: { id: string; name: string; videoIds: string[] }[]
  createPlaylist: (name: string) => void
  addToPlaylist: (playlistId: string, videoId: string) => void
  removeFromPlaylist: (playlistId: string, videoId: string) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),

      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),

      likedVideos: [],
      toggleLike: (id) => set((s) => ({
        likedVideos: s.likedVideos.includes(id)
          ? s.likedVideos.filter((v) => v !== id)
          : [...s.likedVideos.filter((v) => v !== id), id],
        dislikedVideos: s.dislikedVideos.filter((v) => v !== id),
      })),

      dislikedVideos: [],
      toggleDislike: (id) => set((s) => ({
        dislikedVideos: s.dislikedVideos.includes(id)
          ? s.dislikedVideos.filter((v) => v !== id)
          : [...s.dislikedVideos.filter((v) => v !== id), id],
        likedVideos: s.likedVideos.filter((v) => v !== id),
      })),

      savedVideos: [],
      toggleSaved: (id) => set((s) => ({
        savedVideos: s.savedVideos.includes(id)
          ? s.savedVideos.filter((v) => v !== id)
          : [...s.savedVideos, id],
      })),

      subscriptions: [],
      toggleSubscription: (channelId) => set((s) => ({
        subscriptions: s.subscriptions.includes(channelId)
          ? s.subscriptions.filter((c) => c !== channelId)
          : [...s.subscriptions, channelId],
      })),

      watchHistory: [],
      addToHistory: (video, progress) => set((s) => ({
        watchHistory: [
          { video, watchedAt: new Date().toISOString(), progress },
          ...s.watchHistory.filter((h) => h.video.id !== video.id).slice(0, 99),
        ],
      })),
      clearHistory: () => set({ watchHistory: [] }),

      playerVolume: 80,
      setPlayerVolume: (v) => set({ playerVolume: v }),
      playerMuted: false,
      setPlayerMuted: (v) => set({ playerMuted: v }),
      autoplay: true,
      setAutoplay: (v) => set({ autoplay: v }),

      queue: [],
      addToQueue: (video) => set((s) => ({
        queue: s.queue.find((v) => v.id === video.id)
          ? s.queue
          : [...s.queue, video],
      })),
      removeFromQueue: (id) => set((s) => ({
        queue: s.queue.filter((v) => v.id !== id),
      })),
      clearQueue: () => set({ queue: [] }),

      notificationsEnabled: [],
      toggleNotification: (channelId) => set((s) => ({
        notificationsEnabled: s.notificationsEnabled.includes(channelId)
          ? s.notificationsEnabled.filter((c) => c !== channelId)
          : [...s.notificationsEnabled, channelId],
      })),

      playlists: [
        { id: 'wl', name: 'Watch Later', videoIds: [] },
        { id: 'fav', name: 'Favorites', videoIds: [] },
      ],
      createPlaylist: (name) => set((s) => ({
        playlists: [...s.playlists, { id: Date.now().toString(), name, videoIds: [] }],
      })),
      addToPlaylist: (playlistId, videoId) => set((s) => ({
        playlists: s.playlists.map((p) =>
          p.id === playlistId
            ? { ...p, videoIds: Array.from(new Set([...p.videoIds, videoId])) }
            : p
        ),
      })),
      removeFromPlaylist: (playlistId, videoId) => set((s) => ({
        playlists: s.playlists.map((p) =>
          p.id === playlistId
            ? { ...p, videoIds: p.videoIds.filter((v) => v !== videoId) }
            : p
        ),
      })),
    }),
    {
      name: 'streamvibe-store',
      partialize: (state) => ({
        likedVideos: state.likedVideos,
        dislikedVideos: state.dislikedVideos,
        savedVideos: state.savedVideos,
        subscriptions: state.subscriptions,
        watchHistory: state.watchHistory,
        playerVolume: state.playerVolume,
        playerMuted: state.playerMuted,
        autoplay: state.autoplay,
        sidebarCollapsed: state.sidebarCollapsed,
        playlists: state.playlists,
        notificationsEnabled: state.notificationsEnabled,
        queue: state.queue,
      }),
    }
  )
)
