import { useEffect } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";

export const Dashboard = () => {
    useEffect(() => {
        localStorage.getItem("eluxo_token") || (window.location.href = "/login");
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    const user = JSON.parse(localStorage.getItem("eluxo_user")) || "User";
    console.log(user);

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 md:p-10">
            <div className="relative w-full max-w-2xl p-10 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
                {/* Header */}
                <header className="flex items-center gap-3 pb-6 border-b border-white/20">
                    <SparklesIcon className="w-8 h-8 text-indigo-400 drop-shadow-md" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        {getGreeting()}, {user.name}!
                    </h1>
                </header>

                {/* Body */}
                <div className="mt-6 space-y-5">
                    <p className="text-lg text-slate-200 leading-relaxed">
                        Welcome back to your
                        <span className="font-semibold text-white"> Eluxo E-commerce Dashboard</span>. We’ve prepared
                        the latest insights to help you easily monitor your store’s performance.
                    </p>

                    <div className="pt-6 border-t border-dashed border-white/20">
                        <p className="text-sm font-medium text-indigo-300">
                            ✨ Ready to dive in? Check out the{" "}
                            <span className="underline underline-offset-2">Orders</span> tab.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
