
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DailyLog from './pages/DailyLog';
import DailyPlan from './pages/DailyPlan';
import WeeklyAnalytics from './pages/WeeklyAnalytics';
import Reminders from './pages/Reminders';
import Memory from './pages/Memory';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/daily-log" element={<DailyLog />} />
                <Route path="/plan" element={<DailyPlan />} />
                <Route path="/analytics" element={<WeeklyAnalytics />} />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/memory" element={<Memory />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
