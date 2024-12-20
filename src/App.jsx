import { Auth, Dashboard, MainLayout } from "@/layouts";
import { AdmissionForm } from "@/pages/admission-form";

import { Route, Routes } from "react-router-dom";
import SuccessComponent from "./components/Success/SuccessComponent";
import AuthRequired from "./helpers/AuthRequired";
import Home from "./pages/home/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/admission-form" element={<AdmissionForm />} />
        <Route path="/success" element={<SuccessComponent />} />
      </Route>
      <Route
        path="/dashboard/*"
        element={
          <AuthRequired>
            <Dashboard />
          </AuthRequired>
        }
      />
    </Routes>
  );
}

export default App;
