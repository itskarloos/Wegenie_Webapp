import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"


type Organizer = {
    _id: string;
    firstName: string;
    lastName: string;
};

type Campaign = {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    startDateTime: number;
    endDateTime: number;
    campaignAmount: string;
    donatedAmount: string;
    organizer: Organizer;
};

type Donation = {
    _id: string;
    createdAt: number;
    stripeId: string;
    donatedAmount: string;
    campaign: Campaign;
};

type CampaignTableOrdersProp = {
    data: Donation[];
    totalPages: number;
};

const CampaignContributionTable = ({ campaignTableOrders }: { campaignTableOrders: CampaignTableOrdersProp }) => {
    return (
        <>
            {campaignTableOrders.data && campaignTableOrders.data.length > 0 ? (
                <Table>
                    <TableCaption>A list of your recent donations</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Organizer</TableHead>
                            <TableHead className="flex items-center justify-center">Campaign Status</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaignTableOrders.data.map((order) => {
                            const hasCampaignFinished = new Date(order.campaign.endDateTime) < new Date();

                            return (
                                <TableRow key={order._id}>
                                    <TableCell className="font-medium">{order.campaign.organizer.firstName} {order.campaign.organizer.lastName}</TableCell>
                                    {hasCampaignFinished ? (<TableCell className="flex items-center justify-center"><Badge variant="outline">Live</Badge></TableCell>) : (<TableCell className="flex items-center justify-center"><Badge variant="destructive">Unavailable</Badge></TableCell>)}


                                    <TableCell>{order.campaign.title}</TableCell>
                                    <TableCell className="text-right">${order.donatedAmount}</TableCell>
                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            ) : (
                <div>No recent donations</div>
            )}
        </>
    );
}

export default CampaignContributionTable;
