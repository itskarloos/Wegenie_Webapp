import { ICampaign } from '@/lib/database/models/campaign.model'
import React from 'react'

type CollectionProps = {
  data: ICampaign[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages: number,
  collectionType: string,
  urlParamName?: string,
}

const Collection = ({data,emptyTitle,emptyStateSubtext,page,totalPages = 0, collectionType,urlParamName,} : CollectionProps) => {
  return (
    <div>Collection</div>
  )
}

export default Collection