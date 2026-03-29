import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { LoadingState } from '../components/common/LoadingState'
import { VehicleFormWizard } from '../components/vehicle/VehicleFormWizard'
import { createVehicle, getVehicleById, updateVehicle, vehicleQueryKeys } from '../services/vehicleService'
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
