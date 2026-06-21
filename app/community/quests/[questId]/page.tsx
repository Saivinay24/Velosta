'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CommunityNav from '@/components/community/CommunityNav'
import QuestCard from '@/components/community/QuestCard'
import { getQuestById, questSubmissions, quests, getUserById, getAvatarColor, getAvatarInitials } from '@/lib/community/data'
import { QUEST_CATEGORY_META, DIFFICULTY_META } from '@/lib/community/types'
import { ArrowLeft, Clock, Users, Star, Zap, Shield, Camera } from 'lucide-react'

export default function QuestDetailPage() {
  const params = useParams()
  const questId = params.questId as string
  const quest = getQuestById(questId)

  if (!quest) {
    return (
      <>
        <CommunityNav />
        <main className="pt-24 pb-8 px-4 max-w-4xl mx-auto text-center">
          <p className="text-charcoal-light/50">Quest not found.</p>
          <Link href="/community/quests" className="text-terracotta text-sm mt-4 inline-block hover:underline">
            ← Back to Quest Board
          </Link>
        </main>
      </>
    )
  }

  const catMeta = QUEST_CATEGORY_META[quest.category]
  const diffMeta = DIFFICULTY_META[quest.difficulty]
  const submissions = questSubmissions.filter(s => s.questId === questId)
  const relatedQuests = quests.filter(q => q.cityId === quest.cityId && q.id !== quest.id).slice(0, 3)

  return (
    <>
      <CommunityNav />

      <main className="pt-20 md:pt-24 pb-24 md:pb-8 px-4 max-w-4xl mx-auto">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <Link
            href="/community/quests"
            className="inline-flex items-center gap-2 text-sm text-charcoal-light/50 hover:text-terracotta transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Quest Board
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quest header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-6 md:p-8"
            >
              {/* Category & difficulty */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full flex items-center gap-1.5"
                  style={{ background: `${catMeta.color}15`, color: catMeta.color }}
                >
                  <span className="text-sm">{catMeta.icon}</span>
                  {catMeta.label}
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: `${diffMeta.color}12`, color: diffMeta.color }}
                >
                  {diffMeta.label}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal mb-4 leading-tight">
                {quest.title}
              </h1>

              {/* Description */}
              <p className="text-sm text-charcoal-light/70 leading-relaxed mb-6">
                {quest.description}
              </p>

              {/* Hint */}
              <div className="glass-panel rounded-xl p-4 mb-6 border-l-4" style={{ borderColor: catMeta.color }}>
                <p className="text-xs text-charcoal-light/40 uppercase tracking-wide font-medium mb-1">Hint</p>
                <p className="text-sm text-charcoal italic">&ldquo;{quest.hint}&rdquo;</p>
              </div>

              {/* Verification prompt */}
              <div className="bg-beige/30 rounded-xl p-4 mb-6">
                <p className="text-xs text-charcoal-light/40 uppercase tracking-wide font-medium mb-1">Verification</p>
                <div className="flex items-start gap-2">
                  <Camera className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-charcoal">{quest.verificationPrompt}</p>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { icon: Zap, label: 'XP Reward', value: `+${quest.xpReward}`, color: '#C9A96E' },
                  { icon: Clock, label: 'Duration', value: quest.estimatedDuration < 60 ? `${quest.estimatedDuration}m` : `${Math.round(quest.estimatedDuration / 60)}h`, color: '#4A9B6E' },
                  { icon: Users, label: 'Completed', value: String(quest.completionCount), color: '#6366f1' },
                  { icon: Star, label: 'Rating', value: quest.averageRating.toFixed(1), color: '#C4734F' },
                ].map(stat => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="text-center p-3 rounded-xl bg-beige/30">
                      <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: stat.color }} />
                      <p className="text-lg font-bold text-charcoal">{stat.value}</p>
                      <p className="text-[9px] text-charcoal-light/40 font-medium uppercase tracking-wide">{stat.label}</p>
                    </div>
                  )
                })}
              </div>

              {/* Time window */}
              {quest.timeWindow && (
                <div className="flex items-center gap-2 text-xs text-gold bg-gold/10 rounded-xl p-3 mb-6">
                  <span>⏰</span>
                  <span>This quest is only available between {quest.timeWindow.startHour}:00 and {quest.timeWindow.endHour}:00</span>
                </div>
              )}

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-warm-white font-medium text-base tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, #C4734F 0%, #C9A96E 100%)',
                  boxShadow: '0 4px 20px rgba(196, 115, 79, 0.3)',
                }}
              >
                Complete Quest
              </motion.button>
            </motion.div>

            {/* Past submissions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-panel rounded-2xl p-6"
            >
              <h2 className="font-serif text-lg font-semibold text-charcoal mb-4">Past Submissions</h2>
              {submissions.length > 0 ? (
                <div className="space-y-4">
                  {submissions.map((sub, idx) => {
                    const user = getUserById(sub.userId)
                    if (!user) return null
                    return (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex gap-3 p-3 rounded-xl bg-beige/30"
                      >
                        {/* Submission photo */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          {sub.mediaUrl ? (
                            <img src={sub.mediaUrl} alt={sub.caption} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-sandstone/30 to-beige flex items-center justify-center">
                              <span className="text-2xl opacity-20">📸</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
                              style={{ background: getAvatarColor(user.username) }}
                            >
                              {getAvatarInitials(user.displayName)}
                            </div>
                            <span className="text-xs font-medium text-charcoal">@{user.username}</span>
                            <span className="text-[10px] text-charcoal-light/40">
                              {new Date(sub.completedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-xs text-charcoal-light/60 line-clamp-2">{sub.caption}</p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-gold">
                            <Star className="w-3 h-3" />
                            {sub.rating.toFixed(1)}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-charcoal-light/40 text-center py-4">
                  No submissions yet. Be the first to complete this quest!
                </p>
              )}
            </motion.div>
          </div>

          {/* Sidebar — Related quests */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="font-serif text-lg font-semibold text-charcoal mb-3">Related Quests</h2>
              <div className="space-y-3">
                {relatedQuests.map((q, idx) => (
                  <QuestCard key={q.id} quest={q} index={idx} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
