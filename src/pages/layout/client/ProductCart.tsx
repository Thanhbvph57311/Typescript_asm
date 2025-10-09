import { useEffect, useState } from "react";
import { getProducts } from "../../../api/productApi";
import ProductCard from "./ProductCart";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi load sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Đang tải sản phẩm...</p>;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {products.map((item) => (
        <ProductCard key={item.id} />
      ))}
    </div>
  );
};

export default Products;
