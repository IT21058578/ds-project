import ProductViewer from "./productDetails";
import { IProduct } from "../../types";

const product: IProduct = {
    productID: "1",
    productName: "Fenugeek Oil",
    productDescription: "Uses: Fenugreek seed essential oil is popularly used in combating hair loss and baldness. Fenugreek nourishes the hair and the scalp in depth. It also helps fight lice and dandruff. In addition, Fenugreek oil strengthens and softens dry, damaged and brittle hair and stimulates hair growth. Anti-inflammatory properties of Fenugreek essential oil help reduce acne, swelling and puffiness of the skin. It is used in aromatherapy to reduce high blood pressure and nervousness.",
    price: 500.00,
    rating: 3.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Oils',
    image: [
      "https://cdn.shopify.com/s/files/1/0036/5245/2397/products/fenugreekoil_740x.png?v=1676350286",
      "https://cdn.shopify.com/s/files/1/0036/5245/2397/products/fenugreekseedoil_740x.png?v=1676350286",
      "https://cdn.shopify.com/s/files/1/0036/5245/2397/products/fenugreekoilsrilanka_740x.png?v=1676350286",
      "https://cdn.shopify.com/s/files/1/0036/5245/2397/products/fenugreekseedoilsrilanka_740x.png?v=1676350286",
    ],
};

const handleAddToCart = () => {
  console.log("Adding product to cart...");
};

const ProductView = () => {
  return (
    <div className="App">
      <ProductViewer product={product} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductView;