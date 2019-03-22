export const EMPLOYMENT_TYPES = [
  {id: '02', name: 'Temporary'},
  {id: '03', name: 'Contract'},
  {id: '05', name: 'Part Time'},
  {id: '06', name: 'Freelance'},
  {id: '07', name: 'Permanent'},
  {id: '08', name: 'Full Time'},
  {id: '09', name: 'Flexi Time'},
  {id: '10', name: 'Internship'},
];

const EMPLOYMENT_TYPES_MAPPING_TABLE: Array<[number, string]> = [
  [440002, '05'],
  [440003, '07'],
  [440004, '02'],
  [440005, '03'],
  [440006, '06'],
  [440007, '08'],
  [440008, '09'],
  [440009, '10'],
];

export const mapIcmsToMsfEmploymentType = (id: number) => {
  const mappingFound = EMPLOYMENT_TYPES_MAPPING_TABLE.find((mapping) => mapping[0] === id) || [];
  return EMPLOYMENT_TYPES.find((employmentType) => employmentType.id === mappingFound[1]);
};

export const POSITION_LEVELS = [
  {id: 1, description: 'Senior Management'},
  {id: 2, description: 'Middle Management'},
  {id: 3, description: 'Manager'},
  {id: 6, description: 'Operational'},
  {id: 7, description: 'Professional'},
  {id: 8, description: 'Senior Executive'},
  {id: 9, description: 'Executive'},
  {id: 10, description: 'Junior Executive'},
  {id: 11, description: 'Non-executive'},
  {id: 12, description: 'Fresh / Entry level'},
];

// there is no mapping for operational
const POSITION_LEVELS_MAPPING_TABLE: Array<[number, number]> = [
  [357009, 8],
  [357008, 10],
  [357007, 11],
  [357003, 3],
  [357006, 9],
  [357004, 12],
  [357005, 7],
  [357002, 2],
  [357001, 1],
];

export const mapIcmsToMsfPositionLevel = (id: number) => {
  const mappingFound = POSITION_LEVELS_MAPPING_TABLE.find((mapping) => mapping[0] === id) || [];
  return POSITION_LEVELS.find((positionLevel) => positionLevel.id === mappingFound[1]);
};

export const JOB_CATEGORIES = [
  {
    jobCategoryId: 1,
    jobCategoryName: 'Accounting / Auditing / Taxation',
  },
  {
    jobCategoryId: 2,
    jobCategoryName: 'Admin / Secretarial',
  },
  {
    jobCategoryId: 3,
    jobCategoryName: 'Advertising / Media',
  },
  {
    jobCategoryId: 4,
    jobCategoryName: 'Architecture / Interior Design',
  },
  {
    jobCategoryId: 5,
    jobCategoryName: 'Banking and Finance',
  },
  {
    jobCategoryId: 6,
    jobCategoryName: 'Building and Construction',
  },
  {
    jobCategoryId: 7,
    jobCategoryName: 'Consulting',
  },
  {
    jobCategoryId: 8,
    jobCategoryName: 'Customer Service',
  },
  {
    jobCategoryId: 9,
    jobCategoryName: 'Design',
  },
  {
    jobCategoryId: 10,
    jobCategoryName: 'Education and Training',
  },
  {
    jobCategoryId: 11,
    jobCategoryName: 'Engineering',
  },
  {
    jobCategoryId: 12,
    jobCategoryName: 'Entertainment',
  },
  {
    jobCategoryId: 13,
    jobCategoryName: 'Environment / Health',
  },
  {
    jobCategoryId: 14,
    jobCategoryName: 'Events / Promotions',
  },
  {
    jobCategoryId: 15,
    jobCategoryName: 'F&B',
  },
  {
    jobCategoryId: 16,
    jobCategoryName: 'General Management',
  },
  {
    jobCategoryId: 17,
    jobCategoryName: 'General Work',
  },
  {
    jobCategoryId: 18,
    jobCategoryName: 'Healthcare / Pharmaceutical',
  },
  {
    jobCategoryId: 19,
    jobCategoryName: 'Hospitality',
  },
  {
    jobCategoryId: 20,
    jobCategoryName: 'Human Resources',
  },
  {
    jobCategoryId: 21,
    jobCategoryName: 'Information Technology',
  },
  {
    jobCategoryId: 22,
    jobCategoryName: 'Insurance',
  },
  {
    jobCategoryId: 23,
    jobCategoryName: 'Legal',
  },
  {
    jobCategoryId: 24,
    jobCategoryName: 'Logistics / Supply Chain',
  },
  {
    jobCategoryId: 25,
    jobCategoryName: 'Manufacturing',
  },
  {
    jobCategoryId: 26,
    jobCategoryName: 'Marketing / Public Relations',
  },
  {
    jobCategoryId: 27,
    jobCategoryName: 'Medical / Therapy Services',
  },
  {
    jobCategoryId: 28,
    jobCategoryName: 'Personal Care / Beauty',
  },
  {
    jobCategoryId: 29,
    jobCategoryName: 'Professional Services',
  },
  {
    jobCategoryId: 30,
    jobCategoryName: 'Public / Civil Service',
  },
  {
    jobCategoryId: 31,
    jobCategoryName: 'Purchasing / Merchandising',
  },
  {
    jobCategoryId: 32,
    jobCategoryName: 'Real Estate / Property Management',
  },
  {
    jobCategoryId: 33,
    jobCategoryName: 'Repair and Maintenance',
  },
  {
    jobCategoryId: 34,
    jobCategoryName: 'Risk Management',
  },
  {
    jobCategoryId: 35,
    jobCategoryName: 'Sales / Retail',
  },
  {
    jobCategoryId: 36,
    jobCategoryName: 'Sciences / Laboratory / R&D',
  },
  {
    jobCategoryId: 37,
    jobCategoryName: 'Security and Investigation',
  },
  {
    jobCategoryId: 38,
    jobCategoryName: 'Social Services',
  },
  {
    jobCategoryId: 39,
    jobCategoryName: 'Telecommunications',
  },
  {
    jobCategoryId: 40,
    jobCategoryName: 'Travel / Tourism',
  },
  {
    jobCategoryId: 41,
    jobCategoryName: 'Others',
  },
];

const JOB_CATEGORIES_MAPPING_TABLE: Array<[number, number]> = [
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

export const mapIcmsToMsfJobCategory = (id: number) => {
  const mappingFound = JOB_CATEGORIES_MAPPING_TABLE.find((mapping) => mapping[0] === id) || [];
  return JOB_CATEGORIES.find((jobCategory) => jobCategory.jobCategoryId === mappingFound[1]);
};
