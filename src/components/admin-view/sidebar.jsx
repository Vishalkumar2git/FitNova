import { AutoGraph } from "@mui/icons-material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebarMenuItems } from "../../config";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from "@mui/material";

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <List>
      {AdminSidebarMenuItems.map((menuItem) => (
        <ListItemButton key={menuItem.id} onClick={() => {
           navigate(menuItem.path)
           setOpen ?  setOpen(false) : null;
            }}>
          <ListItemIcon>{menuItem.icon}</ListItemIcon>
          <ListItemText primary={menuItem.label} />
        </ListItemButton>
      ))}
    </List>
  );
}

export default function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }}>
          <Box className="sidebar-header" sx={{ display: "flex", alignItems: "center", gap: 1, p: 2, cursor: "pointer" }} onClick={() => navigate("/admin/dashboard")}>
            <AutoGraph fontSize="large" />
            <Typography variant="h6" fontWeight="bold">Admin Panel</Typography>
          </Box>
          <MenuItems setOpen= {setOpen} />
        </Box>
      </Drawer>

      {/* Sidebar for large screens */}
      <aside className="admin-sidebar">
        <Box className="sidebar-header" sx={{ display: "flex", alignItems: "center", gap: 1, p: 2, cursor: "pointer" }} onClick={() => navigate("/admin/dashboard")}>
          <AutoGraph fontSize="large" />
          <Typography variant="h6" fontWeight="bold">Admin Panel</Typography>
        </Box>
        <MenuItems />
      </aside>
    </Fragment>
  );
}
