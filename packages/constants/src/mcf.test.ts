import {expect} from 'chai';
import {DISTRICTS, EMPLOYMENT_TYPES, JOB_CATEGORIES, POSITION_LEVELS, SCHEMES} from './mcf';

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
      {id: 1, scheme: 'P-Max'},
      {id: 2, scheme: 'Professional Conversion Programme (PCP)'},
      {id: 3, scheme: 'Career Trial'},
      {id: 4, scheme: 'Career Support'},
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
});
