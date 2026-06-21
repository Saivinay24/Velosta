import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, tripContext } = body

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const openaiKey = process.env.OPENAI_API_KEY
    if (!openaiKey || openaiKey === 'your_openai_key_here') {
      return NextResponse.json({
        reply: "AI is not configured yet. Please add your OpenAI API key to .env.local to enable the chat assistant.",
      })
    }

    const systemPrompt = `You are Velosta AI, a friendly and knowledgeable travel assistant for Indian destinations. You help college students plan budget-friendly trips.

Current Trip Context:
- Destination: ${tripContext?.destination || 'Not selected'}
- Duration: ${tripContext?.days || 'Unknown'} days
- Budget: ₹${tripContext?.budget?.toLocaleString('en-IN') || 'Unknown'}
- Trip Type: ${tripContext?.tripType || 'Unknown'}

Current Itinerary:
${tripContext?.itinerary ? JSON.stringify(tripContext.itinerary.slice(0, 3), null, 2) : 'None generated yet'}

Guidelines:
- Keep responses concise (2-4 sentences max)
- Give practical, budget-friendly tips for college students
- Suggest specific changes when asked (add/remove/swap activities)
- Use ₹ for costs, be realistic about Indian destination prices
- Be enthusiastic but honest about limitations`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    if (data.choices?.[0]?.message?.content) {
      return NextResponse.json({ reply: data.choices[0].message.content })
    }

    return NextResponse.json({ reply: "I couldn't process that request. Try again!" })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { reply: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    )
  }
}
