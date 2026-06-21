'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Map, Trophy, Calendar, User, ArrowLeft } from 'lucide-react'

const navItems = [
  { id: 'feed', label: 'Feed', icon: Home, href: '/community' },
  { id: 'quests', label: 'Quests', icon: Map, href: '/community/quests' },
  { id: 'events', label: 'Events', icon: Calendar, href: '/community/events' },
  { id: 'leaderboard', label: 'Ranks', icon: Trophy, href: '/community/leaderboard' },
  { id: 'profile', label: 'Profile', icon: User, href: '/community/profile' },
]

export default function CommunityNav() {
  const pathname = usePathname()

  const getActiveId = () => {
    if (pathname === '/community') return 'feed'
    for (const item of navItems) {
      if (item.href !== '/community' && pathname.startsWith(item.href)) return item.id
    }
    return 'feed'
  }

  const activeId = getActiveId()

  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden md:flex items-center justify-between px-8 py-4 glass-panel fixed top-0 left-0 right-0 z-40 rounded-none border-t-0 border-x-0">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-charcoal-light hover:text-terracotta transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs tracking-widest uppercase font-medium">Trip Planner</span>
          </Link>
          <div className="w-px h-5 bg-sandstone/40" />
          <Link href="/community" className="flex items-center gap-2">
            <span className="text-xs tracking-[0.3em] uppercase text-sandstone font-medium">Velosta</span>
            <span className="font-serif text-lg text-charcoal font-semibold">Community</span>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeId === item.id
            return (
              <Link key={item.id} href={item.href}>
                <motion.div
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-charcoal text-warm-white shadow-md'
                      : 'text-charcoal-light hover:bg-beige/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </motion.div>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel rounded-none border-b-0 border-x-0 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeId === item.id
            return (
              <Link key={item.id} href={item.href}>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center gap-0.5 px-3 py-1.5"
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? 'text-terracotta' : 'text-charcoal-light/50'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-medium transition-colors duration-300 ${
                      isActive ? 'text-terracotta' : 'text-charcoal-light/40'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="mobile-nav-indicator"
                      className="w-4 h-0.5 rounded-full bg-terracotta mt-0.5"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
