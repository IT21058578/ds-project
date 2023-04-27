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

import Stack from '@mui/material/Stack';
import BookTwoToneIcon from '@mui/icons-material/BookTwoTone';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import { useNavigate } from "react-router-dom";
import { Iproduct } from "../../types";
import AlertDialogSlide from "../../components/Alert/alert";

interface ProductCardListProps {
  products: Iproduct[];
  onAddToCart: (product: Iproduct) => void;
}

const ProductCardList: React.FC<ProductCardListProps> = ({
  products,
  onAddToCart,
}) => {
  const handleAddToCart = (product: Iproduct) => {
    onAddToCart(product);
  };
  const navigate = useNavigate();

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
        marginLeft:"40px",
        marginRight:"40px",
        marginBottom:"50px"
      }}
    >
      {products.map((product) => (
        <AnimatedCard key={product.productID} sx={{ minWidth: 180, margin: "1rem" }}>
          <CardMedia
            component="img"
            height="100"
            image={product.image[0]}
            alt={product.productName}
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
                  {product.productName}
                </Typography>
                
                <Rating
                  name="product-rating"
                  value={product.rating}
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
                  onClick={() => navigate("/productdetails")}
                  sx={{
                      color: 'rgb(12,33,55)', 
                    }}/>
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
