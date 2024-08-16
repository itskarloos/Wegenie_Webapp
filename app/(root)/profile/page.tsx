import CampaignContributionTable from '@/components/shared/CampaignTable'
import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getCampaignsByUser } from '@/lib/actions/campaign.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({searchParams}: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const campaignsPage = Number(searchParams?.campaignsPage) || 1;
  const organizedCampaigns = await getCampaignsByUser({ userId, page: campaignsPage })
  const orders = await getOrdersByUser({ userId, page: ordersPage })
  const orderedCampaign = orders?.data.map((order: IOrder) => order.campaign || [])
  console.log(orders)
 
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Donated Campaign</h3>
          <Button asChild size="lg" className='button hidden sm:flex'>
            <Link href="/#campaings">
              Explore More Campaigns
            </Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        {/* <Collection
          data={orderedCampaign}
          emptyTitle="No campaign contribution"
          emptyStateSubtext="Explore and donate for the right cause"
          collectionType="My_Donation"
          urlParamName='donatedPage'
          limit={2}
          page={ordersPage}
          totalPages={orders?.totalPages}
        /> */}
        <CampaignContributionTable campaignTableOrders={orders} />
      </section>

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Created Campaigns</h3>
          <Button asChild size="lg" className='button hidden sm:flex'>
            <Link href="/campaings/create">
              Create New Campaign
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedCampaigns?.data}
          emptyTitle="No campaigns created"
          emptyStateSubtext="Create and fundraise for the right cause"
          collectionType="Campaigns_Organized"
          urlParamName='campaignsPage'
          limit={3}
          page={campaignsPage}
          totalPages={organizedCampaigns?.totalPages}
        />
      </section>
    </>
  )
}

export default ProfilePage