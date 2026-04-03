'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, Grid, List, X } from 'lucide-react'
import VideoCard from '@/components/VideoCard'
import { MOCK_VIDEOS, Video, CATEGORIES } from '@/utils/mockData'
import clsx from 'clsx'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const [results, setResults] = useState<Video[]>([])
  const [layout, setLayout] = useState<'grid' | 'list'>('list')
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterDuration, setFilterDuration] = useState('Any')
  const [filterDate, setFilterDate] = useState('Any time')
  const [sort, setSort] = useState('Relevance')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const q = query.toLowerCase()
    const filtered = MOCK_VIDEOS.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.channelName.toLowerCase().includes(q) ||
      v.tags.some(t => t.toLowerCase().includes(q)) ||
      v.category.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q)
    )
    setResults(filtered.length ? filtered : MOCK_VIDEOS.slice(0, 8))
  }, [query])

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Search size={18} className="text-white/30" />
          <span className="text-sm text-white/40">Search results for</span>
        </div>
        <h1 className="font-display font-bold text-2xl text-white">"{query || 'Everything'}"</h1>
        <p className="text-sm text-white/35 mt-1">{results.length} results found</p>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button
          onClick={() => setShowFilters(f => !f)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all',
            showFilters ? 'bg-white text-black border-white' : 'bg-white/[0.06] border-white/10 text-white/70 hover:text-white'
          )}
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-sm text-white/70 focus:outline-none focus:border-brand-500/50 cursor-pointer"
        >
          {['Relevance', 'Upload date', 'View count', 'Rating'].map(s => (
            <option key={s} value={s} className="bg-surface-800">{s}</option>
          ))}
        </select>

        {/* Layout toggle */}
        <div className="flex ml-auto">
          <button onClick={() => setLayout('list')} className={clsx('p-2 rounded-l-xl border-y border-l border-white/10 transition-colors', layout === 'list' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white bg-white/[0.04]')}>
            <List size={16} />
          </button>
          <button onClick={() => setLayout('grid')} className={clsx('p-2 rounded-r-xl border border-white/10 transition-colors', layout === 'grid' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white bg-white/[0.04]')}>
            <Grid size={16} />
          </button>
        </div>
      </div>

      {/* Extended Filters */}
      {showFilters && (
        <div className="mb-6 p-4 rounded-2xl bg-surface-850/60 border border-white/[0.05] animate-slide-down">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Upload Date', options: ['Any time', 'Last hour', 'Today', 'This week', 'This month', 'This year'], value: filterDate, onChange: setFilterDate },
              { label: 'Duration', options: ['Any', 'Under 4 min', '4–20 min', 'Over 20 min'], value: filterDuration, onChange: setFilterDuration },
              { label: 'Category', options: ['All', ...CATEGORIES.slice(1)], value: filterCategory, onChange: setFilterCategory },
              { label: 'Quality', options: ['Any', '4K', '1080p HD', 'Subtitles', 'Live'], value: 'Any', onChange: () => {} },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs text-white/40 mb-1 block font-medium">{f.label}</label>
                <select
                  value={f.value}
                  onChange={e => f.onChange(e.target.value)}
                  className="w-full bg-surface-700 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500/50 cursor-pointer"
                >
                  {f.options.map(o => <option key={o} value={o} className="bg-surface-800">{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {layout === 'list' ? (
        <div className="space-y-6">
          {results.map(v => <VideoCard key={v.id} video={v} layout="list" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(v => <VideoCard key={v.id} video={v} layout="grid" />)}
        </div>
      )}

      {results.length === 0 && (
        <div className="text-center py-20">
          <Search size={48} className="mx-auto mb-4 text-white/10" />
          <h2 className="font-display font-bold text-xl text-white/50 mb-2">No results found</h2>
          <p className="text-white/30 text-sm">Try different keywords or browse by category</p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white/50">Searching...</div>}>
      <SearchContent />
    </Suspense>
  )
}
