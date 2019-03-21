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

export const mapIcmsToMsf = (id: number) => {
  const mappingFound = EMPLOYMENT_TYPES_MAPPING_TABLE.find((mapping) => mapping[0] === id) || [];
  return EMPLOYMENT_TYPES.find((employmentType) => employmentType.id === mappingFound[1]);
};
