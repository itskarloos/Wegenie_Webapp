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
    startDateTime: number; // Assuming this is a timestamp
    endDateTime: number;   // Assuming this is a timestamp
    campaignAmount: string;
    donatedAmount: string;
    organizer: Organizer;
};

type Donation = {
    _id: string;
    createdAt: number; // Assuming this is a timestamp
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
                            <TableHead>Campaign Status</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaignTableOrders.data.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell className="font-medium">{order.campaign.organizer.firstName} {order.campaign.organizer.lastName}</TableCell>
                                <TableCell><Badge variant="outline">Live</Badge></TableCell>
                                <TableCell>{order.campaign.title}</TableCell>
                                <TableCell className="text-right">${order.donatedAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div>No recent donations</div>
            )}
        </>
    );
}

export default CampaignContributionTable;
