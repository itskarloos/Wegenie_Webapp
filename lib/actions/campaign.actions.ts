"use server";

import { CreateCampaignParams, DeleteCampaignParams, GetAllCampaignsParams,GetRelatedCampaignsByCategoryParams,UpdateCampaignParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database"; 
import User from "../database/models/user.model";
import Campaign from "../database/models/campaign.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";


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

export const deleteCampaign = async ({campaignId,path}: DeleteCampaignParams) => {
  try{
    await connectToDatabase();
    const deletedCampaign = await Campaign.findByIdAndDelete(campaignId);
    if(deletedCampaign) revalidatePath(path)
  }
  catch(error){
    handleError(error)
  }
}

export async function updateCampaign({ userId, campaign, path }: UpdateCampaignParams) {
  try {
    await connectToDatabase()

    const campaignToUpdate = await Campaign.findById(campaign._id)
    if (!campaignToUpdate || campaignToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or campaign not found')
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaign._id,
      { ...campaign, category: campaign.categoryId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedCampaign))
  } catch (error) {
    handleError(error)
  }
}
export async function getRelatedCampaignsByCategory({
  categoryId,
  campaignId,
  limit = 3,
  page = 1,
}: GetRelatedCampaignsByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: campaignId } }] }

    const eventsQuery = Campaign.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const campaigns = await populateCampaign(eventsQuery)
    const campaignsCount = await Campaign.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(campaigns)), totalPages: Math.ceil(campaignsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}