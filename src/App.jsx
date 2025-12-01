import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-10">
      <div className="max-w-5xl mx-auto">
        <Dashboard />
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#0f172a',
            borderRadius: '10px',
            boxShadow: '0 6px 18px rgba(2,6,23,0.2)',
            padding: '10px 14px',
          },
        }}
      />
    </div>
  );
}
