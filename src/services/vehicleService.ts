import { mockStore } from './mockStore'
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

export const getVehicles = (): Promise<VehicleRecord[]> => mockStore.getAll()

export const getVehicleById = (id: string): Promise<VehicleRecord> => mockStore.getById(id)

export const getVehicleInfo = async (id: string): Promise<VehicleInfo> => {
  const record = await mockStore.getById(id)
  return record.vehicle
}

export const getVehicleOwner = async (id: string): Promise<OwnerInfo> => {
  const record = await mockStore.getById(id)
  return record.owner
}

export const getVehicleRegistration = async (id: string): Promise<RegistrationInfo> => {
  const record = await mockStore.getById(id)
  return record.registration
}

export const getVehicleInsurance = async (id: string): Promise<InsuranceInfo> => {
  const record = await mockStore.getById(id)
  return record.insurance
}

export const createVehicle = (payload: VehiclePayload): Promise<VehicleRecord> =>
  mockStore.create(payload)

export const updateVehicle = ({
  id,
  payload,
}: {
  id: string
  payload: VehiclePayload
}): Promise<VehicleRecord> => mockStore.update(id, payload)

export const deleteVehicle = (id: string): Promise<void> => mockStore.delete(id)
