"use server";

import { CreateCampaignParams, GetAllCampaignsParams } from "@/types";
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


export const getAllCampaigns = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllCampaignsParams) => {
  try {
    await connectToDatabase();
    const conditions = {};
    const campaignQuery = Campaign.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(limit);
    const campaigns = await populateCampaign(campaignQuery)
    const campaignsCount = await Campaign.countDocuments(conditions)
    return {
      data:JSON.parse(JSON.stringify(campaigns)),
      totalPages: Math.ceil(campaignsCount / limit)};
  } catch (error) {
    handleError(error)
  }
};

export const deleteCampagin = async (campaignId: string) => {
  try{}
  catch(error){}
}