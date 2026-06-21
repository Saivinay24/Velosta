import { create } from 'zustand'
import mapboxgl from 'mapbox-gl'
import type {
  Destination,
  Itinerary,
  DayPlan,
  Activity,
  TripType,
  TripCategory,
  UserPreferences,
} from './types'

interface TravelState {
  // Shared map
  mapRef: mapboxgl.Map | null
  setMapRef: (map: mapboxgl.Map | null) => void
  mapLoaded: boolean
  setMapLoaded: (loaded: boolean) => void
  mapStyle: 'light' | 'satellite'
  toggleMapStyle: () => void

  // Step 1: User preferences
  budgetValue: number
  setBudgetValue: (value: number) => void
  tripDays: number
  setTripDays: (days: number) => void
  tripType: TripType
  setTripType: (type: TripType) => void
  selectedCategories: TripCategory[]
  setSelectedCategories: (categories: TripCategory[]) => void
  toggleCategory: (category: TripCategory) => void

  // Step 2: Map
  selectedDestination: Destination | null
  setSelectedDestination: (destination: Destination | null) => void

  // Step 3: Itinerary
  itinerary: Itinerary | null
  setItinerary: (itinerary: Itinerary | null) => void
  days: DayPlan[]
  setDays: (days: DayPlan[]) => void
  activeDay: number
  setActiveDay: (day: number) => void

  // Flow control
  currentStep: 1 | 2 | 3
  setCurrentStep: (step: 1 | 2 | 3) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  isTransitioning: boolean
  setIsTransitioning: (transitioning: boolean) => void
  cloudTransitionActive: boolean
  setCloudTransitionActive: (active: boolean) => void
  reset: () => void

  // Helpers
  getUserPreferences: () => UserPreferences
}

export const useTravelStore = create<TravelState>((set, get) => ({
  // Shared map
  mapRef: null,
  setMapRef: (map) => set({ mapRef: map }),
  mapLoaded: false,
  setMapLoaded: (loaded) => set({ mapLoaded: loaded }),
  mapStyle: 'light' as 'light' | 'satellite',
  toggleMapStyle: () => {
    const state = get()
    const newStyle = state.mapStyle === 'light' ? 'satellite' : 'light'
    set({ mapStyle: newStyle })
    if (state.mapRef) {
      state.mapRef.setStyle(
        newStyle === 'satellite'
          ? 'mapbox://styles/mapbox/satellite-streets-v12'
          : 'mapbox://styles/mapbox/light-v11'
      )
    }
  },

  budgetValue: 50000,
  setBudgetValue: (value) => set({ budgetValue: value }),

  tripDays: 5,
  setTripDays: (days) => set({ tripDays: days }),

  tripType: 'friends' as TripType,
  setTripType: (type) => set({ tripType: type }),

  selectedCategories: [] as TripCategory[],
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),

  selectedDestination: null,
  setSelectedDestination: (destination) => set({ selectedDestination: destination }),

  itinerary: null,
  setItinerary: (itinerary) => set({ itinerary: itinerary }),

  days: [],
  setDays: (days) => set({ days }),

  activeDay: 1,
  setActiveDay: (day) => set({ activeDay: day }),

  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
  goToNextStep: () => {
    const state = get()
    // Phase 1: Clouds roll in
    set({ isTransitioning: true, cloudTransitionActive: true })
    // Phase 2: Step changes behind clouds
    setTimeout(() => {
      set({ currentStep: Math.min(3, state.currentStep + 1) as 1 | 2 | 3 })
    }, 700)
    // Phase 3: Clouds clear, reveal new view
    setTimeout(() => {
      set({ cloudTransitionActive: false, isTransitioning: false })
    }, 1400)
  },
  goToPreviousStep: () => {
    const state = get()
    set({ isTransitioning: true, cloudTransitionActive: true })
    setTimeout(() => {
      set({ currentStep: Math.max(1, state.currentStep - 1) as 1 | 2 | 3 })
    }, 600)
    setTimeout(() => {
      set({ cloudTransitionActive: false, isTransitioning: false })
    }, 1200)
  },

  isTransitioning: false,
  setIsTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  cloudTransitionActive: false,
  setCloudTransitionActive: (active) => set({ cloudTransitionActive: active }),

  reset: () =>
    set({
      budgetValue: 50000,
      tripDays: 5,
      tripType: 'friends',
      selectedCategories: [],
      selectedDestination: null,
      itinerary: null,
      days: [],
      activeDay: 1,
      currentStep: 1,
      isTransitioning: false,
      cloudTransitionActive: false,
      mapLoaded: false,
    }),

  getUserPreferences: () => {
    const state = get()
    return {
      budget: state.budgetValue,
      days: state.tripDays,
      tripType: state.tripType,
      categories: state.selectedCategories,
    }
  },
}))

// Re-export types for convenience
export type { Destination, Itinerary, DayPlan, Activity, TripType, TripCategory }
