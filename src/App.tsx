import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/layout/client/Home";
import Products from "./pages/layout/client/Products";
import News from "./pages/layout/client/News";
import ProductDetail from "./pages/layout/client/ProductDetail";
import Layout from "./layout/Layout";
import ColorButton from "./bai6/colorButton";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/news" element={<News />} />
        </Route>
        <Route path="colorButton" element={<ColorButton />} />
      </Routes>
    </>
  );
}

export default App;
