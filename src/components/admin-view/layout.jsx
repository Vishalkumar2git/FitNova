import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

export default function AdminLayout() {

  const [openSidebar, setopenSidebar] = useState(false);
  return (
    <div className="admin-layout">
      {/* Admin Sidebar */}
      <AdminSidebar open = {openSidebar} setOpen={setopenSidebar} />
      <div className="admin-main">
        {/* Admin Header */}
        <AdminHeader setOpen= {setopenSidebar}/>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
