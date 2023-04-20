import ProductViewer from "./productDetails";
import { Iproduct } from "../../types";

const product: Iproduct = {
    productID: "1",
    productName: "Product 1",
    productDescription: "• The system should have a web interface where buyers can shop for items uploaded by sellers. • A service should be there where sellers can add/update/delete items.• A service should be there where buyers can search/buy items. • A buyer may buy multiple items.• Once an item is purchased, an administrator may manually verify the order and confirm theorder. ",
    price: 10.99,
    rating: 4.5,
    countInStock: 2,
    review: 'good',
    brand: 'link',
	  categery: 'Category 1',
    image: [
      "https://picsum.photos/seed/1/800/600",
      "https://picsum.photos/seed/2/800/600",
      "https://picsum.photos/seed/3/800/600",
      "https://picsum.photos/seed/4/800/600",
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