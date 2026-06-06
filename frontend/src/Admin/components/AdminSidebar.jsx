import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  Bell,
  AlertTriangle,
  Wrench,
  Calendar,
  History,
  LogOut
} from "lucide-react";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menu = [
    { name: "Home", icon: <Home size={18} />, path: "/admin" },
    { name: "Complaints", icon: <FileText size={18} />, path: "/complaintsservices" },
    { name: "Services", icon: <Bell size={18} />, path: "/adminservices" },
    { name: "UserManagement", icon: <AlertTriangle size={18} />, path: "/usermanagement" },
    { name: "Alerts", icon: <Wrench size={18} />, path: "/alerts" },
    { name: "Analytics", icon: <Calendar size={18} />, path: "/analytics" },
    { name: "AuditLogs", icon: <History size={18} />, path: "/auditlogs" },
    { name: "AdminNotification", icon: <History size={18} />, path: "/admin-notification" }
  ];

  return (
    <div className="w-64 bg-white border-r flex flex-col justify-between h-screen">
      <div>
        <div className="flex items-center gap-3 p-6">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Home size={20} />
          </div>

          <div>
            <h1 className="font-bold text-lg">CityZen</h1>
            <p className="text-sm text-gray-500">Citizen Portal</p>
          </div>
        </div>

        <nav className="mt-6">
          {menu.map((item) => (
            <Link key={item.name} to={item.path}>
              <div
                className={`flex items-center gap-3 px-6 py-3 cursor-pointer ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <p className="font-medium text-sm">Alex Johnson</p>
            <p className="text-xs text-gray-500">Resident ID: 48291</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;