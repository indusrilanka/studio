// Fake API for Container master data
import type { Container } from '@/types';

let containers: Container[] = [
  { containerId: 1, containerName: 'Red Top Tube', description: 'No additive, used for serum tests (e.g., chemistry panels).' },
  { containerId: 2, containerName: 'Yellow Top Tube', description: 'Contains gel for serum separation. Used for various chemistry tests.' },
  { containerId: 3, containerName: 'Purple Top Tube', description: 'Contains EDTA, used for hematology (e.g., CBC).' },
  { containerId: 4, containerName: 'Blue Top Tube', description: 'Contains sodium citrate. Used for coagulation studies (e.g., PT, APTT).' },
  { containerId: 5, containerName: 'Green Top Tube', description: 'Contains heparin. Used for plasma tests in chemistry.' },
  { containerId: 6, containerName: 'Gray Top Tube', description: 'Contains sodium fluoride. Used for glucose and lactate testing.' },
  { containerId: 7, containerName: 'Sterile Urine Container', description: 'Used for microbiology or routine urine analysis.' },
  { containerId: 8, containerName: 'Stool Container', description: 'Used for stool sample collection for parasitology and culture.' },
  { containerId: 9, containerName: 'Sputum Container', description: 'Sterile container used for sputum sample collection (e.g., TB culture).' },
];

export function getContainers(): Promise<Container[]> {
  return Promise.resolve([...containers]);
}

export function addContainer(container: Omit<Container, 'containerId'>): Promise<Container> {
  const newContainer = {
    ...container,
    containerId: containers.length ? Math.max(...containers.map(c => c.containerId)) + 1 : 1,
  };
  containers.push(newContainer);
  return Promise.resolve(newContainer);
}

export function updateContainer(container: Container): Promise<Container> {
  const idx = containers.findIndex(c => c.containerId === container.containerId);
  if (idx !== -1) {
    containers[idx] = container;
    return Promise.resolve(container);
  }
  return Promise.reject(new Error('Container not found'));
}

export function deleteContainer(containerId: number): Promise<void> {
  containers = containers.filter(c => c.containerId !== containerId);
  return Promise.resolve();
}
