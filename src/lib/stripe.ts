import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/server'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

/**
 * Returns the existing Stripe customer ID for a user, or creates a new one
 * and persists it to the `profiles` table.
 */
export async function getOrCreateStripeCustomer(userId: string): Promise<string> {
  const supabase = createAdminClient()

  // 1. Check if a customer ID is already stored
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('stripe_customer_id, email, full_name')
    .eq('id', userId)
    .single()

  if (error) {
    throw new Error(`Failed to fetch profile for user ${userId}: ${error.message}`)
  }

  if (profile?.stripe_customer_id) {
    return profile.stripe_customer_id
  }

  // 2. Create a new Stripe customer
  const customer = await stripe.customers.create({
    email: profile?.email ?? undefined,
    name: profile?.full_name ?? undefined,
    metadata: {
      supabase_user_id: userId,
    },
  })

  // 3. Persist the customer ID back to Supabase
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ stripe_customer_id: customer.id })
    .eq('id', userId)

  if (updateError) {
    throw new Error(`Failed to save Stripe customer ID for user ${userId}: ${updateError.message}`)
  }

  return customer.id
}
