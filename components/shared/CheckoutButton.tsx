"use client"
import { ICampaign } from '@/lib/database/models/campaign.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'




const CheckoutButton = ({campaign}:{campaign:ICampaign}) => {
    const { user } = useUser()
    const userId= user?.publicMetadata.userId as string
    const hasCampaignFinished = new Date(campaign.endDateTime) < new Date();
  return (
    <div className="flex item-center gap-2">
        {hasCampaignFinished? (
            <p className='p-2 text-red-400'>Sorry,The Campaign is not available</p>
        ): (
            <>
                <SignedOut>
                    <Button asChild className="button rounded-full" size="lg">
                        <Link href="/sign-in">
                            Donate Now
                        </Link>
                    </Button>
                </SignedOut>
                
                    <SignedIn>
                    <Checkout campaign={campaign} userId={userId}/>
                    </SignedIn>
            </>        
        )}
    </div>
  )
}

export default CheckoutButton