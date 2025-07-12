import { TestMethod } from "@/types/test-method";

let testMethods: TestMethod[] = [
  { methodId: 1, methodName: "Microscopy" },
  { methodId: 2, methodName: "ELISA (Enzyme-Linked Immunosorbent Assay)" },
  { methodId: 3, methodName: "PCR (Polymerase Chain Reaction)" },
  { methodId: 4, methodName: "Culture" },
  { methodId: 5, methodName: "Spectrophotometry" },
  { methodId: 6, methodName: "Chromatography" },
  { methodId: 7, methodName: "Electrophoresis" },
  { methodId: 8, methodName: "Flow Cytometry" },
  { methodId: 9, methodName: "Radiology" },
  { methodId: 10, methodName: "Rapid Immunoassay" }
];

export async function fetchTestMethods(): Promise<TestMethod[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return testMethods;
}

export async function addTestMethod(newMethod: TestMethod): Promise<TestMethod> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  newMethod.methodId = testMethods.length + 1;
  testMethods.push(newMethod);
  return newMethod;
}

export async function updateTestMethod(updatedMethod: TestMethod): Promise<TestMethod | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = testMethods.findIndex(method => method.methodId === updatedMethod.methodId);
  if (index !== -1) {
    testMethods[index] = updatedMethod;
    return updatedMethod;
  }
  return undefined;
}

export async function deleteTestMethod(methodId: number): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = testMethods.findIndex(method => method.methodId === methodId);
  if (index !== -1) {
    testMethods.splice(index, 1);
    return true;
  }
  return false;
}
