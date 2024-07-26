import { ICampaign } from "@/lib/database/models/campaign.model";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import React from "react";
type CardProps = {
  campaign: ICampaign;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const Card = ({ campaign, hasOrderLink, hidePrice }: CardProps) => {
  console.log(campaign);
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/campaigns/${campaign._id}`}
        style={{ backgroundImage: `url(${campaign.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      <Link
        href={`/campaigns/${campaign._id}`}
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      >
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {campaign.isFree ? "FREE" : `$${campaign.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500">
              {campaign.category.name}
            </p>
          </div>
          
        )}
        <p className="p-medium-16 md:p-medium-18 text-grey-500">
            {formatDateTime(campaign.startDateTime).dateTime}
          </p>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{campaign.title}</p>
          <div className="flex-between w-full">
            <p className="p-medium-14 md:p-medium-16 text-grey-600">
              {campaign.organizer.firstName} {campaign.organizer.lastName}
            </p>
            {hasOrderLink &&(<Link href={'/orders?campaignId=${campaign._id}'} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
            </Link>)}
          </div>
      </Link>
    </div>
  );
};

export default Card;
