
import React, { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import {
  Home,
  FileText,
  Users,
  AlertTriangle,
  BarChart3,
  Search,
  Download,
  Edit
} from "lucide-react";

export default function RequestDetail() {

  const [selectedTech, setSelectedTech] = useState("Robert Fox");

  return (
    <div className="flex h-screen bg-gray-100">

    <AdminSidebar/>
          
      

      <div className="flex-1 flex flex-col">

        

        <div className="bg-white border-b p-4 flex justify-between items-center">

          <div>
            <p className="text-sm text-gray-500">
              Dashboard › Service Requests › Request #SR-1205
            </p>

            <h2 className="text-2xl font-semibold">
              Request #SR-1205
              <span className="ml-3 bg-yellow-100 text-yellow-700 px-3 py-1 text-sm rounded">
                Pending Allocation
              </span>
            </h2>

            <p className="text-gray-500">
              Water Leakage Report - Urgent Priority
            </p>
          </div>

          <div className="flex gap-3">

            <button className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded">

              <Download size={16}/>
              Export Report

            </button>

            <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded">

              <Edit size={16}/>
              Edit Request

            </button>

          </div>

        </div>

      

        <div className="flex gap-6 p-6">

         

          <div className="flex-1 space-y-6">

            

            <Card title="Booking Details">

              <div className="grid grid-cols-2 gap-6 text-sm">

                <Info label="Citizen" value="Johnathan Doe"/>
                <Info label="Service Type" value="Water Leakage Report"/>
                <Info label="Slot" value="09:00 AM - 11:00 AM (Today)"/>
                <Info label="Address" value="123 Maple Avenue, Sector 4, City Center"/>

              </div>

            </Card>

           

            <Card title="Problem Description">

              <p className="text-gray-700 mb-4">
                "There is a major water leak coming from the main pipe near
                the driveway. The water is flooding the sidewalk and causing
                a hazard for pedestrians. It started about 2 hours ago and
                seems to be getting worse."
              </p>

              <img
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740"
                className="rounded-lg"
              />

            </Card>

          </div>

          

          <div className="w-80">

            <Card title="Staff Allocation">

              <p className="text-sm text-gray-500 mb-4">
                Select a qualified technician for this task
              </p>

              <Technician
                name="Robert Fox"
                role="Master Plumber"
                distance="2km away"
                workload="Low Workload"
                recommended
                selectedTech={selectedTech}
                setSelectedTech={setSelectedTech}
              />

              <Technician
                name="Jane Cooper"
                role="Senior Technician"
                distance="5km away"
                workload="High Workload"
                selectedTech={selectedTech}
                setSelectedTech={setSelectedTech}
              />

              <p className="text-blue-600 text-sm mt-4 cursor-pointer">
                View 12 more technicians...
              </p>

            </Card>

          </div>

        </div>

      </div>

    </div>
  );
}



function Menu({icon,name}){

  return(
    <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
      {icon}
      {name}
    </div>
  )
}



function Card({title,children}){

  return(
    <div className="bg-white rounded-xl shadow-sm p-6">

      <h3 className="font-semibold mb-4">
        {title}
      </h3>

      {children}

    </div>
  )
}



function Info({label,value}){

  return(
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}



function Technician({
  name,
  role,
  distance,
  workload,
  recommended,
  selectedTech,
  setSelectedTech
}){

  const active = selectedTech === name;

  return(
    <div
      onClick={()=>setSelectedTech(name)}
      className={`border rounded-lg p-4 mb-4 cursor-pointer ${
        active ? "border-blue-600 bg-blue-50" : ""
      }`}
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="font-medium">{name}</p>

          <p className="text-sm text-gray-500">
            {role}
          </p>

        </div>

        {recommended && (
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
            Recommended
          </span>
        )}

      </div>

      <div className="text-xs text-gray-500 mt-2">
        {distance} • {workload}
      </div>

      <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded">
        Assign {name}
      </button>

    </div>
  )
}