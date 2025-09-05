import { Button, Card, CardContent, Typography, CardActions } from "@mui/material";

export default function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress }) {
  return (
    <Card variant="outlined"
      onClick={setCurrentSelectedAddress ? () => setCurrentSelectedAddress(addressInfo) : null}
      style={{ cursor: "pointer" }}      >
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="body1" gutterBottom>
          <strong>Address:</strong> {addressInfo?.address}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>City:</strong> {addressInfo?.city}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Pincode:</strong> {addressInfo?.pincode}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Phone:</strong> {addressInfo?.phone}
        </Typography>
        <Typography variant="body1">
          <strong>Notes:</strong> {addressInfo?.notes}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained"
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </Button>
        <Button color="error" variant="contained"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardActions>


    </Card>
  );
}
