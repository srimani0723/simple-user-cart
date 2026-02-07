import React from "react";
import { Box, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePage } from "../redux/allStates";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";

const list = [
  {
    path: "/",
    name: "Home",
  },

  {
    path: "/cart",
    name: "Cart",
  },
  {
    path: "/shop",
    name: "Shop",
  },
  {
    path: "/login",
    name: "Login",
  },
  {
    path: "/orders",
    name: "Orders",
  },
  {
    path: "/register",
    name: "Register",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { activePage } = useSelector((state) => state.allStates);
  const navigate = useNavigate();

  const jwtToken = localStorage.getItem("jwtToken");

  const logoutMutation = useFetch({
    url: "/api/users/logout",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  const handleLogout = () => {
    logoutMutation.mutation.mutate(
      {},
      {
        onSuccess: (e) => {
          toast.success(e.data.message);
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("username");
          dispatch(setActivePage("Home"));
          navigate("/");
        },
        onError: (e) => {
          toast.error(e.response.data.message);
        },
      },
    );
  };

  return (
    <nav
      className={`flex sm:flex-row flex-col sm:items-center items-start justify-between bg-[#00000025] p-4 fixed top-0 w-full z-10`}
    >
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <Box />
          <h1 className="text-lg font-bold">Simple User Cart</h1>
        </div>

        <button
          className="sm:hidden hover:bg-gray-300 border border-transparent hover:border-gray-600 p-2 rounded-lg cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu />
        </button>
      </div>
      <ul
        className={`${isMenuOpen ? "flex" : "hidden"} sm:flex sm:flex-row flex-col sm:items-center items-start gap-1 bg-gray-200 p-1 rounded-xl border border-gray-400 font-semibold sm:mt-0 mt-3 w-full sm:w-auto`}
      >
        {list.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${(jwtToken && item.name === "Login") || (jwtToken && item.name === "Register") || (!jwtToken && item.name === "Orders") || (!jwtToken && item.name === "Cart") || (!jwtToken && item.name === "Shop") ? "hidden" : "block"} `}
          >
            <li
              className={`hover:bg-gray-300 px-4 py-2  cursor-pointer rounded-lg hover:border hover:border-gray-600 ${item.name === activePage ? "bg-gray-300 border border-gray-600 " : "border border-transparent"}`}
              onClick={() => dispatch(setActivePage(item.name))}
            >
              {item.name}
            </li>
          </Link>
        ))}
        <li>
          <button
            className={`hover:bg-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:border hover:border-gray-600 border border-transparent ${jwtToken ? "block" : "hidden"}`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
