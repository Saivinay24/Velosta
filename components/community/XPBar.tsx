'use client'

import { motion } from 'framer-motion'
import { xpForLevel, getLevelTitle } from '@/lib/community/data'

interface XPBarProps {
  level: number
  currentXp: number
  size?: 'sm' | 'md' | 'lg'
}

export default function XPBar({ level, currentXp, size = 'md' }: XPBarProps) {
  const currentLevelXp = xpForLevel(level)
  const nextLevelXp = xpForLevel(level + 1)
  const xpIntoLevel = currentXp - currentLevelXp
  const xpNeeded = nextLevelXp - currentLevelXp
  const progress = Math.min((xpIntoLevel / xpNeeded) * 100, 100)
  const title = getLevelTitle(level)

  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' }
  const textSizes = { sm: 'text-[9px]', md: 'text-xs', lg: 'text-sm' }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className={`${textSizes[size]} font-bold text-gold`}>Lv.{level}</span>
          <span className={`${textSizes[size]} text-charcoal-light/50 font-medium`}>{title}</span>
        </div>
        <span className={`${textSizes[size]} text-charcoal-light/40`}>
          {currentXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP
        </span>
      </div>
      <div className={`w-full ${heights[size]} rounded-full bg-beige/60 overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #C9A96E 0%, #C4734F 100%)',
            boxShadow: '0 0 8px rgba(201, 169, 110, 0.4)',
          }}
        />
      </div>
    </div>
  )
}
