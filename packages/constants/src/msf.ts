export const EMPLOYMENT_TYPES = [
  {id: '02', name: 'Temporary'},
  {id: '03', name: 'Contract'},
  {id: '05', name: 'Part Time'},
  {id: '06', name: 'Freelance'},
  {id: '07', name: 'Permanent'},
  {id: '08', name: 'Full Time'},
  {id: '09', name: 'Flexi Time'},
  {id: '10', name: 'Internship'},
];

const EMPLOYMENT_TYPES_MAPPING_TABLE: Array<[number, string]> = [
  [440002, '05'],
  [440003, '07'],
  [440004, '02'],
  [440005, '03'],
  [440006, '06'],
  [440007, '08'],
  [440008, '09'],
  [440009, '10'],
];

export const mapIcmsToMsfEmploymentTypes = (id: number) => {
  const mappingFound = EMPLOYMENT_TYPES_MAPPING_TABLE.find((mapping) => mapping[0] === id) || [];
  return EMPLOYMENT_TYPES.find((employmentType) => employmentType.id === mappingFound[1]);
};

export const POSITION_LEVELS = [
  {id: 1, description: 'Senior Management'},
  {id: 2, description: 'Middle Management'},
  {id: 3, description: 'Manager'},
  {id: 6, description: 'Operational'},
  {id: 7, description: 'Professional'},
  {id: 8, description: 'Senior Executive'},
  {id: 9, description: 'Executive'},
  {id: 10, description: 'Junior Executive'},
  {id: 11, description: 'Non-executive'},
  {id: 12, description: 'Fresh / Entry level'},
];

// there is no mapping for operational
const POSITION_LEVELS_MAPPING_TABLE: Array<[number, number]> = [
  [357009, 8],
  [357008, 10],
  [357007, 11],
  [357003, 3],
  [357006, 9],
  [357004, 12],
  [357005, 7],
  [357002, 2],
  [357001, 1],
];

export const mapIcmsToMsfPositionLevels = (id: number) => {
  const mappingFound = POSITION_LEVELS_MAPPING_TABLE.find((mapping) => mapping[0] === id) || [];
  return POSITION_LEVELS.find((positionLevel) => positionLevel.id === mappingFound[1]);
};
