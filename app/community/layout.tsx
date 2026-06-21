import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Velosta Community — Where Every Trip Becomes a Legend',
  description: 'Join the Velosta community. Complete quests, earn badges, attend meetups, and turn every trip into a story worth telling.',
}

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-ivory">
      {children}
    </div>
  )
}
