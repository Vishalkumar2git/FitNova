import { Button, Card, CardContent, CardHeader, Chip, Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ShopOrderDetails from "./orderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from "../../store/shopping/orderSlice";

export default function ShoppingOrders() {
  const [openDetails, setOpenDetails] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shoppingOrders);

  function handleOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetails(true);
    }
  }, [orderDetails]);

  console.log(orderDetails, 'orderDetails')

  return (
    <Card>
      <CardHeader title={<Typography variant="h6">Order History</Typography>} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Order Price</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList && orderList.length > 0 ? (
                orderList.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell>{orderItem._id}</TableCell>
                    <TableCell>{orderItem.orderDate?.split("T")[0]}</TableCell>
                    <TableCell>
                      <Chip
                        label={orderItem.orderStatus}
                        color={
                          orderItem.orderStatus === "confirmed"
                            ? "success"
                            : orderItem.orderStatus === "rejected"
                            ? "error"
                            : "default"
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>${orderItem.totalAmount}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleOrderDetails(orderItem._id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} >
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      <Dialog
        open={openDetails}
        onClose={() => {
          setOpenDetails(false);
          dispatch(resetOrderDetails());
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {orderDetails ? <ShopOrderDetails orderDetails={orderDetails} /> : null}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
