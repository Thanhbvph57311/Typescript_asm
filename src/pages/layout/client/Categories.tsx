import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
  const [active, setActive] = useState("/");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim() !== "") {
      navigate(`/?name_like=${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <nav className="bg-white shadow-md w-full py-4 px-6 flex flex-wrap items-center justify-between border-b border-gray-200">
      <div className="flex items-center gap-2">
        <img
          src="/images/iphone17_pro_max.jpg"
          alt="Logo"
          className="w-10 h-10 object-cover rounded-full"
        />
        <h1 className="text-xl font-bold text-red-600 tracking-wide">
          T<span className="text-gray-800">Shop</span>
        </h1>
      </div>

      <ul className="flex flex-wrap items-center gap-4 md:gap-6 font-medium">
        {[
          { path: "/", label: "Trang chủ" },
          { path: "products", label: "Sản phẩm" },
          { path: "news", label: "Tin tức" },
        ].map((item) => (
          <li
            key={item.path}
            onClick={() => setActive(item.path)}
            className={`px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
              active === item.path
                ? "bg-red-500 text-white shadow-sm"
                : "text-gray-700 hover:bg-red-100 hover:text-red-600"
            }`}
          >
            <Link to={`/${item.path === "/" ? "" : item.path}`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 mt-3 md:mt-0">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-gray-100 rounded-lg px-3 py-2 w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
        />
        <button
          onClick={handleSearch}
          className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
        >
          🔍
        </button>
      </div>
    </nav>
  );
};

export default Categories;
