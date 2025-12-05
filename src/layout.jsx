import { Outlet } from "react-router-dom";
import { SideBar } from "./components/SideBar.jsx";
export const Layout = () => {
    return (
        <div className="flex">
            <div className="h-screen w-[15%]">
                <SideBar />
            </div>
            <div className="flex-1 bg-linear-to-br from-primary via-secondary to-primary p-20 pr-40 h-screen">
                <Outlet />
            </div>
        </div>
    );
};
