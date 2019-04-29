// data used by MCF PRODUCT, following the specific order required by UIs

import {
  EMPLOYMENT_TYPES as MSF_EMPLOYMENT_TYPES,
  JOB_CATEGORIES as MSF_JOB_CATEGORIES,
  POSITION_LEVELS as MSF_POSITION_LEVELS,
} from './msf';

const isEmploymentType = (employmentType?: IEmploymentType): employmentType is IEmploymentType =>
  employmentType !== undefined && !!employmentType.id && !!employmentType.employmentType;

const isPositionLevel = (positionLevel?: IPositionLevel): positionLevel is IPositionLevel =>
  positionLevel !== undefined && !!positionLevel.id && !!positionLevel.position;

/*************************************
 * Employment types
 *************************************/
const MCF_EMPLOYMENT_TYPES_ORDER = ['Permanent', 'Full Time', 'Part Time', 'Contract', 'Flexi-work', 'Temporary'];

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
interface IJobCategory {
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
