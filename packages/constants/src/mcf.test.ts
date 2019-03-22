import {expect} from 'chai';
import {EMPLOYMENT_TYPES, POSITION_LEVELS, JOB_CATEGORIES} from './mcf';

describe('mcf', () => {
  it('should have correct employment types', () => {
    expect(EMPLOYMENT_TYPES).to.deep.equal([
      {id: '07', name: 'Permanent'},
      {id: '08', name: 'Full Time'},
      {id: '05', name: 'Part Time'},
      {id: '03', name: 'Contract'},
      {id: '09', name: 'Flexi-work'},
      {id: '02', name: 'Temporary'},
    ]);
  });
  it('should have correct position levels', () => {
    expect(POSITION_LEVELS).to.deep.equal([
      {id: 1, description: 'Senior Management'},
      {id: 2, description: 'Middle Management'},
      {id: 3, description: 'Manager'},
      {id: 7, description: 'Professional'},
      {id: 8, description: 'Senior Executive'},
      {id: 9, description: 'Executive'},
      {id: 10, description: 'Junior Executive'},
      {id: 11, description: 'Non-executive'},
      {id: 12, description: 'Fresh/entry level'},
    ]);
  });
  it('should have correct job categories', () => {
    expect(JOB_CATEGORIES).to.deep.equal([
      {jobCategoryId: 1, jobCategoryName: 'Accounting / Auditing / Taxation'},
      {jobCategoryId: 2, jobCategoryName: 'Admin / Secretarial'},
      {jobCategoryId: 3, jobCategoryName: 'Advertising / Media'},
      {jobCategoryId: 4, jobCategoryName: 'Architecture / Interior Design'},
      {jobCategoryId: 5, jobCategoryName: 'Banking and Finance'},
      {jobCategoryId: 6, jobCategoryName: 'Building and Construction'},
      {jobCategoryId: 7, jobCategoryName: 'Consulting'},
      {jobCategoryId: 8, jobCategoryName: 'Customer Service'},
      {jobCategoryId: 9, jobCategoryName: 'Design'},
      {jobCategoryId: 10, jobCategoryName: 'Education and Training'},
      {jobCategoryId: 11, jobCategoryName: 'Engineering'},
      {jobCategoryId: 12, jobCategoryName: 'Entertainment'},
      {jobCategoryId: 13, jobCategoryName: 'Environment / Health'},
      {jobCategoryId: 14, jobCategoryName: 'Events / Promotions'},
      {jobCategoryId: 15, jobCategoryName: 'F&B'},
      {jobCategoryId: 16, jobCategoryName: 'General Management'},
      {jobCategoryId: 17, jobCategoryName: 'General Work'},
      {jobCategoryId: 18, jobCategoryName: 'Healthcare / Pharmaceutical'},
      {jobCategoryId: 19, jobCategoryName: 'Hospitality'},
      {jobCategoryId: 20, jobCategoryName: 'Human Resources'},
      {jobCategoryId: 21, jobCategoryName: 'Information Technology'},
      {jobCategoryId: 22, jobCategoryName: 'Insurance'},
      {jobCategoryId: 23, jobCategoryName: 'Legal'},
      {jobCategoryId: 24, jobCategoryName: 'Logistics / Supply Chain'},
      {jobCategoryId: 25, jobCategoryName: 'Manufacturing'},
      {jobCategoryId: 26, jobCategoryName: 'Marketing / Public Relations'},
      {jobCategoryId: 27, jobCategoryName: 'Medical / Therapy Services'},
      {jobCategoryId: 28, jobCategoryName: 'Personal Care / Beauty'},
      {jobCategoryId: 29, jobCategoryName: 'Professional Services'},
      {jobCategoryId: 30, jobCategoryName: 'Public / Civil Service'},
      {jobCategoryId: 31, jobCategoryName: 'Purchasing / Merchandising'},
      {jobCategoryId: 32, jobCategoryName: 'Real Estate / Property Management'},
      {jobCategoryId: 33, jobCategoryName: 'Repair and Maintenance'},
      {jobCategoryId: 34, jobCategoryName: 'Risk Management'},
      {jobCategoryId: 35, jobCategoryName: 'Sales / Retail'},
      {jobCategoryId: 36, jobCategoryName: 'Sciences / Laboratory / R&D'},
      {jobCategoryId: 37, jobCategoryName: 'Security and Investigation'},
      {jobCategoryId: 38, jobCategoryName: 'Social Services'},
      {jobCategoryId: 39, jobCategoryName: 'Telecommunications'},
      {jobCategoryId: 40, jobCategoryName: 'Travel / Tourism'},
      {jobCategoryId: 41, jobCategoryName: 'Others'},
    ]);
  });
});
