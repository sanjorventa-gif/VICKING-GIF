import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// IMPORTANT: Keep Home synchronous to optimize Largest Contentful Paint (LCP) and avoid waterfalls
import Home from './pages/public/Home';

// Public Lazy Routes
const Company = lazy(() => import('./pages/public/Company'));
const Message = lazy(() => import('./pages/public/Message'));
const FamilyCompanies = lazy(() => import('./pages/public/FamilyCompanies'));
const Services = lazy(() => import('./pages/services/Services'));
const DynamicFormPage = lazy(() => import('./pages/resources/DynamicFormPage'));
const History = lazy(() => import('./pages/resources/History'));
const Faq = lazy(() => import('./pages/resources/Faq'));
const News = lazy(() => import('./pages/resources/News'));
const NewsDetail = lazy(() => import('./pages/resources/NewsDetail'));
const Contact = lazy(() => import('./pages/public/Contact'));
const ServiceHistory = lazy(() => import('./pages/services/ServiceHistory'));
const ServiceRequestForm = lazy(() => import('./pages/services/ServiceRequestForm'));
const WarrantyForm = lazy(() => import('./pages/services/WarrantyForm'));

// Auth & User Lazy Routes
const UserLogin = lazy(() => import('./pages/auth/UserLogin'));
const Register = lazy(() => import('./pages/auth/Register'));
const RegisterSuccess = lazy(() => import('./pages/auth/RegisterSuccess'));
const UserDashboard = lazy(() => import('./pages/user/UserDashboard'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

// Admin Lazy Routes
const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AddProduct = lazy(() => import('./pages/admin/products/AddProduct'));
const EditProduct = lazy(() => import('./pages/admin/products/EditProduct'));
const Users = lazy(() => import('./pages/admin/users/Users'));
const UserForm = lazy(() => import('./pages/admin/users/UserForm'));
const NewsList = lazy(() => import('./pages/admin/news/NewsList'));
const NewsForm = lazy(() => import('./pages/admin/news/NewsForm'));
const HistoryList = lazy(() => import('./pages/admin/history/HistoryList'));
const HistoryForm = lazy(() => import('./pages/admin/history/HistoryForm'));
const DownloadsList = lazy(() => import('./pages/admin/downloads/DownloadsList'));
const DownloadForm = lazy(() => import('./pages/admin/downloads/DownloadForm'));
const CarouselList = lazy(() => import('./pages/admin/carousel/CarouselList'));
const CarouselForm = lazy(() => import('./pages/admin/carousel/CarouselForm'));
const FaqList = lazy(() => import('./pages/admin/faqs/FaqList'));
const FaqForm = lazy(() => import('./pages/admin/faqs/FaqForm'));
const ServiceRequests = lazy(() => import('./pages/admin/services/ServiceRequests'));
const WarrantyRegistrations = lazy(() => import('./pages/admin/services/WarrantyRegistrations'));
const WarrantyExtensions = lazy(() => import('./pages/admin/services/WarrantyExtensions'));
const AdminNewsletter = lazy(() => import('./pages/admin/newsletter/Newsletter'));

// Utilities & Wrappers (Keep Synchronous)
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserProtectedRoute from './components/auth/UserProtectedRoute';
import RoleProtectedRoute from './components/auth/RoleProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import LoadingScreen from './components/ui/LoadingScreen';
import { useUI } from './context/UIContext';
import NewsletterDrawer from './components/features/NewsletterDrawer';
import { RecaptchaProvider } from './providers/RecaptchaProvider';
import ScrollToTop from './components/utils/ScrollToTop';
import WelcomeModal from './components/features/WelcomeModal';

function App() {
  const { isNewsletterOpen, onCloseNewsletter } = useUI();

  return (
    <>
      <RecaptchaProvider>
        <ScrollToTop />
        <WelcomeModal />

        {/* Suspense boundary wrapped around routes to catch lazy loaded chunk delays */}
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="empresa" element={<Company />} />
              <Route path="mensaje" element={<Message />} />
              <Route path="familias-empresas" element={<FamilyCompanies />} />
              <Route path="historia" element={<History />} />
              <Route path="/forms/:slug" element={<DynamicFormPage />} />
              <Route path="servicios" element={<Services />} />
              <Route path="servicios/tecnico" element={<ServiceRequestForm />} />
              <Route path="servicios/registro" element={<WarrantyForm type="standard" />} />
              <Route path="servicios/garantia" element={<WarrantyForm type="extension" />} />
              <Route path="novedades" element={<News />} />
              <Route path="novedades/:slug" element={<NewsDetail />} />
              <Route path="preguntas-frecuentes" element={<Faq />} />
              <Route path="contacto" element={<Contact />} />
              <Route path="login" element={<UserLogin />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="registro-exitoso" element={<RegisterSuccess />} />
              <Route path="mi-cuenta" element={<UserProtectedRoute><UserDashboard /></UserProtectedRoute>} />
              <Route path="mis-solicitudes" element={<UserProtectedRoute><ServiceHistory /></UserProtectedRoute>} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />

            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                {/* Shared Routes (Admin & Technician) */}
                <Route element={<RoleProtectedRoute allowedRoles={['admin', 'servicio_tecnico']} />}>
                  <Route path="service-requests" element={<ServiceRequests />} />
                  <Route path="warranty-registrations" element={<WarrantyRegistrations />} />
                  <Route path="warranty-extensions" element={<WarrantyExtensions />} />
                </Route>

                {/* Admin Only Routes */}
                <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
                  <Route index element={<Dashboard />} />
                  <Route path="new" element={<AddProduct />} />
                  <Route path="edit/:id" element={<EditProduct />} />
                  <Route path="users" element={<Users />} />
                  <Route path="users/new" element={<UserForm />} />
                  <Route path="users/edit/:id" element={<UserForm />} />
                  <Route path="news" element={<NewsList />} />
                  <Route path="news/new" element={<NewsForm />} />
                  <Route path="news/edit/:id" element={<NewsForm />} />
                  <Route path="history" element={<HistoryList />} />
                  <Route path="history/new" element={<HistoryForm />} />
                  <Route path="history/edit/:id" element={<HistoryForm />} />
                  <Route path="downloads" element={<DownloadsList />} />
                  <Route path="downloads/new" element={<DownloadForm />} />
                  <Route path="downloads/edit/:id" element={<DownloadForm />} />
                  <Route path="carousel" element={<CarouselList />} />
                  <Route path="carousel/new" element={<CarouselForm />} />
                  <Route path="carousel/edit/:id" element={<CarouselForm />} />
                  <Route path="faqs" element={<FaqList />} />
                  <Route path="faqs/new" element={<FaqForm />} />
                  <Route path="faqs/edit/:id" element={<FaqForm />} />
                  <Route path="newsletter" element={<AdminNewsletter />} />
                </Route>
              </Route>
            </Route>

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        <NewsletterDrawer isOpen={isNewsletterOpen} onClose={onCloseNewsletter} />
      </RecaptchaProvider>
    </>
  );
}

export default App;
