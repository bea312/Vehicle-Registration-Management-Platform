import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/useAuth'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = (location.state as { from?: string } | undefined)?.from ?? '/dashboard'

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const success = login(email.trim(), password)

    if (!success) {
      setError('Invalid credentials')
      return
    }

    setError('')
    navigate(from, { replace: true })
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Secure Access</p>
        <h2>Sign in to Admin Console</h2>
        <p>Use the mock credentials provided for this demo login.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">
            <span>Email</span>
            <input
              className={error ? 'input is-invalid' : 'input'}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="test@gmail.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              className={error ? 'input is-invalid' : 'input'}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password!234"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? <p className="field-error">{error}</p> : null}

          <button className="primary-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  )
}
