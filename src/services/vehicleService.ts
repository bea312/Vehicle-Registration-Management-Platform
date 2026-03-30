import { api } from './api'
import type {
  InsuranceInfo,
  OwnerInfo,
  RegistrationInfo,
  VehicleInfo,
  VehiclePayload,
  VehicleRecord,
} from '../types/vehicle'
import {
  type ApiVehicleRecord,
  VEHICLE_ENDPOINT,
  toApiVehiclePayload,
  toVehicleRecord,
} from './vehicleMapper'

export const vehicleQueryKeys = {
  all: ['vehicles'] as const,
  lists: () => [...vehicleQueryKeys.all, 'list'] as const,
  detail: (id: string) => [...vehicleQueryKeys.all, 'detail', id] as const,
  info: (id: string) => [...vehicleQueryKeys.all, 'info', id] as const,
  owner: (id: string) => [...vehicleQueryKeys.all, 'owner', id] as const,
  registration: (id: string) => [...vehicleQueryKeys.all, 'registration', id] as const,
  insurance: (id: string) => [...vehicleQueryKeys.all, 'insurance', id] as const,
}

export const getVehicles = async (): Promise<VehicleRecord[]> => {
  const response = await api.get<ApiVehicleRecord[]>(VEHICLE_ENDPOINT)
  return response.data.map(toVehicleRecord)
}

export const getVehicleById = async (id: string): Promise<VehicleRecord> => {
  const response = await api.get<ApiVehicleRecord>(`${VEHICLE_ENDPOINT}/${id}`)
  return toVehicleRecord(response.data)
}

const getVehicleSection = async <K extends keyof Pick<VehicleRecord, 'vehicle' | 'owner' | 'registration' | 'insurance'>>(
  id: string,
  section: K
): Promise<VehicleRecord[K]> => {
  const record = await getVehicleById(id)
  return record[section]
}

export const getVehicleInfo = async (id: string): Promise<VehicleInfo> => {
  return getVehicleSection(id, 'vehicle')
}

export const getVehicleOwner = async (id: string): Promise<OwnerInfo> => {
  return getVehicleSection(id, 'owner')
}

export const getVehicleRegistration = async (id: string): Promise<RegistrationInfo> => {
  return getVehicleSection(id, 'registration')
}

export const getVehicleInsurance = async (id: string): Promise<InsuranceInfo> => {
  return getVehicleSection(id, 'insurance')
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
