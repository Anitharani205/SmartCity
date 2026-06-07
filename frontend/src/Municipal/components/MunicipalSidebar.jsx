import {
  Home,
  FileText,
  Bell,
  ClipboardList,
  LogOut,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function MunicipalSidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      icon: <Home size={18} />,
      path: "/municipal",
    },
 
    {
      name: "Assigned Tasks",
      icon: <Bell size={18} />,
      path: "/assigned-task",
    },
    {
      name: "Task Workflow",
      icon: <ClipboardList size={18} />,
      path: "/task",
    },
    {
      name:"Notification",
      icon:<ClipboardList size={18}/>,
      path:"/staff-notification",
    },
  ];

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="w-64 bg-white border-r h-screen fixed flex flex-col justify-between">

      <div>

      
        <div className="p-6 border-b">

          <h1 className="text-2xl font-bold text-blue-600">
            CityZen
          </h1>

          <p className="text-sm text-gray-500">
            Municipal Staff Panel
          </p>

        </div>

       
        <div className="mt-4 px-3">

          {menu.map((item) => (

            <Link
              key={item.name}
              to={item.path}
            >

              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all
                ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >

                {item.icon}

                {item.name}

              </div>

            </Link>

          ))}

        </div>

      </div>

    
      <div className="p-4 border-t">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-10 h-10 bg-orange-300 rounded-full flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <p className="font-semibold text-sm">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Municipal Staff
            </p>
          </div>

        </div>

        <button
          onClick={logout}
          className="w-full bg-red-50 text-red-600 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-100"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  );
}

export default MunicipalSidebar;