import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/layout/client/Home";
import Products from "./pages/layout/client/Products";
import News from "./pages/layout/client/News";
import ProductDetail from "./pages/layout/client/ProductDetail";
import Layout from "./layout/client/ClientLayout";
import ColorButton from "./bai6/colorButton";
import LayoutAdmin from "./layout/admin/LayoutAdmin";
import DashboardManager from "./pages/layout/admin/Dashboard";
import ProductManager from "./pages/layout/admin/Product";

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

        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<DashboardManager />} />
          <Route path="product" element={<ProductManager />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
