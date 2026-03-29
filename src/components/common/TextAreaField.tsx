import type { TextareaHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: unknown
  registration: UseFormRegisterReturn
}

export const TextAreaField = ({
  label,
  error,
  registration,
  ...props
}: TextAreaFieldProps) => {
  const errorText = typeof error === 'string' ? error : undefined

  return (
    <label className="field">
      <span>{label}</span>
      <textarea
        className={errorText ? 'input is-invalid' : 'input'}
        {...registration}
        {...props}
      />
      {errorText ? <small className="field-error">{errorText}</small> : null}
    </label>
  )
}
