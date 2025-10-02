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
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("name_like") || "";

  useEffect(() => {
    const renderProduct = async () => {
      try {
        let url = `http://localhost:3000/products?_page=1&_limit=8`;
        if (keyword) {
          url = `http://localhost:3000/products?name_like=${keyword}`;
        }
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    renderProduct();
  }, [keyword]);

  return (
    <>
      <h1 className="font-bold text-red-600 p-10 pl-35 underline">
        SẢN PHẨM HOT
      </h1>
      <div className="flex flex-wrap gap-10 items-center justify-center content-center pl-25 pr-25">
        {products.length === 0 && (
          <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp.</p>
        )}
        {products.map((p) => (
          <Link
            to={`/productDetail/${p.id}`}
            key={p.id}
            className="w-70 shadow-sm hover:scale-105 duration-200 ease-in-out"
          >
            <div className="w-full h-65 flex items-center justify-center">
              <img
                className="w-65 h-60 rounded object-cover"
                src={`./images/${p.image}`}
                alt={p.name}
              />
            </div>
            <div className="w-full text-black font-bold text-left p-2 pl-3">
              {p.name}
            </div>
            <div className="text-red-600 text-left pl-3">
              Giá gốc: {p.price}$
            </div>
            <div className="flex justify-around p-2">
              <button className="w-20 h-9 text-center text-red-600 bg-white border cursor-pointer hover:text-white hover:bg-red-600 rounded">
                Buy now
              </button>
              <button className="w-20 h-9 bg-red-500 text-white cursor-pointer hover:text-red-600 hover:border hover:bg-white rounded">
                Add Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ListProduct;
