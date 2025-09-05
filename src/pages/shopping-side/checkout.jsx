import { Box, Button, Grid, Typography } from "@mui/material";
import newImg from "../../assets/account.jpg";
import Address from "../../components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import CartContent from "../../components/shopping-view/cartContent";
import { useState } from "react";
import { createOrder } from "../../store/shopping/orderSlice";

export default function ShoppingCheckout() {

  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const {approvalURL} = useSelector((state) => state.shoppingOrders);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();

  function handlePaypalPayment(){
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
      return;
    }
    if (currentSelectedAddress === null) {
      alert("Please select one address to proceed.");
      return;
    }
    
    
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
    
  }
  if (approvalURL) {
    window.location.href = approvalURL;
  }

  const totalAmount = cartItems?.items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Box display="flex" flexDirection="column">
      <Box sx={{ height: 300, width: "100%", overflow: "hidden", position: "relative" }}>
        <img
          src={newImg}
          alt="Account"
          style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "center" }}
        />
      </Box>

      <Grid container spacing={2} sx={{ padding: 2, mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Address
          setCurrentSelectedAddress={setCurrentSelectedAddress}
           />
        </Grid>

        <Grid item xs={12} sm={6} sx={{ display: { xs: "none", sm: "block" } }}>
          {cartItems?.items?.length > 0 &&
            cartItems.items.map((item, index) => (
              <CartContent key={index} cartItems={item} />
            ))}
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography fontWeight={"bold"}>Total</Typography>
              <Typography fontWeight={"bold"}>${totalAmount?.toFixed(2)}</Typography>
            </Box>
            <Button variant="contained" fullWidth sx={{ bgcolor: 'black', color: 'white' }}
            onClick={handlePaypalPayment}

            >
              Checkout With PayPal
            </Button>
          </Grid>
        </Grid>


      </Grid>
    </Box>
  );
}
