'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import mapboxgl from 'mapbox-gl'
import { useTravelStore } from '@/lib/store'
import { destinations, getDayFitColor, filterByBudget, filterByTripType } from '@/lib/data'
import type { Destination, TripCategory, TripType } from '@/lib/types'
import {
  ArrowLeft, Calendar, X, MapPin, Filter, Mountain, Landmark, Compass, Palmtree,
  Clock, IndianRupee, Star, Search, Users, User, Heart, ChevronDown, ChevronUp, Wallet,
  Globe, Map,
} from 'lucide-react'

const categoryIcons: Record<string, React.ReactNode> = {
  nature: <Mountain className="w-3.5 h-3.5" />,
  culture: <Landmark className="w-3.5 h-3.5" />,
  adventure: <Compass className="w-3.5 h-3.5" />,
  relaxation: <Palmtree className="w-3.5 h-3.5" />,
}

const tripTypeIcons: Record<string, React.ReactNode> = {
  solo: <User className="w-3.5 h-3.5" />,
  couple: <Heart className="w-3.5 h-3.5" />,
  friends: <Users className="w-3.5 h-3.5" />,
  family: <Users className="w-3.5 h-3.5" />,
}

const spring = { type: 'spring' as const, stiffness: 300, damping: 30 }

function createPinSVG(color: string, selected = false): string {
  const size = selected ? 40 : 32
  const scale = selected ? 1.25 : 1
  return `
    <svg width="${size}" height="${Math.round(size * 1.3)}" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <filter id="s"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#00000030"/></filter>
      <g filter="url(#s)" transform="scale(${scale})">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26C32 7.163 24.837 0 16 0z" fill="${color}"/>
        <circle cx="16" cy="15" r="6" fill="white" fill-opacity="0.9"/>
      </g>
    </svg>
  `
}

export default function MapView() {
  const [hoveredDestination, setHoveredDestination] = useState<Destination | null>(null)
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null)
  const [selectedCard, setSelectedCard] = useState<Destination | null>(null)
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set())
  const [showList, setShowList] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const hoveredRef = useRef<Destination | null>(null)

  const {
    budgetValue, setBudgetValue,
    tripDays, setTripDays,
    tripType, setTripType,
    selectedCategories, toggleCategory,
    goToPreviousStep, setSelectedDestination, goToNextStep,
    mapRef, mapLoaded, currentStep,
    mapStyle, toggleMapStyle,
  } = useTravelStore()

  // ── Keyboard ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentStep !== 2) return
      if (e.key === 'Escape') {
        if (selectedCard) { setSelectedCard(null); resetMapView() }
        else goToPreviousStep()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, selectedCard])

  // ── Filter destinations ──
  const filteredDestinations = useMemo(() => {
    let dests = filterByBudget(budgetValue)
    dests = filterByTripType(dests, tripType)
    if (selectedCategories.length > 0) {
      dests = dests.filter(d => selectedCategories.includes(d.tripDetails.category as TripCategory))
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      dests = dests.filter(d => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q))
    }
    return dests
  }, [budgetValue, tripType, selectedCategories, searchQuery])

  // ──── Build REAL pin markers ────
  useEffect(() => {
    if (!mapRef || !mapLoaded || currentStep !== 2) return

    const addPinsTimer = setTimeout(() => {
      // Clean old markers
      markersRef.current.forEach(mk => mk.remove())
      markersRef.current = []

      filteredDestinations.forEach(dest => {
        const dayFit = getDayFitColor(dest, tripDays)
        // Outer el: Mapbox controls this element's transform for positioning.
        // Inner pinEl: we control this for hover animations (scale, translateY).
        const el = document.createElement('div')
        el.style.cssText = 'cursor:pointer;'
        const pinEl = document.createElement('div')
        pinEl.style.cssText = 'transition:transform 0.2s cubic-bezier(0.34,1.56,0.64,1);'
        pinEl.innerHTML = createPinSVG(dayFit.color)
        el.appendChild(pinEl)

        el.addEventListener('mouseenter', () => {
          hoveredRef.current = dest
          setHoveredDestination(dest)
          pinEl.style.transform = 'scale(1.3) translateY(-4px)'
          if (mapRef) {
            const pt = mapRef.project([dest.location.lng, dest.location.lat])
            setHoverPosition({ x: pt.x, y: pt.y })
          }
        })

        el.addEventListener('mouseleave', () => {
          pinEl.style.transform = 'scale(1)'
          setTimeout(() => {
            if (hoveredRef.current === dest) {
              hoveredRef.current = null
              setHoveredDestination(null)
              setHoverPosition(null)
            }
          }, 50)
        })

        el.addEventListener('click', (e) => {
          e.stopPropagation()
          setSelectedCard(dest)
          mapRef?.flyTo({
            center: [dest.location.lng, dest.location.lat],
            zoom: 9, duration: 2000, curve: 1.5, pitch: 0,
          })
        })

        const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([dest.location.lng, dest.location.lat])
          .addTo(mapRef)
        markersRef.current.push(marker)
      })
    }, 300)

    return () => {
      clearTimeout(addPinsTimer)
      markersRef.current.forEach(mk => mk.remove())
      markersRef.current = []
    }
  }, [mapRef, mapLoaded, currentStep, filteredDestinations, tripDays])

  // ── Cleanup on step change ──
  useEffect(() => {
    if (currentStep !== 2) {
      markersRef.current.forEach(mk => mk.remove())
      markersRef.current = []
    }
  }, [currentStep])

  // ── Handlers ──
  const handleSelectDestination = useCallback((dest: Destination) => {
    setSelectedDestination(dest)
    goToNextStep()
    setSelectedCard(null)
  }, [setSelectedDestination, goToNextStep])

  const resetMapView = useCallback(() => {
    setSelectedCard(null)
    mapRef?.flyTo({ center: [78.9629, 22.5937], zoom: 4.2, pitch: 0, bearing: 0, duration: 1500 })
  }, [mapRef])

  const categories: TripCategory[] = ['nature', 'culture', 'adventure', 'relaxation']
  const tripTypes: TripType[] = ['solo', 'couple', 'friends', 'family']
  const dayOptions = [2, 3, 5, 7, 10, 14]

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ pointerEvents: 'none' }}>

      {/* ═══ LEFT SIDEBAR — Preferences & Filters ═══ */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: currentStep === 2 ? 1 : 0, x: currentStep === 2 ? 0 : -40 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[72px] left-0 bottom-0 w-[280px] glass-panel-heavy z-10 flex flex-col overflow-y-auto scrollbar-hide"
        style={{ position: 'absolute', pointerEvents: currentStep === 2 ? 'auto' : 'none', borderRight: '1px solid var(--glass-border)' }}
      >
        <div className="p-4 space-y-5 flex-1">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-light/40" />
            <input
              type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full pl-9 pr-3 py-2.5 text-sm font-sans bg-beige/40 rounded-xl border border-transparent focus:border-sandstone/50 outline-none placeholder:text-charcoal-light/30"
            />
          </div>

          {/* Budget */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-3.5 h-3.5 text-soft-gold" />
              <span className="text-xs font-sans font-semibold text-charcoal uppercase tracking-wide">Budget</span>
            </div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg font-serif text-charcoal tabular-nums">₹{budgetValue.toLocaleString('en-IN')}</span>
            </div>
            <input type="range" min={5000} max={200000} step={1000} value={budgetValue}
              onChange={e => setBudgetValue(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-[10px] font-sans text-charcoal-light/40 mt-1">
              <span>₹5,000</span><span>₹2,00,000</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-3.5 h-3.5 text-soft-gold" />
              <span className="text-xs font-sans font-semibold text-charcoal uppercase tracking-wide">Duration</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {dayOptions.map(d => (
                <motion.button key={d} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setTripDays(d)}
                  className={`py-2 text-xs font-sans font-medium transition-all ${tripDays === d
                    ? 'bg-charcoal text-warm-white shadow-sm' : 'bg-beige/50 text-charcoal-light/60 hover:bg-beige'}`}
                  style={{ borderRadius: '10px' }}>
                  {d}d
                </motion.button>
              ))}
            </div>
          </div>

          {/* Trip Type */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-3.5 h-3.5 text-soft-gold" />
              <span className="text-xs font-sans font-semibold text-charcoal uppercase tracking-wide">Trip Type</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {tripTypes.map(t => (
                <motion.button key={t} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setTripType(t)}
                  className={`py-2.5 px-3 text-xs font-sans font-medium capitalize flex items-center gap-1.5 justify-center transition-all ${tripType === t
                    ? 'bg-charcoal text-warm-white shadow-sm' : 'bg-beige/50 text-charcoal-light/60 hover:bg-beige'}`}
                  style={{ borderRadius: '10px' }}>
                  {tripTypeIcons[t]}
                  {t}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-3.5 h-3.5 text-soft-gold" />
              <span className="text-xs font-sans font-semibold text-charcoal uppercase tracking-wide">Category</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map(cat => {
                const active = selectedCategories.includes(cat)
                return (
                  <motion.button key={cat} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => toggleCategory(cat)}
                    className={`py-2.5 px-3 text-xs font-sans font-medium capitalize flex items-center gap-1.5 justify-center transition-all ${active
                      ? 'bg-terracotta text-warm-white shadow-sm' : 'bg-beige/50 text-charcoal-light/60 hover:bg-beige'}`}
                    style={{ borderRadius: '10px' }}>
                    {categoryIcons[cat]}
                    {cat}
                  </motion.button>
                )
              })}
            </div>
            {selectedCategories.length > 0 && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onClick={() => { selectedCategories.forEach(c => toggleCategory(c)) }}
                className="text-[10px] font-sans text-terracotta mt-1.5 hover:underline">
                Clear filters
              </motion.button>
            )}
          </div>

          {/* Destination Count */}
          <div className="glass-panel p-3.5" style={{ borderRadius: '14px' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans text-charcoal-light/50">Matching destinations</span>
              <span className="text-lg font-serif text-charcoal tabular-nums">{filteredDestinations.length}</span>
            </div>
          </div>

          {/* Day Compatibility Legend */}
          <div>
            <h3 className="font-sans font-semibold text-charcoal mb-2 text-xs tracking-wide uppercase">Day Fit</h3>
            <div className="space-y-1.5">
              {[
                { color: '#22c55e', label: 'Comfortable' },
                { color: '#eab308', label: 'Slightly hectic' },
                { color: '#f97316', label: 'Too tight' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 text-xs font-sans">
                  <div className="w-3 h-3 rounded-full border-2 border-warm-white" style={{ backgroundColor: item.color }} />
                  <span style={{ color: 'rgba(74,74,74,0.6)' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Style Toggle */}
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={toggleMapStyle}
            className="w-full py-2.5 px-3 text-xs font-sans font-medium flex items-center justify-center gap-2 transition-all bg-beige/50 text-charcoal-light/70 hover:bg-beige"
            style={{ borderRadius: '10px' }}>
            {mapStyle === 'light' ? <Globe className="w-3.5 h-3.5" /> : <Map className="w-3.5 h-3.5" />}
            {mapStyle === 'light' ? 'Satellite View' : 'Default View'}
          </motion.button>
        </div>

        {/* Sidebar List Toggle */}
        <div className="p-4 flex-shrink-0" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowList(!showList)}
            className="w-full py-2.5 text-xs font-sans font-semibold flex items-center justify-center gap-2 bg-charcoal text-warm-white transition-all"
            style={{ borderRadius: '12px' }}>
            <MapPin className="w-3.5 h-3.5" />
            {showList ? 'Hide List' : 'View as List'}
          </motion.button>
        </div>
      </motion.div>

      {/* ═══ TOP BAR ═══ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: currentStep === 2 ? 1 : 0, y: currentStep === 2 ? 0 : -20 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 glass-panel-heavy p-4 z-10"
        style={{ position: 'absolute', pointerEvents: currentStep === 2 ? 'auto' : 'none', borderBottom: '1px solid var(--glass-border)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={goToPreviousStep}
            className="flex items-center gap-2 text-charcoal hover:text-terracotta transition-colors duration-300">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-sans font-semibold text-sm hidden sm:inline">Back</span>
          </motion.button>

          <div className="text-center">
            <h2 className="text-lg font-serif text-charcoal" style={{ letterSpacing: '-0.02em' }}>
              <motion.span key={filteredDestinations.length} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                {filteredDestinations.length} Destinations
              </motion.span>
            </h2>
            <p className="text-xs font-sans" style={{ color: 'rgba(74,74,74,0.45)' }}>
              within ₹{budgetValue.toLocaleString('en-IN')} · {tripDays} days
            </p>
          </div>

          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowList(!showList)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-beige/50 hover:bg-beige text-charcoal transition-colors"
              style={{ display: 'flex' }}>
              {showList ? <X className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ═══ Destination List Drawer ═══ */}
      <AnimatePresence>
        {showList && currentStep === 2 && (
          <motion.div
            initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[72px] right-0 bottom-0 w-[320px] glass-panel-heavy z-20 overflow-y-auto scrollbar-hide"
            style={{ position: 'absolute', pointerEvents: 'auto', borderLeft: '1px solid var(--glass-border)' }}
          >
            <div className="p-4">
              <h3 className="font-serif text-base text-charcoal mb-3">All Destinations</h3>
              <div className="space-y-2">
                {filteredDestinations.map(dest => {
                  const dayFit = getDayFitColor(dest, tripDays)
                  return (
                    <motion.button key={dest.id} whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedCard(dest)
                        setShowList(false)
                        mapRef?.flyTo({ center: [dest.location.lng, dest.location.lat], zoom: 9, duration: 2000 })
                      }}
                      className="w-full glass-panel p-3 flex items-center gap-3 text-left"
                      style={{ borderRadius: '14px' }}>
                      {dest.imageUrl && !imgErrors.has(dest.id + '-list') ? (
                        <img src={dest.imageUrl} alt={dest.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                          onError={() => setImgErrors(prev => new Set(prev).add(dest.id + '-list'))} />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-beige/50 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-sandstone" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-serif text-sm text-charcoal truncate">{dest.name}</p>
                        <p className="text-[11px] font-sans text-charcoal-light/40">{dest.state}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] font-sans" style={{ color: 'rgba(74,74,74,0.5)' }}>
                          <span>₹{dest.tripDetails.estimatedCost.toLocaleString('en-IN')}</span>
                          <span>·</span>
                          <span>{dest.tripDetails.minDays}-{dest.tripDetails.maxDays}d</span>
                        </div>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: dayFit.color }} />
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Hover Tooltip — positioned near the pin ═══ */}
      <AnimatePresence>
        {hoveredDestination && !selectedCard && hoverPosition && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed glass-panel-heavy p-4 z-20 w-[280px]"
            style={{
              borderRadius: '20px', pointerEvents: 'none',
              left: Math.min(Math.max(hoverPosition.x + 20, 300), window.innerWidth - 300),
              top: Math.max(Math.min(hoverPosition.y - 80, window.innerHeight - 300), 80),
            }}
          >
            {hoveredDestination.imageUrl && !imgErrors.has(hoveredDestination.id) && (
              <div className="w-full h-24 rounded-xl overflow-hidden mb-3" style={{ background: 'var(--beige)' }}>
                <img src={hoveredDestination.imageUrl} alt={hoveredDestination.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgErrors(prev => new Set(prev).add(hoveredDestination.id))} />
              </div>
            )}
            <div className="flex items-start gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: getDayFitColor(hoveredDestination, tripDays).color,
                  boxShadow: `0 0 6px ${getDayFitColor(hoveredDestination, tripDays).color}80` }} />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-base text-charcoal" style={{ letterSpacing: '-0.02em' }}>
                  {hoveredDestination.name}
                </h3>
                <p className="text-[11px] font-sans" style={{ color: 'rgba(74,74,74,0.45)' }}>{hoveredDestination.state}</p>
                <div className="flex items-center gap-3 text-xs mt-1.5 mb-2 font-sans" style={{ color: 'rgba(74,74,74,0.6)' }}>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{hoveredDestination.tripDetails.minDays}-{hoveredDestination.tripDetails.maxDays}d</span>
                  <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />₹{hoveredDestination.tripDetails.estimatedCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-[10px] px-2 py-0.5 mb-2 inline-flex items-center gap-1 font-sans font-medium"
                  style={{ borderRadius: '8px',
                    backgroundColor: `${getDayFitColor(hoveredDestination, tripDays).color}15`,
                    color: getDayFitColor(hoveredDestination, tripDays).color }}>
                  <Clock className="w-2.5 h-2.5" />
                  {getDayFitColor(hoveredDestination, tripDays).label}
                </div>
                <div className="space-y-0.5">
                  {hoveredDestination.tripDetails.highlights.slice(0, 3).map(h => (
                    <div key={h} className="text-[11px] font-sans flex items-center gap-1" style={{ color: 'rgba(74,74,74,0.5)' }}>
                      <span className="text-gold">✓</span>{h}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Selected Destination Modal ═══ */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) resetMapView() }}
            style={{ pointerEvents: 'auto', background: 'rgba(44,44,44,0.15)', backdropFilter: 'blur(4px)' }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel-heavy w-full max-w-lg p-7"
              style={{ borderRadius: '28px', maxHeight: '85vh', overflowY: 'auto' }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  {selectedCard.imageUrl && !imgErrors.has(selectedCard.id + '-modal') && (
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-5" style={{ background: 'var(--beige)' }}>
                      <img src={selectedCard.imageUrl} alt={selectedCard.name}
                        className="w-full h-full object-cover"
                        onError={() => setImgErrors(prev => new Set(prev).add(selectedCard.id + '-modal'))} />
                    </div>
                  )}
                  <h2 className="text-3xl font-serif text-charcoal mb-1" style={{ letterSpacing: '-0.02em' }}>
                    {selectedCard.name}
                  </h2>
                  <p className="text-sm font-sans" style={{ color: 'rgba(74,74,74,0.45)' }}>{selectedCard.state}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm font-sans" style={{ color: 'rgba(74,74,74,0.6)' }}>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{selectedCard.tripDetails.minDays}-{selectedCard.tripDetails.maxDays} days</span>
                    <span className="flex items-center gap-1"><IndianRupee className="w-4 h-4" />₹{selectedCard.tripDetails.estimatedCost.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={resetMapView}
                  className="w-8 h-8 rounded-full bg-beige/60 flex items-center justify-center hover:bg-beige transition-colors flex-shrink-0">
                  <X className="w-4 h-4 text-charcoal" />
                </motion.button>
              </div>

              <div className="mb-6">
                <h3 className="font-sans font-semibold text-charcoal text-sm mb-3">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCard.tripDetails.highlights.map(h => (
                    <span key={h} className="text-xs font-sans px-3 py-1.5 bg-beige/60" style={{ borderRadius: '9999px', color: 'rgba(74,74,74,0.6)' }}>✨ {h}</span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-sans font-semibold text-charcoal text-sm mb-3">Top Places</h3>
                <div className="space-y-2">
                  {selectedCard.pois.slice(0, 5).map(poi => (
                    <div key={poi.id} className="glass-panel p-3 flex items-center gap-3" style={{ borderRadius: '14px' }}>
                      <div className="w-8 h-8 rounded-lg bg-beige/60 flex items-center justify-center text-sm">
                        {poi.type === 'food' ? '🍽️' : poi.type === 'activity' ? '🏔️' : '📸'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-sans font-medium text-charcoal truncate">{poi.name}</p>
                        <p className="text-[11px] font-sans line-clamp-1" style={{ color: 'rgba(74,74,74,0.45)' }}>{poi.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-sans font-semibold text-charcoal tabular-nums">{poi.estimatedCost > 0 ? `₹${poi.estimatedCost}` : 'Free'}</p>
                        <div className="flex items-center gap-0.5 mt-0.5"><Star className="w-2.5 h-2.5 text-soft-gold" /><span className="text-[10px] font-sans text-charcoal-light/50">{poi.rating}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-sans font-semibold text-charcoal text-sm mb-3">Best For</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCard.tripDetails.bestFor.map(bt => (
                    <span key={bt}
                      className={`text-xs font-sans px-3 py-1.5 capitalize ${bt === tripType ? 'bg-charcoal text-warm-white font-semibold' : 'bg-beige/40 text-charcoal-light/60'}`}
                      style={{ borderRadius: '9999px' }}>
                      {bt}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={resetMapView}
                  className="btn-secondary flex-1 py-3.5 px-6 text-sm" style={{ borderRadius: '16px' }}>
                  Other Options
                </motion.button>
                <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectDestination(selectedCard)}
                  className="btn-primary flex-1 py-3.5 px-6 text-sm" style={{ borderRadius: '16px' }}>
                  Build Itinerary →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No destinations message */}
      {filteredDestinations.length === 0 && mapLoaded && currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel-heavy p-8 z-10 text-center max-w-sm"
          style={{ position: 'absolute', pointerEvents: 'auto', borderRadius: '28px' }}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-beige/60 flex items-center justify-center">
            <Search className="w-7 h-7 text-sandstone" />
          </motion.div>
          <h3 className="font-serif text-lg text-charcoal mb-2">No destinations found</h3>
          <p className="text-sm font-sans" style={{ color: 'rgba(74,74,74,0.4)' }}>
            Try increasing your budget or adjusting filters
          </p>
        </motion.div>
      )}
    </div>
  )
}
