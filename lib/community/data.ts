// ══════════════════════════════════════════════════════════
// Velosta Community — Mock Data
// ══════════════════════════════════════════════════════════

import {
  LEVEL_TITLES,
  type CommunityUser,
  type Quest,
  type QuestSubmission,
  type Badge,
  type CommunityEvent,
  type FeedPost,
  type Trip,
  type LeaderboardEntry,
} from './types'

// ── Cities ──

export const communityCities = [
  { id: 'goa', name: 'Goa', state: 'Goa', emoji: '🏝️' },
  { id: 'rajasthan', name: 'Jaipur', state: 'Rajasthan', emoji: '🏰' },
  { id: 'manali', name: 'Manali', state: 'Himachal Pradesh', emoji: '🏔️' },
  { id: 'kerala', name: 'Kerala', state: 'Kerala', emoji: '🌴' },
  { id: 'meghalaya', name: 'Meghalaya', state: 'Meghalaya', emoji: '🌧️' },
]

// ── Community Images ──
// Centralized image map for all community visuals

export const COMMUNITY_IMAGES = {
  // City hero images
  'goa-sunset':          '/community/goa-sunset.png',
  'goa-food':            '/community/goa-food.png',
  'goa-cliff':           '/community/goa-cliff.png',
  'bonfire':             '/community/bonfire.png',
  'mandovi-river':       '/community/mandovi-river.png',
  'jaipur-fort':         '/community/jaipur-fort.png',
  'jaipur-street':       '/community/jaipur-street.png',
  'spice-market':        '/community/spice-market.png',
  'manali-mountains':    '/community/manali-mountains.png',
  'kerala-backwaters':   '/community/kerala-backwaters.png',
  'meghalaya-bridges':   '/community/meghalaya-bridges.png',
} as const

// City → hero image mapping
export const CITY_HERO_IMAGES: Record<string, string> = {
  'goa':         COMMUNITY_IMAGES['goa-sunset'],
  'rajasthan':   COMMUNITY_IMAGES['jaipur-fort'],
  'manali':      COMMUNITY_IMAGES['manali-mountains'],
  'kerala':      COMMUNITY_IMAGES['kerala-backwaters'],
  'meghalaya':   COMMUNITY_IMAGES['meghalaya-bridges'],
}

// ── Mock Users ──

export const mockCurrentUser: CommunityUser = {
  id: 'user-self',
  username: 'sai_explores',
  displayName: 'Sai Vinay',
  avatarUrl: '',
  bio: 'Chasing sunsets and street food across India. Level 18 Pathfinder.',
  homeCity: 'Hyderabad',
  trustTier: 3,
  xp: 18400,
  level: 18,
  joinedDate: '2025-01-15',
  stats: { trips: 14, cities: 11, questsCompleted: 87, eventsAttended: 9 },
  earnedBadgeIds: ['golden-hour', 'the-palate', 'the-connector', 'off-the-map', 'city-conqueror-goa', 'city-conqueror-manali', 'night-owl'],
  communityRating: 4.7,
  ratingCount: 23,
}

export const mockUsers: CommunityUser[] = [
  mockCurrentUser,
  {
    id: 'user-1',
    username: 'priya_explores',
    displayName: 'Priya Sharma',
    avatarUrl: '',
    bio: 'Mumbai → everywhere. 14 cities. Loves hidden cafés and midnight treks.',
    homeCity: 'Mumbai',
    trustTier: 3,
    xp: 22500,
    level: 20,
    joinedDate: '2025-01-10',
    stats: { trips: 16, cities: 14, questsCompleted: 104, eventsAttended: 12 },
    earnedBadgeIds: ['golden-hour', 'the-palate', 'the-connector', 'off-the-map', 'summit-seeker', 'city-conqueror-goa', 'the-director', 'night-owl', 'first-mover'],
    communityRating: 4.8,
    ratingCount: 31,
  },
  {
    id: 'user-2',
    username: 'rahul_travels',
    displayName: 'Rahul Mehta',
    avatarUrl: '',
    bio: 'Solo backpacker. If the trail ends, I keep walking.',
    homeCity: 'Delhi',
    trustTier: 2,
    xp: 12800,
    level: 14,
    joinedDate: '2025-03-22',
    stats: { trips: 9, cities: 8, questsCompleted: 52, eventsAttended: 5 },
    earnedBadgeIds: ['golden-hour', 'summit-seeker', 'off-the-map'],
    communityRating: 4.5,
    ratingCount: 14,
  },
  {
    id: 'user-3',
    username: 'wanderlust_squad',
    displayName: 'Anika Roy',
    avatarUrl: '',
    bio: 'Travel vlogger. 200k subs. Making cinematic travel memories.',
    homeCity: 'Bangalore',
    trustTier: 4,
    xp: 45200,
    level: 25,
    joinedDate: '2024-11-05',
    stats: { trips: 28, cities: 22, questsCompleted: 186, eventsAttended: 18 },
    earnedBadgeIds: ['golden-hour', 'the-palate', 'the-connector', 'off-the-map', 'summit-seeker', 'the-director', 'night-owl', 'first-mover', 'velosta-og', 'city-conqueror-goa', 'city-conqueror-manali', 'city-conqueror-jaipur'],
    communityRating: 4.9,
    ratingCount: 67,
  },
  {
    id: 'user-4',
    username: 'vikram_wild',
    displayName: 'Vikram Singh',
    avatarUrl: '',
    bio: 'Adventure junkie. Paragliding, scuba, mountain biking.',
    homeCity: 'Chandigarh',
    trustTier: 3,
    xp: 31000,
    level: 22,
    joinedDate: '2025-02-14',
    stats: { trips: 18, cities: 15, questsCompleted: 132, eventsAttended: 8 },
    earnedBadgeIds: ['summit-seeker', 'off-the-map', 'night-owl', 'first-mover', 'golden-hour', 'the-connector'],
    communityRating: 4.6,
    ratingCount: 22,
  },
  {
    id: 'user-5',
    username: 'meera_chai',
    displayName: 'Meera Patel',
    avatarUrl: '',
    bio: 'Food writer. If it has masala, I will find it.',
    homeCity: 'Ahmedabad',
    trustTier: 2,
    xp: 9200,
    level: 11,
    joinedDate: '2025-05-01',
    stats: { trips: 7, cities: 6, questsCompleted: 38, eventsAttended: 4 },
    earnedBadgeIds: ['the-palate', 'off-the-map'],
    communityRating: 4.4,
    ratingCount: 9,
  },
  {
    id: 'user-6',
    username: 'arjun_lens',
    displayName: 'Arjun Nair',
    avatarUrl: '',
    bio: 'Photographer. Chasing golden hour across India.',
    homeCity: 'Kochi',
    trustTier: 2,
    xp: 15600,
    level: 16,
    joinedDate: '2025-04-10',
    stats: { trips: 11, cities: 9, questsCompleted: 67, eventsAttended: 6 },
    earnedBadgeIds: ['golden-hour', 'the-director', 'off-the-map', 'city-conqueror-kerala'],
    communityRating: 4.7,
    ratingCount: 18,
  },
  {
    id: 'user-7',
    username: 'nisha_wanders',
    displayName: 'Nisha Reddy',
    avatarUrl: '',
    bio: 'Culture enthusiast. Temples, textiles, and traditions.',
    homeCity: 'Hyderabad',
    trustTier: 3,
    xp: 19800,
    level: 19,
    joinedDate: '2025-01-20',
    stats: { trips: 13, cities: 12, questsCompleted: 91, eventsAttended: 10 },
    earnedBadgeIds: ['the-palate', 'the-connector', 'off-the-map', 'city-conqueror-rajasthan', 'night-owl', 'golden-hour'],
    communityRating: 4.6,
    ratingCount: 20,
  },
  {
    id: 'user-8',
    username: 'dev_mountains',
    displayName: 'Dev Kapoor',
    avatarUrl: '',
    bio: 'Mountain person. Cold weather, hot chai.',
    homeCity: 'Dehradun',
    trustTier: 2,
    xp: 8400,
    level: 10,
    joinedDate: '2025-06-01',
    stats: { trips: 6, cities: 5, questsCompleted: 33, eventsAttended: 3 },
    earnedBadgeIds: ['summit-seeker', 'golden-hour'],
    communityRating: 4.3,
    ratingCount: 7,
  },
  {
    id: 'user-9',
    username: 'zara_travels',
    displayName: 'Zara Khan',
    avatarUrl: '',
    bio: 'Weekend warrior. Exploring one city at a time.',
    homeCity: 'Pune',
    trustTier: 2,
    xp: 11200,
    level: 13,
    joinedDate: '2025-03-15',
    stats: { trips: 8, cities: 7, questsCompleted: 45, eventsAttended: 5 },
    earnedBadgeIds: ['the-palate', 'golden-hour', 'off-the-map'],
    communityRating: 4.5,
    ratingCount: 11,
  },
  {
    id: 'user-10',
    username: 'karan_drifts',
    displayName: 'Karan Malhotra',
    avatarUrl: '',
    bio: 'Road trips and playlist curation.',
    homeCity: 'Jaipur',
    trustTier: 3,
    xp: 26500,
    level: 21,
    joinedDate: '2025-01-05',
    stats: { trips: 20, cities: 16, questsCompleted: 118, eventsAttended: 14 },
    earnedBadgeIds: ['golden-hour', 'the-palate', 'the-connector', 'off-the-map', 'first-mover', 'night-owl', 'city-conqueror-rajasthan', 'city-conqueror-goa'],
    communityRating: 4.8,
    ratingCount: 35,
  },
]

// ── Badges ──

export const badges: Badge[] = [
  { id: 'golden-hour',       name: 'Golden Hour Hunter',  description: '10 sunrise/sunset quests completed',      icon: '🌅', category: 'quest', requirementLabel: '10 Golden Hour quests', isSecret: false },
  { id: 'the-palate',        name: 'The Palate',          description: '20 food quests across 5+ cities',         icon: '🍽️', category: 'quest', requirementLabel: '20 Taste quests, 5 cities', isSecret: false },
  { id: 'summit-seeker',     name: 'Summit Seeker',       description: '5 mountain/trek legendary quests',         icon: '🏔️', category: 'quest', requirementLabel: '5 legendary Adventure quests', isSecret: false },
  { id: 'the-connector',     name: 'The Connector',       description: 'Attended 10 meetups with 4.5+ rating',    icon: '🗣️', category: 'social', requirementLabel: '10 meetups, 4.5+ rating', isSecret: false },
  { id: 'off-the-map',       name: 'Off the Map',         description: '15 hidden gem quests completed',           icon: '🔍', category: 'quest', requirementLabel: '15 Hidden quests', isSecret: false },
  { id: 'the-director',      name: 'The Director',        description: '10 approved vlogs with 4+ rating',        icon: '🎬', category: 'content', requirementLabel: '10 vlogs, avg 4+ rating', isSecret: false },
  { id: 'night-owl',         name: 'Night Owl',           description: '10 after-dark quests completed',           icon: '🌙', category: 'quest', requirementLabel: '10 After Dark quests', isSecret: false },
  { id: 'first-mover',       name: 'First Mover',         description: '5 "Pioneer" quest completions',            icon: '⚡', category: 'achievement', requirementLabel: '5 first-to-complete quests', isSecret: false },
  { id: 'velosta-og',        name: 'Velosta OG',          description: 'Top 100 all-time by XP',                   icon: '🏆', category: 'elite', requirementLabel: 'Top 100 global XP', isSecret: false },
  { id: 'city-conqueror-goa', name: 'City Conqueror: Goa', description: 'Complete 80%+ of Goa quests',             icon: '👑', category: 'city', requirementLabel: '80%+ Goa quests', isSecret: false },
  { id: 'city-conqueror-manali', name: 'City Conqueror: Manali', description: 'Complete 80%+ of Manali quests',    icon: '👑', category: 'city', requirementLabel: '80%+ Manali quests', isSecret: false },
  { id: 'city-conqueror-jaipur', name: 'City Conqueror: Jaipur', description: 'Complete 80%+ of Jaipur quests',    icon: '👑', category: 'city', requirementLabel: '80%+ Jaipur quests', isSecret: false },
  { id: 'city-conqueror-kerala', name: 'City Conqueror: Kerala', description: 'Complete 80%+ of Kerala quests',    icon: '👑', category: 'city', requirementLabel: '80%+ Kerala quests', isSecret: false },
  { id: 'city-conqueror-rajasthan', name: 'City Conqueror: Rajasthan', description: 'Complete 80%+ of Rajasthan quests', icon: '👑', category: 'city', requirementLabel: '80%+ Rajasthan quests', isSecret: false },
  { id: 'secret-storyteller', name: '???', description: 'Criteria revealed after unlocking', icon: '🔒', category: 'secret', requirementLabel: 'Hidden', isSecret: true },
  { id: 'secret-moonwalker',  name: '???', description: 'Criteria revealed after unlocking', icon: '🔒', category: 'secret', requirementLabel: 'Hidden', isSecret: true },
]

// ── Quests ──

export const quests: Quest[] = [
  // GOA
  { id: 'goa-q1', cityId: 'goa', title: 'The Fisherman\'s Feast', description: 'The best prawn curry in Palolem isn\'t on Google Maps. It\'s in a shack behind the Church of the Holy Cross, run by a fisherman who only cooks what he caught that morning. No sign. No reviews. Just follow the smell of kokum and coconut.', hint: 'Walk past the church. Turn at the banyan tree. Listen for the radio.', category: 'taste', difficulty: 'easy', verificationType: 'photo', verificationPrompt: 'Upload a photo of the dish with the stall visible in the background.', xpReward: 150, estimatedDuration: 45, physicalIntensity: 'chill', bestFor: ['friends', 'solo'], completionCount: 234, averageRating: 4.7 },
  { id: 'goa-q2', cityId: 'goa', title: 'The Spice Trail', description: 'Three spices. Three stalls. One story. Navigate Mapusa\'s Friday market by nose alone — find cardamom from the corner lady, black pepper from the man with the red umbrella, and kokum from the grandmother at the back.', hint: 'Follow the scent, not the signs.', category: 'taste', difficulty: 'medium', verificationType: 'photo', verificationPrompt: 'Upload a photo showing all three spices together.', xpReward: 250, estimatedDuration: 90, physicalIntensity: 'moderate', bestFor: ['friends', 'couple'], completionCount: 128, averageRating: 4.5 },
  { id: 'goa-q3', cityId: 'goa', title: 'The Cliff Nobody Films', description: 'Everyone crowds Vagator for sunset. But 2km north of Anjuna, past the construction site and through the coconut grove, there\'s a cliff with a 180° ocean view. No tourists. No fences. Just you and the Arabian Sea.', hint: 'The locals call it "pathar" — the rock.', category: 'golden_hour', difficulty: 'medium', verificationType: 'photo', verificationPrompt: 'Upload a sunset photo from the cliff showing the open ocean.', xpReward: 200, estimatedDuration: 60, physicalIntensity: 'moderate', bestFor: ['solo', 'couple'], completionCount: 189, averageRating: 4.8, timeWindow: { startHour: 17, endHour: 19 } },
  { id: 'goa-q4', cityId: 'goa', title: 'The Mandovi Mist', description: 'At 6:15 AM, the mist rises off the Mandovi River at Divar Island. The ferry crossing in the fog feels like entering another world. Be there before the first autorickshaw.', hint: 'Catch the 6 AM ferry from Old Goa.', category: 'golden_hour', difficulty: 'hard', verificationType: 'video', verificationPrompt: 'Upload a 30s video showing the mist over the river.', xpReward: 300, estimatedDuration: 90, physicalIntensity: 'chill', bestFor: ['solo', 'couple'], completionCount: 67, averageRating: 4.9, timeWindow: { startHour: 5, endHour: 7 } },
  { id: 'goa-q5', cityId: 'goa', title: 'Chapora After Hours', description: 'Chapora Fort at sunset is tourist central. But come back at 11 PM. Bring a blanket. The stars from the ramparts are Goa\'s best-kept secret.', hint: 'The path is lit by your phone. Trust it.', category: 'after_dark', difficulty: 'medium', verificationType: 'photo', verificationPrompt: 'Upload a night photo from the fort showing stars.', xpReward: 250, estimatedDuration: 120, physicalIntensity: 'moderate', bestFor: ['friends'], completionCount: 95, averageRating: 4.6 },
  { id: 'goa-q6', cityId: 'goa', title: 'Learn Konkani', description: 'Find a local fisherman or market vendor and learn one sentence in Konkani. Not "hello" — something real. A proverb, a joke, a saying about the sea.', hint: 'The fish sellers near Margao market love to teach.', category: 'connect', difficulty: 'easy', verificationType: 'video', verificationPrompt: 'Record yourself saying the Konkani sentence with the teacher.', xpReward: 150, estimatedDuration: 30, physicalIntensity: 'chill', bestFor: ['solo', 'friends'], completionCount: 312, averageRating: 4.4 },

  // RAJASTHAN / JAIPUR
  { id: 'jaipur-q1', cityId: 'rajasthan', title: 'The Blue Hour', description: 'Everyone photographs Hawa Mahal at golden hour. But the real magic is at 5:50 AM, when the first light hits the pink sandstone and the street below is completely empty — no cars, no tourists, just pigeons and chai vendors setting up.', hint: 'Be there before the first autorickshaw.', category: 'golden_hour', difficulty: 'medium', verificationType: 'photo', verificationPrompt: 'Upload a photo showing the empty street with morning light on the façade.', xpReward: 250, estimatedDuration: 30, physicalIntensity: 'chill', bestFor: ['solo', 'couple'], completionCount: 156, averageRating: 4.8, timeWindow: { startHour: 5, endHour: 7 } },
  { id: 'jaipur-q2', cityId: 'rajasthan', title: 'The Dye Master', description: 'In Sanganer, there\'s a 4th-generation block printer who still mixes his own dyes from flowers and minerals. Find his workshop (no signboard), watch him work, and ask to try one print yourself.', hint: 'Look for blue hands near the Sanganer temple.', category: 'culture', difficulty: 'hard', verificationType: 'photo', verificationPrompt: 'Photo of you with the artisan and your block print.', xpReward: 400, estimatedDuration: 120, physicalIntensity: 'chill', bestFor: ['solo', 'couple', 'friends'], completionCount: 42, averageRating: 4.9 },
  { id: 'jaipur-q3', cityId: 'rajasthan', title: 'Pyaaz Ki Kachori Hunt', description: 'Jaipur has 50 shops claiming the best pyaaz ki kachori. But the real one is in a lane so narrow two people can\'t walk side by side. The queue starts at 6 AM and it sells out by 8:30.', hint: 'Near Johari Bazaar. Follow the smoke.', category: 'taste', difficulty: 'easy', verificationType: 'photo', verificationPrompt: 'Photo of the kachori with the shop in background.', xpReward: 150, estimatedDuration: 60, physicalIntensity: 'chill', bestFor: ['solo', 'friends'], completionCount: 287, averageRating: 4.6, timeWindow: { startHour: 6, endHour: 9 } },
  { id: 'jaipur-q4', cityId: 'rajasthan', title: 'The Stepwell Secret', description: 'Panna Meena Ka Kund is Instagram-famous now. But 3 km away, there\'s an older, deeper stepwell that tourists haven\'t discovered. The symmetry is perfect. The silence is deafening.', hint: 'Ask for "purana baoli" at the Amer parking lot.', category: 'hidden', difficulty: 'medium', verificationType: 'photo', verificationPrompt: 'Photo from inside the stepwell showing the geometric patterns.', xpReward: 250, estimatedDuration: 90, physicalIntensity: 'moderate', bestFor: ['solo', 'couple'], completionCount: 78, averageRating: 4.7 },

  // MANALI
  { id: 'manali-q1', cityId: 'manali', title: 'The Forgotten Temple', description: 'Above Old Manali, past the last guesthouse, there\'s a trail that locals use to reach a 400-year-old wooden temple. No tourist has written about it. The carvings depict a story that the village elder will tell you — if you ask in Hindi.', hint: 'The trail begins where the concrete ends.', category: 'hidden', difficulty: 'hard', verificationType: 'video', verificationPrompt: 'Upload a 30s video of the temple carvings.', xpReward: 500, estimatedDuration: 180, physicalIntensity: 'intense', bestFor: ['solo', 'friends'], completionCount: 34, averageRating: 4.9 },
  { id: 'manali-q2', cityId: 'manali', title: 'First Light on Rohtang', description: 'The tourist buses hit Rohtang by 10 AM. But at 5:30 AM, the pass is yours alone. The sunrise turns the snow pink, then gold, then white. Bring a thermos.', hint: 'Start driving at 4 AM. The road is empty.', category: 'golden_hour', difficulty: 'hard', verificationType: 'photo', verificationPrompt: 'Sunrise photo from Rohtang Pass with snow visible.', xpReward: 450, estimatedDuration: 240, physicalIntensity: 'intense', bestFor: ['friends', 'solo'], completionCount: 23, averageRating: 4.9, timeWindow: { startHour: 4, endHour: 7 } },
  { id: 'manali-q3', cityId: 'manali', title: 'Trout \u0026 Trust', description: 'The trout farm near Naggar serves fresh-caught trout grilled on a wood fire. But the real experience is befriending the owner and getting invited to his kitchen. He\'ll add spices you can\'t find in any market.', hint: 'His name starts with a B. Tell him you know about the walnut chutney.', category: 'taste', difficulty: 'medium', verificationType: 'photo', verificationPrompt: 'Photo of the trout dish and the kitchen.', xpReward: 250, estimatedDuration: 90, physicalIntensity: 'chill', bestFor: ['friends', 'couple'], completionCount: 89, averageRating: 4.6 },
  { id: 'manali-q4', cityId: 'manali', title: 'The Bonfire Code', description: 'In Old Manali, there\'s an unspoken tradition: when someone lights a bonfire in the apple orchard behind the main road, travelers are welcome to join. Bring a song or a story.', hint: 'The orchard is behind the bakery with the red door.', category: 'connect', difficulty: 'easy', verificationType: 'photo', verificationPrompt: 'Photo of the bonfire gathering.', xpReward: 150, estimatedDuration: 120, physicalIntensity: 'chill', bestFor: ['solo', 'friends'], completionCount: 167, averageRating: 4.5 },

  // KERALA
  { id: 'kerala-q1', cityId: 'kerala', title: 'The Toddy Trail', description: 'In Alleppey, the best toddy isn\'t at the toddy shop on the highway. It\'s at the shack by the canal where the boatman stops for his afternoon break. Follow the palm wine, not the signboard.', hint: 'Ask the houseboat driver for "nalla toddy."', category: 'taste', difficulty: 'easy', verificationType: 'photo', verificationPrompt: 'Photo of the toddy and the canal-side setting.', xpReward: 150, estimatedDuration: 60, physicalIntensity: 'chill', bestFor: ['friends', 'couple'], completionCount: 198, averageRating: 4.5 },
  { id: 'kerala-q2', cityId: 'kerala', title: 'Sunrise Backwaters', description: 'Set your alarm for 5 AM. Step onto the houseboat deck. The Vembanad Lake in morning mist, with fishing nets silhouetted against orange sky, is Kerala\'s most underrated moment.', hint: 'Stay on the upper deck. Face east.', category: 'golden_hour', difficulty: 'easy', verificationType: 'photo', verificationPrompt: 'Sunrise photo from the houseboat.', xpReward: 150, estimatedDuration: 30, physicalIntensity: 'chill', bestFor: ['couple', 'solo'], completionCount: 245, averageRating: 4.7, timeWindow: { startHour: 5, endHour: 7 } },
  { id: 'kerala-q3', cityId: 'kerala', title: 'Kathakali Behind the Curtain', description: 'Tourist Kathakali shows are watered down. Find the Kalamandalam in Thrissur and watch the students practice. The raw energy, the imperfect makeup, the teacher\'s stern corrections — this is the real thing.', hint: 'Morning practice starts at 7 AM. Just walk in.', category: 'culture', difficulty: 'hard', verificationType: 'video', verificationPrompt: '30s video of the practice session.', xpReward: 400, estimatedDuration: 120, physicalIntensity: 'chill', bestFor: ['solo', 'couple'], completionCount: 31, averageRating: 4.9 },

  // MEGHALAYA
  { id: 'meghalaya-q1', cityId: 'meghalaya', title: 'Root Bridge Dawn', description: 'The double-decker living root bridge is magical in photos. But at 5:30 AM, when the mist lifts off the river below and the jungle sounds are loudest, it feels like stepping into another century.', hint: 'Camp at the bottom. Wake before sunrise.', category: 'golden_hour', difficulty: 'hard', verificationType: 'photo', verificationPrompt: 'Dawn photo of the root bridge with mist visible.', xpReward: 450, estimatedDuration: 360, physicalIntensity: 'intense', bestFor: ['solo', 'friends'], completionCount: 45, averageRating: 4.9, timeWindow: { startHour: 5, endHour: 7 } },
  { id: 'meghalaya-q2', cityId: 'meghalaya', title: 'The Singing Village', description: 'In Kongthong, every person has a unique whistled melody instead of a name. Mothers call their children with songs that echo through the hills. Find the village and learn your melody.', hint: 'It\'s 2 hours from Shillong. Take the less-used road.', category: 'culture', difficulty: 'legendary', verificationType: 'video', verificationPrompt: 'Video of a villager whistling your melody.', xpReward: 1000, estimatedDuration: 300, physicalIntensity: 'moderate', bestFor: ['solo', 'friends'], completionCount: 8, averageRating: 5.0 },
  { id: 'meghalaya-q3', cityId: 'meghalaya', title: 'Dawki Glass', description: 'The Umngot River in Dawki is so clear the boats look like they\'re floating on glass. But skip the crowded entry point — walk 1 km upstream to the bend where the locals swim. The water is even clearer.', hint: 'Follow the path past the border checkpoint.', category: 'hidden', difficulty: 'medium', verificationType: 'photo', verificationPrompt: 'Photo showing the transparent water with your reflection.', xpReward: 250, estimatedDuration: 120, physicalIntensity: 'moderate', bestFor: ['friends', 'couple'], completionCount: 112, averageRating: 4.7 },
]

// ── Quest Submissions ──

export const questSubmissions: QuestSubmission[] = [
  { id: 'sub-1', questId: 'goa-q1', userId: 'user-2', mediaUrl: COMMUNITY_IMAGES['goa-food'], caption: 'Asked 3 locals. All pointed to the same shack behind the church. No sign. Best prawns ever.', rating: 4.8, xpEarned: 150, completedAt: '2026-06-10T14:30:00' },
  { id: 'sub-2', questId: 'goa-q3', userId: 'user-1', mediaUrl: COMMUNITY_IMAGES['goa-cliff'], caption: 'The sunset from this cliff is unreal. Zero tourists. Just waves crashing 50m below.', rating: 4.9, xpEarned: 200, completedAt: '2026-06-09T18:45:00' },
  { id: 'sub-3', questId: 'goa-q4', userId: 'user-3', mediaUrl: COMMUNITY_IMAGES['mandovi-river'], caption: 'The mist rising off the Mandovi at 6:15 AM is a 10-minute window of pure magic.', rating: 5.0, xpEarned: 300, completedAt: '2026-06-08T06:30:00' },
  { id: 'sub-4', questId: 'jaipur-q1', userId: 'user-7', mediaUrl: COMMUNITY_IMAGES['jaipur-street'], caption: 'Reached at 5:40 AM. Empty streets. The pink sandstone glowed. Worth every lost hour of sleep.', rating: 4.9, xpEarned: 250, completedAt: '2026-06-07T06:00:00' },
  { id: 'sub-5', questId: 'manali-q1', userId: 'user-4', mediaUrl: COMMUNITY_IMAGES['manali-mountains'], caption: 'Found the temple after a 2-hour climb. The village elder told me the story in Hindi. Goosebumps.', rating: 5.0, xpEarned: 500, completedAt: '2026-06-05T11:00:00' },
  { id: 'sub-6', questId: 'goa-q1', userId: 'user-5', mediaUrl: COMMUNITY_IMAGES['goa-food'], caption: 'The kokum prawn curry changed my life. No menu, no prices — just trust.', rating: 4.6, xpEarned: 150, completedAt: '2026-06-12T13:00:00' },
]

// ── Events ──

export const events: CommunityEvent[] = [
  {
    id: 'evt-1', type: 'community_meetup', hostId: 'user-1', title: 'Chapora Fort Bonfire Night', description: 'Bring your guitar, your stories, and your appetite. We\'ll have a bonfire on the ramparts with a view of the Arabian Sea. Snacks and chai provided.', location: { lat: 15.6102, lng: 73.7385, name: 'Chapora Fort', address: 'Chapora, North Goa' }, datetime: '2026-06-18T20:00:00', duration: 180, maxAttendees: 12, currentAttendeeIds: ['user-2', 'user-5', 'user-8', 'user-self'], waitlistIds: [], minTrustTier: 2, costPerPerson: 0, costSplit: 'free', cityId: 'goa',
  },
  {
    id: 'evt-2', type: 'velosta_event', hostId: 'user-3', title: 'Velosta Goa Sunset Party', description: 'Exclusive rooftop event for City Conqueror badge holders. Live music, curated cocktails, and a preview of next season\'s quest board. Dress code: tropical chic.', location: { lat: 15.498, lng: 73.8188, name: 'W Goa Rooftop', address: 'Vagator, North Goa' }, datetime: '2026-06-22T18:00:00', duration: 240, maxAttendees: 50, currentAttendeeIds: ['user-1', 'user-3', 'user-4', 'user-10', 'user-self'], waitlistIds: ['user-6', 'user-7'], minTrustTier: 2, costPerPerson: 2500, costSplit: 'split', cityId: 'goa',
  },
  {
    id: 'evt-3', type: 'quest_rally', hostId: 'user-4', title: 'Jaipur Quest Rally — Weekend Sprint', description: 'Teams of 3-4 race to complete 8 quests in 48 hours. Points for speed, creativity, and teamwork. Top team wins Velosta merch + early access.', location: { lat: 26.9124, lng: 75.7873, name: 'Hawa Mahal Square', address: 'Badi Choupad, Jaipur' }, datetime: '2026-06-28T08:00:00', duration: 2880, maxAttendees: 24, currentAttendeeIds: ['user-2', 'user-7', 'user-9', 'user-10'], waitlistIds: [], minTrustTier: 2, costPerPerson: 500, costSplit: 'split', cityId: 'rajasthan',
  },
  {
    id: 'evt-4', type: 'group_activity', hostId: 'user-2', title: 'Sunrise Trek to Triund', description: 'Starting at 3 AM from McLeodganj. We\'ll catch sunrise at the top. Chai at the summit. Bring warm layers and a headlamp.', location: { lat: 32.2396, lng: 76.3213, name: 'Triund Trek Start', address: 'Dharamkot, McLeodganj' }, datetime: '2026-06-20T03:00:00', duration: 480, maxAttendees: 8, currentAttendeeIds: ['user-4', 'user-8'], waitlistIds: [], minTrustTier: 2, costPerPerson: 0, costSplit: 'free', cityId: 'manali',
  },
  {
    id: 'evt-5', type: 'community_meetup', hostId: 'user-7', title: 'Heritage Walk — Old Jaipur', description: 'A 3-hour walking tour through Jaipur\'s old city. We\'ll visit artisan workshops, hidden havelis, and the best lassi in town.', location: { lat: 26.9239, lng: 75.8267, name: 'Hawa Mahal', address: 'Jaipur Old City' }, datetime: '2026-06-25T07:00:00', duration: 180, maxAttendees: 15, currentAttendeeIds: ['user-9', 'user-10', 'user-5'], waitlistIds: [], minTrustTier: 2, costPerPerson: 200, costSplit: 'split', cityId: 'rajasthan',
  },
  {
    id: 'evt-6', type: 'community_meetup', hostId: 'user-6', title: 'Kerala Backwater Photography Walk', description: 'Golden hour on the backwaters of Alleppey. Bring your camera — we\'ll capture fishing nets, houseboats, and sunset reflections.', location: { lat: 9.4981, lng: 76.3388, name: 'Alleppey Beach Pier', address: 'Alleppey, Kerala' }, datetime: '2026-06-24T16:30:00', duration: 150, maxAttendees: 10, currentAttendeeIds: ['user-1'], waitlistIds: [], minTrustTier: 2, costPerPerson: 0, costSplit: 'free', cityId: 'kerala',
  },
  {
    id: 'evt-7', type: 'quest_rally', hostId: 'user-3', title: 'Meghalaya Monsoon Quest Sprint', description: 'The rains transform Meghalaya. This quest rally explores waterfalls at full force, mist-covered bridges, and the greenest trails. 3 days. 6 quests. Unforgettable.', location: { lat: 25.467, lng: 91.3662, name: 'Police Bazaar', address: 'Shillong, Meghalaya' }, datetime: '2026-07-05T09:00:00', duration: 4320, maxAttendees: 16, currentAttendeeIds: ['user-4', 'user-2'], waitlistIds: ['user-self'], minTrustTier: 2, costPerPerson: 1500, costSplit: 'split', cityId: 'meghalaya',
  },
]

// ── Feed Posts ──

export const feedPosts: FeedPost[] = [
  { id: 'post-1', userId: 'user-2', type: 'quest_completion', content: 'Asked 3 locals. All pointed to the same shack behind the church. No sign. Best prawns ever. 🍤', mediaUrls: [COMMUNITY_IMAGES['goa-food']], cityId: 'goa', questId: 'goa-q1', likesCount: 24, commentsCount: 5, isFeatured: false, createdAt: '2026-06-14T14:30:00' },
  { id: 'post-2', userId: 'user-1', type: 'quest_completion', content: 'The sunset from this cliff is genuinely unreal. Zero tourists. Just waves crashing 50 meters below. This is why you travel. 🌅', mediaUrls: [COMMUNITY_IMAGES['goa-cliff']], cityId: 'goa', questId: 'goa-q3', likesCount: 67, commentsCount: 12, isFeatured: true, createdAt: '2026-06-13T18:45:00' },
  { id: 'post-3', userId: 'user-3', type: 'vlog', content: 'The Mandovi Mist quest at 6:15 AM. 45 seconds of pure magic. The ferry crossing in the fog felt like entering another world.', mediaUrls: [COMMUNITY_IMAGES['mandovi-river']], cityId: 'goa', questId: 'goa-q4', likesCount: 134, commentsCount: 28, isFeatured: true, createdAt: '2026-06-12T06:30:00' },
  { id: 'post-4', userId: 'user-4', type: 'meetup_recap', content: 'Last night\'s Chapora bonfire was exactly what travel should be. Met people from 4 different cities. Shared stories till 2 AM. This is the Velosta magic. 🔥', mediaUrls: [COMMUNITY_IMAGES['bonfire']], cityId: 'goa', eventId: 'evt-1', likesCount: 45, commentsCount: 8, isFeatured: false, createdAt: '2026-06-11T23:00:00' },
  { id: 'post-5', userId: 'user-7', type: 'quest_completion', content: 'Hawa Mahal at 5:50 AM. Empty streets. Pink sandstone glowing. Worth every lost hour of sleep. The silence of the old city at dawn is Jaipur\'s real treasure.', mediaUrls: [COMMUNITY_IMAGES['jaipur-street']], cityId: 'rajasthan', questId: 'jaipur-q1', likesCount: 89, commentsCount: 15, isFeatured: true, createdAt: '2026-06-10T06:00:00' },
  { id: 'post-6', userId: 'user-5', type: 'tip', content: 'Pro tip for Jaipur: Skip the pyaaz ki kachori tourist spots. The real one is in a lane so narrow you\'ll miss it. Queue starts 6 AM, sold out by 8:30.', mediaUrls: [COMMUNITY_IMAGES['spice-market']], cityId: 'rajasthan', likesCount: 32, commentsCount: 7, isFeatured: false, createdAt: '2026-06-09T08:00:00' },
  { id: 'post-7', userId: 'user-4', type: 'quest_completion', content: 'Found the forgotten temple above Old Manali. 2-hour climb through a trail no tourist knows. The village elder told me the story of the carvings. Goosebumps. 🏔️', mediaUrls: [COMMUNITY_IMAGES['manali-mountains']], cityId: 'manali', questId: 'manali-q1', likesCount: 56, commentsCount: 10, isFeatured: true, createdAt: '2026-06-08T11:00:00' },
  { id: 'post-8', userId: 'user-6', type: 'vlog', content: 'Kerala backwaters at 5:30 AM. The Vembanad Lake in morning mist, with fishing nets against the orange sky. This was the most peaceful 10 minutes of my year.', mediaUrls: [COMMUNITY_IMAGES['kerala-backwaters']], cityId: 'kerala', questId: 'kerala-q2', likesCount: 78, commentsCount: 14, isFeatured: true, createdAt: '2026-06-07T06:00:00' },
  { id: 'post-9', userId: 'user-3', type: 'quest_completion', content: 'The Singing Village of Kongthong. Every person has a unique whistled melody as their name. I got mine. This might be the most beautiful cultural experience in India.', mediaUrls: [COMMUNITY_IMAGES['meghalaya-bridges']], cityId: 'meghalaya', questId: 'meghalaya-q2', likesCount: 212, commentsCount: 45, isFeatured: true, createdAt: '2026-06-06T14:00:00' },
  { id: 'post-10', userId: 'user-8', type: 'tip', content: 'Manali tip: The bonfire tradition in Old Manali is real. Look for the apple orchard behind the bakery with the red door. Bring a song.', mediaUrls: [COMMUNITY_IMAGES['bonfire']], cityId: 'manali', likesCount: 28, commentsCount: 4, isFeatured: false, createdAt: '2026-06-05T21:00:00' },
  { id: 'post-11', userId: 'user-9', type: 'quest_completion', content: 'The toddy trail in Alleppey. Found the canal-side shack where the boatman stops for his afternoon break. The toddy was fresh, the fish curry was fire. 🌴', mediaUrls: [COMMUNITY_IMAGES['kerala-backwaters']], cityId: 'kerala', questId: 'kerala-q1', likesCount: 41, commentsCount: 6, isFeatured: false, createdAt: '2026-06-04T15:00:00' },
  { id: 'post-12', userId: 'user-10', type: 'meetup_recap', content: 'Heritage Walk through Old Jaipur with @nisha_wanders. Found 3 hidden havelis, met a 5th-gen silver craftsman, and had the best lassi in Rajasthan.', mediaUrls: [COMMUNITY_IMAGES['jaipur-fort']], cityId: 'rajasthan', eventId: 'evt-5', likesCount: 53, commentsCount: 9, isFeatured: false, createdAt: '2026-06-03T12:00:00' },
]

// ── Trips ──

export const mockTrips: Trip[] = [
  { id: 'trip-1', userId: 'user-self', cityId: 'goa', cityName: 'Goa', startDate: '2026-03-12', endDate: '2026-03-16', tripType: 'friends', questTier: 'gold', totalXpEarned: 1850, questsCompleted: 9, questsAvailable: 12, distanceCovered: 127, peopleMet: 14, badgesEarned: ['the-palate', 'golden-hour'] },
  { id: 'trip-2', userId: 'user-self', cityId: 'manali', cityName: 'Manali', startDate: '2026-01-05', endDate: '2026-01-10', tripType: 'friends', questTier: 'gold', totalXpEarned: 2200, questsCompleted: 8, questsAvailable: 10, distanceCovered: 89, peopleMet: 8, badgesEarned: ['summit-seeker'] },
  { id: 'trip-3', userId: 'user-self', cityId: 'rajasthan', cityName: 'Jaipur', startDate: '2025-11-20', endDate: '2025-11-24', tripType: 'couple', questTier: 'silver', totalXpEarned: 1400, questsCompleted: 6, questsAvailable: 10, distanceCovered: 65, peopleMet: 5, badgesEarned: [] },
  { id: 'trip-4', userId: 'user-self', cityId: 'kerala', cityName: 'Kerala', startDate: '2025-09-01', endDate: '2025-09-05', tripType: 'solo', questTier: 'bronze', totalXpEarned: 800, questsCompleted: 4, questsAvailable: 8, distanceCovered: 112, peopleMet: 6, badgesEarned: [] },
]

// ── Leaderboard ──

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, userId: 'user-3', displayName: 'Anika Roy', username: 'wanderlust_squad', avatarUrl: '', level: 25, xp: 45200, trips: 28, questsCompleted: 186, citiesVisited: 22, topBadgeIds: ['velosta-og', 'the-director', 'golden-hour'] },
  { rank: 2, userId: 'user-4', displayName: 'Vikram Singh', username: 'vikram_wild', avatarUrl: '', level: 22, xp: 31000, trips: 18, questsCompleted: 132, citiesVisited: 15, topBadgeIds: ['summit-seeker', 'first-mover', 'off-the-map'] },
  { rank: 3, userId: 'user-10', displayName: 'Karan Malhotra', username: 'karan_drifts', avatarUrl: '', level: 21, xp: 26500, trips: 20, questsCompleted: 118, citiesVisited: 16, topBadgeIds: ['the-palate', 'the-connector', 'golden-hour'] },
  { rank: 4, userId: 'user-1', displayName: 'Priya Sharma', username: 'priya_explores', avatarUrl: '', level: 20, xp: 22500, trips: 16, questsCompleted: 104, citiesVisited: 14, topBadgeIds: ['the-director', 'the-connector', 'off-the-map'] },
  { rank: 5, userId: 'user-7', displayName: 'Nisha Reddy', username: 'nisha_wanders', avatarUrl: '', level: 19, xp: 19800, trips: 13, questsCompleted: 91, citiesVisited: 12, topBadgeIds: ['the-palate', 'the-connector', 'night-owl'] },
  { rank: 6, userId: 'user-self', displayName: 'Sai Vinay', username: 'sai_explores', avatarUrl: '', level: 18, xp: 18400, trips: 14, questsCompleted: 87, citiesVisited: 11, topBadgeIds: ['golden-hour', 'the-palate', 'the-connector'] },
  { rank: 7, userId: 'user-6', displayName: 'Arjun Nair', username: 'arjun_lens', avatarUrl: '', level: 16, xp: 15600, trips: 11, questsCompleted: 67, citiesVisited: 9, topBadgeIds: ['golden-hour', 'the-director', 'off-the-map'] },
  { rank: 8, userId: 'user-2', displayName: 'Rahul Mehta', username: 'rahul_travels', avatarUrl: '', level: 14, xp: 12800, trips: 9, questsCompleted: 52, citiesVisited: 8, topBadgeIds: ['golden-hour', 'summit-seeker', 'off-the-map'] },
  { rank: 9, userId: 'user-9', displayName: 'Zara Khan', username: 'zara_travels', avatarUrl: '', level: 13, xp: 11200, trips: 8, questsCompleted: 45, citiesVisited: 7, topBadgeIds: ['the-palate', 'golden-hour', 'off-the-map'] },
  { rank: 10, userId: 'user-5', displayName: 'Meera Patel', username: 'meera_chai', avatarUrl: '', level: 11, xp: 9200, trips: 7, questsCompleted: 38, citiesVisited: 6, topBadgeIds: ['the-palate', 'off-the-map'] },
]

// ── Helpers ──

export function getUserById(id: string): CommunityUser | undefined {
  return mockUsers.find(u => u.id === id)
}

export function getQuestById(id: string): Quest | undefined {
  return quests.find(q => q.id === id)
}

export function getEventById(id: string): CommunityEvent | undefined {
  return events.find(e => e.id === id)
}

export function getQuestsByCity(cityId: string): Quest[] {
  return quests.filter(q => q.cityId === cityId)
}

export function getEventsByCity(cityId: string): CommunityEvent[] {
  return events.filter(e => e.cityId === cityId)
}

export function getPostsByCity(cityId: string): FeedPost[] {
  return feedPosts.filter(p => p.cityId === cityId)
}

export function getBadgeById(id: string): Badge | undefined {
  return badges.find(b => b.id === id)
}

export function getLevelTitle(level: number): string {
  const thresholds = [30, 25, 20, 15, 10, 5, 1]
  for (const t of thresholds) {
    if (level >= t) return LEVEL_TITLES[t] || 'Wanderer'
  }
  return 'Wanderer'
}

// XP needed for next level (simplified formula)
export function xpForLevel(level: number): number {
  if (level <= 5) return level * 400
  if (level <= 10) return 2000 + (level - 5) * 1200
  if (level <= 15) return 8000 + (level - 10) * 2400
  if (level <= 20) return 20000 + (level - 15) * 4000
  if (level <= 25) return 40000 + (level - 20) * 7000
  return 75000 + (level - 25) * 9000
}

// Avatar color generation from username
export function getAvatarColor(username: string): string {
  const colors = ['#C4734F', '#C9A96E', '#4A9B6E', '#6366f1', '#a855f7', '#E85D3A', '#2C3E50', '#7c9885']
  let hash = 0
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export function getAvatarInitials(displayName: string): string {
  return displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}
