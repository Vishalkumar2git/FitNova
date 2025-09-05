import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePayment } from "../../store/shopping/orderSlice";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 8, textAlign: "center", p: 3 }}>
      <CardContent>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6" component="div">
          Processing Payment... Please wait!
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PaypalReturnPage;
