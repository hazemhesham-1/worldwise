import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import LoaderFullPage from "./components/LoaderFullPage";
import { AuthProvider } from "./contexts/AuthContext";
import { CitiesProvider } from "./contexts/CitiesContext";

const HomePage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<LoaderFullPage/>}>
            <Routes>
              <Route index element={<HomePage/>}/>
              <Route path="/product" element={<Product/>}/>
              <Route path="/pricing" element={<Pricing/>}/>
              <Route
                path="/app"
                element={<ProtectedRoute><AppLayout/></ProtectedRoute>}
              >
                <Route
                  index
                  element={<Navigate replace to="cities"/>}
                />
                <Route
                  path="cities"
                  element={<CityList/>}
                />
                <Route
                  path="cities/:id"
                  element={<City/>}
                />
                <Route
                  path="countries"
                  element={<CountryList/>}
                />
                <Route path="form" element={<Form/>}/>
              </Route>
              <Route path="/login" element={<Login/>}/>
              <Route path="*" element={<PageNotFound/>}/>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;