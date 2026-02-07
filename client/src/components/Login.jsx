import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setPassword, setActivePage } from "../redux/allStates";
import { useNavigate, Navigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const { username, password, activePage } = useSelector(
    (state) => state.allStates,
  );
  const navigate = useNavigate();

  const jwtToken = localStorage.getItem("jwtToken");
  if (jwtToken) {
    dispatch(setActivePage("Shop"));
    return <Navigate to="/shop" />;
  }

  const url = activePage === "Login" ? "/api/users/login" : "/api/users/";

  const { mutation } = useFetch({
    url,
    method: "POST",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    mutation.mutate(
      { username, password },
      {
        onSuccess: (e) => {
          localStorage.setItem("jwtToken", e.data.token);
          localStorage.setItem("username", e.data.username);
          dispatch(setPassword(""));
          toast.success(e.data.message);
          navigate("/shop");
        },
        onError: (e) => {
          toast.error(e.response.data.message);
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh]">
      <form className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-sm/10">
        <h1 className="text-2xl font-bold">
          {activePage === "Login" ? "Login" : "Register"}
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => dispatch(setUsername(e.target.value))}
          className="p-2 border border-gray-400 rounded-lg outline-none focus:outline-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          className="p-2 border border-gray-400 rounded-lg outline-none focus:outline-blue-500"
        />
        <button
          onClick={handleLogin}
          className="p-2 bg-blue-500 text-white rounded-lg outline-none cursor-pointer"
        >
          {activePage === "Login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Login;
