'use client'
import { HelpCircle, MessageSquare, Book, Bug } from 'lucide-react'
export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="font-display font-bold text-2xl text-white mb-8">Help & Feedback</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Book, label: 'Documentation', desc: 'Read guides and tutorials' },
          { icon: MessageSquare, label: 'Send Feedback', desc: 'Tell us what you think' },
          { icon: Bug, label: 'Report a Bug', desc: 'Found an issue? Let us know' },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="p-5 rounded-2xl bg-surface-850 border border-white/[0.06] hover:border-white/10 cursor-pointer transition-all group">
            <Icon size={24} className="text-brand-400 mb-3" />
            <h3 className="font-semibold text-white mb-1">{label}</h3>
            <p className="text-sm text-white/40">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
