'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SayHello from "../../../components/SayHello"
import { faBagShopping, faBox, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAllProducts } from "../../../services/productService";
import { getOrder } from "../../../services/orderService";
import { getUser } from "../../../services/userService";

const HomeAdmin = () => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        const orderData = await getOrder();
        const userData = await getUser();
        setData(response);
        setOrder(orderData);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

console.log(user.length);

  return (
    <div className="text-black">
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
        <div className="bg-white w-full h-40 shadow-lg flex justify-around items-center p-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100"><FontAwesomeIcon icon={faBagShopping} className="h-4 text-blue-600" /></div>
          <div>
            <div className="font-bold text-2xl">{data.totalProducts}</div>
            <div className="text-sm text-[#64748b]">Total product</div>
          </div>
        </div>
        <div className="bg-white w-full h-40 shadow-lg flex justify-around items-center p-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100"><FontAwesomeIcon icon={faBox} className="h-4 text-green-600" /></div>
          <div>
            <div className="font-bold text-2xl">{order.length}</div>
            <div className="text-sm text-[#64748b]">Total order</div>
          </div>
        </div>
        <div className="bg-white w-full h-40 shadow-lg flex justify-around items-center p-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100"><FontAwesomeIcon icon={faUser} className="h-4 text-purple-600" /></div>
          <div>
            <div className="font-bold text-2xl">{user.length}</div>
            <div className="text-sm text-[#64748b]">Total user</div>
          </div>
        </div>
        <div className="bg-white w-full h-40 shadow-lg flex justify-around items-center p-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100"><FontAwesomeIcon icon={faBagShopping} className="h-4 text-orange-600" /></div>
          <div>
            <div className="font-bold text-2xl">1000</div>
            <div className="text-sm text-[#64748b]">Total Profit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
