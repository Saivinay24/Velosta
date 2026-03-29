'use client'

import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTravelStore } from '@/lib/store'
import { generateItinerary, calculateBudgetBreakdown } from '@/lib/itinerary-engine'
import { exportToPDF, shareItinerary } from '@/lib/export'
import type { Activity, DayPlan, BudgetBreakdown } from '@/lib/types'
import {
  ArrowLeft, Download, Share2, ChevronDown, ChevronUp,
  GripVertical, Clock, MapPin, Star, CheckCircle, Sparkles,
  RotateCcw, MessageCircle, Send, X, Globe, Map,
} from 'lucide-react'
import mapboxgl from 'mapbox-gl'

const typeIcons: Record<string, string> = {
  transport: '🚌', accommodation: '🏨', food: '🍽️', sight: '📸', activity: '🏔️',
}
const typeColors: Record<string, string> = {
  transport: '#7C9ACC', accommodation: '#C9A96E', food: '#C4734F', sight: '#7FB069', activity: '#D4A574',
}
const spring = { type: 'spring' as const, stiffness: 300, damping: 30 }

function SortableActivity({ node, isLastItem }: { node: Activity; isLastItem: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: node.nodeId })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 10 : 1 }

  return (
    <div ref={setNodeRef} style={style} className="flex items-stretch gap-3 group">
      <div className="flex flex-col items-center py-1 flex-shrink-0 w-6">
        <div className="w-3 h-3 rounded-full flex-shrink-0 border-2 border-warm-white transition-all duration-200 group-hover:scale-125"
          style={{ backgroundColor: typeColors[node.type] || 'var(--sandstone)', boxShadow: `0 0 8px ${typeColors[node.type] || 'var(--sandstone)'}40` }} />
        {!isLastItem && <div className="flex-1 w-[1.5px] mt-1" style={{ background: 'linear-gradient(to bottom, var(--sandstone), transparent)' }} />}
      </div>
      <motion.div layout className="glass-panel flex-1 p-4 mb-2 transition-all duration-200 group-hover:shadow-glass-hover"
        style={{ borderRadius: '16px', borderLeft: `3px solid ${typeColors[node.type] || 'var(--sandstone)'}` }}>
        <div className="flex items-start gap-3">
          <div {...attributes} {...listeners} className="flex-shrink-0 mt-0.5 cursor-grab active:cursor-grabbing opacity-30 hover:opacity-70 transition-opacity">
            <GripVertical className="w-4 h-4 text-charcoal-light" />
          </div>
          <span className="text-xl flex-shrink-0">{typeIcons[node.type] || '📍'}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-sans font-semibold tabular-nums" style={{ color: 'var(--soft-gold)' }}>{node.time}</p>
                <h4 className="font-serif text-[15px] text-charcoal mt-0.5 leading-snug" style={{ letterSpacing: '-0.01em' }}>{node.title}</h4>
              </div>
              <span className="text-sm font-sans font-semibold tabular-nums flex-shrink-0 text-charcoal" style={{ letterSpacing: '-0.01em' }}>₹{node.cost.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs font-sans mt-1 line-clamp-2" style={{ color: 'rgba(74,74,74,0.5)', lineHeight: 1.5 }}>{node.description}</p>
            <div className="flex items-center gap-3 mt-2.5 flex-wrap">
              <span className="flex items-center gap-1 text-[11px] font-sans" style={{ color: 'rgba(74,74,74,0.4)' }}>
                <Clock className="w-3 h-3" /> {Math.floor(node.duration / 60)}h{node.duration % 60 > 0 ? ` ${node.duration % 60}m` : ''}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-sans" style={{ color: 'rgba(74,74,74,0.4)' }}>
                <Star className="w-3 h-3 text-gold" /> {Math.round(node.confidence * 100)}%
              </span>
              {node.location && (
                <span className="flex items-center gap-1 text-[11px] font-sans" style={{ color: 'rgba(74,74,74,0.4)' }}>
                  <MapPin className="w-3 h-3" /> Mapped
                </span>
              )}
            </div>
            {node.tips && node.tips.length > 0 && (
              <div className="mt-2.5 space-y-0.5">
                {node.tips.map((tip, i) => (
                  <p key={i} className="text-[11px] font-sans" style={{ color: 'var(--terracotta)', opacity: 0.7 }}>💡 {tip}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function DragOverlayActivity({ node }: { node: Activity }) {
  return (
    <div className="glass-panel-heavy p-4" style={{ borderRadius: '16px', minWidth: '200px', borderLeft: `3px solid ${typeColors[node.type]}` }}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{typeIcons[node.type] || '📍'}</span>
        <div>
          <p className="text-xs font-sans font-semibold" style={{ color: 'var(--soft-gold)' }}>{node.time}</p>
          <p className="font-serif text-sm text-charcoal">{node.title}</p>
        </div>
      </div>
    </div>
  )
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export default function ItineraryBuilder() {
  const {
    selectedDestination, budgetValue, tripDays, tripType,
    selectedCategories, goToPreviousStep, mapRef, currentStep,
    mapStyle, toggleMapStyle,
  } = useTravelStore()

  const [days, setDays] = useState<DayPlan[]>([])
  const [activeDay, setActiveDay] = useState(1)
  const [showBudget, setShowBudget] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [shareMsg, setShareMsg] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const routeLayersRef = useRef<string[]>([])
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const chatScrollRef = useRef<HTMLDivElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  // ── Generate itinerary ──
  useEffect(() => {
    if (!selectedDestination) return
    setIsLoading(true)
    const timer = setTimeout(() => {
      const itinerary = generateItinerary(selectedDestination, {
        budget: budgetValue, days: tripDays, tripType, categories: selectedCategories,
      })
      setDays(itinerary)
      setActiveDay(1)
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [selectedDestination, budgetValue, tripDays, tripType, selectedCategories])

  // ── Fetch real road directions from Mapbox Directions API ──
  async function fetchDirections(coords: [number, number][]): Promise<[number, number][]> {
    if (coords.length < 2) return coords
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) return coords

    // Mapbox Directions API accepts max 25 waypoints
    const waypoints = coords.slice(0, 25).map(c => `${c[0]},${c[1]}`).join(';')
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${waypoints}?geometries=geojson&overview=full&access_token=${token}`

    try {
      const res = await fetch(url)
      const data = await res.json()
      if (data.routes?.[0]?.geometry?.coordinates) {
        return data.routes[0].geometry.coordinates as [number, number][]
      }
    } catch (err) {
      console.warn('Directions API failed, using straight lines:', err)
    }
    return coords // fallback to straight lines
  }

  // ── Map route + markers for ACTIVE day only ──
  useEffect(() => {
    if (!mapRef || !selectedDestination || currentStep !== 3 || days.length === 0) return

    // Robust cleanup: remove ALL possible route layers/sources
    const cleanupIds: string[] = []
    for (let d = 1; d <= 15; d++) {
      cleanupIds.push(`route-border-${d}`, `route-line-${d}`, `route-day-${d}`)
    }
    routeLayersRef.current.forEach(id => { if (!cleanupIds.includes(id)) cleanupIds.push(id) })

    cleanupIds.forEach(id => {
      try { if (mapRef.getLayer(id)) mapRef.removeLayer(id) } catch {}
    })
    cleanupIds.forEach(id => {
      try { if (mapRef.getSource(id)) mapRef.removeSource(id) } catch {}
    })
    routeLayersRef.current = []
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    // Only draw the active day's route
    const activeDayData = days.find(d => d.day === activeDay)
    if (!activeDayData) return

    const rawCoords = activeDayData.nodes
      .filter(n => n.location)
      .map(n => [n.location!.lng, n.location!.lat] as [number, number])

    // Add icon pins with hover preview cards for active day
    activeDayData.nodes.forEach((node, idx) => {
      if (!node.location) return
      const color = typeColors[node.type] || '#4285F4'
      const icon = typeIcons[node.type] || '📍'
      const imgUrl = node.imageUrl || `https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80`

      // Outer el: Mapbox controls this transform for positioning
      const el = document.createElement('div')
      el.style.cssText = 'cursor:pointer;pointer-events:auto;position:relative;'

      // Inner pin container
      const pinEl = document.createElement('div')
      pinEl.style.cssText = `
        display:flex;flex-direction:column;align-items:center;
        transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        filter:drop-shadow(0 3px 6px rgba(0,0,0,0.3));
      `

      // Icon circle
      const iconCircle = document.createElement('div')
      iconCircle.style.cssText = `
        width:38px;height:38px;border-radius:50%;
        background:white;border:3px solid ${color};
        display:flex;align-items:center;justify-content:center;
        font-size:18px;position:relative;
        transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
      `
      iconCircle.textContent = icon

      // Number badge
      const badge = document.createElement('div')
      badge.style.cssText = `
        position:absolute;top:-5px;right:-5px;
        width:18px;height:18px;border-radius:50%;
        background:${color};color:white;
        display:flex;align-items:center;justify-content:center;
        font-size:9px;font-weight:800;font-family:'Inter',sans-serif;
        border:2px solid white;z-index:2;
      `
      badge.textContent = String(idx + 1)
      iconCircle.appendChild(badge)

      // Pin pointer
      const pointer = document.createElement('div')
      pointer.style.cssText = `
        width:0;height:0;margin-top:-1px;
        border-left:6px solid transparent;
        border-right:6px solid transparent;
        border-top:8px solid ${color};
      `

      // ── HOVER PREVIEW CARD ──
      const preview = document.createElement('div')
      preview.style.cssText = `
        position:absolute;bottom:calc(100% + 12px);left:50%;
        transform:translateX(-50%) scale(0.9);transform-origin:bottom center;
        width:220px;background:white;border-radius:14px;
        box-shadow:0 8px 30px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1);
        opacity:0;transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1);
        pointer-events:none;overflow:hidden;z-index:100;
      `

      // Preview image
      const previewImg = document.createElement('img')
      previewImg.src = imgUrl
      previewImg.alt = node.title
      previewImg.style.cssText = 'width:100%;height:100px;object-fit:cover;'
      previewImg.onerror = () => {
        previewImg.style.background = `linear-gradient(135deg, ${color}40, ${color}20)`
        previewImg.style.height = '60px'
      }

      // Preview body
      const previewBody = document.createElement('div')
      previewBody.style.cssText = 'padding:10px 12px;'
      previewBody.innerHTML = `
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
          <span style="font-size:14px;">${icon}</span>
          <span style="font-size:12px;font-weight:700;font-family:'Inter',sans-serif;color:#2a2a2a;
            overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:160px;">
            ${node.title}
          </span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:2px;">
          <span style="font-size:10px;font-family:'Inter',sans-serif;color:#999;">${node.time} · ${node.duration}min</span>
          <span style="font-size:11px;font-weight:600;font-family:'Inter',sans-serif;color:${color};">₹${node.cost.toLocaleString('en-IN')}</span>
        </div>
        ${node.description ? `<p style="font-size:10px;font-family:'Inter',sans-serif;color:#777;margin-top:4px;
          line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
          ${node.description}</p>` : ''}
      `
      // Small arrow pointing down from preview
      const previewArrow = document.createElement('div')
      previewArrow.style.cssText = `
        position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);
        width:0;height:0;
        border-left:7px solid transparent;
        border-right:7px solid transparent;
        border-top:7px solid white;
      `

      preview.appendChild(previewImg)
      preview.appendChild(previewBody)
      preview.appendChild(previewArrow)

      pinEl.appendChild(iconCircle)
      pinEl.appendChild(pointer)
      el.appendChild(pinEl)
      el.appendChild(preview)

      el.addEventListener('mouseenter', () => {
        iconCircle.style.width = '44px'
        iconCircle.style.height = '44px'
        iconCircle.style.fontSize = '20px'
        iconCircle.style.borderWidth = '4px'
        pinEl.style.filter = 'drop-shadow(0 6px 12px rgba(0,0,0,0.35))'
        preview.style.opacity = '1'
        preview.style.transform = 'translateX(-50%) scale(1)'
      })
      el.addEventListener('mouseleave', () => {
        iconCircle.style.width = '38px'
        iconCircle.style.height = '38px'
        iconCircle.style.fontSize = '18px'
        iconCircle.style.borderWidth = '3px'
        pinEl.style.filter = 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))'
        preview.style.opacity = '0'
        preview.style.transform = 'translateX(-50%) scale(0.9)'
      })

      const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([node.location!.lng, node.location!.lat])
        .addTo(mapRef)
      markersRef.current.push(marker)
    })

    if (rawCoords.length < 2) {
      // Single point — just fit to it
      if (rawCoords.length === 1) {
        mapRef.flyTo({ center: rawCoords[0], zoom: 14, duration: 1000 })
      }
      return
    }

    // Fetch real road directions and draw route
    const drawRoute = async () => {
      const routeCoords = await fetchDirections(rawCoords)
      
      // Check if map/component is still valid
      if (!mapRef || currentStep !== 3) return

      const sourceId = `route-day-${activeDay}`

      // Clean again in case another render happened
      try { if (mapRef.getLayer(`route-border-${activeDay}`)) mapRef.removeLayer(`route-border-${activeDay}`) } catch {}
      try { if (mapRef.getLayer(`route-line-${activeDay}`)) mapRef.removeLayer(`route-line-${activeDay}`) } catch {}
      try { if (mapRef.getSource(sourceId)) mapRef.removeSource(sourceId) } catch {}

      mapRef.addSource(sourceId, {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: routeCoords } },
      })

      // White border effect (like Google Maps road outline)
      const borderId = `route-border-${activeDay}`
      mapRef.addLayer({
        id: borderId, type: 'line', source: sourceId,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#ffffff', 'line-width': 8, 'line-opacity': 0.9 },
      })

      // Main blue route line
      const lineId = `route-line-${activeDay}`
      mapRef.addLayer({
        id: lineId, type: 'line', source: sourceId,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#4285F4', 'line-width': 5, 'line-opacity': 0.9 },
      })

      routeLayersRef.current.push(borderId, lineId, sourceId)
    }

    drawRoute()

    // Fit bounds to show all activity coords
    if (rawCoords.length >= 2) {
      const bounds = new mapboxgl.LngLatBounds()
      rawCoords.forEach(c => bounds.extend(c))
      mapRef.fitBounds(bounds, { padding: { top: 80, bottom: 80, left: 580, right: 80 }, duration: 1500, maxZoom: 14 })
    }
  }, [activeDay, days, mapRef, currentStep, selectedDestination])

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => {
      if (mapRef) {
        routeLayersRef.current.forEach(id => {
          try { mapRef.removeLayer(id) } catch {}
          try { mapRef.removeSource(id) } catch {}
        })
        markersRef.current.forEach(m => m.remove())
      }
    }
  }, [mapRef])

  // ── Budget breakdown ──
  const breakdown: BudgetBreakdown = useMemo(
    () => (days.length > 0 ? calculateBudgetBreakdown(days) : { accommodation: 0, food: 0, activities: 0, transport: 0, buffer: 0 }),
    [days]
  )
  const totalCost = useMemo(() => days.reduce((sum, day) => sum + day.nodes.reduce((s, n) => s + n.cost, 0), 0), [days])
  const budgetPercent = budgetValue > 0 ? Math.min(100, Math.round((totalCost / budgetValue) * 100)) : 0

  // ── Drag & drop ──
  function handleDragStart(event: any) { setActiveId(event.active.id) }
  function handleDragEnd(event: any) {
    setActiveId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return
    setDays(prev => prev.map(day => {
      if (day.day !== activeDay) return day
      const oldIdx = day.nodes.findIndex(n => n.nodeId === active.id)
      const newIdx = day.nodes.findIndex(n => n.nodeId === over.id)
      if (oldIdx === -1 || newIdx === -1) return day
      return { ...day, nodes: arrayMove(day.nodes, oldIdx, newIdx) }
    }))
  }

  useEffect(() => { scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }) }, [activeDay])

  const handleExportPDF = useCallback(() => {
    if (!selectedDestination) return
    exportToPDF(selectedDestination, days, budgetValue, breakdown)
  }, [selectedDestination, days, budgetValue, breakdown])

  const handleShare = useCallback(() => {
    if (!selectedDestination) return
    shareItinerary(selectedDestination, days, budgetValue)
    setShareMsg(true)
    setTimeout(() => setShareMsg(false), 2500)
  }, [selectedDestination, days, budgetValue])

  const handleRegenerate = useCallback(() => {
    if (!selectedDestination) return
    setIsLoading(true)
    setTimeout(() => {
      const itinerary = generateItinerary(selectedDestination, {
        budget: budgetValue, days: tripDays, tripType, categories: selectedCategories,
      })
      setDays(itinerary)
      setActiveDay(1)
      setIsLoading(false)
    }, 600)
  }, [selectedDestination, budgetValue, tripDays, tripType, selectedCategories])

  // ── AI Chat ──
  const handleSendChat = useCallback(async () => {
    if (!chatInput.trim() || chatLoading) return
    const userMsg = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setChatLoading(true)

    try {
      const res = await fetch('/api/itinerary/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          tripContext: {
            destination: selectedDestination?.name,
            days: tripDays,
            budget: budgetValue,
            tripType,
            itinerary: days.map(d => ({ day: d.day, theme: d.theme, activities: d.nodes.map(n => n.title) })),
          },
        }),
      })
      const data = await res.json()
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'No response.' }])
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Failed to get response. Try again.' }])
    }
    setChatLoading(false)
    setTimeout(() => chatScrollRef.current?.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' }), 100)
  }, [chatInput, chatLoading, selectedDestination, tripDays, budgetValue, tripType, days])

  if (!selectedDestination) return null

  const currentDayData = days.find(d => d.day === activeDay)
  const activeNode = activeId ? days.flatMap(d => d.nodes).find(n => n.nodeId === activeId) || null : null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-10 flex" style={{ pointerEvents: 'none' }}>
      {/* ═══ Left Panel — Itinerary Builder ═══ */}
      <motion.div
        initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full lg:w-[520px] xl:w-[560px] flex flex-col glass-panel-heavy"
        style={{ pointerEvents: 'auto', borderRight: '1px solid var(--glass-border)' }}
      >
        {/* Header */}
        <div className="px-5 py-3.5 flex items-center justify-between flex-shrink-0" style={{ borderBottom: '1px solid var(--glass-border)' }}>
          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={goToPreviousStep} className="btn-icon">
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h2 className="font-serif text-lg text-charcoal" style={{ letterSpacing: '-0.02em' }}>{selectedDestination.name}</h2>
              <p className="text-xs font-sans" style={{ color: 'rgba(74,74,74,0.45)' }}>{selectedDestination.state} · {tripDays} days · {tripType}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={toggleMapStyle}
              className="btn-icon" title={mapStyle === 'light' ? 'Satellite View' : 'Default View'}>
              {mapStyle === 'light' ? <Globe className="w-4 h-4" /> : <Map className="w-4 h-4" />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={handleRegenerate} className="btn-icon" title="Regenerate">
              <RotateCcw className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={handleShare} className="btn-icon" title="Share">
              <Share2 className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }} onClick={handleExportPDF} className="btn-primary px-4 py-2.5 text-xs !rounded-apple">
              <Download className="w-3.5 h-3.5" /><span className="hidden sm:inline">Export</span>
            </motion.button>
          </div>
        </div>

        {/* Share toast */}
        <AnimatePresence>
          {shareMsg && (
            <motion.div initial={{ y: -20, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -20, opacity: 0, scale: 0.95 }} transition={spring}
              className="absolute top-20 left-1/2 -translate-x-1/2 glass-panel-heavy px-5 py-3 z-30 flex items-center gap-2" style={{ borderRadius: '16px' }}>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-sans font-medium text-charcoal">Copied to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Day Tabs */}
        <div className="px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-hide flex-shrink-0" style={{ borderBottom: '1px solid var(--glass-border)' }}>
          {days.map((day) => {
            const dayCost = day.nodes.reduce((s, n) => s + n.cost, 0)
            return (
              <motion.button key={day.day} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveDay(day.day)}
                className={`relative flex-shrink-0 flex flex-col items-center px-5 py-2.5 text-sm font-sans transition-all duration-300 ${activeDay === day.day ? 'text-charcoal font-semibold' : 'text-charcoal-light/60 hover:text-charcoal'}`}
                style={{ borderRadius: '14px' }}>
                {activeDay === day.day && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-beige/70" style={{ borderRadius: '14px' }} transition={spring} />
                )}
                <span className="relative z-10 text-xs font-semibold">Day {day.day}</span>
                <span className="relative z-10 text-[10px] mt-0.5 tabular-nums" style={{ opacity: 0.5 }}>₹{dayCost.toLocaleString('en-IN')}</span>
                <span className="relative z-10 text-[9px] font-bold mt-0.5 rounded-full px-1.5"
                  style={{ backgroundColor: activeDay === day.day ? 'var(--terracotta)' : 'rgba(216,199,179,0.3)', color: activeDay === day.day ? 'var(--warm-white)' : 'var(--charcoal-light)' }}>
                  {day.nodes.length}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Activity List — scrollable */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5" style={{ minHeight: 0 }}>
          {isLoading ? (
            <div className="space-y-4 py-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton h-28 w-full" style={{ borderRadius: '16px', animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          ) : currentDayData ? (
            <div>
              <motion.div key={`theme-${activeDay}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="mb-5">
                <h3 className="font-serif text-xl text-charcoal" style={{ letterSpacing: '-0.02em' }}>{currentDayData.theme}</h3>
                <p className="text-xs font-sans mt-1" style={{ color: 'rgba(74,74,74,0.4)' }}>{currentDayData.nodes.length} activities · Drag to reorder</p>
              </motion.div>

              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <SortableContext items={currentDayData.nodes.map(n => n.nodeId)} strategy={verticalListSortingStrategy}>
                  <AnimatePresence>
                    {currentDayData.nodes.map((node, idx) => (
                      <motion.div key={node.nodeId} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                        <SortableActivity node={node} isLastItem={idx === currentDayData.nodes.length - 1} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </SortableContext>
                <DragOverlay>{activeNode ? <DragOverlayActivity node={activeNode} /> : null}</DragOverlay>
              </DndContext>

              {/* Budget section */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 glass-panel p-5" style={{ borderRadius: '20px' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-sans font-semibold text-charcoal text-xs tracking-wide uppercase">Budget</h3>
                  <motion.button whileTap={{ scale: 0.92 }} onClick={() => setShowBudget(!showBudget)} className="btn-icon !w-7 !h-7">
                    {showBudget ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </motion.button>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-xs font-sans mb-1.5">
                    <span className="text-charcoal font-semibold tabular-nums">₹{totalCost.toLocaleString('en-IN')}</span>
                    <span style={{ color: 'rgba(74,74,74,0.4)' }} className="tabular-nums">of ₹{budgetValue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--beige)' }}>
                    <motion.div initial={{ width: '0%' }} animate={{ width: `${budgetPercent}%` }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} className="h-full rounded-full"
                      style={{ background: budgetPercent > 90 ? 'linear-gradient(90deg, var(--terracotta), #e74c3c)' : budgetPercent > 70 ? 'linear-gradient(90deg, var(--soft-gold), var(--terracotta))' : 'linear-gradient(90deg, #7FB069, var(--soft-gold))' }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-sans mt-1" style={{ color: 'rgba(74,74,74,0.35)' }}>
                    <span>{budgetPercent}% used</span>
                    <span>{totalCost <= budgetValue ? `₹${(budgetValue - totalCost).toLocaleString('en-IN')} left` : `₹${(totalCost - budgetValue).toLocaleString('en-IN')} over`}</span>
                  </div>
                </div>
                <AnimatePresence>
                  {showBudget && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <div className="space-y-2 pt-3 border-t" style={{ borderColor: 'var(--glass-border)' }}>
                        {[
                          { label: '🏨 Stay', value: breakdown.accommodation, color: '#C9A96E' },
                          { label: '🍽️ Food', value: breakdown.food, color: '#C4734F' },
                          { label: '🏔️ Activities', value: breakdown.activities, color: '#D4A574' },
                          { label: '🚌 Transport', value: breakdown.transport, color: '#7C9ACC' },
                          { label: '💰 Buffer', value: breakdown.buffer, color: '#7FB069' },
                        ].map(item => (
                          <div key={item.label} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-xs font-sans" style={{ color: 'rgba(74,74,74,0.6)' }}>{item.label}</span>
                            </div>
                            <span className="text-xs font-sans font-semibold text-charcoal tabular-nums">₹{item.value.toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-beige/60 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-sandstone" />
              </motion.div>
              <h3 className="font-serif text-lg text-charcoal mb-2">No activities yet</h3>
              <p className="text-sm font-sans" style={{ color: 'rgba(74,74,74,0.4)' }}>Select a day to view the itinerary</p>
            </motion.div>
          )}
        </div>

        {/* ═══ AI Chat Box ═══ */}
        <div className="flex-shrink-0" style={{ borderTop: '1px solid var(--glass-border)' }}>
          {/* Chat toggle button */}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setShowChat(!showChat)}
            className="w-full px-5 py-3 flex items-center justify-between text-sm font-sans font-medium text-charcoal hover:bg-beige/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-terracotta" />
              <span>Ask AI to refine your trip</span>
            </div>
            {showChat ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </motion.button>

          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 280, opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden"
              >
                {/* Chat messages */}
                <div ref={chatScrollRef} className="h-[220px] overflow-y-auto px-4 py-2 space-y-2" style={{ background: 'rgba(246,243,238,0.4)' }}>
                  {chatMessages.length === 0 && (
                    <div className="text-center py-6">
                      <Sparkles className="w-6 h-6 text-sandstone mx-auto mb-2" />
                      <p className="text-xs font-sans" style={{ color: 'rgba(74,74,74,0.4)' }}>
                        Ask me to add activities, swap restaurants, optimize your budget, or suggest hidden gems!
                      </p>
                    </div>
                  )}
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] px-3 py-2 text-xs font-sans leading-relaxed ${msg.role === 'user'
                        ? 'bg-charcoal text-warm-white' : 'glass-panel text-charcoal'}`}
                        style={{ borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px' }}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="glass-panel px-4 py-2 text-xs font-sans" style={{ borderRadius: '14px 14px 14px 4px' }}>
                        <span className="breathe">Thinking...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat input */}
                <div className="px-4 py-2 flex items-center gap-2" style={{ borderTop: '1px solid var(--glass-border)' }}>
                  <input
                    type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                    placeholder="e.g. Add a sunset viewpoint on Day 2..."
                    className="flex-1 bg-transparent text-sm font-sans text-charcoal placeholder:text-charcoal-light/40 outline-none"
                  />
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleSendChat}
                    disabled={chatLoading || !chatInput.trim()}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: chatInput.trim() ? 'var(--terracotta)' : 'var(--beige)', color: chatInput.trim() ? 'white' : 'var(--charcoal-light)' }}>
                    <Send className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom bar — total + info */}
        {!showChat && (
          <div className="px-5 py-3 flex items-center justify-between flex-shrink-0" style={{ borderTop: '1px solid var(--glass-border)' }}>
            <div>
              <p className="text-[10px] font-sans" style={{ color: 'rgba(74,74,74,0.35)' }}>Total estimated</p>
              <p className="font-serif text-lg text-charcoal tabular-nums">₹{totalCost.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-sans" style={{ color: 'rgba(74,74,74,0.35)' }}>{selectedDestination.tripDetails.category} · {tripDays} days</p>
              <p className="text-xs font-sans font-medium capitalize" style={{ color: 'var(--charcoal-light)' }}>{tripType} trip</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Right side — intentionally empty so map shows through */}
    </motion.div>
  )
}
