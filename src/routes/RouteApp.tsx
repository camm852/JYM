import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';
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
import NotFoundPage from '../views/NotFoundPage';
import UserShopping from '../views/UserShopping';
import ProductsByType from '../views/ProductsByType';
import ProductsByGender from '../views/ProductsByGender';
import ProductsByCategories from '../views/ProductsByCategories';

ReactGA.initialize(import.meta.env.VITE_TRACKING_ID);

function RequiredAdmin({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const auth: IUserState = useAppSelector((state) => state.user);

  if (auth.rol === 'admin' && auth.accessToken) return children;
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
}

function RequiredAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const auth: IUserState = useAppSelector((state) => state.user);
  if ((auth.rol === 'user' || auth.rol === 'admin') && auth.accessToken) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}

function DontVisibleAdmin({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const auth: IUserState = useAppSelector((state) => state.user);

  if (auth.rol !== 'admin') return children;
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
}

function DontAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const auth: IUserState = useAppSelector((state) => state.user);

  if (!auth.accessToken) return children;
  return <Navigate to="/" state={{ from: location }} replace />;
}

export default function RouteApp() {
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
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
          <Route
            path="/checkout"
            element={
              <RequiredAuth>
                <DontVisibleAdmin>
                  <Checkout />
                </DontVisibleAdmin>
              </RequiredAuth>
            }
          />
          <Route
            path="/category/:category/:page"
            element={<ProductsByCategories />}
          />
          <Route path="/type/:type/:page" element={<ProductsByType />} />
          <Route path="/gender/:gender/:page" element={<ProductsByGender />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <RequiredAuth>
              <Dashboard />
            </RequiredAuth>
          }
        >
          {/* <Route index element={<Dashboard />} /> */}
          <Route index path="home" element={<DashBoardHome />} />
          <Route
            path="profile"
            element={
              <DontVisibleAdmin>
                <Profile />
              </DontVisibleAdmin>
            }
          />
          <Route path="gestion">
            <Route
              path="products/:page"
              element={
                <RequiredAdmin>
                  <Gestion />
                </RequiredAdmin>
              }
            />
          </Route>
          <Route
            path="shopping/:page"
            element={
              <RequiredAdmin>
                <Shopping />
              </RequiredAdmin>
            }
          />
          <Route
            path="user-shopping/:page"
            element={
              <DontVisibleAdmin>
                <UserShopping />
              </DontVisibleAdmin>
            }
          />
        </Route>
        <Route
          path="/payment-response"
          element={
            <DontVisibleAdmin>
              <PaymentResponse />
            </DontVisibleAdmin>
          }
        />
      </Routes>
    </Router>
  );
}
