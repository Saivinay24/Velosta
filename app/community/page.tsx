'use client'

import { motion } from 'framer-motion'
import CommunityNav from '@/components/community/CommunityNav'
import FeedPostCard from '@/components/community/FeedPost'
import EventCard from '@/components/community/EventCard'
import { useCommunityStore } from '@/lib/community/store'
import { communityCities, feedPosts, events, getPostsByCity, getEventsByCity } from '@/lib/community/data'
import type { FeedFilter } from '@/lib/community/types'
import { Flame, Zap } from 'lucide-react'

const feedFilters: { id: FeedFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'quests', label: '🎯 Quests' },
  { id: 'vlogs', label: '🎬 Vlogs' },
  { id: 'meetups', label: '🤝 Meetups' },
]

export default function CommunityFeedPage() {
  const { selectedCity, setSelectedCity, feedFilter, setFeedFilter } = useCommunityStore()

  // Get filtered posts
  const cityPosts = selectedCity === 'all' ? feedPosts : getPostsByCity(selectedCity)
  const filteredPosts = cityPosts.filter(post => {
    if (feedFilter === 'all') return true
    if (feedFilter === 'quests') return post.type === 'quest_completion'
    if (feedFilter === 'vlogs') return post.type === 'vlog'
    if (feedFilter === 'meetups') return post.type === 'meetup_recap'
    return true
  })

  // Get upcoming events for the "Happening Now" section
  const cityEvents = selectedCity === 'all' ? events : getEventsByCity(selectedCity)
  const upcomingEvents = cityEvents.slice(0, 3)

  return (
    <>
      <CommunityNav />

      <main className="pt-20 md:pt-24 pb-24 md:pb-8 px-4 max-w-4xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-sandstone font-medium mb-2">Velosta</p>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-charcoal mb-2">Community</h1>
          <div className="w-10 h-[2px] bg-gold mx-auto mb-3" />
          <p className="text-sm text-charcoal-light/50 max-w-md mx-auto">
            Quest completions, vlogs, meetups, and stories from travelers across India.
          </p>
        </motion.div>

        {/* City filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-4 pb-1"
        >
          <button
            onClick={() => setSelectedCity('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex-shrink-0 ${
              selectedCity === 'all'
                ? 'bg-charcoal text-warm-white shadow-md'
                : 'bg-beige/60 text-charcoal-light hover:bg-sandstone/30'
            }`}
          >
            🌍 All Cities
          </button>
          {communityCities.map(city => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                selectedCity === city.id
                  ? 'bg-charcoal text-warm-white shadow-md'
                  : 'bg-beige/60 text-charcoal-light hover:bg-sandstone/30'
              }`}
            >
              {city.emoji} {city.name}
            </button>
          ))}
        </motion.div>

        {/* Feed filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center gap-2 mb-6"
        >
          {feedFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setFeedFilter(filter.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                feedFilter === filter.id
                  ? 'bg-gold/20 text-charcoal border border-gold/40'
                  : 'bg-beige/40 text-charcoal-light/70 border border-transparent hover:border-sandstone/40'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main feed */}
          <div className="lg:col-span-2 space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, idx) => (
                <FeedPostCard key={post.id} post={post} index={idx} />
              ))
            ) : (
              <div className="text-center py-16 glass-panel rounded-2xl">
                <p className="text-charcoal-light/40 text-sm">No posts found for this filter.</p>
              </div>
            )}
          </div>

          {/* Sidebar — Happening Now */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-terracotta" />
                <h2 className="font-serif text-lg font-semibold text-charcoal">Happening Now</h2>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((event, idx) => (
                  <EventCard key={event.id} event={event} index={idx} />
                ))}
              </div>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="glass-panel rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-gold" />
                <h3 className="text-sm font-semibold text-charcoal">Community Pulse</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Active Travelers', value: '1,247' },
                  { label: 'Quests Today', value: '89' },
                  { label: 'Events This Week', value: '12' },
                  { label: 'Cities Active', value: '18' },
                ].map(stat => (
                  <div key={stat.label} className="text-center p-2 rounded-xl bg-beige/30">
                    <p className="text-lg font-bold text-charcoal">{stat.value}</p>
                    <p className="text-[9px] text-charcoal-light/40 font-medium uppercase tracking-wide">{stat.label}</p>
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
