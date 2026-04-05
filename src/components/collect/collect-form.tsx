'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Send, CheckCircle } from 'lucide-react'

interface CollectFormProps {
  wallId: string
  accentColor?: string
}

interface FormState {
  rating: number
  content: string
  authorName: string
  authorEmail: string
  authorTitle: string
  authorCompany: string
}

const INITIAL_FORM: FormState = {
  rating: 0,
  content: '',
  authorName: '',
  authorEmail: '',
  authorTitle: '',
  authorCompany: '',
}

// Simple confetti particle component
function ConfettiParticle({ index }: { index: number }) {
  const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#f97316']
  const color = colors[index % colors.length]
  const size = Math.random() * 8 + 4
  const left = Math.random() * 100
  const delay = Math.random() * 0.5

  return (
    <motion.div
      className="absolute rounded-sm pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        left: `${left}%`,
        top: '-10px',
      }}
      initial={{ y: -10, opacity: 1, rotate: 0 }}
      animate={{
        y: 400,
        opacity: [1, 1, 0],
        rotate: Math.random() * 720 - 360,
        x: (Math.random() - 0.5) * 200,
      }}
      transition={{
        duration: 1.8,
        delay,
        ease: 'easeOut',
      }}
    />
  )
}

export default function CollectForm({ wallId, accentColor = '#8b5cf6' }: CollectFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleStarClick = (star: number) => {
    setForm((prev) => ({ ...prev, rating: star }))
  }

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.authorName.trim()) {
      setError('Your name is required.')
      return
    }
    if (!form.content.trim()) {
      setError('Please share your experience.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallId,
          authorName: form.authorName,
          authorEmail: form.authorEmail || undefined,
          content: form.content,
          rating: form.rating || undefined,
          authorTitle: form.authorTitle || undefined,
          authorCompany: form.authorCompany || undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error ?? 'Failed to submit testimonial')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="relative overflow-hidden">
        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <ConfettiParticle key={i} index={i} />
          ))}
        </div>

        <motion.div
          className="flex flex-col items-center justify-center py-16 px-6 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1, stiffness: 200 }}
          >
            <CheckCircle className="w-20 h-20 mb-6" style={{ color: accentColor }} />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-3">Thank you so much!</h2>
          <p className="text-zinc-400 text-base max-w-sm">
            Your testimonial has been submitted and is under review. We truly appreciate you taking
            the time to share your experience.
          </p>
        </motion.div>
      </div>
    )
  }

  const inputClass =
    'w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all'

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      {/* Star rating */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-3">
          How would you rate your experience?
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => {
            const filled = star <= (hoveredStar || form.rating)
            return (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="focus:outline-none"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                <Star
                  className="w-9 h-9 transition-colors duration-100"
                  style={{
                    fill: filled ? accentColor : 'transparent',
                    stroke: filled ? accentColor : '#52525b',
                  }}
                />
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Testimonial content */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Your experience <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Tell us what you loved, how it helped you, or what results you achieved..."
          value={form.content}
          onChange={(e) => handleChange('content', e.target.value)}
          className={inputClass}
          style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
        />
      </div>

      {/* Author name */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Your name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="Jane Smith"
          value={form.authorName}
          onChange={(e) => handleChange('authorName', e.target.value)}
          className={inputClass}
          style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Email address <span className="text-zinc-500">(optional)</span>
        </label>
        <input
          type="email"
          placeholder="jane@example.com"
          value={form.authorEmail}
          onChange={(e) => handleChange('authorEmail', e.target.value)}
          className={inputClass}
          style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
        />
      </div>

      {/* Title + Company row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Job title <span className="text-zinc-500">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="CEO"
            value={form.authorTitle}
            onChange={(e) => handleChange('authorTitle', e.target.value)}
            className={inputClass}
            style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Company <span className="text-zinc-500">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="Acme Corp"
            value={form.authorCompany}
            onChange={(e) => handleChange('authorCompany', e.target.value)}
            className={inputClass}
            style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-sm text-red-400 bg-red-950/40 border border-red-800/40 rounded-lg px-4 py-2"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: accentColor }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Submitting...
          </span>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit testimonial
          </>
        )}
      </motion.button>

      <p className="text-center text-xs text-zinc-600">
        Your testimonial will be reviewed before being published.
      </p>
    </motion.form>
  )
}
