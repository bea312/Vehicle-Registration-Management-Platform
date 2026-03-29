import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { LoadingState } from '../components/common/LoadingState'
import { VehicleFormWizard } from '../components/vehicle/VehicleFormWizard'
import {
  createVehicle,
  getVehicleById,
  getVehicles,
  updateVehicle,
  vehicleQueryKeys,
} from '../services/vehicleService'
import { extractErrorMessages } from '../utils/error'
import { mapFormToPayload, mapVehicleToFormValues, type VehicleFormData } from '../utils/validation'

export const VehicleFormPage = () => {
  const params = useParams<{ id: string }>()
  const id = params.id
  const isEditMode = Boolean(id)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [serverErrors, setServerErrors] = useState<string[]>([])

  const vehicleQuery = useQuery({
    queryKey: vehicleQueryKeys.detail(id ?? ''),
    queryFn: () => getVehicleById(id ?? ''),
    enabled: isEditMode,
  })

  const vehiclesListQuery = useQuery({
    queryKey: vehicleQueryKeys.lists(),
    queryFn: getVehicles,
  })

  const createMutation = useMutation({ mutationFn: createVehicle })
  const updateMutation = useMutation({ mutationFn: updateVehicle })

  const initialValues = useMemo(() => {
    if (!vehicleQuery.data) return undefined
    return mapVehicleToFormValues(vehicleQuery.data)
  }, [vehicleQuery.data])

  const handleSubmit = async (values: VehicleFormData) => {
    try {
      const payload = mapFormToPayload(values)
      setServerErrors([])

      const existingVehicles =
        vehiclesListQuery.data ??
        (await queryClient.fetchQuery({
          queryKey: vehicleQueryKeys.lists(),
          queryFn: getVehicles,
        })) ?? []

      const normalizedPlate = payload.registration.plateNumber.trim().toUpperCase()
      const normalizedNationalId = payload.owner.nationalId.trim()
      const normalizedPolicyNumber = payload.insurance.policyNumber.trim().toUpperCase()
      const normalizedMobile = payload.owner.mobileNumber.trim()
      const normalizedEmail = payload.owner.email.trim().toLowerCase()
      const normalizedRoadworthy = payload.registration.roadworthyCert.trim().toUpperCase()
      const normalizedCustomsRef = payload.registration.customsRef.trim().toUpperCase()
      const normalizedOwnership = payload.registration.proofOfOwnership.trim().toUpperCase()

      const duplicates = existingVehicles
        .filter((item) => item.id !== id)
        .flatMap((item) => {
          const issues: string[] = []

          if (item.registration.plateNumber.trim().toUpperCase() === normalizedPlate) {
            issues.push(`Plate number already exists: ${payload.registration.plateNumber}`)
          }

          if (item.owner.nationalId.trim() === normalizedNationalId) {
            issues.push(`National ID already exists: ${payload.owner.nationalId}`)
          }

          if (item.insurance.policyNumber.trim().toUpperCase() === normalizedPolicyNumber) {
            issues.push(`Policy number already exists: ${payload.insurance.policyNumber}`)
          }

          if (item.owner.mobileNumber.trim() === normalizedMobile) {
            issues.push(`Mobile number already exists: ${payload.owner.mobileNumber}`)
          }

          if (item.owner.email.trim().toLowerCase() === normalizedEmail) {
            issues.push(`Email already exists: ${payload.owner.email}`)
          }

          if (item.registration.roadworthyCert.trim().toUpperCase() === normalizedRoadworthy) {
            issues.push(`Roadworthy certificate already exists: ${payload.registration.roadworthyCert}`)
          }

          if (item.registration.customsRef.trim().toUpperCase() === normalizedCustomsRef) {
            issues.push(`Customs reference already exists: ${payload.registration.customsRef}`)
          }

          if (item.registration.proofOfOwnership.trim().toUpperCase() === normalizedOwnership) {
            issues.push(`Proof of ownership already exists: ${payload.registration.proofOfOwnership}`)
          }

          return issues
        })

      if (duplicates.length > 0) {
        const uniqueMessages = Array.from(new Set(duplicates))
        setServerErrors(uniqueMessages)
        uniqueMessages.forEach((message) => toast.error(message))
        return
      }

      if (isEditMode && id) {
        const updated = await updateMutation.mutateAsync({ id, payload })
        toast.success('Vehicle updated successfully')
        await queryClient.invalidateQueries({ queryKey: vehicleQueryKeys.all })
        navigate(`/vehicle/${updated.id}`)
        return
      }

      const created = await createMutation.mutateAsync(payload)
      toast.success('Vehicle registered successfully')
      await queryClient.invalidateQueries({ queryKey: vehicleQueryKeys.all })
      navigate(`/vehicle/${created.id}`)
    } catch (error) {
      const messages = extractErrorMessages(error)
      setServerErrors(messages)
      messages.forEach((message) => toast.error(message))
    }
  }

  if (vehicleQuery.isLoading) {
    return <LoadingState label="Loading vehicle form" />
  }

  return (
    <VehicleFormWizard
      title={isEditMode ? 'Edit Vehicle Record' : 'Register New Vehicle'}
      submitLabel={isEditMode ? 'Save Changes' : 'Create Vehicle'}
      isSubmitting={createMutation.isPending || updateMutation.isPending}
      initialValues={initialValues}
      serverErrors={serverErrors}
      onSubmit={handleSubmit}
    />
  )
}
