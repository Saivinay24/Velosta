'use client'

import { motion } from 'framer-motion'
import type { LeaderboardEntry } from '@/lib/community/types'
import { getBadgeById, getAvatarColor, getAvatarInitials } from '@/lib/community/data'
import { Trophy } from 'lucide-react'

interface LeaderboardRowProps {
  entry: LeaderboardEntry
  index: number
  isCurrentUser: boolean
}

const rankStyles: Record<number, { bg: string; text: string; border: string; icon: string }> = {
  1: { bg: 'bg-gradient-to-r from-yellow-100 to-amber-50', text: 'text-amber-700', border: 'border-amber-300', icon: '🥇' },
  2: { bg: 'bg-gradient-to-r from-gray-100 to-slate-50', text: 'text-gray-600', border: 'border-gray-300', icon: '🥈' },
  3: { bg: 'bg-gradient-to-r from-orange-100 to-amber-50', text: 'text-orange-700', border: 'border-orange-300', icon: '🥉' },
}

export default function LeaderboardRow({ entry, index, isCurrentUser }: LeaderboardRowProps) {
  const isTop3 = entry.rank <= 3
  const style = rankStyles[entry.rank]
  const avatarBg = getAvatarColor(entry.username)
  const initials = getAvatarInitials(entry.displayName)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
        isCurrentUser
          ? 'glass-panel ring-2 ring-gold/30'
          : isTop3 && style
          ? `${style.bg} border ${style.border}`
          : 'hover:bg-beige/30'
      }`}
    >
      {/* Rank */}
      <div className="w-8 text-center flex-shrink-0">
        {isTop3 ? (
          <span className="text-xl">{style?.icon}</span>
        ) : (
          <span className="text-sm font-bold text-charcoal-light/40">#{entry.rank}</span>
        )}
      </div>

      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
        style={{ background: avatarBg }}
      >
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-charcoal truncate">{entry.displayName}</span>
          {isCurrentUser && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-gold/20 text-gold">You</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-charcoal-light/40">@{entry.username}</span>
          <span className="text-[10px] text-gold font-medium">Lv.{entry.level}</span>
        </div>
      </div>

      {/* Badges */}
      <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
        {entry.topBadgeIds.slice(0, 3).map(badgeId => {
          const badge = getBadgeById(badgeId)
          return badge ? (
            <span key={badgeId} className="text-sm" title={badge.name}>{badge.icon}</span>
          ) : null
        })}
      </div>

      {/* Stats */}
      <div className="text-right flex-shrink-0">
        <div className="flex items-center gap-1 justify-end">
          <Trophy className="w-3 h-3 text-gold" />
          <span className="text-sm font-bold text-charcoal">{entry.xp.toLocaleString()}</span>
        </div>
        <span className="text-[10px] text-charcoal-light/40">
          {entry.trips} trips · {entry.questsCompleted} quests
        </span>
      </div>
    </motion.div>
  )
}
