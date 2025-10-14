import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Trash2, Edit3, Eye, Search, Filter } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ApiResponse {
  total: number;
  page: number;
  limit: number;
  data: Product[];
}

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get<ApiResponse>(
        "http://localhost:3000/api/products",
        {
          params: {
            search,
            minPrice: minPrice || 0,
            maxPrice: maxPrice || 1000000,
            page: currentPage,
            limit,
          },
        }
      );

      setProducts(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-8">
        Quản lý sản phẩm
      </h1>

      <form
        onSubmit={handleFilter}
        className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md mb-8"
      >
        <div className="flex items-center gap-2">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-60 focus:outline-blue-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="text-gray-500" />
          <input
            type="number"
            placeholder="Giá thấp nhất"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-32 focus:outline-blue-400"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Giá cao nhất"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-32 focus:outline-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 font-semibold"
        >
          Lọc
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border text-left">STT</th>
              <th className="p-3 border text-left">Tên sản phẩm</th>
              <th className="p-3 border text-center">Giá</th>
              <th className="p-3 border text-center w-40">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-5 text-center text-gray-500">
                  Không có sản phẩm nào phù hợp
                </td>
              </tr>
            ) : (
              products.map((p, index) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50 border-t text-gray-700"
                >
                  <td className="p-3">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="p-3 font-semibold">{p.name}</td>
                  <td className="p-3 text-center">
                    {p.price.toLocaleString()}₫
                  </td>
                  <td className="p-3 text-center flex justify-center gap-2">
                    <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                      <Trash2 size={18} />
                    </button>
                    <Link
                      to="#"
                      className="bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500"
                    >
                      <Edit3 size={18} />
                    </Link>
                    <Link
                      to="#"
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            ← Trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-4 py-2 border rounded-lg font-medium ${
                currentPage === page
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
