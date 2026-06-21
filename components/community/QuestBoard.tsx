'use client'

import { motion } from 'framer-motion'
import { QUEST_CATEGORY_META, type Quest, type QuestCategory } from '@/lib/community/types'
import QuestCard from './QuestCard'

interface QuestBoardProps {
  quests: Quest[]
  categoryFilter: QuestCategory | 'all'
}

export default function QuestBoard({ quests, categoryFilter }: QuestBoardProps) {
  const filteredQuests = categoryFilter === 'all'
    ? quests
    : quests.filter(q => q.category === categoryFilter)

  // Group quests by category
  const grouped = filteredQuests.reduce((acc, quest) => {
    if (!acc[quest.category]) acc[quest.category] = []
    acc[quest.category].push(quest)
    return acc
  }, {} as Record<QuestCategory, Quest[]>)

  const categories = Object.keys(grouped) as QuestCategory[]

  if (filteredQuests.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <p className="text-charcoal-light/40 text-sm">No quests found for this filter.</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const meta = QUEST_CATEGORY_META[category]
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{meta.icon}</span>
              <h3 className="font-serif text-lg font-semibold text-charcoal">{meta.label}</h3>
              <span className="text-xs text-charcoal-light/40 ml-1">
                {grouped[category].length} quests
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[category].map((quest, idx) => (
                <QuestCard key={quest.id} quest={quest} index={idx} />
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
