import { Box, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "../../store/shopping/cartSlice";

export default function CartContent({ cartItems }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { productList } = useSelector((state) => state.shoppingProducts);
  const { cartItems: cartItem } = useSelector((state) => state.shoppingCart);

  function handleUpdateQty(getCartItem, typeOfAction) {
    if (typeOfAction == "increase") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const totalStock = productList[getCurrentProductIndex].totalStock;

        // console.log(getCurrentProductIndex, totalStock, "totalStock");

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > totalStock) {
            alert(`Only ${getQuantity} quantity can be added for this item`);
            return;


          }
        }
      }
    }
    dispatch(updateCartQuantity({ userId: user?.id, productId: getCartItem?.productId, quantity: typeOfAction === 'increase' ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1 }))
  }

  function handleDeleteCartItem(getCartItem) {
    dispatch(deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })).then((data) => {
      if (data?.payload?.success) {
        alert("Cart item is deleted successfully");
      }
    });
    
  }
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        style={{ width: 80, height: 80, borderRadius: "8px", objectFit: "cover" }}
      />
      <Box>
        <Typography variant="body2" fontWeight="bold">
          {cartItems?.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton variant="outlined" size="small"
            disabled={cartItems?.quantity === 1}
            onClick={() => handleUpdateQty(cartItems, 'decrease')}


          >
            <RemoveIcon fontSize="small"
            />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {cartItems?.quantity}
          </Typography>
          <IconButton variant="outlined" size="small"
            onClick={() => handleUpdateQty(cartItems, 'increase')}

          >
            <AddIcon fontSize="small"

            />
          </IconButton>


        </Box>
        <Typography variant="body2" color="text.secondary">
          Qty: {cartItems?.quantity} | Price:{" "}
          {cartItems?.salePrice > 0 ? (
            <>
              <span style={{ textDecoration: "line-through", color: "#888", marginRight: 4 }}>
                ${cartItems?.price}
              </span>
              <span style={{ color: "green", fontWeight: "bold" }}>
                ${cartItems?.salePrice}
              </span>
            </>
          ) : (
            <>${cartItems?.price}</>
          )}
        </Typography>

        <Typography variant="body2" fontWeight="bold">
          $
          {(
            (cartItems?.salesPrice > 0 ? cartItems?.salesPrice : cartItems?.price) *
            cartItems?.quantity
          ).toFixed(2)}
        </Typography>

      </Box>

      <IconButton size="medium" color="error" sx={{ ml: "auto" }}>
        <Delete fontSize="medium"
          onClick={() => handleDeleteCartItem(cartItems)}
        />
      </IconButton>


    </Box>
  );
}
