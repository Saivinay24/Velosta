'use client'

import { motion } from 'framer-motion'
import type { Trip } from '@/lib/community/types'
import { Map, Users, Zap, Route, Award } from 'lucide-react'

interface TripStatsProps {
  trip: Trip
}

const tierColors: Record<string, string> = {
  bronze: '#CD7F32',
  silver: '#9CA3AF',
  gold: '#C9A96E',
}

export default function TripStats({ trip }: TripStatsProps) {
  const stats = [
    { icon: Zap, label: 'Quests', value: `${trip.questsCompleted}/${trip.questsAvailable}`, color: '#C9A96E' },
    { icon: Award, label: 'XP Earned', value: trip.totalXpEarned.toLocaleString(), color: '#C4734F' },
    { icon: Route, label: 'Distance', value: `${trip.distanceCovered} km`, color: '#4A9B6E' },
    { icon: Users, label: 'People Met', value: String(trip.peopleMet), color: '#6366f1' },
    { icon: Map, label: 'Badges', value: String(trip.badgesEarned.length), color: '#a855f7' },
  ]

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-semibold text-charcoal">Trip Stats</h3>
        {trip.questTier && (
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
            style={{
              background: `${tierColors[trip.questTier]}20`,
              color: tierColors[trip.questTier],
            }}
          >
            {trip.questTier} Tier
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="text-center p-3 rounded-xl bg-beige/30"
            >
              <Icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: stat.color }} />
              <p className="text-lg font-bold text-charcoal">{stat.value}</p>
              <p className="text-[10px] text-charcoal-light/40 font-medium uppercase tracking-wide">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
