import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Trash2, Edit, Eye } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  image: string;
  description: string;
}

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const fetchProducts = async () => {
    try {
      const params: any = {
        page,
        limit,
      };

      if (search.trim() !== "") params.search = search.trim();
      if (minPrice !== undefined && maxPrice !== undefined) {
        params.minPrice = minPrice;
        params.maxPrice = maxPrice;
      }

      const res = await axios.get("http://localhost:3000/products", {
        params,
      });

      const data = res.data.data || res.data;
      const totalCount = res.data.total || data.length || 0;

      setProducts(data);
      setTotal(totalCount);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, minPrice, maxPrice, search]);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">
      <form
        onSubmit={handleFilter}
        className="flex flex-wrap gap-4 items-center mb-6"
      >
        <select
          onChange={(e) => {
            const [min, max] = e.target.value.split("-");
            setMinPrice(min ? Number(min) : undefined);
            setMaxPrice(max ? Number(max) : undefined);
          }}
          className="border rounded-lg border-gray-400 p-2 font-bold cursor-pointer"
        >
          <option value="">Chọn giá</option>
          <option value="0-2000">0 - 2,000</option>
          <option value="2000-5000">2,000 - 5,000</option>
          <option value="5000-10000">5,000 - 10,000</option>
        </select>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          className="shadow-inner bg-gray-200 rounded-lg placeholder:p-2 focus:outline-none p-2 w-64"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-600 transition"
        >
          Lọc
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="border rounded-lg w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-3 text-center">#</th>
              <th className="border border-gray-300 p-3 text-center">
                Hình ảnh
              </th>
              <th className="border border-gray-300 p-3 text-center">
                Tên sản phẩm
              </th>
              <th className="border border-gray-300 p-3 text-center">Giá</th>
              <th className="border border-gray-300 p-3 text-center">
                Giảm giá
              </th>
              <th className="border border-gray-300 p-3 text-center">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-5 text-gray-500">
                  Không có sản phẩm nào.
                </td>
              </tr>
            ) : (
              products.map((p, index) => (
                <tr
                  key={p.id}
                  className={`border border-gray-300 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="border border-gray-300 p-3 text-center">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    <img
                      src={
                        p.image?.startsWith("http")
                          ? p.image
                          : `http://localhost:3000/images/${p.image}`
                      }
                      alt={p.name}
                      className="w-16 h-16 object-cover mx-auto rounded"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/80?text=No+Image")
                      }
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    {p.name}
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    {p.price}
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    {p.discountPrice}
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button className="p-2 rounded-lg hover:bg-red-100 transition-all">
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                      <Link
                        to=""
                        className="p-2 rounded-lg hover:bg-yellow-100 transition-all"
                      >
                        <Edit className="w-5 h-5 text-yellow-600" />
                      </Link>
                      <Link
                        to=""
                        className="p-2 rounded-lg hover:bg-blue-100 transition-all"
                      >
                        <Eye className="w-5 h-5 text-blue-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Trước
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
