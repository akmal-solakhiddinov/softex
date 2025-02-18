import ProtectedRoute from "./components/protectedRoute";
import Home from "./pages/Home";
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
