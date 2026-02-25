'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import mapboxgl from 'mapbox-gl'
import { useTravelStore } from '@/lib/store'
import type { Activity, DayPlan } from '@/lib/types'
import { generateItinerary, calculateBudgetBreakdown } from '@/lib/itinerary-engine'
import { exportToPDF, shareItinerary } from '@/lib/export'
import {
  ArrowLeft,
  Loader2,
  MapPin,
  Bus,
  Home,
  UtensilsCrossed,
  Camera,
  GripVertical,
  Plus,
  Trash2,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  BarChart3,
  X,
  Check,
} from 'lucide-react'

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  transport: Bus,
  accommodation: Home,
  food: UtensilsCrossed,
  sight: Camera,
  activity: MapPin,
}

const typeColors: Record<string, string> = {
  transport: '#6366f1',
  accommodation: '#C4734F',
  food: '#22c55e',
  sight: '#C9A96E',
  activity: '#3b82f6',
}

// ──── Sortable Activity Card ────
function SortableActivity({
  activity,
  onDelete,
}: {
  activity: Activity
  onDelete: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.nodeId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const Icon = activityIcons[activity.type] || MapPin
  const borderColor = typeColors[activity.type] || '#C9A96E'

  return (
    <div
      ref={setNodeRef}
      className={`bg-warm-white rounded-xl p-3.5 transition-all duration-300 border-l-[3px] ${isDragging ? 'shadow-lg ring-1 ring-gold/30' : 'shadow-sm hover:shadow-md'
        }`}
      style={{ ...style, borderLeftColor: borderColor } as React.CSSProperties}
    >
      <div className="flex items-start gap-2.5">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-sandstone/30 hover:text-gold transition-colors mt-1 flex-shrink-0"
        >
          <GripVertical className="w-4 h-4" />
        </div>

        <div
          className="p-2 rounded-lg flex-shrink-0"
          style={{ backgroundColor: `${borderColor}15` }}
        >
          <Icon className="w-4 h-4 text-terracotta" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <div className="min-w-0">
              <p className="text-[10px] text-charcoal-light/40 font-medium">{activity.time}</p>
              <h4 className="text-sm font-semibold text-charcoal truncate">{activity.title}</h4>
            </div>
            <div className="text-right flex-shrink-0 flex items-center gap-1">
              <p className="text-xs font-semibold text-terracotta">
                ₹{activity.cost.toLocaleString('en-IN')}
              </p>
              <button
                onClick={() => onDelete(activity.nodeId)}
                className="text-charcoal-light/20 hover:text-red-400 transition-colors p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          <p className="text-xs text-charcoal-light/50 mb-1.5 line-clamp-1">
            {activity.description}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-charcoal-light/40">
              {Math.floor(activity.duration / 60)}h{' '}
              {activity.duration % 60 > 0 ? `${activity.duration % 60}m` : ''}
            </span>
            <span className="text-[10px] bg-sandstone/10 text-charcoal-light/50 px-1.5 py-0.5 rounded-full">
              ✓ {activity.basedOnExperiences} travelers
            </span>
            <div className="flex-1 bg-sandstone/15 rounded-full h-1 max-w-[50px]">
              <div
                className="h-1 rounded-full"
                style={{
                  width: `${activity.confidence * 100}%`,
                  backgroundColor: borderColor,
                }}
              />
            </div>
          </div>

          {activity.tips && activity.tips.length > 0 && (
            <div className="mt-1.5 pt-1.5 border-t border-sandstone/10">
              <p className="text-[10px] text-charcoal-light/40">
                💡 {activity.tips[0]}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ──── Budget Breakdown Mini Chart ────
function BudgetBreakdownChart({
  breakdown,
  total,
  budget,
}: {
  breakdown: ReturnType<typeof calculateBudgetBreakdown>
  total: number
  budget: number
}) {
  const items = [
    { label: 'Stay', value: breakdown.accommodation, color: '#C4734F' },
    { label: 'Food', value: breakdown.food, color: '#22c55e' },
    { label: 'Activities', value: breakdown.activities, color: '#3b82f6' },
    { label: 'Transport', value: breakdown.transport, color: '#6366f1' },
    { label: 'Buffer', value: breakdown.buffer, color: '#C9A96E' },
  ]

  return (
    <div className="space-y-2">
      <div className="flex h-3 rounded-full overflow-hidden bg-sandstone/15">
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              width: `${total > 0 ? (item.value / total) * 100 : 0}%`,
              backgroundColor: item.color,
            }}
            className="transition-all duration-500"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {items.filter((i) => i.value > 0).map((item) => (
          <div key={item.label} className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[9px] text-charcoal-light/50 truncate">{item.label}</span>
            <span className="text-[9px] font-medium text-charcoal-light/70 ml-auto">
              ₹{item.value.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ──── Main Component ────
export default function ItineraryBuilder() {
  const {
    selectedDestination,
    budgetValue,
    tripDays,
    tripType,
    selectedCategories,
    itinerary,
    setItinerary,
    days,
    setDays,
    activeDay,
    setActiveDay,
    goToPreviousStep,
    mapRef,
    mapLoaded,
    currentStep,
  } = useTravelStore()

  const [isGenerating, setIsGenerating] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [shareMsg, setShareMsg] = useState('')
  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  const [hasGenerated, setHasGenerated] = useState(false)

  const routeMarkers = useRef<mapboxgl.Marker[]>([])
  const routeLayersRef = useRef<string[]>([])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // ──── Generate itinerary when entering step 3 ────
  useEffect(() => {
    if (currentStep !== 3 || !selectedDestination || hasGenerated) return

    setIsGenerating(true)

    const prefs = {
      budget: budgetValue,
      days: tripDays,
      tripType,
      categories: selectedCategories,
    }

    const generateWithAI = async () => {
      try {
        const response = await fetch('/api/itinerary/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destination_id: selectedDestination.id,
            budget: budgetValue,
            duration_days: tripDays,
            trip_type: tripType,
            user_preferences: selectedCategories,
          }),
        })

        const data = await response.json()

        if (data.days && Array.isArray(data.days) && data.days.length > 0 && !data.useLocalEngine) {
          const aiDays: DayPlan[] = data.days.map((day: any, dIdx: number) => ({
            day: day.day || dIdx + 1,
            theme: day.theme || `Day ${dIdx + 1}`,
            nodes: (day.nodes || []).map((node: any, nIdx: number) => ({
              ...node,
              nodeId: node.nodeId || `ai_d${dIdx + 1}_n${nIdx}`,
              location: node.location || selectedDestination.location,
              confidence: node.confidence || 0.85,
              basedOnExperiences: node.basedOnExperiences || 10,
              tips: node.tips || [],
            })),
          }))
          return aiDays
        }
      } catch (err) {
        console.warn('AI itinerary generation failed, using local engine:', err)
      }
      return null
    }

    generateWithAI().then((aiDays) => {
      const generated = aiDays || generateItinerary(selectedDestination, prefs)
      setDays(generated)
      setActiveDay(1)
      setIsGenerating(false)
      setHasGenerated(true)
    })
  }, [currentStep, selectedDestination])

  // Reset hasGenerated when destination changes
  useEffect(() => {
    setHasGenerated(false)
  }, [selectedDestination])

  // ──── Update markers & routes on the shared map ────
  useEffect(() => {
    if (!mapRef || !mapLoaded || currentStep !== 3 || days.length === 0 || isGenerating) return

    // Remove old markers
    routeMarkers.current.forEach((m) => m.remove())
    routeMarkers.current = []

    // Remove old route layers/sources
    routeLayersRef.current.forEach((id) => {
      try { if (mapRef.getLayer(id)) mapRef.removeLayer(id) } catch { }
      try { if (mapRef.getSource(id)) mapRef.removeSource(id) } catch { }
    })
    routeLayersRef.current = []

    const dayColors = ['#C9A96E', '#D4B57E', '#BF9D5E', '#C4734F', '#3b82f6']

    days.forEach((dayPlan, dayIndex) => {
      const dayCoords: [number, number][] = []

      dayPlan.nodes.forEach((node, nodeIndex) => {
        const lng = node.location?.lng || selectedDestination!.location.lng
        const lat = node.location?.lat || selectedDestination!.location.lat
        dayCoords.push([lng, lat])

        const isActive = dayPlan.day === activeDay
        const size = isActive ? 34 : 26

        const el = document.createElement('div')
        el.style.cssText = `
          width:${size + 12}px;height:${size + 12}px;
          cursor:pointer;
          display:flex;align-items:center;justify-content:center;
        `

        const inner = document.createElement('div')
        inner.style.cssText = `
          width:${size}px;height:${size}px;border-radius:50%;
          background:${isActive ? 'linear-gradient(135deg, #C4734F, #C9A96E)' : 'linear-gradient(135deg, #D8C7B3, #C9A96E)'};
          border:${isActive ? '3' : '2'}px solid #FDFCFA;
          box-shadow:0 ${isActive ? 4 : 2}px ${isActive ? 16 : 8}px rgba(201,169,110,${isActive ? 0.6 : 0.3});
          opacity:${isActive ? 1 : 0.5};
          display:flex;align-items:center;justify-content:center;flex-direction:column;
          color:#FDFCFA;font-size:${isActive ? '10px' : '9px'};font-weight:700;
          transition:transform 0.2s ease, box-shadow 0.2s ease;
          font-family:'Inter',sans-serif;
        `
        inner.innerHTML = `<div style="font-size:7px;line-height:1;">D${dayPlan.day}</div><div style="font-size:${isActive ? '11' : '9'}px;line-height:1;margin-top:1px;">${nodeIndex + 1}</div>`

        el.appendChild(inner)

        el.addEventListener('mouseenter', () => {
          inner.style.transform = 'scale(1.3)'
          inner.style.boxShadow = `0 6px 20px rgba(201,169,110,0.7)`
        })
        el.addEventListener('mouseleave', () => {
          inner.style.transform = 'scale(1)'
          inner.style.boxShadow = `0 ${isActive ? 4 : 2}px ${isActive ? 16 : 8}px rgba(201,169,110,${isActive ? 0.6 : 0.3})`
        })
        el.addEventListener('click', () => setActiveDay(dayPlan.day))

        const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([lng, lat])
          .addTo(mapRef)

        routeMarkers.current.push(marker)
      })

      // Draw route line
      const sourceId = `route-day-${dayPlan.day}`
      const layerId = `route-line-day-${dayPlan.day}`
      const color = dayColors[Math.min(dayIndex, dayColors.length - 1)]

      if (dayCoords.length >= 2 && mapRef.isStyleLoaded()) {
        try {
          mapRef.addSource(sourceId, {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: { type: 'LineString', coordinates: dayCoords },
            },
          })

          mapRef.addLayer({
            id: layerId,
            type: 'line',
            source: sourceId,
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: {
              'line-color': color,
              'line-width': dayPlan.day === activeDay ? 4 : 2,
              'line-opacity': dayPlan.day === activeDay ? 0.9 : 0.4,
              'line-dasharray': dayPlan.day === activeDay ? [1, 0] : [2, 2],
            },
          })

          routeLayersRef.current.push(layerId)
          routeLayersRef.current.push(sourceId)
        } catch (e) {
          console.warn('Route layer error:', e)
        }
      }
    })

    // Fit bounds to active day
    const activeDayPlan = days.find((d) => d.day === activeDay)
    if (activeDayPlan && activeDayPlan.nodes.length > 0) {
      const coords = activeDayPlan.nodes
        .filter((n) => n.location)
        .map((n) => [n.location.lng, n.location.lat] as [number, number])

      if (coords.length > 1) {
        const bounds = coords.reduce(
          (b, c) => b.extend(c),
          new mapboxgl.LngLatBounds(coords[0], coords[0])
        )
        mapRef.fitBounds(bounds, {
          padding: { top: 80, bottom: 80, left: 80, right: 80 },
          maxZoom: 14,
          duration: 1000,
          pitch: 50,
          bearing: -15,
        })
      } else if (coords.length === 1) {
        mapRef.flyTo({
          center: coords[0],
          zoom: 14, pitch: 50, bearing: -15, duration: 1000,
        })
      }
    }
  }, [activeDay, days, selectedDestination, mapLoaded, currentStep, isGenerating, mapRef])

  // ──── Cleanup markers when leaving step 3 ────
  useEffect(() => {
    if (currentStep !== 3 && mapRef) {
      routeMarkers.current.forEach((m) => m.remove())
      routeMarkers.current = []
      routeLayersRef.current.forEach((id) => {
        try { if (mapRef.getLayer(id)) mapRef.removeLayer(id) } catch { }
        try { if (mapRef.getSource(id)) mapRef.removeSource(id) } catch { }
      })
      routeLayersRef.current = []
    }
  }, [currentStep, mapRef])

  // ──── Drag & Drop ────
  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveDragId(null)
    if (!over || active.id === over.id) return

    let sourceDayIdx = -1
    let targetDayIdx = -1

    days.forEach((day, idx) => {
      if (day.nodes.find((n) => n.nodeId === active.id)) sourceDayIdx = idx
      if (day.nodes.find((n) => n.nodeId === over.id)) targetDayIdx = idx
    })

    if (sourceDayIdx === -1 || targetDayIdx === -1) return

    const newDays = [...days]

    if (sourceDayIdx === targetDayIdx) {
      const dayNodes = [...newDays[sourceDayIdx].nodes]
      const oldIdx = dayNodes.findIndex((n) => n.nodeId === active.id)
      const newIdx = dayNodes.findIndex((n) => n.nodeId === over.id)
      newDays[sourceDayIdx] = {
        ...newDays[sourceDayIdx],
        nodes: arrayMove(dayNodes, oldIdx, newIdx),
      }
    } else {
      const sourceNodes = [...newDays[sourceDayIdx].nodes]
      const movingIdx = sourceNodes.findIndex((n) => n.nodeId === active.id)
      const [movedNode] = sourceNodes.splice(movingIdx, 1)
      newDays[sourceDayIdx] = { ...newDays[sourceDayIdx], nodes: sourceNodes }

      const targetNodes = [...newDays[targetDayIdx].nodes]
      const insertIdx = targetNodes.findIndex((n) => n.nodeId === over.id)
      targetNodes.splice(insertIdx + 1, 0, movedNode)
      newDays[targetDayIdx] = { ...newDays[targetDayIdx], nodes: targetNodes }
    }

    setDays(newDays)

    setIsOptimizing(true)
    await new Promise((r) => setTimeout(r, 600))
    setIsOptimizing(false)
  }

  // ──── Activity management ────
  const deleteActivity = (nodeId: string) => {
    const newDays = days.map((d) => ({ ...d, nodes: d.nodes.filter((n) => n.nodeId !== nodeId) }))
    setDays(newDays)
  }

  const addDay = () => {
    setDays([...days, { day: days.length + 1, theme: 'Free Day', nodes: [] }])
  }

  const removeDay = (dayNum: number) => {
    if (days.length <= 1) return
    const newDays = days.filter((d) => d.day !== dayNum).map((d, idx) => ({ ...d, day: idx + 1 }))
    setDays(newDays)
    if (activeDay > newDays.length) setActiveDay(newDays.length)
  }

  // ──── Calculations ────
  const totalCost = days.reduce((sum, d) => sum + d.nodes.reduce((s, n) => s + n.cost, 0), 0)
  const breakdown = calculateBudgetBreakdown(days)
  const budgetUsedPercent = Math.min(100, (totalCost / budgetValue) * 100)

  const handleExport = () => {
    if (!selectedDestination) return
    exportToPDF(selectedDestination, days, budgetValue, breakdown)
  }

  const handleShare = () => {
    if (!selectedDestination) return
    shareItinerary(selectedDestination, days, budgetValue)
    setShareMsg('Copied to clipboard!')
    setTimeout(() => setShareMsg(''), 2000)
  }

  // ──── Loading State ────
  if (isGenerating || (currentStep === 3 && !hasGenerated)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 rounded-full border-2 border-sandstone/30 border-t-gold" />
          </motion.div>
          <h2 className="text-2xl font-serif font-semibold text-charcoal mb-2">
            Crafting your itinerary
          </h2>
          <p className="text-sm text-charcoal-light/60 mb-1">
            for {selectedDestination?.name}
          </p>
          <p className="text-xs text-charcoal-light/40 mb-6">
            ₹{budgetValue.toLocaleString('en-IN')} · {tripDays} days
          </p>
          <div className="space-y-2">
            {[
              'Analyzing real traveler experiences',
              'Mapping points of interest',
              'Optimizing your schedule',
              'Building timeline',
            ].map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.5 }}
                className="flex items-center gap-2 text-xs text-charcoal-light/50 justify-center"
              >
                <Loader2 className="w-3 h-3 animate-spin text-gold" />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (days.length === 0 && currentStep === 3) {
    return null
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="glass-panel border-b border-sandstone/20 sticky top-0 z-20">
        <div className="px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={goToPreviousStep}
              className="flex items-center gap-2 text-charcoal hover:text-terracotta transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium text-sm hidden sm:inline">Map</span>
            </button>

            <div className="text-center">
              <h2 className="text-lg font-serif font-semibold text-charcoal">
                {selectedDestination?.name}
              </h2>
              <p className="text-xs text-charcoal-light/50">
                {days.length} days · Drag to customize
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg text-charcoal-light hover:bg-beige/60 transition-all relative"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
                {shareMsg && (
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gold whitespace-nowrap"
                  >
                    {shareMsg}
                  </motion.span>
                )}
              </button>
              <button
                onClick={handleExport}
                className="p-2 rounded-lg text-charcoal-light hover:bg-beige/60 transition-all"
                title="Export PDF"
              >
                <Download className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5 ml-2">
                <div className="w-2 h-2 rounded-full bg-sandstone/50" />
                <div className="w-2 h-2 rounded-full bg-sandstone/50" />
                <div className="w-2 h-2 rounded-full bg-terracotta" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content — Left panel only, map is the persistent background */}
      <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
        {/* Left Panel — Itinerary */}
        <div className="md:w-[38%] w-full border-r border-sandstone/15 flex flex-col overflow-hidden md:max-h-none max-h-[50vh] glass-panel">
          {/* Day Tabs */}
          <div className="sticky top-0 z-10 glass-panel border-b border-sandstone/15 px-3 py-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
              {days.map((dayPlan) => (
                <button
                  key={dayPlan.day}
                  onClick={() => setActiveDay(dayPlan.day)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300 relative ${activeDay === dayPlan.day
                      ? 'bg-charcoal text-warm-white shadow-sm'
                      : 'text-charcoal-light/60 hover:bg-beige/60'
                    }`}
                >
                  Day {dayPlan.day}
                  {dayPlan.nodes.length > 0 && (
                    <span className="ml-1 text-[9px] opacity-60">
                      ({dayPlan.nodes.length})
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={addDay}
                className="p-1.5 rounded-lg text-sandstone hover:text-terracotta hover:bg-beige/60 transition-all"
                title="Add day"
              >
                <Plus className="w-4 h-4" />
              </button>
              {days.length > 1 && (
                <button
                  onClick={() => removeDay(activeDay)}
                  className="p-1.5 rounded-lg text-sandstone/50 hover:text-red-400 hover:bg-red-50/50 transition-all"
                  title="Remove current day"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Active Day Activities */}
          <div className="flex-1 overflow-y-auto p-3">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              {days
                .filter((d) => d.day === activeDay)
                .map((dayPlan) => (
                  <div key={dayPlan.day}>
                    <div className="mb-3">
                      <h3 className="text-base font-serif font-semibold text-charcoal">
                        {dayPlan.theme}
                      </h3>
                      <div className="w-8 h-[1.5px] bg-gold mt-1.5" />
                    </div>

                    <SortableContext
                      items={dayPlan.nodes.map((n) => n.nodeId)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-2">
                        {dayPlan.nodes.map((activity, idx) => (
                          <div key={activity.nodeId}>
                            <SortableActivity
                              activity={activity}
                              onDelete={deleteActivity}
                            />
                            {idx < dayPlan.nodes.length - 1 && (
                              <div className="flex justify-center py-0.5">
                                <div className="w-[1px] h-3 bg-sandstone/25" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </SortableContext>

                    {dayPlan.nodes.length === 0 && (
                      <div className="text-center py-10 text-charcoal-light/40">
                        <MapPin className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No activities yet</p>
                        <p className="text-xs">Drag activities here or add a new day</p>
                      </div>
                    )}
                  </div>
                ))}
            </DndContext>
          </div>

          {/* Bottom Summary */}
          <div className="sticky bottom-0 glass-panel border-t border-sandstone/15 p-3">
            <AnimatePresence>
              {isOptimizing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-gold text-xs mb-2"
                >
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Re-optimizing route...</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-charcoal-light/60">Estimated Total</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-serif font-bold text-charcoal">
                  ₹{totalCost.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="text-charcoal-light/40 hover:text-charcoal transition-colors"
                >
                  {showBreakdown ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <BarChart3 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="h-1.5 bg-sandstone/20 rounded-full overflow-hidden mb-1.5">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    budgetUsedPercent > 90
                      ? 'linear-gradient(to right, #f97316, #ef4444)'
                      : 'linear-gradient(to right, #C4734F, #C9A96E)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${budgetUsedPercent}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <p className="text-[10px] text-charcoal-light/40 mb-2">
              {budgetUsedPercent.toFixed(0)}% of ₹{budgetValue.toLocaleString('en-IN')} budget
              {budgetUsedPercent > 100 && (
                <span className="text-red-400 ml-1">⚠️ Over budget</span>
              )}
            </p>

            <AnimatePresence>
              {showBreakdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-3"
                >
                  <BudgetBreakdownChart
                    breakdown={breakdown}
                    total={totalCost}
                    budget={budgetValue}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex-1 py-2.5 rounded-xl font-medium text-sm text-warm-white transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #C4734F 0%, #C9A96E 100%)',
                  boxShadow: '0 4px 16px rgba(196, 115, 79, 0.3)',
                }}
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button
                onClick={handleShare}
                className="py-2.5 px-4 rounded-xl font-medium text-sm border border-sandstone/40 text-charcoal hover:border-terracotta/50 transition-all flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel — Map overlays only (the map itself is the persistent background) */}
        <div className="md:w-[62%] w-full relative flex-1" style={{ minHeight: '300px' }}>
          {/* Day & theme overlay */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 left-4 glass-panel rounded-xl px-4 py-2 z-10"
          >
            <p className="text-xs text-charcoal-light/60">
              Day {activeDay} · {days.find((d) => d.day === activeDay)?.theme}
            </p>
          </motion.div>

          {/* Day Quick Nav */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {days.map((d) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(d.day)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${d.day === activeDay
                    ? 'text-warm-white shadow-lg'
                    : 'glass-panel text-charcoal-light/60 hover:text-charcoal'
                  }`}
                style={
                  d.day === activeDay
                    ? {
                      background: 'linear-gradient(135deg, #C4734F, #C9A96E)',
                      boxShadow: '0 4px 16px rgba(196, 115, 79, 0.4)',
                    }
                    : {}
                }
              >
                {d.day}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
