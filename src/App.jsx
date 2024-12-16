import { Auth, Dashboard, MainLayout } from "@/layouts";
import { AdmissionForm } from "@/pages/admission-form";
import { Home } from "@/pages/home";
import { Route, Routes } from "react-router-dom";
import AuthRequired from "./helpers/AuthRequired";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/admission-form" element={<AdmissionForm />} />
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
