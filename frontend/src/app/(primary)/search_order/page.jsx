'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { getOrder } from "../../../services/orderService";

function SearchOrderPage() {
    const [orderId, setOrderId] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (orderId.trim() === "") {
            toast.error("Please enter a valid order ID.");
        } else {
            try {
                const orders = await getOrder();
                const order = orders.find(order => order._id === orderId);

                if (order) {
                    router.push(`/order?id=${orderId}`);
                } else {
                    toast.error("Order not found.");
                }
            } catch (error) {
                toast.error("Failed to fetch order details.");
            }
        }
    };

    return (
        <div className="bg-white mb-40 h-[600px] w-full flex items-center justify-center searchOrderPage_bg">
            <div className="flex items-center justify-center w-[320px] h-[180px] rounded-lg border-2 border-primary searchOrderPage_bg__box">
                <form onSubmit={handleSubmit} className="flex items-center flex-col">
                    <input
                        type="text"
                        placeholder="Order ID here!"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="border-primary border-2 mb-2 rounded-md px-2 py-3 text-black w-full"
                    />
                    <button className="bg-primary w-full py-2 rounded-md font-bold focus:bg-white focus:border-primary hover:bg-orange-300">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchOrderPage;
