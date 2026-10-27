
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ServicesPage } from "./pages/ServicesPage";
import { ContactPage } from "./pages/ContactPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { NotFound } from "./pages/NotFound";

import BlogAdminPage from "./pages/BlogAdminPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLoginPage from "./pages/AdminLoginPage";

import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          {/* Public website */}
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
          </Route>

          {/* Admin login - accessible without signing in */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected admin pages */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin/blog" element={<BlogAdminPage />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Analytics />
    </>
  );
}

export default App;
