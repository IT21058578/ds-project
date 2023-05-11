import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	useDeleteOrderMutation,
	useLazyGetOrderQuery,
	useSearchOrdersMutation,
	useUpdateOrderMutation,
} from "../store/apis/order-api-slice";
import AdminPageBox from "../components/AdminPageBox";
import {
	Button,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TableCell,
	TableRow,
	Typography,
	useTheme,
} from "@mui/material";
import { camelToNormal } from "../utils/string-utils";
import NormalTable from "../components/NormalTable";
import Tag from "../components/Tag";
import { EDeliveryStatusOptions } from "../constants/constants";
import {
	DeliverStatusOptionsKeyType,
	PaymentStatusOptionsKeyType,
} from "../types";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { useLazyGetUserQuery } from "../store/apis/user-api-slice";
import { IOrderDTO } from "../store/apis/types/response-types";
import { EPaymentStatusOptions } from "../constants/constants";
import dayjs from "dayjs";

interface IOrderUserData {
	id?: string;
	name?: string;
	mobile?: string;
	email?: string;
}

interface IOrderPaymentData {
	amount?: number;
	method?: string;
	madeOn?: string;
}

interface IOrderItemData {
	name?: string;
	quantity?: number;
	amount?: number;
}

const AdminOrderPage = () => {
	const { orderId = "" } = useParams();
	const navigate = useNavigate();
	const {
		palette: { grey },
	} = useTheme();
	const [getOrder, { data: orderRawData }] = useLazyGetOrderQuery();
	const [getUser, { data: userRawData }] = useLazyGetUserQuery();
	const [updateOrder] = useUpdateOrderMutation();
	const [deleteOrder] = useDeleteOrderMutation();
	const [title, setTitle] = useState("Tharindu Gunasekera's Order - 1245");
	const [orderStatus, setOrderStatus] =
		useState<DeliverStatusOptionsKeyType>("NOT_STARTED");
	const [orderPaymentStatus, setOrderPaymentStatus] =
		useState<PaymentStatusOptionsKeyType>("PAID");
	const [orderUserData, setOrderUserData] = useState<IOrderUserData>({});
	const [orderPaymentData, setOrderPaymentsData] = useState<IOrderPaymentData>(
		{}
	);
	const [orderItemsData, setOrderItemsData] = useState<IOrderItemData[]>([]);
	const [isOrderDeleteModalOpen, setIsOrderDeleteModalOpen] =
		useState<boolean>(false);

	useEffect(() => {
		if (!orderRawData) {
			getOrder({ orderId });
		} else {
			getUser({ userId: orderRawData.userId });
		}
	}, [orderId, orderRawData?.userId]);

	useEffect(() => {
		if (orderRawData && userRawData) {
			const { firstName, lastName, email, mobile } = userRawData;
			const { deliveryStatus, userId, items, lastEditedOn, paymentStatus } =
				orderRawData;
			const name = `${firstName} ${lastName}`;

			let amount = 0;
			items.forEach((item) => {
				amount += item.qty * item.amountPerUnit;
			});

			setTitle(`${name}'s Order - ${orderId}`);
			setOrderStatus(deliveryStatus);
			setOrderUserData({
				name,
				email,
				id: userId,
				mobile,
			});
			setOrderPaymentsData({
				amount,
				...(paymentStatus === "PAID"
					? { madeOn: lastEditedOn, method: "CARD" }
					: {}),
			});
			setOrderItemsData(
				items.map((item) => ({
					amount: item.amountPerUnit,
					name: item.name,
					quantity: item.qty,
				}))
			);
		}
	}, [orderRawData, userRawData]);

	const handleUpdateOrder = ({
		deliveryStatus,
		paymentStatus,
	}: Partial<IOrderDTO>) => {
		updateOrder({ id: orderId, deliveryStatus, paymentStatus });
		setOrderStatus((prev) => deliveryStatus || prev);
		setOrderPaymentStatus((prev) => paymentStatus || prev);
	};

	const handleDeleteOrderClick = () => {
		setIsOrderDeleteModalOpen(true);
	};

	const handleDeleteOrderConfirm = () => {
		deleteOrder({ orderId });
		navigate("/orders");
	};

	return (
		<>
			<AdminPageBox
				title={title}
				breadcrumbOptions={[
					{ label: "Orders", to: "/orders" },
					{
						label: orderUserData.name || "",
						to: `/customers/${orderUserData.id}`,
					},
					{ label: orderId || "" },
				]}
			>
				<div style={{ display: "flex", flexDirection: "row", height: "78vh" }}>
					<div style={{ width: "50%" }}>
						<NormalTable<IOrderItemData>
							tableColumns={["name", "quantity", "amount"]}
							tableRowRender={(item, idx) => (
								<TableRow key={idx} onClick={() => {}}>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.quantity}</TableCell>
									<TableCell>{item.amount}</TableCell>
								</TableRow>
							)}
							data={orderItemsData}
							tableHeight={"100%"}
							defaultSortCol={"lastUpdate"}
							search={""}
						/>
					</div>
					<Divider
						orientation="vertical"
						variant="middle"
						sx={{ marginRight: "30px", marginLeft: "30px" }}
					/>
					<div
						style={{
							width: "50%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						<div style={{ width: "100%", marginTop: "20px" }}>
							{Object.entries(orderUserData).map(([key, value]) => (
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
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									marginTop: "8px",
								}}
							>
								<FormControl sx={{ m: 1, width: "25%" }} size="small">
									<InputLabel>Delivery Status</InputLabel>
									<Select
										value={orderStatus}
										label="Age"
										onChange={(e) =>
											handleUpdateOrder({
												deliveryStatus: e.target.value as any,
											})
										}
									>
										{Object.values(EDeliveryStatusOptions).map((item) => (
											<MenuItem value={item.value}>
												{EDeliveryStatusOptions[item.value].label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<FormControl sx={{ m: 1, width: "25%" }} size="small">
									<InputLabel>Payment Status</InputLabel>
									<Select
										value={orderRawData?.paymentStatus || "UNPAID"}
										label="Age"
										onChange={(e) =>
											handleUpdateOrder({
												paymentStatus: e.target.value as any,
											})
										}
									>
										{Object.values(EPaymentStatusOptions).map((item) => (
											<MenuItem value={item.value}>
												{EPaymentStatusOptions[item.value].label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
							<Button onClick={handleDeleteOrderClick}>Delete Order</Button>
						</div>
						<div style={{ width: "100%" }}>
							{Object.entries(orderPaymentData).map(([key, value]) => (
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
										<Typography variant={"h5"} fontWeight={900}>
											{key === "madeOn" ? dayjs(value).format("ll") : value}
										</Typography>
									</span>
									<Divider
										sx={{ marginRight: "32px", margin: "8px 0px 8px 0px" }}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</AdminPageBox>
			<DeleteConfirmationModal
				isOpen={isOrderDeleteModalOpen}
				onConfirm={handleDeleteOrderConfirm}
				setIsOpen={setIsOrderDeleteModalOpen}
			/>
		</>
	);
};

export default AdminOrderPage;
