import type { VehiclePayload, VehicleRecord } from '../types/vehicle'

const STORAGE_KEY = 'vrm_vehicles'

const SEED: VehicleRecord[] = [
  {
    id: '1',
    createdAt: '2024-01-15T08:00:00.000Z',
    updatedAt: '2024-01-15T08:00:00.000Z',
    vehicle: {
      manufacture: 'Toyota',
      model: 'Land Cruiser',
      bodyType: 'SUV',
      color: 'White',
      year: 2021,
      vehicleType: 'SUV',
      fuelType: 'DIESEL',
      purpose: 'PERSONAL',
      status: 'USED',
      engineCapacity: 4500,
      odometerReading: 45000,
      seatingCapacity: 7,
    },
    owner: {
      ownerType: 'INDIVIDUAL',
      ownerName: 'Jean Pierre Habimana',
      address: 'KG 12 Ave, Kigali',
      nationalId: '1199880012345678',
      mobileNumber: '0788123456',
      email: 'jp.habimana@gmail.com',
    },
    registration: {
      plateType: 'PRIVATE',
      plateNumber: 'RAA 123 A',
      registrationDate: '2024-01-15T00:00:00.000Z',
      expiryDate: '2027-01-15T00:00:00.000Z',
      roadworthyCert: 'RWC-2024-0011',
      customsRef: 'CUS-2024-0892',
      proofOfOwnership: 'LOG-2024-TL-001',
      state: 'Kigali',
      status: 'ACTIVE',
    },
    insurance: {
      policyNumber: 'SAG-2024-00123',
      companyName: 'SANLAM General Insurance',
      insuranceType: 'Comprehensive',
      insuranceExpiryDate: '2027-01-15T00:00:00.000Z',
      state: 'Kigali',
      status: 'ACTIVE',
    },
  },
  {
    id: '2',
    createdAt: '2024-02-20T10:30:00.000Z',
    updatedAt: '2024-02-20T10:30:00.000Z',
    vehicle: {
      manufacture: 'Volkswagen',
      model: 'Golf',
      bodyType: 'Sedan',
      color: 'Silver',
      year: 2019,
      vehicleType: 'OTHER',
      fuelType: 'PETROL',
      purpose: 'PERSONAL',
      status: 'USED',
      engineCapacity: 1400,
      odometerReading: 72000,
      seatingCapacity: 5,
    },
    owner: {
      ownerType: 'INDIVIDUAL',
      ownerName: 'Amina Uwimana',
      address: 'KN 5 Rd, Nyarugenge, Kigali',
      nationalId: '1198570023456789',
      mobileNumber: '0722456789',
      email: 'amina.uwimana@yahoo.com',
    },
    registration: {
      plateType: 'PRIVATE',
      plateNumber: 'RAB 456 B',
      registrationDate: '2024-02-20T00:00:00.000Z',
      expiryDate: '2026-02-20T00:00:00.000Z',
      roadworthyCert: 'RWC-2024-0022',
      customsRef: 'CUS-2024-1043',
      proofOfOwnership: 'LOG-2024-VG-002',
      state: 'Kigali',
      status: 'ACTIVE',
    },
    insurance: {
      policyNumber: 'SWA-2024-00456',
      companyName: 'SONARWA Life',
      insuranceType: 'Third Party',
      insuranceExpiryDate: '2026-02-20T00:00:00.000Z',
      state: 'Kigali',
      status: 'ACTIVE',
    },
  },
  {
    id: '3',
    createdAt: '2023-11-05T09:15:00.000Z',
    updatedAt: '2024-03-01T11:00:00.000Z',
    vehicle: {
      manufacture: 'Isuzu',
      model: 'NPR',
      bodyType: 'Truck',
      color: 'Blue',
      year: 2018,
      vehicleType: 'TRUCK',
      fuelType: 'DIESEL',
      purpose: 'COMMERCIAL',
      status: 'USED',
      engineCapacity: 3900,
      odometerReading: 130000,
      seatingCapacity: 3,
    },
    owner: {
      ownerType: 'COMPANY',
      ownerName: 'Rwanda Logistics Ltd',
      address: 'KK 15 Ave, Kicukiro, Kigali',
      nationalId: '1198000034567890',
      mobileNumber: '0788900123',
      email: 'ops@rwlogistics.rw',
      companyRegistrationNumber: 'RCA-2018-45678',
    },
    registration: {
      plateType: 'COMMERCIAL',
      plateNumber: 'RBC 789 C',
      registrationDate: '2023-11-05T00:00:00.000Z',
      expiryDate: '2025-11-05T00:00:00.000Z',
      roadworthyCert: 'RWC-2023-0077',
      customsRef: 'CUS-2023-5567',
      proofOfOwnership: 'LOG-2023-IZ-003',
      state: 'Kigali',
      status: 'EXPIRED',
    },
    insurance: {
      policyNumber: 'PIM-2023-00789',
      companyName: 'Prime Insurance',
      insuranceType: 'Commercial Fleet',
      insuranceExpiryDate: '2025-11-05T00:00:00.000Z',
      state: 'Kigali',
      status: 'EXPIRED',
    },
  },
  {
    id: '4',
    createdAt: '2024-05-10T14:00:00.000Z',
    updatedAt: '2024-05-10T14:00:00.000Z',
    vehicle: {
      manufacture: 'Bajaj',
      model: 'Pulsar 200',
      bodyType: 'Motorcycle',
      color: 'Red',
      year: 2022,
      vehicleType: 'MOTORCYCLE',
      fuelType: 'PETROL',
      purpose: 'TAXI',
      status: 'USED',
      engineCapacity: 200,
      odometerReading: 23000,
      seatingCapacity: 2,
    },
    owner: {
      ownerType: 'INDIVIDUAL',
      ownerName: 'Eric Nkurunziza',
      address: 'NB 3 St, Nyabugogo, Kigali',
      nationalId: '1200090045678901',
      mobileNumber: '0730567890',
      email: 'eric.nkurunziza@gmail.com',
    },
    registration: {
      plateType: 'COMMERCIAL',
      plateNumber: 'RAC 321 D',
      registrationDate: '2024-05-10T00:00:00.000Z',
      expiryDate: '2026-05-10T00:00:00.000Z',
      roadworthyCert: 'RWC-2024-0488',
      customsRef: 'CUS-2024-2201',
      proofOfOwnership: 'LOG-2024-BJ-004',
      state: 'Kigali',
      status: 'ACTIVE',
    },
    insurance: {
      policyNumber: 'UAP-2024-01012',
      companyName: 'UAP Insurance',
      insuranceType: 'Moto Third Party',
      insuranceExpiryDate: '2026-05-10T00:00:00.000Z',
      state: 'Kigali',
      status: 'ACTIVE',
    },
  },
  {
    id: '5',
    createdAt: '2024-03-22T16:45:00.000Z',
    updatedAt: '2024-03-22T16:45:00.000Z',
    vehicle: {
      manufacture: 'Coaster',
      model: 'Toyota Coaster',
      bodyType: 'Bus',
      color: 'Yellow',
      year: 2017,
      vehicleType: 'BUS',
      fuelType: 'DIESEL',
      purpose: 'COMMERCIAL',
      status: 'USED',
      engineCapacity: 4200,
      odometerReading: 210000,
      seatingCapacity: 30,
    },
    owner: {
      ownerType: 'COMPANY',
      ownerName: 'Kigali Express Transport',
      address: 'KG 5 Ave, Remera, Kigali',
      nationalId: '1197500056789012',
      mobileNumber: '0788234567',
      email: 'info@kigaliexpress.rw',
      companyRegistrationNumber: 'RCA-2015-12345',
    },
    registration: {
      plateType: 'COMMERCIAL',
      plateNumber: 'RBD 654 E',
      registrationDate: '2024-03-22T00:00:00.000Z',
      expiryDate: '2026-03-22T00:00:00.000Z',
      roadworthyCert: 'RWC-2024-0233',
      customsRef: 'CUS-2024-1785',
      proofOfOwnership: 'LOG-2024-TC-005',
      state: 'Eastern Province',
      status: 'ACTIVE',
    },
    insurance: {
      policyNumber: 'MUA-2024-01234',
      companyName: 'Radiant Insurance',
      insuranceType: 'Public Service Vehicle',
      insuranceExpiryDate: '2026-03-22T00:00:00.000Z',
      state: 'Eastern Province',
      status: 'ACTIVE',
    },
  },
  {
    id: '6',
    createdAt: '2024-06-01T08:30:00.000Z',
    updatedAt: '2024-06-01T08:30:00.000Z',
    vehicle: {
      manufacture: 'Mitsubishi',
      model: 'L200',
      bodyType: 'Pickup',
      color: 'Black',
      year: 2020,
      vehicleType: 'PICKUP',
      fuelType: 'DIESEL',
      purpose: 'PERSONAL',
      status: 'USED',
      engineCapacity: 2400,
      odometerReading: 58000,
      seatingCapacity: 5,
    },
    owner: {
      ownerType: 'INDIVIDUAL',
      ownerName: 'Grace Mutesi',
      address: 'KG 200 St, Gikondo, Kigali',
      nationalId: '1199320067890123',
      mobileNumber: '0782345678',
      email: 'grace.mutesi@outlook.com',
    },
    registration: {
      plateType: 'PRIVATE',
      plateNumber: 'RAD 987 F',
      registrationDate: '2024-06-01T00:00:00.000Z',
      expiryDate: '2027-06-01T00:00:00.000Z',
      roadworthyCert: 'RWC-2024-0611',
      customsRef: 'CUS-2024-3312',
      proofOfOwnership: 'LOG-2024-MT-006',
      state: 'Kigali',
      status: 'ACTIVE',
    },
    insurance: {
      policyNumber: 'CPM-2024-01788',
      companyName: 'Campement Insurance',
      insuranceType: 'Comprehensive',
      insuranceExpiryDate: '2027-06-01T00:00:00.000Z',
      state: 'Kigali',
      status: 'ACTIVE',
    },
  },
  {
    id: '7',
    createdAt: '2024-07-14T11:20:00.000Z',
    updatedAt: '2024-07-14T11:20:00.000Z',
    vehicle: {
      manufacture: 'Nissan',
      model: 'Leaf',
      bodyType: 'Hatchback',
      color: 'White',
      year: 2023,
      vehicleType: 'ELECTRIC',
      fuelType: 'ELECTRIC',
      purpose: 'PERSONAL',
      status: 'NEW',
      engineCapacity: 0,
      odometerReading: 5000,
      seatingCapacity: 5,
    },
    owner: {
      ownerType: 'INDIVIDUAL',
      ownerName: 'Patrick Mugisha',
      address: 'KN 78 Rd, Kimihurura, Kigali',
      nationalId: '1200450078901234',
      mobileNumber: '0703456789',
      email: 'p.mugisha@irembo.gov.rw',
    },
    registration: {
      plateType: 'PRIVATE',
      plateNumber: 'RAE 111 G',
      registrationDate: '2024-07-14T00:00:00.000Z',
      expiryDate: '2027-07-14T00:00:00.000Z',
      roadworthyCert: 'RWC-2024-0789',
      customsRef: 'CUS-2024-4450',
      proofOfOwnership: 'LOG-2024-NS-007',
      state: 'Kigali',
      status: 'ACTIVE',
    },
    insurance: {
      policyNumber: 'SAG-2024-02345',
      companyName: 'SANLAM General Insurance',
      insuranceType: 'Comprehensive',
      insuranceExpiryDate: '2027-07-14T00:00:00.000Z',
      state: 'Kigali',
      status: 'ACTIVE',
    },
  },
  {
    id: '8',
    createdAt: '2023-09-30T07:00:00.000Z',
    updatedAt: '2024-01-10T09:00:00.000Z',
    vehicle: {
      manufacture: 'Toyota',
      model: 'Hiace',
      bodyType: 'Van',
      color: 'Grey',
      year: 2016,
      vehicleType: 'VAN',
      fuelType: 'DIESEL',
      purpose: 'COMMERCIAL',
      status: 'USED',
      engineCapacity: 2700,
      odometerReading: 180000,
      seatingCapacity: 14,
    },
    owner: {
      ownerType: 'NGO',
      ownerName: 'Alight Rwanda',
      address: 'KG 701 St, Nyamirambo, Kigali',
      nationalId: '1197000089012345',
      mobileNumber: '0788678901',
      email: 'fleet@alight.org',
      companyRegistrationNumber: 'NGO-RW-0042',
    },
    registration: {
      plateType: 'PRIVATE',
      plateNumber: 'GR 555 H',
      registrationDate: '2023-09-30T00:00:00.000Z',
      expiryDate: '2025-09-30T00:00:00.000Z',
      roadworthyCert: 'RWC-2023-0911',
      customsRef: 'CUS-2023-8890',
      proofOfOwnership: 'LOG-2023-TH-008',
      state: 'Northern Province',
      status: 'ACTIVE',
    },
    insurance: {
      policyNumber: 'PIM-2023-02678',
      companyName: 'Prime Insurance',
      insuranceType: 'NGO Fleet',
      insuranceExpiryDate: '2025-09-30T00:00:00.000Z',
      state: 'Northern Province',
      status: 'ACTIVE',
    },
  },
]

// ── helpers ────────────────────────────────────────────────────────────────

function load(): VehicleRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as VehicleRecord[]
  } catch {
    // ignore parse errors
  }
  // first run: persist seed data
  save(SEED)
  return SEED
}

function save(records: VehicleRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

function nextId(records: VehicleRecord[]): string {
  const max = records.reduce((acc, r) => Math.max(acc, Number(r.id) || 0), 0)
  return String(max + 1)
}

function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

// ── store API ──────────────────────────────────────────────────────────────

export const mockStore = {
  getAll(): Promise<VehicleRecord[]> {
    return delay(load())
  },

  getById(id: string): Promise<VehicleRecord> {
    const record = load().find((r) => String(r.id) === id)
    if (!record) return Promise.reject(new Error(`Vehicle ${id} not found`))
    return delay(record)
  },

  create(payload: VehiclePayload): Promise<VehicleRecord> {
    const records = load()
    const record: VehicleRecord = {
      ...payload,
      id: nextId(records),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    records.push(record)
    save(records)
    return delay(record)
  },

  update(id: string, payload: VehiclePayload): Promise<VehicleRecord> {
    const records = load()
    const index = records.findIndex((r) => String(r.id) === id)
    if (index === -1) return Promise.reject(new Error(`Vehicle ${id} not found`))
    const updated: VehicleRecord = {
      ...payload,
      id: records[index].id,
      createdAt: records[index].createdAt,
      updatedAt: new Date().toISOString(),
    }
    records[index] = updated
    save(records)
    return delay(updated)
  },

  delete(id: string): Promise<void> {
    const records = load().filter((r) => String(r.id) !== id)
    save(records)
    return delay(undefined)
  },
}
