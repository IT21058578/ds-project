import { useEffect, useState } from "react";
import AdminPageBox from "../components/AdminPageBox";
import { useParams } from "react-router-dom";
import {
	Divider,
	Grid,
	Stack,
	TableCell,
	TableRow,
	Typography,
	useTheme,
} from "@mui/material";
import { camelToNormal, textEllipsis } from "../utils/string-utils";
import InfiniteTable from "../components/InfiniteTable";

import Tag from "../components/Tag";
import { useSearchOrdersMutation } from "../store/apis/order-api-slice";
import { IOrderDTO } from "../store/apis/types/response-types";
import { useLazyGetUserQuery } from "../store/apis/user-api-slice";

type Props = {};

type IUserBasicData = {
	name?: string;
	address?: string;
	mobile?: string;
	isSubscribed?: string;
	isAuthorized?: string;
	lastLoggedAt?: string;
	joinedOn?: string;
};

type IUserSpendingData = {
	totalOrders?: number;
	totalSpending?: number;
	totalReviews?: number;
};

const AdminCustomerPage = (props: Props) => {
	const {
		palette: { grey },
	} = useTheme();
	const [name] = useState("");
	const [userBasicData] = useState<IUserBasicData>({});
	const [userSpendingData] = useState<IUserSpendingData>({});
	const [
		getCustomerUser,
		{ isSuccess: isGetCustomerUserSuccess, data: customerUserRawData },
	] = useLazyGetUserQuery({});
	const { customerId } = useParams();

	useEffect(() => {
		if (customerId) {
			getCustomerUser({ userId: customerId });
		}
	}, [customerId]);

	useEffect(() => {
		// TODO: Handle data reception here
	}, [customerUserRawData, isGetCustomerUserSuccess]);

	return (
		<AdminPageBox
			title={name}
			breadcrumbOptions={[
				{ label: "Customers", to: "/customers" },
				{ label: `${name}` },
			]}
		>
			<Grid container height={"87%"} spacing={2}>
				<Grid item xs={4}>
					<Stack
						direction="column"
						justifyContent="flex-start"
						alignItems="start"
						sx={{ height: "100%" }}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "8px",
								height: "50%",
								width: "100%",
							}}
						>
							{Object.entries(userBasicData).map(([key, value]) => (
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										width: "100%",
									}}
								>
									<span style={{ width: "33.3%" }}>
										<Typography sx={{ fontWeight: "600" }}>
											{camelToNormal(key)}
										</Typography>
									</span>
									<span>
										<Typography>{value.toString()}</Typography>
									</span>
								</div>
							))}
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								height: "50%",
								width: "100%",
							}}
						>
							{Object.entries(userSpendingData).map(([key, value]) => (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										width: "100%",
									}}
								>
									<span>
										<Typography color={grey[600]} fontWeight={600}>
											{camelToNormal(key)}
										</Typography>
									</span>
									<span>
										<Typography variant={"h4"} fontWeight={900}>
											{value}
										</Typography>
									</span>
									<Divider sx={{ marginRight: "32px", marginTop: "4px" }} />
								</div>
							))}
						</div>
					</Stack>
				</Grid>
				<Grid
					item
					xs={8}
					sx={{
						borderColor: grey["300"],
						borderStyle: "solid",
						borderWidth: "1px",
						borderRadius: "4px",
					}}
				>
					<Grid
						container
						direction="column"
						justifyContent="start"
						alignItems="stretch"
						sx={{
							height: "100%",
							paddingRight: "1rem",
						}}
					>
						<InfiniteTable<IOrderDTO>
							useGetDataMutation={useSearchOrdersMutation as any}
							tableColumns={["id", "lastUpdate", "deliveryStatus"]}
							tableRowRender={(item, idx) => (
								<TableRow key={idx} onClick={() => {}}>
									<TableCell>{textEllipsis(item.id, 20)}</TableCell>
									<TableCell>{item.lastUpdatedOn}</TableCell>
									<TableCell>
										<Tag type={item.deliveryStatus} />
									</TableCell>
								</TableRow>
							)}
							tableHeight={"100%"}
							defaultSortCol={"lastUpdate"}
							search={""}
						/>
					</Grid>
				</Grid>
			</Grid>
		</AdminPageBox>
	);
};

export default AdminCustomerPage;
