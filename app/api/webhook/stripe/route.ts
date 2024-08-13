import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'
import { updateDonatedAmount } from '@/lib/actions/campaign.actions'

export async function POST(request: Request) {
  const body = await request.text()

  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let campaign

  try {
    campaign = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  // Get the ID and type
  const campaignType = campaign.type

  // CREATE
  if (campaignType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = campaign.data.object
    console.log(campaign.data.object)

    const order = {
      stripeId: id,
      campaignId: metadata?.campaignId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
      donatedAmount: amount_total ? (amount_total / 100).toString() : '0',
    }

    const newOrder = await createOrder(order)
    const updatedCampaign = await updateDonatedAmount(order)

    return NextResponse.json({ message: 'OK', order: newOrder, campaign: updatedCampaign })
  }

  return new Response('', { status: 200 })
}