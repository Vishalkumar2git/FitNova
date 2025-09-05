import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ImageUpload from "../../components/admin-view/image";
import { useDispatch, useSelector } from "react-redux";
import { addFeatureImage, getFeatureImages } from "../../store/admin/featureSlice";

export default function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonSlice);



  function handleFeatureImage() {
    dispatch(addFeatureImage(uploadUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);
  return (
    <Box >
      <Typography>Upload Feature Image</Typography>
      <ImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadUrl={uploadUrl}
        setUploadUrl={setUploadUrl}
        setImageLoading={setImageLoading}
        imageLoading={imageLoading}
        isCustomStyling={true}

      //  currentEditedId={currentEditedId}
      //  isEditMode={currentEditedId !== null}

      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "black", color: "white", width: 500 }}
          onClick={handleFeatureImage}
          disabled={!uploadUrl || imageLoading}
        >
          Upload
        </Button>
      </Box>


      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem, index) => (
            <Card key={index} sx={{ position: "relative", borderRadius: 2 }}>
              <CardMedia
                component="img"
                image={featureImgItem.image}
                alt={`Feature image ${index + 1}`}
                sx={{ height: 300, objectFit: "cover", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              />
            </Card>
          ))
        ) : (
          <Typography variant="body2" sx={{ mt: 2 }}>
            No images found.
          </Typography>
        )}
      </Box>
    </Box>
  )
}
