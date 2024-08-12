import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllCampaigns } from "@/lib/actions/campaign.actions";
import { SearchParamProps } from "@/types";
import { DESTRUCTION } from "dns";
import Image from "next/image";
import Link from "next/link";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
 

export default async function Home({searchParams}: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || ''
  const category = (searchParams?.category as string) || ''
  const campaigns = await getAllCampaigns({ query: searchText, category, page , limit: 6 });

  const words = `Start Cultivating Hope, Change Life's Impact The World
  `

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-col-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
           
           <TextGenerateEffect duration={1} filter={true} className="h1-bold" words={words} />
           
           
            <p className="p-regular-20 md:p-regular-24">
              Turn your passion into purpose. Fundraise for what matters most.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#charity">Explore Charity</Link>
            </Button>
          </div>
          <Image
            src="/assets/images/Hero.png"
            alt="Hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h[50vh]"
          />
        </div>
      </section>



      <section id="charity" className="wrapper my-8 gap-8 flex flex-col md:gap-12">
        <h2 className="h2-bold">
          Explore
          <br /> various campaign
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
        <Search />
          <CategoryFilter/>
          
         
        </div>
        <Collection
          data={campaigns?.data}
          emptyTitle="No campaigns found"
          emptyStateSubtext="Come back later"
          collectionType="All_Campaigns"
          limit={3}
          page={page}
          totalPages={campaigns?.totalPages}
        />
      </section>
    </>
  );
}
