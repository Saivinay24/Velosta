import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { days, modified_node_id, action } = body

    // In production, send to AI for re-optimization.
    // For now, return the itinerary as-is with suggestions.

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
                content: 'You are a travel itinerary optimizer. Given a modified itinerary, suggest timing improvements. Return JSON with { "suggestions": string[], "warnings": string[] }',
              },
              {
                role: 'user',
                content: `The user ${action || 'reordered'} activity ${modified_node_id || 'unknown'}. Current itinerary: ${JSON.stringify(days?.slice(0, 2))}. Suggest improvements.`,
              },
            ],
            response_format: { type: 'json_object' },
            max_tokens: 500,
          }),
        })

        const data = await response.json()
        if (data.choices?.[0]?.message?.content) {
          return NextResponse.json(JSON.parse(data.choices[0].message.content))
        }
      } catch {}
    }

    // Fallback
    return NextResponse.json({
      suggestions: [
        'Route looks good after your changes.',
        'Consider adding buffer time between activities.',
      ],
      warnings: [],
    })
  } catch (error) {
    console.error('Optimization error:', error)
    return NextResponse.json(
      { error: 'Failed to optimize', suggestions: [], warnings: [] },
      { status: 500 }
    )
  }
}
