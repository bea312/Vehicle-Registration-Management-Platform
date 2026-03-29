import { CarFront, LayoutDashboard, LogIn, LogOut, PlusCircle } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/useAuth'

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link is-active' : 'nav-link'

export const AppLayout = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-badge">VR</div>
          <div>
            <h1>Vehicle Registry</h1>
            <p>Rwanda mobility command center</p>
          </div>
        </div>

        <nav className="nav-links">
          <NavLink className={navClass} to="/">
            <CarFront size={18} />
            <span>Public List</span>
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink className={navClass} to="/dashboard">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink className={navClass} to="/vehicle/new">
                <PlusCircle size={18} />
                <span>Register Vehicle</span>
              </NavLink>
            </>
          ) : null}
        </nav>

        <div className="auth-controls">
          {isAuthenticated ? (
            <button type="button" className="ghost-btn" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <NavLink className="ghost-btn" to="/login">
              <LogIn size={16} />
              Login
            </NavLink>
          )}
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
