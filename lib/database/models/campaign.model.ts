import { Document, Schema, model, models } from "mongoose";

export interface ICampaign extends Document {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  campaignAmount: string;
  isVerfied: boolean;
  phoneNumber: string;
  requestVerfication: boolean;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}
const CampaignSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  campaignAmount: { type: String },
  donatedAmount: { type: String, default: '0' },
  requestVerification: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  phoneNumber: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Campaign = models.Campaign || model("Campaign", CampaignSchema);

export default Campaign;
