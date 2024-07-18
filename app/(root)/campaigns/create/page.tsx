import CampaignForm from '@/components/shared/CampaignForm'
import { auth } from '@clerk/nextjs/server';


const CreateCampaign = () => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;
  return (
    <>
    <section className = "bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Campaign</h3>
    </section>
    <div className="wrapper my-8">
    <CampaignForm userId={userId} type="Create"/>
    </div>
    </>
  )
}

export default CreateCampaign