import { getCampaignById } from '@/lib/actions/campaign.actions';
import { SearchParamProps } from '@/types'
import React from 'react'

const CampaignDetails = async({ params : { id }}: SearchParamProps) => {
  const campaign = await getCampaignById(id);
  console.log(campaign)
  return (
    <div>page</div>
  )
}

export default CampaignDetails