export type Plan = 'free' | 'pro' | 'business'

// ---------------------------------------------------------------------------
// Database row types (mirror Supabase schema)
// ---------------------------------------------------------------------------

export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  stripe_customer_id: string | null
  plan: Plan
  created_at: string
  updated_at: string
}

export type WallTheme = 'light' | 'dark' | 'glass' | 'gradient' | 'minimal'

export interface WallSettings {
  primary_color: string
  background_color: string
  text_color: string
  font_family: string
  border_radius: 'none' | 'sm' | 'md' | 'lg' | 'full'
  card_shadow: boolean
  show_rating: boolean
  show_date: boolean
  show_avatar: boolean
  layout: 'grid' | 'masonry' | 'carousel' | 'list'
  columns: 1 | 2 | 3 | 4
  animation: 'none' | 'fade' | 'slide' | 'zoom'
}

export interface Wall {
  id: string
  user_id: string
  name: string
  slug: string
  description: string | null
  theme: WallTheme
  settings: WallSettings
  is_published: boolean
  custom_domain: string | null
  testimonials_count: number
  created_at: string
  updated_at: string
}

export type TestimonialType = 'text' | 'video' | 'audio'
export type TestimonialStatus = 'pending' | 'approved' | 'rejected'

export interface Testimonial {
  id: string
  wall_id: string
  author_name: string
  author_email: string | null
  author_avatar_url: string | null
  author_title: string | null
  author_company: string | null
  author_website: string | null
  content: string
  rating: 1 | 2 | 3 | 4 | 5 | null
  type: TestimonialType
  media_url: string | null
  status: TestimonialStatus
  is_featured: boolean
  source: string | null
  source_url: string | null
  tags: string[]
  created_at: string
  updated_at: string
}

// ---------------------------------------------------------------------------
// Pricing / plan metadata (not from DB — defined in constants.ts)
// ---------------------------------------------------------------------------

export interface PlanLimits {
  walls: number | 'unlimited'
  testimonials_per_wall: number | 'unlimited'
  custom_domain: boolean
  remove_branding: boolean
  analytics: boolean
  export_csv: boolean
  video_testimonials: boolean
  api_access: boolean
}

export interface PricingPlan {
  id: Plan
  name: string
  description: string
  price_monthly: number
  stripe_price_id: string
  features: string[]
  limits: PlanLimits
  is_popular: boolean
}
