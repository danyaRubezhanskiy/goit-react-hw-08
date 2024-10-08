import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import css from "./App.module.css";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivatRoute";
import { useDispatch, useSelector } from "react-redux";
import { apiRefreshUser } from "./redux/auth/operations";
import { selectIsLoggedIn, selectIsRefreshing } from "./redux/auth/selectors";
import { apiGetAllContacts } from "./redux/contacts/operations";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationForm")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginForm"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const Layout = lazy(() => import("./components/Layout/Layout"));

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(apiGetAllContacts());
    }
  }, [isLoggedIn, dispatch]);

  if (isRefreshing) return <p>Please wait...</p>;
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
