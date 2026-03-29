import { AxiosError } from 'axios'
import type { ApiValidationError } from '../types/vehicle'

interface ApiErrorPayload {
  message?: string
  errors?: Array<{ message?: string; field?: string }>
}

export const extractErrorMessages = (error: unknown): string[] => {
  const axiosError = error as AxiosError<ApiErrorPayload>
  const responseData = axiosError.response?.data

  if (axiosError.response?.status === 500) {
    return [
      'Server could not save this vehicle. Ensure unique values for plate number, national ID, mobile, email, policy number, roadworthy certificate, and customs reference.',
    ]
  }

  if (responseData?.errors?.length) {
    return responseData.errors
      .map((item) => {
        if (item.field && item.message) {
          return `${item.field}: ${item.message}`
        }

        return item.message ?? 'Validation error'
      })
      .filter(Boolean)
  }

  if (responseData?.message) {
    return [responseData.message]
  }

  if (axiosError.message) {
    return [axiosError.message]
  }

  return ['Something went wrong. Please try again.']
}

export const extractValidationErrors = (error: unknown): ApiValidationError[] => {
  const axiosError = error as AxiosError<ApiErrorPayload>
  const responseData = axiosError.response?.data

  if (!responseData?.errors) {
    return []
  }

  return responseData.errors.map((item) => ({
    field: item.field,
    message: item.message ?? 'Validation error',
  }))
}
