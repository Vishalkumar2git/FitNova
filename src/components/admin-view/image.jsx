import { Box, Typography, IconButton, Skeleton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ImageUpload({
  imageFile,
  setImageFile,
  uploadUrl,
  setUploadUrl,
  setImageLoading,
  imageLoading,
  isEditMode,
  isCustomStyling = false,

}) {

  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function handleImageFile(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemove() {
    setImageFile(null);
    setUploadUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoading(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    try {
      const res = await axios.post("http://localhost:5000/api/admin/product/upload-image", data);

      console.log(res, 'res')

      if (res?.data?.success) {
        setUploadUrl(res.data.result.url);
        setImageLoading(false);
      }
    } catch (error) {
      setImageLoading(false), error
      alert("Error uploading image. Please try again.");
    }
  }



  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <Box sx={{
      width: "100%",
      mt: 4,
      ...(isCustomStyling ? {} : {
        maxWidth: "28rem",
        mx: "auto",
      }),
      textAlign: "left",
    }}>
      <Typography sx={{ fontSize: "1.1rem", fontWeight: "600", mb: 2, mt: 2 }}>
        Upload Image
      </Typography>

      <Box
        sx={{
          border: "2px dashed #aaa",
          borderRadius: 2,
          p: 3,
          backgroundColor: dragging ? "#f0f0f0" : "transparent",
          // transition: "background-color 0.3s",
          // "&:hover": { borderColor: "#333" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 110,
          cursor: "pointer",
          position: "relative",
          overflow: "hidden"
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {imageLoading ? (
          <Skeleton variant="rounded" width="110%" height={110} />
        ) : uploadUrl ? (
          <>
            <img
              src={uploadUrl}
              alt="Uploaded preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                background: "rgba(255,255,255,0.7)",
                "&:hover": { background: "rgba(255,255,255,1)" },
                boxShadow: 1,
              }}
            >
              <CloseIcon fontSize="small" />
              <span>Remove file</span>
            </IconButton>
          </>
        ) : (
          <>
            <CloudUploadIcon sx={{ fontSize: 40, color: "gray" }} />
            <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
              Drag & drop an image here or click to upload
            </Typography>
          </>
        )}

        <input id="image-upload" type="file" ref={inputRef} onChange={handleImageFile} hidden
          disabled={isEditMode}

        />
      </Box>
    </Box>
  );
}
