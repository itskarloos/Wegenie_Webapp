import { IOrder } from "@/lib/database/models/order.model"

// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
  }
  
  // ====== EVENT PARAMS
  export type CreateCampaignParams = {
    userId: string
   
    campaign: {
      title: string
      description: string
      phoneNumber: string
      imageUrl: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      campaignAmount: string
      
      requestVerfication: boolean
    }
    path: string
  }
  
  export type UpdateCampaignParams = {
    userId: string
    
    campaign: {
      _id?: string
      title: string
      imageUrl: string
      description: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      campaignAmount: string
      requestVerfication: boolean
      phoneNumber: string
      
    }
    path: string
  }
  
  export type DeleteCampaignParams = {
    campaignId: string
    path: string
  }
  
  export type GetAllCampaignsParams = {
    query: string
    category: string
    limit: number
    page: number
  }
  
  export type GetCampaignsByUserParams = {
    userId: string
    limit?: number
    page: number
  }
  
  export type GetRelatedCampaignsByCategoryParams = {
    categoryId: string
    campaignId: string
    limit?: number
    page: number | string
  }
  
  export type Campaign = {
    _id: string
    title: string
    description: string
    price: string
    isFree: boolean
    imageUrl: string
    location: string
    startDateTime: Date
    endDateTime: Date
    url: string
    organizer: {
      _id: string
      firstName: string
      lastName: string
    }
    category: {
      _id: string
      name: string
    }
  }
  
  // ====== CATEGORY PARAMS
  export type CreateCategoryParams = {
    categoryName: string
  }
  
  // ====== ORDER PARAMS
  export type CheckoutOrderParams = {
    campaignTitle: string
    campaignId: string
    donatedAmount: string
    buyerId: string
  }
  
  export type CreateOrderParams = {
    stripeId: string
    campaignId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
    donatedAmount: string
  }
  
  export type GetOrdersByCampaignParams = {
    campaignId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
  export type updateDonatedAmountParams = {
    order : IOrder
  }