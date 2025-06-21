import { InsuranceProvider } from '../types';

let insuranceProviders: InsuranceProvider[] = [
  {
    id: 1,
    name: 'HealthSecure',
    code: 'HS001',
    contactNumber: '123-456-7890',
    address: '123 Main St, City',
    status: 'Active',
  },
  {
    id: 2,
    name: 'MediCare Plus',
    code: 'MC002',
    contactNumber: '987-654-3210',
    address: '456 Elm St, City',
    status: 'Inactive',
  },
];

export const fakeInsuranceProviderAPI = {
  getAll: async (): Promise<InsuranceProvider[]> => {
    return insuranceProviders;
  },
  getById: async (id: number): Promise<InsuranceProvider | undefined> => {
    return insuranceProviders.find((p) => p.id === id);
  },
  create: async (provider: Omit<InsuranceProvider, 'id'>): Promise<InsuranceProvider> => {
    const newProvider = { ...provider, id: Date.now() };
    insuranceProviders.push(newProvider);
    return newProvider;
  },
  update: async (id: number, provider: Partial<InsuranceProvider>): Promise<InsuranceProvider | undefined> => {
    const idx = insuranceProviders.findIndex((p) => p.id === id);
    if (idx !== -1) {
      insuranceProviders[idx] = { ...insuranceProviders[idx], ...provider };
      return insuranceProviders[idx];
    }
    return undefined;
  },
  delete: async (id: number): Promise<boolean> => {
    const len = insuranceProviders.length;
    insuranceProviders = insuranceProviders.filter((p) => p.id !== id);
    return insuranceProviders.length < len;
  },
};
