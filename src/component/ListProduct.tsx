import axios from "axios";
import { useEffect, useState } from "react";

interface Products {
  name: string;
  price: number;
  discountPrice: number;
  images: string;
  description: string;
}

const ListProduct = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/coffee`);
        setProducts(data.data);
      } catch (error) {
        console.log("Lỗi dữ liệu", error);
      }
    })();
  }, []);

  return (
    <div className="mt-10 flex gap-15 items-center justify-center">
      {products.length == 0 ? (
        <span className="w-full pl-153 text-gray-400 font-bold">
          Không có sản phẩm nào trong của hàng
        </span>
      ) : (
        products.map((p, index) => (
          <div
            key={index + 1}
            className="w-60 shadow-lg hover:scale-105 duration-200 ease-in-out cursor-pointer"
          >
            <div>
              <img
                src={`./images/${p.images}`}
                alt={p.name}
                className="h-50 w-full"
              />
            </div>
            <div className="font-bold text-center p-2">{p.name}</div>
            <div className="flex items-center justify-center gap-10">
              <span className="text-red-600 font-bold">{p.price}đ</span>{" "}
              <span className="line-through text-gray-400">
                {p.discountPrice}đ
              </span>
            </div>
            <div className="flex justify-center items-center gap-3 mt-5 mb-5">
              <button className="p-2 bg-yellow-500 cursor-pointer rounded-sm hover:bg-yellow-600 hover:text-white">
                Mua ngay
              </button>
              <button className="pt-2 pr-1 pl-1 pb-2 bg-yellow-500 cursor-pointer rounded-sm hover:bg-yellow-600 hover:text-white">
                Thêm giỏ hàng
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListProduct;
