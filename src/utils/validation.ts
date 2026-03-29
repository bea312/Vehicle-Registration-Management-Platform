import { z } from 'zod'
import {
  FUEL_TYPES,
  INSURANCE_STATUSES,
  OWNER_TYPES,
  PLATE_TYPES,
  PURPOSE_TYPES,
  REGISTRATION_STATUSES,
  VEHICLE_STATUSES,
  VEHICLE_TYPES,
  type VehiclePayload,
} from '../types/vehicle'

const currentYear = new Date().getFullYear()

const nonEmptyTrimmed = z
  .string()
  .trim()
  .min(1, 'This field is required and cannot be blank spaces')

const numericInteger = (message: string) =>
  z.coerce.number({ message }).int('Must be an integer')

const datetimeString = z
  .string()
  .trim()
  .refine((value) => !Number.isNaN(new Date(value).getTime()), {
    message: 'Must be a valid date-time',
  })

const notInPast = (label: string) =>
  datetimeString.refine((value) => {
    const selected = new Date(value)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selected.getTime() >= today.getTime()
  }, `${label} cannot be in the past`)

export const createVehicleFormSchema = ({
  allowPastExpiryDates = false,
}: {
  allowPastExpiryDates?: boolean
} = {}) =>
  z
  .object({
    manufacture: nonEmptyTrimmed,
    model: nonEmptyTrimmed,
    bodyType: nonEmptyTrimmed,
    color: nonEmptyTrimmed,
    year: numericInteger('Year is required')
      .min(1886, 'Year must be at least 1886')
      .max(currentYear + 1, `Year cannot exceed ${currentYear + 1}`),
    engineCapacity: numericInteger('Engine capacity is required').min(
      1,
      'Engine capacity must be greater than 0',
    ),
    odometerReading: numericInteger('Odometer reading is required').min(
      0,
      'Odometer reading must be 0 or greater',
    ),
    seatingCapacity: numericInteger('Seating capacity is required').min(
      1,
      'Seating capacity must be at least 1',
    ),
    vehicleType: z.enum(VEHICLE_TYPES, {
      error: 'Please select a valid vehicle type',
    }),
    fuelType: z.enum(FUEL_TYPES, {
      error: 'Please select a valid fuel type',
    }),
    purpose: z.enum(PURPOSE_TYPES, {
      error: 'Please select a valid purpose',
    }),
    status: z.enum(VEHICLE_STATUSES, {
      error: 'Please select a valid vehicle status',
    }),

    ownerType: z.enum(OWNER_TYPES, {
      error: 'Please select a valid owner type',
    }),
    ownerName: nonEmptyTrimmed,
    address: nonEmptyTrimmed,
    nationalId: z.string().regex(/^\d{16}$/, 'National ID must be exactly 16 digits'),
    mobileNumber: z.string().regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
    email: z.email('Please enter a valid email address'),
    companyRegistrationNumber: z.string().optional(),
    passportNumber: z
      .string()
      .optional()
      .refine((value) => value === undefined || value.trim() !== '', {
        message: 'Passport number cannot be an empty string',
      }),

    plateType: z.enum(PLATE_TYPES, {
      error: 'Please select a valid plate type',
    }),
    plateNumber: z
      .string()
      .trim()
      .regex(/^(R[A-Z]{2}|GR|CD)\s?\d{3}\s?[A-Z]?$/i, 'Invalid Rwandan plate format'),
    registrationDate: datetimeString,
    expiryDate: allowPastExpiryDates
      ? datetimeString
      : notInPast('Registration expiry date'),
    roadworthyCert: nonEmptyTrimmed,
    customsRef: nonEmptyTrimmed,
    proofOfOwnership: nonEmptyTrimmed,
    registrationState: nonEmptyTrimmed,
    registrationStatus: z.enum(REGISTRATION_STATUSES, {
      error: 'Please select a valid registration status',
    }),

    policyNumber: nonEmptyTrimmed,
    companyName: nonEmptyTrimmed,
    insuranceType: nonEmptyTrimmed,
    insuranceExpiryDate: allowPastExpiryDates
      ? datetimeString
      : notInPast('Insurance expiry date'),
    insuranceState: nonEmptyTrimmed,
    insuranceStatus: z.enum(INSURANCE_STATUSES, {
      error: 'Please select a valid insurance status',
    }),
  })
  .superRefine((values, ctx) => {
    if (
      values.ownerType === 'COMPANY' &&
      (!values.companyRegistrationNumber || values.companyRegistrationNumber.trim().length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['companyRegistrationNumber'],
        message: 'Company registration number is required for COMPANY owners',
      })
    }
  })

export const vehicleFormSchema = createVehicleFormSchema()

export type VehicleFormValues = z.input<typeof vehicleFormSchema>
export type VehicleFormData = z.output<typeof vehicleFormSchema>

export const defaultVehicleFormValues: VehicleFormValues = {
  manufacture: '',
  model: '',
  bodyType: '',
  color: '',
  year: currentYear,
  engineCapacity: 1,
  odometerReading: 0,
  seatingCapacity: 1,
  vehicleType: 'SUV',
  fuelType: 'PETROL',
  purpose: 'PERSONAL',
  status: 'NEW',

  ownerType: 'INDIVIDUAL',
  ownerName: '',
  address: '',
  nationalId: '',
  mobileNumber: '',
  email: '',
  companyRegistrationNumber: '',
  passportNumber: '',

  plateType: 'PRIVATE',
  plateNumber: '',
  registrationDate: new Date().toISOString().slice(0, 16),
  expiryDate: new Date().toISOString().slice(0, 16),
  roadworthyCert: '',
  customsRef: '',
  proofOfOwnership: '',
  registrationState: '',
  registrationStatus: 'ACTIVE',

  policyNumber: '',
  companyName: '',
  insuranceType: '',
  insuranceExpiryDate: new Date().toISOString().slice(0, 16),
  insuranceState: '',
  insuranceStatus: 'ACTIVE',
}

export const mapFormToPayload = (values: VehicleFormData): VehiclePayload => ({
  vehicle: {
    manufacture: values.manufacture.trim(),
    model: values.model.trim(),
    bodyType: values.bodyType.trim(),
    color: values.color.trim(),
    year: values.year,
    vehicleType: values.vehicleType,
    fuelType: values.fuelType,
    purpose: values.purpose,
    status: values.status,
    engineCapacity: values.engineCapacity,
    odometerReading: values.odometerReading,
    seatingCapacity: values.seatingCapacity,
  },
  owner: {
    ownerType: values.ownerType,
    ownerName: values.ownerName.trim(),
    address: values.address.trim(),
    nationalId: values.nationalId,
    mobileNumber: values.mobileNumber,
    email: values.email.trim(),
    companyRegistrationNumber: values.companyRegistrationNumber?.trim() || undefined,
    passportNumber: values.passportNumber?.trim() || undefined,
  },
  registration: {
    plateType: values.plateType,
    plateNumber: values.plateNumber.trim(),
    registrationDate: values.registrationDate,
    expiryDate: values.expiryDate,
    roadworthyCert: values.roadworthyCert.trim(),
    customsRef: values.customsRef.trim(),
    proofOfOwnership: values.proofOfOwnership.trim(),
    state: values.registrationState.trim(),
    status: values.registrationStatus,
  },
  insurance: {
    policyNumber: values.policyNumber.trim(),
    companyName: values.companyName.trim(),
    insuranceType: values.insuranceType.trim(),
    insuranceExpiryDate: values.insuranceExpiryDate,
    state: values.insuranceState.trim(),
    status: values.insuranceStatus,
  },
})

export const mapVehicleToFormValues = (payload: VehiclePayload): VehicleFormValues => ({
  manufacture: payload.vehicle.manufacture,
  model: payload.vehicle.model,
  bodyType: payload.vehicle.bodyType,
  color: payload.vehicle.color,
  year: payload.vehicle.year,
  engineCapacity: payload.vehicle.engineCapacity,
  odometerReading: payload.vehicle.odometerReading,
  seatingCapacity: payload.vehicle.seatingCapacity,
  vehicleType: payload.vehicle.vehicleType,
  fuelType: payload.vehicle.fuelType,
  purpose: payload.vehicle.purpose,
  status: payload.vehicle.status,

  ownerType: payload.owner.ownerType,
  ownerName: payload.owner.ownerName,
  address: payload.owner.address,
  nationalId: payload.owner.nationalId,
  mobileNumber: payload.owner.mobileNumber,
  email: payload.owner.email,
  companyRegistrationNumber: payload.owner.companyRegistrationNumber ?? '',
  passportNumber: payload.owner.passportNumber ?? '',

  plateType: payload.registration.plateType,
  plateNumber: payload.registration.plateNumber,
  registrationDate: payload.registration.registrationDate.slice(0, 16),
  expiryDate: payload.registration.expiryDate.slice(0, 16),
  roadworthyCert: payload.registration.roadworthyCert,
  customsRef: payload.registration.customsRef,
  proofOfOwnership: payload.registration.proofOfOwnership,
  registrationState: payload.registration.state,
  registrationStatus: payload.registration.status,

  policyNumber: payload.insurance.policyNumber,
  companyName: payload.insurance.companyName,
  insuranceType: payload.insurance.insuranceType,
  insuranceExpiryDate: payload.insurance.insuranceExpiryDate.slice(0, 16),
  insuranceState: payload.insurance.state,
  insuranceStatus: payload.insurance.status,
})
