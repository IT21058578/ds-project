import { useEffect, useState } from "react";
import AdminPageBox from "../components/AdminPageBox";
import { useNavigate, useParams } from "react-router-dom";
import {
	useDeleteUserMutation,
	useLazyGetUserQuery,
} from "../store/apis/user-api-slice";
import {
	Button,
	Divider,
	TableCell,
	TableRow,
	Typography,
} from "@mui/material";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import NormalTable from "../components/NormalTable";
import { camelToNormal } from "../utils/string-utils";
import InfiniteTable from "../components/InfiniteTable";
import { useSearchProductsMutation } from "../store/apis/products-api-slice";
import dayjs from "dayjs";
import useInfiniteQuery from "../hooks/useInfiniteQuery";

interface IBrandProductData {
	id?: string;
	name?: string;
	price?: number;
	createdOn?: string;
}

interface IBrandBasicData {
	representativeName?: string;
	createdOn?: string;
	lastUpdatedOn?: string;
	lastLoggedOn?: string;
}

const AdminSellerPage = () => {
	const { brandId = "" } = useParams();
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [brandName, setBrandName] = useState("");
	const [brandBasicData, setBrandBasicData] = useState<IBrandBasicData>({});
	const [getSeller, { data: brandRawData }] = useLazyGetUserQuery();
	const [searchItems, { data: itemsRawData }] = useSearchProductsMutation();
	const { data: brandProductsData, loaderRef } = useInfiniteQuery({
		useSearchDataMutation: useSearchProductsMutation as any,
		searchOptions: {
			brandId,
		},
	});
	const [deleteUser] = useDeleteUserMutation();
	const [isBrandDeleteModalOpen, setIsBrandDeleteModalOpen] =
		useState<boolean>(false);

	useEffect(() => {
		getSeller({ userId: brandId });
		searchItems({ brandId });
	}, [brandId, getSeller]);

	useEffect(() => {
		if (brandRawData) {
			const {
				brandName,
				createdOn,
				lastLoggedOn,
				firstName,
				lastName,
				updatedOn,
			} = brandRawData;
			setTitle(brandName || "");
			setBrandName(brandName || "");
			setBrandBasicData({
				createdOn: dayjs(createdOn).format("ll"),
				lastLoggedOn: dayjs(lastLoggedOn).format("ll"),
				lastUpdatedOn: dayjs(updatedOn).format("ll"),
				representativeName: `${firstName} ${lastName}`,
			});
		}
	}, [brandRawData, searchItems]);

	const handleDeleteBrandConfirm = () => {
		deleteUser({ userId: brandId });
		navigate("/sellers");
	};

	const handleBrandProductTableRowClick = (id: string) => {
		navigate(`/products/${id}`);
	};

	return (
		<>
			<AdminPageBox
				title={title}
				breadcrumbOptions={[
					{ label: "Sellers", to: "/sellers" },
					{ label: brandName },
				]}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						width: "100%",
						height: "78vh",
					}}
				>
					<div style={{ width: "50%" }}>
						<InfiniteTable<IBrandProductData>
							data={brandProductsData}
							tableColumns={["name", "createdOn", "price"]}
							tableRowRender={(item, idx) => (
								<TableRow
									key={idx}
									onClick={() => handleBrandProductTableRowClick(item.id || "")}
									hover={true}
									sx={{ ":hover": { cursor: "pointer" } }}
								>
									<TableCell>{item.name}</TableCell>
									<TableCell>{dayjs(item.createdOn).format("ll")}</TableCell>
									<TableCell>$ {item.price}</TableCell>
								</TableRow>
							)}
						/>
					</div>
					<Divider
						orientation="vertical"
						variant="middle"
						sx={{ marginRight: "30px", marginLeft: "30px" }}
					/>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							width: "50%",
						}}
					>
						<div style={{ width: "100%", height: "100%" }}>
							{Object.entries(brandBasicData).map(([key, value]) => (
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
										<Typography>{value}</Typography>
									</span>
								</div>
							))}
						</div>
						<div>
							<Button onClick={() => setIsBrandDeleteModalOpen(true)}>
								Delete Brand
							</Button>
						</div>
					</div>
				</div>
			</AdminPageBox>
			<DeleteConfirmationModal
				isOpen={isBrandDeleteModalOpen}
				setIsOpen={setIsBrandDeleteModalOpen}
				onConfirm={handleDeleteBrandConfirm}
			/>
		</>
	);
};

export default AdminSellerPage;
