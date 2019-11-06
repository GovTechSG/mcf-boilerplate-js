import {expect} from 'chai';
import {
  COMPANY_REGISTRATION_TYPES,
  COUNTRIES,
  DISTRICTS,
  EMPLOYMENT_TYPES,
  JOB_CATEGORIES,
  POSITION_LEVELS,
  SALARY_TYPES,
  SCHEMES,
  pathToJobId,
  removeStopWords,
  removeWordsInBracket,
  removePunctuations,
  removeExcessWhitespaces,
  removeRepeatedHyphens,
  joinWords,
  cleanWord,
  isJobApplicationPath,
} from './mcf';

describe('mcf', () => {
  it('should have correct employment types', () => {
    expect(EMPLOYMENT_TYPES).to.deep.equal([
      {id: 7, employmentType: 'Permanent'},
      {id: 8, employmentType: 'Full Time'},
      {id: 5, employmentType: 'Part Time'},
      {id: 3, employmentType: 'Contract'},
      {id: 9, employmentType: 'Flexi-work'},
      {id: 2, employmentType: 'Temporary'},
      {id: 6, employmentType: 'Freelance'},
      {id: 10, employmentType: 'Internship'},
    ]);
  });
  it('should have correct position levels', () => {
    expect(POSITION_LEVELS).to.deep.equal([
      {id: 1, position: 'Senior Management'},
      {id: 2, position: 'Middle Management'},
      {id: 3, position: 'Manager'},
      {id: 7, position: 'Professional'},
      {id: 8, position: 'Senior Executive'},
      {id: 9, position: 'Executive'},
      {id: 10, position: 'Junior Executive'},
      {id: 11, position: 'Non-executive'},
      {id: 12, position: 'Fresh/entry level'},
    ]);
  });
  it('should have correct job categories', () => {
    expect(JOB_CATEGORIES).to.deep.equal([
      {id: 1, category: 'Accounting / Auditing / Taxation'},
      {id: 2, category: 'Admin / Secretarial'},
      {id: 3, category: 'Advertising / Media'},
      {id: 4, category: 'Architecture / Interior Design'},
      {id: 5, category: 'Banking and Finance'},
      {id: 6, category: 'Building and Construction'},
      {id: 7, category: 'Consulting'},
      {id: 8, category: 'Customer Service'},
      {id: 9, category: 'Design'},
      {id: 10, category: 'Education and Training'},
      {id: 11, category: 'Engineering'},
      {id: 12, category: 'Entertainment'},
      {id: 13, category: 'Environment / Health'},
      {id: 14, category: 'Events / Promotions'},
      {id: 15, category: 'F&B'},
      {id: 16, category: 'General Management'},
      {id: 17, category: 'General Work'},
      {id: 18, category: 'Healthcare / Pharmaceutical'},
      {id: 19, category: 'Hospitality'},
      {id: 20, category: 'Human Resources'},
      {id: 21, category: 'Information Technology'},
      {id: 22, category: 'Insurance'},
      {id: 23, category: 'Legal'},
      {id: 24, category: 'Logistics / Supply Chain'},
      {id: 25, category: 'Manufacturing'},
      {id: 26, category: 'Marketing / Public Relations'},
      {id: 27, category: 'Medical / Therapy Services'},
      {id: 28, category: 'Personal Care / Beauty'},
      {id: 29, category: 'Professional Services'},
      {id: 30, category: 'Public / Civil Service'},
      {id: 31, category: 'Purchasing / Merchandising'},
      {id: 32, category: 'Real Estate / Property Management'},
      {id: 33, category: 'Repair and Maintenance'},
      {id: 34, category: 'Risk Management'},
      {id: 35, category: 'Sales / Retail'},
      {id: 36, category: 'Sciences / Laboratory / R&D'},
      {id: 37, category: 'Security and Investigation'},
      {id: 38, category: 'Social Services'},
      {id: 39, category: 'Telecommunications'},
      {id: 40, category: 'Travel / Tourism'},
      {id: 41, category: 'Others'},
    ]);
  });
  it('should have correct schemes', () => {
    expect(SCHEMES).to.deep.equal([
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
    ]);
  });
  it('should have correct districts', () => {
    expect(DISTRICTS).to.deep.equal([
      {
        id: 1,
        location: 'D01 Cecil, Marina, People’s Park, Raffles Place',
        region: 'Central',
        sectors: ['01', '02', '03', '04', '05', '06'],
      },
      {
        id: 2,
        location: 'D02 Anson, Tanjong Pagar',
        region: 'Central',
        sectors: ['07', '08'],
      },
      {
        id: 3,
        location: 'D03 Queenstown, Tiong Bahru',
        region: 'South',
        sectors: ['14', '15', '16'],
      },
      {
        id: 4,
        location: 'D04 Harbourfront,Telok Blangah, Sentosa Island',
        region: 'South',
        sectors: ['09', '10'],
      },
      {
        id: 5,
        location: 'D05 Clementi New Town, Hong Leong Garden, Pasir Panjang',
        region: 'South',
        sectors: ['11', '12', '13'],
      },
      {
        id: 6,
        location: 'D06 Beach Road, High Street',
        region: 'East',
        sectors: ['17'],
      },
      {
        id: 7,
        location: 'D07 Golden Mile, Middle Road',
        region: 'East',
        sectors: ['18', '19'],
      },
      {
        id: 8,
        location: 'D08 Little India',
        region: 'Central',
        sectors: ['20', '21'],
      },
      {
        id: 9,
        location: 'D09 Cairnhill, Orchard, River Valley',
        region: 'Central',
        sectors: ['22', '23'],
      },
      {
        id: 10,
        location: 'D10 Ardmore, Bukit Timah, Holland Road, Tanglin',
        region: 'Central',
        sectors: ['24', '25', '26', '27'],
      },
      {
        id: 11,
        location: 'D11 Novena, Thomson, Watten Estate',
        region: 'Central',
        sectors: ['28', '29', '30'],
      },
      {
        id: 12,
        location: 'D12 Balestier, Serangoon, Toa Payoh',
        region: 'Central',
        sectors: ['31', '32', '33'],
      },
      {
        id: 13,
        location: 'D13 Macpherson, Braddell',
        region: 'Central',
        sectors: ['34', '35', '36', '37'],
      },
      {
        id: 14,
        location: 'D14 Geylang, Eunos',
        region: 'East',
        sectors: ['38', '39', '40', '41'],
      },
      {
        id: 15,
        location: 'D15 Katong, Joo Chiat, Amber Road',
        region: 'East',
        sectors: ['42', '43', '44', '45'],
      },
      {
        id: 16,
        location: 'D16 Upper East Coast, Bedok, Eastwood, Kew Drive',
        region: 'East',
        sectors: ['46', '47', '48'],
      },
      {
        id: 17,
        location: 'D17 Loyang, Changi',
        region: 'East',
        sectors: ['49', '50', '81', '91'],
      },
      {
        id: 18,
        location: 'D18 Tampines, Pasir Ris',
        region: 'East',
        sectors: ['51', '52'],
      },
      {
        id: 19,
        location: 'D19 Serangoon Garden, Hougang, Sengkang, Punggol',
        region: 'North',
        sectors: ['53', '54', '55', '82'],
      },
      {
        id: 20,
        location: 'D20 Bishan, Ang Mo Kio',
        region: 'North',
        sectors: ['56', '57'],
      },
      {
        id: 21,
        location: 'D21 Upper Bukit Timah, Clementi Park, Ulu Pandan',
        region: 'West',
        sectors: ['58', '59'],
      },
      {
        id: 22,
        location: 'D22 Jurong, Jurong Island, Tuas',
        region: 'West',
        sectors: ['60', '61', '62', '63', '64'],
      },
      {
        id: 23,
        location: 'D23 Hillview, Dairy Farm, Bukit Panjang, Choa Chu Kang',
        region: 'West',
        sectors: ['65', '66', '67', '68'],
      },
      {
        id: 24,
        location: 'D24 Lim Chu Kang, Tengah',
        region: 'West',
        sectors: ['69', '70', '71'],
      },
      {
        id: 25,
        location: 'D25 Kranji, Woodgrove, Woodlands',
        region: 'North',
        sectors: ['72', '73'],
      },
      {
        id: 26,
        location: 'D26 Upper Thomson, Springleaf',
        region: 'North',
        sectors: ['77', '78'],
      },
      {
        id: 27,
        location: 'D27 Yishun, Sembawang',
        region: 'North',
        sectors: ['75', '76'],
      },
      {
        id: 28,
        location: 'D28 Seletar',
        region: 'North',
        sectors: ['79', '80'],
      },
      {
        id: 998,
        location: 'Islandwide',
        region: 'Islandwide',
        sectors: [],
      },
      {
        id: 999,
        location: 'Overseas',
        region: 'Overseas',
        sectors: [],
      },
    ]);
  });
  it('should have correct countries', () => {
    expect(COUNTRIES).to.deep.equal([
      {
        code: 'SG',
        codeNumber: 65,
        description: 'Singapore',
      },
      {
        code: 'AF',
        codeNumber: 93,
        description: 'Afghanistan',
      },
      {
        code: 'AL',
        codeNumber: 355,
        description: 'Albania',
      },
      {
        code: 'DZ',
        codeNumber: 213,
        description: 'Algeria',
      },
      {
        code: 'AS',
        codeNumber: 1,
        description: 'American Samoa',
      },
      {
        code: 'AD',
        codeNumber: 376,
        description: 'Andorra',
      },
      {
        code: 'AO',
        codeNumber: 244,
        description: 'Angola',
      },
      {
        code: 'AI',
        codeNumber: 1,
        description: 'Anguilla',
      },
      {
        code: 'AG',
        codeNumber: 1,
        description: 'Antigua',
      },
      {
        code: 'AR',
        codeNumber: 54,
        description: 'Argentina',
      },
      {
        code: 'AM',
        codeNumber: 374,
        description: 'Armenia',
      },
      {
        code: 'AB',
        codeNumber: 297,
        description: 'Aruba',
      },
      {
        code: 'AU',
        codeNumber: 61,
        description: 'Australia',
      },
      {
        code: 'AT',
        codeNumber: 43,
        description: 'Austria',
      },
      {
        code: 'AZ',
        codeNumber: 994,
        description: 'Azerbaijan',
      },
      {
        code: 'BS',
        codeNumber: 1,
        description: 'Bahamas',
      },
      {
        code: 'BH',
        codeNumber: 973,
        description: 'Bahrain',
      },
      {
        code: 'BD',
        codeNumber: 880,
        description: 'Bangladesh',
      },
      {
        code: 'BB',
        codeNumber: 1,
        description: 'Barbados',
      },
      {
        code: 'BL',
        codeNumber: 375,
        description: 'Belarus',
      },
      {
        code: 'BE',
        codeNumber: 32,
        description: 'Belgium',
      },
      {
        code: 'BZ',
        codeNumber: 501,
        description: 'Belize',
      },
      {
        code: 'BJ',
        codeNumber: 229,
        description: 'Benin',
      },
      {
        code: 'BM',
        codeNumber: 1,
        description: 'Bermuda',
      },
      {
        code: 'BT',
        codeNumber: 975,
        description: 'Bhutan',
      },
      {
        code: 'BO',
        codeNumber: 591,
        description: 'Bolivia',
      },
      {
        code: 'BA',
        codeNumber: 387,
        description: 'Bosnia-Herzegovina',
      },
      {
        code: 'BW',
        codeNumber: 267,
        description: 'Botswana',
      },
      {
        code: 'BR',
        codeNumber: 55,
        description: 'Brazil',
      },
      {
        code: 'BQ',
        codeNumber: 0,
        description: 'British Antarctic Territory',
      },
      {
        code: 'IO',
        codeNumber: 246,
        description: 'British Indian Ocean Territory',
      },
      {
        code: 'VG',
        codeNumber: 1,
        description: 'British Virgin Islands',
      },
      {
        code: 'BN',
        codeNumber: 673,
        description: 'Brunei',
      },
      {
        code: 'BG',
        codeNumber: 359,
        description: 'Bulgaria',
      },
      {
        code: 'BF',
        codeNumber: 226,
        description: 'Burkina Faso',
      },
      {
        code: 'BI',
        codeNumber: 257,
        description: 'Burundi',
      },
      {
        code: 'KA',
        codeNumber: 855,
        description: 'Cambodia',
      },
      {
        code: 'CM',
        codeNumber: 237,
        description: 'Cameroon',
      },
      {
        code: 'CA',
        codeNumber: 1,
        description: 'Canada',
      },
      {
        code: 'CT',
        codeNumber: 0,
        description: 'Canton & Enderbury Islands',
      },
      {
        code: 'CV',
        codeNumber: 238,
        description: 'Cape Verde',
      },
      {
        code: 'KY',
        codeNumber: 1,
        description: 'Cayman Islands',
      },
      {
        code: 'CF',
        codeNumber: 236,
        description: 'Central African Republic',
      },
      {
        code: 'TD',
        codeNumber: 235,
        description: 'Chad',
      },
      {
        code: 'CD',
        codeNumber: 0,
        description: 'Channel Islands',
      },
      {
        code: 'CL',
        codeNumber: 56,
        description: 'Chile',
      },
      {
        code: 'CN',
        codeNumber: 86,
        description: 'China',
      },
      {
        code: 'CX',
        codeNumber: 61,
        description: 'Christmas Island',
      },
      {
        code: 'CC',
        codeNumber: 61,
        description: 'Cocos Keeling Island',
      },
      {
        code: 'CO',
        codeNumber: 57,
        description: 'Colombia',
      },
      {
        code: 'KM',
        codeNumber: 269,
        description: 'Comoros',
      },
      {
        code: 'CG',
        codeNumber: 242,
        description: 'Congo',
      },
      {
        code: 'CK',
        codeNumber: 682,
        description: 'Cook Islands',
      },
      {
        code: 'CR',
        codeNumber: 506,
        description: 'Costa Rica',
      },
      {
        code: 'CB',
        codeNumber: 385,
        description: 'Croatia',
      },
      {
        code: 'CU',
        codeNumber: 53,
        description: 'Cuba',
      },
      {
        code: 'CY',
        codeNumber: 357,
        description: 'Cyprus',
      },
      {
        code: 'CZ',
        codeNumber: 420,
        description: 'Czech Republic',
      },
      {
        code: 'DK',
        codeNumber: 45,
        description: 'Denmark',
      },
      {
        code: 'DJ',
        codeNumber: 253,
        description: 'Djibouti',
      },
      {
        code: 'DM',
        codeNumber: 1,
        description: 'Dominica',
      },
      {
        code: 'DO',
        codeNumber: 1,
        description: 'Dominican Republic',
      },
      {
        code: 'TP',
        codeNumber: 670,
        description: 'East Timor',
      },
      {
        code: 'EC',
        codeNumber: 593,
        description: 'Ecuador',
      },
      {
        code: 'EG',
        codeNumber: 20,
        description: 'Egypt',
      },
      {
        code: 'SV',
        codeNumber: 503,
        description: 'El Salvador',
      },
      {
        code: 'GQ',
        codeNumber: 240,
        description: 'Equatorial Guinea',
      },
      {
        code: 'ER',
        codeNumber: 291,
        description: 'Eritrea',
      },
      {
        code: 'EN',
        codeNumber: 372,
        description: 'Estonia',
      },
      {
        code: 'ET',
        codeNumber: 251,
        description: 'Ethiopia',
      },
      {
        code: 'FO',
        codeNumber: 298,
        description: 'Faeroe Islands',
      },
      {
        code: 'FK',
        codeNumber: 500,
        description: 'Falkland Islands',
      },
      {
        code: 'FJ',
        codeNumber: 679,
        description: 'Fiji',
      },
      {
        code: 'FI',
        codeNumber: 358,
        description: 'Finland',
      },
      {
        code: 'FR',
        codeNumber: 33,
        description: 'France',
      },
      {
        code: 'GF',
        codeNumber: 594,
        description: 'French Guiana',
      },
      {
        code: 'PF',
        codeNumber: 689,
        description: 'French Polynesia',
      },
      {
        code: 'FQ',
        codeNumber: 298,
        description: 'French Southern & Antarctic Territories',
      },
      {
        code: 'GA',
        codeNumber: 241,
        description: 'Gabon',
      },
      {
        code: 'GM',
        codeNumber: 220,
        description: 'Gambia',
      },
      {
        code: 'GZ',
        codeNumber: 0,
        description: 'Gaza',
      },
      {
        code: 'GO',
        codeNumber: 995,
        description: 'Georgia',
      },
      {
        code: 'DG',
        codeNumber: 49,
        description: 'Germany',
      },
      {
        code: 'GH',
        codeNumber: 233,
        description: 'Ghana',
      },
      {
        code: 'GI',
        codeNumber: 350,
        description: 'Gibraltar',
      },
      {
        code: 'GR',
        codeNumber: 30,
        description: 'Greece',
      },
      {
        code: 'GL',
        codeNumber: 299,
        description: 'Greenland',
      },
      {
        code: 'GD',
        codeNumber: 1,
        description: 'Grenada',
      },
      {
        code: 'GP',
        codeNumber: 590,
        description: 'Guadeloupe',
      },
      {
        code: 'GU',
        codeNumber: 1,
        description: 'Guam',
      },
      {
        code: 'GT',
        codeNumber: 502,
        description: 'Guatemala',
      },
      {
        code: 'GK',
        codeNumber: 44,
        description: 'Guernsey',
      },
      {
        code: 'GN',
        codeNumber: 224,
        description: 'Guinea',
      },
      {
        code: 'GW',
        codeNumber: 245,
        description: 'Guinea-Bissau',
      },
      {
        code: 'GY',
        codeNumber: 592,
        description: 'Guyana',
      },
      {
        code: 'HT',
        codeNumber: 509,
        description: 'Haiti',
      },
      {
        code: 'HM',
        codeNumber: 0,
        description: 'Heard Island & McDonald Islands',
      },
      {
        code: 'HN',
        codeNumber: 504,
        description: 'Honduras',
      },
      {
        code: 'HK',
        codeNumber: 852,
        description: 'Hong Kong',
      },
      {
        code: 'HS',
        codeNumber: 852,
        description: 'Hong Kong SAR',
      },
      {
        code: 'HU',
        codeNumber: 36,
        description: 'Hungary',
      },
      {
        code: 'IS',
        codeNumber: 354,
        description: 'Iceland',
      },
      {
        code: 'IN',
        codeNumber: 91,
        description: 'India',
      },
      {
        code: 'ID',
        codeNumber: 62,
        description: 'Indonesia',
      },
      {
        code: 'IR',
        codeNumber: 98,
        description: 'Iran',
      },
      {
        code: 'IQ',
        codeNumber: 964,
        description: 'Iraq',
      },
      {
        code: 'IE',
        codeNumber: 353,
        description: 'Ireland',
      },
      {
        code: 'MM',
        codeNumber: 44,
        description: 'Isle Of Man',
      },
      {
        code: 'IL',
        codeNumber: 972,
        description: 'Israel',
      },
      {
        code: 'IT',
        codeNumber: 39,
        description: 'Italy',
      },
      {
        code: 'CI',
        codeNumber: 225,
        description: 'Ivory Coast',
      },
      {
        code: 'JM',
        codeNumber: 1,
        description: 'Jamaica',
      },
      {
        code: 'JP',
        codeNumber: 962,
        description: 'Japan',
      },
      {
        code: 'JT',
        codeNumber: 81,
        description: 'Johnston Island',
      },
      {
        code: 'JO',
        codeNumber: 1,
        description: 'Jordan',
      },
      {
        code: 'KZ',
        codeNumber: 7,
        description: 'Kazakhstan',
      },
      {
        code: 'KE',
        codeNumber: 254,
        description: 'Kenya',
      },
      {
        code: 'KG',
        codeNumber: 0,
        description: 'Kirghizia',
      },
      {
        code: 'KI',
        codeNumber: 686,
        description: 'Kiribati',
      },
      {
        code: 'KP',
        codeNumber: 82,
        description: 'Korea, North',
      },
      {
        code: 'KR',
        codeNumber: 856,
        description: 'Korea, South',
      },
      {
        code: 'KV',
        codeNumber: 383,
        description: 'Kosovo',
      },
      {
        code: 'KW',
        codeNumber: 965,
        description: 'Kuwait',
      },
      {
        code: 'KS',
        codeNumber: 996,
        description: 'Kyrgyzstan',
      },
      {
        code: 'LA',
        codeNumber: 218,
        description: 'Laos',
      },
      {
        code: 'LV',
        codeNumber: 371,
        description: 'Latvia',
      },
      {
        code: 'LB',
        codeNumber: 961,
        description: 'Lebanon',
      },
      {
        code: 'LS',
        codeNumber: 266,
        description: 'Lesotho',
      },
      {
        code: 'LR',
        codeNumber: 231,
        description: 'Liberia',
      },
      {
        code: 'LY',
        codeNumber: 850,
        description: 'Libya',
      },
      {
        code: 'LI',
        codeNumber: 423,
        description: 'Liechtenstein',
      },
      {
        code: 'LH',
        codeNumber: 370,
        description: 'Lithuania',
      },
      {
        code: 'LU',
        codeNumber: 352,
        description: 'Luxembourg',
      },
      {
        code: 'MO',
        codeNumber: 853,
        description: 'Macao',
      },
      {
        code: 'MF',
        codeNumber: 853,
        description: 'Macau SAR',
      },
      {
        code: 'MB',
        codeNumber: 0,
        description: 'Macedonia',
      },
      {
        code: 'MG',
        codeNumber: 261,
        description: 'Madagascar',
      },
      {
        code: 'MW',
        codeNumber: 265,
        description: 'Malawi',
      },
      {
        code: 'MY',
        codeNumber: 60,
        description: 'Malaysia',
      },
      {
        code: 'MV',
        codeNumber: 960,
        description: 'Maldives',
      },
      {
        code: 'ML',
        codeNumber: 223,
        description: 'Mali',
      },
      {
        code: 'MT',
        codeNumber: 356,
        description: 'Malta',
      },
      {
        code: 'MH',
        codeNumber: 692,
        description: 'Marshall Islands',
      },
      {
        code: 'MQ',
        codeNumber: 596,
        description: 'Martinique',
      },
      {
        code: 'MR',
        codeNumber: 222,
        description: 'Mauritania',
      },
      {
        code: 'MU',
        codeNumber: 230,
        description: 'Mauritius',
      },
      {
        code: 'ME',
        codeNumber: 262,
        description: 'Mayotte',
      },
      {
        code: 'MX',
        codeNumber: 52,
        description: 'Mexico',
      },
      {
        code: 'MI',
        codeNumber: 1,
        description: 'Midway Islands',
      },
      {
        code: 'MD',
        codeNumber: 373,
        description: 'Moldova',
      },
      {
        code: 'MC',
        codeNumber: 377,
        description: 'Monaco',
      },
      {
        code: 'MN',
        codeNumber: 976,
        description: 'Mongolia',
      },
      {
        code: 'MJ',
        codeNumber: 382,
        description: 'Montenegro',
      },
      {
        code: 'MS',
        codeNumber: 1,
        description: 'Montserrat',
      },
      {
        code: 'MA',
        codeNumber: 212,
        description: 'Morocco',
      },
      {
        code: 'MZ',
        codeNumber: 258,
        description: 'Mozambique',
      },
      {
        code: 'BU',
        codeNumber: 95,
        description: 'Myanmar',
      },
      {
        code: 'NA',
        codeNumber: 264,
        description: 'Namibia',
      },
      {
        code: 'NR',
        codeNumber: 674,
        description: 'Nauru',
      },
      {
        code: 'NP',
        codeNumber: 977,
        description: 'Nepal',
      },
      {
        code: 'NL',
        codeNumber: 31,
        description: 'Netherlands',
      },
      {
        code: 'AN',
        codeNumber: 599,
        description: 'Netherlands Antililles',
      },
      {
        code: 'NC',
        codeNumber: 687,
        description: 'New Caledonia',
      },
      {
        code: 'NZ',
        codeNumber: 64,
        description: 'New Zealand',
      },
      {
        code: 'NI',
        codeNumber: 505,
        description: 'Nicaragua',
      },
      {
        code: 'NE',
        codeNumber: 227,
        description: 'Niger',
      },
      {
        code: 'NG',
        codeNumber: 234,
        description: 'Nigeria',
      },
      {
        code: 'NU',
        codeNumber: 683,
        description: 'Niue Island',
      },
      {
        code: 'NF',
        codeNumber: 672,
        description: 'Norfolk Island',
      },
      {
        code: 'NO',
        codeNumber: 47,
        description: 'Norway',
      },
      {
        code: 'OM',
        codeNumber: 968,
        description: 'Oman',
      },
      {
        code: 'PC',
        codeNumber: 0,
        description: 'Pacific Island Trust Territory',
      },
      {
        code: 'PK',
        codeNumber: 92,
        description: 'Pakistan',
      },
      {
        code: 'PW',
        codeNumber: 680,
        description: 'Palau',
      },
      {
        code: 'PB',
        codeNumber: 970,
        description: 'Palestine',
      },
      {
        code: 'PA',
        codeNumber: 507,
        description: 'Panama',
      },
      {
        code: 'PZ',
        codeNumber: 0,
        description: 'Panama Canal Zone',
      },
      {
        code: 'PG',
        codeNumber: 675,
        description: 'Papua New Guinea',
      },
      {
        code: 'PY',
        codeNumber: 595,
        description: 'Paraguay',
      },
      {
        code: 'PE',
        codeNumber: 51,
        description: 'Peru',
      },
      {
        code: 'PH',
        codeNumber: 63,
        description: 'Philippines',
      },
      {
        code: 'PN',
        codeNumber: 64,
        description: 'Pitcairn Island',
      },
      {
        code: 'PL',
        codeNumber: 48,
        description: 'Poland',
      },
      {
        code: 'PT',
        codeNumber: 351,
        description: 'Portugal',
      },
      {
        code: 'PR',
        codeNumber: 787,
        description: 'Puerto Rico',
      },
      {
        code: 'QA',
        codeNumber: 974,
        description: 'Qatar',
      },
      {
        code: 'RE',
        codeNumber: 262,
        description: 'Reunion',
      },
      {
        code: 'RO',
        codeNumber: 40,
        description: 'Romania',
      },
      {
        code: 'RF',
        codeNumber: 7,
        description: 'Russia',
      },
      {
        code: 'RW',
        codeNumber: 250,
        description: 'Rwanda',
      },
      {
        code: 'WM',
        codeNumber: 685,
        description: 'Samoa',
      },
      {
        code: 'SM',
        codeNumber: 378,
        description: 'San Marino',
      },
      {
        code: 'ST',
        codeNumber: 239,
        description: 'Sao Tome & Principe',
      },
      {
        code: 'SA',
        codeNumber: 966,
        description: 'Saudi Arabia',
      },
      {
        code: 'SN',
        codeNumber: 221,
        description: 'Senegal',
      },
      {
        code: 'RS',
        codeNumber: 381,
        description: 'Serbia',
      },
      {
        code: 'SF',
        codeNumber: 381,
        description: 'Serbia/Montenegro',
      },
      {
        code: 'SC',
        codeNumber: 248,
        description: 'Seychelles',
      },
      {
        code: 'SL',
        codeNumber: 232,
        description: 'Sierra Leone',
      },
      {
        code: 'SK',
        codeNumber: 0,
        description: 'Slovak Republic',
      },
      {
        code: 'SI',
        codeNumber: 386,
        description: 'Slovenia',
      },
      {
        code: 'SB',
        codeNumber: 677,
        description: 'Solomon Islands',
      },
      {
        code: 'SO',
        codeNumber: 252,
        description: 'Somalia',
      },
      {
        code: 'ZA',
        codeNumber: 27,
        description: 'South Africa',
      },
      {
        code: 'ES',
        codeNumber: 34,
        description: 'Spain',
      },
      {
        code: 'LK',
        codeNumber: 94,
        description: 'Sri Lanka',
      },
      {
        code: 'SH',
        codeNumber: 290,
        description: 'St. Helena',
      },
      {
        code: 'KN',
        codeNumber: 1,
        description: 'St. Kitts-Nevis',
      },
      {
        code: 'LC',
        codeNumber: 1,
        description: 'St. Lucia',
      },
      {
        code: 'PM',
        codeNumber: 508,
        description: 'St. Pierre & Miquelon',
      },
      {
        code: 'VC',
        codeNumber: 1,
        description: 'St. Vincent',
      },
      {
        code: 'SD',
        codeNumber: 249,
        description: 'Sudan',
      },
      {
        code: 'SR',
        codeNumber: 597,
        description: 'Suriname',
      },
      {
        code: 'SZ',
        codeNumber: 268,
        description: 'Swaziland',
      },
      {
        code: 'SE',
        codeNumber: 46,
        description: 'Sweden',
      },
      {
        code: 'CH',
        codeNumber: 41,
        description: 'Switzerland',
      },
      {
        code: 'SY',
        codeNumber: 963,
        description: 'Syria',
      },
      {
        code: 'TW',
        codeNumber: 886,
        description: 'Taiwan',
      },
      {
        code: 'TI',
        codeNumber: 992,
        description: 'Tajikistan',
      },
      {
        code: 'TZ',
        codeNumber: 255,
        description: 'Tanzania',
      },
      {
        code: 'TH',
        codeNumber: 66,
        description: 'Thailand',
      },
      {
        code: 'TE',
        codeNumber: 0,
        description: 'Timor',
      },
      {
        code: 'TG',
        codeNumber: 228,
        description: 'Togo',
      },
      {
        code: 'TK',
        codeNumber: 690,
        description: 'Tokelau Islands',
      },
      {
        code: 'TO',
        codeNumber: 676,
        description: 'Tonga',
      },
      {
        code: 'TT',
        codeNumber: 1,
        description: 'Trinidad & Tobago',
      },
      {
        code: 'TN',
        codeNumber: 216,
        description: 'Tunisia',
      },
      {
        code: 'TR',
        codeNumber: 90,
        description: 'Turkey',
      },
      {
        code: 'TM',
        codeNumber: 993,
        description: 'Turkmenistan',
      },
      {
        code: 'TC',
        codeNumber: 1,
        description: 'Turks & Caicos Islands',
      },
      {
        code: 'TV',
        codeNumber: 688,
        description: 'Tuvalu',
      },
      {
        code: 'UG',
        codeNumber: 256,
        description: 'Uganda',
      },
      {
        code: 'UR',
        codeNumber: 380,
        description: 'Ukraine',
      },
      {
        code: 'AE',
        codeNumber: 971,
        description: 'United Arab Emirates',
      },
      {
        code: 'GB',
        codeNumber: 44,
        description: 'United Kingdom',
      },
      {
        code: 'US',
        codeNumber: 1,
        description: 'United States',
      },
      {
        code: 'HV',
        codeNumber: 0,
        description: 'Upper Volta',
      },
      {
        code: 'UY',
        codeNumber: 598,
        description: 'Uruguay',
      },
      {
        code: 'VI',
        codeNumber: 1,
        description: 'US Virgin Islands',
      },
      {
        code: 'UZ',
        codeNumber: 998,
        description: 'Uzbekistan',
      },
      {
        code: 'VU',
        codeNumber: 678,
        description: 'Vanuatu',
      },
      {
        code: 'VA',
        codeNumber: 39,
        description: 'Vatican City State',
      },
      {
        code: 'VE',
        codeNumber: 58,
        description: 'Venezuela',
      },
      {
        code: 'VN',
        codeNumber: 84,
        description: 'Vietnam',
      },
      {
        code: 'WK',
        codeNumber: 1,
        description: 'Wake Island',
      },
      {
        code: 'WF',
        codeNumber: 681,
        description: 'Wallis and Futuna',
      },
      {
        code: 'EH',
        codeNumber: 0,
        description: 'Western Sahara',
      },
      {
        code: 'YM',
        codeNumber: 967,
        description: 'Yemen',
      },
      {
        code: 'YU',
        codeNumber: 0,
        description: 'Yugoslavia',
      },
      {
        code: 'ZR',
        codeNumber: 243,
        description: 'Zaire',
      },
      {
        code: 'ZM',
        codeNumber: 260,
        description: 'Zambia',
      },
      {
        code: 'ZW',
        codeNumber: 263,
        description: 'Zimbabwe',
      },
    ]);
  });
  it('should have correct salary types', () => {
    expect(SALARY_TYPES).to.deep.equal([{id: 4, salaryType: 'Monthly'}, {id: 5, salaryType: 'Annual'}]);
  });
  it('should have correct company registration types', () => {
    expect(COMPANY_REGISTRATION_TYPES).to.deep.equal([
      {id: 1, registrationType: 'Registry of Company'},
      {id: 2, registrationType: 'Registry of Business'},
      {id: 3, registrationType: 'Other Unique Establishments (UENO)'},
      {id: 4, registrationType: 'Others - None of the Above'},
    ]);
  });

  describe('formatUrl', () => {
    describe('pathToJobId', () => {
      it('should works for just jobId', () => {
        const path = '/job/1580bcedd5fafbcf04ee47e918cf25d2';
        const jobId = pathToJobId(path);
        expect(jobId).to.equal('1580bcedd5fafbcf04ee47e918cf25d2');
      });

      it('should works for sample job title', () => {
        const path = '/job/java-software-developer-1580bcedd5fafbcf04ee47e918cf25d2';
        const jobId = pathToJobId(path);
        expect(jobId).to.equal('1580bcedd5fafbcf04ee47e918cf25d2');
      });

      it('should works for trailing path', () => {
        const path = '/job/java-software-developer-1580bcedd5fafbcf04ee47e918cf25d2/apply';
        const jobId = pathToJobId(path);
        expect(jobId).to.equal('1580bcedd5fafbcf04ee47e918cf25d2');
      });

      it('should works for path with special characters', () => {
        const path = '/job/-?!@#$%^,as;ld,asjnakjsndkankjnskjdnk-akjsndkjan-&*()_-----1580bcedd5fafbcf04ee47e918cf25d2';
        const jobId = pathToJobId(path);
        expect(jobId).to.equal('1580bcedd5fafbcf04ee47e918cf25d2');
      });

      it('should works for all official language and weird characters', () => {
        expect(pathToJobId('/job/🤡软件开发人员–谷歌©-1580bcedd5fafbcf04ee47e918cf25d2')).to.equal(
          '1580bcedd5fafbcf04ee47e918cf25d2',
        );
        expect(pathToJobId('/job/🤡सॉफ्टवेयर डेवलपर–गूगल©-1580bcedd5fafbcf04ee47e918cf25d2')).to.equal(
          '1580bcedd5fafbcf04ee47e918cf25d2',
        );
        expect(pathToJobId('/job/🤡pemaju-perisian–google©-1580bcedd5fafbcf04ee47e918cf25d2')).to.equal(
          '1580bcedd5fafbcf04ee47e918cf25d2',
        );
      });
    });

    describe('isJobApplicationPath', () => {
      it('should return true for job path with /apply', () => {
        const path = '/job/1580bcedd5fafbcf04ee47e918cf25d2/apply';
        expect(isJobApplicationPath(path)).to.equal(true);
      });

      it('should return false for job path without /apply', () => {
        const path = '/job/1580bcedd5fafbcf04ee47e918cf25d2';
        expect(isJobApplicationPath(path)).to.equal(false);
      });

      it('should return true for descriptive job path with /apply', () => {
        const path = '/job/java-software-developer-1580bcedd5fafbcf04ee47e918cf25d2/apply';
        expect(isJobApplicationPath(path)).to.equal(true);
      });

      it('should return false for descriptive job path without /apply', () => {
        const path = '/job/java-software-developer-1580bcedd5fafbcf04ee47e918cf25d2';
        expect(isJobApplicationPath(path)).to.equal(false);
      });
    });

    describe('removeStopWords', () => {
      it('returns empty string on empty, null or undefined string', () => {
        expect(removeStopWords()).to.equal('');
        expect(removeStopWords(undefined)).to.equal('');
      });

      it('does nothing if there is no stop words', () => {
        const input = 'software developer needed';
        expect(removeStopWords(input)).to.equal('software developer needed');
      });

      it('removes word from the list', () => {
        const input = 'software developer needed to make coffee';
        expect(removeStopWords(input)).to.equal('software developer needed make coffee');
      });

      it('removes multiple words from the list', () => {
        const input = 'software developer needed to make coffee for directors';
        expect(removeStopWords(input)).to.equal('software developer needed make coffee directors');
      });
    });

    describe('removeWordsInBracket', () => {
      it('returns empty string on empty, null or undefined string', () => {
        expect(removeWordsInBracket()).to.equal('');
        expect(removeWordsInBracket(undefined)).to.equal('');
      });

      it('does nothing if there is no words in bracket', () => {
        const input = 'software developer needed';
        expect(removeWordsInBracket(input)).to.equal('software developer needed');
      });

      it('removes empty bracket', () => {
        const input = 'software developer needed to make () coffee';
        expect(removeWordsInBracket(input)).to.equal('software developer needed to make  coffee');
      });

      it('removes word in bracket', () => {
        const input = '(software) developer needed to make coffee';
        expect(removeWordsInBracket(input)).to.equal(' developer needed to make coffee');
      });

      it('removes multiple words in bracket', () => {
        const input = '(software) developer needed (to make coffee)';
        expect(removeWordsInBracket(input)).to.equal(' developer needed ');
      });
    });

    describe('removePunctuations', () => {
      it('returns empty string on empty, null or undefined string', () => {
        expect(removePunctuations()).to.equal('');
        expect(removePunctuations(undefined)).to.equal('');
      });

      it('does nothing if there is no punctuations', () => {
        const input = 'software developer needed';
        expect(removePunctuations(input)).to.equal('software developer needed');
      });

      it('removes multiple punctuations in different places', () => {
        const input = 'soft!w@are deve$lop^er n&eeded to make coffee';
        expect(removePunctuations(input)).to.equal('software developer needed to make coffee');
      });
    });

    describe('removeExcessWhitespaces', () => {
      it('returns empty string on empty, null or undefined string', () => {
        expect(removeExcessWhitespaces()).to.equal('');
        expect(removeExcessWhitespaces(undefined)).to.equal('');
      });

      it('removes excess whitespace between words', () => {
        const input = 'software   developer            needed';
        expect(removeExcessWhitespaces(input)).to.equal('software developer needed');
      });

      it('removes excess whitespace before and after sentence, except one', () => {
        const input = '   test   ';
        expect(removeExcessWhitespaces(input)).to.equal(' test ');
      });
    });

    describe('removeRepeatedHyphens', () => {
      it('returns empty string on empty, null or undefined string', () => {
        expect(removeRepeatedHyphens()).to.equal('');
        expect(removeRepeatedHyphens(undefined)).to.equal('');
      });

      it('removes excess whitespace between words', () => {
        const input = 'software---developer--------needed';
        expect(removeRepeatedHyphens(input)).to.equal('software-developer-needed');
      });

      it('does not remove single hyphens', () => {
        const input = 'software-developer-needed';
        expect(removeRepeatedHyphens(input)).to.equal('software-developer-needed');
      });
    });

    describe('joinWords', () => {
      it('returns empty string on empty, null or undefined string', () => {
        expect(joinWords()).to.equal('');
        expect(joinWords(undefined)).to.equal('');
      });

      it('joins words with hypehen', () => {
        const input = 'software developer needed';
        expect(joinWords(input)).to.equal('software-developer-needed');
      });

      it('trims whitespace before joining', () => {
        const input = '   test engineer  ';
        expect(joinWords(input)).to.equal('test-engineer');
      });
    });

    describe('cleanWord', () => {
      it('returns empty string on empty, null or undefined string', () => {
        expect(cleanWord()).to.equal('');
        expect(cleanWord(undefined)).to.equal('');
      });

      it('removes standard phrases like "Pte", "Ltd", "Pte.", "Ltd." "Private (Limited)", "Private Limited"', () => {
        const expectedOutput = 'airya-crestar';
        expect(cleanWord('AIRYA - CRESTAR PTE. LTD.')).to.equal(expectedOutput);
        expect(cleanWord('AIRYA - CRESTAR Pte Ltd')).to.equal(expectedOutput);
        expect(cleanWord('AIRYA - CRESTAR Private (Limited)')).to.equal(expectedOutput);
        expect(cleanWord('AIRYA - CRESTAR Private Limited')).to.equal(expectedOutput);
      });

      it('removes special characters', () => {
        const input = "Adi's Designs (International)";
        expect(cleanWord(input)).to.equal('adis-designs');
      });
    });

    // describe('jobToPath', () => {
    //   it('works for just uuid', () => {
    //     const job = {uuid: '1580bcedd5fafbcf04ee47e918cf25d2'};
    //     expect(jobToPath(job)).to.equal('/job/1580bcedd5fafbcf04ee47e918cf25d2');
    //   });
    //
    //   it('works for uuid and job title', () => {
    //     const job = {
    //       uuid: '1580bcedd5fafbcf04ee47e918cf25d2',
    //       jobTitle: 'DIRECTOR OF OPERATIONS',
    //     };
    //     expect(jobToPath(job)).to.equal('/job/director-operations-1580bcedd5fafbcf04ee47e918cf25d2');
    //   });
    //
    //   it('works for uuid, job title and company name', () => {
    //     const job = {
    //       uuid: '1580bcedd5fafbcf04ee47e918cf25d2',
    //       jobTitle: 'DIRECTOR OF OPERATIONS',
    //       company: 'AIRYA CRESTAR INTERNATIONAL PTE. LTD.',
    //     };
    //     expect(jobToPath(job)).to.equal(
    //       '/job/director-operations-airya-crestar-international-1580bcedd5fafbcf04ee47e918cf25d2',
    //     );
    //   });
    //
    //   it('works for all official language and weird characters', () => {
    //     expect(
    //       jobToPath({
    //         uuid: '1580bcedd5fafbcf04ee47e918cf25d2',
    //         jobTitle: '软件开发人员🤡',
    //         company: '谷歌©',
    //       }),
    //     ).to.equal(
    //     '/job/%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91%E4%BA%BA%E5%91%98%F0%9F%A4%A1-%E8%B0%B7%E6%AD%8C%C2%A9-1580bcedd5fafbcf04ee47e918cf25d2',
    //     );
    //
    //     expect(
    //       jobToPath({
    //         uuid: '1580bcedd5fafbcf04ee47e918cf25d2',
    //         jobTitle: '🤡सॉफ्टवेयर',
    //         company: 'वलपर–गूगल©',
    //       }),
    //     ).to.equal(
    //     '/job/%F0%9F%A4%A1%E0%A4%B8%E0%A5%89%E0%A4%AB%E0%A5%8D%E0%A4%9F%E0%A4%B5%E0%A5%87%E0%A4%AF%E0%A4%B0-%E0%A4%B5%E0%A4%B2%E0%A4%AA%E0%A4%B0%E2%80%93%E0%A4%97%E0%A5%82%E0%A4%97%E0%A4%B2%C2%A9-1580bcedd5fafbcf04ee47e918cf25d2',
    //     );
    //
    //     expect(
    //       jobToPath({
    //         uuid: '1580bcedd5fafbcf04ee47e918cf25d2',
    //         jobTitle: 'pemaju-perisian🤡',
    //         company: 'google©',
    //       }),
    //     ).to.equal('/job/pemaju-perisian%F0%9F%A4%A1-google%C2%A9-1580bcedd5fafbcf04ee47e918cf25d2');
    //   });
    // });
  });
});
