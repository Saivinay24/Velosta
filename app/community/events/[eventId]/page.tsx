'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CommunityNav from '@/components/community/CommunityNav'
import { getEventById, getUserById, getAvatarColor, getAvatarInitials, mockCurrentUser, CITY_HERO_IMAGES } from '@/lib/community/data'
import { EVENT_TYPE_META } from '@/lib/community/types'
import { ArrowLeft, MapPin, Calendar, Clock, Users, Shield, Star } from 'lucide-react'

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.eventId as string
  const event = getEventById(eventId)

  if (!event) {
    return (
      <>
        <CommunityNav />
        <main className="pt-24 pb-8 px-4 max-w-4xl mx-auto text-center">
          <p className="text-charcoal-light/50">Event not found.</p>
          <Link href="/community/events" className="text-terracotta text-sm mt-4 inline-block hover:underline">
            ← Back to Events
          </Link>
        </main>
      </>
    )
  }

  const typeMeta = EVENT_TYPE_META[event.type]
  const host = getUserById(event.hostId)
  const attendees = event.currentAttendeeIds.map(id => getUserById(id)).filter(Boolean)
  const spotsLeft = event.maxAttendees - event.currentAttendeeIds.length
  const isAttending = event.currentAttendeeIds.includes(mockCurrentUser.id)
  const isWaitlisted = event.waitlistIds.includes(mockCurrentUser.id)

  const eventDate = new Date(event.datetime)
  const dateStr = eventDate.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  const timeStr = eventDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })

  return (
    <>
      <CommunityNav />

      <main className="pt-20 md:pt-24 pb-24 md:pb-8 px-4 max-w-4xl mx-auto">
        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <Link
            href="/community/events"
            className="inline-flex items-center gap-2 text-sm text-charcoal-light/50 hover:text-terracotta transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-6 md:p-8"
            >
              {/* Type badge */}
              <span
                className="text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4"
                style={{ background: `${typeMeta.color}15`, color: typeMeta.color }}
              >
                <span>{typeMeta.icon}</span>
                {typeMeta.label}
              </span>

              <h1 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal mb-4 leading-tight">
                {event.title}
              </h1>

              <p className="text-sm text-charcoal-light/70 leading-relaxed mb-6">
                {event.description}
              </p>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-beige/30">
                  <Calendar className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-charcoal-light/40 uppercase tracking-wide mb-0.5">Date & Time</p>
                    <p className="text-sm text-charcoal font-medium">{dateStr}</p>
                    <p className="text-xs text-charcoal-light/50">{timeStr}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-beige/30">
                  <Clock className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-charcoal-light/40 uppercase tracking-wide mb-0.5">Duration</p>
                    <p className="text-sm text-charcoal font-medium">
                      {event.duration < 60 ? `${event.duration} min` : event.duration < 1440 ? `${Math.round(event.duration / 60)} hours` : `${Math.round(event.duration / 1440)} days`}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-beige/30">
                  <MapPin className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-charcoal-light/40 uppercase tracking-wide mb-0.5">Location</p>
                    <p className="text-sm text-charcoal font-medium">{event.location.name}</p>
                    <p className="text-xs text-charcoal-light/50">{event.location.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-beige/30">
                  <Users className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-charcoal-light/40 uppercase tracking-wide mb-0.5">Capacity</p>
                    <p className="text-sm text-charcoal font-medium">
                      {event.currentAttendeeIds.length} / {event.maxAttendees}
                    </p>
                    <p className="text-xs text-charcoal-light/50">
                      {spotsLeft > 0 ? `${spotsLeft} spots remaining` : 'Full — waitlist available'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map / Location image */}
              <div className="w-full aspect-[2/1] rounded-xl overflow-hidden mb-6 relative">
                {CITY_HERO_IMAGES[event.cityId] ? (
                  <img
                    src={CITY_HERO_IMAGES[event.cityId]}
                    alt={event.location.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-beige to-sandstone/20 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-terracotta/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                <div className="absolute bottom-3 left-3 glass-panel rounded-lg px-3 py-1.5">
                  <p className="text-[10px] text-charcoal-light/70 font-medium">{event.location.name}</p>
                </div>
              </div>

              {/* Cost */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-beige/30 mb-6">
                <span className="text-sm text-charcoal-light/50">Cost per person</span>
                {event.costPerPerson > 0 ? (
                  <span className="text-lg font-bold text-terracotta">₹{event.costPerPerson.toLocaleString()}</span>
                ) : (
                  <span className="text-lg font-bold text-green-600">Free</span>
                )}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-warm-white font-medium text-base tracking-wide"
                style={{
                  background: isAttending
                    ? 'linear-gradient(135deg, #9B9B9B 0%, #7c9885 100%)'
                    : isWaitlisted
                    ? 'linear-gradient(135deg, #C9A96E 0%, #D8C7B3 100%)'
                    : 'linear-gradient(135deg, #C4734F 0%, #C9A96E 100%)',
                  boxShadow: isAttending ? 'none' : '0 4px 20px rgba(196, 115, 79, 0.3)',
                }}
              >
                {isAttending ? '✓ You\'re attending' : isWaitlisted ? 'On Waitlist' : spotsLeft > 0 ? 'Join Event' : 'Join Waitlist'}
              </motion.button>
            </motion.div>

            {/* Safety info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-panel rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-gold" />
                <h3 className="font-serif text-base font-semibold text-charcoal">Safety Info</h3>
              </div>
              <div className="space-y-2 text-xs text-charcoal-light/50">
                <p>✅ All attendees are Velosta-verified (Tier {event.minTrustTier}+)</p>
                <p>✅ QR check-in at the event for attendance verification</p>
                <p>✅ Emergency SOS available in-app during the event</p>
                <p>✅ Post-event mutual ratings for accountability</p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Host card */}
            {host && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-panel rounded-2xl p-5"
              >
                <h3 className="text-xs text-charcoal-light/40 uppercase tracking-wide font-medium mb-3">Host</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                    style={{ background: getAvatarColor(host.username) }}
                  >
                    {getAvatarInitials(host.displayName)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{host.displayName}</p>
                    <p className="text-[10px] text-charcoal-light/40">@{host.username}</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-charcoal-light/50">
                  <p className="flex items-center gap-1"><Star className="w-3 h-3 text-gold" /> {host.communityRating}/5 ({host.ratingCount} ratings)</p>
                  <p>📍 {host.homeCity}</p>
                  <p>🗺️ {host.stats.trips} trips · {host.stats.questsCompleted} quests</p>
                  <p>🏅 Tier {host.trustTier} · Lv.{host.level}</p>
                </div>
              </motion.div>
            )}

            {/* Attendees */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-panel rounded-2xl p-5"
            >
              <h3 className="text-xs text-charcoal-light/40 uppercase tracking-wide font-medium mb-3">
                Attendees ({attendees.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {attendees.map(user => user ? (
                  <div
                    key={user.id}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: getAvatarColor(user.username) }}
                    title={user.displayName}
                  >
                    {getAvatarInitials(user.displayName)}
                  </div>
                ) : null)}
                {spotsLeft > 0 && Array.from({ length: Math.min(spotsLeft, 3) }).map((_, i) => (
                  <div key={`empty-${i}`} className="w-9 h-9 rounded-full border-2 border-dashed border-sandstone/30 flex items-center justify-center">
                    <span className="text-[10px] text-sandstone/50">+</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
