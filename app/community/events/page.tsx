'use client'

import { motion } from 'framer-motion'
import CommunityNav from '@/components/community/CommunityNav'
import EventCard from '@/components/community/EventCard'
import { useCommunityStore } from '@/lib/community/store'
import { communityCities, events, getEventsByCity } from '@/lib/community/data'
import { Plus, Calendar } from 'lucide-react'

export default function EventsPage() {
  const { eventCityFilter, setEventCityFilter } = useCommunityStore()

  const cityEvents = eventCityFilter === 'all' ? events : getEventsByCity(eventCityFilter)

  return (
    <>
      <CommunityNav />

      <main className="pt-20 md:pt-24 pb-24 md:pb-8 px-4 max-w-5xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-sandstone font-medium mb-2">Velosta</p>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-charcoal mb-2">Events & Meetups</h1>
          <div className="w-10 h-[2px] bg-gold mx-auto mb-3" />
          <p className="text-sm text-charcoal-light/50 max-w-md mx-auto">
            Meet fellow travelers, join bonfires, quest rallies, and exclusive Velosta experiences.
          </p>
        </motion.div>

        {/* City filter + Create button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setEventCityFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                eventCityFilter === 'all'
                  ? 'bg-charcoal text-warm-white shadow-md'
                  : 'bg-beige/60 text-charcoal-light hover:bg-sandstone/30'
              }`}
            >
              🌍 All
            </button>
            {communityCities.map(city => (
              <button
                key={city.id}
                onClick={() => setEventCityFilter(city.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                  eventCityFilter === city.id
                    ? 'bg-charcoal text-warm-white shadow-md'
                    : 'bg-beige/60 text-charcoal-light hover:bg-sandstone/30'
                }`}
              >
                {city.emoji} {city.name}
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-warm-white text-sm font-medium flex-shrink-0 ml-3"
            style={{
              background: 'linear-gradient(135deg, #C4734F 0%, #C9A96E 100%)',
              boxShadow: '0 4px 16px rgba(196, 115, 79, 0.25)',
            }}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create Event</span>
          </motion.button>
        </motion.div>

        {/* Event count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 text-xs text-charcoal-light/40 mb-4"
        >
          <Calendar className="w-3 h-3" />
          {cityEvents.length} upcoming events
        </motion.div>

        {/* Events grid */}
        {cityEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cityEvents.map((event, idx) => (
              <EventCard key={event.id} event={event} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-2xl">
            <p className="text-charcoal-light/40 text-sm">No events found for this city.</p>
            <p className="text-charcoal-light/30 text-xs mt-1">Be the first to create one!</p>
          </div>
        )}
      </main>
    </>
  )
}
