// data used by MCF PRODUCT, following the specific order required by UIs

import {
  COMPANY_REGISTRATION_TYPES as MSF_COMPANY_REGISTRATION_TYPES,
  COUNTRIES as MSF_COUNTRIES,
  DISTRICTS as MSF_DISTRICTS,
  EMPLOYMENT_TYPES as MSF_EMPLOYMENT_TYPES,
  JOB_CATEGORIES as MSF_JOB_CATEGORIES,
  JOB_STATUSES as MSF_JOB_STATUSES,
  POSITION_LEVELS as MSF_POSITION_LEVELS,
  SALARY_TYPES as MSF_SALARY_TYPES,
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
export enum SCHEME_ID {
  P_MAX = 1,
  PCP = 2,
  CAREER_TRIAL = 3,
  CAREER_SUPPORT = 4,
}

export interface IScheme {
  id: number;
  scheme: string;
  startDate: string;
  expiryDate: string;
  link: string;
}
// no auto conversion from MSF for the moment
export const SCHEMES: IScheme[] = [
  {
    id: 1,
    scheme: 'P-Max',
    startDate: '1977-05-25',
    expiryDate: '2055-05-04',
    link: 'http://www.wsg.gov.sg/programmes-and-initiatives/p-max-employer.html',
  },
  {
    id: 2,
    scheme: 'Professional Conversion Programme',
    startDate: '1977-05-25',
    expiryDate: '2055-05-04',
    link: 'http://www.wsg.gov.sg/programmes-and-initiatives/professional-conversion-programmes-employers.html',
  },
  {
    id: 3,
    scheme: 'Career Trial',
    startDate: '1977-05-25',
    expiryDate: '2055-05-04',
    link: 'http://www.wsg.gov.sg/programmes-and-initiatives/career-trial-employers.html',
  },
  {
    id: 4,
    scheme: 'Career Support Programme',
    startDate: '1977-05-25',
    expiryDate: '2055-05-04',
    link: 'http://www.wsg.gov.sg/programmes-and-initiatives/wsg-career-support-programme-employers.html',
  },
];

/*************************************
 * Job Statuses
 *************************************/
export enum JOB_STATUS {
  CLOSED = 1,
  DRAFT = 2,
  OPEN = 3,
  REOPEN = 4,
}
export interface IJobStatus {
  id: JOB_STATUS;
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

/*************************************
 * Countries
 *************************************/
export interface ICountry {
  code: string;
  description: string;
  codeNumber: number;
}
const countryCodeNumberCorrections = [
  {code: 'AI', codeNumber: 1},
  {code: 'IO', codeNumber: 246},
  {code: 'CX', codeNumber: 61},
  {code: 'CC', codeNumber: 61},
  {code: 'TP', codeNumber: 670},
  {code: 'GK', codeNumber: 44},
  {code: 'HK', codeNumber: 852},
  {code: 'MM', codeNumber: 44},
  {code: 'JM', codeNumber: 1},
  {code: 'KV', codeNumber: 383},
  {code: 'MO', codeNumber: 853},
  {code: 'ME', codeNumber: 262},
  {code: 'BU', codeNumber: 95},
  {code: 'PB', codeNumber: 970},
  {code: 'PN', codeNumber: 64},
  {code: 'RF', codeNumber: 7},
  {code: 'TI', codeNumber: 992},
  {code: 'US', codeNumber: 1},
  {code: 'VA', codeNumber: 39},
  {code: 'WK', codeNumber: 1},
  {code: 'ZR', codeNumber: 243},
];
const mapMsfToMcfCountries = () => {
  return MSF_COUNTRIES.map((country) => {
    const countryCodeNumberCorrection = countryCodeNumberCorrections.find(
      (codeCorrection) => codeCorrection.code === country.countryCode,
    );
    const codeNumber =
      (countryCodeNumberCorrection && countryCodeNumberCorrection.codeNumber) || country.countryCodeNumber;
    return {code: country.countryCode, description: country.description, codeNumber};
  });
};
export const COUNTRIES: ICountry[] = mapMsfToMcfCountries();

/*************************************
 * Salary Types
 *************************************/
export enum SALARY_TYPE {
  MONTHLY = 4,
  ANNUAL = 5,
}
export interface ISalaryType {
  id: SALARY_TYPE;
  salaryType: string;
}
const mapMsfToMcfSalaryTypes = () => {
  return MSF_SALARY_TYPES.map((salaryType) => ({id: salaryType.salaryTypeId, salaryType: salaryType.description}));
};
export const SALARY_TYPES: ISalaryType[] = mapMsfToMcfSalaryTypes();

/*************************************
 * Company Registration Types
 *************************************/
export interface ICompanyRegistrationType {
  id: number;
  registrationType: string;
}
const mapMsfToMcfCompanyRegistrationTypes = () => {
  return MSF_COMPANY_REGISTRATION_TYPES.map((registrationType) => ({
    id: registrationType.registrationTypeCode,
    registrationType: registrationType.description,
  }));
};
export const COMPANY_REGISTRATION_TYPES: ICompanyRegistrationType[] = mapMsfToMcfCompanyRegistrationTypes();

/*************************************
 * Company Address Purpose
 *************************************/
export enum COMPANY_ADDRESS_PURPOSE {
  REGISTERED,
  OPERATING,
  CORRESPONDENCE,
}
export interface ICompanyAddressPurpose {
  id: COMPANY_ADDRESS_PURPOSE;
  purpose: string;
}
export const COMPANY_ADDRESS_PURPOSES: ICompanyAddressPurpose[] = [
  {id: COMPANY_ADDRESS_PURPOSE.REGISTERED, purpose: 'registered'},
  {id: COMPANY_ADDRESS_PURPOSE.OPERATING, purpose: 'operating'},
  {id: COMPANY_ADDRESS_PURPOSE.CORRESPONDENCE, purpose: 'correspondence'},
];

/*************************************
 * Job Screening Question Response
 *************************************/

export enum SCREEN_QUESTION_RESPONSE {
  YES,
  NO
}
export interface IScreeningQuestionResponse {
  label: string;
  value: string;
}
export const getScreeningQuestionResponse = (response: SCREEN_QUESTION_RESPONSE): IScreeningQuestionResponse => {
  switch (response) {
    case SCREEN_QUESTION_RESPONSE.YES:
        return {label: 'Yes' , value: 'yes'};
    case SCREEN_QUESTION_RESPONSE.NO:
        return {label: 'No', value: 'no'};
  }
}
