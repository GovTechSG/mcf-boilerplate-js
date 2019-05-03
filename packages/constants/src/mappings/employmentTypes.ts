import {EMPLOYMENT_TYPES as MCF_EMPLOYMENT_TYPES} from '../mcf';
import {EMPLOYMENT_TYPES as ICMS_EMPLOYMENT_TYPES} from '../icms';
import {EMPLOYMENT_TYPES as MSF_EMPLOYMENT_TYPES} from '../msf';

// ICMS <-> MCF transformation
const ICMS_MCF_MAPPING_TABLE: Array<[number, number]> = [
  [440002, 5],
  [440003, 7],
  [440004, 2],
  [440005, 3],
  [440006, 6],
  [440007, 8],
  [440008, 9],
  [440009, 10],
];

const map = <T extends {id: any}>(
  mappings: Array<[string | number, string | number]>,
  targetCollection: T[],
  id,
  {sourceIndex = 0, targetIndex = 1} = {},
) => {
  const mappingFound = mappings.find((mapping) => mapping[sourceIndex] === id) || [];
  return targetCollection.find((item) => item.id === mappingFound[targetIndex]);
};

export const mapIcmsToMcfEmploymentType = (id: number) => map(ICMS_MCF_MAPPING_TABLE, MCF_EMPLOYMENT_TYPES, id);

export const mapMcfToIcmsEmploymentType = (id: number) =>
  map(ICMS_MCF_MAPPING_TABLE, ICMS_EMPLOYMENT_TYPES, id, {sourceIndex: 1, targetIndex: 0});

// MCF <-> MSF transformation
export const mapMsfToMcfEmploymentType = (id: string) =>
  MCF_EMPLOYMENT_TYPES.find((employmentType) => employmentType.id === parseInt(id, 10));

export const mapMcfToMsfEmploymentType = (id: number) =>
  MSF_EMPLOYMENT_TYPES.find((employmentType) => parseInt(employmentType.ilpId, 10) === id);
