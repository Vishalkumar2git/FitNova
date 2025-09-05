import { useEffect, useState } from "react";
import {
  HouseOutlined,
  Logout,
  Menu,
  Person,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Link,
  Menu as MuiMenu,
  MenuItem,
  Tooltip,
  Typography,
  Badge,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { shoppingViewHeaderMenuItems } from "../../config";
import { logout } from "../../store/auth-slice";
import CartWrapper from "./cartWrapper";
import { fetchCartItem } from "../../store/shopping/cartSlice";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(currentMenuItem) {
    sessionStorage.removeItem('filter')
    const currentFilter = currentMenuItem.id !== 'home' && currentMenuItem.id !== 'products' && currentMenuItem.id !== 'search' ?
      {
        category: [currentMenuItem.id]
      } : null
    sessionStorage.setItem('filter', JSON.stringify(currentFilter))
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
        new URLSearchParams(`?category=${currentMenuItem.id}`)
      )
      : navigate(currentMenuItem.path);
  }
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: 3,
        mb: { xs: 3, lg: 0 },
        alignItems: { lg: "center" },
      }}
    >
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Typography
          key={menuItem.id}
          variant="body2"
          onClick={() => handleNavigate(menuItem)}
          sx={{
            fontWeight: 500,
            fontSize: "0.875rem",
            cursor: "pointer",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {menuItem.label}
        </Typography>
      ))}
    </Box>
  );
}

function HeaderRight() {
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.shoppingCart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  useEffect(() => {
    dispatch(fetchCartItem(user?.id))
  }, [dispatch]);

  return (
    <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: 4 }}>
      {!cartOpen ? (
        <Tooltip title="User Cart">
          <IconButton color="inherit" onClick={() => setCartOpen(true)}>
            <Badge
              badgeContent={cartItems?.items?.length || 0}
              color="error"
              overlap="rectangular"
            >
              <ShoppingCartOutlined fontSize="medium" />
            </Badge>
          </IconButton>

        </Tooltip>
      ) : (
        <IconButton color="inherit" onClick={() => setCartOpen(true)}>
          <ShoppingCartOutlined fontSize="medium" />
        </IconButton>
      )}

      <CartWrapper open={cartOpen} setCartOpen={setCartOpen}
        cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}

      />


      <Tooltip title="User Menu">
        <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
          <Avatar sx={{ bgcolor: "black", color: "white", fontWeight: "bold" }}>
            {user?.userName?.[0]?.toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>

      <MuiMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="body1">Profile</Typography>
          <Typography variant="body2" fontWeight="bold" noWrap>
            {user?.userName}
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={() => navigate("/shop/account")}>
          <Person fontSize="small" sx={{ mr: 1 }} />
          Account
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" sx={{ mr: 1 }} color="error" />
          Logout
        </MenuItem>
      </MuiMenu>
    </Box>
  );
}

export default function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  return (
    <header className="shopping-header">
      <Box
        className="header-content"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Link
          component={RouterLink}
          to="/shop/home"
          underline="none"
          color="inherit"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HouseOutlined sx={{ mr: 1 }} />
          <Typography variant="h6">E-Commerce</Typography>
        </Link>

        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <MenuItems />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isAuthenticated && <HeaderRight />}
          <Box sx={{ display: { xs: "block", lg: "none" } }}>
            <IconButton onClick={toggleDrawer(true)} color="primary">
              <Menu />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Menu
          </Typography>
          <MenuItems />


          <Box sx={{ mt: 2 }}>
            <HeaderRight />
          </Box>

        </Box>
      </Drawer>
    </header>
  );
}
