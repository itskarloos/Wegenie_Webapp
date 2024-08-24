"use client"
import { ICampaign } from '@/lib/database/models/campaign.model'
import { SignInButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'




const CheckoutButton = ({ campaign }: { campaign: ICampaign }) => {
    const { user } = useUser()
    const userId = user?.publicMetadata.userId as string
    const hasCampaignFinished = new Date(campaign.endDateTime) < new Date();
    return (
        <>
            {hasCampaignFinished ? (
                <p className='p-2 text-red-400'>Sorry,The Campaign is not available</p>
            ) : (
                <>
                    <SignedOut>
                        <SignInButton fallbackRedirectUrl={`/campaigns/${campaign.id}`}>
                        <Button size="lg" className="emerald-600 sm:w-fit"> Donate </Button>
                            </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <Checkout campaign={campaign} userId={userId} />
                    </SignedIn>

                </>
            )}
        </>
    )
}

export default CheckoutButton