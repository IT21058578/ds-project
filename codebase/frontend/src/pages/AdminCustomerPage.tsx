import { useEffect, useState } from "react";
import AdminPageBox from "../components/AdminPageBox";
import { useNavigate, useParams } from "react-router-dom";
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
import { useSearchReviewsMutation } from "../store/apis/review-api-slice";
import dayjs from "dayjs";

type Props = {};

type IUserBasicData = {
	name?: string;
	mobile?: string;
	isSubscribed?: string;
	isAuthorized?: string;
	lastLoggedOn?: string;
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
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [userBasicData, setUserBasicData] = useState<IUserBasicData>({});
	const [userSpendingData, setUserSpendingData] = useState<IUserSpendingData>(
		{}
	);
	const [getCustomerUser, { data: userRawData }] = useLazyGetUserQuery({});
	const [searchReviews, { data: reviewRawData }] = useSearchReviewsMutation();
	const [searchOrders, { data: orderRawData }] = useSearchOrdersMutation();
	const { customerId = "" } = useParams();

	useEffect(() => {
		if (customerId) {
			getCustomerUser({ userId: customerId });
			searchReviews({ pageNum: 100, userId: customerId });
			searchOrders({ pageSize: 100, userId: customerId });
		}
	}, [customerId]);

	useEffect(() => {
		if (userRawData && orderRawData && reviewRawData) {
			const {
				firstName,
				lastName,
				isAuthorized,
				isSubscribed,
				createdOn,
				lastLoggedOn,
				mobile,
			} = userRawData;
			const { content: orderContent, totalElements: orderCount } = orderRawData;
			const { content: reviewContent, totalElements: reviewCount } =
				reviewRawData;

			const name = `${firstName} ${lastName}`;
			let totalSpending = 0;
			orderContent.forEach((order) => {
				order?.items?.forEach((item) => {
					totalSpending += (item?.qty || 0) * (item?.amountPerUnit || 0);
				});
			});

			setName(name);
			setUserBasicData({
				name,
				joinedOn: dayjs(createdOn).format("ll"),
				lastLoggedOn: dayjs(lastLoggedOn).format("ll"),
				mobile,
				isAuthorized: isAuthorized ? "Yes" : "No",
				isSubscribed: isSubscribed ? "Yes" : "No",
			});
			setUserSpendingData({
				totalOrders: orderCount,
				totalReviews: reviewCount,
				totalSpending,
			});
		}
	}, [userRawData, reviewRawData, orderRawData]);

	const handleOrderTableRowClick = (id: string) => {
		navigate(`/orders/${id}`);
	};

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
							data={orderRawData?.content}
							tableColumns={["id", "lastUpdate", "deliveryStatus"]}
							tableRowRender={(item, idx) => (
								<TableRow
									key={item.id || idx}
									onClick={() => handleOrderTableRowClick(item.id || "")}
									hover={true}
									sx={{ ":hover": { cursor: "pointer" } }}
								>
									<TableCell>{textEllipsis(item.id, 20)}</TableCell>
									<TableCell>{dayjs(item.lastEditedOn).format("ll")}</TableCell>
									<TableCell>
										<Tag type={item.deliveryStatus} />
									</TableCell>
								</TableRow>
							)}
						/>
					</Grid>
				</Grid>
			</Grid>
		</AdminPageBox>
	);
};

export default AdminCustomerPage;
