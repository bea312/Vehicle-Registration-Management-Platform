import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '../common/InputField'
import { SelectField } from '../common/SelectField'
import { TextAreaField } from '../common/TextAreaField'
import {
  FUEL_TYPES,
  INSURANCE_STATUSES,
  OWNER_TYPES,
  PLATE_TYPES,
  PURPOSE_TYPES,
  REGISTRATION_STATUSES,
  VEHICLE_STATUSES,
  VEHICLE_TYPES,
} from '../../types/vehicle'
import {
  defaultVehicleFormValues,
  type VehicleFormData,
  vehicleFormSchema,
} from '../../utils/validation'

interface VehicleFormWizardProps {
  title: string
  submitLabel: string
  initialValues?: unknown
  isSubmitting: boolean
  serverErrors?: string[]
  onSubmit: (values: VehicleFormData) => Promise<void>
}

const stepFields = [
  ['manufacture','model','bodyType','color','year','engineCapacity','odometerReading','seatingCapacity','vehicleType','fuelType','purpose','status'],
  ['ownerType','ownerName','address','nationalId','mobileNumber','email','companyRegistrationNumber','passportNumber'],
  ['plateType','plateNumber','registrationDate','expiryDate','roadworthyCert','customsRef','proofOfOwnership','registrationState','registrationStatus','policyNumber','companyName','insuranceType','insuranceExpiryDate','insuranceState','insuranceStatus'],
]

const makeOptions = (values: readonly string[]) => values.map((value) => ({ value, label: value }))

export const VehicleFormWizard = ({ title, submitLabel, initialValues, isSubmitting, serverErrors, onSubmit }: VehicleFormWizardProps) => {
  const [step, setStep] = useState(0)

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(vehicleFormSchema as any),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: (initialValues as any) ?? (defaultVehicleFormValues as any),
  })

  const ownerType = watch('ownerType')

  const submitHandler = handleSubmit(async (values: any) => {
    const parsed = vehicleFormSchema.parse(values) as VehicleFormData
    await onSubmit(parsed)
  })

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Protected Form</p>
          <h2>{title}</h2>
          <p>Complete all mandatory sections to satisfy strict backend validation.</p>
        </div>
      </header>

      <div className="stepper">
        {['Vehicle Info', 'Owner', 'Registration & Insurance'].map((label, index) => (
          <button key={label} className={index === step ? 'step-chip is-active' : 'step-chip'} type="button" onClick={() => setStep(index)}>
            {index + 1}. {label}
          </button>
        ))}
      </div>

      {serverErrors?.length ? <div className="error-panel">{serverErrors.map((m) => <p key={m}>{m}</p>)}</div> : null}

      <form className="form-grid" onSubmit={submitHandler}>
        {step === 0 ? (
          <>
            <InputField label="Manufacture" registration={register('manufacture')} error={errors.manufacture?.message} />
            <InputField label="Model" registration={register('model')} error={errors.model?.message} />
            <InputField label="Body Type" registration={register('bodyType')} error={errors.bodyType?.message} />
            <InputField label="Color" registration={register('color')} error={errors.color?.message} />
            <InputField label="Year" type="number" registration={register('year')} error={errors.year?.message} />
            <InputField label="Engine Capacity" type="number" registration={register('engineCapacity')} error={errors.engineCapacity?.message} />
            <InputField label="Odometer Reading" type="number" registration={register('odometerReading')} error={errors.odometerReading?.message} />
            <InputField label="Seating Capacity" type="number" registration={register('seatingCapacity')} error={errors.seatingCapacity?.message} />
            <SelectField label="Vehicle Type" registration={register('vehicleType')} error={errors.vehicleType?.message} options={makeOptions(VEHICLE_TYPES)} />
            <SelectField label="Fuel Type" registration={register('fuelType')} error={errors.fuelType?.message} options={makeOptions(FUEL_TYPES)} />
            <SelectField label="Purpose" registration={register('purpose')} error={errors.purpose?.message} options={makeOptions(PURPOSE_TYPES)} />
            <SelectField label="Vehicle Status" registration={register('status')} error={errors.status?.message} options={makeOptions(VEHICLE_STATUSES)} />
          </>
        ) : null}

        {step === 1 ? (
          <>
            <SelectField label="Owner Type" registration={register('ownerType')} error={errors.ownerType?.message} options={makeOptions(OWNER_TYPES)} />
            <InputField label="Owner Name" registration={register('ownerName')} error={errors.ownerName?.message} />
            <TextAreaField label="Address" registration={register('address')} error={errors.address?.message} rows={3} />
            <InputField label="National ID" registration={register('nationalId')} error={errors.nationalId?.message} />
            <InputField label="Mobile Number" registration={register('mobileNumber')} error={errors.mobileNumber?.message} />
            <InputField label="Email" type="email" registration={register('email')} error={errors.email?.message} />
            <InputField label="Company Registration Number" registration={register('companyRegistrationNumber')} error={errors.companyRegistrationNumber?.message} placeholder={ownerType === 'COMPANY' ? 'Required for COMPANY' : 'Optional'} />
            <InputField label="Passport Number" registration={register('passportNumber')} error={errors.passportNumber?.message} />
          </>
        ) : null}

        {step === 2 ? (
          <>
            <SelectField label="Plate Type" registration={register('plateType')} error={errors.plateType?.message} options={makeOptions(PLATE_TYPES)} />
            <InputField label="Plate Number" registration={register('plateNumber')} error={errors.plateNumber?.message} />
            <InputField label="Registration Date" type="datetime-local" registration={register('registrationDate')} error={errors.registrationDate?.message} />
            <InputField label="Registration Expiry" type="datetime-local" registration={register('expiryDate')} error={errors.expiryDate?.message} />
            <InputField label="Roadworthy Cert" registration={register('roadworthyCert')} error={errors.roadworthyCert?.message} />
            <InputField label="Customs Reference" registration={register('customsRef')} error={errors.customsRef?.message} />
            <InputField label="Proof of Ownership" registration={register('proofOfOwnership')} error={errors.proofOfOwnership?.message} />
            <InputField label="Registration State" registration={register('registrationState')} error={errors.registrationState?.message} />
            <SelectField label="Registration Status" registration={register('registrationStatus')} error={errors.registrationStatus?.message} options={makeOptions(REGISTRATION_STATUSES)} />
            <InputField label="Policy Number" registration={register('policyNumber')} error={errors.policyNumber?.message} />
            <InputField label="Insurance Company" registration={register('companyName')} error={errors.companyName?.message} />
            <InputField label="Insurance Type" registration={register('insuranceType')} error={errors.insuranceType?.message} />
            <InputField label="Insurance Expiry" type="datetime-local" registration={register('insuranceExpiryDate')} error={errors.insuranceExpiryDate?.message} />
            <InputField label="Insurance State" registration={register('insuranceState')} error={errors.insuranceState?.message} />
            <SelectField label="Insurance Status" registration={register('insuranceStatus')} error={errors.insuranceStatus?.message} options={makeOptions(INSURANCE_STATUSES)} />
          </>
        ) : null}

        <div className="form-actions">
          {step > 0 ? <button className="secondary-btn" type="button" onClick={() => setStep((s) => s - 1)}>Back</button> : null}
          {step < 2 ? (
            <button className="primary-btn" type="button" onClick={async () => { const valid = await trigger(stepFields[step] as any, { shouldFocus: true }); if (valid) setStep((s) => s + 1) }}>
              Continue
            </button>
          ) : (
            <button className="primary-btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : submitLabel}</button>
          )}
        </div>
      </form>
    </section>
  )
}
