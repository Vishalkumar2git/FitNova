import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Layout from "./components/layout"
import AdminLayout from "./components/admin-view/layout"
import AdminDashboard from "./pages/admin-side/dashboard"
import AdminProducts from "./pages/admin-side/products"
import AdminOrders from "./pages/admin-side/orders"
import AdminFeatures from "./pages/admin-side/features"
import ShoppingLayout from "./components/shopping-view/layout"
import NotFound from "./pages/not-found/pagenot"
import ShoppingHome from "./pages/shopping-side/home"
import ShopppingAccount from "./pages/shopping-side/account"
import ShoppingCheckout from "./pages/shopping-side/checkout"
import ShoppingListing from "./pages/shopping-side/listing"
import CheckAuth from "./components/common/checkauth"
import UnauthPage from "./pages/unauth-page/unauth"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkauth } from "./store/auth-slice"
import { Skeleton } from "@mui/material"
import PaypalReturnPage from "./pages/shopping-side/paypal-return"
import PaymentSuccessPage from "./pages/shopping-side/payment-success"
import SearchProducts from "./pages/shopping-side/search"


function App() {


  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkauth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="width-[800] bg-black height-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route path="/layout" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading ={isLoading} >
            <Layout />
          </CheckAuth>
        }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShopppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />



        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
