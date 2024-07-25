import { ICampaign } from '@/lib/database/models/campaign.model'
import Link from 'next/link'
import React from 'react'
type CardProps = {
  campaign: ICampaign,
  hasOrderLink: boolean,
  hidePrice: boolean
}
const Card = ( {campaign,hasOrderLink,hidePrice} : CardProps) => {
  return (
    <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]'>
      <Link href={`/campaings/${campaign._id}`} style={{backgroundImage: `url(${campaign.imageUrl})`}}
      className='flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500'
      >
      </Link>
      </div>
  )
}

export default Card