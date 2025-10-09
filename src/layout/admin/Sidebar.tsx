import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Home,
  Settings,
  HelpCircle,
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } bg-white shadow-lg border-r min-h-screen flex flex-col justify-between transition-all duration-300`}
    >
      {/* Header */}
      <div className="border-b border-gray-200 p-5 flex items-center justify-between">
        {open && (
          <h1 className="font-bold text-blue-600 text-lg">📊 Quản Trị</h1>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-500 hover:text-blue-500"
        >
          {open ? "⏪" : "⏩"}
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="m-4 text-gray-400 text-sm font-semibold">DANH MỤC</h2>
        <ul className="ml-2 flex flex-col gap-2">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md transition-all duration-200 hover:bg-blue-100 ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700"
                }`
              }
            >
              <LayoutDashboard size={20} />
              {open && "Dashboard"}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/product"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md transition-all duration-200 hover:bg-blue-100 ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700"
                }`
              }
            >
              <Package size={20} />
              {open && "Sản phẩm"}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-100 text-gray-700"
            >
              <Home size={20} />
              {open && "Trang chủ"}
            </NavLink>
          </li>
        </ul>

        <h2 className="m-4 text-gray-400 text-sm font-semibold">HỆ THỐNG</h2>
        <ul className="ml-2 flex flex-col gap-2">
          <li>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md transition-all duration-200 hover:bg-blue-100 ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700"
                }`
              }
            >
              <Settings size={20} />
              {open && "Cài đặt"}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/support"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md transition-all duration-200 hover:bg-blue-100 ${
                  isActive ? "bg-blue-500 text-white" : "text-gray-700"
                }`
              }
            >
              <HelpCircle size={20} />
              {open && "Hỗ trợ"}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer / Logo */}
      <div className="border-t border-gray-200 p-4 text-center">
        {open ? (
          <p className="text-sm text-gray-500">© 2025 TShop Admin</p>
        ) : (
          <p className="text-xs text-gray-400">©</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
