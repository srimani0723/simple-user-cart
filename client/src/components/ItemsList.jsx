import React from "react";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const ItemsList = () => {
  const { query } = useFetch({
    url: "/api/items",
    method: "GET",
  });

  const { data, isLoading, error } = query;

  const addtocartMutation = useFetch({
    url: "/api/carts",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });

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
    <div className="flex min-h-[85vh] flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">ItemsList</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul className="flex flex-wrap gap-4">
          {data.data.map((item) => {
            const handleAddToCart = (id) => {
              const name = localStorage.getItem("username");
              addtocartMutation.mutation.mutate(
                { item: id, name },
                {
                  onSuccess: (e) => {
                    toast.success(e.data.message);
                    useQueryClient.invalidateQueries({ queryKey: ["carts"] });
                  },
                  onError: (e) => {
                    toast.error(e.response.data.message);
                  },
                },
              );
            };
            return (
              <li
                key={item._id}
                className="flex flex-col items-start justify-start gap-1 bg-gray-200 p-3 rounded-3xl"
              >
                <div
                  className={`flex items-center justify-center ${colors[Math.floor(Math.random() * colors.length)]} h-40 w-40 rounded-2xl`}
                ></div>
                <h1 className="text-md font-semibold">Name: {item.name}</h1>
                <p className="text-md font-semibold">Price: {item.price}</p>
                <button
                  className="bg-sky-500 text-white p-2 rounded-2xl w-full cursor-pointer"
                  onClick={() => handleAddToCart(item._id)}
                >
                  Add to Cart
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ItemsList;
