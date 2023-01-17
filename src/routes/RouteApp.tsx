import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ReactGA from 'react-ga';
import Header from '../components/Header';
import Dashboard from '../layaout/Dashboard';
import DashBoardHome from '../views/DashBoardHome';
import Gestion from '../views/Gestion';
import Home from '../views/Home';
import Login from '../views/Login';
import Product from '../views/Product';
import Profile from '../views/Profile';
import Shopping from '../views/Shopping';
import SignUp from '../views/SignUp';
import { useAppSelector } from '../redux/store/Hooks';
import { IUserState } from '../vite-env';
import Checkout from '../views/Checkout';
import PaymentResponse from '../views/PaymentResponse';

ReactGA.initialize(import.meta.env.VITE_TRACKING_ID);

function RequiredAdmin({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const auth: IUserState = useAppSelector((state) => state.user);

  if (auth.typeUser === 'admin' && auth.accesToken) return children;
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
}

function RequiredAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const auth: IUserState = useAppSelector((state) => state.user);
  if ((auth.typeUser === 'user' || auth.typeUser === 'admin') && auth.accesToken) return children;
  return <Navigate to="/" state={{ from: location }} replace />;
}

function DontVisibleAdmin({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const auth: IUserState = useAppSelector((state) => state.user);

  if (auth.typeUser !== 'admin') return children;
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
}

function DontAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const auth: IUserState = useAppSelector((state) => state.user);

  if (!auth.accesToken) return children;
  return <Navigate to="/" state={{ from: location }} replace />;
}

export default function RouteApp() {
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route
            index
            element={
              <DontVisibleAdmin>
                <Home />
              </DontVisibleAdmin>
            }
          />
          <Route
            path="/login"
            element={
              <DontAuth>
                <Login />
              </DontAuth>
            }
          />
          <Route
            path="/signUp"
            element={
              <DontAuth>
                <SignUp />
              </DontAuth>
            }
          />
          <Route
            path="/product/:id"
            element={
              <DontVisibleAdmin>
                <Product />
              </DontVisibleAdmin>
            }
          />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <RequiredAuth>
              <Dashboard />
            </RequiredAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="home" element={<DashBoardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="gestion"
            element={
              <RequiredAdmin>
                <Gestion />
              </RequiredAdmin>
            }
          />
          <Route path="shopping" element={<Shopping />} />
        </Route>
        <Route path="payment-response" element={<PaymentResponse />} />
      </Routes>
    </Router>
  );
}
