import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Login from "./Login";
import SignUp from "./SignUp";


import Dashboard from "./Citizen/Dashboard";
import Services from "./Citizen/Services";
import CitizenAlerts from "./citizen/CitizenAlerts";
import BookingHistory from "./Citizen/BookingHistory";
import ComplaintHistory from "./Citizen/ComplaintHistory";
import Report from "./Citizen/Report";
import CitizenNotification from "./Citizen/CitizenNotification";
import MunicipalDashboard from "./Municipal/MunicipalDashboard";

import ReceiveAssignedTask from "./Municipal/ReceiveAssignedTask";
import Task from "./Municipal/Task";

import AdminDashboard from "./Admin/AdminDashboard";
import Complaints from "./Admin/Complaints";
import ComplaintSummary from "./Admin/ComplaintSummary";
import NewUser from "./Admin/NewUser";
import AdminServices from "./Admin/AdminServices";
import UserManagement from "./Admin/UserManagement";
import CreateUser from "./Admin/NewUser";

import Alerts from "./admin/Alerts";

import CreateAlert from "./admin/CreateAlert";
import Analytics from "./Admin/Analytics";
import AuditLogs from "./Admin/AuditLogs";
import AdminNotification from "./Admin/AdminNotification";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/citizen" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
   <Route path="/citizen-alerts" element={<CitizenAlerts />} />
        <Route path="/booking-history" element={<BookingHistory />} />
       
        <Route path="/complainthistory" element={<ComplaintHistory />} />
        <Route path="/report" element={<Report />} />
        <Route path="/notification" element={<CitizenNotification />} />

        <Route path="/municipal" element={<MunicipalDashboard />} />
        
        <Route path="/assigned-task" element={<ReceiveAssignedTask />} />
        <Route path="/task" element={<Task />}/>
   
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/complaintsservices" element={<Complaints />} />
        <Route path="/complaintsummary" element={<ComplaintSummary />} />
        <Route path="/new-user" element={<NewUser />}/>
        <Route path="/adminservices" element={<AdminServices />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/create-user" element={<CreateUser />} />
         <Route path="/alerts" element={<Alerts />} />
        <Route path="/create-alert" element={<CreateAlert />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/auditlogs" element={<AuditLogs />} />
        <Route path="/admin-notification" element={<AdminNotification />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;