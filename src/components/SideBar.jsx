import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export const SideBar = () => {
    const location = useLocation().pathname;
    return (
        <div
            className={`w-full h-full sidebar bg-linear-to-tr from-slate-900 via-slate-800 to-slate-900  text-black flex flex-col pt-10 gap-3`}
        >
            <div className="relative heading text-3xl font-semibold w-[60%] mx-auto mb-10 rounded-4xl flex justify-center items-center">
                <div className="absolute inset-0 rounded-4xl bg-linear-to-r from-blue-500/50 via-slate-100/40 to-blue-500/50 blur-xl opacity-70"></div>
                <Link to={"/dashboard"} className="relative z-10 flex justify-center items-center p-2">
                    <img src="/eluxo-logo.png" alt="" className="bg-blend-multiply" />{" "}
                </Link>
            </div>

            <div
                className={`w-[80%] p-3 text-left text-text text-xl font-semibold hover:shadow-lg shadow-slate-700  rounded-xl hover:ml-8 transition-all duration-200 px-4 ml-4 ${
                    location === "/products" ? "bg-slate-700 text-white" : ""
                }`}
            >
                <Link className="" to={"/products"}>
                    {" "}
                    Products
                </Link>
            </div>
            <div
                className={`w-[80%] p-3 text-left text-text text-xl font-semibold hover:shadow-lg shadow-slate-700  rounded-xl hover:ml-8 transition-all duration-200 px-4 ml-4 ${
                    location === "/orders" ? "bg-slate-700 text-white" : ""
                }`}
            >
                <Link className="" to={"/orders"}>
                    {" "}
                    Orders
                </Link>
            </div>
            <div
                className={`w-[80%] p-3 text-left text-text text-xl font-semibold hover:shadow-lg shadow-slate-700  rounded-xl hover:ml-8 transition-all duration-200 px-4 ml-4 ${
                    location === "/reviews" ? "bg-slate-700 text-white" : ""
                }`}
            >
                <Link className="" to={"/reviews"}>
                    Costomer Reviews
                </Link>
            </div>
        </div>
    );
};
