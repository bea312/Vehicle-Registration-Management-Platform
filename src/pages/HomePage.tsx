import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { LoadingState } from '../components/common/LoadingState'
import { VehicleTable } from '../components/vehicle/VehicleTable'
import { getVehicles, vehicleQueryKeys } from '../services/vehicleService'
import { extractErrorMessages } from '../utils/error'

export const HomePage = () => {
  const [query, setQuery] = useState('')

  const vehiclesQuery = useQuery({
    queryKey: vehicleQueryKeys.lists(),
    queryFn: getVehicles,
  })

  const filteredItems = useMemo(() => {
    const items = vehiclesQuery.data ?? []

    if (!query.trim()) {
      return items
    }

    const term = query.toLowerCase()

    return items.filter((item) => {
      const plate = item.registration?.plateNumber?.toLowerCase() ?? ''
      const model = `${item.vehicle?.manufacture ?? ''} ${item.vehicle?.model ?? ''}`.toLowerCase()
      const owner = item.owner?.ownerName?.toLowerCase() ?? ''
      return plate.includes(term) || model.includes(term) || owner.includes(term)
    })
  }, [vehiclesQuery.data, query])

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Public Registry</p>
          <h2>Registered Vehicles</h2>
          <p>Browse all registered vehicles without authentication.</p>
        </div>
      </header>

      <div className="toolbar">
        <label className="search-box">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by plate, model, or owner"
          />
        </label>
      </div>

      {vehiclesQuery.isLoading ? <LoadingState label="Loading vehicles" /> : null}

      {vehiclesQuery.isError ? (
        <div className="error-panel">
          {extractErrorMessages(vehiclesQuery.error).map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      ) : null}

      {vehiclesQuery.data ? <VehicleTable items={filteredItems} /> : null}
    </section>
  )
}
