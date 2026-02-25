import type { DayPlan, Destination, BudgetBreakdown } from './types'

/**
 * Generate and download a comprehensive trip PDF.
 * Uses browser-native APIs (no external library needed).
 */
export function exportToPDF(
  destination: Destination,
  days: DayPlan[],
  budget: number,
  breakdown: BudgetBreakdown
) {
  const totalCost = days.reduce(
    (sum, day) => sum + day.nodes.reduce((s, n) => s + n.cost, 0),
    0
  )

  const html = buildPDFHTML(destination, days, budget, totalCost, breakdown)

  const printWindow = window.open('', '_blank', 'width=800,height=600')
  if (!printWindow) {
    alert('Please allow popups to export PDF')
    return
  }

  printWindow.document.write(html)
  printWindow.document.close()

  // Wait for fonts to load then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }
}

function buildPDFHTML(
  destination: Destination,
  days: DayPlan[],
  budget: number,
  totalCost: number,
  breakdown: BudgetBreakdown
): string {
  const formatCurrency = (val: number) =>
    `₹${val.toLocaleString('en-IN')}`

  const typeIcons: Record<string, string> = {
    transport: '🚌',
    accommodation: '🏨',
    food: '🍽️',
    sight: '📸',
    activity: '🏔️',
  }

  const daysHTML = days
    .map(
      (day) => `
    <div class="day-section">
      <div class="day-header">
        <h2>Day ${day.day}: ${day.theme}</h2>
        <span class="day-cost">${formatCurrency(day.nodes.reduce((s, n) => s + n.cost, 0))}</span>
      </div>
      <div class="timeline">
        ${day.nodes
          .map(
            (node, idx) => `
          <div class="activity">
            <div class="time-col">
              <span class="time">${node.time}</span>
              ${idx < day.nodes.length - 1 ? '<div class="line"></div>' : ''}
            </div>
            <div class="icon">${typeIcons[node.type] || '📍'}</div>
            <div class="details">
              <h3>${node.title}</h3>
              <p>${node.description}</p>
              <div class="meta">
                <span>${Math.floor(node.duration / 60)}h ${node.duration % 60}m</span>
                <span>${formatCurrency(node.cost)}</span>
              </div>
              ${
                node.tips && node.tips.length > 0
                  ? `<div class="tips">${node.tips.map((t) => `<span>💡 ${t}</span>`).join('')}</div>`
                  : ''
              }
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `
    )
    .join('')

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Velosta — ${destination.name} Itinerary</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; color: #2C2C2C; padding: 40px; max-width: 800px; margin: 0 auto; }
    h1, h2, h3 { font-family: 'Playfair Display', serif; }
    
    .header { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 2px solid #D8C7B3; }
    .header .brand { font-size: 12px; letter-spacing: 4px; text-transform: uppercase; color: #D8C7B3; margin-bottom: 8px; }
    .header h1 { font-size: 36px; color: #2C2C2C; margin-bottom: 8px; }
    .header .subtitle { font-size: 14px; color: #4A4A4A; }
    
    .summary { display: flex; justify-content: space-between; margin-bottom: 40px; gap: 16px; }
    .summary-card { flex: 1; background: #F6F3EE; padding: 16px; border-radius: 12px; text-align: center; }
    .summary-card .label { font-size: 11px; color: #4A4A4A; text-transform: uppercase; letter-spacing: 1px; }
    .summary-card .value { font-size: 22px; font-family: 'Playfair Display', serif; font-weight: 600; margin-top: 4px; }
    
    .budget-bar { margin-bottom: 40px; }
    .budget-bar h3 { font-size: 14px; margin-bottom: 12px; }
    .budget-items { display: flex; gap: 12px; flex-wrap: wrap; }
    .budget-item { background: #F6F3EE; padding: 10px 16px; border-radius: 8px; font-size: 12px; }
    .budget-item .cat { color: #4A4A4A; }
    .budget-item .amt { font-weight: 600; margin-top: 2px; }
    
    .day-section { margin-bottom: 36px; page-break-inside: avoid; }
    .day-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #E8DFD2; }
    .day-header h2 { font-size: 20px; }
    .day-cost { font-size: 14px; font-weight: 600; color: #C4734F; }
    
    .timeline { padding-left: 8px; }
    .activity { display: flex; gap: 12px; margin-bottom: 16px; }
    .time-col { width: 50px; text-align: right; position: relative; }
    .time { font-size: 11px; font-weight: 500; color: #C9A96E; }
    .line { width: 1px; height: calc(100% + 8px); background: #D8C7B3; position: absolute; right: -10px; top: 20px; }
    .icon { font-size: 18px; margin-top: 2px; }
    .details { flex: 1; }
    .details h3 { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
    .details p { font-size: 12px; color: #4A4A4A; margin-bottom: 6px; }
    .meta { display: flex; gap: 16px; font-size: 11px; color: #4A4A4A; }
    .meta span { background: #F6F3EE; padding: 2px 8px; border-radius: 4px; }
    .tips { margin-top: 6px; }
    .tips span { display: block; font-size: 11px; color: #C4734F; margin-bottom: 2px; }
    
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #D8C7B3; }
    .footer p { font-size: 11px; color: #4A4A4A; }
    .footer .brand-footer { font-family: 'Playfair Display', serif; font-size: 16px; color: #C9A96E; margin-top: 8px; }
    
    @media print {
      body { padding: 20px; }
      .day-section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">Velosta</div>
    <h1>${destination.name}</h1>
    <div class="subtitle">${destination.state} · ${days.length} Days · ${destination.tripDetails.category}</div>
  </div>
  
  <div class="summary">
    <div class="summary-card">
      <div class="label">Duration</div>
      <div class="value">${days.length} Days</div>
    </div>
    <div class="summary-card">
      <div class="label">Total Cost</div>
      <div class="value">${formatCurrency(totalCost)}</div>
    </div>
    <div class="summary-card">
      <div class="label">Budget</div>
      <div class="value">${formatCurrency(budget)}</div>
    </div>
    <div class="summary-card">
      <div class="label">Savings</div>
      <div class="value">${formatCurrency(Math.max(0, budget - totalCost))}</div>
    </div>
  </div>
  
  <div class="budget-bar">
    <h3>Budget Breakdown</h3>
    <div class="budget-items">
      <div class="budget-item"><div class="cat">🏨 Stay</div><div class="amt">${formatCurrency(breakdown.accommodation)}</div></div>
      <div class="budget-item"><div class="cat">🍽️ Food</div><div class="amt">${formatCurrency(breakdown.food)}</div></div>
      <div class="budget-item"><div class="cat">🏔️ Activities</div><div class="amt">${formatCurrency(breakdown.activities)}</div></div>
      <div class="budget-item"><div class="cat">🚌 Transport</div><div class="amt">${formatCurrency(breakdown.transport)}</div></div>
      <div class="budget-item"><div class="cat">💰 Buffer</div><div class="amt">${formatCurrency(breakdown.buffer)}</div></div>
    </div>
  </div>
  
  ${daysHTML}
  
  <div class="footer">
    <p>Generated on ${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
    <div class="brand-footer">Velosta — Where Journeys Begin in Space</div>
  </div>
</body>
</html>`
}

/**
 * Copy a shareable link / itinerary summary to clipboard.
 */
export function shareItinerary(
  destination: Destination,
  days: DayPlan[],
  budget: number
): string {
  const totalCost = days.reduce(
    (sum, day) => sum + day.nodes.reduce((s, n) => s + n.cost, 0),
    0
  )

  let text = `🌏 My ${destination.name} Trip Plan — via Velosta\n\n`
  text += `📍 ${destination.state} | ${days.length} Days | ₹${totalCost.toLocaleString('en-IN')}\n\n`

  days.forEach((day) => {
    text += `━━ Day ${day.day}: ${day.theme} ━━\n`
    day.nodes.forEach((node) => {
      text += `  ${node.time} — ${node.title} (₹${node.cost.toLocaleString('en-IN')})\n`
    })
    text += '\n'
  })

  text += `\n✨ Plan your trip at velosta.in`

  navigator.clipboard.writeText(text).catch(() => {
    // Fallback: select text
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  })

  return text
}
