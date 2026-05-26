import { NavLink } from "react-router-dom";

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
      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/"
          end
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive ? "bg-amber-500 text-white" : "hover:bg-gray-700"
            }`
          }
        >
          📊 Dashboard
        </NavLink>
        <NavLink
          to="/medicines"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive ? "bg-amber-500 text-white" : "hover:bg-gray-700"
            }`
          }
        >
          💊 Dorilar
        </NavLink>
        <NavLink
          to="/pharmacies"
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive ? "bg-amber-500 text-white" : "hover:bg-gray-700"
            }`
          }
        >
          🏥 Dorixonalar
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
