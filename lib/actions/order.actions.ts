"use server";

import { CheckoutOrderParams, CreateOrderParams, GetOrdersByCampaignParams, GetOrdersByUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import Order from "../database/models/order.model";
import { json } from "stream/consumers";
import Campaign from "../database/models/campaign.model";
import User from "../database/models/user.model";
import {ObjectId} from 'mongodb';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,

            product_data: {
              name: order.campaignTitle,
            },
          },
          quantity: 1,
        },
      ],

      metadata: {
        campaignId: order.campaignId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();
    const newOrder = await Order.create({
      ...order,
      campaign: order.campaignId,
      buyer: order.buyerId,
    });
    return JSON.parse(JSON.stringify(newOrder))
  } catch (error) {
    handleError(error);
  }
};



export async function getOrdersByCampaign({ searchString, campaignId }: GetOrdersByCampaignParams) {
  try {
    await connectToDatabase()

    if (!campaignId) throw new Error('Campaign ID is required')
    const campaignObjectId = new ObjectId(campaignId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'campaigns',
          localField: 'campaign',
          foreignField: '_id',
          as: 'campaign',
        },
      },
      {
        $unwind: '$campaign',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          campaignTitle: '$campaign.title',
          campaignId: '$campaign._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
        },
      },
      {
        $match: {
          $and: [{ campaignId: campaignObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.distinct('event._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'campaign',
        model: Campaign,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id firstName lastName',
        },
      })

    const ordersCount = await Order.distinct('campaign._id').countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  } catch (error) {
    handleError(error)
  }
}