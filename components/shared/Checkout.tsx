import { ICampaign } from '@/lib/database/models/campaign.model'
import React, { useEffect } from 'react'
import { Button } from '../ui/button';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = ({campaign,userId}: {campaign:ICampaign,userId: string}) => {

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


  const onCheckout = async() =>{
    console.log("CheckOut");
  }
  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {campaign.isFree? ("Contribute"):("Donate")}
      </Button>
    </form>
  )
}

export default Checkout