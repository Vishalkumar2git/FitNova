import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="layout-container">
            <div className="sidebar">
                <div className="sidebar-content">
                    <h1>Welcome to Fashtionnava</h1>
                </div>
            </div>
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
