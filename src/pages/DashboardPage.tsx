import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CarFront, CircleGauge, Plus, ShieldCheck } from 'lucide-react'
import { LoadingState } from '../components/common/LoadingState'
import { getVehicles, vehicleQueryKeys } from '../services/vehicleService'

export const DashboardPage = () => {
  const vehiclesQuery = useQuery({
    queryKey: vehicleQueryKeys.lists(),
    queryFn: getVehicles,
  })

  const vehicles = vehiclesQuery.data ?? []
  const activeRegistrations = vehicles.filter(
    (vehicle) => vehicle.registration?.status === 'ACTIVE',
  ).length

  const expiringInsurance = vehicles.filter((vehicle) => {
    const expiry = vehicle.insurance?.insuranceExpiryDate
    if (!expiry) {
      return false
    }

    const date = new Date(expiry)
    const now = new Date()
    const inThirtyDays = new Date()
    inThirtyDays.setDate(now.getDate() + 30)

    return date >= now && date <= inThirtyDays
  }).length

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Protected Dashboard</p>
          <h2>Vehicle Operations</h2>
          <p>Monitor and manage registration activity from one command center.</p>
        </div>

        <Link to="/vehicle/new" className="primary-btn">
          <Plus size={16} />
          Register New Vehicle
        </Link>
      </header>

      {vehiclesQuery.isLoading ? <LoadingState label="Loading dashboard metrics" /> : null}

      <div className="stats-grid">
        <article className="stat-card">
          <CarFront size={20} />
          <h3>Total Vehicles</h3>
          <strong>{vehicles.length}</strong>
        </article>
        <article className="stat-card">
          <ShieldCheck size={20} />
          <h3>Active Registrations</h3>
          <strong>{activeRegistrations}</strong>
        </article>
        <article className="stat-card">
          <CircleGauge size={20} />
          <h3>Insurance Expiring in 30 Days</h3>
          <strong>{expiringInsurance}</strong>
        </article>
      </div>
    </section>
  )
}
