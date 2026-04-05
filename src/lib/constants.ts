import type { PricingPlan } from '@/lib/types'

export const APP_NAME = 'WallOfLove'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://walloflove.eazyweb.nc'
export const SUPPORT_EMAIL = 'support@walloflove.eazyweb.nc'

// ---------------------------------------------------------------------------
// Pricing plans
// ---------------------------------------------------------------------------

export const PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started and testing the waters.',
    price_monthly: 0,
    stripe_price_id: '',
    is_popular: false,
    limits: {
      walls: 1,
      testimonials_per_wall: 10,
      custom_domain: false,
      remove_branding: false,
      analytics: false,
      export_csv: false,
      video_testimonials: false,
      api_access: false,
    },
    features: [
      '1 Wall',
      'Up to 10 testimonials per wall',
      'Text testimonials',
      'Public embed widget',
      'WallOfLove branding',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For creators and small businesses who want to grow with social proof.',
    price_monthly: 15,
    stripe_price_id: 'price_pro_placeholder',
    is_popular: true,
    limits: {
      walls: 5,
      testimonials_per_wall: 100,
      custom_domain: true,
      remove_branding: true,
      analytics: true,
      export_csv: true,
      video_testimonials: true,
      api_access: false,
    },
    features: [
      '5 Walls',
      'Up to 100 testimonials per wall',
      'Text & video testimonials',
      'Remove WallOfLove branding',
      'Custom domain',
      'Analytics dashboard',
      'Export to CSV',
      'Priority support',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Unlimited everything for agencies and growing teams.',
    price_monthly: 39,
    stripe_price_id: 'price_business_placeholder',
    is_popular: false,
    limits: {
      walls: 'unlimited',
      testimonials_per_wall: 'unlimited',
      custom_domain: true,
      remove_branding: true,
      analytics: true,
      export_csv: true,
      video_testimonials: true,
      api_access: true,
    },
    features: [
      'Unlimited Walls',
      'Unlimited testimonials',
      'Text, video & audio testimonials',
      'Remove WallOfLove branding',
      'Custom domain',
      'Advanced analytics',
      'Export to CSV',
      'REST API access',
      'Dedicated support',
      'Team members (coming soon)',
    ],
  },
]

export const PLAN_MAP = Object.fromEntries(PLANS.map((p) => [p.id, p])) as Record<
  (typeof PLANS)[number]['id'],
  PricingPlan
>

// ---------------------------------------------------------------------------
// Misc constants
// ---------------------------------------------------------------------------

export const MAX_WALLS_FREE = 1
export const MAX_TESTIMONIALS_FREE = 10
export const MAX_WALLS_PRO = 5
export const MAX_TESTIMONIALS_PRO = 100

export const TESTIMONIAL_STATUSES = ['pending', 'approved', 'rejected'] as const
export const WALL_THEMES = ['light', 'dark', 'glass', 'gradient', 'minimal'] as const
export const TESTIMONIAL_TYPES = ['text', 'video', 'audio'] as const
