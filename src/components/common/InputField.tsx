import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: unknown
  registration: UseFormRegisterReturn
}

export const InputField = ({ label, error, registration, ...props }: InputFieldProps) => {
  const errorText = typeof error === 'string' ? error : undefined

  return (
    <label className="field">
      <span>{label}</span>
      <input className={errorText ? 'input is-invalid' : 'input'} {...registration} {...props} />
      {errorText ? <small className="field-error">{errorText}</small> : null}
    </label>
  )
}
