const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-pink-50 to-white text-gray-700 py-10 mt-16 border-t border-pink-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo và mô tả */}
          <div>
            <h1 className="text-3xl font-bold text-pink-600">TShop</h1>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              “Nhìn là thích – Dùng là nghiện – Giá thì yêu thương.” TShop mang
              đến trải nghiệm mua sắm dễ chịu, phong cách và đáng tin cậy.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-lg font-semibold text-pink-600 mb-3 border-b-2 border-pink-300 pb-1 inline-block">
              Liên kết
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-pink-500 transition">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-pink-500 transition">
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-pink-500 transition">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-pink-500 transition">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-lg font-semibold text-pink-600 mb-3 border-b-2 border-pink-300 pb-1 inline-block">
              Kết nối
            </h2>
            <div className="flex space-x-4 mt-3">
              <a
                href="#"
                className="bg-pink-500 hover:bg-pink-400 p-2 rounded-full text-white transition transform hover:scale-105 shadow-md"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="bg-pink-400 hover:bg-pink-300 p-2 rounded-full text-white transition transform hover:scale-105 shadow-md"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="bg-pink-300 hover:bg-pink-200 p-2 rounded-full text-white transition transform hover:scale-105 shadow-md"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-pink-200 mt-8 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="text-pink-600 font-semibold">TShop</span>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
