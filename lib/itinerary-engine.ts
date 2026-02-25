import type { Destination, DayPlan, Activity, POI, UserPreferences } from './types'

/**
 * Generate a realistic itinerary from real POI data for a destination.
 * This uses the destination's POI coordinates and details to create
 * a day-by-day plan that makes geographic and temporal sense.
 */
export function generateItinerary(
  destination: Destination,
  preferences: UserPreferences
): DayPlan[] {
  const { days: numDays, budget, tripType } = preferences
  const pois = [...destination.pois]
  const dailyBudget = budget / numDays

  // Prioritize POIs based on trip type
  const sortedPois = prioritizePOIs(pois, tripType)

  // Group POIs into days
  const days: DayPlan[] = []
  const themes = getDayThemes(numDays)

  for (let dayNum = 1; dayNum <= numDays; dayNum++) {
    const isFirstDay = dayNum === 1
    const isLastDay = dayNum === numDays
    const dayPois = allocatePOIsForDay(sortedPois, dayNum, numDays, dailyBudget)

    const nodes: Activity[] = []
    let currentTime = isFirstDay ? 10 : 8 // First day starts later (arrival)
    let nodeIndex = 0

    // First day: Add arrival transport
    if (isFirstDay) {
      nodes.push({
        nodeId: `d${dayNum}_arrival`,
        type: 'transport',
        time: '06:00',
        title: `Arrive in ${destination.name}`,
        description: `Travel to ${destination.name}, ${destination.state}`,
        duration: 240,
        cost: Math.floor(dailyBudget * 0.3),
        icon: 'transport',
        confidence: 0.95,
        basedOnExperiences: 20,
        tips: ['Book tickets in advance', 'Carry snacks for the journey'],
        location: destination.location,
      })
    }

    // Add check-in on first day
    if (isFirstDay) {
      const hotelPoi = pois.find((p) => p.type === 'accommodation')
      nodes.push({
        nodeId: `d${dayNum}_checkin`,
        type: 'accommodation',
        time: formatTime(currentTime),
        title: hotelPoi ? hotelPoi.name : 'Check-in at Hotel',
        description: hotelPoi
          ? hotelPoi.description
          : `Comfortable stay in ${destination.name}`,
        duration: 60,
        cost: Math.floor(dailyBudget * 0.35),
        icon: 'accommodation',
        confidence: 0.88,
        basedOnExperiences: 12,
        tips: hotelPoi?.tips || ['Keep ID ready for check-in'],
        location: hotelPoi?.location || destination.location,
      })
      currentTime += 1.5
    }

    // Add morning meal
    const foodPoi = pois.find((p) => p.type === 'food')
    if (!isFirstDay) {
      nodes.push({
        nodeId: `d${dayNum}_breakfast`,
        type: 'food',
        time: formatTime(currentTime),
        title: isLastDay
          ? 'Final Breakfast'
          : dayNum === 2 && foodPoi
            ? foodPoi.name
            : 'Local Breakfast',
        description:
          dayNum === 2 && foodPoi
            ? foodPoi.description
            : `Traditional ${destination.state} breakfast`,
        duration: 60,
        cost: Math.floor(dailyBudget * 0.08),
        icon: 'food',
        confidence: 0.85,
        basedOnExperiences: 15,
        tips: foodPoi?.tips || ['Ask locals for recommendations'],
        location: foodPoi?.location || offsetLocation(destination.location, 0.002),
      })
      currentTime += 1
    }

    // Add POI activities
    dayPois.forEach((poi, idx) => {
      nodeIndex++
      const hours = poi.estimatedDuration / 60
      nodes.push({
        nodeId: `d${dayNum}_n${nodeIndex}`,
        type: poi.type,
        time: formatTime(currentTime),
        title: poi.name,
        description: poi.description,
        duration: poi.estimatedDuration,
        cost: poi.estimatedCost,
        icon: poi.type,
        confidence: Math.min(0.98, poi.rating / 5),
        basedOnExperiences: Math.floor(poi.rating * 5),
        tips: poi.tips,
        location: poi.location,
      })
      currentTime += hours + 0.5 // 30min travel buffer
    })

    // Add evening meal
    if (!isLastDay) {
      nodes.push({
        nodeId: `d${dayNum}_dinner`,
        type: 'food',
        time: formatTime(Math.max(currentTime, 19)),
        title: 'Evening Dining',
        description: `Local cuisine experience in ${destination.name}`,
        duration: 90,
        cost: Math.floor(dailyBudget * 0.12),
        icon: 'food',
        confidence: 0.82,
        basedOnExperiences: 10,
        tips: ['Try regional specialties', 'Ask your hotel for recommendations'],
        location: offsetLocation(destination.location, 0.003),
      })
    }

    // Last day: Add departure
    if (isLastDay) {
      nodes.push({
        nodeId: `d${dayNum}_departure`,
        type: 'transport',
        time: formatTime(Math.max(currentTime, 14)),
        title: `Depart from ${destination.name}`,
        description: 'Check out and head to station/airport',
        duration: 240,
        cost: Math.floor(dailyBudget * 0.3),
        icon: 'transport',
        confidence: 0.94,
        basedOnExperiences: 18,
        tips: ['Book return tickets early', 'Keep buffer time'],
        location: destination.location,
      })
    }

    days.push({
      day: dayNum,
      theme: themes[dayNum - 1] || `Day ${dayNum}`,
      nodes,
    })
  }

  return days
}

function prioritizePOIs(pois: POI[], tripType: string): POI[] {
  return [...pois].sort((a, b) => {
    let scoreA = a.rating
    let scoreB = b.rating

    // Boost activity and adventure for friends/solo
    if (tripType === 'friends' || tripType === 'solo') {
      if (a.type === 'activity') scoreA += 0.5
      if (b.type === 'activity') scoreB += 0.5
    }

    // Boost relaxation for family/couple
    if (tripType === 'family' || tripType === 'couple') {
      if (a.type === 'sight') scoreA += 0.3
      if (b.type === 'sight') scoreB += 0.3
      if (a.type === 'food') scoreA += 0.2
      if (b.type === 'food') scoreB += 0.2
    }

    return scoreB - scoreA
  })
}

function allocatePOIsForDay(
  allPois: POI[],
  dayNum: number,
  totalDays: number,
  dailyBudget: number
): POI[] {
  const activePois = allPois.filter((p) => p.type !== 'accommodation' && p.type !== 'food')
  const poisPerDay = Math.ceil(activePois.length / totalDays)
  const startIdx = (dayNum - 1) * poisPerDay
  const dayPois = activePois.slice(startIdx, startIdx + Math.min(poisPerDay, 3))

  // Budget check — if too expensive, remove last
  let totalCost = dayPois.reduce((sum, p) => sum + p.estimatedCost, 0)
  while (totalCost > dailyBudget * 0.5 && dayPois.length > 1) {
    dayPois.pop()
    totalCost = dayPois.reduce((sum, p) => sum + p.estimatedCost, 0)
  }

  return dayPois
}

function getDayThemes(numDays: number): string[] {
  if (numDays === 1) return ['Day Trip']
  if (numDays === 2) return ['Arrival & Exploration', 'Discovery & Departure']
  if (numDays === 3)
    return ['Arrival & Local Discovery', 'Deep Exploration', 'Memories & Departure']

  const themes: string[] = ['Arrival & First Impressions']
  for (let i = 2; i < numDays; i++) {
    const midThemes = [
      'Nature & Culture',
      'Off the Beaten Path',
      'Local Life & Flavors',
      'Adventure Day',
      'Heritage & History',
      'Hidden Gems',
      'Relaxation & Reflection',
    ]
    themes.push(midThemes[(i - 2) % midThemes.length])
  }
  themes.push('Farewell & Departure')
  return themes
}

function formatTime(hours: number): string {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

function offsetLocation(
  loc: { lat: number; lng: number },
  offset: number
): { lat: number; lng: number } {
  return {
    lat: loc.lat + (Math.random() - 0.5) * offset,
    lng: loc.lng + (Math.random() - 0.5) * offset,
  }
}

/**
 * Calculate budget breakdown from days
 */
export function calculateBudgetBreakdown(
  days: DayPlan[]
): { accommodation: number; food: number; activities: number; transport: number; buffer: number } {
  let accommodation = 0
  let food = 0
  let activities = 0
  let transport = 0

  days.forEach((day) => {
    day.nodes.forEach((node) => {
      switch (node.type) {
        case 'accommodation':
          accommodation += node.cost
          break
        case 'food':
          food += node.cost
          break
        case 'transport':
          transport += node.cost
          break
        case 'sight':
        case 'activity':
          activities += node.cost
          break
      }
    })
  })

  const total = accommodation + food + activities + transport
  const buffer = Math.floor(total * 0.05)

  return { accommodation, food, activities, transport, buffer }
}
