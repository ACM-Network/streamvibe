'use client'
import { useState } from 'react'
import {
  Settings, Bell, Eye, Lock, Palette, Accessibility,
  Download, Globe, Keyboard, ChevronRight, Check, Moon, Sun
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const sections = [
  { id: 'account', label: 'Account', icon: Lock },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'playback', label: 'Playback', icon: Eye },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Lock },
  { id: 'language', label: 'Language & Region', icon: Globe },
  { id: 'downloads', label: 'Downloads', icon: Download },
  { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
  { id: 'shortcuts', label: 'Keyboard Shortcuts', icon: Keyboard },
]

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={clsx('w-11 h-6 rounded-full transition-colors relative flex-shrink-0', value ? 'bg-brand-500' : 'bg-white/20')}
    >
      <div className={clsx('absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform', value ? 'translate-x-6' : 'translate-x-1')} />
    </button>
  )
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('appearance')
  const { autoplay, setAutoplay, playerVolume, setPlayerVolume, playerMuted, setPlayerMuted } = useStore()
  const [darkMode, setDarkMode] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [defaultQuality, setDefaultQuality] = useState('Auto')
  const [language, setLanguage] = useState('English')
  const [autoSubtitles, setAutoSubtitles] = useState(false)
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(true)
  const [dataCollection, setDataCollection] = useState(false)

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Settings size={22} className="text-white/50" />
        <h1 className="font-display font-bold text-2xl text-white">Settings</h1>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <nav className="w-52 flex-shrink-0 space-y-1">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={clsx(
                'sidebar-link w-full',
                activeSection === id && 'active'
              )}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {activeSection === 'appearance' && (
            <>
              <h2 className="font-display font-semibold text-lg text-white mb-4">Appearance</h2>
              <div className="p-5 rounded-2xl bg-surface-850 border border-white/[0.06] space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">Dark Mode</p>
                    <p className="text-xs text-white/40 mt-0.5">Use dark background theme</p>
                  </div>
                  <Toggle value={darkMode} onChange={setDarkMode} />
                </div>
                <div className="h-px bg-white/[0.05]" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">Reduce Motion</p>
                    <p className="text-xs text-white/40 mt-0.5">Minimize animations and transitions</p>
                  </div>
                  <Toggle value={reducedMotion} onChange={setReducedMotion} />
                </div>
                <div className="h-px bg-white/[0.05]" />
                <div>
                  <p className="text-sm font-medium text-white/90 mb-3">Accent Color</p>
                  <div className="flex gap-3">
                    {['#ff3b3b', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'].map(color => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-transparent hover:scale-110 transition-transform"
                        style={{ background: color, borderColor: color === '#ff3b3b' ? 'white' : 'transparent' }}
                        onClick={() => toast.success('Accent color updated!')}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'playback' && (
            <>
              <h2 className="font-display font-semibold text-lg text-white mb-4">Playback</h2>
              <div className="p-5 rounded-2xl bg-surface-850 border border-white/[0.06] space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">Autoplay</p>
                    <p className="text-xs text-white/40 mt-0.5">Automatically play next video</p>
                  </div>
                  <Toggle value={autoplay} onChange={setAutoplay} />
                </div>
                <div className="h-px bg-white/[0.05]" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">Auto Subtitles</p>
                    <p className="text-xs text-white/40 mt-0.5">Show subtitles when available</p>
                  </div>
                  <Toggle value={autoSubtitles} onChange={setAutoSubtitles} />
                </div>
                <div className="h-px bg-white/[0.05]" />
                <div>
                  <p className="text-sm font-medium text-white/90 mb-3">Default Quality</p>
                  <div className="flex gap-2 flex-wrap">
                    {['Auto', '4K', '1080p', '720p', '480p'].map(q => (
                      <button
                        key={q}
                        onClick={() => setDefaultQuality(q)}
                        className={clsx(
                          'px-4 py-2 rounded-xl text-sm font-medium transition-all border',
                          defaultQuality === q
                            ? 'bg-brand-500/15 border-brand-500/30 text-brand-400'
                            : 'bg-white/[0.04] border-white/10 text-white/50 hover:text-white'
                        )}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-white/[0.05]" />
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-white/90">Default Volume</p>
                    <span className="text-sm font-mono text-brand-400">{playerVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={playerVolume}
                    onChange={e => setPlayerVolume(+e.target.value)}
                    className="w-full"
                    style={{ background: `linear-gradient(to right, var(--brand) 0%, var(--brand) ${playerVolume}%, rgba(255,255,255,0.15) ${playerVolume}%, rgba(255,255,255,0.15) 100%)` }}
                  />
                </div>
              </div>
            </>
          )}

          {activeSection === 'notifications' && (
            <>
              <h2 className="font-display font-semibold text-lg text-white mb-4">Notifications</h2>
              <div className="p-5 rounded-2xl bg-surface-850 border border-white/[0.06] space-y-5">
                {[
                  { label: 'Email Notifications', desc: 'Receive updates via email', value: emailNotifs, onChange: setEmailNotifs },
                  { label: 'Push Notifications', desc: 'Browser push notifications', value: pushNotifs, onChange: setPushNotifs },
                ].map(({ label, desc, value, onChange }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/90">{label}</p>
                        <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                      </div>
                      <Toggle value={value} onChange={onChange} />
                    </div>
                    <div className="h-px bg-white/[0.05] mt-5" />
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSection === 'privacy' && (
            <>
              <h2 className="font-display font-semibold text-lg text-white mb-4">Privacy</h2>
              <div className="p-5 rounded-2xl bg-surface-850 border border-white/[0.06] space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/90">Data Collection</p>
                    <p className="text-xs text-white/40 mt-0.5">Allow anonymous usage analytics</p>
                  </div>
                  <Toggle value={dataCollection} onChange={setDataCollection} />
                </div>
                <div className="h-px bg-white/[0.05]" />
                <button
                  className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium"
                  onClick={() => toast.success('History cleared!')}
                >
                  Clear Watch History
                </button>
              </div>
            </>
          )}

          {activeSection === 'shortcuts' && (
            <>
              <h2 className="font-display font-semibold text-lg text-white mb-4">Keyboard Shortcuts</h2>
              <div className="p-5 rounded-2xl bg-surface-850 border border-white/[0.06]">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    ['Space / K', 'Play / Pause'],
                    ['← / J', 'Back 10 seconds'],
                    ['→ / L', 'Forward 10 seconds'],
                    ['↑ / ↓', 'Volume up / down'],
                    ['M', 'Mute / Unmute'],
                    ['F', 'Toggle Fullscreen'],
                    ['C', 'Toggle Subtitles'],
                    ['?', 'Show keyboard shortcuts'],
                    ['0–9', 'Seek to 0%–90% of video'],
                    ['Shift + N', 'Next video'],
                    ['Shift + P', 'Previous video'],
                  ].map(([key, action]) => (
                    <div key={key} className="flex items-center gap-4 py-2 border-b border-white/[0.04] last:border-0">
                      <kbd className="px-2.5 py-1 bg-white/10 rounded-lg text-xs font-mono text-white/70 w-28 text-center flex-shrink-0">{key}</kbd>
                      <span className="text-sm text-white/60">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!['appearance', 'playback', 'notifications', 'privacy', 'shortcuts'].includes(activeSection) && (
            <div className="p-8 rounded-2xl bg-surface-850 border border-white/[0.06] text-center">
              <Settings size={36} className="mx-auto mb-3 text-white/20" />
              <p className="text-white/40 text-sm">Settings for this section coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
