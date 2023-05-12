import ProductViewer from "./productDetails";
import { Iproduct } from "../../types";
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from "../../store/apis/products-api-slice";

// const product: Iproduct = {
//     id: "1",
//     name: "Fenugeek Oil",
//     description: "Uses: Fenugreek seed essential oil is popularly used in combating hair loss and baldness. Fenugreek nourishes the hair and the scalp in depth. It also helps fight lice and dandruff. In addition, Fenugreek oil strengthens and softens dry, damaged and brittle hair and stimulates hair growth. Anti-inflammatory properties of Fenugreek essential oil help reduce acne, swelling and puffiness of the skin. It is used in aromatherapy to reduce high blood pressure and nervousness.",
//     price: 500.00,
//     countInStock: 2,
//     brandId: 'link',
// 	  category: 'Oils',
//     imageUrl: [
//       "https://cdn.shopify.com/s/files/1/0036/5245/2397/products/fenugreekoil_740x.png?v=1676350286",
//       "https://cdn.shopify.com/s/files/1/0036/5245/2397/products/fenugreekseedoil_740x.png?v=1676350286",
//       "https://cdn.shopify.com/s/files/1/0036/5245/2397/products/fenugreekoilsrilanka_740x.png?v=1676350286",
//       "https://cdn.shopify.com/s/files/1/0036/5245/2397/products/fenugreekseedoilsrilanka_740x.png?v=1676350286",
//     ],
// };

type ProductParamsId = {
  id: string;
};

const handleAddToCart = () => {
  console.log("Adding product to cart...");
};

const ProductView = () => {

  const { id } = useParams() as ProductParamsId;
  const { data: product } = useGetProductQuery({ id });

  if (!product) return <p>Product not found</p>;

  return (
    <div className="App">
      <ProductViewer product={product} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductView;