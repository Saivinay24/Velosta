import type { Destination } from './types'

/**
 * 10 Famous destinations for college students from Bangalore.
 * All data is curated with real coordinates, costs, and tips.
 * Images use Unsplash with consistent sizing params.
 */
export const bangaloreDestinations: Destination[] = [
  {
    id: 'pondicherry-blr',
    name: 'Pondicherry',
    state: 'Tamil Nadu',
    location: { lat: 11.9416, lng: 79.8083 },
    budgetFit: 'perfect',
    tripDetails: {
      minDays: 2,
      maxDays: 4,
      estimatedCost: 4500,
      highlights: ['French Quarter walks', 'Auroville visit', 'Beach sunrise', 'Café hopping'],
      category: 'relaxation',
      bestFor: ['couple', 'friends', 'solo'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
    popularityScore: 92,
    pois: [
      {
        id: 'pon-blr-1', name: 'Promenade Beach', location: { lat: 11.934, lng: 79.8368 
        imageUrl: 'https://images.unsplash.com/photo-1590050751373-5035a8005e74?w=400&q=80',
      },
        type: 'sight', description: 'Iconic beachfront promenade with colonial-era buildings and sea breeze',
        estimatedCost: 0, estimatedDuration: 90, rating: 4.5,
        tips: ['Best at sunrise or post-sunset', 'Street food vendors nearby'],
      },
      {
        id: 'pon-blr-2', name: 'Auroville', location: { lat: 12.0069, lng: 79.8107 
        imageUrl: 'https://images.unsplash.com/photo-1621232050249-d29e4e15c797?w=400&q=80',
      },
        type: 'sight', description: 'Universal township with the golden Matrimandir sphere',
        estimatedCost: 0, estimatedDuration: 180, rating: 4.7,
        tips: ['Book Matrimandir pass online 3 days ahead', 'Rent a cycle to explore'],
      },
      {
        id: 'pon-blr-3', name: 'Café des Arts', location: { lat: 11.9339, lng: 79.8335 
        imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80',
      },
        type: 'food', description: 'Charming French-style café in White Town with Instagram-worthy interiors',
        estimatedCost: 400, estimatedDuration: 60, rating: 4.3,
        tips: ['Try the croissants and filter coffee', 'Peak hours: 10am-12pm'],
      },
      {
        id: 'pon-blr-4', name: 'Paradise Beach', location: { lat: 11.889, lng: 79.831 
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
      },
        type: 'activity', description: 'Secluded beach accessible by boat from Chunnambar',
        estimatedCost: 300, estimatedDuration: 180, rating: 4.6,
        tips: ['Boat from Chunnambar boathouse ₹300', 'Carry sunscreen and water'],
      },
      {
        id: 'pon-blr-5', name: 'Le Dupleix', location: { lat: 11.9345, lng: 79.834 
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
      },
        type: 'food', description: 'Heritage restaurant in a stunning colonial mansion',
        estimatedCost: 800, estimatedDuration: 90, rating: 4.4,
        tips: ['Try the French onion soup', 'Dinner reservations recommended on weekends'],
      },
      {
        id: 'pon-blr-6', name: 'Serenity Beach', location: { lat: 11.963, lng: 79.839 
        imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80',
      },
        type: 'activity', description: 'Surfing lessons and laid-back beach vibes',
        estimatedCost: 500, estimatedDuration: 120, rating: 4.5,
        tips: ['Surfing lessons available ₹500/hr', 'Less crowded than Rock Beach'],
      },
    ],
  },
  {
    id: 'goa-blr',
    name: 'Goa',
    state: 'Goa',
    location: { lat: 15.2993, lng: 74.124 },
    budgetFit: 'perfect',
    tripDetails: {
      minDays: 3,
      maxDays: 6,
      estimatedCost: 8000,
      highlights: ['Beach parties', 'Water sports', 'Flea markets', 'Nightlife'],
      category: 'relaxation',
      bestFor: ['friends', 'couple', 'solo'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    popularityScore: 96,
    pois: [
      {
        id: 'goa-blr-1', name: 'Baga Beach', location: { lat: 15.5554, lng: 73.7518 
        imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80',
      },
        type: 'activity', description: 'Vibrant beach with water sports, shacks, and nightlife',
        estimatedCost: 500, estimatedDuration: 180, rating: 4.4,
        tips: ['Parasailing ₹500, jet ski ₹800', 'Visit Tito\'s Lane at night'],
      },
      {
        id: 'goa-blr-2', name: 'Anjuna Flea Market', location: { lat: 15.5811, lng: 73.7424 
        imageUrl: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&q=80',
      },
        type: 'activity', description: 'Iconic Wednesday flea market with hippie vibes',
        estimatedCost: 500, estimatedDuration: 120, rating: 4.3,
        tips: ['Wednesday only', 'Bargain hard — start at 50% of asking price'],
      },
      {
        id: 'goa-blr-3', name: 'Dudhsagar Falls', location: { lat: 15.3144, lng: 74.3143 
        imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&q=80',
      },
        type: 'activity', description: 'Majestic 4-tier waterfall accessible by jeep safari',
        estimatedCost: 800, estimatedDuration: 360, rating: 4.8,
        tips: ['Jeep safari ₹800 from Mollem', 'Best Oct-Mar, carry change of clothes'],
      },
      {
        id: 'goa-blr-4', name: 'Palolem Beach', location: { lat: 15.01, lng: 74.023 
        imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80',
      },
        type: 'sight', description: 'Crescent-shaped beach perfect for swimming and kayaking',
        estimatedCost: 0, estimatedDuration: 180, rating: 4.7,
        tips: ['South Goa, calmer than North', 'Silent noise parties on Saturdays'],
      },
      {
        id: 'goa-blr-5', name: 'Basilica of Bom Jesus', location: { lat: 15.5009, lng: 73.9116 
        imageUrl: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=400&q=80',
      },
        type: 'sight', description: 'UNESCO World Heritage baroque church in Old Goa',
        estimatedCost: 0, estimatedDuration: 60, rating: 4.6,
        tips: ['Combine with Se Cathedral next door', 'No photography inside'],
      },
      {
        id: 'goa-blr-6', name: 'Thalassa Restaurant', location: { lat: 15.6019, lng: 73.7445 
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
      },
        type: 'food', description: 'Clifftop Greek restaurant with stunning sunset views',
        estimatedCost: 1200, estimatedDuration: 90, rating: 4.5,
        tips: ['Book sunset slot in advance', 'Try the mezze platter'],
      },
    ],
  },
  {
    id: 'coorg-blr',
    name: 'Coorg',
    state: 'Karnataka',
    location: { lat: 12.3375, lng: 75.8069 },
    budgetFit: 'perfect',
    tripDetails: {
      minDays: 2,
      maxDays: 4,
      estimatedCost: 5000,
      highlights: ['Coffee plantations', 'Abbey Falls', 'Misty mountains', 'River rafting'],
      category: 'nature',
      bestFor: ['couple', 'friends', 'family'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80',
    popularityScore: 88,
    pois: [
      {
        id: 'cor-blr-1', name: 'Abbey Falls', location: { lat: 12.4568, lng: 75.7183 
        imageUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&q=80',
      },
        type: 'sight', description: 'Beautiful waterfall surrounded by coffee and spice plantations',
        estimatedCost: 30, estimatedDuration: 60, rating: 4.4,
        tips: ['Best during monsoon for full flow', '10 min walk from parking'],
      },
      {
        id: 'cor-blr-2', name: 'Raja Seat', location: { lat: 12.421, lng: 75.7342 
        imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80',
      },
        type: 'sight', description: 'Panoramic viewpoint where Kodava kings watched sunsets',
        estimatedCost: 10, estimatedDuration: 45, rating: 4.2,
        tips: ['Best at sunset', 'Musical fountain in evening'],
      },
      {
        id: 'cor-blr-3', name: 'Coffee Plantation Walk', location: { lat: 12.42, lng: 75.74 
        imageUrl: 'https://images.unsplash.com/photo-1610312278520-bcc893a3ff1d?w=400&q=80',
      },
        type: 'activity', description: 'Guided tour through aromatic Coorg coffee estates',
        estimatedCost: 300, estimatedDuration: 120, rating: 4.6,
        tips: ['Morning tours are cooler', 'Buy fresh ground coffee to take home'],
      },
      {
        id: 'cor-blr-4', name: 'Dubare Elephant Camp', location: { lat: 12.4242, lng: 75.8883 
        imageUrl: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=400&q=80',
      },
        type: 'activity', description: 'Interact with elephants — bathing and feeding experience',
        estimatedCost: 350, estimatedDuration: 120, rating: 4.5,
        tips: ['Morning slot 9-11am is best', 'Cross river by coracle boat'],
      },
      {
        id: 'cor-blr-5', name: 'Nisargadhama Island', location: { lat: 12.4258, lng: 75.8797 
        imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
      },
        type: 'sight', description: 'Beautiful island surrounded by Kaveri river with bamboo cottages',
        estimatedCost: 50, estimatedDuration: 90, rating: 4.3,
        tips: ['Rope bridge to enter', 'Great for photography'],
      },
    ],
  },
  {
    id: 'hampi-blr',
    name: 'Hampi',
    state: 'Karnataka',
    location: { lat: 15.335, lng: 76.46 },
    budgetFit: 'perfect',
    tripDetails: {
      minDays: 2,
      maxDays: 4,
      estimatedCost: 3500,
      highlights: ['Ancient ruins', 'Boulder landscapes', 'Virupaksha Temple', 'Coracle rides'],
      category: 'culture',
      bestFor: ['solo', 'friends', 'couple'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80',
    popularityScore: 85,
    pois: [
      {
        id: 'ham-blr-1', name: 'Virupaksha Temple', location: { lat: 15.335, lng: 76.4598 
        imageUrl: 'https://images.unsplash.com/photo-1600100397608-e1f2d0944940?w=400&q=80',
      },
        type: 'sight', description: 'Ancient Shiva temple, still active with 7th-century origins',
        estimatedCost: 25, estimatedDuration: 90, rating: 4.8,
        tips: ['Visit at dawn for best light', 'Watch out for cheeky monkeys'],
      },
      {
        id: 'ham-blr-2', name: 'Vijaya Vittala Temple', location: { lat: 15.345, lng: 76.475 
        imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400&q=80',
      },
        type: 'sight', description: 'Famous stone chariot and musical pillars',
        estimatedCost: 50, estimatedDuration: 120, rating: 4.9,
        tips: ['Hire a guide ₹500', 'Wear comfortable walking shoes'],
      },
      {
        id: 'ham-blr-3', name: 'Matanga Hill Sunrise', location: { lat: 15.338, lng: 76.466 
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
      },
        type: 'activity', description: 'Trek up for the most epic sunrise panorama of Hampi ruins',
        estimatedCost: 0, estimatedDuration: 90, rating: 4.7,
        tips: ['Start climb 30 min before sunrise', 'Carry a flashlight and water'],
      },
      {
        id: 'ham-blr-4', name: 'Coracle Ride', location: { lat: 15.341, lng: 76.458 
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
      },
        type: 'activity', description: 'Traditional round boat ride on Tungabhadra river',
        estimatedCost: 150, estimatedDuration: 30, rating: 4.5,
        tips: ['Negotiate price beforehand', 'More fun in a group'],
      },
      {
        id: 'ham-blr-5', name: 'Mango Tree Restaurant', location: { lat: 15.3355, lng: 76.4605 
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
      },
        type: 'food', description: 'Legendary riverside restaurant with boulder views',
        estimatedCost: 250, estimatedDuration: 60, rating: 4.2,
        tips: ['Try the thali for ₹150', 'Sit on the riverside floor seating'],
      },
    ],
  },
  {
    id: 'wayanad-blr',
    name: 'Wayanad',
    state: 'Kerala',
    location: { lat: 11.6854, lng: 76.1320 },
    budgetFit: 'perfect',
    tripDetails: {
      minDays: 2,
      maxDays: 4,
      estimatedCost: 5500,
      highlights: ['Edakkal Caves', 'Bamboo rafting', 'Treehouse stays', 'Spice gardens'],
      category: 'nature',
      bestFor: ['friends', 'couple', 'family'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    popularityScore: 83,
    pois: [
      {
        id: 'way-blr-1', name: 'Edakkal Caves', location: { lat: 11.6287, lng: 76.2256 
        imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80',
      },
        type: 'sight', description: 'Prehistoric rock art caves with 6000-year-old petroglyphs',
        estimatedCost: 40, estimatedDuration: 120, rating: 4.6,
        tips: ['Moderate trek uphill', 'Carry water and wear shoes'],
      },
      {
        id: 'way-blr-2', name: 'Banasura Sagar Dam', location: { lat: 11.6706, lng: 76.0431 
        imageUrl: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba0866?w=400&q=80',
      },
        type: 'sight', description: 'India\'s largest earth dam with emerald waters and islands',
        estimatedCost: 50, estimatedDuration: 90, rating: 4.4,
        tips: ['Speed boating ₹500', 'Beautiful views from top'],
      },
      {
        id: 'way-blr-3', name: 'Bamboo Rafting at Kuruva Island', location: { lat: 11.7553, lng: 76.0816 
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
      },
        type: 'activity', description: 'Bamboo raft ride to an uninhabited river island',
        estimatedCost: 400, estimatedDuration: 120, rating: 4.5,
        tips: ['Best Oct-May', 'Closed during heavy monsoon'],
      },
      {
        id: 'way-blr-4', name: 'Chembra Peak', location: { lat: 11.5932, lng: 76.0829 
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
      },
        type: 'activity', description: 'Heart-shaped lake trek — highest peak in Wayanad',
        estimatedCost: 750, estimatedDuration: 300, rating: 4.7,
        tips: ['Book permit in advance', '8km trek, moderate-hard difficulty'],
      },
      {
        id: 'way-blr-5', name: 'Wayanad Spice Garden', location: { lat: 11.62, lng: 76.08 
        imageUrl: 'https://images.unsplash.com/photo-1610312278520-bcc893a3ff1d?w=400&q=80',
      },
        type: 'sight', description: 'Walk through organic spice plantations with guide',
        estimatedCost: 200, estimatedDuration: 60, rating: 4.2,
        tips: ['Buy fresh spices at plantation rate', 'Learn about pepper, cardamom, vanilla'],
      },
    ],
  },
  {
    id: 'ooty-blr',
    name: 'Ooty',
    state: 'Tamil Nadu',
    location: { lat: 11.4102, lng: 76.6950 },
    budgetFit: 'perfect',
    tripDetails: {
      minDays: 2,
      maxDays: 4,
      estimatedCost: 5000,
      highlights: ['Toy train ride', 'Tea gardens', 'Botanical garden', 'Nilgiri hills'],
      category: 'nature',
      bestFor: ['couple', 'friends', 'family'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80',
    popularityScore: 87,
    pois: [
      {
        id: 'ooty-blr-1', name: 'Nilgiri Mountain Railway', location: { lat: 11.3459, lng: 76.7264 
        imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80',
      },
        type: 'activity', description: 'UNESCO toy train ride through 16 tunnels and 250 bridges',
        estimatedCost: 200, estimatedDuration: 300, rating: 4.8,
        tips: ['Book first class for window seats', 'Coonoor-Ooty stretch is most scenic'],
      },
      {
        id: 'ooty-blr-2', name: 'Tea Factory Visit', location: { lat: 11.3563, lng: 76.7589 
        imageUrl: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=400&q=80',
      },
        type: 'sight', description: 'Watch tea processing and taste fresh Nilgiri varieties',
        estimatedCost: 30, estimatedDuration: 60, rating: 4.4,
        tips: ['Buy tea directly from factory', 'Multiple factories on Coonoor Road'],
      },
      {
        id: 'ooty-blr-3', name: 'Botanical Garden', location: { lat: 11.4146, lng: 76.6983 
        imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80',
      },
        type: 'sight', description: '55-acre garden with over 1000 plant species and 20M-year-old tree fossil',
        estimatedCost: 30, estimatedDuration: 90, rating: 4.3,
        tips: ['Visit during flower show (May)', 'Carry a jacket — gets cold'],
      },
      {
        id: 'ooty-blr-4', name: 'Doddabetta Peak', location: { lat: 11.401, lng: 76.736 
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
      },
        type: 'sight', description: 'Highest peak in Nilgiris at 2,637m with telescope house',
        estimatedCost: 10, estimatedDuration: 60, rating: 4.5,
        tips: ['Go early for clear views', 'Gets foggy post 11am'],
      },
      {
        id: 'ooty-blr-5', name: 'Ooty Lake Boating', location: { lat: 11.41, lng: 76.688 
        imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80',
      },
        type: 'activity', description: 'Pedal boating on a scenic hill station lake with gardens',
        estimatedCost: 200, estimatedDuration: 45, rating: 4.0,
        tips: ['2-seater pedal boat ₹200/30min', 'Mini train ride for kids nearby'],
      },
    ],
  },
  {
    id: 'chikmagalur-blr',
    name: 'Chikmagalur',
    state: 'Karnataka',
    location: { lat: 13.3161, lng: 75.7720 },
    budgetFit: 'perfect',
    tripDetails: {
      minDays: 2,
      maxDays: 3,
      estimatedCost: 4000,
      highlights: ['Mullayanagiri trek', 'Coffee trails', 'Misty waterfalls', 'Homestay life'],
      category: 'adventure',
      bestFor: ['friends', 'solo', 'couple'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    popularityScore: 86,
    pois: [
      {
        id: 'chk-blr-1', name: 'Mullayanagiri Peak', location: { lat: 13.3924, lng: 75.7174 
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
      },
        type: 'activity', description: 'Highest peak in Karnataka at 1,930m — stunning sunrise trek',
        estimatedCost: 0, estimatedDuration: 180, rating: 4.7,
        tips: ['Start at 4:30am for sunrise', 'Carry warm clothes and water'],
      },
      {
        id: 'chk-blr-2', name: 'Baba Budangiri', location: { lat: 13.3875, lng: 75.7529 
        imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=80',
      },
        type: 'sight', description: 'Sacred mountain where Indian coffee history began',
        estimatedCost: 0, estimatedDuration: 120, rating: 4.5,
        tips: ['Birthplace of Indian coffee', 'Beautiful drive through misty roads'],
      },
      {
        id: 'chk-blr-3', name: 'Hebbe Falls', location: { lat: 13.3983, lng: 75.6375 
        imageUrl: 'https://images.unsplash.com/photo-1474291103559-f48a79787b6b?w=400&q=80',
      },
        type: 'sight', description: '168m waterfall in dense forest — requires jeep ride',
        estimatedCost: 500, estimatedDuration: 180, rating: 4.6,
        tips: ['Jeep ride ₹500 from Z-point', 'Swimming allowed at base pool'],
      },
      {
        id: 'chk-blr-4', name: 'Coffee Estate Homestay', location: { lat: 13.32, lng: 75.78 
        imageUrl: 'https://images.unsplash.com/photo-1610312278520-bcc893a3ff1d?w=400&q=80',
      },
        type: 'accommodation', description: 'Wake up to birds and coffee — authentic plantation stay',
        estimatedCost: 1200, estimatedDuration: 720, rating: 4.6,
        tips: ['Book on weekdays for better rates', 'Most include breakfast'],
      },
      {
        id: 'chk-blr-5', name: 'Z Point Sunset', location: { lat: 13.389, lng: 75.66 
        imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80',
      },
        type: 'sight', description: 'Dramatic cliff edge viewpoint overlooking Western Ghats valley',
        estimatedCost: 0, estimatedDuration: 60, rating: 4.4,
        tips: ['Best at sunset', 'Gets very windy — hold your belongings'],
      },
    ],
  },
  {
    id: 'gokarna-blr',
    name: 'Gokarna',
    state: 'Karnataka',
    location: { lat: 14.5479, lng: 74.3188 },
    budgetFit: 'perfect',
    tripDetails: {
      minDays: 2,
      maxDays: 4,
      estimatedCost: 4000,
      highlights: ['Beach trek', 'Om Beach', 'Cliff camping', 'Temple town vibes'],
      category: 'adventure',
      bestFor: ['friends', 'solo', 'couple'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    popularityScore: 84,
    pois: [
      {
        id: 'gok-blr-1', name: 'Om Beach', location: { lat: 14.5269, lng: 74.3132 
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
      },
        type: 'sight', description: 'OM-shaped beach with cafés, music, and laid-back backpacker vibes',
        estimatedCost: 0, estimatedDuration: 180, rating: 4.6,
        tips: ['Stay at Namaste Café for the vibe', 'Sunset from the rocks is magical'],
      },
      {
        id: 'gok-blr-2', name: 'Beach Trek (Gokarna to Om Beach)', location: { lat: 14.538, lng: 74.316 
        imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
      },
        type: 'activity', description: '6km coastal trek through Kudle, Om, Half-Moon and Paradise beaches',
        estimatedCost: 0, estimatedDuration: 240, rating: 4.8,
        tips: ['Start from Gokarna Beach early', 'Carry water — no shops mid-way'],
      },
      {
        id: 'gok-blr-3', name: 'Half Moon Beach', location: { lat: 14.519, lng: 74.311 
        imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80',
      },
        type: 'sight', description: 'Secluded crescent beach perfect for cliff camping under stars',
        estimatedCost: 0, estimatedDuration: 120, rating: 4.5,
        tips: ['Rent a tent for ₹500/night', 'Limited food — bring your own'],
      },
      {
        id: 'gok-blr-4', name: 'Mahabaleshwar Temple', location: { lat: 14.5469, lng: 74.3184 
        imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80',
      },
        type: 'sight', description: 'Ancient Shiva temple — one of seven muktisthals',
        estimatedCost: 0, estimatedDuration: 45, rating: 4.3,
        tips: ['Remove shoes before entering', 'Marble street gets hot in afternoon'],
      },
      {
        id: 'gok-blr-5', name: 'Namaste Café', location: { lat: 14.527, lng: 74.313 
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
      },
        type: 'food', description: 'Iconic beachside café on Om Beach with global traveler crowd',
        estimatedCost: 300, estimatedDuration: 60, rating: 4.2,
        tips: ['Try the banana chocolate pancake', 'Live music some evenings'],
      },
    ],
  },
  {
    id: 'mysore-blr',
    name: 'Mysore',
    state: 'Karnataka',
    location: { lat: 12.2958, lng: 76.6394 },
    budgetFit: 'perfect',
    tripDetails: {
      minDays: 1,
      maxDays: 3,
      estimatedCost: 3000,
      highlights: ['Mysore Palace', 'Chamundi Hills', 'Brindavan Gardens', 'Dosa capital'],
      category: 'culture',
      bestFor: ['friends', 'couple', 'family'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-e1f6e66fa422?w=800&q=80',
    popularityScore: 89,
    pois: [
      {
        id: 'mys-blr-1', name: 'Mysore Palace', location: { lat: 12.3052, lng: 76.6551 
        imageUrl: 'https://images.unsplash.com/photo-1600100397608-e1f2d0944940?w=400&q=80',
      },
        type: 'sight', description: 'Indo-Saracenic palace — lit up with 97,000 bulbs on Sundays',
        estimatedCost: 70, estimatedDuration: 120, rating: 4.8,
        tips: ['Visit Sunday evening for illumination', 'Audio guide ₹150 worth it'],
      },
      {
        id: 'mys-blr-2', name: 'Chamundi Hills', location: { lat: 12.2726, lng: 76.6667 
        imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&q=80',
      },
        type: 'sight', description: '1,000 steps to Chamundeshwari temple with city panorama',
        estimatedCost: 0, estimatedDuration: 90, rating: 4.5,
        tips: ['Can drive up or take 1000 steps', 'See the giant Nandi bull statue'],
      },
      {
        id: 'mys-blr-3', name: 'Brindavan Gardens', location: { lat: 12.4213, lng: 76.5729 
        imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80',
      },
        type: 'sight', description: 'Musical fountain gardens at KRS dam — colorful light show',
        estimatedCost: 25, estimatedDuration: 90, rating: 4.3,
        tips: ['Evening fountain show at 7pm', 'Boat rides available'],
      },
      {
        id: 'mys-blr-4', name: 'Mylari Dosa Corner', location: { lat: 12.306, lng: 76.654 
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
      },
        type: 'food', description: 'Legendary dosa shop — the famous Mysore Masala Dosa original',
        estimatedCost: 100, estimatedDuration: 30, rating: 4.6,
        tips: ['Go before 9am — sells out fast', 'Cash only, ₹80 for a dosa set'],
      },
      {
        id: 'mys-blr-5', name: 'Devaraja Market', location: { lat: 12.3059, lng: 76.6559 
        imageUrl: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=400&q=80',
      },
        type: 'activity', description: 'Century-old bazaar with flowers, spices, and sandalwood',
        estimatedCost: 200, estimatedDuration: 60, rating: 4.2,
        tips: ['Buy Mysore sandalwood soap', 'Best in morning for flower section'],
      },
    ],
  },
  {
    id: 'kodaikanal-blr',
    name: 'Kodaikanal',
    state: 'Tamil Nadu',
    location: { lat: 10.2381, lng: 77.4892 },
    budgetFit: 'perfect',
    tripDetails: {
      minDays: 2,
      maxDays: 4,
      estimatedCost: 5000,
      highlights: ['Kodai Lake', 'Pillar Rocks', 'Coaker\'s Walk', 'Pine forests'],
      category: 'nature',
      bestFor: ['couple', 'friends', 'family'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1597074866923-dc0589150458?w=800&q=80',
    popularityScore: 85,
    pois: [
      {
        id: 'kod-blr-1', name: 'Kodaikanal Lake', location: { lat: 10.2325, lng: 77.4901 
        imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80',
      },
        type: 'activity', description: 'Star-shaped lake for boating, cycling, and horse rides',
        estimatedCost: 200, estimatedDuration: 90, rating: 4.5,
        tips: ['Pedal boat ₹200/30min', 'Cycle around the lake 5km'],
      },
      {
        id: 'kod-blr-2', name: 'Pillar Rocks', location: { lat: 10.2167, lng: 77.4746 
        imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80',
      },
        type: 'sight', description: 'Three granite pillars rising 122m — breathtaking viewpoint',
        estimatedCost: 10, estimatedDuration: 45, rating: 4.4,
        tips: ['Often misty — go early morning', 'Mini garden at entrance'],
      },
      {
        id: 'kod-blr-3', name: 'Coaker\'s Walk', location: { lat: 10.2322, lng: 77.4942 
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
      },
        type: 'sight', description: '1km paved cliffside walk with views of Palani hills valley',
        estimatedCost: 10, estimatedDuration: 30, rating: 4.3,
        tips: ['Clear mornings only — closed in heavy fog', 'Telescope house at end'],
      },
      {
        id: 'kod-blr-4', name: 'Pine Forest', location: { lat: 10.23, lng: 77.47 
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
      },
        type: 'sight', description: 'Dense Kodai pine forest — straight out of a movie scene',
        estimatedCost: 0, estimatedDuration: 60, rating: 4.5,
        tips: ['Instagram-worthy paths', 'Carry a jacket — always cool'],
      },
      {
        id: 'kod-blr-5', name: 'Altaf\'s Café', location: { lat: 10.233, lng: 77.49 
        imageUrl: 'https://images.unsplash.com/photo-1474291103559-f48a79787b6b?w=400&q=80',
      },
        type: 'food', description: 'Cozy hilltop café famous for homemade chocolate and coffee',
        estimatedCost: 300, estimatedDuration: 45, rating: 4.3,
        tips: ['Try the homemade chocolate fudge', 'Buy chocolate boxes as souvenirs'],
      },
    ],
  },
]
