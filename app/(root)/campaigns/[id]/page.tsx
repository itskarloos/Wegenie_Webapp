import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import { Progress } from "@/components/ui/progress";
import { getCampaignById, getRelatedCampaignsByCategory } from "@/lib/actions/campaign.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";

const CampaignDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const campaign = await getCampaignById(id);
  const relatedCampaigns = await getRelatedCampaignsByCategory({
    categoryId: campaign.category._id,
    campaignId: campaign._id,
    page: searchParams.page as string,}
  )
  const progress = (parseFloat(campaign.donatedAmount) / parseFloat(campaign.campaignAmount)) * 100;

  return (
    <>
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">

        <Image
          src={campaign.imageUrl}
          alt="hero image"
          width={1000}
          height={1000}
          className="min-h-[300px] object-contain object-center"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-8">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold">{campaign.title}</h2>
            <Progress value= {progress} className="w-[100%]" />
            
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  ${campaign.campaignAmount}
                </p>
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {campaign.category.name}
                </p>
              </div>
              
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{" "}
                <span className="text-green-700">
                  {campaign.organizer.firstName} {campaign.organizer.lastName}
                </span>
              </p>
            </div>
            <p className="p-medium-18 px-4 py-1 text-black">
              {campaign.donatedAmount}$ • Raised
            </p>
          </div>

          <CheckoutButton campaign={campaign}/>





          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={32}
                height={32}
              />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p>
                  {formatDateTime(campaign.startDateTime).dateOnly} - {" "}
                  {formatDateTime(campaign.startDateTime).timeOnly}
                </p>

                <p>
                  {formatDateTime(campaign.endDateTime).dateOnly} - {" "}
                  {formatDateTime(campaign.startDateTime).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
              <p className="p-medium-16 lg:p-regular-20">{campaign.location}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">Description:</p>
            <p className="p-medium-16 lg:p-regular-18">{campaign.description}</p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-green-700 underline">{campaign.url}</p>
          </div> 
        </div>
      </div>
    </section>
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Related Campaign</h2>
      <Collection
        data={relatedCampaigns?.data}
        emptyTitle="No campaigns found"
        emptyStateSubtext="Come back later"
        collectionType="All_Campaigns"
        limit={6}
        page={searchParams.page as string}
        totalPages={relatedCampaigns?.totalPages}
        />
    </section>
    </>
  );
};

export default CampaignDetails;
