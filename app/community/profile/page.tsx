'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CommunityNav from '@/components/community/CommunityNav'
import ProfileHeader from '@/components/community/ProfileHeader'
import BadgeGrid from '@/components/community/BadgeGrid'
import { mockCurrentUser, badges, mockTrips, communityCities, CITY_HERO_IMAGES, COMMUNITY_IMAGES } from '@/lib/community/data'
import { MapPin, Calendar, Award, Play, ExternalLink } from 'lucide-react'

const tierColors: Record<string, { bg: string; text: string }> = {
  bronze: { bg: 'bg-orange-100', text: 'text-orange-700' },
  silver: { bg: 'bg-gray-100', text: 'text-gray-600' },
  gold: { bg: 'bg-amber-100', text: 'text-amber-700' },
}

export default function ProfilePage() {
  const user = mockCurrentUser
  const userTrips = mockTrips.filter(t => t.userId === user.id)

  return (
    <>
      <CommunityNav />

      <main className="pt-20 md:pt-24 pb-24 md:pb-8 px-4 max-w-4xl mx-auto">
        {/* Profile header */}
        <ProfileHeader user={user} />

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-panel rounded-2xl p-6 mt-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-gold" />
            <h2 className="font-serif text-lg font-semibold text-charcoal">Badges</h2>
            <span className="text-xs text-charcoal-light/40 ml-1">
              {user.earnedBadgeIds.length} earned
            </span>
          </div>
          <BadgeGrid allBadges={badges} earnedBadgeIds={user.earnedBadgeIds} />
        </motion.div>

        {/* Travel map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-panel rounded-2xl p-6 mt-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-terracotta" />
            <h2 className="font-serif text-lg font-semibold text-charcoal">Travel Map</h2>
          </div>
          <div className="w-full aspect-[2/1] rounded-xl bg-gradient-to-br from-beige to-sandstone/20 flex items-center justify-center relative overflow-hidden">
            {/* India outline placeholder with city pins */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <path d="M200 50 L300 100 L350 200 L300 300 L250 350 L200 380 L150 350 L100 300 L50 200 L100 100 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            {/* City pins */}
            {communityCities.slice(0, 4).map((city, idx) => {
              const positions = [
                { left: '60%', top: '70%' },  // Goa
                { left: '45%', top: '30%' },  // Jaipur
                { left: '55%', top: '15%' },  // Manali
                { left: '40%', top: '75%' },  // Kerala
              ]
              return (
                <motion.div
                  key={city.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1, type: 'spring', stiffness: 300 }}
                  className="absolute"
                  style={positions[idx]}
                >
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center gold-pulse">
                    <div className="w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                      <span className="text-[8px]">{city.emoji}</span>
                    </div>
                  </div>
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-medium text-charcoal-light/50 whitespace-nowrap">
                    {city.name}
                  </span>
                </motion.div>
              )
            })}
            <p className="text-xs text-charcoal-light/30 absolute bottom-3 right-3">
              {user.stats.cities} cities explored
            </p>
          </div>
        </motion.div>

        {/* Trip history */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-panel rounded-2xl p-6 mt-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-terracotta" />
            <h2 className="font-serif text-lg font-semibold text-charcoal">Trip History</h2>
          </div>
          <div className="space-y-3">
            {userTrips.map((trip, idx) => {
              const city = communityCities.find(c => c.id === trip.cityId)
              const tierStyle = trip.questTier ? tierColors[trip.questTier] : null
              return (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Link href={`/community/trip/${trip.id}/memory`}>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-beige/30 hover:bg-beige/50 transition-colors cursor-pointer group overflow-hidden">
                      {/* City thumbnail */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        {CITY_HERO_IMAGES[trip.cityId] ? (
                          <img src={CITY_HERO_IMAGES[trip.cityId]} alt={trip.cityName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-sandstone/20 flex items-center justify-center">
                            <span className="text-lg">{city?.emoji || '🗺️'}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-charcoal">{trip.cityName}</span>
                          {tierStyle && trip.questTier && (
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${tierStyle.bg} ${tierStyle.text}`}>
                              {trip.questTier}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-charcoal-light/40">
                          {new Date(trip.startDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })} · {trip.questsCompleted} quests · {trip.totalXpEarned} XP
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-charcoal-light/30 group-hover:text-terracotta transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Top vlogs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-panel rounded-2xl p-6 mt-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Play className="w-4 h-4 text-terracotta" />
            <h2 className="font-serif text-lg font-semibold text-charcoal">Top Vlogs</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { img: COMMUNITY_IMAGES['goa-sunset'], label: 'Goa Sunset' },
              { img: COMMUNITY_IMAGES['manali-mountains'], label: 'Manali Trek' },
              { img: COMMUNITY_IMAGES['jaipur-fort'], label: 'Jaipur Heritage' },
            ].map((vlog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="aspect-video rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow relative group"
              >
                <img
                  src={vlog.img}
                  alt={vlog.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-warm-white/80 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-terracotta text-sm ml-0.5">▶</span>
                  </div>
                </div>
                <p className="absolute bottom-2 left-2 text-[9px] text-warm-white/80 font-medium z-10">{vlog.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </>
  )
}
