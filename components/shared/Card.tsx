// "use client"
import { ICampaign } from "@/lib/database/models/campaign.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Progress } from "@/components/ui/progress"
import { CircleCheck } from 'lucide-react';




type CardProps = {
  campaign: ICampaign;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const Card = ({ campaign, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as String;
  const isCampaignCreator = userId === campaign.organizer._id.toString();
  const progress = (parseFloat(campaign.donatedAmount) / parseFloat(campaign.campaignAmount)) * 100;




  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/campaigns/${campaign._id}`}
        style={{ backgroundImage: `url(${campaign.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      {isCampaignCreator && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/campaigns/${campaign._id}/update`} >
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>
          <DeleteConfirmation campaignId={campaign._id} />
        </div>

      )}
      <div
        className="flex min-h-[230px] flex-col gap-2 p-5 md:gap-3"
      >
        <Link href={`/campaigns/${campaign._id}`}>
          <div
            className="flex flex-row gap-2 md:gap-3"
          >
            <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black py-2">{campaign.title} {campaign.isVerified && (<CircleCheck />)}</p>
          </div>
          <Progress value={progress} className="w-[100%]" />

        </Link>

        {!hidePrice && (
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
                ${campaign.campaignAmount}
              </span>
              <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
                {campaign.category.name}
              </p>
            </div>
            <p className="p-semibold-14 w-max px-4 py-1 text-black">
              {campaign.donatedAmount}$ • Raised
            </p>
          </div>

        )}


        <p className="p-regular-12 md:p-regular-14 text-grey-500">
          {formatDateTime(campaign.startDateTime).dateTime}
        </p>



        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            by {campaign.organizer.firstName} {campaign.organizer.lastName}
          </p>
          {hasOrderLink && (<Link href={`/orders?campaignId=${campaign._id}`} className="flex gap-2">
            <p className="text-primary-500">Order Details</p>
            <Image src="/assets/icons/arrow.svg" height={10} width={10} alt="Search" />
          </Link>)}
        </div>
      </div>
    </div>
  );
};

export default Card;
