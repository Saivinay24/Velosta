import type { Destination, BudgetTier } from './types'
import { bangaloreDestinations } from './bangalore-destinations'

export const budgetTiers: BudgetTier[] = [
	{
		id: 'weekend',
		label: 'Weekend Escape',
		range: { min: 3000, max: 5000 },
		description: 'Quick getaways near your city',
		icon: '⛺',
		exampleDestinations: ['Pondicherry', 'Hampi', 'Lonavala'],
		avgDuration: '2-3 days',
	},
	{
		id: 'short',
		label: 'Short Adventure',
		range: { min: 5000, max: 12000 },
		description: 'Explore hidden gems within reach',
		icon: '🏔️',
		exampleDestinations: ['Meghalaya', 'Goa', 'Coorg'],
		avgDuration: '3-5 days',
	},
	{
		id: 'extended',
		label: 'Extended Explorer',
		range: { min: 12000, max: 35000 },
		description: 'Deep dive into stunning regions',
		icon: '🌏',
		exampleDestinations: ['Kashmir', 'Kerala', 'Rajasthan'],
		avgDuration: '5-8 days',
	},
	{
		id: 'premium',
		label: 'Premium Experience',
		range: { min: 35000, max: null },
		description: 'Unforgettable luxury journeys',
		icon: '✨',
		exampleDestinations: ['Ladakh', 'Andaman', 'Sikkim'],
		avgDuration: '7-14 days',
	},
]

export const destinations: Destination[] = [
	// ── Budget: ₹3k–5k range ──
	{
		id: 'pondicherry',
		name: 'Pondicherry',
		state: 'Tamil Nadu',
		location: { lat: 11.9416, lng: 79.8083 },
		budgetFit: 'perfect',
		tripDetails: {
			minDays: 2,
			maxDays: 4,
			estimatedCost: 4500,
			highlights: ['French Quarter walks', 'Auroville visit', 'Beach sunrise'],
			category: 'relaxation',
			bestFor: ['couple', 'friends', 'solo'],
		},
		imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
		popularityScore: 88,
		pois: [
			{
				id: 'pon-1',
				name: 'Promenade Beach',
				location: { lat: 11.934, lng: 79.8368 },
				type: 'sight',
				description: 'Iconic beachfront promenade with colonial-era buildings',
				estimatedCost: 0,
				estimatedDuration: 90,
				rating: 4.5,
				tips: ['Best at sunrise', 'Free to walk'],
			
				imageUrl: 'https://images.unsplash.com/photo-1590050751373-5035a8005e74?w=400&q=80',
			},
			{
				id: 'pon-2',
				name: 'Auroville',
				location: { lat: 12.0069, lng: 79.8107 },
				type: 'sight',
				description: 'Universal township with the golden Matrimandir',
				estimatedCost: 0,
				estimatedDuration: 180,
				rating: 4.7,
				tips: ['Book Matrimandir pass in advance', 'Carry water'],
			
				imageUrl: 'https://images.unsplash.com/photo-1621232050249-d29e4e15c797?w=400&q=80',
			},
			{
				id: 'pon-3',
				name: 'Café des Arts',
				location: { lat: 11.9339, lng: 79.8335 },
				type: 'food',
				description: 'Charming French-style café in the White Town',
				estimatedCost: 500,
				estimatedDuration: 60,
				rating: 4.3,
				tips: ['Try the croissants', 'Great for brunch'],
			
				imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80',
			},
			{
				id: 'pon-4',
				name: 'Paradise Beach',
				location: { lat: 11.889, lng: 79.831 },
				type: 'activity',
				description: 'Secluded beach accessible by boat',
				estimatedCost: 300,
				estimatedDuration: 180,
				rating: 4.6,
				tips: ['Boat from Chunnambar', 'Carry sunscreen'],
			
				imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
			},
			{
				id: 'pon-5',
				name: 'Sri Aurobindo Ashram',
				location: { lat: 11.9349, lng: 79.8336 },
				type: 'sight',
				description: 'Peaceful spiritual retreat in the city center',
				estimatedCost: 0,
				estimatedDuration: 60,
				rating: 4.4,
				tips: ['Maintain silence', 'Open 8am-12pm, 2pm-6pm'],
			
				imageUrl: 'https://images.unsplash.com/photo-1600093463592-8e36ca2f2945?w=400&q=80',
			},
		],
	},
	{
		id: 'hampi',
		name: 'Hampi',
		state: 'Karnataka',
		location: { lat: 15.335, lng: 76.46 },
		budgetFit: 'perfect',
		tripDetails: {
			minDays: 2,
			maxDays: 4,
			estimatedCost: 4000,
			highlights: ['Ancient ruins', 'Boulder landscapes', 'Virupaksha Temple'],
			category: 'culture',
			bestFor: ['solo', 'friends', 'couple'],
		},
		imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80',
		popularityScore: 82,
		pois: [
			{
				id: 'ham-1',
				name: 'Virupaksha Temple',
				location: { lat: 15.335, lng: 76.4598 },
				type: 'sight',
				description: 'Ancient Shiva temple, still active and iconic',
				estimatedCost: 25,
				estimatedDuration: 90,
				rating: 4.8,
				tips: ['Visit at dawn for the best light', 'Monkeys are active here'],
			
				imageUrl: 'https://images.unsplash.com/photo-1600100397608-e1f2d0944940?w=400&q=80',
			},
			{
				id: 'ham-2',
				name: 'Vijaya Vittala Temple',
				location: { lat: 15.345, lng: 76.475 },
				type: 'sight',
				description: 'Famous stone chariot and musical pillars',
				estimatedCost: 50,
				estimatedDuration: 120,
				rating: 4.9,
				tips: ['Hire a guide', 'Wear comfortable shoes'],
			
				imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400&q=80',
			},
			{
				id: 'ham-3',
				name: 'Matanga Hill',
				location: { lat: 15.338, lng: 76.466 },
				type: 'activity',
				description: 'Sunrise/sunset point with panoramic views',
				estimatedCost: 0,
				estimatedDuration: 90,
				rating: 4.7,
				tips: ['Start climb 30min before sunrise', 'Carry a flashlight'],
			
				imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
			},
			{
				id: 'ham-4',
				name: 'Mango Tree Restaurant',
				location: { lat: 15.3355, lng: 76.4605 },
				type: 'food',
				description: 'Riverside restaurant with views of boulders',
				estimatedCost: 250,
				estimatedDuration: 60,
				rating: 4.2,
				tips: ['Try the thali', 'Go for sunset dinner'],
			
				imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
			},
			{
				id: 'ham-5',
				name: 'Coracle Ride',
				location: { lat: 15.341, lng: 76.458 },
				type: 'activity',
				description: 'Traditional round boat ride on the Tungabhadra',
				estimatedCost: 150,
				estimatedDuration: 30,
				rating: 4.5,
				tips: ['Negotiate the price', 'Fun with friends'],
			
				imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
			},
		],
	},
	// ── Budget: ₹5k–12k range ──
	{
		id: 'meghalaya',
		name: 'Meghalaya',
		state: 'Meghalaya',
		location: { lat: 25.467, lng: 91.3662 },
		budgetFit: 'perfect',
		tripDetails: {
			minDays: 4,
			maxDays: 6,
			estimatedCost: 8000,
			highlights: ['Living root bridges', 'Dawki river', 'Cherrapunji caves'],
			category: 'nature',
			bestFor: ['friends', 'solo', 'couple'],
		},
		imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
		popularityScore: 87,
		pois: [
			{
				id: 'meg-1',
				name: 'Living Root Bridge (Double Decker)',
				location: { lat: 25.25, lng: 91.6972 },
				type: 'activity',
				description: 'Trek to the famous double-decker living root bridge',
				estimatedCost: 0,
				estimatedDuration: 360,
				rating: 4.9,
				tips: [
					'3500+ steps each way',
					'Start early morning',
					'Carry enough water',
				],
			
				imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80',
			},
			{
				id: 'meg-2',
				name: 'Dawki River',
				location: { lat: 25.186, lng: 92.021 },
				type: 'sight',
				description: 'Crystal-clear river at the India-Bangladesh border',
				estimatedCost: 500,
				estimatedDuration: 120,
				rating: 4.8,
				tips: ['Best Nov-Mar for clarity', 'Boating costs ₹500'],
			
				imageUrl: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba0866?w=400&q=80',
			},
			{
				id: 'meg-3',
				name: 'Nohkalikai Falls',
				location: { lat: 25.2748, lng: 91.6869 },
				type: 'sight',
				description: "India's tallest plunge waterfall at 340m",
				estimatedCost: 50,
				estimatedDuration: 60,
				rating: 4.7,
				tips: ['Best during monsoon', 'Misty and windy at the top'],
			
				imageUrl: 'https://images.unsplash.com/photo-1474291103559-f48a79787b6b?w=400&q=80',
			},
			{
				id: 'meg-4',
				name: 'Mawlynnong Village',
				location: { lat: 25.2, lng: 91.924 },
				type: 'sight',
				description: "Asia's cleanest village with sky walk",
				estimatedCost: 30,
				estimatedDuration: 90,
				rating: 4.5,
				tips: ['Try the local lunch', 'Explore the bamboo sky walk'],
			
				imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
			},
			{
				id: 'meg-5',
				name: 'Don Bosco Museum',
				location: { lat: 25.5706, lng: 91.8868 },
				type: 'sight',
				description: 'Northeast India culture museum in Shillong',
				estimatedCost: 100,
				estimatedDuration: 120,
				rating: 4.3,
				tips: ['Allow 2 hours', '7 floors of exhibits'],
			
				imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
			},
		],
	},
	{
		id: 'goa',
		name: 'Goa',
		state: 'Goa',
		location: { lat: 15.2993, lng: 74.124 },
		budgetFit: 'perfect',
		tripDetails: {
			minDays: 3,
			maxDays: 6,
			estimatedCost: 10000,
			highlights: ['Beach life', 'Portuguese heritage', 'Spice plantations'],
			category: 'relaxation',
			bestFor: ['friends', 'couple', 'solo'],
		},
		imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
		popularityScore: 95,
		pois: [
			{
				id: 'goa-1',
				name: 'Basilica of Bom Jesus',
				location: { lat: 15.5009, lng: 73.9116 },
				type: 'sight',
				description: 'UNESCO World Heritage baroque church',
				estimatedCost: 0,
				estimatedDuration: 60,
				rating: 4.6,
				tips: [
					'Photography not allowed inside',
					'Visit Old Goa complex together',
				],
			
				imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80',
			},
			{
				id: 'goa-2',
				name: 'Anjuna Flea Market',
				location: { lat: 15.5811, lng: 73.7424 },
				type: 'activity',
				description: 'Iconic Wednesday flea market',
				estimatedCost: 500,
				estimatedDuration: 120,
				rating: 4.3,
				tips: ['Wednesday only', 'Bargain aggressively'],
			
				imageUrl: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=400&q=80',
			},
			{
				id: 'goa-3',
				name: 'Palolem Beach',
				location: { lat: 15.01, lng: 74.023 },
				type: 'sight',
				description: 'Crescent-shaped beach perfect for swimming',
				estimatedCost: 0,
				estimatedDuration: 180,
				rating: 4.7,
				tips: ['South Goa, calmer vibes', 'Kayaking available'],
			
				imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
			},
			{
				id: 'goa-4',
				name: 'Thalassa Restaurant',
				location: { lat: 15.6019, lng: 73.7445 },
				type: 'food',
				description: 'Clifftop Greek restaurant with sunset views',
				estimatedCost: 1200,
				estimatedDuration: 90,
				rating: 4.5,
				tips: ['Book sunset slot', 'Try the mezze platter'],
			
				imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&q=80',
			},
			{
				id: 'goa-5',
				name: 'Dudhsagar Falls',
				location: { lat: 15.3144, lng: 74.3143 },
				type: 'activity',
				description: "Goa's majestic 4-tier waterfall",
				estimatedCost: 800,
				estimatedDuration: 360,
				rating: 4.8,
				tips: [
					'Jeep safari required',
					'Best Oct-Mar',
					'Carry change of clothes',
				],
			
				imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80',
			},
		],
	},
	{
		id: 'coorg',
		name: 'Coorg',
		state: 'Karnataka',
		location: { lat: 12.3375, lng: 75.8069 },
		budgetFit: 'perfect',
		tripDetails: {
			minDays: 3,
			maxDays: 5,
			estimatedCost: 7000,
			highlights: ['Coffee plantations', 'Abbey Falls', 'Misty mountains'],
			category: 'nature',
			bestFor: ['couple', 'family', 'friends'],
		},
		imageUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80',
		popularityScore: 84,
		pois: [
			{
				id: 'cor-1',
				name: 'Abbey Falls',
				location: { lat: 12.4568, lng: 75.7183 
				imageUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&q=80',
			},
				type: 'sight',
				description: 'Beautiful waterfall surrounded by coffee and spice plantations',
				estimatedCost: 30,
				estimatedDuration: 60,
				rating: 4.4,
				tips: ['Best during monsoon', '10 min walk from parking'],
			},
			{
				id: 'cor-2',
				name: 'Talakaveri',
				location: { lat: 12.321, lng: 75.492 
				imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
			},
				type: 'sight',
				description: 'Source of the River Kaveri with temple',
				estimatedCost: 0,
				estimatedDuration: 90,
				rating: 4.3,
				tips: ['Climb to the top for views', 'Sacred spot'],
			},
			{
				id: 'cor-3',
				name: 'Coffee Plantation Walk',
				location: { lat: 12.42, lng: 75.74 
				imageUrl: 'https://images.unsplash.com/photo-1610312278520-bcc893a3ff1d?w=400&q=80',
			},
				type: 'activity',
				description: 'Guided tour through aromatic coffee estates',
				estimatedCost: 300,
				estimatedDuration: 120,
				rating: 4.6,
				tips: ['Morning tours are best', 'Buy fresh ground coffee'],
			},
			{
				id: 'cor-4',
				name: 'Raja Seat',
				location: { lat: 12.421, lng: 75.7342 
				imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80',
			},
				type: 'sight',
				description: 'Panoramic viewpoint where kings once sat',
				estimatedCost: 10,
				estimatedDuration: 45,
				rating: 4.2,
				tips: ['Best at sunset', 'Musical fountain in evening'],
			},
			{
				id: 'cor-5',
				name: 'Nagarhole National Park',
				location: { lat: 12.0575, lng: 76.15 
				imageUrl: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=400&q=80',
			},
				type: 'activity',
				description: 'Wildlife safari with elephants and tigers',
				estimatedCost: 500,
				estimatedDuration: 180,
				rating: 4.7,
				tips: [
					'Book safari in advance',
					'Morning safaris better for sightings',
				],
			},
		],
	},
	// ── Budget: ₹12k–35k range ──
	{
		id: 'kashmir',
		name: 'Kashmir',
		state: 'Jammu & Kashmir',
		location: { lat: 34.0837, lng: 74.7973 },
		budgetFit: 'perfect',
		tripDetails: {
			minDays: 5,
			maxDays: 8,
			estimatedCost: 25000,
			highlights: ['Dal Lake houseboat', 'Mughal Gardens', 'Gulmarg meadows'],
			category: 'nature',
			bestFor: ['couple', 'family', 'friends'],
		},
		imageUrl: 'https://images.unsplash.com/photo-1597074866923-dc0589150458?w=800&q=80',
		popularityScore: 96,
		pois: [
			{
				id: 'kas-1',
				name: 'Dal Lake Houseboat',
				location: { lat: 34.0936, lng: 74.8587 },
				type: 'accommodation',
				description: 'Iconic floating stays on the serene Dal Lake',
				estimatedCost: 3000,
				estimatedDuration: 720,
				rating: 4.8,
				tips: ['Negotiate price beforehand', 'Shikara ride included'],
			
				imageUrl: 'https://images.unsplash.com/photo-1597074866923-dc0589150458?w=400&q=80',
			},
			{
				id: 'kas-2',
				name: 'Mughal Gardens (Nishat Bagh)',
				location: { lat: 34.1093, lng: 74.8804 },
				type: 'sight',
				description: 'Terraced Mughal garden with lake views',
				estimatedCost: 50,
				estimatedDuration: 90,
				rating: 4.6,
				tips: ['Combine with Shalimar Bagh', 'Best in spring'],
			
				imageUrl: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=400&q=80',
			},
			{
				id: 'kas-3',
				name: 'Gulmarg Gondola',
				location: { lat: 34.0484, lng: 74.3805 },
				type: 'activity',
				description: 'Highest cable car in the world at 13,780 ft',
				estimatedCost: 1500,
				estimatedDuration: 240,
				rating: 4.9,
				tips: ['Phase 2 for snow point', 'Dress warm even in summer'],
			
				imageUrl: 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?w=400&q=80',
			},
			{
				id: 'kas-4',
				name: 'Pahalgam Valley',
				location: { lat: 34.0161, lng: 75.315 },
				type: 'sight',
				description: 'Valley of shepherds with Lidder river',
				estimatedCost: 200,
				estimatedDuration: 360,
				rating: 4.7,
				tips: ['Horse ride to Baisaran', 'Photography paradise'],
			
				imageUrl: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80',
			},
			{
				id: 'kas-5',
				name: 'Shankaracharya Temple',
				location: { lat: 34.0659, lng: 74.8534 },
				type: 'sight',
				description: 'Hilltop temple with panoramic Srinagar views',
				estimatedCost: 0,
				estimatedDuration: 60,
				rating: 4.5,
				tips: ['Security check at base', 'Best at sunrise'],
			
				imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=80',
			},
		],
	},
	{
		id: 'rajasthan',
		name: 'Rajasthan Heritage',
		state: 'Rajasthan',
		location: { lat: 26.9124, lng: 75.7873 },
		budgetFit: 'perfect',
		tripDetails: {
			minDays: 5,
			maxDays: 10,
			estimatedCost: 30000,
			highlights: ['Amber Fort', 'Desert safari', 'Udaipur lakes'],
			category: 'culture',
			bestFor: ['couple', 'family', 'friends'],
		},
		imageUrl: 'https://images.unsplash.com/photo-1626015365107-73b979d23463?w=800&q=80',
		popularityScore: 93,
		pois: [
			{
				id: 'raj-1',
				name: 'Amber Fort',
				location: { lat: 26.9855, lng: 75.8513 },
				type: 'sight',
				description: 'Majestic hilltop fort with sheesh mahal',
				estimatedCost: 500,
				estimatedDuration: 180,
				rating: 4.8,
				tips: ['Light & Sound show at night', 'Skip the elephant ride'],
			
				imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&q=80',
			},
			{
				id: 'raj-2',
				name: 'City Palace Udaipur',
				location: { lat: 24.5764, lng: 73.6915 },
				type: 'sight',
				description: 'Grand lakeside palace complex',
				estimatedCost: 400,
				estimatedDuration: 120,
				rating: 4.7,
				tips: ['Boat ride to Lake Palace hotel', 'Crystal gallery worth visiting'],
			
				imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80',
			},
			{
				id: 'raj-3',
				name: 'Thar Desert Safari',
				location: { lat: 26.909, lng: 70.912 },
				type: 'activity',
				description: 'Camel ride and overnight camping in dunes',
				estimatedCost: 2500,
				estimatedDuration: 720,
				rating: 4.6,
				tips: ['Book non-touristy camps', 'Sunset on dunes is magical'],
			
				imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80',
			},
			{
				id: 'raj-4',
				name: 'Hawa Mahal',
				location: { lat: 26.9239, lng: 75.8267 },
				type: 'sight',
				description: 'Palace of winds with 953 windows',
				estimatedCost: 200,
				estimatedDuration: 60,
				rating: 4.5,
				tips: ['Best photos from across the street', 'Early morning for no crowds'],
			
				imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80',
			},
			{
				id: 'raj-5',
				name: 'Laal Maas at Spice Court',
				location: { lat: 26.912, lng: 75.787 },
				type: 'food',
				description: 'Authentic Rajasthani cuisine',
				estimatedCost: 800,
				estimatedDuration: 90,
				rating: 4.4,
				tips: ['Must try Laal Maas', 'Dal Baati Churma is signature'],
			
				imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=80',
			},
		],
	},
	{
		id: 'kerala',
		name: 'Kerala Backwaters',
		state: 'Kerala',
		location: { lat: 9.4981, lng: 76.3388 },
		budgetFit: 'perfect',
		tripDetails: {
			minDays: 5,
			maxDays: 7,
			estimatedCost: 22000,
			highlights: ['Houseboat cruise', 'Ayurvedic spa', 'Tea plantations'],
			category: 'relaxation',
			bestFor: ['couple', 'family', 'solo'],
		},
		imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
		popularityScore: 91,
		pois: [
			{
				id: 'ker-1',
				name: 'Alleppey Houseboat',
				location: { lat: 9.4981, lng: 76.3388 },
				type: 'accommodation',
				description: 'Overnight backwater cruise on traditional kettuvallam',
				estimatedCost: 5000,
				estimatedDuration: 1440,
				rating: 4.8,
				tips: [
					'Avoid peak season for better rates',
					'AC houseboats recommended',
				],
			
				imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80',
			},
			{
				id: 'ker-2',
				name: 'Munnar Tea Gardens',
				location: { lat: 10.0889, lng: 77.0595 },
				type: 'sight',
				description: 'Endless rolling hills of tea plantations',
				estimatedCost: 200,
				estimatedDuration: 180,
				rating: 4.7,
				tips: [
					'Visit Tata Tea Museum',
					'Best during monsoon for lush green',
				],
			
				imageUrl: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=400&q=80',
			},
			{
				id: 'ker-3',
				name: 'Periyar Wildlife Sanctuary',
				location: { lat: 9.4631, lng: 77.1724 },
				type: 'activity',
				description: 'Boat safari to spot elephants and deer',
				estimatedCost: 500,
				estimatedDuration: 240,
				rating: 4.5,
				tips: [
					'Morning boat better for sightings',
					'Carry binoculars',
				],
			
				imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
			},
			{
				id: 'ker-4',
				name: 'Toddy Shop Experience',
				location: { lat: 9.5916, lng: 76.5222 },
				type: 'food',
				description: 'Traditional Kerala toddy and fish curry',
				estimatedCost: 300,
				estimatedDuration: 60,
				rating: 4.3,
				tips: ['Try karimeen fry', 'Authentic local experience'],
			
				imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80',
			},
			{
				id: 'ker-5',
				name: 'Marari Beach',
				location: { lat: 9.6173, lng: 76.287 },
				type: 'sight',
				description: 'Pristine, uncrowded beach south of Alleppey',
				estimatedCost: 0,
				estimatedDuration: 120,
				rating: 4.6,
				tips: ['Great for relaxation', 'Beautiful sunsets'],
			
				imageUrl: 'https://images.unsplash.com/photo-1606298246186-08989048f609?w=400&q=80',
			},
		],
	},
	{
		id: 'sikkim',
		name: 'Sikkim',
		state: 'Sikkim',
		location: { lat: 27.533, lng: 88.5122 },
		budgetFit: 'perfect',
		tripDetails: {
			minDays: 5,
			maxDays: 7,
			estimatedCost: 20000,
			highlights: ['Kanchenjunga views', 'Monastery trail', 'Gurudongmar Lake'],
			category: 'nature',
			bestFor: ['friends', 'solo', 'couple'],
		},
		imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
		popularityScore: 86,
		pois: [
			{
				id: 'sik-1',
				name: 'Tsomgo Lake',
				location: { lat: 27.3733, lng: 88.765 },
				type: 'sight',
				description: 'Glacial lake at 12,313 ft surrounded by mountains',
				estimatedCost: 200,
				estimatedDuration: 90,
				rating: 4.6,
				tips: ['Carry warm clothes', 'Yak rides available'],
			
				imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
			},
			{
				id: 'sik-2',
				name: 'Rumtek Monastery',
				location: { lat: 27.2877, lng: 88.5556 },
				type: 'sight',
				description: 'Largest monastery in Sikkim with golden stupa',
				estimatedCost: 50,
				estimatedDuration: 90,
				rating: 4.5,
				tips: ['ID required for entry', 'Photography restricted inside'],
			
				imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=80',
			},
			{
				id: 'sik-3',
				name: 'MG Marg',
				location: { lat: 27.3389, lng: 88.6065 },
				type: 'activity',
				description: 'Gangtok walking street with shops and cafés',
				estimatedCost: 300,
				estimatedDuration: 120,
				rating: 4.4,
				tips: ['No vehicles allowed', 'Great street food'],
			
				imageUrl: 'https://images.unsplash.com/photo-1500259571355-332da5cb07aa?w=400&q=80',
			},
			{
				id: 'sik-4',
				name: 'Nathula Pass',
				location: { lat: 27.3867, lng: 88.8312 },
				type: 'sight',
				description: 'Historic India-China border pass at 14,140 ft',
				estimatedCost: 400,
				estimatedDuration: 180,
				rating: 4.7,
				tips: ['Indian nationals only', 'Permit required 2 days advance'],
			
				imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
			},
			{
				id: 'sik-5',
				name: 'Gurudongmar Lake',
				location: { lat: 28.025, lng: 88.71 },
				type: 'sight',
				description: 'Sacred high-altitude lake at 17,800 ft',
				estimatedCost: 500,
				estimatedDuration: 360,
				rating: 4.9,
				tips: ['Altitude sickness possible', 'Start very early morning'],
			
				imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
			},
		],
	},
	// ── Budget: ₹35k+ range ──
	{
		id: 'ladakh',
		name: 'Leh-Ladakh',
		state: 'Ladakh',
		location: { lat: 34.1526, lng: 77.5771 },
		budgetFit: 'stretch',
		tripDetails: {
			minDays: 7,
			maxDays: 12,
			estimatedCost: 45000,
			highlights: ['Pangong Lake', 'Nubra Valley', 'Khardung La Pass'],
			category: 'adventure',
			bestFor: ['friends', 'solo', 'couple'],
		},
		imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
		popularityScore: 97,
		pois: [
			{
				id: 'lad-1',
				name: 'Pangong Tso',
				location: { lat: 33.7595, lng: 78.6652 },
				type: 'sight',
				description: 'Stunning blue lake at India-China border, 14,270 ft',
				estimatedCost: 300,
				estimatedDuration: 720,
				rating: 4.9,
				tips: ['Camp overnight for stars', '3 Idiots filming location'],
			
				imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80',
			},
			{
				id: 'lad-2',
				name: 'Khardung La Pass',
				location: { lat: 34.282, lng: 77.6022 },
				type: 'activity',
				description: 'One of world highest motorable passes at 17,982 ft',
				estimatedCost: 0,
				estimatedDuration: 60,
				rating: 4.7,
				tips: ['Acclimatize in Leh first', 'Hot chai at the top'],
			
				imageUrl: 'https://images.unsplash.com/photo-1573405473507-3b9d63a39fc2?w=400&q=80',
			},
			{
				id: 'lad-3',
				name: 'Nubra Valley',
				location: { lat: 34.65, lng: 77.3 },
				type: 'sight',
				description: 'Desert valley with double-humped camels',
				estimatedCost: 500,
				estimatedDuration: 480,
				rating: 4.8,
				tips: ['Ride Bactrian camels at Hunder', 'Cold desert landscapes'],
			
				imageUrl: 'https://images.unsplash.com/photo-1580289907553-2edea4ea8ea0?w=400&q=80',
			},
			{
				id: 'lad-4',
				name: 'Thiksey Monastery',
				location: { lat: 34.0547, lng: 77.6631 },
				type: 'sight',
				description: 'Mini Potala Palace with morning prayer ceremony',
				estimatedCost: 50,
				estimatedDuration: 90,
				rating: 4.6,
				tips: ['Attend 6am morning prayers', 'Stunning sunrise views'],
			
				imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80',
			},
			{
				id: 'lad-5',
				name: 'Magnetic Hill',
				location: { lat: 34.1699, lng: 77.4316 },
				type: 'sight',
				description: 'Optical illusion hill where vehicles appear to roll uphill',
				estimatedCost: 0,
				estimatedDuration: 30,
				rating: 3.8,
				tips: ['Fun photo op', 'Combine with Gurudwara Pathar Sahib'],
			
				imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
			},
		],
	},
	{
		id: 'andaman',
		name: 'Andaman Islands',
		state: 'Andaman & Nicobar',
		location: { lat: 11.7401, lng: 92.6586 },
		budgetFit: 'stretch',
		tripDetails: {
			minDays: 5,
			maxDays: 8,
			estimatedCost: 50000,
			highlights: ['Scuba diving', 'Radhanagar Beach', 'Cellular Jail'],
			category: 'adventure',
			bestFor: ['couple', 'friends', 'family'],
		},
		imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
		popularityScore: 89,
		pois: [
			{
				id: 'and-1',
				name: 'Radhanagar Beach',
				location: { lat: 11.9812, lng: 93.0044 },
				type: 'sight',
				description: "Asia's best beach with turquoise waters",
				estimatedCost: 0,
				estimatedDuration: 180,
				rating: 4.9,
				tips: ['Arrive before sunset', 'Swim in designated areas'],
			
				imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&q=80',
			},
			{
				id: 'and-2',
				name: 'Cellular Jail',
				location: { lat: 11.6747, lng: 92.7468 },
				type: 'sight',
				description: 'Historic colonial prison, now a national memorial',
				estimatedCost: 30,
				estimatedDuration: 120,
				rating: 4.7,
				tips: [
					'Evening light & sound show is a must',
					'Emotional experience',
				],
			
				imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
			},
			{
				id: 'and-3',
				name: 'Havelock Scuba Diving',
				location: { lat: 12.013, lng: 93.008 },
				type: 'activity',
				description: 'World-class diving with vibrant coral reefs',
				estimatedCost: 4500,
				estimatedDuration: 240,
				rating: 4.8,
				tips: ['No swimming needed for beginners', 'Book PADI certified'],
			
				imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80',
			},
			{
				id: 'and-4',
				name: 'Elephant Beach',
				location: { lat: 12.028, lng: 93.017 },
				type: 'activity',
				description: 'Snorkeling paradise with clear visibility',
				estimatedCost: 1500,
				estimatedDuration: 180,
				rating: 4.6,
				tips: [
					'Speedboat from Havelock',
					'Waterproof phone case essential',
				],
			
				imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
			},
			{
				id: 'and-5',
				name: 'Ross Island',
				location: { lat: 11.68, lng: 92.76 },
				type: 'sight',
				description: 'Abandoned British colonial ruins reclaimed by nature',
				estimatedCost: 200,
				estimatedDuration: 120,
				rating: 4.4,
				tips: [
					'Ferry from Water Sports Complex',
					'Deer and peacocks roam free',
				],
			
				imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
			},
		],
	},
	{
		id: 'spiti',
		name: 'Spiti Valley',
		state: 'Himachal Pradesh',
		location: { lat: 32.2462, lng: 78.0188 },
		budgetFit: 'stretch',
		tripDetails: {
			minDays: 7,
			maxDays: 10,
			estimatedCost: 35000,
			highlights: ['Key Monastery', 'Chandratal Lake', 'Fossil village'],
			category: 'adventure',
			bestFor: ['friends', 'solo'],
		},
		imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
		popularityScore: 83,
		pois: [
			{
				id: 'spi-1',
				name: 'Key Monastery',
				location: { lat: 32.227, lng: 78.0132 
				imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80',
			},
				type: 'sight',
				description: 'Iconic 1000-year-old Buddhist monastery',
				estimatedCost: 0,
				estimatedDuration: 90,
				rating: 4.8,
				tips: ['Morning prayers at 6am', 'Stay at the monastery guesthouse'],
			},
			{
				id: 'spi-2',
				name: 'Chandratal Lake',
				location: { lat: 32.483, lng: 77.615 
				imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=80',
			},
				type: 'sight',
				description: 'Moon Lake at 14,100 ft with color-changing waters',
				estimatedCost: 0,
				estimatedDuration: 180,
				rating: 4.9,
				tips: ['Camp overnight', 'Road open Jun-Oct only'],
			},
			{
				id: 'spi-3',
				name: 'Langza Fossil Village',
				location: { lat: 32.276, lng: 78.035 
				imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
			},
				type: 'sight',
				description: 'Village at 14,500 ft famous for marine fossils',
				estimatedCost: 0,
				estimatedDuration: 120,
				rating: 4.5,
				tips: ['Buy fossils from locals', 'Giant Buddha statue'],
			},
			{
				id: 'spi-4',
				name: 'Kunzum Pass',
				location: { lat: 32.4067, lng: 77.6033 
				imageUrl: 'https://images.unsplash.com/photo-1573405473507-3b9d63a39fc2?w=400&q=80',
			},
				type: 'sight',
				description: 'Gateway to Spiti at 15,060 ft',
				estimatedCost: 0,
				estimatedDuration: 30,
				rating: 4.4,
				tips: ['Prayer flags and temple at top', 'Weather changes fast'],
			},
			{
				id: 'spi-5',
				name: 'Pin Valley',
				location: { lat: 32, lng: 78.25 
				imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80',
			},
				type: 'activity',
				description: 'Cold desert national park with snow leopard habitat',
				estimatedCost: 200,
				estimatedDuration: 360,
				rating: 4.6,
				tips: ['Remote and stunning', 'Ibex and snow leopard territory'],
			},
		],
	},
]

// Merge Bangalore college destinations
bangaloreDestinations.forEach(bd => {
	if (!destinations.find(d => d.id === bd.id)) {
		destinations.push(bd)
	}
})

// Helper: get day-fit color based on available days vs required days
export function getDayFitColor(
	destination: Destination,
	availableDays: number
): {
	color: string
	label: string
	fit: 'comfortable' | 'moderate' | 'tight'
} {
	const { minDays, maxDays } = destination.tripDetails

	if (availableDays >= minDays && availableDays <= maxDays) {
		return { color: '#22c55e', label: 'Comfortable', fit: 'comfortable' }
	} else if (availableDays >= minDays - 1 && availableDays < minDays) {
		return { color: '#eab308', label: 'Slightly hectic', fit: 'moderate' }
	} else if (availableDays < minDays - 1) {
		return { color: '#f97316', label: 'Too tight', fit: 'tight' }
	} else {
		return { color: '#22c55e', label: 'Comfortable', fit: 'comfortable' }
	}
}

// Helper: filter destinations by budget
export function filterByBudget(budget: number): Destination[] {
	return destinations.filter((d) => d.tripDetails.estimatedCost <= budget)
}

// Helper: filter by trip type
export function filterByTripType(
	dests: Destination[],
	tripType: string
): Destination[] {
	if (!tripType) return dests
	return dests.filter((d) => d.tripDetails.bestFor.includes(tripType as any))
}

// Helper: sort by popularity
export function sortByPopularity(dests: Destination[]): Destination[] {
	return [...dests].sort((a, b) => b.popularityScore - a.popularityScore)
}
