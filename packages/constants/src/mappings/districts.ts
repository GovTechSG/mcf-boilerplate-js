import {DISTRICTS as MCF_DISTRICTS} from '../mcf';
import {DISTRICTS as ICMS_DISTRICTS} from '../icms';
import {DISTRICTS as MSF_DISTRICTS} from '../msf';

// ICMS <-> MCF transformation
const ICMS_MCF_MAPPING_TABLE: Array<[number, number]> = [
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6],
  [7, 7],
  [8, 8],
  [9, 9],
  [10, 10],
  [11, 11],
  [12, 12],
  [13, 13],
  [14, 14],
  [15, 15],
  [16, 16],
  [17, 17],
  [18, 18],
  [19, 19],
  [20, 20],
  [21, 21],
  [22, 22],
  [23, 23],
  [24, 24],
  [25, 25],
  [26, 26],
  [27, 27],
  [27, 27],
  [28, 28],
  [28, 28],
  [9999, 998],
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

export const mapIcmsToMcfDistrict = (id: number) => map(ICMS_MCF_MAPPING_TABLE, MCF_DISTRICTS, id);

export const mapMcfToIcmsDistrict = (id: number) =>
  map(ICMS_MCF_MAPPING_TABLE, ICMS_DISTRICTS, id, {sourceIndex: 1, targetIndex: 0});

// MCF <-> MSF transformation
export const mapMsfToMcfDistrict = (id: number) => MCF_DISTRICTS.find((district) => district.id === id);

export const mapMcfToMsfDistrict = (id: number) => MSF_DISTRICTS.find((district) => district.district === id);
