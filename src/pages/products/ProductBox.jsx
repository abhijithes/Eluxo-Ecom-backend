export const ProductBox = ({ name, category, price, status }) => {
    return (
        <div className="grid grid-cols-4 text-slate-200 border border-white/10 rounded-xl p-4 hover:bg-white/5 transition">
            <p className="font-medium">{name}</p>
            <p className="text-slate-400">{category}</p>
            <p className="text-indigo-300 font-semibold">₹{price}</p>

            <p
                className={`font-medium ${
                    status === "Active"
                        ? "text-emerald-400"
                        : status === "Inactive"
                        ? "text-red-400"
                        : "text-yellow-400"
                }`}
            >
                {status}
            </p>
        </div>
    );
};
