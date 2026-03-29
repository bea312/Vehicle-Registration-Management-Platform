import type { SelectHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface Option {
  value: string
  label: string
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Option[]
  error?: unknown
  registration: UseFormRegisterReturn
}

export const SelectField = ({
  label,
  options,
  error,
  registration,
  ...props
}: SelectFieldProps) => {
  const errorText = typeof error === 'string' ? error : undefined

  return (
    <label className="field">
      <span>{label}</span>
      <select className={errorText ? 'input is-invalid' : 'input'} {...registration} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorText ? <small className="field-error">{errorText}</small> : null}
    </label>
  )
}
