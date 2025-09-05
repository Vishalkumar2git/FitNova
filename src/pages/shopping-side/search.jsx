import {
    Container,
    TextField,
    Typography,
    Grid,
    Box,
} from "@mui/material";
import ShoppingProductView from "../../components/shopping-view/productView";
import ProductDetails from "../../components/shopping-view/productDetail";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults, resetSearchResults } from "../../store/shopping/searchSlice";
import { addCart, fetchCartItem } from "../../store/shopping/cartSlice";
import { fetchProductDetails } from "../../store/shopping/shopSlice";


export default function SearchProducts() {
    const [keyword, setKeyword] = useState("");
    const [openDetails, setOpenDetails] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { searchResults } = useSelector((state) => state.shopSearch);
    const { productDetails } = useSelector((state) => state.shoppingProducts);

    const { user } = useSelector((state) => state.auth);

    const { cartItems } = useSelector((state) => state.shoppingCart);

    useEffect(() => {
        if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResults(keyword));
            }, 1000);
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(resetSearchResults());
        }
    }, [keyword]);

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

        dispatch(addCart({ userId: user?.id, productId: currentProductId, quantity: 1 })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItem(user?.id));
            }
        });

    }

    function handleProductDetails(currentProductId) {
        dispatch(fetchProductDetails(currentProductId));
    }

    useEffect(() => {
        if (productDetails !== null) setOpenDetails(true);
    }, [productDetails]);


    return (
        <Container maxWidth="lg" sx={{ py: 4, borderRadius: 8 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                <TextField
                    fullWidth
                    value={keyword}
                    name="keyword"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search Products..."
                    variant="outlined"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "999px",
                            paddingRight: 1,
                        },
                        "& input": {
                            padding: "14px 20px",
                        },
                    }}
                />

            </Box>

            {!searchResults.length && (
                <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
                    No result found!
                </Typography>
            )}

            <Grid container spacing={14}>
                {searchResults.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id || item.id}>
                        <ShoppingProductView
                            product={item}
                            handleAddCart={handleAddCart}
                            handleProductDetails={handleProductDetails}
                        />
                    </Grid>
                ))}
            </Grid>

            <ProductDetails
                open={openDetails}
                setOpen={setOpenDetails}
                productDetails={productDetails}
            />
        </Container>
    );
}
