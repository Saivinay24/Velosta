# Velosta Community — Build Session Prompt

Copy everything below the line and paste it as a `/goal` in a new Antigravity session.

---

## PERMISSIONS SETUP (do this FIRST before any code)

Before writing any code, request and obtain all of these permissions at once so the session runs uninterrupted:

- **write_file** for `/Users/saivinay/Velosta` (the full project directory — covers all new files)
- **read_file** for `/Users/saivinay/Velosta` (read any existing file in the project)
- **read_file** for `/Users/saivinay/data-scraping` (reference the data engine for context)
- **command** permissions for: `npm`, `npx`, `node`, `git`, `cat`, `ls`, `wc`, `head`, `tail`, `grep`, `find`, `mkdir`, `cp`, `echo`, `touch`, `sort`, `diff`

Do NOT request or run any destructive commands (`rm`, `sudo`, `chmod`, `mv`, `curl`, `wget`). If you need to overwrite a file, use the write_file tool with Overwrite=true.

---

## TASK: Build the Velosta Community Prototype

### What to build

Read `/Users/saivinay/Velosta/community/COMMUNITY_VISION.md` — that is the complete vision document. Build the ENTIRE community feature as a working prototype integrated into the existing Next.js 14 app at `/Users/saivinay/Velosta`.

### Critical rules

1. **Use the existing design system EXACTLY.** Read these files first to understand the visual DNA:
   - `/Users/saivinay/Velosta/app/globals.css` — all design tokens, glassmorphism classes, animations
   - `/Users/saivinay/Velosta/tailwind.config.js` — extended theme tokens
   - `/Users/saivinay/Velosta/PRODUCT_VISION.md` — visual design system description
   - `/Users/saivinay/Velosta/components/BudgetFilter.tsx` — reference for animation patterns, glass panels, typography

2. **The community pages MUST feel like the same app as the trip planner.** Same ivory/sandstone/terracotta/gold palette. Same glassmorphism. Same DM Serif Display + Outfit typography. Same Framer Motion animation patterns. Same warm, editorial, Apple-like feel. If the community section looks like a different app, you have FAILED.

3. **ALL data is mock/placeholder.** Use the exact same pattern as `lib/data.ts` — hardcoded arrays of typed objects. No real database. No real API calls. No real auth. Everything is simulated with realistic-looking mock data.

4. **No real auth/login.** Simulate a logged-in user with a hardcoded mock user object. Skip Firebase, skip ID verification. Just show the UI as if a user is already logged in.

5. **No real media uploads.** Quest completion forms should exist and look beautiful but use placeholder images. Use generated images or solid color placeholders.

6. **Must build and run without errors.** After building, run `npm run build` to verify zero errors. Then run `npm run dev` so I can see it live.

### Pages to build (all under `app/community/`)

Build ALL of these pages with full UI, animations, and mock data:

1. **Community Home / Feed** (`app/community/page.tsx`)
   - Filtered activity feed showing quest completions, vlog submissions, meetup announcements
   - City filter tabs at top
   - Glass panel post cards with likes, comments counts
   - "Happening Now" section for active events

2. **Quest Board** (`app/community/quests/page.tsx`)
   - City selection (dropdown or tabs — use 4-5 Indian cities from the existing data)
   - Quest grid organized by category (Taste, Golden Hour, Adventure, Connect, Hidden, Culture, etc.)
   - Each quest card shows: title, category icon, difficulty, XP reward, completion count
   - Progress bar showing overall city completion
   - Quest cards use glass-panel styling with category-colored accents

3. **Quest Detail** (`app/community/quests/[questId]/page.tsx`)
   - Full quest narrative (description, hint, verification prompt)
   - Past submissions gallery (mock photos with usernames)
   - "Complete Quest" CTA button
   - Quest stats (completion count, average rating)
   - Related quests sidebar

4. **User Profile** (`app/community/profile/page.tsx`)
   - Avatar, username, level, XP progress bar
   - Trust tier badge (Verified ✅)
   - Badge gallery grid (earned badges with glow, unearned badges greyed out)
   - Stats row: Trips, Cities, Quests Completed, Events Attended
   - Travel map (use Mapbox — show visited cities as colored pins on India map)
   - Trip history list (glass cards with city, date, quest tier achieved)
   - Top vlogs section (placeholder thumbnails)

5. **Leaderboard** (`app/community/leaderboard/page.tsx`)
   - Tab navigation: Global / City / Weekly / Friends
   - Ranked user cards with: rank, avatar, name, level, XP, badges, trips
   - Top 3 highlighted with gold/silver/bronze styling
   - Current user's position highlighted

6. **Events / Meetups** (`app/community/events/page.tsx`)
   - Browse events by city
   - Event cards showing: title, host info (avatar, name, rating, trust tier), date/time, location, spots remaining, cost
   - Event type badges (Community Meetup, Velosta Event, Quest Rally, Group Activity)
   - "Create Event" CTA (for the UI — doesn't need to actually work)

7. **Event Detail** (`app/community/events/[eventId]/page.tsx`)
   - Full event info with map pin showing location
   - Host profile card
   - Attendee list (avatars)
   - "Join Event" / "Leave Waitlist" buttons
   - Safety info section

8. **Trip Memory** (`app/community/trip/[tripId]/memory/page.tsx`)
   - Cinematic trip recap header (city name, dates, quest tier badge)
   - "Recap Video" section (placeholder video player with play button)
   - Photo book carousel (placeholder images in a horizontal scroll)
   - 3D Journey Map (Mapbox with route line and quest markers)
   - Trip stats card (quests completed, XP earned, distance, people met, badges)
   - Social cards section (pre-designed shareable card thumbnails)
   - Download/Share CTAs

### Components to build (in `components/community/`)

- `QuestCard.tsx` — Glass panel quest card with category icon, difficulty, XP
- `QuestBoard.tsx` — Grid layout of quest cards grouped by category
- `BadgeGrid.tsx` — Grid of badge icons (earned = gold glow, unearned = greyed)
- `XPBar.tsx` — Animated XP progress bar with level indicator
- `LeaderboardRow.tsx` — Single leaderboard entry
- `EventCard.tsx` — Event preview card
- `FeedPost.tsx` — Social feed post card (quest completion, vlog, meetup)
- `TripStats.tsx` — Stats grid for trip memory page
- `ProfileHeader.tsx` — User profile header with avatar, name, level, trust badge
- `CommunityNav.tsx` — Navigation bar/sidebar for community pages (Feed, Quests, Events, Leaderboard, Profile)

### Data files to create (in `lib/community/`)

- `types.ts` — All TypeScript interfaces (Quest, Badge, Event, User, Trip, Post, etc.) as defined in the vision doc
- `data.ts` — All mock data: 15-20 quests across 3-4 cities, 10-15 mock users, 5-8 mock events, 10+ feed posts, badge definitions, a mock logged-in user with trip history
- `store.ts` — Zustand store for community state (selected city, active tab, quest filters, etc.)

### Quality bar

- Every page must have smooth Framer Motion entrance animations (staggered children, fade-in-up)
- Glass panel cards everywhere (use the existing `.glass-panel` classes)
- Warm color palette ONLY — ivory backgrounds, sandstone borders, terracotta accents, gold highlights
- Typography: DM Serif Display for headers, Outfit/Inter for body
- Responsive: must look good on mobile (stacked layouts)
- Navigation between all community pages must work via Next.js Link
- A community entry point must be accessible from the main app (add a nav link or button)

### DO NOT

- Do NOT modify the existing trip planner components (BudgetFilter, MapView, ItineraryBuilder)
- Do NOT set up real authentication, real databases, or real file uploads
- Do NOT use any colors outside the Velosta palette (no neon, no pure blue, no grey-heavy themes)
- Do NOT stop until every page listed above is built, renders correctly, and `npm run build` passes with zero errors
