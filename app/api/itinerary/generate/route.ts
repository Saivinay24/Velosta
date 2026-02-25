import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { destination_id, budget, duration_days, user_preferences, trip_type } = body

    // In production, integrate with OpenAI/Claude. For now, return a signal
    // that the client should use the local itinerary engine.
    // This endpoint is a placeholder for future AI integration.

    // If OPENAI_API_KEY is set, we could call the real API:
    const openaiKey = process.env.OPENAI_API_KEY
    if (openaiKey && openaiKey !== 'your_openai_key_here') {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are a travel itinerary expert for Indian destinations. Create authentic, optimized plans based on real traveler knowledge.
                
Key principles:
- Respect budget constraints strictly
- Account for realistic travel times
- Include buffer time between activities
- Suggest hidden gems that tourists miss
- Include practical tips

Return JSON matching this schema:
{
  "days": [
    {
      "day": number,
      "theme": string,
      "nodes": [
        {
          "nodeId": string,
          "type": "transport" | "accommodation" | "food" | "sight" | "activity",
          "time": "HH:MM",
          "title": string,
          "description": string,
          "duration": number (minutes),
          "cost": number (INR),
          "icon": string,
          "confidence": number (0-1),
          "basedOnExperiences": number,
          "tips": string[],
          "location": { "lat": number, "lng": number }
        }
      ]
    }
  ]
}`
              },
              {
                role: 'user',
                content: `Generate a ${duration_days}-day itinerary for ${destination_id} with a budget of ₹${budget}. Trip type: ${trip_type}. Preferences: ${user_preferences?.join(', ') || 'general'}.`
              },
            ],
            response_format: { type: 'json_object' },
            max_tokens: 4000,
          }),
        })

        const data = await response.json()
        if (data.choices?.[0]?.message?.content) {
          const itinerary = JSON.parse(data.choices[0].message.content)
          return NextResponse.json(itinerary)
        }
      } catch (aiError) {
        console.error('OpenAI API error, falling back to local engine:', aiError)
      }
    }

    // Fallback: return signal to use client-side engine
    return NextResponse.json({
      useLocalEngine: true,
      message: 'AI API not configured. Using local itinerary engine.',
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate itinerary', useLocalEngine: true },
      { status: 500 }
    )
  }
}
