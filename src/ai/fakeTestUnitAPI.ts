import { TestUnit } from "@/types";


let units:TestUnit[] =[

  {
    "unitId": 1,
    "unitName": "Milligrams per deciliter",
    "symbol": "mg/dL"
  },
  {
    "unitId": 2,
    "unitName": "Micromoles per liter",
    "symbol": "µmol/L"
  },
  {
    "unitId": 3,
    "unitName": "International units per liter",
    "symbol": "IU/L"
  },
  {
    "unitId": 4,
    "unitName": "Millimoles per liter",
    "symbol": "mmol/L"
  },
  {
    "unitId": 5,
    "unitName": "Grams per deciliter",
    "symbol": "g/dL"
  },
  {
    "unitId": 6,
    "unitName": "Percentage",
    "symbol": "%"
  },
  {
    "unitId": 7,
    "unitName": "Units per liter",
    "symbol": "U/L"
  },
  {
    "unitId": 8,
    "unitName": "Thousand per microliter",
    "symbol": "10^3/µL"
  },
  {
    "unitId": 9,
    "unitName": "Cells per microliter",
    "symbol": "cells/µL"
  },
  {
    "unitId": 10,
    "unitName": "Nanograms per milliliter",
    "symbol": "ng/mL"
  },
  {
    "unitId": 11,
    "unitName": "Not Applicable",
    "symbol": "N/A"
  }

]

export function getTestUnits(): Promise<TestUnit[]> {
  return Promise.resolve([...units]);
}

export function addTestUnit(unit: Omit<TestUnit, 'unitId'>): Promise<TestUnit> {
  const newUnit = {
    ...unit,
    unitId: units.length ? Math.max(...units.map(u => u.unitId)) + 1 : 1,
  };
  units.push(newUnit);
  return Promise.resolve(newUnit);
}

export function updateTestUnit(unit: TestUnit): Promise<TestUnit> {
  const idx = units.findIndex(u => u.unitId === unit.unitId);
  if (idx !== -1) {
    units[idx] = unit;
    return Promise.resolve(unit);
  }
  return Promise.reject(new Error('Unit not found'));
}

export function deleteTestUnit(unitId: number): Promise<void> {
  units = units.filter(u => u.unitId !== unitId);
  return Promise.resolve();
}


