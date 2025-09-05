import { Box, Button, Drawer, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import CommonForm from "../../components/common/form";
import { addProductFormElements } from "../../config";
import ImageUpload from "../../components/admin-view/image";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, editProduct, fetchProduct } from "../../store/productSlice";
import AdminProductView from "../../components/admin-view/product-view";


const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
};

export default function AdminProducts() {
  const [createProducts, setCreateProducts] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector(state => state.adminProducts);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null ?
    dispatch(editProduct({
      id: currentEditedId, formData
    })).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchProduct());
      }
    })
    : dispatch(addProduct({
      ...formData,
      image: uploadUrl
    })).then((data) =>{
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchProduct());
        setCreateProducts(false);
        setImageFile(null);
        setFormData(initialFormData);
      }
    })

  }

  function handleDelete(getCurrentProductId){
dispatch(deleteProduct({ id: getCurrentProductId })).then(data=>{
if(data?.payload?.success){
  dispatch(fetchProduct());
}
})
  }

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  console.log(formData, 'productList');

  return (
    <Fragment>
      <Box sx={{ justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "#333" } }}
          onClick={() => setCreateProducts(true)}
        >
          Add New Product
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductView
            setFormData={setFormData}
            setCreateProducts={setCreateProducts} 
            setCurrentEditedId={setCurrentEditedId} 
            key={productItem._id} product={productItem}
            handleDelete={handleDelete}
             />
          ))
        ) : null}
      </Box>

      <Drawer anchor="right" open={createProducts} onClose={() => {setCreateProducts(false) 
        setCurrentEditedId(null)
        setFormData(initialFormData)}
      }>
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {currentEditedId ? "Edit Product" : "Add New Product"}
          </Typography>

          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadUrl={uploadUrl}
            setUploadUrl={setUploadUrl}
            setImageLoading={setImageLoading}
            imageLoading={imageLoading}
            currentEditedId={currentEditedId}
            isEditMode={currentEditedId !== null}

          />

          <CommonForm
            onSubmit={onSubmit}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId ? "Update" : "Add"}
            formControls={addProductFormElements}
          />
        </Box>
      </Drawer>
    </Fragment>
  );
}
