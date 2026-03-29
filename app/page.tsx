'use client'

import { useTravelStore } from '@/lib/store'
import PersistentMap from '@/components/PersistentMap'
import CloudOverlay from '@/components/CloudOverlay'
import BudgetFilter from '@/components/BudgetFilter'
import MapView from '@/components/MapView'
import ItineraryBuilder from '@/components/ItineraryBuilder'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const { currentStep, isTransitioning, cloudTransitionActive } = useTravelStore()

  return (
    <main className="min-h-screen bg-ivory" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Persistent Mapbox — always rendered, never unmounted */}
      <PersistentMap />

      {/* Cloud overlay — intro dissolve */}
      <CloudOverlay />

      {/* ═══ Cloud Fly-Through Transition ═══
          When navigating between steps, clouds roll in (obscuring the view),
          the step changes behind them, then clouds clear to reveal the new view.
          Like a camera flying through clouds between scenes. */}
      <AnimatePresence>
        {cloudTransitionActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ willChange: 'opacity' }}
          >
            {/* Solid white-warm base that covers everything */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, #ffffff 0%, #faf8f5 40%, #f3ede4 80%, #ebe3d6 100%)',
              }}
            />

            {/* Fast-moving cloud mass — sweeps in from edges */}
            <motion.div
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', inset: '-10%',
                backgroundImage: [
                  'radial-gradient(ellipse 120% 80% at 20% 20%, rgba(255,255,255,1) 0%, rgba(248,244,238,0.8) 35%, transparent 65%)',
                  'radial-gradient(ellipse 100% 70% at 75% 15%, rgba(255,255,255,1) 0%, rgba(248,244,238,0.7) 30%, transparent 60%)',
                  'radial-gradient(ellipse 90% 60% at 50% 60%, rgba(255,255,255,0.95) 0%, rgba(244,238,228,0.6) 40%, transparent 70%)',
                  'radial-gradient(ellipse 80% 55% at 85% 70%, rgba(255,255,255,0.9) 0%, rgba(240,234,222,0.5) 35%, transparent 65%)',
                  'radial-gradient(ellipse 70% 50% at 15% 80%, rgba(255,255,255,0.9) 0%, rgba(240,234,222,0.5) 35%, transparent 60%)',
                ].join(', '),
              }}
            />

            {/* Secondary wisps — counter direction */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 0.7, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', inset: '-5%',
                backgroundImage: [
                  'radial-gradient(ellipse 60% 45% at 30% 35%, rgba(255,255,255,0.95) 0%, transparent 50%)',
                  'radial-gradient(ellipse 70% 50% at 70% 55%, rgba(255,255,255,0.9) 0%, transparent 45%)',
                  'radial-gradient(ellipse 50% 35% at 50% 15%, rgba(255,255,255,0.92) 0%, transparent 42%)',
                ].join(', '),
              }}
            />

            {/* Bottom haze */}
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 20%, transparent 50%)',
              }}
            />

            {/* Optional warm glow during transition */}
            <div
              style={{
                position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '400px', height: '400px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step UI layers — always mounted, visibility controlled */}
      <div
        className="will-change-opacity"
        style={{
          position: 'fixed', inset: 0, zIndex: 10,
          opacity: currentStep === 1 ? 1 : 0,
          pointerEvents: currentStep === 1 ? 'auto' : 'none',
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <BudgetFilter />
      </div>

      <div
        className="will-change-opacity"
        style={{
          position: 'fixed', inset: 0, zIndex: currentStep === 2 ? 10 : 5,
          opacity: currentStep === 2 ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <MapView />
      </div>

      <div
        className="will-change-opacity"
        style={{
          position: 'fixed', inset: 0, zIndex: currentStep === 3 ? 10 : 5,
          opacity: currentStep === 3 ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <ItineraryBuilder />
      </div>
    </main>
  )
}
