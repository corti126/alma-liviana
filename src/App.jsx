import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout.jsx';
import AdminLayout from './layouts/AdminLayout/AdminLayout.jsx';
import Home from './pages/Home/Home.jsx';
import Products from './pages/Products/Products.jsx';
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';
import Account from './pages/Account/Account.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Faq from './pages/Faq/Faq.jsx';
import Shipping from './pages/Info/Shipping.jsx';
import Returns from './pages/Info/Returns.jsx';
import Terms from './pages/Info/Terms.jsx';
import Privacy from './pages/Info/Privacy.jsx';
import AdminDashboard from './pages/Admin/Dashboard.jsx';
import AdminProducts from './pages/Admin/Products.jsx';
import AdminOrders from './pages/Admin/Orders.jsx';
import AdminProductForm from './pages/Admin/ProductForm.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperar-contrasena" element={<ForgotPassword />} />
        <Route
          path="/mi-cuenta"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/preguntas-frecuentes" element={<Faq />} />
        <Route path="/envios" element={<Shipping />} />
        <Route path="/cambios-y-devoluciones" element={<Returns />} />
        <Route path="/terminos-y-condiciones" element={<Terms />} />
        <Route path="/politica-de-privacidad" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['admin', 'owner']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />
        <Route path="products/:id/edit" element={<AdminProductForm />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  );
}
