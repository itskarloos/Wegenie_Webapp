import { z } from "zod";

// This is a basic regex for international phone numbers

export const campaignformSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  campaignAmount: z.string(),
 
  requestVerfication: z.boolean(),
  phoneNumber: z.string(),
});


