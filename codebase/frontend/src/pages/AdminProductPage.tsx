import { useEffect, useState } from "react";
import AdminPageBox from "../components/AdminPageBox";
import { useNavigate, useParams } from "react-router-dom";
import {
	Button,
	TableCell,
	TableRow,
	Typography,
	Divider,
} from "@mui/material";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { camelToNormal } from "../utils/string-utils";
import NormalTable from "../components/NormalTable";
import {
	useDeleteProductsMutation,
	useLazyGetProductQuery,
} from "../store/apis/products-api-slice";
import AddEditProductModal from "../components/AddEditProductModal";
import InfiniteTable from "../components/InfiniteTable";
import { useSearchReviewsMutation } from "../store/apis/review-api-slice";
import dayjs from "dayjs";

interface IProductBasicData {
	brand?: string;
	category?: string;
	countInStock?: number;
	createdOn?: string;
	lastEditedOn?: string;
	price?: string;
}

interface IProductReviewData {
	id?: string;
	createdBy?: string;
	createdOn?: string;
	rating?: number;
}

const AdminProductPage = () => {
	const { productId = "" } = useParams();
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [brand, setBrand] = useState("");
	const [brandId, setBrandId] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [description, setDescription] = useState("");
	const [getProduct, { data: productRawData }] = useLazyGetProductQuery();
	const [searchReviews, { data: reviewsRawData }] = useSearchReviewsMutation();
	const [deleteProduct] = useDeleteProductsMutation();
	const [productBasicData, setProductBasicData] = useState<IProductBasicData>(
		{}
	);
	const [productReviewsData, setProductReviewsData] = useState<
		IProductReviewData[]
	>([]);
	const [productEditFormData, setProductEditFormData] = useState({});
	const [isEditProductModalOpen, setIsEditProductModalOpen] =
		useState<boolean>(false);
	const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
		useState<boolean>(false);

	useEffect(() => {
		getProduct({ productId });
		searchReviews({ productId, pageSize: 100 });
	}, [productId]);

	useEffect(() => {
		if (productRawData && reviewsRawData) {
			const { content: productReviews } = reviewsRawData;
			const {
				brandId,
				brandName,
				category,
				countInStock,
				description,
				name,
				price,
				createdOn,
				lastEditedOn,
			} = productRawData;
			setDescription(description);
			setTitle(name);
			setBrand(brandName);
			setBrandId(brandId);
			setProductBasicData({
				brand: brandName,
				category,
				countInStock,
				price: `$ ${price}`,
				createdOn: dayjs(createdOn).format("ll"),
				lastEditedOn: dayjs(lastEditedOn).format("ll"),
			});
			setProductReviewsData(
				productReviews.map((review) => ({
					createdBy: `${review.createdBy}`,
					createdOn: dayjs(review.createdOn).format("ll"),
					rating: review.rating,
					id: review.id,
				}))
			);
		}
	}, [productRawData, reviewsRawData]);

	const handleDeleteProductConfirm = () => {
		deleteProduct({ productId });
		navigate("/products");
	};

	const handleProductReviewTableRowClick = (id?: string) => {
		navigate(`/reviews/${id}`);
	};

	return (
		<>
			<AdminPageBox
				title={title}
				breadcrumbOptions={[
					{ label: "Products", to: "/products" },
					{ label: brand, to: `/sellers/${brandId}` },
					{ label: title },
				]}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						height: "78vh",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							width: "50%",
							height: "100%",
						}}
					>
						<div style={{ width: "100%", height: "100%" }}>
							{Object.entries(productBasicData).map(([key, value]) => (
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										width: "100%",
										margin: "4px 0px 16px 0px",
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
							<p>{description}</p>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-start",
								gap: "4px",
							}}
						>
							<Button onClick={() => setIsEditProductModalOpen(true)}>
								Edit Product
							</Button>
							<Button
								variant="contained"
								onClick={() => setIsDeleteProductModalOpen(true)}
							>
								Delete Product
							</Button>
						</div>
					</div>
					<Divider
						orientation="vertical"
						sx={{ margin: "0px 16px 0px 16px" }}
					/>
					<div
						style={{
							width: "50%",
							border: "1px solid lightgray",
							borderRadius: "4px",
						}}
					>
						<InfiniteTable<IProductReviewData>
							tableColumns={["createdBy", "createdOn", "rating"]}
							tableRowRender={(item, idx) => (
								<TableRow
									key={idx}
									hover={true}
									sx={{ ":hover": { cursor: "pointer" } }}
									onClick={() => handleProductReviewTableRowClick(item.id)}
								>
									<TableCell>{item.createdBy}</TableCell>
									<TableCell>{item.createdOn}</TableCell>
									<TableCell>{item.rating}</TableCell>
								</TableRow>
							)}
							data={productReviewsData}
						/>
					</div>
				</div>
			</AdminPageBox>
			<DeleteConfirmationModal
				onConfirm={handleDeleteProductConfirm}
				isOpen={isDeleteProductModalOpen}
				setIsOpen={setIsDeleteProductModalOpen}
			/>
			<AddEditProductModal
				isOpen={isEditProductModalOpen}
				setIsOpen={setIsEditProductModalOpen}
				type="EDIT"
				data={productEditFormData as any}
			/>
		</>
	);
};

export default AdminProductPage;
