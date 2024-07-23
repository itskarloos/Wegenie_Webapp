"use server";

import { CreateCampaignParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Campaign from "../database/models/campaign.model";
import Category from "../database/models/category.model";


const populateCampaign = async (query: any) => {
  return query
  .populate({path: 'organizer', model:User, select:'_id firstName lastName'})
  .populate({path: 'category', model:Category, select:'_id name'});
}
export const createCampaign = async ({
  campaign,
  userId,
  path,
}: CreateCampaignParams) => {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error("Campaign organizer not found");
    }
    console.log({categoryId: campaign.categoryId, organizer:userId})
    
    const newCampaign = await Campaign.create({
      ...campaign,
      category: campaign.categoryId,
      organizer: userId,
    });
    return JSON.parse(JSON.stringify(newCampaign));
  } catch (error) {
    handleError(error);
  }
};


export const getCampaignById = async(campaignId: string) => {
  try{
    await connectToDatabase();
    const campaign = await populateCampaign(Campaign.findById(campaignId));

    if(!campaign){
      throw new Error("Campaign not found");
    }
    return JSON.parse(JSON.stringify(campaign))
  }
  catch(error){}

}
