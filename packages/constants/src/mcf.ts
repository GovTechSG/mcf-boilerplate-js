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
import {CATEGORY} from './category';

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
  'Internship/Traineeship',
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
      if (employmentType.ilpDescription === 'Internship') {
        return { id: parseInt(employmentType.ilpId, 10), employmentType: 'Internship/Traineeship' };
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
  SG_UNITED_TRAINEESHIPS = 5,
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
    id: SCHEME_ID.P_MAX,
    scheme: 'P-Max',
    startDate: '1977-05-25',
    expiryDate: '2055-05-04',
    link: 'http://www.wsg.gov.sg/programmes-and-initiatives/p-max-employer.html',
  },
  {
    id: SCHEME_ID.PCP,
    scheme: 'Professional Conversion Programme',
    startDate: '1977-05-25',
    expiryDate: '2055-05-04',
    link: 'http://www.wsg.gov.sg/programmes-and-initiatives/professional-conversion-programmes-employers.html',
  },
  {
    id: SCHEME_ID.CAREER_TRIAL,
    scheme: 'Career Trial',
    startDate: '1977-05-25',
    expiryDate: '2055-05-04',
    link: 'http://www.wsg.gov.sg/programmes-and-initiatives/career-trial-employers.html',
  },
  {
    id: SCHEME_ID.CAREER_SUPPORT,
    scheme: 'Career Support Programme',
    startDate: '1977-05-25',
    expiryDate: '2055-05-04',
    link: 'http://www.wsg.gov.sg/programmes-and-initiatives/wsg-career-support-programme-employers.html',
  },
  {
    id: SCHEME_ID.SG_UNITED_TRAINEESHIPS,
    scheme: 'SGUnited Traineeships',
    startDate: '2020-06-01',
    expiryDate: '2047-06-01',
    link: 'https://www.wsg.gov.sg/SGUnitedTraineeships-HostCompanies.html',
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

// Additional stop words are words that are common across all job description/titles
export const CUSTOM_WORD_LIST = [
  'pte',
  'ltd',
  'pte.',
  'ltd.',
  'private',
  'limited',
  'llc',
  'llp',
  'inc',
  'inc.',
  'co',
  'co.',
];

// Stop words are retrieved from https://www.ranks.nl/stopwords
export const STOP_WORDS = [
  ...CUSTOM_WORD_LIST,
  'a',
  'about',
  'above',
  'after',
  'again',
  'against',
  'all',
  'am',
  'an',
  'and',
  'any',
  'are',
  "aren't",
  'as',
  'at',
  'be',
  'because',
  'been',
  'before',
  'being',
  'below',
  'between',
  'both',
  'but',
  'by',
  "can't",
  'cannot',
  'could',
  "couldn't",
  'did',
  "didn't",
  'do',
  'does',
  "doesn't",
  'doing',
  "don't",
  'down',
  'during',
  'each',
  'few',
  'for',
  'from',
  'further',
  'had',
  "hadn't",
  'has',
  "hasn't",
  'have',
  "haven't",
  'having',
  'he',
  "he'd",
  "he'll",
  "he's",
  'her',
  'here',
  "here's",
  'hers',
  'herself',
  'him',
  'himself',
  'his',
  'how',
  "how's",
  'i',
  "i'd",
  "i'll",
  "i'm",
  "i've",
  'if',
  'in',
  'into',
  'is',
  "isn't",
  'it',
  "it's",
  'its',
  'itself',
  "let's",
  'me',
  'more',
  'most',
  "mustn't",
  'my',
  'myself',
  'no',
  'nor',
  'not',
  'of',
  'off',
  'on',
  'once',
  'only',
  'or',
  'other',
  'ought',
  'our',
  'ours',
  'ourselves',
  'out',
  'over',
  'own',
  'same',
  "shan't",
  'she',
  "she'd",
  "she'll",
  "she's",
  'should',
  "shouldn't",
  'so',
  'some',
  'such',
  'than',
  'that',
  "that's",
  'the',
  'their',
  'theirs',
  'them',
  'themselves',
  'then',
  'there',
  "there's",
  'these',
  'they',
  "they'd",
  "they'll",
  "they're",
  "they've",
  'this',
  'those',
  'through',
  'to',
  'too',
  'under',
  'until',
  'up',
  'very',
  'was',
  "wasn't",
  'we',
  "we'd",
  "we'll",
  "we're",
  "we've",
  'were',
  "weren't",
  'what',
  "what's",
  'when',
  "when's",
  'where',
  "where's",
  'which',
  'while',
  'who',
  "who's",
  'whom',
  'why',
  "why's",
  'with',
  "won't",
  'would',
  "wouldn't",
  'you',
  "you'd",
  "you'll",
  "you're",
  "you've",
  'your',
  'yours',
  'yourself',
  'yourselves',
];

export const removeStopWords = (str = '') =>
  str
    .split(' ')
    .filter((word) => !STOP_WORDS.includes(word))
    .join(' ');

export const removeWordsInBracket = (str = '') => {
  const re = /\(.*?\)/gi;
  return str.replace(re, '');
};

export const removePunctuations = (str = '') => {
  // '-' is ignored in this case
  const re = /[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=]/g;
  return str.replace(re, '');
};

export const removeExcessWhitespaces = (str = '') => {
  const re = /\s+/g;
  return str.replace(re, ' ');
};

export const removeRepeatedHyphens = (str = '') => {
  const re = /\-+/g;
  return str.replace(re, '-');
};

export const joinWords = (str = '') => {
  const re = /\s/g;
  return str.trim().replace(re, '-');
};

export const processStringToUrlFormat = (str = '') => {
  if (!str) {
    return '';
  }
  const currentStr = `${str.toLowerCase()}`;
  return [
    removeWordsInBracket,
    removeStopWords,
    removePunctuations,
    removeExcessWhitespaces,
    joinWords,
    removeRepeatedHyphens,
    encodeURIComponent,
  ].reduce((currentState, currentItem) => currentItem(currentState), currentStr);
};

export const pathToJobId = (path) => {
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

export const isJobApplicationPath = (path) => {
  const regexExp = /\/apply\/?$/;
  const groups = regexExp.exec(path);
  return groups ? true : false;
};

export const pathToJobAlertChecksum = (path) => {
  const regexExp = /jobalert\/remove\/(?:.*-)?(.*$)/i;
  const checksum = regexExp.exec(path);
  return (checksum && checksum[1]) || null;
};

export const getCategoryByLabel = (label) =>
  Object.keys(CATEGORY).find((category) => CATEGORY[category].label === label);

export const formatJobUrl = ({
  jobTitle,
  company,
  uuid,
  categoryLabel,
}: {
  jobTitle?: string;
  company?: string;
  uuid: string;
  categoryLabel?: string;
}) => {
  const processedJobTitle = processStringToUrlFormat(jobTitle);
  const processedCompany = processStringToUrlFormat(company);
  const urlSegment = `${processedJobTitle && processedJobTitle.concat('-')}${processedCompany &&
    processedCompany.concat('-')}${uuid}`;
  const category = getCategoryByLabel(categoryLabel);
  return category ? `/job/${CATEGORY[category].url}/${urlSegment}` : `/job/${urlSegment}`;
};
