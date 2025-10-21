import { useForm } from "react-hook-form";
import { useEffect } from "react";

export interface ProductFormData {
  id?: number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
}

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  defaultValues?: ProductFormData;
}

const ProductForm = ({ onSubmit, defaultValues }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: defaultValues || {
      name: "",
      price: 0,
      discountPrice: 0,
      image: "",
    },
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        {defaultValues ? "Sửa sản phẩm" : "Thêm sản phẩm"}
      </h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Tên sản phẩm</label>
        <input
          {...register("name", { required: "Vui lòng nhập tên sản phẩm" })}
          className="w-full border p-2 rounded"
          placeholder="Nhập tên sản phẩm"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Giá</label>
        <input
          type="number"
          {...register("price", {
            required: "Vui lòng nhập giá",
            min: { value: 1, message: "Giá phải lớn hơn 0" },
          })}
          className="w-full border p-2 rounded"
          placeholder="Giá sản phẩm"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Giá giảm</label>
        <input
          type="number"
          {...register("discountPrice")}
          className="w-full border p-2 rounded"
          placeholder="Giá sau khi giảm"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Ảnh (tên file)</label>
        <input
          {...register("image", { required: "Vui lòng nhập tên ảnh" })}
          className="w-full border p-2 rounded"
          placeholder="vd: iphone15.jpg"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        {defaultValues ? "Cập nhật" : "Thêm mới"}
      </button>
    </form>
  );
};

export default ProductForm;
