import { Link } from 'react-router-dom'
import type { VehicleRecord } from '../../types/vehicle'

interface VehicleTableProps {
  items: VehicleRecord[]
}

export const VehicleTable = ({ items }: VehicleTableProps) => {
  if (items.length === 0) {
    return <p className="empty-state">No vehicles found.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Plate</th>
            <th>Model</th>
            <th>Type</th>
            <th>Year</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.registration?.plateNumber ?? '-'}</td>
              <td>
                {vehicle.vehicle?.manufacture} {vehicle.vehicle?.model}
              </td>
              <td>{vehicle.vehicle?.vehicleType}</td>
              <td>{vehicle.vehicle?.year}</td>
              <td>{vehicle.owner?.ownerName ?? '-'}</td>
              <td>
                <span className="status-pill">{vehicle.registration?.status ?? '-'}</span>
              </td>
              <td>
                <Link className="link-btn" to={`/vehicle/${vehicle.id}`}>
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
