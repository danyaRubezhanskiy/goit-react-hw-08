import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import css from "./App.module.css";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivatRoute";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const Layout = lazy(() => import("./components/Layout/Layout"));

function App() {
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
