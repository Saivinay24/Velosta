'use client'

import { useTravelStore } from '@/lib/store'
import BudgetFilter from '@/components/BudgetFilter'
import MapView from '@/components/MapView'
import ItineraryBuilder from '@/components/ItineraryBuilder'
import { AnimatePresence, motion } from 'framer-motion'

export default function Home() {
  const { currentStep, isTransitioning } = useTravelStore()

  return (
    <main className="min-h-screen bg-ivory">
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

      <AnimatePresence mode="wait">
        {currentStep === 1 && <BudgetFilter key="budget" />}
        {currentStep === 2 && <MapView key="map" />}
        {currentStep === 3 && <ItineraryBuilder key="itinerary" />}
      </AnimatePresence>
    </main>
  )
}
