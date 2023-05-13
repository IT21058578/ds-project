import React, { useState } from "react";
import ProductCardList from "./productCard";
import {ButtonCategory} from "./catogary";
import ImageSlider from "./ImageSlider"
import { Iproduct } from "../../types";
import { Box } from "@mui/material";


const products: Iproduct[] = [
  {
    productID: "1",
    productName: "Fenugeek Oil",
    productDescription: "This is product 1",
    price: 500.00,
    image: ["https://cdn.shopify.com/s/files/1/0036/5245/2397/products/fenugreekoil_740x.png?v=1676350286"],
    rating: 3.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Oils',
  },
  
  {
    productID: "1",
    productName: "Liya Face",
    productDescription: "This is product 1",
    price: 400.00,
    image: ["https://www.pngitem.com/pimgs/m/43-434027_product-beauty-skin-care-personal-care-liquid-tree.png"],
    rating: 2.5,
    countInStock: 10,
    review: 'good',
    brand: 'link',
	  categery: 'Creams',
  },
  {
    productID: "1",
    productName: "Link Clone",
    productDescription: "This is product 1",
    price: 570.00,
    image: ["https://fimgs.net/mdimg/perfume/375x500.75724.jpg"],
    rating: 5,
    countInStock: 0,
    review: 'good',
    brand: 'link',
	  categery: 'Colons',
  },
  
  {
    productID: "1",
    productName: "Fastem",
    productDescription: "This is product 1",
    price: 200.00,
    image: ["https://static.beautytocare.com/media/catalog/product/cache/global/image/1300x1300/85e4522595efc69f496374d01ef2bf13/h/e/herbal-essences-bio-renew-repair-argan-oil-aloe-oil-hair-mist-100ml.jpg"],
    rating: 4,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Sprays',
  },
  {
    productID: "1",
    productName: "Link oil",
    productDescription: "This is product 1",
    price: 100.00,
    image: ["https://www.healthguard.lk/pub/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/p/h/photography_by_dinusha_madusanka_-0759.jpg"],
    rating: 4.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Oils',
  },
  
  {
    productID: "1",
    productName: "Navarathna",
    productDescription: "This is product 1",
    price: 500.00,
    image: ["https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/600-600/119766--01--1630434751.jpeg"],
    rating: 4.5,
    countInStock: 6,
    review: 'good',
    brand: 'link',
	  categery: 'Oils',
  },
  {
    productID: "1",
    productName: "Idex Spray",
    productDescription: "This is product 1",
    price: 500.00,
    image: ["https://m.media-amazon.com/images/I/51wUojAIxtL._SY450_.jpg"],
    rating: 3,
    countInStock: 1,
    review: 'good',
    brand: 'link',
	  categery: 'Sprays',
  },
  
  {
    productID: "1",
    productName: "Siddhalepa",
    productDescription: "This is product 1",
    price: 500.00,
    image: ["https://cdn.shopify.com/s/files/1/1762/3971/products/LS412BL000-01-E.jpg?v=1622432628"],
    rating: 3,
    countInStock: 1,
    review: 'good',
    brand: 'link',
	  categery: 'Sprays',
  },
  {
    productID: "1",
    productName: "Legis",
    productDescription: "This is product 1",
    price: 800.00,
    image: ["https://www.zenpainrelief.com.au/wp-content/uploads/ZEN-Liniment-ddsprayl.png"],
    rating: 4,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Sprays',
  },
  
  {
    productID: "1",
    productName: "Bettle oil",
    productDescription: "This is product 1",
    price: 500.00,
    image: ["https://www.essentialoil.in/images/detailed/1/betel-leaf-oil-10-ml.jpg"],
    rating: 4.5,
    countInStock: 0,
    review: 'good',
    brand: 'link',
	  categery: 'Colons',
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
      <ButtonCategory categories={["Sprays", "Colons","Oils", "Creams"]} onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
      </Box>
      <ProductCardList products={filteredProducts} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductHome;
