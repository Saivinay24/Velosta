// ══════════════════════════════════════════════════════════
// Velosta Community — Zustand Store
// ══════════════════════════════════════════════════════════

import { create } from 'zustand'
import type { FeedFilter, LeaderboardTab, QuestCategory } from './types'

interface CommunityState {
  // City selection
  selectedCity: string
  setSelectedCity: (city: string) => void

  // Feed
  feedFilter: FeedFilter
  setFeedFilter: (filter: FeedFilter) => void

  // Quest board
  questCategoryFilter: QuestCategory | 'all'
  setQuestCategoryFilter: (cat: QuestCategory | 'all') => void

  // Leaderboard
  leaderboardTab: LeaderboardTab
  setLeaderboardTab: (tab: LeaderboardTab) => void

  // Events
  eventCityFilter: string
  setEventCityFilter: (city: string) => void

  // Navigation
  activeNav: string
  setActiveNav: (nav: string) => void
}

export const useCommunityStore = create<CommunityState>((set) => ({
  selectedCity: 'goa',
  setSelectedCity: (city) => set({ selectedCity: city }),

  feedFilter: 'all',
  setFeedFilter: (filter) => set({ feedFilter: filter }),

  questCategoryFilter: 'all',
  setQuestCategoryFilter: (cat) => set({ questCategoryFilter: cat }),

  leaderboardTab: 'global',
  setLeaderboardTab: (tab) => set({ leaderboardTab: tab }),

  eventCityFilter: 'goa',
  setEventCityFilter: (city) => set({ eventCityFilter: city }),

  activeNav: 'feed',
  setActiveNav: (nav) => set({ activeNav: nav }),
}))
