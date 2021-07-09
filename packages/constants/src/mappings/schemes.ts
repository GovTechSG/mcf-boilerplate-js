import {SCHEMES as MCF_SCHEMES} from '../mcf';
import {SCHEMES as MSF_SCHEMES} from '../msf';
import {SCHEMES as ICMS_SCHEMES} from '../icms';

// ICMS <-> MCF transformation
const ICMS_MCF_MAPPING_TABLE: Array<[number, number]> = [
  [541001, 4],
  [541002, 2],
  [541003, 1],
  [541005, 3],
  [541006, 5],
  [541007, 6],
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

export const mapIcmsToMcfScheme = (id: number) => map(ICMS_MCF_MAPPING_TABLE, MCF_SCHEMES, id);

export const mapMcfToIcmsScheme = (id: number) =>
  map(ICMS_MCF_MAPPING_TABLE, ICMS_SCHEMES, id, {sourceIndex: 1, targetIndex: 0});

// MCF <-> MSF transformation
const MCF_MSF_MAPPING_TABLE: Array<[number, string]> = [
  [1, '02'],
  [2, '05'],
  [3, '06'],
  [4, '01'],
  [5, '07'],
  [6, '08'],
];
export const mapMcfToMsfScheme = (id: number) => map(MCF_MSF_MAPPING_TABLE, MSF_SCHEMES, id);

export const mapMsfToMcfScheme = (id: string) =>
  map(MCF_MSF_MAPPING_TABLE, MCF_SCHEMES, id, {sourceIndex: 1, targetIndex: 0});
