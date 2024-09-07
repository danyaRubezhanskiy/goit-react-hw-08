import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <header></header>
      <main>
        <Routes>
          <Route
            path="/"
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
                <RegistrationPage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginPage />
              </Suspense>
            }
          >
            <Route
              path="contacts"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ContactsPage />
                </Suspense>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />{" "}
        </Routes>
      </main>
    </div>
  );
}

export default App;
