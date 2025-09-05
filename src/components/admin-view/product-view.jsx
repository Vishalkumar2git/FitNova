import { Button, Card, CardActionArea, CardContent } from "@mui/material";

export default function AdminProductView({
    product,
    setFormData,
    setCreateProducts,
    setCurrentEditedId,
    handleDelete,
}) {

    return (
        <Card sx={{ width: "100%", maxWidth: "30%", mx: "auto", m: 2  }}>
            <div>
                <div style={{ position: "relative" }}>
                    <img
                        src={product?.image}
                        alt={product?.title || "Product Image"}
                        style={{ width: "100%", height: "30%", objectFit: "cover", borderRadius: "8px" }}
                    />
                </div>
                <CardContent>
                    <h3 className="text-lg font-semibold">{product?.title}</h3>
                    <div>
                        <span className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>
                            ${product?.price}
                        </span>
                        {product?.salePrice > 0 && (
                            <span className="text-lg font-bold"> ${product?.salePrice} </span>
                        )}
                    </div>
                </CardContent>
                <CardActionArea sx={{ display: "flex", justifyContent: "space-between",  p: 2 }}>
                    <Button variant="contained" color="primary"
                        onClick={() => {
                            setCreateProducts(true);
                            setCurrentEditedId(product._id);
                            setFormData(product);
                        }}
                    >Edit</Button>
                    <Button variant="contained" color="error"
                    onClick={() => handleDelete(product._id)}
                    >Delete</Button>
                </CardActionArea>
            </div>
        </Card>
    );
}
