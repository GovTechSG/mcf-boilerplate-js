// data originating from MSF API

export const EMPLOYMENT_TYPES = [
  {ilpId: '02', ilpDescription: 'Temporary'},
  {ilpId: '03', ilpDescription: 'Contract Basis'},
  {ilpId: '05', ilpDescription: 'Part Time'},
  {ilpId: '06', ilpDescription: 'Freelance'},
  {ilpId: '07', ilpDescription: 'Permanent'},
  {ilpId: '08', ilpDescription: 'Full Time'},
  {ilpId: '09', ilpDescription: 'Flexi Work'},
  {ilpId: '10', ilpDescription: 'Internship'},
];

export const POSITION_LEVELS = [
  {jobLevelCode: 1, description: 'Senior Management'},
  {jobLevelCode: 2, description: 'Middle Management'},
  {jobLevelCode: 3, description: 'Manager'},
  {jobLevelCode: 6, description: 'Operational'},
  {jobLevelCode: 7, description: 'Professional'},
  {jobLevelCode: 8, description: 'Senior Executive'},
  {jobLevelCode: 9, description: 'Executive'},
  {jobLevelCode: 10, description: 'Junior Executive'},
  {jobLevelCode: 11, description: 'Non-executive'},
  {jobLevelCode: 12, description: 'Fresh / Entry level'},
];

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

export const JOB_STATUSES = [
  {id: 1, status: 'Closed'},
  {id: 2, status: 'Draft'},
  {id: 3, status: 'Open'},
  {id: 4, status: 'Re-open'},
];

export const DISTRICTS = [
  {
    district: 1,
    isDeleted: false,
    location: 'D01 Cecil, Marina, People’s Park, Raffles Place',
    sector: '01, 02, 03, 04, 05, 06',
  },
  {
    district: 2,
    isDeleted: false,
    location: 'D02 Anson, Tanjong Pagar',
    sector: '07, 08',
  },
  {
    district: 3,
    isDeleted: false,
    location: 'D03 Queenstown, Tiong Bahru',
    sector: '14,15, 16',
  },
  {
    district: 4,
    isDeleted: false,
    location: 'D04 Harbourfront,Telok Blangah, Sentosa Island',
    sector: '09, 10',
  },
  {
    district: 5,
    isDeleted: false,
    location: 'D05 Clementi New Town, Hong Leong Garden, Pasir Panjang',
    sector: '11, 12, 13',
  },
  {
    district: 6,
    isDeleted: false,
    location: 'D06 Beach Road, High Street',
    sector: '17',
  },
  {
    district: 7,
    isDeleted: false,
    location: 'D07 Golden Mile, Middle Road',
    sector: '18, 19',
  },
  {
    district: 8,
    isDeleted: false,
    location: 'D08 Little India',
    sector: '20, 21',
  },
  {
    district: 9,
    isDeleted: false,
    location: 'D09 Cairnhill, Orchard, River Valley',
    sector: '22, 23',
  },
  {
    district: 10,
    isDeleted: false,
    location: 'D10 Ardmore, Bukit Timah, Holland Road, Tanglin',
    sector: '24, 25, 26, 27',
  },
  {
    district: 11,
    isDeleted: false,
    location: 'D11 Novena, Thomson, Watten Estate',
    sector: '28, 29, 30',
  },
  {
    district: 12,
    isDeleted: false,
    location: 'D12 Balestier, Serangoon, Toa Payoh',
    sector: '31, 32, 33',
  },
  {
    district: 13,
    isDeleted: false,
    location: 'D13 Macpherson, Braddell',
    sector: '34, 35, 36, 37',
  },
  {
    district: 14,
    isDeleted: false,
    location: 'D14 Geylang, Eunos',
    sector: '38, 39, 40, 41',
  },
  {
    district: 15,
    isDeleted: false,
    location: 'D15 Katong, Joo Chiat, Amber Road',
    sector: '42, 43, 44, 45',
  },
  {
    district: 16,
    isDeleted: false,
    location: 'D16 Upper East Coast, Bedok, Eastwood, Kew Drive',
    sector: '46, 47, 48',
  },
  {
    district: 17,
    isDeleted: false,
    location: 'D17 Loyang, Changi',
    sector: '49, 50, 81, 91',
  },
  {
    district: 18,
    isDeleted: false,
    location: 'D18 Tampines, Pasir Ris',
    sector: '51, 52',
  },
  {
    district: 19,
    isDeleted: false,
    location: 'D19 Serangoon Garden, Hougang, Sengkang, Punggol',
    sector: '53, 54, 55, 82',
  },
  {
    district: 20,
    isDeleted: false,
    location: 'D20 Bishan, Ang Mo Kio',
    sector: '56, 57',
  },
  {
    district: 21,
    isDeleted: false,
    location: 'D21 Upper Bukit Timah, Clementi Park, Ulu Pandan',
    sector: '58, 59',
  },
  {
    district: 22,
    isDeleted: false,
    location: 'D22 Jurong, Jurong Island, Tuas',
    sector: '60, 61, 62, 63, 64',
  },
  {
    district: 23,
    isDeleted: false,
    location: 'D23 Hillview, Dairy Farm, Bukit Panjang, Choa Chu Kang',
    sector: '65, 66, 67, 68',
  },
  {
    district: 24,
    isDeleted: false,
    location: 'D24 Lim Chu Kang, Tengah',
    sector: '69, 70, 71',
  },
  {
    district: 25,
    isDeleted: false,
    location: 'D25 Kranji, Woodgrove, Woodlands',
    sector: '72, 73',
  },
  {
    district: 26,
    isDeleted: false,
    location: 'D26 Upper Thomson, Springleaf',
    sector: '77, 78',
  },
  {
    district: 27,
    isDeleted: false,
    location: 'D27 Yishun, Sembawang',
    sector: '75, 76',
  },
  {
    district: 28,
    isDeleted: false,
    location: 'D28 Seletar',
    sector: '79, 80',
  },
  {
    district: 998,
    isDeleted: false,
    location: 'Islandwide',
    sector: '9999',
  },
  {
    district: 999,
    isDeleted: false,
    location: 'Overseas',
    sector: 'XX',
  },
];
