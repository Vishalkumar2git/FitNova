import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 10, p: 4, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          Payment is successful!
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 4 }}
          onClick={() => navigate("/shop/account")}
        >
          View Orders
        </Button>
      </CardContent>
    </Card>
  );
}

export default PaymentSuccessPage;
