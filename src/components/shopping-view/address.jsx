import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { addressFormControls } from "../../config";
import CommonForm from "../../components/common/form";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress, editAddress, fetchAddress } from "../../store/shopping/addressSlice";
import AddressCart from "./addressCart";

const initialAddressFormData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: ''
}


export default function Address({setCurrentSelectedAddress}) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { addressList } = useSelector((state) => state.shoppingAddress);
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  function handleAddress(e) {
    e.preventDefault();
    
    if (addressList.length >= 4 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      // toast({
      //   title: "You can add max 3 addresses",
      //   variant: "destructive",
      // });

      return;
    }
    currentEditedId !== null
    ? dispatch(
        editAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAddress(user?.id));
          setCurrentEditedId(null);
          setFormData(initialAddressFormData);
          
        }
      }):

    dispatch(addAddress({
      ...formData,
      userId: user.id,
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddress(user?.id));
        setFormData(initialAddressFormData);
      }
    });
  }
  function handleDeleteAddress(currentAddress) {
    dispatch(deleteAddress({ userId: user?.id, addressId: currentAddress._id })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddress(user?.id));
      }
    });
  }

  function handleEditAddress(currentAddress) {
    setCurrentEditedId(currentAddress?._id)
    setFormData({
      address: currentAddress?.address,
      city: currentAddress?.city,
      phone: currentAddress?.phone,
      pincode: currentAddress?.pincode,
      notes: currentAddress?.notes
    })
  }


  function isFormValid() {
    return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item)
  };

  useEffect(() => {
    dispatch(fetchAddress(user?.id))
  }, [dispatch]);




  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {addressList && addressList.length > 0 ? (
          addressList.map((singleAddressItem) => (
            <Grid item xs={12} sm={6} key={singleAddressItem.id}>
              <AddressCart
                // selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              No addresses available.
            </Typography>
          </Grid>
        )}
      </Grid>

      <CardHeader
        title={
          <Typography variant="h6">
            {currentEditedId !== null ? "Edit Address" : "Add New Address"}

          </Typography>
        }
      />
      <CardContent>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit " : "Add "}

          onSubmit={handleAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};
