import {
  Grid,
  Box,
  Typography,
  Menu,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ProductFilter from "../../components/shopping-view/filter";
import { ImportExport } from "@mui/icons-material";
import { sortOptions } from "../../config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredProducts, fetchProductDetails } from "../../store/shopping/shopSlice";
import ShoppingProductView from "../../components/shopping-view/productView";
import { useSearchParams } from "react-router-dom";
import ProductDetails from "../../components/shopping-view/productDetail";
import { addCart, fetchCartItem } from "../../store/shopping/cartSlice";

function createSearchParamsHelper(filterParams) {
const queryParams = [];
for(const [key, value] of Object.entries(filterParams)){
  if(Array.isArray(value) && value.length > 0){
    const paramValue = value.join(",");
    queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
  }
}
return queryParams.join("&");
}
export default function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shoppingProducts);
  const {cartItems} = useSelector((state) => state.shoppingCart);
  const {user} = useSelector((state) => state.auth)
  const [anchorEl, setAnchorEl] = useState(null);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetails, setOpenDetails] = useState(false);

  const categorySearchParam = searchParams.get("category");


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    handleClose();
  };
 function handleFilter(sectionId, currentOption){
  let newFilter = {...filter};
  const indexCurrentSection = Object.keys(newFilter).indexOf(sectionId);
  if(indexCurrentSection === -1){
    newFilter = {
      ...newFilter,
      [sectionId]: [currentOption],
    };
  } else{
    const indexCurrentOption =newFilter[sectionId].indexOf(currentOption);
    if(indexCurrentOption === -1) newFilter[sectionId].push(currentOption);
    else newFilter[sectionId].splice(indexCurrentOption, 1);
  }
  setFilter(newFilter);
  sessionStorage.setItem("filter", JSON.stringify(newFilter));

 }
 function handleProductDetails(currentProductId){
  dispatch(fetchProductDetails(currentProductId));
 }

 function handleAddCart(currentProductId, totalStock){
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

  dispatch(addCart({userId : user?.id, productId: currentProductId, quantity: 1})).then((data) =>{
    if(data?.payload?.success){
      dispatch(fetchCartItem(user?.id));
    }
  });

 }


 useEffect(() => {
  setSort("price-lowtohigh");
  setFilter(JSON.parse(sessionStorage.getItem("filter")) || {});
 },[categorySearchParam]);

 useEffect(()=> {
if(filter && Object.keys(filter).length > 0){
  const createQueryString = createSearchParamsHelper(filter);
  setSearchParams(new URLSearchParams(createQueryString))
}
 },[filter]);

  useEffect(() => {
    if(filter !==null && sort !== null)
    dispatch(fetchFilteredProducts({filterParams : filter, sortParams : sort}));
  }, [dispatch, sort, filter]);

  useEffect(() =>{
if(productDetails !== null) setOpenDetails(true);

  },[productDetails])

  return (
    <Box sx={{ padding: { xs: 2, md: 3 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <ProductFilter filter={filter} handleFilter={handleFilter} />
        </Grid>

        <Grid item xs={12} md={9}>
          <Box
            sx={{
              border: "1px solid #ccc",
              padding: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              All Products
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {productList?.length || 0} Products
              </Typography>

              <Button
                variant="outlined"
                size="small"
                onClick={handleClick}
                startIcon={<ImportExport fontSize="small" />}
              >
                Sort By
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <RadioGroup
                  value={sort}
                  onChange={handleSortChange}
                  sx={{ px: 2 }}
                >
                  {sortOptions.map((sortItem) => (
                    <FormControlLabel
                      key={sortItem.id}
                      value={sortItem.id}
                      control={<Radio size="small" />}
                      label={sortItem.label}
                    />
                  ))}
                </RadioGroup>
              </Menu>
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {productList && productList.length > 0 ? (
              productList.map((productItem, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ShoppingProductView handleProductDetails={handleProductDetails} product={productItem}
                  handleAddCart={handleAddCart}
                   />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  No products found.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <ProductDetails open={openDetails}
      setOpen={setOpenDetails}
      productDetails={productDetails}
      />
    </Box>
  );
}
