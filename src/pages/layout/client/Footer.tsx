const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-15">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo và mô tả */}
          <div>
            <h1 className="text-2xl font-bold text-white">MyShop</h1>
            <p className="mt-3 text-sm text-gray-400">
              Cửa hàng công nghệ mang đến sản phẩm chất lượng và dịch vụ tốt
              nhất.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Liên kết</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-white transition">
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Kết nối</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition">
                Facebook
              </a>
              <a href="#" className="hover:text-white transition">
                Instagram
              </a>
              <a href="#" className="hover:text-white transition">
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
