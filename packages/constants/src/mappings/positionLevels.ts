import {POSITION_LEVELS as MCF_POSITION_LEVELS} from '../mcf';
import {POSITION_LEVELS as ICMS_POSITION_LEVELS} from '../icms';
import {POSITION_LEVELS as MSF_POSITION_LEVELS} from '../msf';

// ICMS <-> MCF transformation
const ICMS_MCF_MAPPING_TABLE: Array<[number, number]> = [
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

const map = <T>(
  mappings: Array<[string | number, string | number]>,
  targetCollection: T[],
  id,
  {sourceIndex = 0, targetIndex = 1, key: targetKey = 'id'} = {},
) => {
  const mappingFound = mappings.find((mapping) => mapping[sourceIndex] === id) || [];
  return targetCollection.find((employmentType) => employmentType[targetKey] === mappingFound[targetIndex]);
};

export const mapIcmsToMcfPositionLevel = (id: number) => map(ICMS_MCF_MAPPING_TABLE, MCF_POSITION_LEVELS, id);

export const mapMcfToIcmsPositionLevel = (id: number) =>
  map(ICMS_MCF_MAPPING_TABLE, ICMS_POSITION_LEVELS, id, {sourceIndex: 1, targetIndex: 0});

// MCF <-> MSF transformation
export const mapMsfToMcfPositionLevel = (id: number) =>
  MCF_POSITION_LEVELS.find((employmentType) => employmentType.id === id);
export const mapMcfToMsfPositionLevel = (id: number) =>
  MSF_POSITION_LEVELS.find((employmentType) => employmentType.jobLevelCode === id);
