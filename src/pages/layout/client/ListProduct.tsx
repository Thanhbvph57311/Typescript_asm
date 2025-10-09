import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ListProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("name_like") || "";
  const limit = 8;
  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageClick = (page: number) => setCurrentPage(page);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          _page: currentPage.toString(),
          _limit: limit.toString(),
        });
        if (keyword) params.append("name_like", keyword);

        const { data, headers } = await axios.get(
          `http://localhost:3000/products?${params}`
        );
        if (isMounted) {
          setProducts(data);
          setTotalProducts(Number(headers["x-total-count"] || 0));
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [currentPage, keyword]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <h1 className="text-4xl font-extrabold text-center text-red-600 py-10">
        🛍️ DANH SÁCH SẢN PHẨM
      </h1>

      {loading && (
        <p className="text-center text-gray-500 text-lg">
          Đang tải sản phẩm...
        </p>
      )}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          Không tìm thấy sản phẩm phù hợp.
        </p>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div className="relative overflow-hidden ">
              <img
                src={`/images/${p.images}`}
                alt={p.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 z-10"
              />
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                -15%
              </span>
            </div>

            <div className="p-5 flex flex-col justify-between h-52">
              <div>
                <h3 className="text-gray-800 font-semibold text-lg truncate mb-2">
                  {p.name}
                </h3>
                <p className="text-red-600 font-bold text-xl mb-3">
                  ${p.price.toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3 mt-auto">
                <Link
                  to={`/productDetail/${p.id}`}
                  className="w-1/2 py-2 text-center bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Xem chi tiết
                </Link>
                <button className="w-1/2 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition font-medium">
                  Giỏ hàng
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalProducts > 0 && (
        <div className="flex justify-center mt-12 gap-3">
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
                  ? "bg-red-600 text-white border-red-600"
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

export default ListProduct;
