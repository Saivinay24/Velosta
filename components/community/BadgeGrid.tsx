'use client'

import { motion } from 'framer-motion'
import type { Badge } from '@/lib/community/types'

interface BadgeGridProps {
  allBadges: Badge[]
  earnedBadgeIds: string[]
}

export default function BadgeGrid({ allBadges, earnedBadgeIds }: BadgeGridProps) {
  const visibleBadges = allBadges.filter(b => !b.isSecret || earnedBadgeIds.includes(b.id))

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
      {visibleBadges.map((badge, idx) => {
        const isEarned = earnedBadgeIds.includes(badge.id)
        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            className="relative group"
          >
            <div
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all duration-300 ${
                isEarned
                  ? 'glass-panel shadow-lg'
                  : 'bg-beige/30 opacity-40 grayscale'
              }`}
              style={
                isEarned
                  ? { boxShadow: '0 0 20px rgba(201, 169, 110, 0.3)' }
                  : undefined
              }
            >
              <span className="text-2xl mb-1">{badge.isSecret && !isEarned ? '🔒' : badge.icon}</span>
              <span className="text-[8px] font-bold uppercase tracking-wider text-charcoal-light/70 text-center leading-tight">
                {badge.isSecret && !isEarned ? '???' : badge.name.split(':')[0]}
              </span>
            </div>

            {/* Tooltip on hover */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 glass-panel rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
              <p className="text-[10px] font-medium text-charcoal">
                {badge.isSecret && !isEarned ? 'Secret Badge' : badge.name}
              </p>
              <p className="text-[9px] text-charcoal-light/50">
                {badge.isSecret && !isEarned ? 'Complete to reveal' : badge.requirementLabel}
              </p>
            </div>

            {/* Gold pulse ring for earned badges */}
            {isEarned && (
              <div className="absolute inset-0 rounded-2xl gold-pulse pointer-events-none" />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
