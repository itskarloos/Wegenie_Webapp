import { z } from "zod";

export const campaignformSchema = z.object({
    title: z.string().min(3,'Title must be at least 3 character'),
    description: z.string().min(3,'Description must be at least 3 character').max(400,'Description must be less than 400 characters'),
    location:z.string().min(3,'Location must be at least 3 character').max(400,'Location must be less than 400 characters'),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
  });