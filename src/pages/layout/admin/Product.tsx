import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Trash2, Edit, Eye } from "lucide-react";

interface Products {
  name: string;
  price: number;
  discountPrice: number;
  images: string;
  description: string;
}

const ProductManager = () => {
  const [Products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3000/products`);
      setProducts(data);
    })();
  }, []);
  return (
    <>
      <div className="mt-15 ml-10">
        <div className="mb-10 z-10">
          <form className="flex gap-20">
            <select
              name=""
              id=""
              className="border rounded-lg border-gray-400 p-2 pl-5 pr-5 font-bold cursor-pointer"
            >
              <option value="" hidden>
                Chọn danh mục
              </option>
              <option value="">Danh mục 1</option>
              <option value="">Danh mục 2</option>
              <option value="">Danh mục 3</option>
            </select>
            <select
              name=""
              id=""
              className="border rounded-lg border-gray-400 p-2 pl-5 pr-5 font-bold cursor-pointer"
            >
              <option value="">Chọn giá</option>
              <option value="">20000-50000</option>
              <option value="">50000-100000</option>
            </select>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="shadow-inner bg-gray-200 w-70 rounded-lg placeholder:p-2 focus:outline-none"
            />
            <button className="bg-blue-400 w-20 rounded-lg font-bold text-white cursor-pointer hover:bg-blue-500">
              Lọc
            </button>
          </form>
        </div>
        <div>
          <table className="border rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-gray-300 border">
                  <input type="checkBox" />
                </th>
                <th className="border border-gray-300 p-5">STT</th>
                <th className="border border-gray-300 w-60 text-center">
                  hình ảnh
                </th>
                <th className="border border-gray-300 w-60 text-center">
                  Giá sản phẩm
                </th>
                <th className="border border-gray-300 w-60 text-center">
                  Giá giảm
                </th>
                <th className="border border-gray-300 w-60 text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {Products.length == 0 ? (
                <div>Hiện tại không còn sản phẩm nào!</div>
              ) : (
                Products.map((p, index) => (
                  <tr
                    key={index + 1}
                    className={`border border-gray-300 ${
                      index % 2 == 0
                        ? "bg-white shadow-sm"
                        : "bg-gray-100 shadow-inner"
                    }`}
                  >
                    <td className="border border-gray-300 w-10 text-center">
                      <input type="checkBox" />
                    </td>
                    <td className="border border-gray-300 w-10 text-center">
                      {index + 1}
                    </td>
                    <td className=" border-gray-300 w-80 p-2 flex justify-between">
                      <img
                        src={`/images/${p.images}`}
                        alt={p.name}
                        className="w-20 h-20 rounded"
                      />
                      <span className="mt-7 font-bold text-gray-500">
                        {p.name}
                      </span>
                    </td>
                    <td className="border border-gray-300 w-65 text-center">
                      {p.price}
                    </td>
                    <td className="border border-gray-300 w-65 text-center">
                      {p.discountPrice}
                    </td>
                    <td className="border-gray-300 w-65 text-center">
                      <div className="flex justify-center items-center gap-3">
                        <button
                          title="Xoá"
                          className="p-2 rounded-lg hover:bg-red-100 transition-all"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                        <Link
                          to=""
                          title="Sửa"
                          className="p-2 rounded-lg hover:bg-yellow-100 transition-all"
                        >
                          <Edit className="w-5 h-5 text-yellow-600" />
                        </Link>
                        <Link
                          to=""
                          title="Xem chi tiết"
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
      </div>
    </>
  );
};

export default ProductManager;
