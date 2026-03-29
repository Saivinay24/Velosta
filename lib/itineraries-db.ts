import type { DayPlan, Destination } from './types'
import { bangaloreDestinations } from './bangalore-destinations'

/**
 * Pre-built itineraries database.
 * Key format: `${destinationId}_${numDays}`
 * Generated from real POI data with realistic timings.
 */

function buildItinerary(dest: Destination, numDays: number): DayPlan[] {
  const pois = dest.pois
  const activePois = pois.filter(p => p.type !== 'accommodation' && p.type !== 'food')
  const foodPois = pois.filter(p => p.type === 'food')
  const hotelPoi = pois.find(p => p.type === 'accommodation')
  const dailyBudget = dest.tripDetails.estimatedCost / numDays

  const days: DayPlan[] = []
  const themes = getThemes(numDays)
  let poiIdx = 0

  for (let d = 1; d <= numDays; d++) {
    const isFirst = d === 1, isLast = d === numDays
    const nodes: any[] = []
    let t = isFirst ? 10 : 8

    if (isFirst) {
      nodes.push({
        nodeId: `${dest.id}_d${d}_arrival`, type: 'transport', time: '06:00',
        title: `Arrive in ${dest.name}`, description: `Travel from Bangalore to ${dest.name}, ${dest.state}`,
        duration: 240, cost: Math.floor(dailyBudget * 0.25), icon: 'transport',
        confidence: 0.95, basedOnExperiences: 20,
        tips: ['Book bus/train early for best rates', 'Carry snacks for the journey'],
        location: dest.location,
      })
      nodes.push({
        nodeId: `${dest.id}_d${d}_checkin`, type: 'accommodation',
        time: fmt(t), title: hotelPoi?.name || `Check-in at Hostel/Hotel`,
        description: hotelPoi?.description || `Budget-friendly stay in ${dest.name}`,
        duration: 60, cost: Math.floor(dailyBudget * 0.3), icon: 'accommodation',
        confidence: 0.88, basedOnExperiences: 12,
        tips: hotelPoi?.tips || ['Keep ID ready', 'Check-in usually after 12pm'],
        location: hotelPoi?.location || dest.location,
      })
      t += 1.5
    }

    if (!isFirst) {
      const fp = foodPois[0]
      nodes.push({
        nodeId: `${dest.id}_d${d}_bfast`, type: 'food', time: fmt(t),
        title: fp ? fp.name : 'Local Breakfast',
        description: fp?.description || `Traditional ${dest.state} breakfast`,
        duration: 45, cost: Math.floor(dailyBudget * 0.08), icon: 'food',
        confidence: 0.85, basedOnExperiences: 15,
        tips: fp?.tips || ['Ask locals for authentic spots'],
        location: fp?.location || off(dest.location, 0.002),
      })
      t += 1
    }

    const poisPerDay = Math.max(1, Math.ceil(activePois.length / numDays))
    for (let i = 0; i < poisPerDay && poiIdx < activePois.length; i++, poiIdx++) {
      const poi = activePois[poiIdx]
      nodes.push({
        nodeId: `${dest.id}_d${d}_n${i}`, type: poi.type, time: fmt(t),
        title: poi.name, description: poi.description,
        duration: poi.estimatedDuration, cost: poi.estimatedCost, icon: poi.type,
        confidence: Math.min(0.98, poi.rating / 5), basedOnExperiences: Math.floor(poi.rating * 5),
        tips: poi.tips, location: poi.location,
        imageUrl: poi.imageUrl,
      })
      t += poi.estimatedDuration / 60 + 0.5
    }

    if (!isLast) {
      const fp2 = foodPois[1] || foodPois[0]
      nodes.push({
        nodeId: `${dest.id}_d${d}_dinner`, type: 'food', time: fmt(Math.max(t, 19)),
        title: fp2 ? fp2.name : 'Evening Dining',
        description: fp2?.description || `Local cuisine in ${dest.name}`,
        duration: 90, cost: Math.floor(dailyBudget * 0.12), icon: 'food',
        confidence: 0.82, basedOnExperiences: 10,
        tips: fp2?.tips || ['Try regional specialties'],
        location: fp2?.location || off(dest.location, 0.003),
      })
    }

    if (isLast) {
      nodes.push({
        nodeId: `${dest.id}_d${d}_depart`, type: 'transport', time: fmt(Math.max(t, 15)),
        title: `Depart from ${dest.name}`, description: 'Check out and head back to Bangalore',
        duration: 240, cost: Math.floor(dailyBudget * 0.25), icon: 'transport',
        confidence: 0.94, basedOnExperiences: 18,
        tips: ['Book return tickets early', 'Keep buffer time for delays'],
        location: dest.location,
      })
    }

    days.push({ day: d, theme: themes[d - 1] || `Day ${d}`, nodes })
  }
  return days
}

function getThemes(n: number): string[] {
  if (n === 1) return ['Day Trip Adventure']
  if (n === 2) return ['Arrival & Exploration', 'Discovery & Departure']
  if (n === 3) return ['Arrival & Local Discovery', 'Deep Exploration', 'Memories & Departure']
  const t = ['Arrival & First Impressions']
  const mid = ['Nature & Culture', 'Off the Beaten Path', 'Local Life & Flavors', 'Adventure Day', 'Hidden Gems']
  for (let i = 2; i < n; i++) t.push(mid[(i - 2) % mid.length])
  t.push('Farewell & Departure')
  return t
}

function fmt(h: number): string {
  const hr = Math.floor(h), mn = Math.round((h - hr) * 60)
  return `${hr.toString().padStart(2, '0')}:${mn.toString().padStart(2, '0')}`
}

function off(loc: { lat: number; lng: number }, o: number) {
  return { lat: loc.lat + (Math.random() - 0.5) * o, lng: loc.lng + (Math.random() - 0.5) * o }
}

// Pre-generate all itineraries
const db: Record<string, DayPlan[]> = {}

bangaloreDestinations.forEach(dest => {
  for (let d = dest.tripDetails.minDays; d <= dest.tripDetails.maxDays; d++) {
    db[`${dest.id}_${d}`] = buildItinerary(dest, d)
  }
})

export const itinerariesDB = db

/** Look up a pre-built itinerary. Returns null if not found. */
export function getPreBuiltItinerary(destId: string, numDays: number): DayPlan[] | null {
  return db[`${destId}_${numDays}`] || null
}
