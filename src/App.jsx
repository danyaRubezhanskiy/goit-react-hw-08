import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import css from "./App.module.css";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivatRoute";
import { useDispatch, useSelector } from "react-redux";
import { apiRefreshUser } from "./redux/auth/operation";
import { selectIsRefreshing } from "./redux/auth/selectors";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const Layout = lazy(() => import("./components/Layout/Layout"));

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  if (isRefreshing) return <p>Pleas,wait</p>;

  return (
    <div className={css.window}>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Layout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <RestrictedRoute
                    component={<RegistrationPage />}
                    redirectTo="/contacts"
                  />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <RestrictedRoute
                    component={<LoginPage />}
                    redirectTo="/contacts"
                  />
                </Suspense>
              }
            />

            <Route
              path="/contacts"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <PrivateRoute
                    component={<ContactsPage />}
                    redirectTo="/login"
                  />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
