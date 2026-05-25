import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          // <ProtectedRoute>
          //   <Home />
          // </ProtectedRoute>
          <Home />
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
