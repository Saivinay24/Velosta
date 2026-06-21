'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CommunityNav from '@/components/community/CommunityNav'
import TripStats from '@/components/community/TripStats'
import { mockTrips, communityCities, getBadgeById, CITY_HERO_IMAGES, COMMUNITY_IMAGES } from '@/lib/community/data'
import { ArrowLeft, Play, BookOpen, Map, Share2, Download, ChevronLeft, ChevronRight } from 'lucide-react'

export default function TripMemoryPage() {
  const params = useParams()
  const tripId = params.tripId as string
  const trip = mockTrips.find(t => t.id === tripId)

  if (!trip) {
    return (
      <>
        <CommunityNav />
        <main className="pt-24 pb-8 px-4 max-w-4xl mx-auto text-center">
          <p className="text-charcoal-light/50">Trip not found.</p>
          <Link href="/community/profile" className="text-terracotta text-sm mt-4 inline-block hover:underline">
            ← Back to Profile
          </Link>
        </main>
      </>
    )
  }

  const city = communityCities.find(c => c.id === trip.cityId)
  const tierColors: Record<string, string> = { bronze: '#CD7F32', silver: '#9CA3AF', gold: '#C9A96E' }
  const startDate = new Date(trip.startDate)
  const endDate = new Date(trip.endDate)
  const dateRange = `${startDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} – ${endDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}`

  return (
    <>
      <CommunityNav />

      <main className="pt-20 md:pt-24 pb-24 md:pb-8 px-4 max-w-4xl mx-auto">
        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <Link
            href="/community/profile"
            className="inline-flex items-center gap-2 text-sm text-charcoal-light/50 hover:text-terracotta transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
        </motion.div>

        {/* Cinematic header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden mb-8"
          style={{ minHeight: '280px' }}
        >
          {/* Hero background image */}
          {CITY_HERO_IMAGES[trip.cityId] && (
            <img
              src={CITY_HERO_IMAGES[trip.cityId]}
              alt={trip.cityName}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-warm-white z-10">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs tracking-[0.3em] uppercase text-sandstone font-medium mb-2"
              >
                Your Story
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-5xl font-serif font-bold mb-3"
              >
                {city?.emoji} {trip.cityName}
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 56 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="h-[2px] mx-auto mb-3"
                style={{ background: trip.questTier ? tierColors[trip.questTier] : '#C9A96E' }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-sm text-warm-white/60 mb-2"
              >
                {dateRange} · {trip.tripType.charAt(0).toUpperCase() + trip.tripType.slice(1)} Trip
              </motion.p>
              {trip.questTier && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, type: 'spring' }}
                  className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    background: `${tierColors[trip.questTier]}30`,
                    color: tierColors[trip.questTier],
                    border: `1px solid ${tierColors[trip.questTier]}40`,
                  }}
                >
                  {trip.questTier} Tier
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Recap video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-panel rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Play className="w-4 h-4 text-terracotta" />
            <h2 className="font-serif text-lg font-semibold text-charcoal">Cinematic Recap</h2>
          </div>
          <div className="w-full aspect-video rounded-xl flex items-center justify-center cursor-pointer group relative overflow-hidden">
            {CITY_HERO_IMAGES[trip.cityId] && (
              <img
                src={CITY_HERO_IMAGES[trip.cityId]}
                alt={`${trip.cityName} recap`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-charcoal/20" />
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-warm-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg z-10"
            >
              <span className="text-terracotta text-2xl ml-1">▶</span>
            </motion.div>
            <p className="absolute bottom-4 left-4 text-xs text-warm-white/70 z-10">AI-edited 60s highlight reel</p>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-beige/40 text-xs font-medium text-charcoal-light hover:bg-beige/60 transition-colors">
              <Download className="w-3 h-3" /> Download
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-beige/40 text-xs font-medium text-charcoal-light hover:bg-beige/60 transition-colors">
              <Share2 className="w-3 h-3" /> Share
            </button>
          </div>
        </motion.div>

        {/* Photo book carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-panel rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-gold" />
            <h2 className="font-serif text-lg font-semibold text-charcoal">Photo Book</h2>
          </div>
          <div className="relative">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {(() => {
                const cityImages: Record<string, string[]> = {
                  goa: [COMMUNITY_IMAGES['goa-sunset'], COMMUNITY_IMAGES['goa-food'], COMMUNITY_IMAGES['goa-cliff'], COMMUNITY_IMAGES['bonfire'], COMMUNITY_IMAGES['mandovi-river'], COMMUNITY_IMAGES['spice-market'], COMMUNITY_IMAGES['goa-sunset'], COMMUNITY_IMAGES['goa-cliff']],
                  rajasthan: [COMMUNITY_IMAGES['jaipur-fort'], COMMUNITY_IMAGES['jaipur-street'], COMMUNITY_IMAGES['spice-market'], COMMUNITY_IMAGES['jaipur-fort'], COMMUNITY_IMAGES['jaipur-street'], COMMUNITY_IMAGES['spice-market'], COMMUNITY_IMAGES['jaipur-fort'], COMMUNITY_IMAGES['jaipur-street']],
                  manali: [COMMUNITY_IMAGES['manali-mountains'], COMMUNITY_IMAGES['bonfire'], COMMUNITY_IMAGES['manali-mountains'], COMMUNITY_IMAGES['bonfire'], COMMUNITY_IMAGES['manali-mountains'], COMMUNITY_IMAGES['bonfire'], COMMUNITY_IMAGES['manali-mountains'], COMMUNITY_IMAGES['bonfire']],
                  kerala: [COMMUNITY_IMAGES['kerala-backwaters'], COMMUNITY_IMAGES['goa-sunset'], COMMUNITY_IMAGES['kerala-backwaters'], COMMUNITY_IMAGES['spice-market'], COMMUNITY_IMAGES['kerala-backwaters'], COMMUNITY_IMAGES['goa-sunset'], COMMUNITY_IMAGES['kerala-backwaters'], COMMUNITY_IMAGES['spice-market']],
                  meghalaya: [COMMUNITY_IMAGES['meghalaya-bridges'], COMMUNITY_IMAGES['manali-mountains'], COMMUNITY_IMAGES['meghalaya-bridges'], COMMUNITY_IMAGES['kerala-backwaters'], COMMUNITY_IMAGES['meghalaya-bridges'], COMMUNITY_IMAGES['manali-mountains'], COMMUNITY_IMAGES['meghalaya-bridges'], COMMUNITY_IMAGES['kerala-backwaters']],
                }
                const images = cityImages[trip.cityId] || Object.values(COMMUNITY_IMAGES).slice(0, 8)
                const captions = ['Arrival', 'First quest', 'Hidden gem', 'Golden hour', 'The locals', 'Street flavours', 'Night vibes', 'The farewell']
                return images.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className="flex-shrink-0 w-48 aspect-[3/4] rounded-xl relative overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={src}
                      alt={captions[i]}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-charcoal/60 to-transparent">
                      <p className="text-[10px] text-warm-white/90 font-medium">{captions[i]}</p>
                      <p className="text-[8px] text-warm-white/50">Day {(i % 4) + 1}</p>
                    </div>
                  </motion.div>
                ))
              })()}
            </div>
          </div>
        </motion.div>

        {/* Journey map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-panel rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Map className="w-4 h-4 text-terracotta" />
            <h2 className="font-serif text-lg font-semibold text-charcoal">Journey Map</h2>
          </div>
          <div className="w-full aspect-[2/1] rounded-xl bg-gradient-to-br from-beige to-sandstone/10 relative overflow-hidden">
            {/* Route line placeholder */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
              <motion.path
                d="M 50 150 Q 100 80 150 120 Q 200 160 250 90 Q 300 30 350 70"
                fill="none"
                stroke="#C9A96E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
              />
              {/* Quest markers */}
              {[
                { cx: 50, cy: 150 },
                { cx: 150, cy: 120 },
                { cx: 250, cy: 90 },
                { cx: 350, cy: 70 },
              ].map((pos, i) => (
                <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.2, type: 'spring' }}>
                  <circle cx={pos.cx} cy={pos.cy} r="8" fill="#C4734F" opacity="0.2" />
                  <circle cx={pos.cx} cy={pos.cy} r="4" fill="#C4734F" />
                  <text x={pos.cx} y={pos.cy + 3} textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">{i + 1}</text>
                </motion.g>
              ))}
            </svg>
            <p className="absolute bottom-3 right-3 text-[10px] text-charcoal-light/30">{trip.distanceCovered} km covered</p>
          </div>
        </motion.div>

        {/* Trip stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-6"
        >
          <TripStats trip={trip} />
        </motion.div>

        {/* Social cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-panel rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-4 h-4 text-gold" />
            <h2 className="font-serif text-lg font-semibold text-charcoal">Social Cards</h2>
          </div>
          <p className="text-xs text-charcoal-light/50 mb-4">
            Pre-designed, shareable cards from your trip highlights.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {(() => {
              const cardImages = Object.values(CITY_HERO_IMAGES[trip.cityId] ? 
                { a: CITY_HERO_IMAGES[trip.cityId], b: COMMUNITY_IMAGES['goa-food'], c: COMMUNITY_IMAGES['bonfire'], d: COMMUNITY_IMAGES['spice-market'] } : 
                { a: COMMUNITY_IMAGES['goa-sunset'], b: COMMUNITY_IMAGES['goa-food'], c: COMMUNITY_IMAGES['bonfire'], d: COMMUNITY_IMAGES['spice-market'] }
              )
              const cardLabels = ['Trip Stats', 'Best Quest', 'Best Moment', 'Highlight']
              return cardImages.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="aspect-[9/16] rounded-xl overflow-hidden relative cursor-pointer hover:shadow-lg transition-shadow group"
                >
                  <img src={src} alt={cardLabels[i]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/20" />
                  <div className="absolute bottom-0 inset-x-0 p-3 text-center">
                    <p className="text-[7px] tracking-[0.2em] uppercase text-warm-white/50 mb-0.5">Velosta</p>
                    <p className="text-[10px] font-serif font-semibold text-warm-white">{trip.cityName}</p>
                    <p className="text-[8px] text-warm-white/60 mt-0.5">{cardLabels[i]}</p>
                  </div>
                </motion.div>
              ))
            })()}
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-beige/40 text-xs font-medium text-charcoal-light hover:bg-beige/60 transition-colors">
            <Download className="w-3 h-3" /> Download All
          </button>
        </motion.div>
      </main>
    </>
  )
}
