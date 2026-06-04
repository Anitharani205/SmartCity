import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Login from "./Login";
import SignUp from "./SignUp";


import Dashboard from "./Citizen/Dashboard";
import Services from "./Citizen/Services";
import Alerts from "./Citizen/Alerts";
import BookingHistory from "./Citizen/BookingHistory";
import BookingStatus from "./Citizen/BookingStatus";
import ComplaintHistory from "./Citizen/ComplaintHistory";
import Report from "./Citizen/Report";

import MunicipalDashboard from "./Municipal/MunicipalDashboard";
import Request from "./Municipal/Request";
import DetailPage from "./Municipal/DetailPage";
import ReceiveAssignedTask from "./Municipal/ReceiveAssignedTask";
import Task from "./Municipal/Task";

import AdminDashboard from "./Admin/AdminDashboard";
import Complaints from "./Admin/Complaints";
import ComplaintSummary from "./Admin/ComplaintSummary";
import NewUser from "./Admin/NewUser";
import AdminServices from "./Admin/AdminServices";
import UserManagement from "./Admin/UserManagement";
import CreateUser from "./Admin/NewUser";
import ManagingAlerts from "./Admin/ManagingAlerts";
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
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/booking-status" element={<BookingStatus />} />
        <Route path="/complainthistory" element={<ComplaintHistory />} />
        <Route path="/report" element={<Report />} />

        <Route path="/municipal" element={<MunicipalDashboard />} />
        <Route path="/request" element={<Request />} />
        <Route path="/detail-page" element={<DetailPage />} />
        <Route path="/assigned-task" element={<ReceiveAssignedTask />} />
        <Route path="/task" element={<Task />}/>
   
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/complaintsservices" element={<Complaints />} />
        <Route path="/complaintsummary" element={<ComplaintSummary />} />
        <Route path="/new-user" element={<NewUser />}/>
        <Route path="/adminservices" element={<AdminServices />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/managingalerts" element={<ManagingAlerts />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/auditlogs" element={<AuditLogs />} />
        <Route path="/admin-notification" element={<AdminNotification />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;