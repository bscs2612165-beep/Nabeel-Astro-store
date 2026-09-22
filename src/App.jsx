import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Games from './pages/Games';
import TopUp from './pages/TopUp';
import QuickBuy from './pages/QuickBuy';
import Prices from './pages/Prices';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Promotions from './pages/Promotions';
import PreOrders from './pages/PreOrders';
import CheckOrder from './pages/CheckOrder';
import Tips from './pages/Tips';
import Updates from './pages/Updates';
import Login from './pages/Login';
import Account from './pages/Account';
import Support from './pages/Support';

function PreventOverflow() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="app">
      <PreventOverflow />
      <ScrollToTop />
      <Header />
      <main className="app__main" id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:gameId/topup" element={<TopUp />} />
          <Route path="/quickbuy" element={<QuickBuy />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/pre-orders" element={<PreOrders />} />
          <Route path="/check-order" element={<CheckOrder />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
      <SearchModal />
    </div>
  );
}