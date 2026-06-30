import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import AppShell from './components/AppShell'
import Landing from './pages/Landing'
import { Login, Register } from './pages/Auth'
import Dashboard from './pages/Dashboard'
import {
  Tracker, FamilyOS, PropertyOS, Documents,
  BlackTier, AIPage,
  HealthOS, LegalOS, WealthOS, BusinessOS, CelebrationsOS,
} from './pages/Hubs'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<RequireAuth><AppShell /></RequireAuth>}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard"    element={<Dashboard />} />
          <Route path="tracker"      element={<Tracker />} />
          <Route path="family"       element={<FamilyOS />} />
          <Route path="property"     element={<PropertyOS />} />
          <Route path="health"       element={<HealthOS />} />
          <Route path="legal"        element={<LegalOS />} />
          <Route path="wealth"       element={<WealthOS />} />
          <Route path="business"     element={<BusinessOS />} />
          <Route path="celebrations" element={<CelebrationsOS />} />
          <Route path="documents"    element={<Documents />} />
          <Route path="black"        element={<BlackTier />} />
          <Route path="ai"           element={<AIPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
