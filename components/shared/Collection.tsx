import { ICampaign } from "@/lib/database/models/campaign.model";
import React from "react";
import Card from "./Card";

type CollectionProps = {
  data: ICampaign[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages: number,
  collectionType?: "Campaigns_Organized" | "Campaigns_Created" | "All_Campaigns" | "My_Donation",
  urlParamName?: string,
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((campaign) => {
              const hasOrderLink = collectionType === 'Campaigns_Organized';
              const hidePrice = collectionType === 'Campaigns_Created';
              
            
              return (
                <li key={campaign._id} className="flex justify-center">
                  <Card campaign={campaign} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                </li>
              )
            })}
          </ul>

        </div>
      ): (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )} 
    </>
  )
};

export default Collection;
