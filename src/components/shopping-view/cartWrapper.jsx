import { Drawer, Box, Typography, IconButton, Button, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CartContent from "./cartContent";
import { useNavigate } from "react-router-dom";

export default function CartWrapper({ open, setCartOpen, onClose, cartItems = [] }) {
  const navigate = useNavigate();

  const totalAmount = cartItems && cartItems.length > 0
    ? cartItems.reduce(
      (sum, currentItem) =>
        sum +
        (currentItem?.salePrice > 0
          ? currentItem?.salePrice
          : currentItem?.price) *
        currentItem?.quantity,
      0
    )
    : 0;
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setCartOpen(false)} PaperProps={{
        sx: {
          width: { xs: "100%", sm: 450 },

        },
      }}
    >
      <Box p={2} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" gutterBottom>
          Shopping Cart
        </Typography>
        <IconButton onClick={() => setCartOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack spacing={2} sx={{ px: 2, mt: 2 }}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartContent key={item._id || item.id} cartItems={item} />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" align="center">
            Your cart is empty.
          </Typography>
        )}
      </Stack>

      <Box sx={{ mt: 4, px: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography fontWeight={"bold"}>Total</Typography>
          <Typography fontWeight={"bold"}>${totalAmount}</Typography>
        </Box>
        <Button variant="contained" fullWidth sx={{ bgcolor: 'black', color: 'white' }}
          onClick={() => {
            navigate('/shop/checkout')
            setCartOpen(false);
          }}
        >
          Checkout
        </Button>
      </Box>
    </Drawer>
  );
}
