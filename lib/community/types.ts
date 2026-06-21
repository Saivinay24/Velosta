// ══════════════════════════════════════════════════════════
// Velosta Community — Type Definitions
// ══════════════════════════════════════════════════════════

export type QuestCategory =
  | 'taste'
  | 'golden_hour'
  | 'adventure'
  | 'connect'
  | 'capture'
  | 'hidden'
  | 'culture'
  | 'after_dark'
  | 'stillness'
  | 'wildcard'

export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'legendary'
export type VerificationType = 'photo' | 'video' | 'checkin' | 'vlog' | 'peer' | 'auto'
export type PhysicalIntensity = 'chill' | 'moderate' | 'intense'
export type TrustTier = 1 | 2 | 3 | 4
export type QuestTier = 'bronze' | 'silver' | 'gold'
export type EventType = 'community_meetup' | 'velosta_event' | 'quest_rally' | 'group_activity'
export type PostType = 'quest_completion' | 'vlog' | 'trip_story' | 'meetup_recap' | 'tip' | 'review'
export type CostSplit = 'free' | 'split' | 'host_covers' | 'custom'

export const QUEST_CATEGORY_META: Record<QuestCategory, { icon: string; label: string; color: string }> = {
  taste:       { icon: '🍽️', label: 'Taste',       color: '#E85D3A' },
  golden_hour: { icon: '🌅', label: 'Golden Hour', color: '#C9A96E' },
  adventure:   { icon: '🏃', label: 'Adventure',   color: '#4A9B6E' },
  connect:     { icon: '🗣️', label: 'Connect',     color: '#6366f1' },
  capture:     { icon: '📸', label: 'Capture',     color: '#3b82f6' },
  hidden:      { icon: '🔍', label: 'Hidden',      color: '#C4734F' },
  culture:     { icon: '🎭', label: 'Culture',     color: '#a855f7' },
  after_dark:  { icon: '🌙', label: 'After Dark',  color: '#2C3E50' },
  stillness:   { icon: '🧘', label: 'Stillness',   color: '#7c9885' },
  wildcard:    { icon: '🎲', label: 'Wildcard',    color: '#C9A96E' },
}

export const EVENT_TYPE_META: Record<EventType, { icon: string; label: string; color: string }> = {
  community_meetup: { icon: '🔥', label: 'Community Meetup', color: '#C4734F' },
  velosta_event:    { icon: '🎉', label: 'Velosta Event',    color: '#C9A96E' },
  quest_rally:      { icon: '🏆', label: 'Quest Rally',      color: '#4A9B6E' },
  group_activity:   { icon: '🤝', label: 'Group Activity',   color: '#6366f1' },
}

export const DIFFICULTY_META: Record<QuestDifficulty, { label: string; color: string; xpRange: string }> = {
  easy:      { label: 'Easy',      color: '#4A9B6E', xpRange: '100–150' },
  medium:    { label: 'Medium',    color: '#C9A96E', xpRange: '200–300' },
  hard:      { label: 'Hard',      color: '#C4734F', xpRange: '400–600' },
  legendary: { label: 'Legendary', color: '#E85D3A', xpRange: '800–1500' },
}

export const LEVEL_TITLES: Record<number, string> = {
  1: 'Wanderer',
  5: 'Explorer',
  10: 'Adventurer',
  15: 'Pathfinder',
  20: 'Trailblazer',
  25: 'Legend',
  30: 'Velosta Elite',
}

// ── Data Models ──

export interface CommunityUser {
  id: string
  username: string
  displayName: string
  avatarUrl: string
  bio: string
  homeCity: string
  trustTier: TrustTier
  xp: number
  level: number
  joinedDate: string
  stats: {
    trips: number
    cities: number
    questsCompleted: number
    eventsAttended: number
  }
  earnedBadgeIds: string[]
  communityRating: number
  ratingCount: number
}

export interface Quest {
  id: string
  cityId: string
  title: string
  description: string
  hint: string
  category: QuestCategory
  difficulty: QuestDifficulty
  verificationType: VerificationType
  verificationPrompt: string
  xpReward: number
  estimatedDuration: number    // minutes
  physicalIntensity: PhysicalIntensity
  bestFor: string[]
  completionCount: number
  averageRating: number
  isLocked?: boolean
  prerequisites?: string[]
  timeWindow?: { startHour: number; endHour: number }
}

export interface QuestSubmission {
  id: string
  questId: string
  userId: string
  mediaUrl: string
  caption: string
  rating: number
  xpEarned: number
  completedAt: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: string
  requirementLabel: string
  isSecret: boolean
}

export interface CommunityEvent {
  id: string
  type: EventType
  hostId: string
  title: string
  description: string
  location: {
    lat: number
    lng: number
    name: string
    address: string
  }
  datetime: string
  duration: number             // minutes
  maxAttendees: number
  currentAttendeeIds: string[]
  waitlistIds: string[]
  minTrustTier: TrustTier
  costPerPerson: number
  costSplit: CostSplit
  cityId: string
  imageUrl?: string
}

export interface FeedPost {
  id: string
  userId: string
  type: PostType
  content: string
  mediaUrls: string[]
  cityId: string
  questId?: string
  eventId?: string
  tripId?: string
  likesCount: number
  commentsCount: number
  isFeatured: boolean
  createdAt: string
}

export interface Trip {
  id: string
  userId: string
  cityId: string
  cityName: string
  startDate: string
  endDate: string
  tripType: string
  questTier: QuestTier | null
  totalXpEarned: number
  questsCompleted: number
  questsAvailable: number
  distanceCovered: number      // km
  peopleMet: number
  badgesEarned: string[]
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  displayName: string
  username: string
  avatarUrl: string
  level: number
  xp: number
  trips: number
  questsCompleted: number
  citiesVisited: number
  topBadgeIds: string[]
}

export type LeaderboardTab = 'global' | 'city' | 'weekly' | 'friends'
export type FeedFilter = 'all' | 'quests' | 'vlogs' | 'meetups'
