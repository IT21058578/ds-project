import React from "react";
import {
	Card,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Box,
	Rating,
	styled,
} from "@mui/material";

import Stack from "@mui/material/Stack";
import BookTwoToneIcon from "@mui/icons-material/BookTwoTone";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
import { useNavigate } from "react-router-dom";
import { Iproduct } from "../../types";
import { IProductDTO } from "../../store/apis/types/response-types";

interface ProductCardListProps {
	products: IProductDTO[];
	onAddToCart: (product: Iproduct) => void;
}

const ProductCardList: React.FC<ProductCardListProps> = ({
	products,
	onAddToCart,
}) => {
	const navigate = useNavigate();

	const handleAddToCart = (product: IProductDTO) => {
		// onAddToCart(product);
	};

	const AnimatedCard = styled(Card)`
		transition: transform 0.2s ease-in-out;
		&:hover {
			transform: scale(1.05);
		}
		border-radius: 13px;
		border: 1px solid #84d044;
	`;

	const CardBorder = styled("div")`
		border: 1px solid green;
		border-radius: 13px;
	`;

	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				minWidth: "1430px",
				alignItems: "left",
				justifyContent: "left",
				marginLeft: "40px",
				marginRight: "40px",
				marginBottom: "50px",
			}}
		>
			{products.map((product) => (
				<AnimatedCard key={product.id} sx={{ minWidth: 180, margin: "1rem" }}>
					<CardMedia
						component="img"
						height="100"
						image={product?.imageUrl?.length > 0 ? product.imageUrl[0] : ""}
						alt={product.name}
					/>
					<CardContent>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							padding="1rem"
						>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
								align="center"
							>
								{product.name}
							</Typography>

							<Rating
								name="product-rating"
								value={2.5}
								precision={0.5}
								readOnly
							/>

							<div>
								<Typography
									variant="h6"
									color="primary"
									align="center"
									marginTop="1rem"
								>
									Rs. {product.price}
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									align="center"
									sx={{ color: product.countInStock > 0 ? "green" : "red" }}
								>
									{product.countInStock > 0
										? `In Stock: ${product.countInStock}`
										: "Out of Stock"}
								</Typography>
							</div>
							<CardBorder>
								<Stack spacing={1} direction="row">
									<Button
										onClick={() => handleAddToCart(product)}
										sx={{
											color: "red",
										}}
									>
										<AddShoppingCartTwoToneIcon />
									</Button>
									<Button>
										<BookTwoToneIcon
											onClick={() => navigate(`/product/${product.id}`)}
											sx={{
												color: "rgb(12,33,55)",
											}}
										/>
									</Button>
								</Stack>
							</CardBorder>
						</Box>
					</CardContent>
				</AnimatedCard>
			))}
		</Box>
	);
};

export default ProductCardList;
