import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

type ProductFormValues = {
  name: string;
  price: number;
  image?: string;
};

const API_URL = "http://localhost:3000/products";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        reset(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      await axios.put(`${API_URL}/${id}`, data);
      alert("Cập nhật thành công!");
      navigate("/admin/product");
    } catch (error) {
      console.error(error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Sửa sản phẩm</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Tên sản phẩm</label>
          <input
            {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Giá</label>
          <input
            type="number"
            {...register("price", { required: true, min: 1 })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">Giá phải lớn hơn 0</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Ảnh (URL)</label>
          <input
            {...register("image")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
