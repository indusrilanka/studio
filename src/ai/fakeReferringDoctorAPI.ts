// fakeReferringDoctorAPI.ts
import type { ReferringDoctor } from '@/types';

export async function fetchReferringDoctors(): Promise<ReferringDoctor[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return [
    {
      id: 1,
      fullName: 'Dr. Ruwan Abeysekara',
      specializationId: 1,
      specializationName: 'General Practitioner',
      registrationNumber: 'SLMC12345',
      hospitalOrClinic: 'Sunrise Medical Centre',
      contactNumber: '011-2223344',
      email: 'ruwan.abeysekara@sunrise.lk',
      address: '12 Lake Road, Colombo 07',
      status: 'Active',
    },
    {
      id: 2,
      fullName: 'Dr. Menaka Jayasinghe',
      specializationId: 2,
      specializationName: 'Pediatrician',
      registrationNumber: 'SLMC67890',
      hospitalOrClinic: 'Happy Kids Clinic',
      contactNumber: '011-2233445',
      email: 'menaka.j@happykids.lk',
      address: '45 Flower Rd, Colombo 03',
      status: 'Active',
    },
    {
      id: 3,
      fullName: 'Dr. Arjuna Perera',
      specializationId: 7,
      specializationName: 'Endocrinologist',
      registrationNumber: 'SLMC45678',
      hospitalOrClinic: 'Diabetic Centre - Nugegoda',
      contactNumber: '011-4455667',
      email: 'arjuna.perera@dc.lk',
      address: '55 Temple Lane, Nugegoda',
      status: 'Inactive',
    },
    {
      id: 4,
      fullName: 'Dr. Sanduni Fernando',
      specializationId: 3,
      specializationName: 'Cardiologist',
      registrationNumber: 'SLMC99887',
      hospitalOrClinic: 'Healthy Heart Centre',
      contactNumber: '011-3344556',
      email: 'sfernando@heart.lk',
      address: '88 Lotus Rd, Colombo 10',
      status: 'Active',
    },
    {
      id: 5,
      fullName: 'Dr. Nishantha Alwis',
      specializationId: 21,
      specializationName: 'Diabetologist',
      registrationNumber: 'SLMC33442',
      hospitalOrClinic: 'Nawinna Diabetic Clinic',
      contactNumber: '011-2255884',
      email: 'n.alwis@nawinna.lk',
      address: '12 Baseline Rd, Nawinna',
      status: 'Active',
    },
  ];
}
export async function addReferringDoctor(doctor: Omit<ReferringDoctor, 'id'>): Promise<ReferringDoctor> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    ...doctor,
    id: Math.floor(Math.random() * 1000), // Simulate ID generation
  };
}

export async function updateReferringDoctor(doctor: ReferringDoctor): Promise<ReferringDoctor> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return doctor; // Simulate successful update
}

export async function deleteReferringDoctor(id: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Simulate successful deletion
}
export async function fetchReferringDoctorById(id: number): Promise<ReferringDoctor | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const doctors = await fetchReferringDoctors();
  return doctors.find((doc) => doc.id === id) || null;
}

export async function searchReferringDoctors(query: string): Promise<ReferringDoctor[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const doctors = await fetchReferringDoctors();
  return doctors.filter((doc) =>
    doc.fullName.toLowerCase().includes(query.toLowerCase()) ||
    doc.specializationName.toLowerCase().includes(query.toLowerCase())
  );
}

export async function fetchReferringDoctorSpecializations(): Promise<{ id: number; name: string }[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [
    { id: 1, name: 'General Practitioner' },
    { id: 2, name: 'Pediatrician' },
    { id: 3, name: 'Cardiologist' },
    { id: 4, name: 'Dermatologist' },
    { id: 5, name: 'Neurologist' },
    { id: 6, name: 'Psychiatrist' },
    { id: 7, name: 'Endocrinologist' },
    { id: 8, name: 'Nephrologist' },
    { id: 9, name: 'Gastroenterologist' },
    { id: 10, name: 'Pulmonologist' },
    { id: 11, name: 'Oncologist' },
    { id: 12, name: 'Rheumatologist' },
    { id: 13, name: 'Orthopedic Surgeon' },
    { id: 14, name: 'ENT Specialist' },
    { id: 15, name: 'Ophthalmologist' },
    { id: 16, name: 'Urologist' },
    { id: 17, name: 'Gynecologist' },
    { id: 18, name: 'Obstetrician' },
    { id: 19, name: 'Anesthesiologist' },
    { id: 20, name: 'Pathologist' },
    { id: 21, name: 'Diabetologist' }, // Added Diabetologist specialization
  ];
}

export async function fetchReferringDoctorStatuses(): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return ['Active', 'Inactive', 'Pending'];
}

export async function fetchReferringDoctorByRegistrationNumber(registrationNumber: string): Promise<ReferringDoctor | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const doctors = await fetchReferringDoctors();
  return doctors.find((doc) => doc.registrationNumber === registrationNumber) || null;
}

export async function fetchReferringDoctorByEmail(email: string): Promise<ReferringDoctor | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const doctors = await fetchReferringDoctors();
  return doctors.find((doc) => doc.email === email) || null;
}
export async function fetchReferringDoctorByContactNumber(contactNumber: string): Promise<ReferringDoctor | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const doctors = await fetchReferringDoctors();
  return doctors.find((doc) => doc.contactNumber === contactNumber) || null;
}

export async function fetchReferringDoctorByHospitalOrClinic(hospitalOrClinic: string): Promise<ReferringDoctor | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const doctors = await fetchReferringDoctors();
  return doctors.find((doc) => doc.hospitalOrClinic === hospitalOrClinic) || null;
}

export async function fetchReferringDoctorByAddress(address: string): Promise<ReferringDoctor | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const doctors = await fetchReferringDoctors();
  return doctors.find((doc) => doc.address === address) || null;
}

export async function fetchReferringDoctorByIdWithDetails(id: number): Promise<ReferringDoctor | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const doctors = await fetchReferringDoctors();
  return doctors.find((doc) => doc.id === id) || null;
}