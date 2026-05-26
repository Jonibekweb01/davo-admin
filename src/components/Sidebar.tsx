import { NavLink } from "react-router-dom";
import { LayoutDashboard, Pill, Hospital } from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-amber-400">Davo Admin</h1>
          <p className="text-gray-400 text-sm">Boshqaruv paneli</p>
        </div>
        {/* Faqat mobilda ko'rinadigan yopish tugmasi */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition"
            aria-label="Yopish"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Dashboard Link */}
        <NavLink
          to="/"
          end
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
              isActive
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <LayoutDashboard
                className={`w-5 h-5 transition ${isActive ? "text-white" : "text-gray-400"}`}
              />
              <span>Dashboard</span>
            </>
          )}
        </NavLink>

        {/* Dorilar Link */}
        <NavLink
          to="/medicines"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
              isActive
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Pill
                className={`w-5 h-5 transition ${isActive ? "text-white" : "text-gray-400"}`}
              />
              <span>Dorilar</span>
            </>
          )}
        </NavLink>

        {/* Dorixonalar Link */}
        <NavLink
          to="/pharmacies"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
              isActive
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Hospital
                className={`w-5 h-5 transition ${isActive ? "text-white" : "text-gray-400"}`}
              />
              <span>Dorixonalar</span>
            </>
          )}
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
