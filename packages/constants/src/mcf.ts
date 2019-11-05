// data used by MCF PRODUCT, following the specific order required by UIs

import {flow} from 'lodash';
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
import {STOP_WORDS} from './stopwordList';


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
 * Job Application Statuses
 *************************************/

export enum JOB_APPLICATION_STATUS {
  NOT_SENT = 0,
  UNDER_REVIEW,
  SUCCESSFUL,
  UNSUCCESSFUL,
  RECEIVED,
  WITHDRAWN,
}

export const JOB_APPLICATION_STATUSES = {
  [JOB_APPLICATION_STATUS.NOT_SENT]: 'Not Sent',
  [JOB_APPLICATION_STATUS.UNDER_REVIEW]: 'Under Review',
  [JOB_APPLICATION_STATUS.SUCCESSFUL]: 'Successful',
  [JOB_APPLICATION_STATUS.UNSUCCESSFUL]: 'Unsuccessful',
  [JOB_APPLICATION_STATUS.RECEIVED]: 'Received',
  [JOB_APPLICATION_STATUS.WITHDRAWN]: 'Withdrawn',
};

/*************************************
 * SSECE EQA List (Education)
 * Extracted from https://www.singstat.gov.sg/-/media/files/standards_and_classifications/educational_classification/ssec2015-report.pdf
 *************************************/

export interface ISsecEqa {
  code: string;
  description: string;
}
export const SSEC_EQA_LIST: ISsecEqa[] = [
  {code: '01', description: 'Never attended school'},
  {code: '02', description: 'Pre-primary / Kindergarten education'},
  {code: '03', description: 'Primary education without PSLE / PSPE certification or their equivalent'},
  {code: '04', description: 'Certificate in BEST 1-3'},
  {
    code: '11',
    description:
      'Primary School Leaving Certificate (PSLE) / Primary School Proficiency Certificate (PSPE) or other certificates of equivalent standard',
  },
  {code: '12', description: 'Certificate in BEST 4'},
  {
    code: '13',
    description:
      'At least 3 WSQ Statements of Attainment in Workplace Literacy or Numeracy (WPLN) at Level 1 or 2 (eg under ESS, ES)',
  },
  {code: '21', description: `Secondary education without a GCE 'O' / 'N' Level pass or their equivalent`},
  {code: '22', description: 'Certificate in WISE 1-3'},
  {code: '23', description: 'Basic vocational certificates (including ITE Basic Vocational Training)'},
  {
    code: '24',
    description:
      'At least 3 WSQ Statements of Attainment in Workplace Literacy or Numeracy (WPLN) at Level 3 or 4 (eg under ESS, ES)',
  },
  {code: '31', description: `At least 1 GCE 'N' Level pass`},
  {code: '32', description: `At least 1 GCE 'O' Level pass`},
  {
    code: '33',
    description:
      'National ITE Certificate (Intermediate) or equivalent (eg National Technical Certificate Grade 3, Certificate of Vocational Training, BCA Builder Certificate)',
  },
  {
    code: '34',
    description:
      'ITE Skills Certificate (ISC) or equivalent (eg Certificate of Competency, Certificate in Service Skills)',
  },
  {
    code: '35',
    description:
      'At least 3 WSQ Statements of Attainment in Workplace Literacy or Numeracy (WPLN) at Level 5 and above (eg under ESS, ES)',
  },
  {code: '39', description: 'Other certificates or qualifications of equivalent standard (secondary) n.e.c.'},
  {code: '41', description: `At least 1 GCE 'A'/'H2' Level pass or equivalent (General)`},
  {
    code: '42',
    description:
      'National ITE Certificate (Nitec) or equivalent (eg Post Nitec Certificate, Specialist Nitec, Certificate in Office Skills, National Technical Certificate Grade 2, National Certificate in Nursing, Advanced  Builder Certificate) ',
  },
  {
    code: '43',
    description:
      'Higher Nitec, including Certificate in Business Skills, Industrial Technician Certificate and other polytechnic certificates',
  },
  {code: '44', description: 'Master Nitec or equivalent (eg National Technical Certificate Grade 1)'},
  {code: '45', description: 'WSQ Certificate or equivalent'},
  {code: '46', description: 'WSQ Higher Certificate or equivalent'},
  {code: '47', description: 'WSQ Advanced Certificate or equivalent'},
  {
    code: '48',
    description:
      'Other post-secondary (non-tertiary; General) qualifications, including International Baccalaureate / High School Diploma',
  },
  {
    code: '49',
    description: 'Other post-secondary (non-tertiary; Vocational) certificates (eg SIM certificates) qualifications',
  },
  {code: '51', description: 'Polytechnic diploma'},
  {
    code: '52',
    description:
      'Polytechnic advanced diploma (including polytechnic advanced/post/ specialist/management/graduate diploma)',
  },
  {code: '61', description: 'ITE diploma'},
  {
    code: '62',
    description: 'Diploma qualifications (eg NIE diploma, SIM diploma, LaSalle-SIA diploma, NAFA diploma)',
  },
  {code: '63', description: 'Qualifications awarded by professional bodies'},
  {code: '64', description: 'WSQ diploma'},
  {code: '65', description: 'WSQ specialist diploma'},
  {code: '69', description: 'Other advanced diploma, post-diploma qualifications or equivalent n.e.c.'},
  {code: '70', description: `Bachelor's degree or equivalent`},
  {code: '81', description: 'Postgraduate diploma (including NIE postgraduate diploma)'},
  {code: '82', description: 'WSQ graduate certificate'},
  {code: '83', description: 'WSQ graduate diploma'},
  {code: '91', description: `Master's or equivalent`},
  {code: '92', description: 'Doctorate or equivalent'},
  {
    code: 'N1',
    description:
      'At least 1 WSQ Statement of Attainment or ITE modular certificate at Post-Secondary Level (Non-Tertiary) or equivalent',
  },
  {
    code: 'N2',
    description: 'At least 1 WSQ Statement of Attainment or other modular certificate at Diploma Level or equivalent',
  },
  {
    code: 'N3',
    description: 'At least 1 WSQ Statement of Attainment or other modular certificate at Degree Level or equivalent',
  },
  {
    code: 'N4',
    description:
      'At least 1 WSQ Statement of Attainment or other modular certificate at Postgraduate Level or equivalent',
  },
  {code: 'N9', description: 'Other Statement of Attainment, modular certificate or equivalent n.e.c.'},
  {code: 'XX', description: 'Not reported'},
];


const removeStopWords = (str = '') => {
  const strArr = str.split(' ');
  const sanitisedArr = remove(strArr, (word) => {
    return !STOP_WORDS.includes(word);
  });
  return sanitisedArr.join(' ');
};

const removeWordsInBracket = (str = '') => {
  const re = /\(.*?\)/gi;
  return str.replace(re, '');
};

const removePunctuations = (str = '') => {
  // '-' is ignored in this case
  const re = /[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=]/g;
  return str.replace(re, '');
};

const removeExcessWhitespaces = (str = '') => {
  const re = /\s+/g;
  return str.replace(re, ' ');
};

const removeRepeatedHyphens = (str = '') => {
  const re = /\-+/g;
  return str.replace(re, '-');
};

const joinWords = (str = '') => {
  const re = /\s/g;
  return str.trim().replace(re, '-');
};

const cleanWord = (str) => {
  const currentStr = `${(str || '').toLowerCase()}`;
  return flow(
    removeWordsInBracket,
    removeStopWords,
    removePunctuations,
    removeExcessWhitespaces,
    joinWords,
    removeRepeatedHyphens,
    encodeURIComponent,
  )(currentStr);
};

const pathToJobId = (path) => {
  // Sanitize path to remove last character if last character is `/`
  const parsedPath = path.substr(-1) === '/' ? path.slice(0, -1) : path;
  const regexExp = /job\/(?:.*-)?(.*)/i;
  const groups = regexExp.exec(parsedPath);
  // length - 1 is to find the uuid, since it will always be the last one is in the group
  // split('/') will handle the case where the url end with `/apply` in the case of job application
  const jobId = groups && groups[groups.length - 1] ? groups[groups.length - 1].split('/') : null;
  // same apply here as well
  return jobId && (jobId[jobId.length - 1] === 'apply' ? jobId[jobId.length - 2] : jobId[jobId.length - 1]);
};

const isJobApplicationPath = (path) => {
  const regexExp = /\/apply\/?$/;
  const groups = regexExp.exec(path);
  return groups ? true : false;
};

const pathToJobAlertChecksum = (path) => {
  const regexExp = /jobalert\/remove\/(?:.*-)?(.*$)/i;
  const checksum = regexExp.exec(path);
  return checksum && checksum[1] ? checksum[1] : null;
};

const getCategoryByLabel = (label) => Object.keys(CATEGORY).find((category) => CATEGORY[category].label === label);


export const CATEGORY = {
  ACCOUNTING_AUDITING_TAXATION: new CategoryKey(
    'accounting_auditing_taxation',
    'Accounting / Auditing / Taxation',
    'Accounting / Auditing / Taxation',
    'accounting',
    'Accounting jobs in Singapore remain high in demand as the finance sector continues to play a key role in economic growth. Apply for accounting jobs today.',
    'Accounting Jobs in Singapore | Singapore CPA & Entry Level Accounting Jobs',
    CATEGORY_DESCRIPTION.ACCOUNTING_AUDITING_TAXATION,
  ),
  ADMIN_SECRETARIAL: new CategoryKey(
    'admin_secretarial',
    'Admin / Secretarial',
    'Admin / Secretarial',
    'admin',
    'Be the driving force behind vital operations in every business. Full time or part time, all admin jobs in Singapore are available here. Learn more today.',
    'Admin Jobs in Singapore | Singapore Full Time & Part Time Admin Jobs',
    CATEGORY_DESCRIPTION.ADMIN_SECRETARIAL,
  ),
  ADVERTISING_MEDIA: new CategoryKey(
    'advertising_media',
    'Advertising / Media',
    'Advertising / Media',
    'advertising',
    'Look at the hottest jobs in Advertising in Singapore. MyCareersFuture lists a huge variety of jobs in Advertising across Singapore. View Now!',
    'Advertising Jobs in Singapore | Get A Job in Advertising Today!',
    CATEGORY_DESCRIPTION.ADVERTISING_MEDIA,
  ),
  ARCHITECTURE_INTERIOR_DESIGN: new CategoryKey(
    'architecture_interior_design',
    'Architecture / Interior Design',
    'Architecture / Interior Design',
    'architecture',
    'Singapore is a garden city with an expanding concrete jungle. If you are passionate about architecture and aspire to venture into the industry, check out our listings now.',
    'Jobs in Architecture Singapore | Get A Job in Architecture Singapore',
    CATEGORY_DESCRIPTION.ARCHITECTURE_INTERIOR_DESIGN,
  ),
  BANKING_AND_FINANCE: new CategoryKey(
    'banking_finance',
    'Banking and Finance',
    'Banking and Finance',
    'banking-finance',
    'Banking is one of the most in demand industries in Singapore. Browse the latest Job Opportunities in Singapore with My Careers Future.',
    'Banking & Finance Jobs in Singapore | Part Time & Contract Banking Jobs',
    CATEGORY_DESCRIPTION.BANKING_AND_FINANCE,
  ),
  BUILDING_AND_CONSTRUCTION: new CategoryKey(
    'building_construction',
    'Building and Construction',
    'Building and Construction',
    'building-construction',
    'Be part of a dynamic and rewarding career in building, construction and maintenance. Apply for building, maintenance or technician jobs in Singapore today!',
    'Building & Construction Jobs Singapore | Get A Job in Construction',
    CATEGORY_DESCRIPTION.BUILDING_AND_CONSTRUCTION,
  ),
  CONSULTING: new CategoryKey(
    'consulting',
    'Consulting',
    'Consulting',
    'consulting',
    'Consulting is a challenging career in Singapore with a wide variety of opportunities across different industries. Apply for Consulting Jobs Now!',
    'Consulting Jobs in Singapore | Management & Entry Level Consulting Jobs',
    CATEGORY_DESCRIPTION.CONSULTING,
  ),
  CUSTOMER_SERVICE: new CategoryKey(
    'customer_service',
    'Customer Service',
    'Customer Service',
    'customer-service',
    'Enjoy interacting with people? Pursue a rewarding career in customer service roles available across industries. Apply for customer service jobs in Singapore!',
    'Customer Service Jobs Singapore | Get A Job in Customer Service Today!',
    CATEGORY_DESCRIPTION.CUSTOMER_SERVICE,
  ),
  DESIGN: new CategoryKey(
    'design',
    'Design',
    'Design',
    'design',
    'From graphic to interior design, you can explore a range of design jobs across a variety of industries in Singapore. Browse on MyCareersFuture.sg today.',
    'Design Jobs Singapore | Get A Graphic, Interior Design Job in Singapore Today!',
    CATEGORY_DESCRIPTION.DESIGN,
  ),
  EDUCATION_AND_TRAINING: new CategoryKey(
    'education_training',
    'Education and Training',
    'Education and Training',
    'education-training',
    'Singapore prides itself on having a meritocratic education system. If you aspire to play your part in further enhancing the quality of education, check out the latest jobs!',
    'Education Jobs Singapore | Get A Job As A Teacher in Singapore',
    CATEGORY_DESCRIPTION.EDUCATION_AND_TRAINING,
  ),
  ENGINEERING: new CategoryKey(
    'engineering',
    'Engineering',
    'Engineering',
    'engineering',
    "My Careers Future hosts one of Singapore's largest Engineering Job offerings.  From Chemical Engineering to Mechanical - Apply Now!",
    'Engineering Jobs in Singapore| Jobs For Engineers in Singapore',
    CATEGORY_DESCRIPTION.ENGINEERING,
  ),
  ENTERTAINMENT: new CategoryKey(
    'entertainment',
    'Entertainment',
    'Entertainment',
    'entertainment',
    'If you are interested in joining the entertainment industry, you will need a drive to succeed, perseverance and a love for people. Check out opportunities in Singapore now.',
    'Jobs in Entertainment in Singapore | Entertainment Jobs in Singapore',
    CATEGORY_DESCRIPTION.ENTERTAINMENT,
  ),
  ENVIRONMENT_HEALTH: new CategoryKey(
    'environment_health',
    'Environment / Health',
    'Environment / Health',
    'environment',
    'Green jobs are booming in the corporate world now. Explore environmental career opportunities in Singapore as green economies continue growing in popularity.',
    'Built (BE) & Natural (NE) Environmental Jobs in Singapore',
    CATEGORY_DESCRIPTION.ENVIRONMENT_HEALTH,
  ),
  EVENTS_PROMOTIONS: new CategoryKey(
    'events_promotions',
    'Events / Promotions',
    'Events / Promotions',
    'events',
    'Want to join an events company in Singapore? We have the latest vacancies available. Click here to find out more about opportunities and events jobs in Singapore!',
    'Events Management Jobs in Singapore | Part Time Events Jobs in Singapore',
    CATEGORY_DESCRIPTION.EVENTS_PROMOTIONS,
  ),
  F_N_B: new CategoryKey(
    'f_n_b',
    'F&B',
    'F&B',
    'food-and-beverage',
    'Food & Beverage is known to be an exciting, fulfilling line of work. To get a job in F & B in Singapore, visit MyCareersFuture today!',
    'F&B Jobs in Singapore | Get A Job in Food & Beverage in Singapore',
    CATEGORY_DESCRIPTION.F_N_B,
  ),
  GENERAL_MANAGEMENT: new CategoryKey(
    'general_management',
    'General Management',
    'General Management',
    'general-management',
    'A career in general management allows you to join and grow in any industry. Search for general management jobs in Singapore on MyCareersFuture.sg portal!',
    'Apply General Management Jobs in Singapore | General Manager Jobs SG',
    CATEGORY_DESCRIPTION.GENERAL_MANAGEMENT,
  ),
  GENERAL_WORK: new CategoryKey(
    'general_work',
    'General Work',
    'General Work',
    'general-work',
    'General worker jobs in Singapore can introduce you to the workings of the industry and the chance to explore a career in the field. Search for jobs here.',
    'General Working Jobs in Singapore | Find A General Working Job in SG',
    CATEGORY_DESCRIPTION.GENERAL_WORK,
  ),
  HEALTHCARE_PHARMACEUTICAL: new CategoryKey(
    'healthcare_pharmaceutical',
    'Healthcare / Pharmaceutical',
    'Healthcare / Pharmaceutical',
    'healthcare',
    'Embark on a meaningful and rewarding career by applying to the healthcare sector in Singapore. Explore the wide range of healthcare jobs available today!',
    'Healthcare Jobs in Singapore | Healthcare Administration & Management Jobs',
    CATEGORY_DESCRIPTION.HEALTHCARE_PHARMACEUTICAL,
  ),
  HOSPITALITY: new CategoryKey(
    'hospitality',
    'Hospitality',
    'Hospitality',
    'hospitality',
    'Hospitality is known to be one of the most fun careers in Singapore.  If you enjoy entertaining & being around people, apply for our Hospitality Jobs Now!',
    'Hotel Job Vacancies in Singapore | Food & Beverage (F&B) Jobs in Singapore',
    CATEGORY_DESCRIPTION.HOSPITALITY,
  ),
  HUMAN_RESOURCES: new CategoryKey(
    'human_resources',
    'Human Resources',
    'Human Resources',
    'human-resources',
    'Love working with people? Passionate about problem-solving? MyCareersFuture.sg has human resources jobs available. Click here to view our listings now.',
    'HR Jobs Singapore | Jobs in Human Resources Across Singapore',
    CATEGORY_DESCRIPTION.HUMAN_RESOURCES,
  ),
  INFORMATION_TECHNOLOGY: new CategoryKey(
    'information_technology',
    'Information Technology',
    'Information Technology',
    'information-technology',
    "IT Jobs in Singapore are in the highest demand ever.  Join Singapore's fastest growing industry today by applying for Jobs listed on My Careers Future.",
    'Information Technology Jobs in Singapore | Part-time & Director IT Jobs',
    CATEGORY_DESCRIPTION.INFORMATION_TECHNOLOGY,
  ),
  INSURANCE: new CategoryKey(
    'insurance',
    'Insurance',
    'Insurance',
    'insurance',
    "As one of Singapore's biggest industries, Insurance jobs are readily available.  To view Singaporean Insurance Jobs, visit My Careers Future.",
    'General Insurance Jobs in Singapore | Part Time Insurance Jobs Singapore',
    CATEGORY_DESCRIPTION.INSURANCE,
  ),
  LEGAL: new CategoryKey(
    'legal',
    'Legal',
    'Legal',
    'legal',
    'Join the legal industry in Singapore and do your part for justice. Browse legal associate, counsel and secretarial jobs available in Singapore here!',
    'Legal Counsel Jobs in Singapore | Get A Job As A Lawyer in Singapore',
    CATEGORY_DESCRIPTION.LEGAL,
  ),
  LOGISTICS_SUPPLY_CHAIN: new CategoryKey(
    'logistics_supply_chain',
    'Logistics / Supply Chain',
    'Logistics / Supply Chain',
    'logistics',
    'Are you looking to start a career in the logistics and supply chain industry in Singapore? Look for suitable operational and managerial jobs here!',
    'Logistics & Supply Chain Jobs in Singapore | Logistics Management Careers',
    CATEGORY_DESCRIPTION.LOGISTICS_SUPPLY_CHAIN,
  ),
  MANUFACTURING: new CategoryKey(
    'manufacturing',
    'Manufacturing',
    'Manufacturing',
    'manufacturing',
    'Manufacturing remains one of Singapore’s biggest contributors in economic growth. Join the industry and build a stable career. Apply for manufacturing jobs today!',
    'Manufacturing Jobs Singapore | Get A Job in Manufacturing in Singapore',
    CATEGORY_DESCRIPTION.MANUFACTURING,
  ),
  MARKETING_PUBLIC_RELATIONS: new CategoryKey(
    'marketing_public_relations',
    'Marketing / Public Relations',
    'Marketing / Public Relations',
    'marketing',
    'Want a career in marketing? We have the latest opportunities in Singapore! Plus, get more information about what marketers do and how you can land jobs in marketing. Learn now.',
    'Marketing Jobs in Singapore | Digital & Social Media Marketing Jobs',
    CATEGORY_DESCRIPTION.MARKETING_PUBLIC_RELATIONS,
  ),
  MEDICAL_THERAPY_SERVICES: new CategoryKey(
    'medical_therapy_services',
    'Medical / Therapy Services',
    'Medical / Therapy Services',
    'medical',
    'A career in the medical industry extends beyond that of a doctor. It is a rigorous but rewarding industry. Click here to view the latest medical career opportunities in Singapore.',
    'Medical Job in Singapore | Singapore Medical Career Path',
    CATEGORY_DESCRIPTION.MEDICAL_THERAPY_SERVICES,
  ),
  PERSONAL_CARE_BEAUTY: new CategoryKey(
    'personal_care_beauty',
    'Personal Care / Beauty',
    'Personal Care / Beauty',
    'personal-care',
    'Want to help people look good and feel good? The beauty and personal care industry in Singapore might be perfect for you. View job listings in personal care here.',
    'Beauty & Personal Care Jobs in Singapore | Spa Therapist & Personal Trainer',
    CATEGORY_DESCRIPTION.PERSONAL_CARE_BEAUTY,
  ),
  PROFESSIONAL_SERVICES: new CategoryKey(
    'professional_services',
    'Professional Services',
    'Professional Services',
    'professional-services',
    'Applying for Professional Services Roles in Singapore?  Visit My Careers Future for the widest variety of Job Listings.',
    'Professional Services Industry in Singapore | Professional Services Firms',
    CATEGORY_DESCRIPTION.PROFESSIONAL_SERVICES,
  ),
  PUBLIC_CIVIL_SERVICES: new CategoryKey(
    'public_civil_service',
    'Public / Civil Service',
    'Public / Civil Service',
    'public',
    'Have a passion to serve the public in Singapore? MyCareersFuture.sg has the latest public service jobs and vacancies on our jobs portal. Click here to start applying now.',
    'Singapore Public Service Jobs | Careers in The Public Sector',
    CATEGORY_DESCRIPTION.PUBLIC_CIVIL_SERVICES,
  ),
  PURCHASING_MERCHANDISING: new CategoryKey(
    'purchasing_merchandising',
    'Purchasing / Merchandising',
    'Purchasing / Merchandising',
    'purchasing',
    'The line of purchasing is an important part of any type of procurement process. Take a look at purchasing jobs in Singapore on MyCareersFuture.sg!',
    'Purchasing Jobs in Singapore | Career in Procurement in Singapore',
    CATEGORY_DESCRIPTION.PURCHASING_MERCHANDISING,
  ),
  REAL_ESTATE_PROPERTY_MANAGEMENT: new CategoryKey(
    'real_estate_property_management',
    'Real Estate / Property Management',
    'Real Estate / Property Management',
    'real-estate',
    'Whether you are a part time real estate agent or a property valuer, the industry is booming. Click here to browse real estate jobs available in Singapore.',
    'Real Estate Jobs in Singapore | Real Estate Career Prospects in Singapore',
    CATEGORY_DESCRIPTION.REAL_ESTATE_PROPERTY_MANAGEMENT,
  ),
  REPAIR_MAINTENANCE: new CategoryKey(
    'repair_maintenance',
    'Repair and Maintenance',
    'Repair and Maintenance',
    'repair-maintenance',
    'Embark on a stable career in the repair services and maintenance industry. Find out how to get your foot into the repair industry here. Apply for repair jobs now.',
    'Repair Jobs in Singapore | Repair and Maintenance Jobs in Singapore',
    CATEGORY_DESCRIPTION.REPAIR_MAINTENANCE,
  ),
  RISK_MANAGEMENT: new CategoryKey(
    'risk_management',
    'Risk Management',
    'Risk Management',
    'risk-management',
    'Risk management is a critical component for businesses in any sector. Click to explore risk management jobs in Singapore and kick start your career!',
    'Risk Management Jobs in Singapore | Risk Management Career in Singapore',
    CATEGORY_DESCRIPTION.RISK_MANAGEMENT,
  ),
  SALES_RETAIL: new CategoryKey(
    'sales_retail',
    'Sales / Retail',
    'Sales / Retail',
    'sales',
    'Fancy a career in sales? The industry is on the lookout for new talents! Browse the latest sales executive, part-time and retail sales jobs in Singapore by clicking here.',
    'Sales Jobs in Singapore | Sales Executive, Retail & Part Time Sales Jobs',
    CATEGORY_DESCRIPTION.SALES_RETAIL,
  ),
  SCIENCES_LABORATORY_R_N_D: new CategoryKey(
    'sciences_laboratory_r_n_d',
    'Sciences / Laboratory / R&D',
    'Sciences / Laboratory / R&D',
    'sciences',
    'Make a difference to society by pursuing a rewarding career in the science sector in Singapore. Browse through job opportunities available today!',
    'Science & Technology Jobs | Biomedical, Bioligical, Social & Behavioural Life Science Jobs',
    CATEGORY_DESCRIPTION.SCIENCES_LABORATORY_R_N_D,
  ),
  SECURITY_AND_INVESTIGATION: new CategoryKey(
    'security_investigation',
    'Security and Investigation',
    'Security and Investigation',
    'security',
    'Looking for security jobs in Singapore? The industry is diverse with numerous types of jobs available across a broad spectrum of specialisations. Find out more!',
    'Security Jobs in Singapore | View Security Job Openings in Singapore',
    CATEGORY_DESCRIPTION.SECURITY_AND_INVESTIGATION,
  ),
  SOCIAL_SERVICES: new CategoryKey(
    'social_services',
    'Social Services',
    'Social Services',
    'social-services',
    'Want to make a difference in society? Maybe you could consider a career in social services. Click to view listings and vacancies in Singapore’s social services sector today!',
    'Social Services Jobs in Singapore | Social Welfare Services Careers',
    CATEGORY_DESCRIPTION.SOCIAL_SERVICES,
  ),
  TELECOMMUNICATIONS: new CategoryKey(
    'telecommunications',
    'Telecommunications',
    'Telecommunications',
    'telecommunications',
    'Start a career in the telecommunications industry in Singapore and be a part of an evolving technological landscape that is revolutionising the future!',
    'Telecommunications Jobs in Singapore | Telecommunications Industry Jobs',
    CATEGORY_DESCRIPTION.TELECOMMUNICATIONS,
  ),
  TRAVEL_TOURISM: new CategoryKey(
    'travel_tourism',
    'Travel / Tourism',
    'Travel / Tourism',
    'travel',
    'Be part of the country’s booming tourism sector! Browse through the myriad of travel jobs available in Singapore and kickstart your career in the industry.',
    'Travel Jobs in Singapore | Travel Agency Jobs in Singapore',
    CATEGORY_DESCRIPTION.TRAVEL_TOURISM,
  ),
  OTHERS: new CategoryKey('others', 'Others', 'Others', 'others'),
};

export const formatJobUrl = ({jobTitle, company, uuid, category}) => {
    const processedJobTitle = cleanWord(jobTitle);
    const processedCompany = cleanWord(company);
    const urlSegment = `${processedJobTitle && processedJobTitle.concat('-')}${processedCompany &&
        processedCompany.concat('-')}${uuid}`;
    return getCategoryByLabel(category) ? `/job/${CATEGORY}/${urlSegment}` : `/job/${urlSegment}`; }
