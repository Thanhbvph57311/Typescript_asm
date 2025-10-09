import { Bell, Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full h-16 bg-white shadow-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <img
          src="/images/iphone17_pro_max.jpg"
          alt="Admin Logo"
          className="w-8 h-8 object-cover rounded"
        />
        <h1 className="font-semibold text-gray-700 text-lg">
          Chào mừng quản trị viên!
        </h1>
      </div>

      <form className="relative w-80 hidden md:block">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
      </form>

      <div className="flex items-center gap-5">
        <button className="relative text-gray-500 hover:text-blue-500 transition">
          <Bell size={22} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg transition">
          <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold">
            A
          </div>
          <span className="hidden md:block font-medium text-gray-600">
            Admin
          </span>
          <User size={18} className="hidden md:block text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
