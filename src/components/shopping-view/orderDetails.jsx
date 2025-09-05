import { Box, Chip, DialogContent, Divider, Grid, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function ShopOrderDetails({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent dividers sx={{ maxWidth: 600 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Order Info
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Order ID</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderDetails?._id}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2">Order Date</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderDetails?.orderDate?.split("T")[0]}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2">Order Price</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>${orderDetails?.totalAmount}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2">Payment Method</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderDetails?.paymentMethod}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2">Payment Status</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderDetails?.paymentStatus}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2">Order Status</Typography>
            </Grid>
            <Grid item xs={6}>
              <Chip
                label={orderDetails?.orderStatus}
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor:
                    orderDetails?.orderStatus === 'confirmed'
                      ? 'success.main'
                      : orderDetails?.orderStatus === 'rejected'
                        ? 'error.main'
                        : 'grey.900',
                  color: 'white',
                  textTransform: "capitalize",
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          <List dense>
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
              orderDetails?.cartItems?.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ListItemText primary={`Title: ${item.title}`} />
                  <ListItemText primary={`Qty: ${item.quantity}`} />
                  <ListItemText primary={`Price: $${item.price}`} />

                </ListItem>
              )) : null}
          </List>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Shipping Info
          </Typography>
          <Stack spacing={0.5} sx={{ color: "text.secondary" }}>
            <Typography>{user?.userName}</Typography>
            <Typography>{orderDetails?.addressInfo?.address}</Typography>
            <Typography>{orderDetails?.addressInfo?.city}</Typography>
            <Typography>{orderDetails?.addressInfo?.pincode}</Typography>
            <Typography>{orderDetails?.addressInfo?.phone}</Typography>
            <Typography>{orderDetails?.addressInfo?.notes}</Typography>
          </Stack>
        </Box>
      </Stack>
    </DialogContent>
  );
}
