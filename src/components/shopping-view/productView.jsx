import {
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  Box,
  CardActions,
} from "@mui/material";
import { brandOptions, categoryOptions } from "../../config";

export default function ShoppingProductView({ product, handleProductDetails, handleAddCart }) {
  return (
    <Card
      sx={{
        width: 300,
        maxWidth: 345,
        margin: "auto",
        m: 1,
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.2s",
        ":hover": { transform: "scale(1.02)" }
      }}
    >
      <Box onClick={() => handleProductDetails(product._id)}>

        <Box sx={{ position: "relative" }} >
          <img
            src={product?.image}
            alt={product?.title}
            style={{
              width: "100%",
              height: "25rem",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          {product?.totalStock === 0 ? (
            <Chip
              label="Out Of Stock"
              color="error"
              size="small"
              sx={{ position: 'absolute', top: 8, left: 8 }}
            />
          ) : product?.totalStock < 10 ? (
            <Chip
              label={`Only ${product?.totalStock} items left`}
              color="error"
              size="small"
              sx={{ position: 'absolute', top: 8, left: 8 }}
            />
          ) : product?.salePrice > 0 ? (
            <Chip
              label="Sale"
              color="error"
              size="small"
              sx={{ position: 'absolute', top: 8, left: 8 }}
            />
          ) : null}

        </Box>

        <CardContent sx={{ padding: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {product?.title}
          </Typography>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">
              {categoryOptions[product?.category]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {brandOptions[product?.brand]}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                textDecoration: product?.salePrice > 0 ? "line-through" : "none",
              }}
            >
              ${product?.price}
            </Typography>

            {product?.salePrice > 0 && (
              <Typography variant="body1" fontWeight="bold" color="primary">
                ${product?.salePrice}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Box>

      <CardActions>
        {product?.totalStock === 0 ? (
          <Button
            fullWidth
            disabled
            variant="contained"
            sx={{ opacity: 0.6, cursor: 'not-allowed' }}
          >
            Out Of Stock
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleAddCart(product?._id, product?.totalStock)}
          >
            Add to Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
