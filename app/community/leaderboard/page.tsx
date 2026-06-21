'use client'

import { motion } from 'framer-motion'
import CommunityNav from '@/components/community/CommunityNav'
import LeaderboardRow from '@/components/community/LeaderboardRow'
import { useCommunityStore } from '@/lib/community/store'
import { leaderboardData, mockCurrentUser } from '@/lib/community/data'
import type { LeaderboardTab } from '@/lib/community/types'
import { Trophy } from 'lucide-react'

const tabs: { id: LeaderboardTab; label: string }[] = [
  { id: 'global', label: '🌍 Global' },
  { id: 'city', label: '🏙️ City' },
  { id: 'weekly', label: '📅 Weekly' },
  { id: 'friends', label: '👥 Friends' },
]

export default function LeaderboardPage() {
  const { leaderboardTab, setLeaderboardTab } = useCommunityStore()

  // For the prototype, show the same data for all tabs with minor label changes
  const entries = leaderboardData

  return (
    <>
      <CommunityNav />

      <main className="pt-20 md:pt-24 pb-24 md:pb-8 px-4 max-w-3xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-sandstone font-medium mb-2">Velosta</p>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-charcoal mb-2">Leaderboard</h1>
          <div className="w-10 h-[2px] bg-gold mx-auto mb-3" />
          <p className="text-sm text-charcoal-light/50">
            The most adventurous travelers in the Velosta community.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-2 mb-6"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setLeaderboardTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                leaderboardTab === tab.id
                  ? 'bg-charcoal text-warm-white shadow-md'
                  : 'bg-beige/60 text-charcoal-light hover:bg-sandstone/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Top 3 spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-panel rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-lg font-semibold text-charcoal">Top Explorers</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {entries.slice(0, 3).map((entry, idx) => {
              const medals = ['🥇', '🥈', '🥉']
              const sizes = ['text-5xl', 'text-4xl', 'text-4xl']
              const scales = ['scale-110', 'scale-100', 'scale-100']
              return (
                <motion.div
                  key={entry.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className={`text-center ${idx === 0 ? '-mt-2' : 'mt-2'}`}
                >
                  <div className={`${sizes[idx]} mb-2 ${scales[idx]} inline-block`}>{medals[idx]}</div>
                  <p className="text-sm font-semibold text-charcoal truncate">{entry.displayName}</p>
                  <p className="text-[10px] text-charcoal-light/40">@{entry.username}</p>
                  <p className="text-xs font-bold text-gold mt-1">{entry.xp.toLocaleString()} XP</p>
                  <p className="text-[10px] text-charcoal-light/40">Lv.{entry.level}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Full leaderboard */}
        <div className="space-y-2">
          {entries.map((entry, idx) => (
            <LeaderboardRow
              key={entry.userId}
              entry={entry}
              index={idx}
              isCurrentUser={entry.userId === mockCurrentUser.id}
            />
          ))}
        </div>
      </main>
    </>
  )
}
