'use client'

import { useTravelStore } from '@/lib/store'
import PersistentMap from '@/components/PersistentMap'
import CloudOverlay from '@/components/CloudOverlay'
import BudgetFilter from '@/components/BudgetFilter'
import MapView from '@/components/MapView'
import ItineraryBuilder from '@/components/ItineraryBuilder'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const { currentStep, isTransitioning } = useTravelStore()

  return (
    <main className="min-h-screen bg-ivory" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Persistent Mapbox — always rendered, never unmounted */}
      <PersistentMap />

      {/* Cloud overlay — always rendered at root, dissolves during intro */}
      <CloudOverlay />

      {/* Transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-ivory/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-8 h-8 rounded-full border-2 border-sandstone/30 border-t-gold animate-spin"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step UI layers — always mounted, visibility controlled */}
      {/* pointer-events: none on wrappers so map pin clicks pass through */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 10,
          opacity: currentStep === 1 ? 1 : 0,
          pointerEvents: currentStep === 1 ? 'auto' : 'none',
          transition: 'opacity 0.6s ease',
        }}
      >
        <BudgetFilter />
      </div>

      <div
        style={{
          position: 'fixed', inset: 0, zIndex: currentStep === 2 ? 10 : 5,
          opacity: currentStep === 2 ? 1 : 0,
          pointerEvents: 'none', // Let map pins receive clicks
          transition: 'opacity 0.6s ease',
        }}
      >
        <MapView />
      </div>

      <div
        style={{
          position: 'fixed', inset: 0, zIndex: currentStep === 3 ? 10 : 5,
          opacity: currentStep === 3 ? 1 : 0,
          pointerEvents: currentStep === 3 ? 'auto' : 'none',
          transition: 'opacity 0.6s ease',
        }}
      >
        <ItineraryBuilder />
      </div>
    </main>
  )
}
