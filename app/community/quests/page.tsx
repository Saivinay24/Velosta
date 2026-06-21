'use client'

import { motion } from 'framer-motion'
import CommunityNav from '@/components/community/CommunityNav'
import QuestBoard from '@/components/community/QuestBoard'
import { useCommunityStore } from '@/lib/community/store'
import { communityCities, getQuestsByCity } from '@/lib/community/data'
import { QUEST_CATEGORY_META, type QuestCategory } from '@/lib/community/types'
import { Target } from 'lucide-react'

const categoryFilters: { id: QuestCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All', icon: '✨' },
  ...Object.entries(QUEST_CATEGORY_META).map(([id, meta]) => ({
    id: id as QuestCategory,
    label: meta.label,
    icon: meta.icon,
  })),
]

export default function QuestsPage() {
  const { selectedCity, setSelectedCity, questCategoryFilter, setQuestCategoryFilter } = useCommunityStore()

  const cityQuests = getQuestsByCity(selectedCity)
  const completedCount = 4 // Mock: simulate some completed quests
  const progress = cityQuests.length > 0 ? (completedCount / cityQuests.length) * 100 : 0
  const cityInfo = communityCities.find(c => c.id === selectedCity)

  return (
    <>
      <CommunityNav />

      <main className="pt-20 md:pt-24 pb-24 md:pb-8 px-4 max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-sandstone font-medium mb-2">Velosta</p>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-charcoal mb-2">Quest Board</h1>
          <div className="w-10 h-[2px] bg-gold mx-auto mb-3" />
          <p className="text-sm text-charcoal-light/50 max-w-md mx-auto">
            Discover curated experiences that reveal the soul of every city.
          </p>
        </motion.div>

        {/* City selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-6 pb-1"
        >
          {communityCities.map(city => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                selectedCity === city.id
                  ? 'bg-charcoal text-warm-white shadow-md'
                  : 'bg-beige/60 text-charcoal-light hover:bg-sandstone/30'
              }`}
            >
              {city.emoji} {city.name}
            </button>
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-panel rounded-2xl p-5 mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-terracotta" />
              <h2 className="font-serif text-lg font-semibold text-charcoal">
                {cityInfo?.emoji} {cityInfo?.name} Conqueror
              </h2>
            </div>
            <span className="text-sm text-charcoal-light/50">
              {completedCount} / {cityQuests.length} quests
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-beige/60 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #C9A96E 0%, #C4734F 100%)',
                boxShadow: '0 0 8px rgba(201, 169, 110, 0.4)',
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] text-charcoal-light/40">
              {Math.round(progress)}% complete
            </span>
            <span className="text-[10px] text-gold font-medium">
              {progress >= 80 ? '👑 Gold Tier!' : progress >= 50 ? '🥈 Silver Tier' : progress >= 25 ? '🥉 Bronze Tier' : 'Keep exploring!'}
            </span>
          </div>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-6 pb-1"
        >
          {categoryFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setQuestCategoryFilter(filter.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex-shrink-0 ${
                questCategoryFilter === filter.id
                  ? 'bg-gold/20 text-charcoal border border-gold/40'
                  : 'bg-beige/40 text-charcoal-light/70 border border-transparent hover:border-sandstone/40'
              }`}
            >
              <span>{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Quest grid */}
        <QuestBoard quests={cityQuests} categoryFilter={questCategoryFilter} />
      </main>
    </>
  )
}
