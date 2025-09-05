import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdminOrderDetails from "./orderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "../../store/admin/ordersSlice";

export default function AdminOrders() {
    const [openDetails, setOpenDetails] = useState(false);
    const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
    const dispatch = useDispatch();

    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetailsForAdmin(getId));
    }

    useEffect(() => {
        dispatch(getAllOrdersForAdmin())

    }, [dispatch])

    useEffect(() => {
        if (orderDetails !== null) setOpenDetails(true);

    }, [orderDetails])

    return (
        <Card>
            <CardHeader title={<Typography variant="h6">All Orders</Typography>} />
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
                                                onClick={() => handleFetchOrderDetails(orderItem._id)}
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
                    {orderDetails ? <AdminOrderDetails orderDetails={orderDetails} /> : null}
                </DialogContent>
            </Dialog>
        </Card>
    );
}
