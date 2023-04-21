import { useEffect, useState } from "react";
import AdminPageBox from "../components/AdminPageBox";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { camelToNormal } from "../utils/string-utils";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import {
  useDeleteReviewMutation,
  useLazyGetReviewQuery,
} from "../store/apis/review-api-slice";

interface IReviewBasicData {
  createdBy?: string;
  createdAt?: string;
  product?: string;
  rating?: number;
}

const AdminReviewPage = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [title] = useState("Tharindu`s Review on Order - 12345");
  const [description] = useState("");
  const [isDeleteReviewModalOpen, setIsDeleteReviewModalOpen] = useState(false);
  const [getReview, { isSuccess: isGetReviewSuccess, data: reviewRawData }] =
    useLazyGetReviewQuery();
  const [deleteReview, {}] = useDeleteReviewMutation();
  const [reviewBasicData] = useState<IReviewBasicData>({
    createdBy: "Tharindu Gunasekera",
    createdAt: "12/4/2001",
    product: "Regal's Body Cleansing Cologne",
    rating: 4.5,
  });

  useEffect(() => {
    // TODO: Handle reception of data here
  }, [isGetReviewSuccess, reviewRawData]);

  const handleDeleteReviewClick = () => {
    setIsDeleteReviewModalOpen(true);
  };

  const handleDeleteReviewConfirm = () => {
    if (reviewId) {
      deleteReview({ id: reviewId });
    }
    setIsDeleteReviewModalOpen(false);
    navigate("/reviews");
  };

  return (
    <>
      <AdminPageBox
        title={title}
        breadcrumbOptions={[
          { label: "Reviews", to: "/reviews" },
          { label: "Tharindu Gunasekera", to: "/customers/1234" },
          { label: reviewId || "" },
        ]}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            height: "12.5%",
          }}
        >
          {Object.entries(reviewBasicData).map(([key, value]) => (
            <div style={{ width: "50%" }}>
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
        <div style={{ flexGrow: 1 }}>
          <Typography>{description}</Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <Button onClick={handleDeleteReviewClick}>Delete Review</Button>
        </div>
      </AdminPageBox>
      <DeleteConfirmationModal
        isOpen={isDeleteReviewModalOpen}
        onConfirm={handleDeleteReviewConfirm}
        setIsOpen={setIsDeleteReviewModalOpen}
      />
    </>
  );
};

export default AdminReviewPage;
