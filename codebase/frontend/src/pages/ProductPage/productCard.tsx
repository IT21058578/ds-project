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
import AlertDialogSlide from "../../components/Alert/alert";
import { Link } from "react-router-dom";

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

                <CardBorder>
                <Stack spacing={1} direction="row">
                  {/* <Button
                  onClick={() => handleAddToCart(product)}
                  sx={{
                    color: 'red', 
                  }}
                  >
                    <AddShoppingCartTwoToneIcon/>
                 </Button> */}
                  <AlertDialogSlide></AlertDialogSlide>

                 <Button>
                  <BookTwoToneIcon 
                  sx={{
                      color: 'rgb(12,33,55)', 
                    }}/>
                    <Link to={`/productsx/${product.id}`}></Link>
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
