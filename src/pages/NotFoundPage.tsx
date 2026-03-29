import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <section className="page">
      <p className="eyebrow">404</p>
      <h2>Route not found</h2>
      <p>The page you requested does not exist in this dashboard.</p>
      <Link to="/" className="primary-btn">
        Go to Home
      </Link>
    </section>
  )
}
