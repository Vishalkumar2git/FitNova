import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
  Avatar,
  Paper,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCart, fetchCartItem } from "../../store/shopping/cartSlice";
import StarRating from "../common/rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "../../store/shopping/reviewSlice";
import { setProductDetails } from "../../store/shopping/shopSlice";

export default function ProductDetails({ open, setOpen, productDetails }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { reviews } = useSelector((state) => state.shopReview);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddCart(currentProductId, totalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === currentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > totalStock) {
          alert(`Only ${getQuantity} quantity can be added for this item`);
          return;
        }
      }
    }

    dispatch(
      addCart({ userId: user?.id, productId: currentProductId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItem(user?.id));
      }
    });
  }

  function handleClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReview("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: review,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReview("");
        dispatch(getReviews(productDetails?._id));
        alert("Review added successfully!");
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null)
      dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce(
        (sum, reviewItem) => sum + reviewItem.reviewValue,
        0
      ) / reviews.length
      : 0;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ p: 4 }}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          alignItems="flex-start"
        >
          <Box
            sx={{
              flex: 1,
              borderRadius: 2,
              overflow: "hidden",
              maxHeight: 400,
              width: "100%",
              boxShadow: 2,
            }}
          >
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          <Box flex={2} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" fontWeight="bold">
              {productDetails?.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {productDetails?.description}
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                sx={{
                  textDecoration:
                    productDetails?.salePrice > 0 ? "line-through" : "none",
                }}
              >
                ${productDetails?.price}
              </Typography>
              {productDetails?.salePrice > 0 && (
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="text.secondary"
                >
                  ${productDetails?.salePrice}
                </Typography>
              )}
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <StarRating rating={averageReview} />
              <Typography variant="body2" color="text.secondary">
                ({averageReview.toFixed(2)})
              </Typography>
            </Box>

            <Divider />

            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h6" fontWeight="bold">
                Reviews
              </Typography>

              <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <Box key={reviewItem._id} display="flex" gap={2} mb={2}>
                      <Avatar sx={{ bgcolor: "primary.main", color: "white" }}>
                        {reviewItem.userName[0].toUpperCase()}
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {reviewItem.userName}
                        </Typography>
                        <StarRating rating={reviewItem.reviewValue} />
                        <Typography variant="body2" color="text.secondary">
                          {reviewItem.reviewMessage}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No reviews yet.
                  </Typography>
                )}
              </Paper>

              <Box mt={4} display="flex" flexDirection="column" gap={2}>
                <Typography variant="subtitle1">Write a review</Typography>
                <Box display="flex" gap={1}>
                  <StarRating
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </Box>
                <TextField
                  name="review"
                  value={review}
                  onChange={(event) => setReview(event.target.value)}
                  placeholder="Write a review..."
                  fullWidth
                  multiline
                  minRows={2}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddReview}
                  disabled={review.trim() === ""}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3 }}>
        <Button onClick={handleClose} variant="outlined" color="error">
          Close
        </Button>
        {productDetails?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out of Stock
          </Button>
        ) : (
          <Button
            variant="contained"
            className="w-full"
            onClick={() =>
              handleAddCart(productDetails?._id, productDetails?.totalStock)
            }
          >
            Add to Cart
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
