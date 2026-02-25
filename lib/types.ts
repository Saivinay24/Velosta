// Core types for the entire Velosta application

export interface Coordinates {
  lat: number
  lng: number
}

export interface BudgetTier {
  id: string
  label: string
  range: { min: number; max: number | null }
  description: string
  icon: string
  exampleDestinations: string[]
  avgDuration: string
}

export type TripType = 'solo' | 'couple' | 'family' | 'friends'
export type TripCategory = 'nature' | 'culture' | 'adventure' | 'relaxation'
export type BudgetFit = 'perfect' | 'stretch' | 'luxury'
export type DayFit = 'comfortable' | 'moderate' | 'tight'

export interface Destination {
  id: string
  name: string
  state: string
  location: Coordinates
  budgetFit: BudgetFit
  tripDetails: {
    minDays: number
    maxDays: number
    estimatedCost: number
    highlights: string[]
    category: TripCategory
    bestFor: TripType[]
  }
  imageUrl: string
  popularityScore: number
  pois: POI[]  // Points of interest with real coordinates
}

export interface POI {
  id: string
  name: string
  location: Coordinates
  type: 'transport' | 'accommodation' | 'food' | 'sight' | 'activity'
  description: string
  estimatedCost: number
  estimatedDuration: number // minutes
  rating: number
  tips: string[]
  bestTime?: string
}

export interface Activity {
  nodeId: string
  type: 'transport' | 'accommodation' | 'food' | 'sight' | 'activity'
  time: string
  title: string
  description: string
  duration: number
  cost: number
  icon: string
  confidence: number
  basedOnExperiences: number
  tips?: string[]
  location: Coordinates
}

export interface DayPlan {
  day: number
  theme: string
  nodes: Activity[]
}

export interface BudgetBreakdown {
  accommodation: number
  food: number
  activities: number
  transport: number
  buffer: number
}

export interface Itinerary {
  itineraryId: string
  destination: string
  totalCost: number
  days: DayPlan[]
  budgetBreakdown: BudgetBreakdown
  optimizationSuggestions?: string[]
}

export interface UserPreferences {
  budget: number
  days: number
  tripType: TripType
  categories: TripCategory[]
}
