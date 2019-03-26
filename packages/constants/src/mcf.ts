// data used by MCF PRODUCT, following the specific order required by UIs

import {
  EMPLOYMENT_TYPES as ICMS_EMPLOYMENT_TYPES,
  JOB_CATEGORIES as ICMS_JOB_CATEGORIES,
  POSITION_LEVELS as ICMS_POSITION_LEVELS,
} from './icms';

const isEmploymentType = (employmentType?: IEmploymentType): employmentType is IEmploymentType =>
  employmentType !== undefined && !!employmentType.id && !!employmentType.employmentType;

const isPositionLevel = (positionLevel?: IPositionLevel): positionLevel is IPositionLevel =>
  positionLevel !== undefined && !!positionLevel.id && !!positionLevel.position;

/*************************************
 * Employment types
 *************************************/
const MCF_EMPLOYMENT_TYPES_ORDER = ['Permanent', 'Full Time', 'Part Time', 'Contract', 'Flexi-work', 'Temporary'];

interface IEmploymentType {
  id: number;
  employmentType: string;
}

const mapIcmsToMcfEmploymentTypes = () => {
  // transform Flexi work (ICMS) to Flexi-work (MCF)
  const transformedIcmsEmploymentTypes = ICMS_EMPLOYMENT_TYPES.map(
    (employmentType): IEmploymentType => {
      if (employmentType.employmentType === 'Flexi work') {
        return {...employmentType, employmentType: 'Flexi-work'};
      }
      return employmentType;
    },
  );
  // transform expected ordered mcf employment to icms format by mapping by name
  return (
    MCF_EMPLOYMENT_TYPES_ORDER.map((name) =>
      transformedIcmsEmploymentTypes.find((employmentType) => employmentType.employmentType === name),
    ).filter(isEmploymentType) || []
  );
};
export const EMPLOYMENT_TYPES: IEmploymentType[] = mapIcmsToMcfEmploymentTypes();

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
interface IPositionLevel {
  id: number;
  position: string;
}
const mapIcmsToMcfPositionLevels = () => {
  return (
    MCF_POSITION_LEVELS_ORDER.map((name) =>
      ICMS_POSITION_LEVELS.find((employmentType) => employmentType.position === name),
    ).filter(isPositionLevel) || []
  );
};

export const POSITION_LEVELS: IPositionLevel[] = mapIcmsToMcfPositionLevels();

/*************************************
 * Job categories
 *************************************/
interface IJobCategory {
  id: number;
  category: string;
}
const mapIcmsToMcfJobCategories = () => {
  return ICMS_JOB_CATEGORIES.filter((jobCategory: IJobCategory) => jobCategory.category !== 'Others')
    .sort((a, b) => a.category.localeCompare(b.category))
    .concat(ICMS_JOB_CATEGORIES.find((jobCategory: IJobCategory) => jobCategory.category === 'Others') || []);
};
export const JOB_CATEGORIES: IJobCategory[] = mapIcmsToMcfJobCategories();
