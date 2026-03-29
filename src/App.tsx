import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { DashboardPage } from './pages/DashboardPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { VehicleDetailsPage } from './pages/VehicleDetailsPage'
import { VehicleFormPage } from './pages/VehicleFormPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="vehicle/new"
            element={
              <ProtectedRoute>
                <VehicleFormPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="vehicle/:id"
            element={
              <ProtectedRoute>
                <VehicleDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="vehicle/:id/edit"
            element={
              <ProtectedRoute>
                <VehicleFormPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
