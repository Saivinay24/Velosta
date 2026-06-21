'use client'

import { motion } from 'framer-motion'
import type { CommunityUser } from '@/lib/community/types'
import { getAvatarColor, getAvatarInitials, getLevelTitle } from '@/lib/community/data'
import XPBar from './XPBar'
import { MapPin, Star, Shield } from 'lucide-react'

const trustTierLabels: Record<number, { label: string; color: string }> = {
  1: { label: 'Basic', color: '#9B9B9B' },
  2: { label: 'Verified ✅', color: '#4A9B6E' },
  3: { label: 'Trusted ⭐', color: '#C9A96E' },
  4: { label: 'Ambassador 👑', color: '#C4734F' },
}

export default function ProfileHeader({ user }: { user: CommunityUser }) {
  const tier = trustTierLabels[user.trustTier]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-panel rounded-2xl p-6 md:p-8"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${getAvatarColor(user.username)}, ${getAvatarColor(user.username + 'x')})`,
            boxShadow: `0 8px 32px ${getAvatarColor(user.username)}40`,
          }}
        >
          {getAvatarInitials(user.displayName)}
        </motion.div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h1 className="font-serif text-2xl font-semibold text-charcoal">{user.displayName}</h1>
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full inline-block"
              style={{ background: `${tier.color}18`, color: tier.color }}
            >
              {tier.label}
            </span>
          </div>

          <p className="text-sm text-charcoal-light/50 mb-1">@{user.username}</p>

          <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-charcoal-light/40 mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {user.homeCity}
            </span>
            <span>·</span>
            <span>Joined {new Date(user.joinedDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-gold" /> {user.communityRating}/5 ({user.ratingCount})
            </span>
          </div>

          <p className="text-sm text-charcoal-light/70 mb-4">{user.bio}</p>

          {/* XP Bar */}
          <XPBar level={user.level} currentXp={user.xp} size="md" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mt-6 pt-6 border-t border-sandstone/20">
        {[
          { label: 'Trips', value: user.stats.trips },
          { label: 'Cities', value: user.stats.cities },
          { label: 'Quests', value: user.stats.questsCompleted },
          { label: 'Events', value: user.stats.eventsAttended },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + idx * 0.08 }}
            className="text-center"
          >
            <p className="text-xl font-bold text-charcoal">{stat.value}</p>
            <p className="text-[10px] text-charcoal-light/40 font-medium uppercase tracking-wide">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
