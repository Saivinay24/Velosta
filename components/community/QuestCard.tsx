'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { QUEST_CATEGORY_META, DIFFICULTY_META, type Quest } from '@/lib/community/types'
import { Clock, Users, Star, Zap } from 'lucide-react'

export default function QuestCard({ quest, index = 0 }: { quest: Quest; index?: number }) {
  const catMeta = QUEST_CATEGORY_META[quest.category]
  const diffMeta = DIFFICULTY_META[quest.difficulty]

  return (
    <Link href={`/community/quests/${quest.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="glass-panel rounded-2xl p-5 cursor-pointer group relative overflow-hidden"
      >
        {/* Category accent stripe */}
        <div
          className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
          style={{ background: catMeta.color }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{catMeta.icon}</span>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
              style={{ background: `${catMeta.color}18`, color: catMeta.color }}
            >
              {catMeta.label}
            </span>
          </div>
          {quest.isLocked ? (
            <span className="text-xs text-charcoal-light/40">🔒</span>
          ) : (
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3" style={{ color: diffMeta.color }} />
              <span className="text-[10px] font-semibold" style={{ color: diffMeta.color }}>
                {quest.xpReward} XP
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-base font-semibold text-charcoal mb-1.5 group-hover:text-terracotta transition-colors leading-tight">
          {quest.title}
        </h3>

        {/* Description preview */}
        <p className="text-xs text-charcoal-light/60 line-clamp-2 mb-3 leading-relaxed">
          {quest.description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-charcoal-light/50">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {quest.estimatedDuration < 60
                ? `${quest.estimatedDuration}m`
                : `${Math.round(quest.estimatedDuration / 60)}h`}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {quest.completionCount}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {quest.averageRating.toFixed(1)}
            </span>
          </div>
          <span
            className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ background: `${diffMeta.color}15`, color: diffMeta.color }}
          >
            {diffMeta.label}
          </span>
        </div>

        {/* Time window badge */}
        {quest.timeWindow && (
          <div className="mt-2 flex items-center gap-1 text-[10px] text-gold">
            <span>⏰</span>
            <span>
              {quest.timeWindow.startHour}:00 – {quest.timeWindow.endHour}:00 only
            </span>
          </div>
        )}
      </motion.div>
    </Link>
  )
}
