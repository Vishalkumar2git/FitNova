import { Box, Button, DialogContent, Divider, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CommonForm from "../common/form";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "../../store/admin/ordersSlice";

const initialFormData = {
    status: ''
}

export default function AdminOrderDetails({ orderDetails}) {
    const [formData, setFormData] = useState(initialFormData);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

   
  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        
      }
    });
  }
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
                    </Grid>
                </Box>
                <Divider />

                <Box>
                    <Typography variant="h6" gutterBottom>
                        Order Details
                    </Typography>
                    <List dense>
                        {orderDetails?.cartItems?.map((item, index) => (
                            <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
                                <ListItemText primary={`Title: ${item.title}`} />
                                <ListItemText primary={`Qty: ${item.quantity}`} />
                                <ListItemText primary={`Price: $${item.price}`} />
                            </ListItem>
                        ))}
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
                <Box component="form" onSubmit={handleUpdateStatus}>
                    <CommonForm fullWidth>
                        <InputLabel id="order-status-label">Order Status</InputLabel>
                        <Select
                            labelId="order-status-label"
                            value={formData.status}
                            label="Order Status"
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="inProcess">In Process</MenuItem>
                            <MenuItem value="inShipping">In Shipping</MenuItem>
                            <MenuItem value="delivered">Delivered</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                    </CommonForm>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}

                    >
                        Update Order Status
                    </Button>
                </Box>

            </Stack>

        </DialogContent>
    )
}
