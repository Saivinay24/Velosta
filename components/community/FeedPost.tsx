'use client'

import { motion } from 'framer-motion'
import { getUserById, getAvatarColor, getAvatarInitials, getBadgeById } from '@/lib/community/data'
import { QUEST_CATEGORY_META, type FeedPost, type PostType } from '@/lib/community/types'
import { Heart, MessageCircle, Share2, Zap } from 'lucide-react'
import Link from 'next/link'
import { getQuestById } from '@/lib/community/data'

const postTypeLabels: Record<PostType, { icon: string; label: string }> = {
  quest_completion: { icon: '🎯', label: 'Quest Completion' },
  vlog: { icon: '🎬', label: 'Vlog' },
  trip_story: { icon: '📖', label: 'Trip Story' },
  meetup_recap: { icon: '🤝', label: 'Meetup Recap' },
  tip: { icon: '💡', label: 'Tip' },
  review: { icon: '⭐', label: 'Review' },
}

export default function FeedPostCard({ post, index = 0 }: { post: FeedPost; index?: number }) {
  const user = getUserById(post.userId)
  const postMeta = postTypeLabels[post.type]
  const quest = post.questId ? getQuestById(post.questId) : null

  if (!user) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="glass-panel rounded-2xl p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ background: getAvatarColor(user.username) }}
          >
            {getAvatarInitials(user.displayName)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-charcoal">@{user.username}</span>
              {user.trustTier >= 2 && <span className="text-xs" title="Verified">✅</span>}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-charcoal-light/40">
              <span>{new Date(post.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
              <span>·</span>
              <span>Lv.{user.level}</span>
            </div>
          </div>
        </div>
        <span
          className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-beige/60 text-charcoal-light/60"
        >
          {postMeta.icon} {postMeta.label}
        </span>
      </div>

      {/* Quest badge (if quest completion) */}
      {quest && (
        <Link href={`/community/quests/${quest.id}`}>
          <div className="flex items-center gap-2 mb-3 p-2 rounded-xl bg-beige/30 hover:bg-beige/50 transition-colors cursor-pointer">
            <span className="text-sm">{QUEST_CATEGORY_META[quest.category].icon}</span>
            <span className="text-xs font-medium text-charcoal">&ldquo;{quest.title}&rdquo;</span>
            <span className="flex items-center gap-0.5 text-[10px] text-gold ml-auto">
              <Zap className="w-3 h-3" />
              +{quest.xpReward} XP
            </span>
          </div>
        </Link>
      )}

      {/* Content */}
      <p className="text-sm text-charcoal leading-relaxed mb-4">
        {post.content}
      </p>

      {/* Media */}
      {post.mediaUrls.length > 0 && post.type === 'vlog' && (
        <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 relative group cursor-pointer">
          <img
            src={post.mediaUrls[0]}
            alt="Vlog thumbnail"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-warm-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-terracotta text-xl ml-1">▶</span>
            </div>
          </div>
        </div>
      )}

      {post.mediaUrls.length > 0 && post.type !== 'vlog' && (
        <div className="w-full aspect-[3/2] rounded-xl overflow-hidden mb-4 group cursor-pointer">
          <img
            src={post.mediaUrls[0]}
            alt="Post photo"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {post.mediaUrls.length === 0 && post.type === 'vlog' && (
        <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-beige to-sandstone/30 mb-4 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-warm-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <span className="text-terracotta text-xl ml-1">▶</span>
          </div>
        </div>
      )}

      {/* Featured badge */}
      {post.isFeatured && (
        <div className="flex items-center gap-1 mb-3 text-[10px] text-gold font-medium">
          <span>⭐</span> Featured by community
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-sandstone/20">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-xs text-charcoal-light/50 hover:text-terracotta transition-colors">
            <Heart className="w-4 h-4" />
            <span>{post.likesCount}</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs text-charcoal-light/50 hover:text-terracotta transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{post.commentsCount}</span>
          </button>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-charcoal-light/50 hover:text-terracotta transition-colors">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </motion.div>
  )
}
