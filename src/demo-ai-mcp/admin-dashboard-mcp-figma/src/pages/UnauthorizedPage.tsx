import React from "react";
import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f6fa]">
      <div className="text-center max-w-lg p-8">
        <div className="mb-6 flex justify-center">
          <div className="bg-amber-100 p-4 rounded-full">
            <FiAlertTriangle size={48} className="text-amber-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 font-medium"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/login"
            className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-150 font-medium"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
