import {JOB_STATUS, JOB_STATUSES as MCF_JOB_STATUSES} from '../mcf';
import {JOB_STATUSES as ICMS_JOB_STATUSES} from '../icms';

const ICMS_MCF_JOB_STATUSES_MAPPING_TABLE: Array<[number, JOB_STATUS]> = [[9, 1], [83, 2], [102, 3], [103, 4]];

const map = <T extends {id: any}>(
  mappings: Array<[string | number, string | number]>,
  targetCollection: T[],
  id,
  {sourceIndex = 0, targetIndex = 1} = {},
) => {
  const mappingFound = mappings.find((mapping) => mapping[sourceIndex] === id) || [];
  return targetCollection.find((item) => item.id === mappingFound[targetIndex]);
};

export const mapIcmsToMcfJobStatuses = (id: number) => map(ICMS_MCF_JOB_STATUSES_MAPPING_TABLE, MCF_JOB_STATUSES, id);

export const mapMcfToIcmsJobStatuses = (id: JOB_STATUS) =>
  map(ICMS_MCF_JOB_STATUSES_MAPPING_TABLE, ICMS_JOB_STATUSES, id, {sourceIndex: 1, targetIndex: 0});
