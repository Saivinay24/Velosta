'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { EVENT_TYPE_META, type CommunityEvent } from '@/lib/community/types'
import { getUserById, getAvatarColor, getAvatarInitials } from '@/lib/community/data'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'

export default function EventCard({ event, index = 0 }: { event: CommunityEvent; index?: number }) {
  const typeMeta = EVENT_TYPE_META[event.type]
  const host = getUserById(event.hostId)
  const spotsLeft = event.maxAttendees - event.currentAttendeeIds.length

  const eventDate = new Date(event.datetime)
  const dateStr = eventDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
  const timeStr = eventDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })

  return (
    <Link href={`/community/events/${event.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="glass-panel rounded-2xl p-5 cursor-pointer group"
      >
        {/* Type badge & date */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full flex items-center gap-1"
            style={{ background: `${typeMeta.color}15`, color: typeMeta.color }}
          >
            <span>{typeMeta.icon}</span>
            {typeMeta.label}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-charcoal-light/50">
            <Calendar className="w-3 h-3" />
            {dateStr} · {timeStr}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-base font-semibold text-charcoal mb-2 group-hover:text-terracotta transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-charcoal-light/60 line-clamp-2 mb-3 leading-relaxed">
          {event.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-charcoal-light/50 mb-3">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{event.location.name}, {event.location.address.split(',').pop()?.trim()}</span>
        </div>

        {/* Host */}
        {host && (
          <div className="flex items-center gap-2 mb-3 p-2 rounded-xl bg-beige/30">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
              style={{ background: getAvatarColor(host.username) }}
            >
              {getAvatarInitials(host.displayName)}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-medium text-charcoal truncate block">@{host.username}</span>
              <span className="text-[9px] text-charcoal-light/40">
                ⭐ {host.communityRating} · {host.stats.trips} trips · Tier {host.trustTier}
              </span>
            </div>
          </div>
        )}

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-charcoal-light/50">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {event.duration < 60 ? `${event.duration}m` : `${Math.round(event.duration / 60)}h`}
            </span>
          </div>
          {event.costPerPerson > 0 ? (
            <span className="text-[10px] font-semibold text-terracotta">
              ₹{event.costPerPerson.toLocaleString()}/person
            </span>
          ) : (
            <span className="text-[10px] font-semibold text-green-600">Free</span>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
