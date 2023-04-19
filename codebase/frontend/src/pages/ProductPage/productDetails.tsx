import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Zoom,
} from "@mui/material";
import { AddShoppingCart, Image } from "@mui/icons-material";

import { Iproduct } from "../../types";
import Avatar from '@mui/material/Avatar';


interface Props {
  product: Iproduct;
  onAddToCart: () => void;
}

const Product: React.FC<Props> = ({ product, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(product.image[0]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleAddToCartClick = () => {
    onAddToCart();
  };

  return (

    <Box sx={{ minWidth: 275 , border: '1px solid green' , padding: '40px' , borderRadius:'30px' , backgroundColor: 'rgba(234, 234, 234, 0.1)' ,marginTop:'100px' ,
               marginBottom:'20px', boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)', marginLeft:'50px' , marginRight:'50px'}} >
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 0,
            paddingBottom: "100%",
            overflow: "hidden",
            cursor: "zoom-in",
            "&:hover .zoom-in": {
              visibility: "visible",
              transform: "scale(1)",
            },
            "&:hover .zoom-out": {
              visibility: "visible",
              transform: "scale(2.5)",
            },
          }}
        >
          <img
            src={selectedImage}
            alt={product.productName}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "15px"
            }}
          />
          <Zoom in={true} timeout={500}>
            <Box
              component="img"
              src={selectedImage}
              alt={product.productName}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                visibility: "hidden",
                transition: "transform 0.5s ease-in-out",
              }}
              className="zoom-in"
            />
          </Zoom>
          <Zoom in={true} timeout={500}>
            <Box
              component="img"
              src={selectedImage}
              alt={product.productName}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                visibility: "hidden",
                transition: "transform 0.5s ease-in-out",
              }}
              className="zoom-out"
            />
          </Zoom>
        </Box>
        <List sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "scroll",
          marginTop: 2
        }}>
          {product.image.map((image) => (
            <ListItem
              button
              key={image}
              selected={selectedImage === image}
              onClick={() => handleImageClick(image)}
              sx={{ marginRight: 2 }}
            >
               <Avatar
                  alt="Remy Sharp"
                  src={image}
                  sx={{ width: 56, height: 56 ,
                  border: "2px solid",
                  borderColor:
                    selectedImage === image ? "primary.main" : "grey.400",
                  transition: "border-color 0.2s ease",}}
                />
              {/* <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor:
                    selectedImage === image ? "primary.main" : "grey.400",
                  transition: "border-color 0.2s ease",
                }}
              /> */}
            </ListItem>
          ))}
        </List>

      </Grid>
      
      <Grid item xs={12} sm={6}>
      <Box sx={{ maxWidth:'420px' , border: '1px solid green' , padding: '70px' , borderRadius:'30px' , backgroundColor: 'rgba(234, 234, 234, 0.1)' ,marginTop:'50px' ,marginBottom:'20px', boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)'}} >
        <Typography variant="h4" gutterBottom>
          {product.productName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {product.productDescription}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Price: ${product.price}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
          <Typography variant="subtitle1">Stock:</Typography>
          <Box
            component="span"
            sx={{
              marginLeft: 1,
              padding: "2px 8px",
              borderRadius: 16,
              backgroundColor:
                product.countInStock > 0 ? "success.light" : "error.light",
              color: "white",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCartClick}
          disabled={product.countInStock <= 0}
          sx={{ marginTop: 2 }}
        >
          Add to Cart
        </Button>
        </Box>
      </Grid>
      
    </Grid>
    </Box>
);
};

export default Product;    
