import {expect} from 'chai';
import {EMPLOYMENT_TYPES, JOB_CATEGORIES, POSITION_LEVELS, SCHEMES} from './mcf';

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
});
