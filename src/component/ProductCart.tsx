type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white shadow rounded-lg p-3 hover:scale-105 transition">
      <img
        src={`/images/${product.image}`}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-pink-600 font-bold">${product.price}</p>
    </div>
  );
};

export default ProductCard;
