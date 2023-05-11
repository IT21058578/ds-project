import ProductViewer from "./productDetails";
import { Iproduct } from "../../types";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLazyGetProductQuery } from "../../store/apis/products-api-slice";

const handleAddToCart = () => {
	console.log("Adding product to cart...");
};

const ProductView = () => {
	const { productId = "" } = useParams();
	const [getProduct, { data: productRawData }] = useLazyGetProductQuery();

	useEffect(() => {
		getProduct({ productId });
	}, [productId]);

	useEffect(() => {}, [productRawData]);

	return (
		<div className="App">
			<ProductViewer product={productRawData} onAddToCart={handleAddToCart} />
		</div>
	);
};

export default ProductView;
