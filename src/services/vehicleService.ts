import { api } from './api'
import type {
  InsuranceInfo,
  OwnerInfo,
  RegistrationInfo,
  VehicleInfo,
  VehiclePayload,
  VehicleRecord,
} from '../types/vehicle'

export const vehicleQueryKeys = {
  all: ['vehicles'] as const,
  lists: () => [...vehicleQueryKeys.all, 'list'] as const,
  detail: (id: string) => [...vehicleQueryKeys.all, 'detail', id] as const,
  info: (id: string) => [...vehicleQueryKeys.all, 'info', id] as const,
  owner: (id: string) => [...vehicleQueryKeys.all, 'owner', id] as const,
  registration: (id: string) => [...vehicleQueryKeys.all, 'registration', id] as const,
  insurance: (id: string) => [...vehicleQueryKeys.all, 'insurance', id] as const,
}

interface ApiVehicleRecord {
  id: string
  manufacture: string
  model: string
  year: number
  vehicleType: VehicleInfo['vehicleType']
  bodyType: string
  color: string
  fuelType: VehicleInfo['fuelType']
  engineCapacity: number
  odometerReading: number
  seatingCapacity: number
  vehiclePurpose: VehicleInfo['purpose']
  vehicleStatus: VehicleInfo['status']
  ownerName: string
  ownerType: OwnerInfo['ownerType']
  nationalId: string
  passportNumber?: string
  companyRegNumber?: string
  address: string
  mobile: string
  email: string
  plateNumber: string
  registrationStatus: RegistrationInfo['status']
  registrationDate: string
  expiryDate: string
  state: string
  plateType: RegistrationInfo['plateType']
  policyNumber: string
  companyName: string
  insuranceExpiryDate: string
  insuranceStatus: InsuranceInfo['status']
  insuranceType: string
  roadworthyCert: string
  customsRef: string
  proofOfOwnership: string
  createdAt?: string
  updatedAt?: string
}

const VEHICLE_ENDPOINT = '/api/vehicle-service/vehicle'

const toIsoDateTime = (value: string) => {
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString()
}

const cleanOptionalValue = (value?: string) => {
  if (!value) return undefined

  const normalizedValue = value.trim()
  if (!normalizedValue) return undefined

  if (normalizedValue === 'NOT-PROVIDED' || normalizedValue === 'NOT-APPLICABLE') {
    return undefined
  }

  return normalizedValue
}

const toVehicleRecord = (record: ApiVehicleRecord): VehicleRecord => ({
  id: record.id,
  createdAt: record.createdAt,
  updatedAt: record.updatedAt,
  vehicle: {
    manufacture: record.manufacture.trim(),
    model: record.model.trim(),
    bodyType: record.bodyType.trim(),
    color: record.color.trim(),
    year: record.year,
    vehicleType: record.vehicleType,
    fuelType: record.fuelType,
    purpose: record.vehiclePurpose,
    status: record.vehicleStatus,
    engineCapacity: record.engineCapacity,
    odometerReading: record.odometerReading,
    seatingCapacity: record.seatingCapacity,
  },
  owner: {
    ownerType: record.ownerType,
    ownerName: record.ownerName.trim(),
    address: record.address.trim(),
    nationalId: record.nationalId.trim(),
    mobileNumber: record.mobile.trim(),
    email: record.email.trim(),
    companyRegistrationNumber: cleanOptionalValue(record.companyRegNumber),
    passportNumber: cleanOptionalValue(record.passportNumber),
  },
  registration: {
    plateType: record.plateType,
    plateNumber: record.plateNumber.trim(),
    registrationDate: record.registrationDate,
    expiryDate: record.expiryDate,
    roadworthyCert: record.roadworthyCert.trim(),
    customsRef: record.customsRef.trim(),
    proofOfOwnership: record.proofOfOwnership.trim(),
    state: record.state.trim(),
    status: record.registrationStatus,
  },
  insurance: {
    policyNumber: record.policyNumber.trim(),
    companyName: record.companyName.trim(),
    insuranceType: record.insuranceType.trim(),
    insuranceExpiryDate: record.insuranceExpiryDate,
    state: record.state.trim(),
    status: record.insuranceStatus,
  },
})

const toApiVehiclePayload = (payload: VehiclePayload) => {
  const ownerType = payload.owner.ownerType
  const companyRegNumber = payload.owner.companyRegistrationNumber?.trim()
  const passportNumber = payload.owner.passportNumber?.trim()

  return {
  manufacture: payload.vehicle.manufacture.trim(),
  model: payload.vehicle.model.trim(),
  year: payload.vehicle.year,
  vehicleType: payload.vehicle.vehicleType,
  bodyType: payload.vehicle.bodyType.trim(),
  color: payload.vehicle.color.trim(),
  fuelType: payload.vehicle.fuelType,
  engineCapacity: payload.vehicle.engineCapacity,
  odometerReading: payload.vehicle.odometerReading,
  seatingCapacity: payload.vehicle.seatingCapacity,
  vehiclePurpose: payload.vehicle.purpose,
  vehicleStatus: payload.vehicle.status,
  ownerName: payload.owner.ownerName.trim(),
  ownerType,
  nationalId: payload.owner.nationalId.trim(),
  passportNumber:
    ownerType === 'INDIVIDUAL'
      ? passportNumber || 'NOT-PROVIDED'
      : passportNumber || 'NOT-APPLICABLE',
  companyRegNumber:
    ownerType === 'COMPANY'
      ? companyRegNumber || 'NOT-PROVIDED'
      : companyRegNumber || 'NOT-APPLICABLE',
  address: payload.owner.address.trim(),
  mobile: payload.owner.mobileNumber.trim(),
  email: payload.owner.email.trim(),
  plateNumber: payload.registration.plateNumber.trim(),
  registrationStatus: payload.registration.status,
  registrationDate: toIsoDateTime(payload.registration.registrationDate),
  expiryDate: toIsoDateTime(payload.registration.expiryDate),
  state: payload.registration.state.trim(),
  plateType: payload.registration.plateType,
  policyNumber: payload.insurance.policyNumber.trim(),
  companyName: payload.insurance.companyName.trim(),
  insuranceExpiryDate: toIsoDateTime(payload.insurance.insuranceExpiryDate),
  insuranceStatus: payload.insurance.status,
  insuranceType: payload.insurance.insuranceType.trim(),
  roadworthyCert: payload.registration.roadworthyCert.trim(),
  customsRef: payload.registration.customsRef.trim(),
  proofOfOwnership: payload.registration.proofOfOwnership.trim(),
}
}

export const getVehicles = async (): Promise<VehicleRecord[]> => {
  const response = await api.get<ApiVehicleRecord[]>(VEHICLE_ENDPOINT)
  return response.data.map(toVehicleRecord)
}

export const getVehicleById = async (id: string): Promise<VehicleRecord> => {
  const response = await api.get<ApiVehicleRecord>(`${VEHICLE_ENDPOINT}/${id}`)
  return toVehicleRecord(response.data)
}

export const getVehicleInfo = async (id: string): Promise<VehicleInfo> => {
  const record = await getVehicleById(id)
  return record.vehicle
}

export const getVehicleOwner = async (id: string): Promise<OwnerInfo> => {
  const record = await getVehicleById(id)
  return record.owner
}

export const getVehicleRegistration = async (id: string): Promise<RegistrationInfo> => {
  const record = await getVehicleById(id)
  return record.registration
}

export const getVehicleInsurance = async (id: string): Promise<InsuranceInfo> => {
  const record = await getVehicleById(id)
  return record.insurance
}

export const createVehicle = async (payload: VehiclePayload): Promise<VehicleRecord> => {
  const response = await api.post<ApiVehicleRecord>(VEHICLE_ENDPOINT, toApiVehiclePayload(payload))
  return toVehicleRecord(response.data)
}

export const updateVehicle = ({
  id,
  payload,
}: {
  id: string
  payload: VehiclePayload
}): Promise<VehicleRecord> =>
  api
    .put<ApiVehicleRecord>(`${VEHICLE_ENDPOINT}/${id}`, toApiVehiclePayload(payload))
    .then((response) => toVehicleRecord(response.data))

export const deleteVehicle = async (id: string): Promise<void> => {
  await api.delete(`${VEHICLE_ENDPOINT}/${id}`)
}
