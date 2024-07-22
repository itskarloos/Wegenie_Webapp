"use server";

import { CreateCampaignParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Campaign from "../database/models/campaign.model";

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
