import { ICampaign } from '@/lib/database/models/campaign.model'
import React, { useEffect } from 'react'
import { Button } from '../ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order.actions';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Minus, Plus, HandCoins } from 'lucide-react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = ({ campaign, userId }: { campaign: ICampaign, userId: string }) => {
  const [amount, setAmount] = React.useState(100)

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);


  const onCheckout = async () => {

    const order = {
      campaignTitle: campaign.title,
      campaignId: campaign._id,

      donatedAmount: amount.toString(),

      buyerId: userId
    }
    await checkoutOrder(order);
  }





  function onClick(adjustment: number) {
    setAmount(Math.max(10, Math.min(1000000, amount + adjustment)))
  }


  return (

    <Drawer>
      <DrawerTrigger asChild>
      <Button size="lg" className="emerald-600 sm:w-fit"><HandCoins className="mr-2 h-4 w-4" /> Donate</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Contribute</DrawerTitle>
            <DrawerDescription>Choose amount and proceed</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={amount <= 10}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {amount}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Birr
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={amount >= 1000000}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button type="submit" onClick={onCheckout}>
              Donate amount
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>

  )
}

export default Checkout