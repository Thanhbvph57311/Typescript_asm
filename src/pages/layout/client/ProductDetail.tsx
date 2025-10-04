import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ProductDetail {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductDetail = () => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getById = async (id: string) => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Lỗi dữ liệu server:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) getById(id);
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[70vh] text-gray-600 text-lg">
          Đang tải sản phẩm...
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[70vh] text-gray-500 text-lg">
          Không tìm thấy sản phẩm.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto my-16 px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Hình ảnh sản phẩm */}
        <div className="flex-1 flex justify-center">
          <img
            src={`../images/${product.image}`}
            alt={product.name}
            className="w-[350px] h-[350px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-1 bg-white shadow-md rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-red-600 border-b pb-3">
            {product.name}
          </h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            <span className="font-semibold">Giá sản phẩm:</span>{" "}
            <span className="text-red-500 text-2xl font-bold">
              ${product.price}
            </span>
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            <span className="font-semibold">Mô tả:</span> Sản phẩm chính hãng,
            chất lượng cao, bảo hành 12 tháng. Phù hợp cho mọi nhu cầu sử dụng.
          </p>

          <div className="flex items-center gap-6 mt-8">
            <button className="flex-1 py-3 text-red-600 bg-white border border-red-600 hover:bg-red-600 hover:text-white rounded-lg font-semibold transition duration-200">
              Mua ngay
            </button>
            <button className="flex-1 py-3 bg-red-600 text-white hover:bg-white hover:text-red-600 border border-red-600 rounded-lg font-semibold transition duration-200">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
