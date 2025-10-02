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
    <nav className="bg-red-500 flex w-full items-center gap-5 justify-between">
      <div>
        <ul className="flex w-full items-center p-5 pl-35 gap-5">
          <li
            onClick={() => setActive("/")}
            className={`p-2 rounded cursor-pointer ${
              active === "/" ? "bg-blue-400 text-white" : "bg-blue-100"
            }`}
          >
            <Link className="hover:text-red-600 font-bold" to="/">
              Trang chủ
            </Link>
          </li>
          <li
            onClick={() => setActive("products")}
            className={`p-2 rounded cursor-pointer ${
              active === "products" ? "bg-blue-400 text-white" : "bg-blue-200"
            }`}
          >
            <Link to="/products" className="hover:text-red-600 font-bold">
              Sản phẩm
            </Link>
          </li>
          <li
            onClick={() => setActive("news")}
            className={`p-2 rounded cursor-pointer ${
              active === "news" ? "bg-blue-400 text-white" : "bg-blue-200"
            }`}
          >
            <Link to="/news" className="hover:text-red-600 font-bold">
              Tin tức
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-110 flex items-center gap-2 pr-4">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-white rounded px-2 py-1 w-65 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white cursor-pointer px-3 py-1 rounded hover:bg-blue-600"
        >
          👌🏼
        </button>
      </div>
    </nav>
  );
};

export default Categories;
