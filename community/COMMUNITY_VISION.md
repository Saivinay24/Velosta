# Velosta Community — Full Vision & Execution Plan

> **"Travel isn't about seeing places anymore — it's about living stories."**

---

## Table of Contents

1. [The Problem We're Solving](#1-the-problem-were-solving)
2. [The Velosta Ecosystem — Three Pillars](#2-the-velosta-ecosystem--three-pillars)
3. [Community Pillar — The Big Idea](#3-community-pillar--the-big-idea)
4. [Core Concept: Quests & Gamification](#4-core-concept-quests--gamification)
5. [Identity & Trust Layer](#5-identity--trust-layer)
6. [Quest System — Deep Design](#6-quest-system--deep-design)
7. [Rewards & Achievement Engine](#7-rewards--achievement-engine)
8. [Social Layer — The Travel Social Network](#8-social-layer--the-travel-social-network)
9. [Meetups & Events System](#9-meetups--events-system)
10. [Trip Memory Engine — The Grand Finale](#10-trip-memory-engine--the-grand-finale)
11. [User Profiles & Traveler Identity](#11-user-profiles--traveler-identity)
12. [Content Moderation & Safety](#12-content-moderation--safety)
13. [Data Flow — How Community Feeds the Engine](#13-data-flow--how-community-feeds-the-engine)
14. [UI/UX Design System — Velosta DNA](#14-uiux-design-system--velosta-dna)
15. [Technical Architecture](#15-technical-architecture)
16. [Database Schema](#16-database-schema)
17. [API Specification](#17-api-specification)
18. [Development Phases & Roadmap](#18-development-phases--roadmap)
19. [Success Metrics](#19-success-metrics)
20. [Competitive Differentiation](#20-competitive-differentiation)

---

## 1. The Problem We're Solving

### Travel is broken — not logistically, but experientially.

**Decades ago:**
- Going to a new city was a *once-in-a-lifetime* experience
- You hadn't seen what that city looked like — no reels, no vlogs, no Instagram
- A sunrise on a mountaintop was genuinely breathtaking because you'd never witnessed it before
- The excitement came from the *unknown*

**Today:**
- We've seen every city through 10,000 travel reels before we arrive
- The "wow factor" is gone — we walk up to Taj Mahal already knowing every angle
- Travel has become a checklist: *visit tourist spot → take photo → post → next*
- Groups of friends follow YouTuber recommendations blindly, pretending it's enjoyable
- People *don't know how to enjoy* anymore — they've forgotten what genuine exploration feels like
- The magic of serendipity — stumbling into an incredible hidden café, meeting strangers who become lifelong friends, getting lost in alleys and finding the best food — is dead

### The Strava Analogy

Strava didn't make running *faster*. It made running *feel like a game*. Suddenly, running your regular route meant you were *conquering your city*. Leaderboards, segments, badges, and social proof turned a solitary grind into a shared adventure.

**Velosta Community does for travel what Strava did for running.**

We turn every trip into a living, breathing adventure game — with quests to complete, achievements to unlock, strangers to meet, stories to collect, and a permanent record of your journey that makes you feel like the protagonist of your own movie.

---

## 2. The Velosta Ecosystem — Three Pillars

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         VELOSTA ECOSYSTEM                               │
│                                                                         │
│  ┌──────────────┐   ┌──────────────────┐   ┌────────────────────────┐  │
│  │   PILLAR 1   │   │    PILLAR 2       │   │      PILLAR 3          │  │
│  │              │   │                   │   │                        │  │
│  │   AI TRIP    │──▶│  DATA SCRAPING    │──▶│    COMMUNITY           │  │
│  │   PLANNER    │   │  ENGINE           │   │    (THIS DOCUMENT)     │  │
│  │              │   │                   │   │                        │  │
│  │ Budget-first │   │ Real experiences  │   │ Quests, social,        │  │
│  │ Map-driven   │   │ Vendor intel      │   │ gamification,          │  │
│  │ AI itinerary │   │ Hidden gems       │   │ meetups, memories      │  │
│  │ 3D builder   │   │ Local tips        │   │ rewards, identity      │  │
│  │              │   │ Itinerary units   │   │                        │  │
│  └──────┬───────┘   └────────┬──────────┘   └────────────┬───────────┘  │
│         │                    │                            │              │
│         └────────────────────┼────────────────────────────┘              │
│                              │                                          │
│                    ┌─────────▼──────────┐                               │
│                    │   SHARED DATA      │                               │
│                    │   LAYER            │                               │
│                    │                    │                               │
│                    │ • Destinations DB  │                               │
│                    │ • User Profiles    │                               │
│                    │ • Experience Corpus│                               │
│                    │ • Quest Library    │                               │
│                    └────────────────────┘                               │
└─────────────────────────────────────────────────────────────────────────┘
```

### How They Feed Each Other

| From → To | Data Flow |
|-----------|-----------|
| **Planner → Community** | When a user generates & completes a trip, it seeds their community profile, unlocks quests for that destination |
| **Community → Planner** | Completed quests, vlogs, reviews, and ratings from the community become *real experience data* that the AI uses for future itineraries |
| **Data Engine → Community** | The scraped corpus (hidden gems, local tips, vendor intel) powers the quest content — "Find this secret café that only 3 Reddit posts mentioned" |
| **Community → Data Engine** | User-submitted content (verified vlogs, reviews, photos) becomes the *highest-confidence* data in the corpus |

---

## 3. Community Pillar — The Big Idea

### One-Line Pitch

> **A gamified travel social network where every trip is a quest, every experience is an achievement, and every traveler has a story worth telling.**

### The Experience in 60 Seconds

1. You open Velosta, plan a 5-day trip to Goa with your friends using the AI planner
2. The moment you land, your phone lights up: **"Welcome to Goa! 🌴 Your adventure begins."**
3. You see a quest board: **"The Goa Conqueror"** — 12 tasks across 5 days
4. Task 1: *"Find the fisherman's café that serves the best prawn curry in Palolem — no Google Maps, ask a local and prove it with a photo"*
5. You and your friends wander, ask around, find a tiny shack — the prawns are insane
6. You snap a photo, upload it → ✅ **Quest Complete! +150 XP, "Local Explorer" badge progress**
7. Task 5: *"Watch the sunset from the secret cliff north of Anjuna — the one the vlogs don't show"*
8. You hike there, catch the sunset, record a 30-second vlog → ✅ **+200 XP, "Golden Hour Hunter" badge**
9. Day 3: A notification: *"A group of solo travelers is meeting at Chapora Fort tonight for a bonfire. 4 spots left."*
10. You join. You meet people from 3 countries. The night becomes the highlight of your trip.
11. Day 5: You complete 9/12 quests → **"Goa Explorer — Silver Tier"** unlocked
12. Back home: Velosta compiles your photos, vlogs, quest completions, and route into a **cinematic trip recap** — a shareable story, a photobook-ready album, and a permanent chapter in your traveler profile

**That's Velosta Community.**

---

## 4. Core Concept: Quests & Gamification

### Philosophy

Quests are NOT scavenger hunts or tourist checklists. They are **carefully crafted experiences** that, by completing them, the traveler *genuinely experiences the soul of the city*. The quest design should feel like being given a secret guide by a local friend who's lived there for 20 years.

### Quest Design Principles

| Principle | Description | Example |
|-----------|-------------|---------|
| **Serendipity First** | Quests should create "accidents" that lead to genuine discovery | "Take the third left after the fish market and eat whatever the first stall serves you" |
| **Anti-Tourist** | Push travelers away from the Instagram spots toward the real city | "Skip the Basilica queue. Walk 200m east to the chapel with no sign — the frescoes are better" |
| **Social Catalyst** | Many quests require human interaction — talking to locals, joining groups | "Learn one sentence in Konkani from a local fisher. Record yourself saying it." |
| **Sensory** | Engage all senses, not just sight | "Find the bakery that makes pão at 5AM. The smell will guide you." |
| **Time-Aware** | Some quests only work at specific times — golden hour, dawn, market hours | "Be at Divar Island jetty at 6:15 AM. The mist rising off the Mandovi is a 10-minute window." |
| **Progressive** | Later quests build on earlier ones — meet someone in Q2, invite them to Q7 | Chain quests that create a narrative arc across the trip |
| **Effortless** | Quests shouldn't feel like homework — they should feel like a movie heist | The *doing* should be the fun part, not the reporting |

### Quest Categories

```
┌─────────────────────────────────────────────────────────┐
│                    QUEST CATEGORIES                      │
│                                                         │
│  🍽️  TASTE         — Food & drink discoveries           │
│  🌅  GOLDEN HOUR    — Sunrise/sunset/light moments      │
│  🏃  ADVENTURE      — Physical challenges, off-trail    │
│  🗣️  CONNECT        — Human interactions, local bonds   │
│  📸  CAPTURE        — Photography/videography missions  │
│  🔍  HIDDEN         — Secret spots, off-map treasures   │
│  🎭  CULTURE        — Rituals, arts, heritage deep-dive │
│  🌙  AFTER DARK     — Nightlife, bonfires, stargazing   │
│  🧘  STILLNESS      — Meditation, nature, slow moments  │
│  🎲  WILDCARD       — Unpredictable, random, chaotic    │
└─────────────────────────────────────────────────────────┘
```

### Quest Structure (Data Model)

```typescript
interface Quest {
  id: string;                          // unique quest identifier
  cityId: string;                      // which city/destination
  
  // Content
  title: string;                       // "The Fisherman's Feast"
  description: string;                 // narrative description, reads like a story
  hint: string;                        // optional cryptic clue
  category: QuestCategory;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  
  // Requirements
  timeWindow?: {                       // when this quest is available
    startHour: number;
    endHour: number;
    seasons?: string[];                // "monsoon", "winter", etc.
  };
  prerequisites?: string[];            // quest IDs that must be completed first
  groupSize?: {
    min: number;
    max: number;
  };
  
  // Verification
  verificationType: 'photo' | 'video' | 'checkin' | 'vlog' | 'peer' | 'auto';
  verificationPrompt: string;         // "Upload a photo of the dish with the stall in background"
  
  // Rewards
  xpReward: number;
  badgeProgress?: {                    // contributes to which badge
    badgeId: string;
    progress: number;
  };
  unlocks?: string[];                  // what this quest unlocks (events, quests, etc.)
  
  // Metadata
  estimatedDuration: number;           // minutes
  physicalIntensity: 'chill' | 'moderate' | 'intense';
  bestFor: TripType[];
  
  // Data provenance — where did this quest content come from
  sourceData: {
    dataEngineRecords: string[];       // record IDs from the scraping engine
    confidenceScore: number;           // how well-verified is the underlying info
    lastVerified: Date;
  };
  
  // Community stats
  completionCount: number;
  averageRating: number;
  topSubmissions: Submission[];        // best vlogs/photos from completers
}
```

---

## 5. Identity & Trust Layer

### Why Identity Matters

This isn't Instagram. This is a community where you might meet strangers at a bonfire, share a jeep to a remote waterfall, or join someone's midnight trek. **Safety is non-negotiable.**

### Verification Tiers

```
┌──────────────────────────────────────────────────────────────┐
│                     TRUST TIERS                              │
│                                                              │
│  TIER 1 — BASIC (can browse, view quests)                    │
│  ├── Email verified                                          │
│  └── Phone number verified                                   │
│                                                              │
│  TIER 2 — VERIFIED (can complete quests, earn rewards)       │
│  ├── Government ID uploaded (Aadhaar/Passport/DL)            │
│  ├── Selfie verification (liveness check)                    │
│  └── ID is encrypted, never displayed to other users         │
│                                                              │
│  TIER 3 — TRUSTED (can host meetups, create events)          │
│  ├── Tier 2 + 5 completed trips with quest activity          │
│  ├── Community rating ≥ 4.2/5 from 10+ interactions          │
│  └── No safety violations                                    │
│                                                              │
│  TIER 4 — AMBASSADOR (can curate quests, moderate)           │
│  ├── Tier 3 + 20 completed trips                             │
│  ├── 50+ quests completed across 5+ cities                   │
│  ├── Created 3+ events with positive feedback                │
│  └── Invited by existing ambassador or Velosta team          │
└──────────────────────────────────────────────────────────────┘
```

### Safety Mechanisms

| Mechanism | Implementation |
|-----------|---------------|
| **ID Verification** | Government ID upload with AI-powered document verification (DigiLocker API for India) |
| **Liveness Check** | Selfie match against ID photo using face recognition |
| **Emergency SOS** | In-app panic button → alerts Velosta team + shares live location with emergency contacts |
| **Event Check-in** | QR-based check-in at meetups; attendee list visible to organizer |
| **Report System** | 1-tap report with categories (harassment, no-show, unsafe behavior) |
| **Background Cooldown** | New accounts can't host events for 30 days + must complete 5 quests first |
| **Peer Rating** | After every meetup/group interaction, mutual ratings (private, anonymous) |
| **Blocklist** | Users can block others; blocked users can't see your meetups or profile |

---

## 6. Quest System — Deep Design

### Quest Board UI

When a user lands in a city (detected via geofence or manual check-in), their quest board activates:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   🏝️  GOA QUEST BOARD                                      │
│   ─────────────────────                                     │
│   "The Goa Conqueror" — 12 quests across your 5-day trip   │
│                                                             │
│   Progress: ████████░░░░ 4/12 complete                     │
│   XP Earned: 650 / 2,400                                   │
│                                                             │
│   ┌─────────────────────────────────────────────────┐      │
│   │ 🍽️ TASTE                                        │      │
│   │                                                  │      │
│   │ ✅ The Fisherman's Feast          +150 XP       │      │
│   │    "Find the prawn curry shack in Palolem..."   │      │
│   │                                                  │      │
│   │ 🔓 The Spice Trail               +200 XP       │      │
│   │    "Three spices. Three stalls. One story."     │      │
│   │                                                  │      │
│   │ 🔒 Feni & Fire (requires: Connect Quest #1)     │      │
│   │    Locked — complete a Connect quest first      │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
│   ┌─────────────────────────────────────────────────┐      │
│   │ 🌅 GOLDEN HOUR                                   │      │
│   │                                                  │      │
│   │ ✅ The Cliff Nobody Films         +200 XP       │      │
│   │ 🔓 The Mandovi Mist              +300 XP       │      │
│   │    ⏰ Available: 5:45 AM – 6:30 AM only        │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
│   [View All Categories]   [Today's Recommended]             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Quest Generation Pipeline

Quests are NOT manually written. They are **AI-generated from the data scraping engine's corpus**, then human-reviewed by Ambassadors:

```
Data Engine Corpus                AI Quest Generator              Ambassador Review
(hidden gems, local tips,   →   (Claude generates quest      →   (human curates,
 real experiences, vendor         narratives, sets difficulty,     rates quality,
 intel, Reddit tips)              assigns categories, creates      adjusts difficulty,
                                  verification criteria)           adds local flavor)
                                                                        ↓
                                                              Published Quest Library
```

**AI Quest Generation Prompt Template:**

```
You are a quest designer for Velosta, a gamified travel app. Given the following
verified data about {city}, create a quest that:

1. Leads the traveler to a genuine, memorable experience
2. Reads like a narrative — not an instruction manual
3. Requires real exploration, not just showing up
4. Can be verified with a photo, video, or check-in
5. Has the emotional quality of a scene from a movie

Data:
{data_engine_records}

Output a quest with: title, description (narrative), hint (cryptic clue), 
category, difficulty, time_window (if applicable), verification_type, 
verification_prompt, xp_reward, estimated_duration, and best_for trip types.
```

### Dynamic Quest Adaptation

- **Weather-Aware**: If it's raining, swap "Golden Hour" quests for "Monsoon Magic" variants
- **Crowd-Aware**: If a spot is trending (many check-ins), surface alternative quests
- **Time-Aware**: Evening quests unlock as the day progresses
- **Group-Aware**: Solo travelers get different quests than friend groups
- **Progress-Aware**: If a user has completed 3 food quests, nudge toward adventure/culture

---

## 7. Rewards & Achievement Engine

### XP System

| Action | XP Reward |
|--------|-----------|
| Complete an easy quest | 100–150 XP |
| Complete a medium quest | 200–300 XP |
| Complete a hard quest | 400–600 XP |
| Complete a legendary quest | 800–1,500 XP |
| Submit a vlog (approved) | 200 XP |
| Host a meetup (5+ attendees) | 500 XP |
| Get upvoted on a submission | 10 XP per vote |
| Complete a full city quest chain | 2x bonus on total |
| First to complete a new quest | "Pioneer" bonus +50% |

### Level System

```
Level  1 — Wanderer         (0 XP)
Level  5 — Explorer         (2,000 XP)
Level 10 — Adventurer       (8,000 XP)
Level 15 — Pathfinder       (20,000 XP)
Level 20 — Trailblazer      (40,000 XP)
Level 25 — Legend            (75,000 XP)
Level 30 — Velosta Elite     (120,000 XP)
```

### Badge System

Badges are NOT participation trophies. They represent **real accomplishment** and are displayed prominently on profiles.

```
┌──────────────────────────────────────────────────────────────────┐
│                        BADGE GALLERY                             │
│                                                                  │
│  🌅 Golden Hour Hunter     — 10 sunrise/sunset quests complete   │
│  🍽️ The Palate              — 20 food quests across 5+ cities    │
│  🏔️ Summit Seeker           — 5 mountain/trek legendary quests   │
│  🗣️ The Connector           — Attended 10 meetups, rating 4.5+   │
│  🔍 Off the Map             — 15 hidden gem quests               │
│  🌍 Continental              — Quests in 3+ countries             │
│  👑 City Conqueror: {City}  — Complete 80%+ of a city's quests   │
│  🎬 The Director            — 10 approved vlogs, avg 4+ rating    │
│  🌙 Night Owl               — 10 after-dark quests               │
│  ⚡ First Mover              — 5 "Pioneer" quest completions      │
│  🏆 Velosta OG              — Top 100 all-time by XP              │
│                                                                  │
│  🔒 SECRET BADGES (hidden until earned — creates surprise)       │
│  └── Criteria only revealed after unlocking                      │
└──────────────────────────────────────────────────────────────────┘
```

### Tangible Rewards

XP and badges are intrinsic motivators. But Velosta also offers **real-world rewards**:

| Reward | Requirement | Description |
|--------|-------------|-------------|
| **Exclusive Event Invites** | City Conqueror badge | Invited to Velosta-hosted parties/experiences in that city |
| **Velosta Merch Drops** | Level 15+ | Limited-edition travel gear (custom luggage tags, journals, etc.) |
| **Early Access** | Level 20+ | Beta access to new cities, features, quest chains |
| **Ambassador Program** | Level 25+ | Get paid to curate quests, host events, represent Velosta |
| **Partner Perks** | Any verified user | Discounts at Velosta-partnered vendors (from the data engine) |
| **Trip Sponsorships** | Velosta Elite | Fully/partially sponsored trips to create content for Velosta |

---

## 8. Social Layer — The Travel Social Network

### What This is NOT

- ❌ Not Instagram (no vanity metrics, no follower counts, no feed algorithm manipulation)
- ❌ Not Facebook Groups (no spam, no noise, no "where to eat in Goa???" posts)
- ❌ Not TripAdvisor (no review-bombing, no fake reviews, no anonymity)

### What This IS

- ✅ A **verified community** where every user has proven their identity
- ✅ A **quest-first feed** — content is organized by quests, not chronology
- ✅ A **quality-over-quantity** platform — fewer posts, but every post is a real experience
- ✅ A **trust network** — you can see who's verified, their quest history, their ratings

### Feed Design

The feed is NOT an infinite scroll of posts. It's organized by **active trips, quests, and meetups**:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   📍 HAPPENING NOW IN GOA                                   │
│   ─────────────────────                                     │
│                                                             │
│   ┌─────────────────────────────────────────────────┐      │
│   │ 🎯 Quest Completion                              │      │
│   │                                                  │      │
│   │ @rahul_travels completed "The Fisherman's Feast" │      │
│   │ 📸 [Photo of prawn curry + fishing boats]        │      │
│   │ "Asked 3 locals. All pointed to the same shack   │      │
│   │  behind the church. No sign. Best prawns ever."  │      │
│   │                                                  │      │
│   │ ❤️ 24  💬 5  🔗 Share quest                      │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
│   ┌─────────────────────────────────────────────────┐      │
│   │ 🤝 Meetup — Open Invite                         │      │
│   │                                                  │      │
│   │ Tonight @ 8PM — Chapora Fort Bonfire             │      │
│   │ Hosted by @priya (⭐ 4.8, 12 trips, Tier 3)     │      │
│   │ 3/8 spots remaining                              │      │
│   │                                                  │      │
│   │ [Join Meetup]    [View Host Profile]              │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
│   ┌─────────────────────────────────────────────────┐      │
│   │ 🎬 Vlog Submission                               │      │
│   │                                                  │      │
│   │ @wanderlust_squad submitted a vlog for            │      │
│   │ "The Mandovi Mist" quest                          │      │
│   │ 🎥 [0:45 vlog thumbnail — sunrise over river]    │      │
│   │                                                  │      │
│   │ ❤️ 67  💬 12  ⭐ 4.9                             │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Content Types

| Type | Description | Verification |
|------|-------------|-------------|
| **Quest Completion** | Photo/video proving quest was completed | AI + peer review |
| **Vlog** | 30s–3min video documenting an experience | Community rating |
| **Trip Story** | Multi-photo narrative of a day/trip | Self-published |
| **Meetup Recap** | Host/attendee summary of an event | Mutual ratings |
| **Tip** | Quick text tip about a city/spot | Community vote |
| **Review** | Review of a vendor/experience from the data engine | Verified purchase/visit |

---

## 9. Meetups & Events System

### Types of Events

```
┌───────────────────────────────────────────────────────────┐
│                     EVENT TYPES                           │
│                                                           │
│  🔥 COMMUNITY MEETUP (user-hosted)                        │
│  │  • Bonfires, group dinners, treks, city walks          │
│  │  • Hosted by Tier 3+ users                             │
│  │  • Max 20 attendees                                    │
│  │  • Free or split-cost                                  │
│                                                           │
│  🎉 VELOSTA EVENT (company-hosted)                        │
│  │  • Exclusive parties in partner venues                 │
│  │  • Invite-only (badge requirements)                    │
│  │  • Quarterly in major cities                           │
│  │  • Premium experiences (rooftop dinners, yacht trips)  │
│                                                           │
│  🏆 QUEST RALLIES (timed group competitions)              │
│  │  • Teams race to complete quest chains                 │
│  │  • City-wide, weekend-long events                      │
│  │  • Prizes for top teams                                │
│  │  • Creates viral, shareable content                    │
│                                                           │
│  🤝 GROUP ACTIVITIES (activity-based)                     │
│  │  • "Anyone want to do the sunrise trek tomorrow?"      │
│  │  • Spontaneous, lightweight, 2-6 people                │
│  │  • Match by quest interest + time availability         │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Event Data Model

```typescript
interface Event {
  id: string;
  type: 'community_meetup' | 'velosta_event' | 'quest_rally' | 'group_activity';
  
  // Host
  hostId: string;
  hostTier: TrustTier;
  
  // Details
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    name: string;
    address: string;
  };
  datetime: Date;
  duration: number;                    // minutes
  
  // Capacity
  maxAttendees: number;
  currentAttendees: string[];          // user IDs
  waitlist: string[];
  
  // Requirements
  minTrustTier: TrustTier;
  requiredBadges?: string[];           // for exclusive events
  costPerPerson?: number;              // 0 for free events
  costSplit: 'free' | 'split' | 'host_covers' | 'custom';
  
  // Safety
  checkInCode: string;                 // QR code for in-person verification
  emergencyContact: string;
  
  // Post-event
  ratings: EventRating[];
  photos: string[];
  recap?: string;
}
```

---

## 10. Trip Memory Engine — The Grand Finale

### The Problem with Current Trip Memories

After a trip:
- Photos rot in camera rolls (3,000 photos, 2,990 will never be seen again)
- Videos are too long to edit, too short to share
- The story of the trip is lost — you remember *what* you did but not *how it felt*
- There's no single artifact that captures the *entire journey*

### Velosta's Trip Memory Engine

At the end of every trip, Velosta automatically compiles everything the user generated during their quests, meetups, and explorations into a **polished, shareable, preservable trip artifact**:

```
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│   📖 YOUR GOA STORY                                           │
│   ─────────────────                                           │
│                                                               │
│   🗓️ March 12–16, 2026  •  Friends Trip  •  Silver Tier      │
│                                                               │
│   ┌─────────────────────────────────────────────────────┐    │
│   │        🎬 CINEMATIC RECAP VIDEO                      │    │
│   │                                                      │    │
│   │   AI-edited 60s highlight reel from your             │    │
│   │   quest vlogs, photos, and route data                │    │
│   │                                                      │    │
│   │   ▶ [Play]    📥 [Download]    🔗 [Share]            │    │
│   └─────────────────────────────────────────────────────┘    │
│                                                               │
│   ┌─────────────────────────────────────────────────────┐    │
│   │        📸 PHOTO BOOK                                 │    │
│   │                                                      │    │
│   │   Auto-curated best photos from each quest           │    │
│   │   Arranged chronologically with quest captions       │    │
│   │   Print-ready layout (order physical copy)           │    │
│   │                                                      │    │
│   │   📖 [View Book]    🖨️ [Order Print]                 │    │
│   └─────────────────────────────────────────────────────┘    │
│                                                               │
│   ┌─────────────────────────────────────────────────────┐    │
│   │        🗺️ JOURNEY MAP                                │    │
│   │                                                      │    │
│   │   Interactive 3D map showing your exact route,       │    │
│   │   every quest location, and timestamp                │    │
│   │   Replay your trip as an animated flyover            │    │
│   │                                                      │    │
│   │   🌍 [View Map]    🔗 [Share]                        │    │
│   └─────────────────────────────────────────────────────┘    │
│                                                               │
│   ┌─────────────────────────────────────────────────────┐    │
│   │        📊 TRIP STATS                                 │    │
│   │                                                      │    │
│   │   Quests Completed:  9/12 (Silver)                   │    │
│   │   XP Earned:         1,850                           │    │
│   │   Distance Covered:  127 km                          │    │
│   │   Cities Explored:   3 (North Goa, South Goa, Old)  │    │
│   │   People Met:        14 (3 at bonfire meetup)        │    │
│   │   Badges Earned:     🍽️ 🌅 🗣️                       │    │
│   │   Best Moment:       "The Mandovi Mist" (⭐ 4.9)    │    │
│   │                                                      │    │
│   └─────────────────────────────────────────────────────┘    │
│                                                               │
│   ┌─────────────────────────────────────────────────────┐    │
│   │        📱 SOCIAL CARDS                               │    │
│   │                                                      │    │
│   │   Pre-designed, directly-postable Instagram/         │    │
│   │   WhatsApp stories from your trip highlights         │    │
│   │                                                      │    │
│   │   [Card 1] [Card 2] [Card 3] [Card 4]               │    │
│   │   📥 [Download All]                                  │    │
│   └─────────────────────────────────────────────────────┘    │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Memory Generation Pipeline

```
User's Trip Data                   AI Processing                  Output Artifacts
──────────────                     ──────────────                  ────────────────
• Quest photos/vlogs         →    • Best-shot selection      →   • 60s recap video
• GPS route history          →    • Chronological ordering   →   • Photo book layout
• Quest completions          →    • Caption generation       →   • Journey map (3D)
• Meetup photos              →    • Music matching           →   • Trip statistics
• Badge/XP earned            →    • Social card design       →   • Social media cards
• Timestamps                 →    • Narrative writing        →   • Shareable link
```

---

## 11. User Profiles & Traveler Identity

### Profile Structure

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────┐                                                   │
│  │ PHOTO│   @priya_explores                                 │
│  └──────┘   Priya Sharma  •  Mumbai  •  Joined Jan 2025    │
│             Level 18 — Pathfinder                           │
│             ████████████████░░░░ 18,400 / 20,000 XP         │
│             ✅ Verified (Tier 3)                             │
│                                                             │
│   ─────────────────────────────────────────────────────     │
│                                                             │
│   🏆 BADGES                                                 │
│   [🌅] [🍽️] [🗣️] [🔍] [👑 Goa] [👑 Manali] [🌙]          │
│                                                             │
│   📊 STATS                                                  │
│   Trips: 14  •  Cities: 11  •  Quests: 87  •  Events: 9   │
│                                                             │
│   🗺️ TRAVEL MAP                                             │
│   [Interactive map showing all visited cities, colored      │
│    by completion level — gold for conquered, silver for     │
│    visited, outlined for planned]                           │
│                                                             │
│   📖 TRIP HISTORY                                           │
│   ┌─────────────────────────────────────┐                   │
│   │ 🏝️ Goa — Mar 2026 — Gold Tier       │                   │
│   │ 🏔️ Manali — Jan 2026 — Gold Tier    │                   │
│   │ 🕌 Jaipur — Nov 2025 — Silver Tier  │                   │
│   │ 🌊 Varkala — Sep 2025 — Bronze Tier │                   │
│   └─────────────────────────────────────┘                   │
│                                                             │
│   🎬 TOP VLOGS                                              │
│   [Vlog 1]  [Vlog 2]  [Vlog 3]                             │
│                                                             │
│   ⭐ COMMUNITY RATING: 4.7/5 (from 23 interactions)        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Leaderboards

| Leaderboard | Scope | Purpose |
|-------------|-------|---------|
| **City Leaderboard** | Per city | Who's conquered this city the most |
| **Weekly Active** | Global | Most XP earned this week |
| **All-Time** | Global | Total XP across all trips |
| **Quest Category** | Per category | Best food explorer, best sunset chaser, etc. |
| **Friends** | Social circle | Compare with your friend group |
| **Event Hosts** | Global | Most-loved event organizers |

---

## 12. Content Moderation & Safety

### Moderation Pipeline

```
User Submission (photo/video/text)
        │
        ▼
┌─────────────────┐
│ AI Auto-Review   │ ← NSFW detection, hate speech, spam, duplicate check
└────────┬────────┘
         │
    Pass? ─── No ──▶ Flagged for human review → Reject / Approve
         │
        Yes
         │
         ▼
┌─────────────────┐
│ Community Vote   │ ← First 5 viewers can flag; Ambassador review if flagged
└────────┬────────┘
         │
        Published
```

### Content Guidelines

- **No fake completions** — AI verifies photo/video matches quest requirements
- **No hate speech, harassment, or discriminatory content**
- **No commercial spam** — quest completions aren't ads
- **No location spoiling** — don't post exact GPS of hidden gems publicly (only to verified users)
- **Respect local culture** — no disrespectful content at religious/cultural sites
- **Privacy-first** — no photos of strangers without consent

---

## 13. Data Flow — How Community Feeds the Engine

This is the **flywheel** that makes Velosta unstoppable:

```
┌─────────────────────────────────────────────────────────────┐
│                    THE VELOSTA FLYWHEEL                      │
│                                                             │
│                    ┌─────────────┐                           │
│              ┌────▶│  DATA ENGINE │◀────┐                    │
│              │     │  (scraping)  │     │                    │
│              │     └──────┬──────┘     │                    │
│              │            │            │                    │
│              │            ▼            │                    │
│              │     ┌─────────────┐     │                    │
│              │     │  QUEST      │     │                    │
│              │     │  LIBRARY    │     │                    │
│              │     └──────┬──────┘     │                    │
│              │            │            │                    │
│              │            ▼            │                    │
│              │     ┌─────────────┐     │                    │
│      User    │     │  TRAVELERS  │     │  User-generated   │
│      content │     │  COMPLETE   │     │  content becomes  │
│      improves│     │  QUESTS     │     │  highest-quality  │
│      quest   │     └──────┬──────┘     │  data for engine  │
│      quality │            │            │                    │
│              │            ▼            │                    │
│              │     ┌─────────────┐     │                    │
│              └─────│  COMMUNITY  │─────┘                    │
│                    │  CONTENT    │                           │
│                    │  (vlogs,    │                           │
│                    │   photos,   │                           │
│                    │   reviews)  │                           │
│                    └─────────────┘                           │
│                                                             │
│  More users → Better data → Better quests → More users      │
└─────────────────────────────────────────────────────────────┘
```

### Community Data as Training Data

Every verified quest completion, vlog, and review feeds back into the data engine with the **highest confidence score possible** — because it's first-party, verified, source-linked, and timestamped. This means:

1. **AI itineraries get better over time** — they're trained on *real* Velosta user experiences
2. **Quest quality improves** — quests that get poor ratings are retired; ones that get great vlogs are promoted
3. **Hidden gems stay current** — a café that closed last month gets flagged by the next user
4. **Seasonal accuracy** — the engine learns that "Mandovi Mist" quest only works in winter

---

## 14. UI/UX Design System — Velosta DNA

### Design Continuity with Existing App

The community MUST feel like a natural extension of the Velosta travel planner. Same DNA, same soul.

### Design Tokens (from existing Velosta)

| Token | Value | Usage |
|-------|-------|-------|
| `--ivory` | `#F6F3EE` | Page backgrounds |
| `--sandstone` | `#D8C7B3` | Secondary surfaces, borders, dividers |
| `--warm-beige` | `#E8DFD2` | Cards, panels, quest board background |
| `--terracotta` | `#C4734F` | Primary accent — CTAs, active states, XP indicators |
| `--soft-gold` | `#C9A96E` | Badges, achievement highlights, premium elements |
| `--deep-charcoal` | `#2C2C2C` | Text, contrast elements |
| `--deep-navy` | `#2C3E50` | Headers, strong contrast |

### Community-Specific Additions

| Token | Value | Usage |
|-------|-------|-------|
| `--quest-active` | `#C4734F` | Active/available quests |
| `--quest-complete` | `#4A9B6E` | Completed quests (muted forest green) |
| `--quest-locked` | `#9B9B9B` | Locked quests |
| `--xp-glow` | `rgba(201, 169, 110, 0.4)` | XP earned animations |
| `--trust-verified` | `#4A9B6E` | Verified user indicators |
| `--event-live` | `#E85D3A` | Live/happening-now events |

### Glassmorphism Continuity

```css
/* Quest cards use the same glass-panel system */
.quest-card {
  background: rgba(253, 252, 250, 0.72);
  backdrop-filter: blur(40px) saturate(1.8);
  border: 1px solid rgba(216, 199, 179, 0.22);
  border-radius: 20px;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.6);
}

/* Badge glow effect */
.badge-earned {
  box-shadow: 0 0 20px rgba(201, 169, 110, 0.4);
  animation: badge-pulse 2s ease-in-out infinite;
}
```

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Section headers | DM Serif Display | Bold | 28–36px |
| Quest titles | DM Serif Display | Medium | 18–22px |
| Body text | Outfit / Inter | Regular | 14–16px |
| XP/Stats | Outfit | SemiBold | 12–14px |
| Badges | Outfit | Bold, uppercase | 10–12px, tracking 0.3em |

### Animation Principles

| Animation | Timing | Easing |
|-----------|--------|--------|
| Quest completion | 600ms | ease-out-expo (0.16, 1, 0.3, 1) |
| Badge unlock | 800ms with bounce | ease-spring (0.34, 1.56, 0.64, 1) |
| XP counter tick-up | 1200ms | ease-in-out |
| Card entrance | 300ms staggered | ease-out |
| Level-up celebration | 1500ms with particles | custom spring |

### Key UI Screens

1. **Community Home / Feed** — Filtered activity feed (quest completions, meetups, vlogs)
2. **Quest Board** — City-specific quest grid with categories, progress, and rewards
3. **Quest Detail** — Individual quest page with description, hints, past submissions, and submit button
4. **Profile** — Travel passport with stats, badges, trip history, map, and vlogs
5. **Leaderboard** — City, global, and friend rankings
6. **Events/Meetups** — Browse, join, host, and manage events
7. **Trip Memory** — Post-trip recap with video, photo book, stats, and social cards
8. **Notifications** — Quest unlocks, event invites, badge earned, nearby travelers

---

## 15. Technical Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                    VELOSTA COMMUNITY ARCHITECTURE                   │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    FRONTEND (Next.js 14)                      │  │
│  │                                                              │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │  │
│  │  │ Feed     │  │ Quest    │  │ Profile  │  │ Events   │    │  │
│  │  │ Module   │  │ Module   │  │ Module   │  │ Module   │    │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │  │
│  │  │ Memory   │  │ Leader-  │  │ Auth     │  │ Notif.   │    │  │
│  │  │ Engine   │  │ board    │  │ + ID     │  │ Center   │    │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                     │
│                              ▼                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    BACKEND (Node.js / Next API)               │  │
│  │                                                              │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │  │
│  │  │ Auth     │  │ Quest    │  │ Social   │  │ Memory   │    │  │
│  │  │ Service  │  │ Engine   │  │ Service  │  │ Service  │    │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │  │
│  │  │ Event    │  │ Reward   │  │ Mod.     │  │ Notif.   │    │  │
│  │  │ Service  │  │ Engine   │  │ Pipeline │  │ Service  │    │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                     │
│                              ▼                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    DATA LAYER                                 │  │
│  │                                                              │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │  │
│  │  │PostgreSQL│  │ Firebase │  │ Cloudflare│  │ Redis    │    │  │
│  │  │ + PostGIS│  │ Auth     │  │ R2/S3    │  │ Cache    │    │  │
│  │  │ (core DB)│  │ (users)  │  │ (media)  │  │ (live)   │    │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              │                                     │
│                              ▼                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    EXTERNAL SERVICES                          │  │
│  │                                                              │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │  │
│  │  │ OpenAI / │  │ Mapbox   │  │DigiLocker│  │ FCM /    │    │  │
│  │  │ Claude   │  │ GL JS    │  │ (ID ver.)│  │ APNs     │    │  │
│  │  │ (AI)     │  │ (maps)   │  │          │  │ (push)   │    │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │  │
│  └──────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| **Frontend** | Next.js 14 (App Router) + TypeScript | Consistency with existing Velosta app |
| **Styling** | Tailwind CSS + custom design tokens | Matches existing design system |
| **State** | Zustand | Already used in trip planner |
| **Maps** | Mapbox GL JS | Already integrated for trip planner |
| **Animations** | Framer Motion | Cinematic feel, already in the stack |
| **Auth** | Firebase Auth + custom ID verification | Social login + government ID layer |
| **Database** | PostgreSQL + PostGIS | Geospatial queries for nearby events/users |
| **Media Storage** | Cloudflare R2 or AWS S3 | Cost-effective for vlogs/photos |
| **Cache** | Redis | Real-time leaderboards, live event data |
| **AI** | OpenAI GPT-4 / Claude | Quest generation, content moderation, memory compilation |
| **Push Notifications** | FCM (Android) + APNs (iOS) | Event reminders, quest unlocks |
| **Real-time** | WebSocket (Socket.io or Supabase Realtime) | Live feed updates, event chat |

---

## 16. Database Schema

### Core Tables

```sql
-- Users & Identity
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  bio TEXT,
  home_city VARCHAR(100),
  trust_tier INTEGER DEFAULT 1,       -- 1=basic, 2=verified, 3=trusted, 4=ambassador
  id_verified BOOLEAN DEFAULT FALSE,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quests
CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  hint TEXT,
  category VARCHAR(50) NOT NULL,       -- taste, golden_hour, adventure, etc.
  difficulty VARCHAR(20) NOT NULL,     -- easy, medium, hard, legendary
  xp_reward INTEGER NOT NULL,
  verification_type VARCHAR(20) NOT NULL,
  verification_prompt TEXT,
  time_window_start INTEGER,           -- hour (0-23), null = anytime
  time_window_end INTEGER,
  seasons TEXT[],
  prerequisites UUID[],                -- quest IDs
  group_size_min INTEGER DEFAULT 1,
  group_size_max INTEGER DEFAULT 20,
  estimated_duration INTEGER,          -- minutes
  physical_intensity VARCHAR(20),
  best_for TEXT[],                     -- solo, couple, friends, family
  source_record_ids TEXT[],            -- links to data engine records
  confidence_score NUMERIC(3,2),
  completion_count INTEGER DEFAULT 0,
  average_rating NUMERIC(3,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quests_city ON quests(city_id);
CREATE INDEX idx_quests_category ON quests(category);

-- Quest Completions
CREATE TABLE quest_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  quest_id UUID REFERENCES quests(id),
  submission_type VARCHAR(20),         -- photo, video, checkin
  media_urls TEXT[],
  caption TEXT,
  rating NUMERIC(3,2),                 -- user's rating of the quest
  xp_earned INTEGER,
  verified BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_completions_user ON quest_completions(user_id);
CREATE INDEX idx_completions_quest ON quest_completions(quest_id);

-- Badges
CREATE TABLE badges (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(10),                    -- emoji
  category VARCHAR(50),
  requirement_type VARCHAR(50),        -- quest_count, category_count, city_count, etc.
  requirement_value INTEGER,
  requirement_details JSONB,           -- flexible criteria
  is_secret BOOLEAN DEFAULT FALSE
);

-- User Badges
CREATE TABLE user_badges (
  user_id UUID REFERENCES users(id),
  badge_id VARCHAR(50) REFERENCES badges(id),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- Events / Meetups
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES users(id),
  type VARCHAR(30) NOT NULL,           -- community_meetup, velosta_event, quest_rally, group_activity
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location GEOGRAPHY(POINT) NOT NULL,
  location_name VARCHAR(255),
  location_address TEXT,
  datetime TIMESTAMPTZ NOT NULL,
  duration INTEGER,                    -- minutes
  max_attendees INTEGER DEFAULT 20,
  min_trust_tier INTEGER DEFAULT 2,
  required_badges TEXT[],
  cost_per_person NUMERIC(10,2) DEFAULT 0,
  cost_split VARCHAR(20) DEFAULT 'free',
  check_in_code VARCHAR(20),
  city_id VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_city ON events(city_id);
CREATE INDEX idx_events_datetime ON events(datetime);
CREATE INDEX idx_events_location ON events USING GIST(location);

-- Event Attendees
CREATE TABLE event_attendees (
  event_id UUID REFERENCES events(id),
  user_id UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'registered',  -- registered, checked_in, cancelled, waitlisted
  rating NUMERIC(3,2),                      -- post-event rating
  feedback TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (event_id, user_id)
);

-- Trips
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  city_id VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  trip_type VARCHAR(20),               -- solo, couple, friends, family
  quest_tier VARCHAR(20),              -- bronze, silver, gold
  total_xp_earned INTEGER DEFAULT 0,
  quests_completed INTEGER DEFAULT 0,
  quests_available INTEGER DEFAULT 0,
  route_data JSONB,                    -- GPS route history
  memory_video_url TEXT,
  memory_photobook_url TEXT,
  is_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_trips_user ON trips(user_id);
CREATE INDEX idx_trips_city ON trips(city_id);

-- Feed / Social Posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(30) NOT NULL,           -- quest_completion, vlog, trip_story, meetup_recap, tip, review
  quest_completion_id UUID REFERENCES quest_completions(id),
  event_id UUID REFERENCES events(id),
  trip_id UUID REFERENCES trips(id),
  content TEXT,
  media_urls TEXT[],
  city_id VARCHAR(100),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_moderated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_user ON posts(user_id);
CREATE INDEX idx_posts_city ON posts(city_id);
CREATE INDEX idx_posts_type ON posts(type);

-- Leaderboard (materialized view, refreshed periodically)
CREATE MATERIALIZED VIEW leaderboard_global AS
SELECT 
  u.id,
  u.username,
  u.display_name,
  u.avatar_url,
  u.xp,
  u.level,
  COUNT(DISTINCT t.id) AS total_trips,
  COUNT(DISTINCT qc.id) AS total_quests,
  COUNT(DISTINCT t.city_id) AS cities_visited,
  RANK() OVER (ORDER BY u.xp DESC) AS global_rank
FROM users u
LEFT JOIN trips t ON t.user_id = u.id
LEFT JOIN quest_completions qc ON qc.user_id = u.id
GROUP BY u.id;
```

---

## 17. API Specification

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /api/auth/register` | POST | Create account (email + phone) |
| `POST /api/auth/verify-id` | POST | Upload government ID for verification |
| `POST /api/auth/liveness-check` | POST | Selfie verification |
| `GET /api/auth/profile` | GET | Get current user's profile |

### Quests

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /api/quests/:cityId` | GET | Get all quests for a city |
| `GET /api/quests/:cityId/board` | GET | Get personalized quest board (progress, unlocks) |
| `GET /api/quests/:questId` | GET | Get single quest detail with past submissions |
| `POST /api/quests/:questId/complete` | POST | Submit quest completion (media + caption) |
| `GET /api/quests/:questId/submissions` | GET | Browse quest submissions |

### Profile & Achievements

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /api/profile/:userId` | GET | Get user profile with stats, badges, trips |
| `GET /api/profile/:userId/trips` | GET | Get trip history |
| `GET /api/profile/:userId/badges` | GET | Get earned badges |
| `GET /api/leaderboard` | GET | Global leaderboard |
| `GET /api/leaderboard/:cityId` | GET | City-specific leaderboard |

### Events

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /api/events/:cityId` | GET | Browse events in a city |
| `POST /api/events` | POST | Create a new event (Tier 3+ only) |
| `POST /api/events/:eventId/join` | POST | Join an event |
| `POST /api/events/:eventId/checkin` | POST | Check in with QR code |
| `POST /api/events/:eventId/rate` | POST | Post-event rating |

### Feed

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /api/feed/:cityId` | GET | City-specific feed |
| `GET /api/feed/global` | GET | Global trending feed |
| `POST /api/posts` | POST | Create a post |
| `POST /api/posts/:postId/like` | POST | Like a post |
| `POST /api/posts/:postId/comment` | POST | Comment on a post |

### Trip Memory

| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /api/trips/:tripId/compile` | POST | Trigger memory compilation |
| `GET /api/trips/:tripId/memory` | GET | Get compiled trip memory artifacts |
| `GET /api/trips/:tripId/social-cards` | GET | Get generated social media cards |

---

## 18. Development Phases & Roadmap

### Phase 1 — Foundation (Weeks 1–4)

> **Goal**: Auth, profiles, and the quest system shell

- [ ] Set up Next.js community module within Velosta project
- [ ] Firebase Auth integration (email + Google + Apple sign-in)
- [ ] User profile page (stats, badges placeholder, trip history placeholder)
- [ ] Database schema (PostgreSQL) for users, quests, completions
- [ ] Quest board UI — city selection → quest grid → quest detail
- [ ] Quest completion flow — upload photo/video → submission review
- [ ] Basic XP system — earn XP on quest completion, level up
- [ ] Design system extension — community tokens, quest card components

### Phase 2 — Gamification & Social (Weeks 5–8)

> **Goal**: Badges, leaderboards, and the social feed

- [ ] Badge system — define initial badge set, track progress, unlock notifications
- [ ] Leaderboard — global, per-city, per-category, weekly
- [ ] Social feed — quest completions, vlogs, tips
- [ ] Like + comment system
- [ ] Content moderation pipeline (AI auto-review + community flagging)
- [ ] Push notifications — quest unlocks, badge earned, nearby events

### Phase 3 — Events & Meetups (Weeks 9–12)

> **Goal**: Real-world meetup system

- [ ] Event creation flow (Tier 3+ users)
- [ ] Event discovery — browse by city, type, date
- [ ] Event join + waitlist system
- [ ] QR check-in at events
- [ ] Post-event rating system
- [ ] Velosta-hosted event management (admin panel)
- [ ] Group activity matching (spontaneous "anyone want to..." flow)

### Phase 4 — Trust & Safety (Weeks 13–16)

> **Goal**: ID verification and safety features

- [ ] Government ID upload + AI verification
- [ ] Liveness check (selfie verification)
- [ ] Trust tier progression system
- [ ] Report system — categories, review queue, actions
- [ ] Emergency SOS feature
- [ ] Block/mute functionality
- [ ] Admin moderation dashboard

### Phase 5 — Trip Memory Engine (Weeks 17–20)

> **Goal**: Post-trip memory artifacts

- [ ] Trip tracking — automatic or manual trip start/end
- [ ] GPS route recording (opt-in)
- [ ] AI memory compilation — best photo selection, chronological ordering
- [ ] Cinematic recap video generation (AI-edited from user vlogs)
- [ ] Photo book layout generation
- [ ] 3D journey map (Mapbox animated flyover)
- [ ] Social media card generation
- [ ] Trip stats dashboard
- [ ] Shareable trip story link

### Phase 6 — Quest Intelligence (Weeks 21–24)

> **Goal**: AI-powered quest generation and adaptation

- [ ] Quest generation pipeline from data engine corpus
- [ ] Ambassador quest review/curation interface
- [ ] Dynamic quest adaptation (weather, time, crowd, group size)
- [ ] Quest chain system (multi-quest narratives)
- [ ] Seasonal quest variations
- [ ] Community quest suggestions
- [ ] Quest quality metrics and retirement system

### Phase 7 — Scale & Polish (Weeks 25–28)

> **Goal**: Performance, mobile experience, and viral features

- [ ] PWA support with offline quest access
- [ ] Performance optimization (lazy loading, CDN, caching)
- [ ] Mobile-first responsive polish
- [ ] Referral system (invite friends → bonus XP)
- [ ] Quest Rally system (team competitions)
- [ ] Partner vendor integration (discounts for quest completers)
- [ ] Analytics dashboard for growth metrics

---

## 19. Success Metrics

### User Engagement (30 days post-launch)

| Metric | Target |
|--------|--------|
| Weekly Active Users (WAU) | 5,000+ |
| Average quests completed per trip | 6+ |
| Quest completion rate (started → completed) | 60%+ |
| Event attendance rate (registered → checked in) | 70%+ |
| Profile completion rate | 80%+ |
| Content submissions per trip | 8+ (photos/vlogs) |

### Growth (90 days)

| Metric | Target |
|--------|--------|
| Verified users (Tier 2+) | 10,000+ |
| Cities with active quest boards | 25+ |
| Community-hosted events | 100+ |
| Trip memories generated | 2,000+ |
| User-generated content pieces | 50,000+ |

### Quality

| Metric | Target |
|--------|--------|
| Average quest rating | 4.3+/5 |
| Average event host rating | 4.5+/5 |
| Content moderation false positive rate | <5% |
| User retention (30-day) | 40%+ |
| NPS Score | 50+ |

---

## 20. Competitive Differentiation

| Competitor | What They Do | Why Velosta Wins |
|------------|-------------|-----------------|
| **TripAdvisor** | Reviews + booking | No gamification, no community, no quest system, anonymous reviews |
| **Strava** | Fitness gamification | Running-only, no travel quests, no meetup system |
| **Couchsurfing** | Traveler meetups | Safety concerns, no gamification, no trip planning |
| **Wanderlog** | Trip planning | No community, no quests, no social layer |
| **Polarsteps** | Trip tracking | Passive tracking only — no quests, no achievements, no community |
| **MakeMyTrip** | Booking platform | Zero experiential focus — it's a shopping cart, not an adventure |

### Velosta's Unique Moat

1. **Data Engine** — No one else has a scraping engine that builds a god-level corpus of real experiences per city
2. **Quest Intelligence** — AI-generated quests from verified data, not generic sightseeing lists
3. **Verified Community** — ID-verified users make meetups safe, reviews trustworthy
4. **Flywheel Effect** — Community content feeds the data engine feeds the quest library feeds community engagement
5. **Trip Memory** — No app turns your trip into a polished, shareable story automatically
6. **Full Stack** — Plan → Experience → Remember → Share — all in one app

---

## Appendix A — Quest Examples

### Goa — "The Fisherman's Feast" (Easy, Taste)

> **Description**: The best prawn curry in Palolem isn't on Google Maps. It's in a shack behind the Church of the Holy Cross, run by a fisherman who only cooks what he caught that morning. No sign. No reviews. Just follow the smell of kokum and coconut.
>
> **Hint**: "Walk past the church. Turn at the banyan tree. Listen for the radio."
>
> **Verification**: Upload a photo of the dish with the stall visible in the background.
>
> **XP**: 150 | **Duration**: 45 min | **Intensity**: Chill

### Manali — "The Forgotten Temple" (Hard, Hidden)

> **Description**: Above Old Manali, past the last guesthouse, there's a trail that locals use to reach a 400-year-old wooden temple. No tourist has written about it. The carvings depict a story that the village elder will tell you — if you ask in Hindi.
>
> **Hint**: "The trail begins where the concrete ends."
>
> **Verification**: Upload a 30s video of the temple carvings.
>
> **XP**: 500 | **Duration**: 3 hours | **Intensity**: Intense

### Jaipur — "The Blue Hour" (Medium, Golden Hour)

> **Description**: Everyone photographs Hawa Mahal at golden hour. But the real magic is at 5:50 AM, when the first light hits the pink sandstone and the street below is completely empty — no cars, no tourists, just pigeons and chai vendors setting up.
>
> **Hint**: "Be there before the first autorickshaw."
>
> **Verification**: Upload a photo showing the empty street with morning light on the façade.
>
> **XP**: 250 | **Duration**: 30 min | **Intensity**: Chill

---

## Appendix B — File Structure (Proposed)

```
Velosta/
├── app/
│   ├── page.tsx                    # existing trip planner
│   ├── community/
│   │   ├── page.tsx                # community home / feed
│   │   ├── quests/
│   │   │   ├── page.tsx            # quest board (city selection)
│   │   │   └── [questId]/
│   │   │       └── page.tsx        # individual quest detail
│   │   ├── profile/
│   │   │   ├── page.tsx            # current user profile
│   │   │   └── [userId]/
│   │   │       └── page.tsx        # other user profile
│   │   ├── events/
│   │   │   ├── page.tsx            # event discovery
│   │   │   ├── create/
│   │   │   │   └── page.tsx        # create event
│   │   │   └── [eventId]/
│   │   │       └── page.tsx        # event detail
│   │   ├── leaderboard/
│   │   │   └── page.tsx            # leaderboards
│   │   └── trip/
│   │       └── [tripId]/
│   │           └── memory/
│   │               └── page.tsx    # trip memory recap
│   ├── api/
│   │   ├── auth/                   # auth endpoints
│   │   ├── quests/                 # quest endpoints
│   │   ├── events/                 # event endpoints
│   │   ├── feed/                   # feed endpoints
│   │   ├── profile/                # profile endpoints
│   │   └── trips/                  # trip memory endpoints
│   └── ...
├── components/
│   ├── community/
│   │   ├── QuestBoard.tsx
│   │   ├── QuestCard.tsx
│   │   ├── QuestDetail.tsx
│   │   ├── QuestSubmission.tsx
│   │   ├── ProfileCard.tsx
│   │   ├── TravelerProfile.tsx
│   │   ├── BadgeGrid.tsx
│   │   ├── BadgeUnlockAnimation.tsx
│   │   ├── LeaderboardTable.tsx
│   │   ├── EventCard.tsx
│   │   ├── EventCreator.tsx
│   │   ├── FeedPost.tsx
│   │   ├── FeedFilter.tsx
│   │   ├── TripMemory.tsx
│   │   ├── TripStats.tsx
│   │   ├── XPBar.tsx
│   │   ├── LevelUpModal.tsx
│   │   └── SocialCard.tsx
│   └── ...
├── lib/
│   ├── community/
│   │   ├── types.ts                # all community TypeScript interfaces
│   │   ├── store.ts                # Zustand store for community state
│   │   ├── quest-engine.ts         # quest generation + adaptation logic
│   │   ├── reward-engine.ts        # XP calculation, badge checking, level-up
│   │   ├── memory-engine.ts        # trip memory compilation logic
│   │   └── moderation.ts           # content moderation utilities
│   └── ...
├── community/                      # THIS FOLDER (vision docs)
│   ├── COMMUNITY_VISION.md         # this document
│   └── QUEST_EXAMPLES.md           # expanded quest library (future)
└── ...
```

---

*Velosta Community — Where every trip becomes a legend.*
