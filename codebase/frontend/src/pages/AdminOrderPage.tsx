import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	useDeleteOrderMutation,
	useLazyGetOrderQuery,
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
import { DeliverStatusOptionsKeyType } from "../types";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

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
	const {
		palette: { grey },
	} = useTheme();
	const [getOrder, { isSuccess: isGetOrderSuccess, data: orderRawData }] =
		useLazyGetOrderQuery();
	const [updateOrder] = useUpdateOrderMutation();
	const [deleteOrder] = useDeleteOrderMutation();
	const [title] = useState("Tharindu Gunasekera's Order - 1245");
	const [orderStatus] = useState<DeliverStatusOptionsKeyType>("NOT_STARTED");
	const [orderUserData] = useState<IOrderUserData>({});
	const [orderPaymentData] = useState<IOrderPaymentData>({});
	const [orderItemsData] = useState<IOrderItemData[]>([]);
	const [isOrderDeleteModalOpen, setIsOrderDeleteModalOpen] =
		useState<boolean>(false);

	useEffect(() => {
		getOrder({ orderId });
	}, [orderId]);

	useEffect(() => {
		// TODO: Handle data reception here
	}, [isGetOrderSuccess, orderRawData]);

	const handleDeliveryStatusSelect = (status: DeliverStatusOptionsKeyType) => {
		updateOrder({ id: orderId, deliveryStatus: status });
	};

	const handleDeleteOrder = () => {
		deleteOrder({ orderId });
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
				<div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
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
					<div style={{ width: "50%", display: "flex", flexDirection: "row" }}>
						<div>
							<FormControl sx={{ m: 1, width: "100%" }} size="small">
								<InputLabel>Delivery Status</InputLabel>
								<Select
									value={orderStatus}
									label="Age"
									onChange={(e) =>
										handleDeliveryStatusSelect(
											e.target.value as DeliverStatusOptionsKeyType
										)
									}
								>
									{Object.values(EDeliveryStatusOptions).map((item) => (
										<MenuItem value={item.value}>
											<Tag type={item.value} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<Button>Delete Order</Button>
						</div>
						<div style={{ height: "50%", width: "100%" }}>
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
						</div>
						<div style={{ height: "50%", width: "100%" }}>
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
										<Typography variant={"h4"} fontWeight={900}>
											{value}
										</Typography>
									</span>
									<Divider sx={{ marginRight: "32px", marginTop: "4px" }} />
								</div>
							))}
						</div>
					</div>
				</div>
			</AdminPageBox>
			<DeleteConfirmationModal
				isOpen={isOrderDeleteModalOpen}
				onConfirm={handleDeleteOrder}
				setIsOpen={setIsOrderDeleteModalOpen}
			/>
		</>
	);
};

export default AdminOrderPage;
