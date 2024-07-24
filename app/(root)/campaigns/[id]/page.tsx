import { getCampaignById } from "@/lib/actions/campaign.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";

const CampaignDetails = async ({ params: { id } }: SearchParamProps) => {
  const campaign = await getCampaignById(id);
  console.log(campaign);
  return (
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid gird-col-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={campaign.imageUrl}
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />
      </div>
    </section>
  );
};

export default CampaignDetails;
