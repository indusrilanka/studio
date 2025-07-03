// Fake API for Test Category (Category) master data
import type { TestCategory } from '@/types';

let testCategories: TestCategory[] = [
  { categoryId: 1, categoryName: 'Hematology' },
  { categoryId: 2, categoryName: 'Biochemistry' },
  { categoryId: 3, categoryName: 'Microbiology' },
  { categoryId: 4, categoryName: 'Serology' },
  { categoryId: 5, categoryName: 'Immunology' },
  { categoryId: 6, categoryName: 'Histopathology' },
  { categoryId: 7, categoryName: 'Cytology' },
  { categoryId: 8, categoryName: 'Molecular Diagnostics' },
  { categoryId: 9, categoryName: 'Clinical Pathology' },
  { categoryId: 10, categoryName: 'Toxicology' },
];

export function getTestCategories(): Promise<TestCategory[]> {
  return Promise.resolve([...testCategories]);
}

export function addTestCategory(category: Omit<TestCategory, 'categoryId'>): Promise<TestCategory> {
  const newCategory = {
    ...category,
    categoryId: testCategories.length ? Math.max(...testCategories.map(c => c.categoryId)) + 1 : 1,
  };
  testCategories.push(newCategory);
  return Promise.resolve(newCategory);
}

export function updateTestCategory(category: TestCategory): Promise<TestCategory> {
  const idx = testCategories.findIndex(c => c.categoryId === category.categoryId);
  if (idx !== -1) {
    testCategories[idx] = category;
    return Promise.resolve(category);
  }
  return Promise.reject(new Error('Category not found'));
}

export function deleteTestCategory(categoryId: number): Promise<void> {
  testCategories = testCategories.filter(c => c.categoryId !== categoryId);
  return Promise.resolve();
}
