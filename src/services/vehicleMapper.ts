import type {
  InsuranceInfo,
  OwnerInfo,
  RegistrationInfo,
  VehicleInfo,
  VehiclePayload,
  VehicleRecord,
} from '../types/vehicle'

export interface ApiVehicleRecord {
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

export const VEHICLE_ENDPOINT = '/api/vehicle-service/vehicle'

const trimValue = (value: string) => value.trim()

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

export const toVehicleRecord = (record: ApiVehicleRecord): VehicleRecord => ({
  id: record.id,
  createdAt: record.createdAt,
  updatedAt: record.updatedAt,
  vehicle: {
    manufacture: trimValue(record.manufacture),
    model: trimValue(record.model),
    bodyType: trimValue(record.bodyType),
    color: trimValue(record.color),
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
    ownerName: trimValue(record.ownerName),
    address: trimValue(record.address),
    nationalId: trimValue(record.nationalId),
    mobileNumber: trimValue(record.mobile),
    email: trimValue(record.email),
    companyRegistrationNumber: cleanOptionalValue(record.companyRegNumber),
    passportNumber: cleanOptionalValue(record.passportNumber),
  },
  registration: {
    plateType: record.plateType,
    plateNumber: trimValue(record.plateNumber),
    registrationDate: record.registrationDate,
    expiryDate: record.expiryDate,
    roadworthyCert: trimValue(record.roadworthyCert),
    customsRef: trimValue(record.customsRef),
    proofOfOwnership: trimValue(record.proofOfOwnership),
    state: trimValue(record.state),
    status: record.registrationStatus,
  },
  insurance: {
    policyNumber: trimValue(record.policyNumber),
    companyName: trimValue(record.companyName),
    insuranceType: trimValue(record.insuranceType),
    insuranceExpiryDate: record.insuranceExpiryDate,
    state: trimValue(record.state),
    status: record.insuranceStatus,
  },
})

export const toApiVehiclePayload = (payload: VehiclePayload) => {
  const { vehicle, owner, registration, insurance } = payload
  const ownerType = owner.ownerType
  const companyRegNumber = owner.companyRegistrationNumber?.trim()
  const passportNumber = owner.passportNumber?.trim()
  const ownerDocFallback = (isExpected: boolean, value?: string) =>
    isExpected ? value || 'NOT-PROVIDED' : value || 'NOT-APPLICABLE'

  return {
    manufacture: trimValue(vehicle.manufacture),
    model: trimValue(vehicle.model),
    year: vehicle.year,
    vehicleType: vehicle.vehicleType,
    bodyType: trimValue(vehicle.bodyType),
    color: trimValue(vehicle.color),
    fuelType: vehicle.fuelType,
    engineCapacity: vehicle.engineCapacity,
    odometerReading: vehicle.odometerReading,
    seatingCapacity: vehicle.seatingCapacity,
    vehiclePurpose: vehicle.purpose,
    vehicleStatus: vehicle.status,
    ownerName: trimValue(owner.ownerName),
    ownerType,
    nationalId: trimValue(owner.nationalId),
    passportNumber: ownerDocFallback(ownerType === 'INDIVIDUAL', passportNumber),
    companyRegNumber: ownerDocFallback(ownerType === 'COMPANY', companyRegNumber),
    address: trimValue(owner.address),
    mobile: trimValue(owner.mobileNumber),
    email: trimValue(owner.email),
    plateNumber: trimValue(registration.plateNumber),
    registrationStatus: registration.status,
    registrationDate: toIsoDateTime(registration.registrationDate),
    expiryDate: toIsoDateTime(registration.expiryDate),
    state: trimValue(registration.state),
    plateType: registration.plateType,
    policyNumber: trimValue(insurance.policyNumber),
    companyName: trimValue(insurance.companyName),
    insuranceExpiryDate: toIsoDateTime(insurance.insuranceExpiryDate),
    insuranceStatus: insurance.status,
    insuranceType: trimValue(insurance.insuranceType),
    roadworthyCert: trimValue(registration.roadworthyCert),
    customsRef: trimValue(registration.customsRef),
    proofOfOwnership: trimValue(registration.proofOfOwnership),
  }
}
