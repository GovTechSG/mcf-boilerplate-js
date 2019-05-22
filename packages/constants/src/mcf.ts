// data used by MCF PRODUCT, following the specific order required by UIs

import {
  DISTRICTS as MSF_DISTRICTS,
  EMPLOYMENT_TYPES as MSF_EMPLOYMENT_TYPES,
  JOB_CATEGORIES as MSF_JOB_CATEGORIES,
  JOB_STATUSES as MSF_JOB_STATUSES,
  POSITION_LEVELS as MSF_POSITION_LEVELS,
} from './msf';
import {mapMcfToIcmsDistrict} from './mappings/districts';

const isEmploymentType = (employmentType?: IEmploymentType): employmentType is IEmploymentType =>
  employmentType !== undefined && !!employmentType.id && !!employmentType.employmentType;

const isPositionLevel = (positionLevel?: IPositionLevel): positionLevel is IPositionLevel =>
  positionLevel !== undefined && !!positionLevel.id && !!positionLevel.position;

/*************************************
 * Employment types
 *************************************/
const MCF_EMPLOYMENT_TYPES_ORDER = [
  'Permanent',
  'Full Time',
  'Part Time',
  'Contract',
  'Flexi-work',
  'Temporary',
  'Freelance',
  'Internship',
];

export interface IEmploymentType {
  id: number;
  employmentType: string;
}

const mapMsfToMcfEmploymentTypes = () => {
  const transformedMsfEmploymentTypes = MSF_EMPLOYMENT_TYPES.map(
    (employmentType): IEmploymentType => {
      // transform Flexi Work (MSF) to Flexi-work (MCF)
      if (employmentType.ilpDescription === 'Flexi Work') {
        return {id: parseInt(employmentType.ilpId, 10), employmentType: 'Flexi-work'};
      }
      // transform Contract Basis (MSF) to Contract (MCF)
      if (employmentType.ilpDescription === 'Contract Basis') {
        return {id: parseInt(employmentType.ilpId, 10), employmentType: 'Contract'};
      }
      return {id: parseInt(employmentType.ilpId, 10), employmentType: employmentType.ilpDescription};
    },
  );
  // transform expected ordered mcf employment to msf format by mapping by name
  return (
    MCF_EMPLOYMENT_TYPES_ORDER.map((name) =>
      transformedMsfEmploymentTypes.find(({employmentType}) => employmentType === name),
    ).filter(isEmploymentType) || []
  );
};
export const EMPLOYMENT_TYPES: IEmploymentType[] = mapMsfToMcfEmploymentTypes();

/*************************************
 * Position levels
 *************************************/
const MCF_POSITION_LEVELS_ORDER = [
  'Senior Management',
  'Middle Management',
  'Manager',
  'Professional',
  'Senior Executive',
  'Executive',
  'Junior Executive',
  'Non-executive',
  'Fresh/entry level',
];
export interface IPositionLevel {
  id: number;
  position: string;
}
const mapMsfToMcfPositionLevels = () => {
  const transformedMsfPositionLevels = MSF_POSITION_LEVELS.map(
    (positionLevel): IPositionLevel => {
      // transform Fresh / Entry level (MSF) to Fresh/entry level (MCF)
      if (positionLevel.description === 'Fresh / Entry level') {
        return {id: positionLevel.jobLevelCode, position: 'Fresh/entry level'};
      }
      return {id: positionLevel.jobLevelCode, position: positionLevel.description};
    },
  );
  return (
    MCF_POSITION_LEVELS_ORDER.map((name) =>
      transformedMsfPositionLevels.find(({position}) => position === name),
    ).filter(isPositionLevel) || []
  );
};

export const POSITION_LEVELS: IPositionLevel[] = mapMsfToMcfPositionLevels();

/*************************************
 * Job categories
 *************************************/
export interface IJobCategory {
  id: number;
  category: string;
}
const mapIcmsToMcfJobCategories = () => {
  const transformedMsfJobCategories = MSF_JOB_CATEGORIES.map(
    (jobCategory): IJobCategory => {
      return {id: jobCategory.jobCategoryId, category: jobCategory.jobCategoryName};
    },
  );

  return transformedMsfJobCategories
    .filter(({category}) => category !== 'Others')
    .sort((a, b) => a.category.localeCompare(b.category))
    .concat(transformedMsfJobCategories.find(({category}) => category === 'Others') || []);
};
export const JOB_CATEGORIES: IJobCategory[] = mapIcmsToMcfJobCategories();

/*************************************
 * Schemes
 *************************************/
export interface IScheme {
  id: number;
  scheme: string;
}
// no auto conversion from MSF for the moment
export const SCHEMES = [
  {id: 1, scheme: 'P-Max', start_date: '1977-05-25', expiry_date: '2055-05-04'},
  {id: 2, scheme: 'Professional Conversion Programme (PCP)', start_date: '1977-05-25', expiry_date: '2055-05-04'},
  {id: 3, scheme: 'Career Trial', start_date: '1977-05-25', expiry_date: '2055-05-04'},
  {id: 4, scheme: 'Career Support', start_date: '1977-05-25', expiry_date: '2055-05-04'},
];

/*************************************
 * Job Statuses
 *************************************/
export interface IJobStatus {
  id: number;
  status: string;
}
export const JOB_STATUSES: IJobStatus[] = MSF_JOB_STATUSES;

/*************************************
 * Districts
 *************************************/
export interface IDistrict {
  id: number;
  location: string;
  region: string;
  sectors: string[];
}
const mapMsfToMcfDistricts = () => {
  return MSF_DISTRICTS.map((district) => {
    const icmsDistrict = mapMcfToIcmsDistrict(district.district);
    const districtIdsWithoutSectors = [998, 999];
    return {
      id: district.district,
      location: district.location,
      region: icmsDistrict ? icmsDistrict.region : district.location,
      sectors: districtIdsWithoutSectors.includes(district.district)
        ? []
        : district.sector.split(',').map((sector) => sector.trim()),
    };
  });
};
export const DISTRICTS: IDistrict[] = mapMsfToMcfDistricts();
