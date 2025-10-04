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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `http://localhost:3000/products?_page=${currentPage}&_limit=${limit}`;
        if (keyword) {
          url = `http://localhost:3000/products?_page=${currentPage}&_limit=${limit}&name_like=${keyword}`;
        }

        const { data, headers } = await axios.get(url);
        setProducts(data);
        setTotalProducts(Number(headers["x-total-count"] || 0));
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, keyword]);

  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageClick = (page: number) => setCurrentPage(page);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <>
      <h1 className="font-bold text-red-600 text-3xl text-center py-10 underline">
        🔥 SẢN PHẨM HOT 🔥
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {loading && (
          <p className="col-span-full text-center text-gray-500">
            Đang tải sản phẩm...
          </p>
        )}
        {!loading && products.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            Không tìm thấy sản phẩm phù hợp.
          </p>
        )}

        {products.map((p) => (
          <Link
            to={`/productDetail/${p.id}`}
            key={p.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
          >
            {/* Ảnh sản phẩm */}
            <div className="relative group w-full aspect-square overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src={`./images/${p.image}`}
                alt={p.name}
              />
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                HOT
              </span>
            </div>

            {/* Nội dung */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                  {p.name}
                </h3>
                <p className="text-red-600 font-bold text-xl mt-2">
                  ${p.price}
                </p>
              </div>

              <div className="flex justify-between mt-4">
                <button className="w-[48%] py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition font-medium">
                  Mua ngay
                </button>
                <button className="w-[48%] py-2 bg-red-500 text-white rounded-lg hover:bg-white hover:text-red-500 border border-red-500 transition font-medium">
                  Giỏ hàng
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalProducts > 0 && (
        <div className="flex justify-center mt-10 gap-2">
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
              className={`px-4 py-2 border rounded-lg ${
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
    </>
  );
};

export default ListProduct;
