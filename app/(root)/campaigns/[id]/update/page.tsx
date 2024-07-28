import CampaignForm from '@/components/shared/CampaignForm'
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import { getCampaignById } from "@/lib/actions/campaign.actions";

type UpdateCampaignProps={
  params: {
    id:string
  }
}
const UpdateCampaign = async({ params: { id } }: UpdateCampaignProps) => {

    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;
    const campaign = await getCampaignById(id)
    console.log("Update campaignId : ", id)
  return (
    <>
    <section className = "bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Campaign</h3>
    </section>
    <div className="wrapper my-8">
    <CampaignForm campaign={campaign} campaignId={campaign._id} userId={userId} type="Update"/>
    </div>
    </>
  )
}

export default UpdateCampaign