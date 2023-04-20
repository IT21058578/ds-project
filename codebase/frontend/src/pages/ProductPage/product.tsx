import React, { useState } from "react";
import ProductCardList from "./productCard";
import {ButtonCategory} from "./catogary";
import ImageSlider from "./ImageSlider"
import { Iproduct } from "../../types";
import { Box } from "@mui/material";


const products: Iproduct[] = [
  {
    productID: "1",
    productName: "Product 1",
    productDescription: "This is product 1",
    price: 10.99,
    image: ["https://www.nicepng.com/png/detail/394-3948184_hemp-skincare-cbd-skincare-sativa-product-range-skin.png","https://www.pngitem.com/pimgs/m/43-434027_product-beauty-skin-care-personal-care-liquid-tree.png"],
    rating: 4.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Category 1',
  },
  
  {
    productID: "1",
    productName: "Product 2",
    productDescription: "This is product 1",
    price: 10.99,
    image: ["https://www.pngitem.com/pimgs/m/43-434027_product-beauty-skin-care-personal-care-liquid-tree.png"],
    rating: 4.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Category 2',
  },
  {
    productID: "1",
    productName: "Product 1",
    productDescription: "This is product 1",
    price: 10.99,
    image: ["https://www.nicepng.com/png/detail/394-3948184_hemp-skincare-cbd-skincare-sativa-product-range-skin.png"],
    rating: 4.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Category 1',
  },
  
  {
    productID: "1",
    productName: "Product 2",
    productDescription: "This is product 1",
    price: 10.99,
    image: ["https://www.pngitem.com/pimgs/m/43-434027_product-beauty-skin-care-personal-care-liquid-tree.png"],
    rating: 4.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Category 2',
  },
  {
    productID: "1",
    productName: "Product 1",
    productDescription: "This is product 1",
    price: 10.99,
    image: ["https://www.nicepng.com/png/detail/394-3948184_hemp-skincare-cbd-skincare-sativa-product-range-skin.png"],
    rating: 4.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Category 1',
  },
  
  {
    productID: "1",
    productName: "Product 2",
    productDescription: "This is product 1",
    price: 10.99,
    image: ["https://www.pngitem.com/pimgs/m/43-434027_product-beauty-skin-care-personal-care-liquid-tree.png"],
    rating: 4.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Category 2',
  },
  {
    productID: "1",
    productName: "Product 1",
    productDescription: "This is product 1",
    price: 10.99,
    image: ["https://www.nicepng.com/png/detail/394-3948184_hemp-skincare-cbd-skincare-sativa-product-range-skin.png"],
    rating: 4.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Category 1',
  },
  
  {
    productID: "1",
    productName: "Product 2",
    productDescription: "This is product 1",
    price: 10.99,
    image: ["https://www.pngitem.com/pimgs/m/43-434027_product-beauty-skin-care-personal-care-liquid-tree.png"],
    rating: 4.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Category 2',
  },
  {
    productID: "1",
    productName: "Product 1",
    productDescription: "This is product 1",
    price: 10.99,
    image: ["https://www.nicepng.com/png/detail/394-3948184_hemp-skincare-cbd-skincare-sativa-product-range-skin.png"],
    rating: 4.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Category 1',
  },
  
  {
    productID: "1",
    productName: "Product 2",
    productDescription: "This is product 1",
    price: 10.99,
    image: ["https://www.pngitem.com/pimgs/m/43-434027_product-beauty-skin-care-personal-care-liquid-tree.png"],
    rating: 4.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Category 2',
  }, 
];


const ProductHome: React.FC = () => {

  // const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState("");


  const handleAddToCart = (product: Iproduct) => {
    console.log(`Added ${product.productName} to cart!`);
  };

  

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categery === selectedCategory)
    : products;

  return (
    <div>
      <ImageSlider/>
      <Box sx={{marginLeft:'50px'}}>
      <ButtonCategory categories={["Category 1", "Category 2"]} onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
      </Box>
      <ProductCardList products={filteredProducts} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductHome;
