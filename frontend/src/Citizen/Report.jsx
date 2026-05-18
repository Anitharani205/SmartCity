import { useState } from "react";
import Sidebar from "./components/Sidebar";
import {
  FileText,
  MapPin,
  Upload,
  Search,
  HelpCircle,
  AlertTriangle
} from "lucide-react";

function Report() {

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || description.length < 10) {
      alert("Please fill required fields");
      return;
    }

    console.log("Category:", category);
    console.log("Description:", description);
    console.log("File:", file);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-3">
            Form Submitted Successfully 🎉
          </h2>
          <p className="text-gray-500">
            Your grievance has been recorded successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">

      
      <Sidebar />

      <div className="flex flex-col flex-1">

        
        <div className="flex items-center justify-between bg-white border-b px-8 py-6">

          <div>
            <h2 className="text-2xl font-bold">Report an Issue</h2>
            <p className="text-gray-500 text-sm">
              Official Grievance Submission Portal
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Search className="text-gray-500" size={20}/>
            <HelpCircle className="text-gray-500" size={20}/>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
              Emergency Contact
            </button>
          </div>

        </div>

        
        <div className="flex-1 overflow-auto p-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

           
            <div className="lg:col-span-2">

              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl p-5 shadow-sm"
              >

                <div className="flex items-center gap-2 mb-4 font-semibold">
                  <FileText size={18}/>
                  Issue Details
                </div>

                <div className="space-y-4">

                 
                  <div>
                    <label className="text-sm text-gray-600">
                      Grievance Category
                    </label>

                    <select
                      className="w-full border rounded-lg p-3 mt-1"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select a category...</option>
                      <option>Road Damage / Potholes</option>
                      <option>Water Supply Issue</option>
                      <option>Electricity Problem</option>
                      <option>Garbage / Waste Management</option>
                      <option>Street Light Not Working</option>
                      <option>Drainage / Sewage Issue</option>
                      <option>Public Safety</option>
                      <option>Other</option>
                    </select>
                  </div>

                  
                  <div>
                    <label className="text-sm text-gray-600">
                      Detailed Description
                    </label>

                    <textarea
                      rows="4"
                      placeholder="Please describe the issue in detail..."
                      className="w-full border rounded-lg p-3 mt-1"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    <p className="text-xs text-gray-400 mt-1">
                      Minimum 10 characters required
                    </p>
                  </div>

                  
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Urgency Level
                    </p>

                    <div className="flex gap-4">

                      <button
                        type="button"
                        className="flex-1 border rounded-lg p-4 hover:bg-gray-50"
                      >
                        STANDARD
                      </button>

                      <button
                        type="button"
                        className="flex-1 border-2 border-blue-600 text-blue-600 rounded-lg p-4"
                      >
                        HIGH
                      </button>

                      <button
                        type="button"
                        className="flex-1 border rounded-lg p-4 hover:bg-gray-50"
                      >
                        CRITICAL
                      </button>

                    </div>
                  </div>

                </div>

                
                <div className="mt-6 flex justify-end gap-4">

                  <button
                    type="button"
                    className="px-6 py-3 rounded-lg border hover:bg-gray-50"
                  >
                    Save as Draft
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  >
                    Submit Complaint →
                  </button>

                </div>

              </form>

            </div>

           
            <div className="space-y-6">

              
              <div className="bg-white rounded-xl p-5 shadow-sm">

                <div className="flex items-center gap-2 font-semibold mb-4">
                  <MapPin size={18}/>
                  Incident Location
                </div>

                <input
                  placeholder="Enter address..."
                  className="w-full border rounded-lg p-3 mb-4"
                />

                <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                  <MapPin className="text-blue-600" size={32}/>
                </div>

              </div>

              
              <div className="bg-white rounded-xl p-5 shadow-sm">

                <div className="flex items-center gap-2 font-semibold mb-4">
                  <Upload size={18}/>
                  Evidence Upload
                </div>

                <div className="border-2 border-dashed rounded-lg h-40 flex flex-col items-center justify-center text-center">

                  <Upload className="text-gray-400 mb-2"/>

                  <input
                    type="file"
                    accept=".jpg,.png,.jpeg,.pdf"
                    onChange={handleFileChange}
                  />

                  <p className="text-xs text-gray-400 mt-2">
                    Supports JPG, PNG, PDF up to 10MB
                  </p>

                  {file && (
                    <p className="text-green-600 text-sm mt-2">
                      Uploaded: {file.name}
                    </p>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

        
        <div className="px-8 pb-4">

          <div className="text-xs text-gray-500 flex items-start gap-2">
            <AlertTriangle size={16}/>
            Legal Disclaimer: By submitting this grievance, you certify the
            information provided is accurate and truthful.
          </div>

        </div>

      </div>

    </div>
  );
}

export default Report;
