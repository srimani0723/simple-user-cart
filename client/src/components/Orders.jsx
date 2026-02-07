import React from "react";
import useFetch from "../hooks/useFetch";

const Orders = () => {
  const { query } = useFetch({
    url: "/api/orders",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });

  const { data, isLoading, error } = query;

  return (
    <div className="flex min-h-[85vh] flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Orders</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul className="flex flex-wrap gap-4">
          {data.data.orders.map((order) => {
            return (
              <li
                key={order._id}
                className="flex flex-col items-start justify-start gap-1 bg-gray-200 p-3 rounded-3xl border shadow-md/10"
              >
                <h1 className="text-md font-semibold bg-yellow-200 p-2 rounded-xl">
                  OrderId: {order._id}
                </h1>
                <h1 className="text-md font-semibold">Items</h1>
                {order.itemsList.map((item) => {
                  return (
                    <p
                      key={`${item.item_id}-${item.quantity}`}
                      className="text-md font-semibold bg-sky-300 p-2 rounded-xl"
                    >
                      Id: {item.item_id} Qty: {item.quantity}
                    </p>
                  );
                })}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Orders;
