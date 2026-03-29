export const VEHICLE_TYPES = [
  'ELECTRIC',
  'SUV',
  'TRUCK',
  'MOTORCYCLE',
  'BUS',
  'VAN',
  'PICKUP',
  'OTHER',
] as const

export const FUEL_TYPES = [
  'PETROL',
  'DIESEL',
  'ELECTRIC',
  'HYBRID',
  'GAS',
  'OTHER',
] as const

export const PURPOSE_TYPES = [
  'PERSONAL',
  'COMMERCIAL',
  'TAXI',
  'GOVERNMENT',
] as const

export const VEHICLE_STATUSES = ['NEW', 'USED', 'REBUILT'] as const

export const OWNER_TYPES = ['INDIVIDUAL', 'COMPANY', 'NGO', 'GOVERNMENT'] as const

export const PLATE_TYPES = [
  'PRIVATE',
  'COMMERCIAL',
  'GOVERNMENT',
  'DIPLOMATIC',
  'PERSONALIZED',
] as const

export const REGISTRATION_STATUSES = [
  'ACTIVE',
  'SUSPENDED',
  'EXPIRED',
  'PENDING',
] as const

export const INSURANCE_STATUSES = ['ACTIVE', 'SUSPENDED', 'EXPIRED'] as const

export type VehicleType = (typeof VEHICLE_TYPES)[number]
export type FuelType = (typeof FUEL_TYPES)[number]
export type PurposeType = (typeof PURPOSE_TYPES)[number]
export type VehicleStatus = (typeof VEHICLE_STATUSES)[number]
export type OwnerType = (typeof OWNER_TYPES)[number]
export type PlateType = (typeof PLATE_TYPES)[number]
export type RegistrationStatus = (typeof REGISTRATION_STATUSES)[number]
export type InsuranceStatus = (typeof INSURANCE_STATUSES)[number]

export interface OwnerInfo {
  ownerType: OwnerType
  ownerName: string
  address: string
  nationalId: string
  mobileNumber: string
  email: string
  companyRegistrationNumber?: string
  passportNumber?: string
}

export interface RegistrationInfo {
  plateType: PlateType
  plateNumber: string
  registrationDate: string
  expiryDate: string
  roadworthyCert: string
  customsRef: string
  proofOfOwnership: string
  state: string
  status: RegistrationStatus
}

export interface InsuranceInfo {
  policyNumber: string
  companyName: string
  insuranceType: string
  insuranceExpiryDate: string
  state: string
  status: InsuranceStatus
}

export interface VehicleInfo {
  manufacture: string
  model: string
  bodyType: string
  color: string
  year: number
  vehicleType: VehicleType
  fuelType: FuelType
  purpose: PurposeType
  status: VehicleStatus
  engineCapacity: number
  odometerReading: number
  seatingCapacity: number
}

export interface VehiclePayload {
  vehicle: VehicleInfo
  owner: OwnerInfo
  registration: RegistrationInfo
  insurance: InsuranceInfo
}

export interface VehicleRecord extends VehiclePayload {
  id: number | string
  createdAt?: string
  updatedAt?: string
}

export interface ApiValidationError {
  field?: string
  message: string
}
