import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Comments from "./pages/Comments";
import Consultations from "./pages/Consultation";
import Newsletter from "./pages/Newsletter";
import ContentList from "./pages/Content/ContentList";
import CreateContent from "./pages/Content/CreateContent";
import Enrollment from "./pages/Enrollment";

// import FormBuilder from "./pages/admin/FormBuilder";
// import ConsultationForm from "./pages/ConsultationForm";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Admin routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="content" element={<ContentList />} />
          <Route path="content/create" element={<CreateContent />} />
          <Route path="comments" element={<Comments />} />
          <Route path="consultations" element={<Consultations />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="enrollments" element={<Enrollment />} />
          <Route index element={<Dashboard />} />
        </Route>

        {/* <Route path="/consultation-form" element={<ConsultationForm />} />

        <Route path="/admin/forms" element={<FormBuilder />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
