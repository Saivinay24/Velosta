'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import mapboxgl from 'mapbox-gl'
import { useTravelStore } from '@/lib/store'
import { destinations, getDayFitColor, filterByBudget, filterByTripType } from '@/lib/data'
import type { Destination, TripCategory } from '@/lib/types'
import {
  ArrowLeft,
  Calendar,
  X,
  MapPin,
  Filter,
  Mountain,
  Landmark,
  Compass,
  Palmtree,
  Clock,
  IndianRupee,
  Star,
} from 'lucide-react'

// Set token - this will show in console if undefined
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
mapboxgl.accessToken = MAPBOX_TOKEN || ''

const categoryIcons: Record<string, React.ReactNode> = {
  nature: <Mountain className="w-3.5 h-3.5" />,
  culture: <Landmark className="w-3.5 h-3.5" />,
  adventure: <Compass className="w-3.5 h-3.5" />,
  relaxation: <Palmtree className="w-3.5 h-3.5" />,
}

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [hoveredDestination, setHoveredDestination] = useState<Destination | null>(null)
  const [selectedCard, setSelectedCard] = useState<Destination | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const hoveredRef = useRef<Destination | null>(null)
  const sourceAddedRef = useRef(false)

  const {
    budgetValue,
    tripDays,
    tripType,
    selectedCategories,
    toggleCategory,
    goToPreviousStep,
    setSelectedDestination,
    goToNextStep,
  } = useTravelStore()

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    let dests = filterByBudget(budgetValue)
    dests = filterByTripType(dests, tripType)
    if (selectedCategories.length > 0) {
      dests = dests.filter((d) => selectedCategories.includes(d.tripDetails.category as TripCategory))
    }
    return dests
  }, [budgetValue, tripType, selectedCategories])

  // Initialize map — use mercator projection for stable pin placement
  useEffect(() => {
    if (!mapContainer.current || map.current) return
    if (!MAPBOX_TOKEN) {
      setMapError('Mapbox token is missing! Add it to .env.local')
      return
    }

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [78.9629, 22.5937], // India center
        zoom: 4.2,
        projection: 'mercator' as any,
        pitch: 0,
        bearing: 0,
        trackResize: true,
      })

      map.current.on('load', () => {
        if (!map.current) return

        // Force a resize so the canvas fills its container properly
        map.current.resize()
        setMapLoaded(true)

        // Apply warm fog/atmosphere
        try {
          map.current.setFog({
            color: '#F6F3EE',
            'high-color': '#E8DFD2',
            'horizon-blend': 0.08,
            'space-color': '#F6F3EE',
            'star-intensity': 0,
          } as any)
        } catch {}
      })

      map.current.on('error', (e) => {
        setMapError(`Map error: ${e.error?.message || 'Unknown'}`)
      })

      map.current.addControl(
        new mapboxgl.NavigationControl({ showCompass: true, visualizePitch: true }),
        'bottom-right'
      )

      // Resize again after initial render to handle any layout shifts
      setTimeout(() => {
        if (map.current) map.current.resize()
      }, 200)
    } catch (error: any) {
      setMapError(`Failed to load map: ${error.message}`)
    }

    return () => {
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []
      sourceAddedRef.current = false
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // ──── Build pins using native Mapbox GeoJSON layers (not HTML markers) ────
  // This ensures pins are rendered as part of the map tiles and NEVER drift on zoom/pan.
  // We add a small invisible HTML marker per pin just for hover/click interactivity.
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // Cleanup old HTML hit-target markers
    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    const m = map.current

    // Remove old layers/sources if they exist
    try { if (m.getLayer('dest-pins-glow')) m.removeLayer('dest-pins-glow') } catch {}
    try { if (m.getLayer('dest-pins')) m.removeLayer('dest-pins') } catch {}
    try { if (m.getLayer('dest-pins-border')) m.removeLayer('dest-pins-border') } catch {}
    try { if (m.getSource('dest-pins-source')) m.removeSource('dest-pins-source') } catch {}
    sourceAddedRef.current = false

    // Build GeoJSON features for each destination
    const features = filteredDestinations.map((dest) => {
      const dayFit = getDayFitColor(dest, tripDays)
      const pinSize = dest.popularityScore > 90 ? 10 : dest.popularityScore > 85 ? 8 : 7
      return {
        type: 'Feature' as const,
        properties: {
          id: dest.id,
          color: dayFit.color,
          size: pinSize,
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [dest.location.lng, dest.location.lat],
        },
      }
    })

    // Add GeoJSON source
    m.addSource('dest-pins-source', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features,
      },
    })
    sourceAddedRef.current = true

    // Glow layer (outer soft ring)
    m.addLayer({
      id: 'dest-pins-glow',
      type: 'circle',
      source: 'dest-pins-source',
      paint: {
        'circle-radius': ['get', 'size'],
        'circle-color': ['get', 'color'],
        'circle-opacity': 0.25,
        'circle-blur': 0.8,
      },
    })

    // White border layer
    m.addLayer({
      id: 'dest-pins-border',
      type: 'circle',
      source: 'dest-pins-source',
      paint: {
        'circle-radius': ['+', ['get', 'size'], 2],
        'circle-color': '#FDFCFA',
        'circle-opacity': 1,
      },
    })

    // Main pin circle layer
    m.addLayer({
      id: 'dest-pins',
      type: 'circle',
      source: 'dest-pins-source',
      paint: {
        'circle-radius': ['get', 'size'],
        'circle-color': ['get', 'color'],
        'circle-opacity': 1,
      },
    })

    // Create invisible HTML hit-targets for hover/click
    filteredDestinations.forEach((dest) => {
      const hitTarget = document.createElement('div')
      hitTarget.style.cssText = `
        width: 32px; height: 32px;
        cursor: pointer;
        background: transparent;
        border-radius: 50%;
      `

      hitTarget.addEventListener('mouseenter', () => {
        hoveredRef.current = dest
        setHoveredDestination(dest)
        // Highlight the pin on the native layer
        if (map.current) {
          map.current.setPaintProperty('dest-pins', 'circle-radius', [
            'case',
            ['==', ['get', 'id'], dest.id],
            ['+', ['get', 'size'], 3],
            ['get', 'size'],
          ])
          map.current.setPaintProperty('dest-pins-glow', 'circle-radius', [
            'case',
            ['==', ['get', 'id'], dest.id],
            ['+', ['get', 'size'], 8],
            ['get', 'size'],
          ])
          map.current.setPaintProperty('dest-pins-glow', 'circle-opacity', [
            'case',
            ['==', ['get', 'id'], dest.id],
            0.45,
            0.25,
          ])
        }
      })

      hitTarget.addEventListener('mouseleave', () => {
        setTimeout(() => {
          if (hoveredRef.current === dest) {
            hoveredRef.current = null
            setHoveredDestination(null)
          }
        }, 50)
        // Reset pin sizes
        if (map.current) {
          map.current.setPaintProperty('dest-pins', 'circle-radius', ['get', 'size'])
          map.current.setPaintProperty('dest-pins-glow', 'circle-radius', ['get', 'size'])
          map.current.setPaintProperty('dest-pins-glow', 'circle-opacity', 0.25)
        }
      })

      hitTarget.addEventListener('click', (e) => {
        e.stopPropagation()
        setSelectedCard(dest)
        if (map.current) {
          map.current.flyTo({
            center: [dest.location.lng, dest.location.lat],
            zoom: 9,
            duration: 2000,
            curve: 1.5,
            pitch: 0,
            easing: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
          })
        }
      })

      const marker = new mapboxgl.Marker({
        element: hitTarget,
        anchor: 'center',
      })
        .setLngLat([dest.location.lng, dest.location.lat])
        .addTo(m)

      markersRef.current.push(marker)
    })
  }, [filteredDestinations, tripDays, mapLoaded])

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest)
    setTimeout(() => goToNextStep(), 600)
  }

  const resetMapView = () => {
    setSelectedCard(null)
    map.current?.flyTo({
      center: [78.9629, 22.5937],
      zoom: 4.2,
      pitch: 0,
      bearing: 0,
      duration: 1500,
    })
  }

  // Force map resize when component mounts / becomes visible
  useEffect(() => {
    if (!map.current || !mapLoaded) return
    // After Framer Motion animation completes, force resize so canvas fills container
    const timer = setTimeout(() => {
      if (map.current) map.current.resize()
    }, 900) // slightly after the 0.8s entry animation
    return () => clearTimeout(timer)
  }, [mapLoaded])

  return (
    // CRITICAL: Do NOT use `scale` in exit/animate — it breaks Mapbox's
    // internal coordinate ↔ pixel mapping, causing pins to drift on zoom.
    // Only use opacity for transitions.
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Map Container */}
      <div
        ref={mapContainer}
        className="absolute inset-0"
        style={{ backgroundColor: '#F6F3EE' }}
      />

      {/* Error Display */}
      {mapError && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl z-50 max-w-md">
          <h3 className="font-bold mb-1">Map Error</h3>
          <p className="text-sm">{mapError}</p>
        </div>
      )}

      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute top-0 left-0 right-0 glass-panel p-4 z-10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={goToPreviousStep}
            className="flex items-center gap-2 text-charcoal hover:text-terracotta transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm hidden sm:inline">Back</span>
          </button>

          <div className="text-center">
            <h2 className="text-lg font-serif font-semibold text-charcoal">
              {filteredDestinations.length} Destinations
            </h2>
            <p className="text-xs text-charcoal-light/60">
              within ₹{budgetValue.toLocaleString('en-IN')} · {tripDays} days
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                showFilters ? 'bg-charcoal text-warm-white' : 'text-charcoal-light hover:bg-beige/60'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-sandstone/50" />
              <div className="w-2 h-2 rounded-full bg-terracotta" />
              <div className="w-2 h-2 rounded-full bg-sandstone/40" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Panel (collapsible) */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[72px] left-0 right-0 glass-panel border-t border-sandstone/15 px-4 py-3 z-10"
          >
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2">
              {([
                { id: 'nature' as TripCategory, label: 'Nature', icon: <Mountain className="w-3.5 h-3.5" /> },
                { id: 'culture' as TripCategory, label: 'Culture', icon: <Landmark className="w-3.5 h-3.5" /> },
                { id: 'adventure' as TripCategory, label: 'Adventure', icon: <Compass className="w-3.5 h-3.5" /> },
                { id: 'relaxation' as TripCategory, label: 'Relaxation', icon: <Palmtree className="w-3.5 h-3.5" /> },
              ]).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    selectedCategories.includes(cat.id)
                      ? 'bg-charcoal text-warm-white'
                      : 'bg-beige/60 text-charcoal-light hover:bg-sandstone/30'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Budget & Duration Info Chips */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute top-20 left-4 glass-panel rounded-2xl px-4 py-2.5 z-10"
      >
        <p className="text-[10px] text-charcoal-light/50 mb-0.5">Budget</p>
        <p className="text-base font-serif font-semibold text-charcoal">
          ₹{budgetValue.toLocaleString('en-IN')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute top-20 right-4 glass-panel rounded-2xl px-4 py-2.5 z-10"
      >
        <p className="text-[10px] text-charcoal-light/50 mb-0.5">Duration</p>
        <p className="text-base font-serif font-semibold text-charcoal">{tripDays} Days</p>
      </motion.div>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredDestination && !selectedCard && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 glass-panel rounded-2xl p-5 z-20 min-w-[300px] max-w-[360px] pointer-events-none"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                style={{
                  backgroundColor: getDayFitColor(hoveredDestination, tripDays).color,
                  boxShadow: `0 0 8px ${getDayFitColor(hoveredDestination, tripDays).color}80`,
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-serif font-semibold text-lg text-charcoal">
                    {hoveredDestination.name}
                  </h3>
                  <span className="flex-shrink-0 flex items-center gap-0.5 text-xs px-2 py-0.5 rounded-full bg-beige/60">
                    {categoryIcons[hoveredDestination.tripDetails.category]}
                    <span className="capitalize text-charcoal-light/70">
                      {hoveredDestination.tripDetails.category}
                    </span>
                  </span>
                </div>

                <p className="text-xs text-charcoal-light/50 mb-2">{hoveredDestination.state}</p>

                <div className="flex items-center gap-3 text-sm text-charcoal-light/70 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {hoveredDestination.tripDetails.minDays}-{hoveredDestination.tripDetails.maxDays} days
                  </span>
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {hoveredDestination.tripDetails.estimatedCost.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Day Fit Indicator */}
                <div
                  className="text-xs px-2.5 py-1 rounded-lg mb-3 inline-flex items-center gap-1.5"
                  style={{
                    backgroundColor: `${getDayFitColor(hoveredDestination, tripDays).color}15`,
                    color: getDayFitColor(hoveredDestination, tripDays).color,
                  }}
                >
                  <Clock className="w-3 h-3" />
                  {tripDays} days — {getDayFitColor(hoveredDestination, tripDays).label}
                </div>

                <div className="space-y-1">
                  {hoveredDestination.tripDetails.highlights.map((h) => (
                    <div key={h} className="text-xs text-charcoal-light/60 flex items-center gap-1.5">
                      <span className="text-gold">✓</span>
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Destination Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-charcoal/30 backdrop-blur-sm flex items-center justify-center z-30 p-4"
            onClick={resetMapView}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="glass-panel rounded-3xl p-8 md:p-10 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-charcoal mb-1">
                    {selectedCard.name}
                  </h2>
                  <p className="text-sm text-charcoal-light/50">{selectedCard.state}</p>
                  <div className="flex items-center gap-3 mt-2 text-charcoal-light/70 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedCard.tripDetails.minDays}-{selectedCard.tripDetails.maxDays} days
                    </span>
                    <span className="flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {selectedCard.tripDetails.estimatedCost.toLocaleString('en-IN')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold" />
                      {selectedCard.popularityScore}%
                    </span>
                  </div>
                </div>
                <button
                  onClick={resetMapView}
                  className="text-charcoal-light/40 hover:text-charcoal transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Day Fit Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium mb-6"
                style={{
                  backgroundColor: `${getDayFitColor(selectedCard, tripDays).color}15`,
                  color: getDayFitColor(selectedCard, tripDays).color,
                }}
              >
                <Clock className="w-4 h-4" />
                {tripDays} days available — {getDayFitColor(selectedCard, tripDays).label}
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="font-medium text-charcoal text-xs mb-3 tracking-wide uppercase">
                  Highlights
                </h3>
                <div className="space-y-2">
                  {selectedCard.tripDetails.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-3 text-charcoal-light">
                      <span className="text-gold text-sm">✓</span>
                      <span className="text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top POIs Preview */}
              <div className="mb-8">
                <h3 className="font-medium text-charcoal text-xs mb-3 tracking-wide uppercase">
                  Top Places
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCard.pois.slice(0, 4).map((poi) => (
                    <div
                      key={poi.id}
                      className="bg-beige/50 px-3 py-1.5 rounded-lg text-xs text-charcoal-light"
                    >
                      <MapPin className="w-3 h-3 inline mr-1 text-gold" />
                      {poi.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Best For Tags */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {selectedCard.tripDetails.bestFor.map((bt) => (
                    <span
                      key={bt}
                      className={`text-xs px-2.5 py-1 rounded-full capitalize ${
                        bt === tripType
                          ? 'bg-gold/20 text-charcoal font-medium border border-gold/30'
                          : 'bg-beige/40 text-charcoal-light/60'
                      }`}
                    >
                      {bt}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={resetMapView}
                  className="flex-1 py-3.5 px-6 border border-sandstone/50 rounded-xl font-medium text-sm text-charcoal hover:border-terracotta/50 transition-all duration-300"
                >
                  Other Options
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectDestination(selectedCard)}
                  className="flex-1 py-3.5 px-6 rounded-xl font-medium text-sm text-warm-white transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #C4734F 0%, #C9A96E 100%)',
                    boxShadow: '0 4px 16px rgba(196, 115, 79, 0.3)',
                  }}
                >
                  Build Itinerary →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-8 left-4 glass-panel rounded-2xl p-4 z-10"
      >
        <h3 className="font-medium text-charcoal mb-2.5 text-xs tracking-wide uppercase">
          Day Compatibility
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-warm-white" />
            <span className="text-charcoal-light/70">Comfortable</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-yellow-500 border-2 border-warm-white" />
            <span className="text-charcoal-light/70">Slightly hectic</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-warm-white" />
            <span className="text-charcoal-light/70">Too tight</span>
          </div>
        </div>
      </motion.div>

      {/* No destinations message */}
      {filteredDestinations.length === 0 && mapLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel rounded-2xl p-8 z-10 text-center max-w-sm"
        >
          <p className="text-2xl mb-2">😔</p>
          <h3 className="font-serif font-semibold text-lg text-charcoal mb-2">
            No trips found
          </h3>
          <p className="text-sm text-charcoal-light/60 mb-4">
            Try adjusting your budget, days, or filters to discover more destinations.
          </p>
          <button
            onClick={goToPreviousStep}
            className="px-4 py-2 rounded-lg text-sm font-medium text-warm-white"
            style={{
              background: 'linear-gradient(135deg, #C4734F 0%, #C9A96E 100%)',
            }}
          >
            Adjust Preferences
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
