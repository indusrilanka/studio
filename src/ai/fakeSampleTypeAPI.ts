// Define SampleType here since it is not exported from '@/types'

import { SampleType } from "@/types";

let sampleTypes: SampleType[] = [
  {
    sampleTypeId: 1,
    sampleTypeName: "Blood",
  },
  {
    sampleTypeId: 2,
    sampleTypeName: "Urine",
  },
  {
    sampleTypeId: 3,
    sampleTypeName: "Stool",
  },
  {
    sampleTypeId: 4,
    sampleTypeName: "Sputum",
  },
  {
    sampleTypeId: 5,
    sampleTypeName: "Saliva",
  },
  {
    sampleTypeId: 6,
    sampleTypeName: "Tissue",
  },
  {
    sampleTypeId: 7,
    sampleTypeName: "CSF (Cerebrospinal Fluid)",
  },
  {
    sampleTypeId: 8,
    sampleTypeName: "Serum",
  },
  {
    sampleTypeId: 9,
    sampleTypeName: "Plasma",
  },
  {
    sampleTypeId: 10,
    sampleTypeName: "Swab",
  },
  {
    sampleTypeId: 11,
    sampleTypeName: "Bone Marrow",
  },
  {
    sampleTypeId: 12,
    sampleTypeName: "Nasal Aspirate",
  },
];

export async function fetchSampleTypes(): Promise<SampleType[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return sampleTypes;
}

export async function fetchSampleTypeById(sampleTypeId: number): Promise<SampleType | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return sampleTypes.find(sampleType => sampleType.sampleTypeId === sampleTypeId);
}

export async function addSampleType(newSampleType: SampleType): Promise<SampleType> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  newSampleType.sampleTypeId = sampleTypes.length + 1; // Simple ID generation
  sampleTypes.push(newSampleType);
  return newSampleType;
}

export async function updateSampleType(updatedSampleType: SampleType): Promise<SampleType | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = sampleTypes.findIndex(sampleType => sampleType.sampleTypeId === updatedSampleType.sampleTypeId);
  if (index !== -1) {
    sampleTypes[index] = updatedSampleType;
    return updatedSampleType;
  }
  return undefined;
}

export async function deleteSampleType(sampleTypeId: number): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = sampleTypes.findIndex(sampleType => sampleType.sampleTypeId === sampleTypeId);
  if (index !== -1) {
    sampleTypes.splice(index, 1);
    return true;
  }
  return false;
}
