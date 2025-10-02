import axios from "axios";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";

interface ProductDetail {
  id: number;
  name: string;
  price: number;
  image: string;
}
const ProductDetail = () => {
  const [product, setProduct] = useState<ProductDetail>({
    id: 1,
    name: "",
    price: 0,
    image: "",
  });

  const { id } = useParams<{ id: string }>();

  const getBYId = async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.error("Lỗi dự liệu server");
    }
  };

  useEffect(() => {
    if (id) getBYId(id);
  }, [id]);

  useEffect(() => {
    console.log("Product detail:", product);
  }, [product]);
  return (
    <>
      <Header />
      <div className="m-10">
        {product && (
          <div className="flex items-center gap-30 justify-center">
            <div className="w-150">
              <img
                className="w-full h-150 object-cover"
                src={`../images/${product?.image}`}
                alt={`${product.name}`}
              />
            </div>
            <div className="w-120 shadow-sm h-150">
              <h2 className="mt-5 font-bold text-2xl text-center">
                Thông tin sản phẩm
              </h2>
              <p className="p-5">
                <span className="font-bold">Tên sản phẩm:</span> {product.name}
              </p>
              <p className="pl-5 pr-5">
                <span className="font-bold">Giá sản phẩm:</span> {product.price}
              </p>
              <p className="p-5">
                <span className="font-bold">Mô tả:</span> sản phẩm chính hãng.
              </p>

              <div className="flex items-center justify-center gap-10 mt-10">
                <button className="w-50 h-9 text-center text-red-600 bg-white border cursor-pointer hover:text-white hover:bg-red-600 rounded">
                  Buy now
                </button>
                <button className="w-50 h-9 bg-red-500 text-white cursor-pointer hover:text-red-600 hover:border hover:bg-white rounded">
                  Add Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
