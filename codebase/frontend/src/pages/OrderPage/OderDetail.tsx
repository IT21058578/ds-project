import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { LocalShipping } from "@mui/icons-material";
import ShippingStatusStepper from "./ShippingStatus";
import ReviewPopup from "../ReviewPage/ReviewPopup";
import Avatar from "@mui/material/Avatar";
import { useSearchOrdersMutation } from "../../store/apis/order-api-slice";
import { useAppSelector } from "../../store/hooks";
import { IOrderDTO } from "../../store/apis/types/response-types";

function Row(props: { row: IOrderDTO }) {
	const {
		row: { id, createdOn, deliveryStatus, items, paymentStatus },
	} = props;
	const [open, setOpen] = React.useState(false);

	const total = 0;

	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{id}
				</TableCell>
				<TableCell align="right">{createdOn}</TableCell>
				<TableCell align="right">{total}</TableCell>
				<TableCell
					align="right"
					sx={{
						color: paymentStatus === "PAID" ? "green" : "red",
					}}
				>
					{paymentStatus}
				</TableCell>
				<TableCell align="right">{total}</TableCell>
				<TableCell
					align="right"
					sx={{
						color:
							deliveryStatus === "FINISHED"
								? "green"
								: deliveryStatus === "NOT_STARTED"
								? "red"
								: "orange",
					}}
				>
					{deliveryStatus}
				</TableCell>
			</TableRow>

			<TableRow sx={{ backgroundColor: "rgba(132, 208, 68, 0.1)" }}>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1, padding: "50px" }}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
								color={"green"}
							>
								Perchaced Products
							</Typography>
							<Table size="medium" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Product Image</TableCell>
										<TableCell>Product Name</TableCell>
										<TableCell align="right">Unit Price (Rs)</TableCell>
										<TableCell align="right">Total price (Rs)</TableCell>
										<TableCell align="right">Add a Review</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{items.map((historyRow, idx) => (
										<TableRow key={idx}>
											<TableCell component="th" scope="row">
												<Avatar
													alt={historyRow.name}
													src={historyRow.imageUrl}
												/>
											</TableCell>
											<TableCell>{historyRow.name}</TableCell>
											<TableCell align="right">
												{historyRow.amountPerUnit}
											</TableCell>
											<TableCell align="right">
												{historyRow.amountPerUnit * historyRow.qty}
											</TableCell>
											<TableCell align="right"></TableCell>
											<TableCell>
												<ReviewPopup />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							<Box sx={{ marginTop: "20px" }}>
								<Typography
									variant="h6"
									gutterBottom
									component="div"
									color={"Red"}
									align={"center"}
									border={"2px solid"}
									borderRadius={"30px"}
								>
									Order Tracking Status
								</Typography>
								<ShippingStatusStepper />
							</Box>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default function Order() {
	const user = useAppSelector((state) => state.auth.user);
	const [getOrders, { data: orderRawData }] = useSearchOrdersMutation();

	React.useEffect(() => {
		getOrders({ userId: user?.id ?? "" });
	}, [getOrders]);

	return (
		<Box
			sx={{
				minWidth: 275,
				border: "1px solid green",
				padding: "70px",
				borderRadius: "30px",
				backgroundColor: "rgba(234, 234, 234, 0.1)",
				marginTop: "100px",
				marginBottom: "20px",
				boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.25)",
			}}
		>
			<div style={{ display: "flex", justifyContent: "center", color: "gray" }}>
				<Typography variant="h4" gutterBottom>
					<LocalShipping />
					Order History
				</Typography>
			</div>
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Order ID</TableCell>
							<TableCell align="right">Date</TableCell>
							<TableCell align="right">Delivery Charge&nbsp;(Rs)</TableCell>
							<TableCell align="right">Payment Status</TableCell>
							<TableCell align="right">Total Price&nbsp;(Rs)</TableCell>
							<TableCell align="right">Delivery Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orderRawData?.content !== undefined &&
							orderRawData?.content?.map((row) => (
								<Row key={row.id} row={row} />
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
