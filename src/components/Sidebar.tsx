import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-amber-400">Davo Admin</h1>
        <p className="text-gray-400 text-sm">Boshqaruv paneli</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/"
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