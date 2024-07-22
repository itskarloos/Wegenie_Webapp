"use server"

import { CreateCampaignParams } from "@/types"
import { handleError } from "../utils"

export const createCampaign = async({ campaign, userId, path}: CreateCampaignParams) => {
    try{}
    catch(error){
        handleError(error)
    }
}