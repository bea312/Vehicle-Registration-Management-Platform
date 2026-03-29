import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { LoadingState } from '../components/common/LoadingState'
import {
  deleteVehicle,
  getVehicleById,
  getVehicleInfo,
  getVehicleInsurance,
  getVehicleOwner,
  getVehicleRegistration,
  vehicleQueryKeys,
} from '../services/vehicleService'
import { extractErrorMessages } from '../utils/error'

type SegmentTab = 'info' | 'owner' | 'registration' | 'insurance'
const tabs: SegmentTab[] = ['info', 'owner', 'registration', 'insurance']

export const VehicleDetailsPage = () => {
  const params = useParams<{ id: string }>()
  const id = params.id ?? ''
  const [activeTab, setActiveTab] = useState<SegmentTab>('info')
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const detailQuery = useQuery({ queryKey: vehicleQueryKeys.detail(id), queryFn: () => getVehicleById(id), enabled: Boolean(id) })
  const infoQuery = useQuery({ queryKey: vehicleQueryKeys.info(id), queryFn: () => getVehicleInfo(id), enabled: Boolean(id) && activeTab === 'info' })
  const ownerQuery = useQuery({ queryKey: vehicleQueryKeys.owner(id), queryFn: () => getVehicleOwner(id), enabled: Boolean(id) && activeTab === 'owner' })
  const registrationQuery = useQuery({ queryKey: vehicleQueryKeys.registration(id), queryFn: () => getVehicleRegistration(id), enabled: Boolean(id) && activeTab === 'registration' })
  const insuranceQuery = useQuery({ queryKey: vehicleQueryKeys.insurance(id), queryFn: () => getVehicleInsurance(id), enabled: Boolean(id) && activeTab === 'insurance' })

  const deleteMutation = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: async () => {
      toast.success('Vehicle deleted')
      await queryClient.invalidateQueries({ queryKey: vehicleQueryKeys.all })
      navigate('/dashboard')
    },
    onError: (error) => extractErrorMessages(error).forEach((message) => toast.error(message)),
  })

  if (detailQuery.isLoading) return <LoadingState label="Loading vehicle details" />
  if (detailQuery.isError) {
    return <section className="page"><h2>Vehicle not available</h2><div className="error-panel">{extractErrorMessages(detailQuery.error).map((message) => <p key={message}>{message}</p>)}</div></section>
  }

  const renderSegment = () => {
    if (activeTab === 'info') {
      if (infoQuery.isLoading) return <LoadingState label="Loading vehicle info" />
      return <dl className="detail-grid"><div><dt>Manufacture</dt><dd>{infoQuery.data?.manufacture}</dd></div><div><dt>Model</dt><dd>{infoQuery.data?.model}</dd></div><div><dt>Body Type</dt><dd>{infoQuery.data?.bodyType}</dd></div><div><dt>Year</dt><dd>{infoQuery.data?.year}</dd></div><div><dt>Fuel Type</dt><dd>{infoQuery.data?.fuelType}</dd></div><div><dt>Purpose</dt><dd>{infoQuery.data?.purpose}</dd></div></dl>
    }
    if (activeTab === 'owner') {
      if (ownerQuery.isLoading) return <LoadingState label="Loading owner segment" />
      return <dl className="detail-grid"><div><dt>Owner Type</dt><dd>{ownerQuery.data?.ownerType}</dd></div><div><dt>Owner Name</dt><dd>{ownerQuery.data?.ownerName}</dd></div><div><dt>National ID</dt><dd>{ownerQuery.data?.nationalId}</dd></div><div><dt>Mobile Number</dt><dd>{ownerQuery.data?.mobileNumber}</dd></div><div><dt>Email</dt><dd>{ownerQuery.data?.email}</dd></div><div><dt>Address</dt><dd>{ownerQuery.data?.address}</dd></div></dl>
    }
    if (activeTab === 'registration') {
      if (registrationQuery.isLoading) return <LoadingState label="Loading registration segment" />
      return <dl className="detail-grid"><div><dt>Plate Type</dt><dd>{registrationQuery.data?.plateType}</dd></div><div><dt>Plate Number</dt><dd>{registrationQuery.data?.plateNumber}</dd></div><div><dt>Registration Date</dt><dd>{registrationQuery.data?.registrationDate}</dd></div><div><dt>Expiry Date</dt><dd>{registrationQuery.data?.expiryDate}</dd></div><div><dt>Status</dt><dd>{registrationQuery.data?.status}</dd></div><div><dt>State</dt><dd>{registrationQuery.data?.state}</dd></div></dl>
    }
    if (insuranceQuery.isLoading) return <LoadingState label="Loading insurance segment" />
    return <dl className="detail-grid"><div><dt>Policy Number</dt><dd>{insuranceQuery.data?.policyNumber}</dd></div><div><dt>Company</dt><dd>{insuranceQuery.data?.companyName}</dd></div><div><dt>Insurance Type</dt><dd>{insuranceQuery.data?.insuranceType}</dd></div><div><dt>Expiry Date</dt><dd>{insuranceQuery.data?.insuranceExpiryDate}</dd></div><div><dt>Status</dt><dd>{insuranceQuery.data?.status}</dd></div><div><dt>State</dt><dd>{insuranceQuery.data?.state}</dd></div></dl>
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Protected Details</p>
          <h2>{detailQuery.data?.vehicle?.manufacture} {detailQuery.data?.vehicle?.model}</h2>
          <p>Plate {detailQuery.data?.registration?.plateNumber}</p>
        </div>
        <div className="action-row">
          <Link className="secondary-btn" to={`/vehicle/${id}/edit`}>Edit</Link>
          <button className="danger-btn" type="button" onClick={() => window.confirm('Delete this vehicle permanently?') && deleteMutation.mutate(id)}>Delete</button>
        </div>
      </header>
      <div className="tabs">{tabs.map((tab) => <button key={tab} type="button" className={activeTab === tab ? 'tab is-active' : 'tab'} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div>
      <section className="panel">{renderSegment()}</section>
    </section>
  )
}
