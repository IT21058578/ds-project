import { useEffect, useState } from "react";
import AdminPageBox from "../components/AdminPageBox";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteUserMutation,
  useLazyGetSellerUserQuery,
} from "../store/apis/user-api-slice";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import NormalTable from "../components/NormalTable";
import { camelToNormal } from "../utils/string-utils";

interface IBrandProductData {
  id?: string;
  name?: string;
  price?: number;
  createdOn?: string;
}

interface IBrandBasicData {
  representativeName?: string;
  createdOn?: string;
  lastUpdatedOn?: string;
  lastLoggedOn?: string;
}

const AdminSellerPage = () => {
  const { brandId = "" } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandProductsData, setBrandProductsData] = useState<
    IBrandProductData[]
  >([]);
  const [brandBasicData, setBrandBasicData] = useState<IBrandBasicData>({});
  const [getSeller, { data: brandRawData }] = useLazyGetSellerUserQuery();
  const [deleteSeller] = useDeleteUserMutation();
  const [isBrandDeleteModalOpen, setIsBrandDeleteModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    getSeller({ id: brandId });
  }, [brandId, getSeller]);

  useEffect(() => {
    if (brandRawData) {
      // TODO: Handle data reception here.
    }
  }, [brandRawData]);

  const handleDeleteBrandConfirm = () => {
    deleteSeller({ id: brandId });
    navigate("/sellers");
  };

  const handleBrandProductTableRowClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <AdminPageBox
        title={title}
        breadcrumbOptions={[
          { label: "Sellers", to: "/sellers" },
          { label: brandName },
        ]}
      >
        <div
          style={{
            display: "row",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ width: "50%", height: "100%" }}>
            <NormalTable<IBrandProductData>
              tableColumns={["name", "createdOn", "price"]}
              tableRowRender={(item, idx) => (
                <TableRow
                  key={idx}
                  onClick={() => handleBrandProductTableRowClick(item.id || "")}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.createdOn}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              )}
              data={brandProductsData}
              tableHeight={"100%"}
              defaultSortCol={"createdOn"}
              search={""}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              height: "100%",
            }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              {Object.entries(brandBasicData).map(([key, value]) => (
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
            <div>
              <Button onClick={() => setIsBrandDeleteModalOpen(true)}>
                Delete Brand
              </Button>
            </div>
          </div>
        </div>
      </AdminPageBox>
      <DeleteConfirmationModal
        isOpen={isBrandDeleteModalOpen}
        setIsOpen={setIsBrandDeleteModalOpen}
        onConfirm={handleDeleteBrandConfirm}
      />
    </>
  );
};

export default AdminSellerPage;
