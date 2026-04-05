'use client'

import { motion, type Variants } from 'framer-motion'
import { Star } from 'lucide-react'
import { Testimonial } from '@/lib/types'

interface MasonryWallProps {
  testimonials: Testimonial[]
  accentColor?: string
  columns?: 2 | 3
}

function StarRating({ rating, accentColor }: { rating: number; accentColor: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="w-3.5 h-3.5"
          style={{
            fill: star <= rating ? accentColor : 'transparent',
            stroke: star <= rating ? accentColor : '#52525b',
          }}
        />
      ))}
    </div>
  )
}

function AuthorAvatar({ name, accentColor }: { name: string; accentColor: string }) {
  const initial = name.trim().charAt(0).toUpperCase()
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
      style={{ background: accentColor }}
      aria-hidden
    >
      {initial}
    </div>
  )
}

function TestimonialCard({
  testimonial,
  accentColor,
}: {
  testimonial: Testimonial
  accentColor: string
}) {
  const byline = [testimonial.author_title, testimonial.author_company]
    .filter(Boolean)
    .join(' @ ')

  return (
    <motion.article
      className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 break-inside-avoid cursor-default"
      whileHover={{
        y: -4,
        boxShadow: `0 12px 40px -8px ${accentColor}30`,
        borderColor: `${accentColor}40`,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Rating */}
      {testimonial.rating !== null && (
        <div className="mb-3">
          <StarRating rating={testimonial.rating} accentColor={accentColor} />
        </div>
      )}

      {/* Video */}
      {testimonial.type === 'video' && testimonial.media_url && (
        <div className="mb-4 rounded-xl overflow-hidden bg-black aspect-video">
          <video
            src={testimonial.media_url}
            controls
            className="w-full h-full object-cover"
            preload="metadata"
          />
        </div>
      )}

      {/* Content */}
      {testimonial.content && (
        <p className="text-zinc-300 text-sm leading-relaxed mb-4">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      )}

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-zinc-800/60">
        <AuthorAvatar name={testimonial.author_name} accentColor={accentColor} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{testimonial.author_name}</p>
          {byline && (
            <p className="text-xs text-zinc-500 truncate">{byline}</p>
          )}
        </div>
      </div>
    </motion.article>
  )
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 18 },
  },
}

export default function MasonryWall({
  testimonials,
  accentColor = '#8b5cf6',
  columns = 3,
}: MasonryWallProps) {
  if (testimonials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-5"
          style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}30` }}
        >
          ✨
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No testimonials yet</h3>
        <p className="text-sm text-zinc-500">Be the first to share your experience!</p>
      </div>
    )
  }

  const colClass = columns === 2 ? 'columns-1 sm:columns-2' : 'columns-1 sm:columns-2 lg:columns-3'

  return (
    <motion.div
      className={`${colClass} gap-4`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {testimonials.map((testimonial) => (
        <motion.div key={testimonial.id} variants={itemVariants} className="mb-4">
          <TestimonialCard testimonial={testimonial} accentColor={accentColor} />
        </motion.div>
      ))}
    </motion.div>
  )
}
