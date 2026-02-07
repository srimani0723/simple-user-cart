import React from "react";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const { query } = useFetch({
    url: "/api/carts",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });

  const { data, isLoading, error } = query;

  const { mutation } = useFetch({
    url: "/api/orders",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });

  const emptyBox = () => (
    <div className="flex items-center justify-center flex-col">
      <ShoppingCart className="h-30 w-30" />
      <p className="text-lg font-semibold">Cart is empty</p>
    </div>
  );

  const handleOrder = () => {
    mutation.mutate(
      {},
      {
        onSuccess: (e) => {
          toast.success(e.data.message);
          useQueryClient.invalidateQueries({ queryKey: ["orders", "carts"] });
        },
        onError: (e) => {
          toast.error(e.response.data.message);
        },
      },
    );
  };

  const colors = [
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-orange-400",
    "bg-teal-400",
    "bg-indigo-400",
    "bg-violet-400",
    "bg-cyan-400",
    "bg-lime-400",
    "bg-rose-400",
    "bg-fuchsia-400",
    "bg-emerald-400",
    "bg-sky-400",
    "bg-amber-400",
    "bg-slate-400",
    "bg-stone-400",
    "bg-neutral-400",
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold">Cart</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          {data.data.cartItems.length > 0 ? (
            <ul className="flex flex-wrap gap-4 w-full">
              {data.data.cartItems.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-start gap-4 bg-gray-300 p-3 rounded-3xl border-2 border-gray-400"
                >
                  <div
                    className={`flex items-center justify-center ${colors[Math.floor(Math.random() * colors.length)]} h-30 w-30 rounded-2xl`}
                  ></div>
                  <div className="flex flex-col">
                    <h1 className="text-md font-semibold">
                      Name: {item.item_id.name}
                    </h1>
                    <p className="text-md font-semibold">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-md font-semibold">
                      Price: {item.item_id.price}
                    </p>
                    <p className="text-md font-semibold">
                      Created at: {item.createdAt.slice(0, 10)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            emptyBox()
          )}
          {data.data.cartItems.length > 0 && (
            <div className="flex items-center justify-end p-3 rounded-3xl self-end flex-col">
              <p className="text-lg font-semibold">
                Total Price:{" $"}
                {data.data.cartItems
                  .map((item) => item.item_id.price * item.quantity)
                  .reduce((a, b) => a + b, 0)}
              </p>
              <button
                className="bg-sky-500 text-white p-2 rounded-2xl w-full cursor-pointer"
                onClick={handleOrder}
              >
                Checkout
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
