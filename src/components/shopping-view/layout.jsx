import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

export default function ShoppingLayout() {
  return (
    <div className="shopping-layout">
        {/* Common Header */}
         <ShoppingHeader/>
        <main className="shopping-main">
            <Outlet />
        </main>
    </div>
  );
}
