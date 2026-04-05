import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Plan limits mapping — keep in sync with your pricing config
const PLAN_CONFIG: Record<
  string,
  {
    plan: string
    walls_limit: number | null
    testimonials_limit: number | null
  }
> = {
  free: { plan: 'free', walls_limit: 1, testimonials_limit: 50 },
  pro: { plan: 'pro', walls_limit: 5, testimonials_limit: 500 },
  business: { plan: 'business', walls_limit: null, testimonials_limit: null },
}

// Map Stripe price IDs to internal plan keys.
// These should match your NEXT_PUBLIC_STRIPE_PRICE_ID_* env vars.
function planFromPriceId(priceId: string): string {
  const map: Record<string, string> = {
    [process.env.STRIPE_PRICE_ID_PRO ?? '']: 'pro',
    [process.env.STRIPE_PRICE_ID_BUSINESS ?? '']: 'business',
  }
  return map[priceId] ?? 'free'
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Stripe Webhook] Signature verification failed:', message)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  const admin = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string
        const userId = session.metadata?.supabase_user_id

        if (!userId) {
          console.warn('[Stripe Webhook] checkout.session.completed: missing supabase_user_id metadata')
          break
        }

        // Retrieve subscription to get price ID
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const priceId = subscription.items.data[0]?.price.id ?? ''
        const planKey = planFromPriceId(priceId)
        const config = PLAN_CONFIG[planKey] ?? PLAN_CONFIG.free

        await admin
          .from('wol_users')
          .update({
            plan: config.plan,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            walls_limit: config.walls_limit,
            testimonials_limit: config.testimonials_limit,
          })
          .eq('auth_id', userId)

        console.log(`[Stripe Webhook] User ${userId} upgraded to plan: ${config.plan}`)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        const priceId = subscription.items.data[0]?.price.id ?? ''
        const planKey = planFromPriceId(priceId)
        const config = PLAN_CONFIG[planKey] ?? PLAN_CONFIG.free

        await admin
          .from('wol_users')
          .update({
            plan: config.plan,
            stripe_subscription_id: subscription.id,
            walls_limit: config.walls_limit,
            testimonials_limit: config.testimonials_limit,
          })
          .eq('stripe_customer_id', customerId)

        console.log(`[Stripe Webhook] Subscription updated for customer ${customerId}: plan ${config.plan}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        const freeConfig = PLAN_CONFIG.free

        await admin
          .from('wol_users')
          .update({
            plan: freeConfig.plan,
            stripe_subscription_id: null,
            walls_limit: freeConfig.walls_limit,
            testimonials_limit: freeConfig.testimonials_limit,
          })
          .eq('stripe_customer_id', customerId)

        console.log(`[Stripe Webhook] Subscription cancelled for customer ${customerId} — downgraded to free`)
        break
      }

      default:
        // Unhandled event type — acknowledge receipt
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`)
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Stripe Webhook] Handler error:', message)
    return NextResponse.json({ error: 'Internal webhook handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
