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

const map = <T>(
  mappings: Array<[string | number, string | number]>,
  targetCollection: T[],
  id,
  {sourceIndex = 0, targetIndex = 1, key: targetKey = 'id'} = {},
) => {
  const mappingFound = mappings.find((mapping) => mapping[sourceIndex] === id) || [];
  return targetCollection.find((employmentType) => employmentType[targetKey] === mappingFound[targetIndex]);
};

export const mapIcmsToMcfEmploymentType = (id: number) => map(ICMS_MCF_MAPPING_TABLE, MCF_EMPLOYMENT_TYPES, id);

export const mapMcfToIcmsEmploymentType = (id: number) =>
  map(ICMS_MCF_MAPPING_TABLE, ICMS_EMPLOYMENT_TYPES, id, {sourceIndex: 1, targetIndex: 0});

// MCF <-> MSF transformation
const MSF_MCF_MAPPING_TABLE: Array<[string, number]> = [
  ['05', 5],
  ['07', 7],
  ['02', 2],
  ['03', 3],
  ['06', 6],
  ['08', 8],
  ['09', 9],
  ['10', 10],
];

export const mapMsfToMcfEmploymentType = (id: string) => map(MSF_MCF_MAPPING_TABLE, MCF_EMPLOYMENT_TYPES, id);

export const mapMcfToMsfEmploymentType = (id: number) =>
  map(MSF_MCF_MAPPING_TABLE, MSF_EMPLOYMENT_TYPES, id, {sourceIndex: 1, targetIndex: 0, key: 'ilpId'});
