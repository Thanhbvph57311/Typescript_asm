import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg border-r min-h-screen flex flex-col">
      <div className="p-5 border-b font-bold text-blue-600 text-lg">
        📊 Quản Trị
      </div>
      <ul className="flex-1 flex flex-col p-2 gap-2">
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md hover:bg-blue-100 ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700"
              }`
            }
          >
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/product"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md hover:bg-blue-100 ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700"
              }`
            }
          >
            <Package size={20} /> Sản phẩm
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
