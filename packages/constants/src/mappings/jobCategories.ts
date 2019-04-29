import {JOB_CATEGORIES as MCF_JOB_CATEGORIES} from '../mcf';
import {JOB_CATEGORIES as ICMS_JOB_CATEGORIES} from '../icms';
import {JOB_CATEGORIES as MSF_JOB_CATEGORIES} from '../msf';

// ICMS <-> MCF transformation
const ICMS_MCF_JOB_CATEGORIES_MAPPING_TABLE: Array<[number, number]> = [
  [532010, 8],
  [532022, 21],
  [532042, 40],
  [532002, 2],
  [532008, 6],
  [532012, 10],
  [532038, 35],
  [532030, 41],
  [532035, 32],
  [532013, 11],
  [532003, 3],
  [532016, 14],
  [532028, 26],
  [532011, 9],
  [532033, 30],
  [532001, 1],
  [532021, 20],
  [532039, 36],
  [532031, 28],
  [532025, 24],
  [532019, 18],
  [532017, 15],
  [532029, 27],
  [532005, 7],
  [532006, 34],
  [532032, 29],
  [532023, 22],
  [532041, 39],
  [532009, 38],
  [532040, 37],
  [532026, 16],
  [532027, 25],
  [532007, 5],
  [532020, 19],
  [532018, 17],
  [532036, 33],
  [532004, 4],
  [532015, 13],
  [532034, 31],
  [532024, 23],
  [532014, 12],
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

export const mapIcmsToMcfJobCategory = (id: number) =>
  map(ICMS_MCF_JOB_CATEGORIES_MAPPING_TABLE, MCF_JOB_CATEGORIES, id);

export const mapMcfToIcmsJobCategory = (id: number) =>
  map(ICMS_MCF_JOB_CATEGORIES_MAPPING_TABLE, ICMS_JOB_CATEGORIES, id, {sourceIndex: 1, targetIndex: 0});

// MCF <-> MSF transformation
export const mapMsfToMcfJobCategory = (id: number) => MCF_JOB_CATEGORIES.find((jobCategory) => jobCategory.id === id);
export const mapMcfToMsfJobCategory = (id: number) =>
  MSF_JOB_CATEGORIES.find((jobCategory) => jobCategory.jobCategoryId === id);
