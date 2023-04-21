import { useEffect, useState } from "react";
import AdminPageBox from "../components/AdminPageBox";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { camelToNormal } from "../utils/string-utils";
import NormalTable from "../components/NormalTable";
import {
  useDeleteProductsMutation,
  useLazyGetProductQuery,
} from "../store/apis/products-api-slice";
import AddEditProductModal from "../components/AddEditProductModal";

interface IProductBasicData {
  brand?: string;
  category?: string;
  createdOn?: string;
  lastEditedOn?: string;
}

interface IProductReviewData {
  id?: string;
  createdBy?: string;
  createdOn?: string;
  rating?: number;
}

const AdminProductPage = () => {
  const { productId = "" } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [brandId, setBrandId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [getProduct, { data: productRawData }] = useLazyGetProductQuery();
  const [deleteProduct] = useDeleteProductsMutation();
  const [productBasicData, setProductBasicData] = useState<IProductBasicData>(
    {}
  );
  const [productReviewsData, setProductReviewsData] = useState<
    IProductReviewData[]
  >([]);
  const [productEditFormData, setProductEditFormData] = useState({});
  const [isEditProductModalOpen, setIsEditProductModalOpen] =
    useState<boolean>(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    getProduct({ id: productId });
  }, [productId]);

  useEffect(() => {
    // TODO: Handle data reception here
  }, [productRawData]);

  const handleDeleteProductConfirm = () => {
    deleteProduct({ id: productId });
    navigate("/products");
  };

  const handleProductReviewTableRowClick = (id?: string) => {
    navigate(`/reviews/${id}`);
  };

  return (
    <>
      <AdminPageBox
        title={title}
        breadcrumbOptions={[
          { label: "Products", to: "/products" },
          { label: brand, to: `/sellers/${brandId}` },
          { label: title },
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              height: "100%",
            }}
          >
            <div style={{ width: "100%", height: "50%" }}>
              <img src={imageUrl} alt="Image of the product" />
            </div>
            <div style={{ width: "100%", height: "50%" }}>
              {Object.entries(productBasicData).map(([key, value]) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <span style={{ width: "33.3%" }}>
                    <Typography sx={{ fontWeight: "600" }}>
                      {camelToNormal(key)}
                    </Typography>
                  </span>
                  <span>
                    <Typography>{value.toString()}</Typography>
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: "4px",
              }}
            >
              <Button onClick={() => setIsEditProductModalOpen(true)}>
                Edit Product
              </Button>
              <Button onClick={() => setIsDeleteProductModalOpen(true)}>
                Delete Product
              </Button>
            </div>
          </div>
          <div style={{ width: "50%", height: "100%" }}>
            <NormalTable<IProductReviewData>
              tableColumns={["createdBy", "createdOn", "rating"]}
              tableRowRender={(item, idx) => (
                <TableRow
                  key={idx}
                  onClick={() => handleProductReviewTableRowClick(item.id)}
                >
                  <TableCell>{item.createdBy}</TableCell>
                  <TableCell>{item.createdOn}</TableCell>
                  <TableCell>{item.rating}</TableCell>
                </TableRow>
              )}
              data={productReviewsData}
              tableHeight={"100%"}
              defaultSortCol={"createdOn"}
              search={""}
            />
          </div>
        </div>
      </AdminPageBox>
      <DeleteConfirmationModal
        onConfirm={handleDeleteProductConfirm}
        isOpen={isDeleteProductModalOpen}
        setIsOpen={setIsDeleteProductModalOpen}
      />
      <AddEditProductModal
        isOpen={isEditProductModalOpen}
        setIsOpen={setIsEditProductModalOpen}
        type="EDIT"
        data={productEditFormData as any}
      />
    </>
  );
};

export default AdminProductPage;
