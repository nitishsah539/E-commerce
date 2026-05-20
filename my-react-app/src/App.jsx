import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Section from "./Section";
import Login from "./Login";
import SignUp from "./SignUp";
import MyCart from "./MyCart";
import Order from "./Order";
import ProductDetails from "./ProductDetails";
import ShopSelect from "./ShopSelect";
import Footer from "./Footer";
import Header from "./Header";
import AdminAddProduct from "./assets/Admin/AdminAddProduct";
import AdminHeader from "./assets/Admin/AdminHeader";
import AdminFooter from "./assets/Admin/AdminFooter";
import AdminHome from "./assets/Admin/AdminHome";
import AdminOrders from "./assets/Admin/AdminOrder";
import ForgotPassword from "./ForgotPassword";
import { getProducts } from "./assets/Admin/api";
import Buy from "./Buy";
import Success from "./Success";
import Notifications from "./assets/Admin/Notifications";
import Profile from "./Profile";

function Layout({ children, role, setSearch }) {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/" ||
    location.pathname === "/forgot-password";

  return (
    <>
      {!hideNavbar && (
        role === "shopkeeper"
          ? <AdminHeader />
          : <Header setSearch={setSearch} />
      )}

      {children}

      {!hideNavbar && (
        role === "shopkeeper"
          ? <AdminFooter />
          : <Footer />
      )}
    </>
  );
}

function AppContent() {

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(localStorage.getItem("role"));

  // products fetch
  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setProducts(data);
    }

    load();
  }, []);

  // cart load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  // cart save
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Layout role={role} setSearch={setSearch}>
      <Routes>

        <Route path="/" element={<SignUp />} />

        <Route
          path="/home"
          element={
            <Section
              search={search}
              cart={cart}
              setCart={setCart}
              products={products}
            />
          }
        />

        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login setRole={setRole} />}/>
        <Route path="/cart" element={<MyCart cart={cart} setCart={setCart} />} />
        <Route path="/order" element={<Order />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/shopSelect" element={<ShopSelect />} />
        <Route path="/notifications" element={<Notifications />}/>

        {/* ADMIN */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/add-product" element={<AdminAddProduct setProducts={setProducts} />}/>
        <Route path="/admin/orders" element={<AdminOrders />} />

        {/* COMMON */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/success" element={<Success />} />

      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}