import { Box, Card, CardContent, Grid, IconButton, Typography } from "@mui/material"

import { Airplay, ChevronLeft, ChevronRight, Face3, Male, ShoppingBasket, Spa, Sports, SportsEsports } from "@mui/icons-material";
import ShirtIcon from '@mui/icons-material/Checkroom';
import BabyIcon from '@mui/icons-material/ChildCare';
import WatchIcon from '@mui/icons-material/Watch';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredProducts, fetchProductDetails } from "../../store/shopping/shopSlice";
import ShoppingProductView from "../../components/shopping-view/productView";
import { useNavigate } from "react-router-dom";
import { addCart, fetchCartItem } from "../../store/shopping/cartSlice";
import ProductDetails from "../../components/shopping-view/productDetail";
import { getFeatureImages } from "../../store/admin/featureSlice";

const categoriesIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: Face3 },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];
const brandsIcon = [
  { id: "nike", label: "Nike", icon: Male },
  { id: "adidas", label: "Adidas", icon: Spa },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Sports },
  { id: "h&m", label: "H&M", icon: SportsEsports  },
];
export default function ShoppingHome() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const {productList, productDetails} = useSelector((state) => state.shoppingProducts)
    const { featureImageList } = useSelector((state) => state.commonSlice);
  
  const {user} = useSelector((state) => state.auth)
  const [openDetails, setOpenDetails] = useState(false);
  const dispatch = useDispatch();
  const navigate =  useNavigate();


  
  function handleNavigateToPage(CurrentItem, section) {
    sessionStorage.removeItem("filter");
    const currentFilter = {
      [section]: [CurrentItem.id],
    };

    sessionStorage.setItem("filter", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }
  function handleProductDetails(currentProductId){
    dispatch(fetchProductDetails(currentProductId));
   };
    function handleAddCart(currentProductId){
     dispatch(addCart({userId : user?.id, productId: currentProductId, quantity: 1})).then((data) =>{
       if(data?.payload?.success){
         dispatch(fetchCartItem(user?.id));
       }
     });
   
    }


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(fetchFilteredProducts({filterParams : {}, sortParams : 'price-lowtohigh'}))
  },[dispatch]);

   useEffect(() =>{
  if(productDetails !== null) setOpenDetails(true);
  
    },[productDetails])

     useEffect(() => {
        dispatch(getFeatureImages());
      }, [dispatch]);


   

  return <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }} >
    <Box sx={{ position: "relative", width: "100%", height: 600, overflow: "hidden" }}>
      {
        featureImageList && featureImageList.length > 0 ? featureImageList.map((slide,index) => 
          <img
          src={slide?.image}
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: index === currentSlide ? 1 : 0,
            transition: "opacity 1s",
          }}
          />
         
        ) : null
      }
       <IconButton
        onClick={() =>
          setCurrentSlide(
            (prevSlide) =>
              (prevSlide - 1 + featureImageList.length) % featureImageList.length
          )
        }
        sx={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255,255,255,0.8)",
        }}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        onClick={() =>
          setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
        }
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255,255,255,0.8)",
        }}
      >
        <ChevronRight />
      </IconButton>

    </Box>
    <Box sx={{ py: 12, bgcolor: "grey.50" }}>
      <Box px={3} maxWidth="100%">
        <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
          Shop by category
        </Typography>
        <Grid container spacing={2}>
          {categoriesIcon.map((categoryItem, index) => (
            <Grid item xs={6} md={4} lg={2.4} key={index}>
              <Card
                onClick={() => handleNavigateToPage(categoryItem, "category")}
                sx={{ cursor: "pointer", "&:hover": { boxShadow: 4 } }}
              >
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
                  <categoryItem.icon style={{ fontSize: 48, marginBottom: 16, color: "#1976d2" }} />
                  <Typography fontWeight="bold">{categoryItem.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    <Box sx={{ py: 12, bgcolor: "grey.50" }}>
      <Box px={3} maxWidth="100%">
        <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
          Shop by Brand
        </Typography>
        <Grid container spacing={2}>
          {brandsIcon.map((brandItem, index) => (
            <Grid item xs={6} md={4} lg={2} key={index}>
              <Card
                onClick={() => handleNavigateToPage(brandItem, "brand")}
                sx={{ cursor: "pointer", "&:hover": { boxShadow: 4 } }}
              >
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
                  <brandItem.icon style={{ fontSize: 48, marginBottom: 16, color: "#1976d2" }} />
                  <Typography fontWeight="bold">{brandItem.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    <Box sx={{ py: 12 }}>
      <Box px={6} maxWidth="100%">
        <Typography variant="h4" align="center" fontWeight="bold" mb={4} gap={2}>
          Feature Products
        </Typography>
        <Grid container spacing={2}>
          {productList && productList.length > 0 &&
            productList.map((productItem, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} gap={5} key={index}>
                
                <ShoppingProductView
                  handleProductDetails={handleProductDetails}
                  product={productItem}
                  handleAddCart={handleAddCart}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
     <ProductDetails open={openDetails}
          setOpen={setOpenDetails}
          productDetails={productDetails}
          />

  </Box>
  
}
