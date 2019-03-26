import {expect} from 'chai';
import {EMPLOYMENT_TYPES, JOB_CATEGORIES, POSITION_LEVELS} from './mcf';

describe('mcf', () => {
  it('should have correct employment types', () => {
    expect(EMPLOYMENT_TYPES).to.deep.equal([
      {id: 440003, employmentType: 'Permanent'},
      {id: 440007, employmentType: 'Full Time'},
      {id: 440002, employmentType: 'Part Time'},
      {id: 440005, employmentType: 'Contract'},
      {id: 440008, employmentType: 'Flexi-work'},
      {id: 440004, employmentType: 'Temporary'},
    ]);
  });
  it('should have correct position levels', () => {
    expect(POSITION_LEVELS).to.deep.equal([
      {id: 357001, position: 'Senior Management'},
      {id: 357002, position: 'Middle Management'},
      {id: 357003, position: 'Manager'},
      {id: 357005, position: 'Professional'},
      {id: 357009, position: 'Senior Executive'},
      {id: 357006, position: 'Executive'},
      {id: 357008, position: 'Junior Executive'},
      {id: 357007, position: 'Non-executive'},
      {id: 357004, position: 'Fresh/entry level'},
    ]);
  });
  it('should have correct job categories', () => {
    expect(JOB_CATEGORIES).to.deep.equal([
      {id: 532001, category: 'Accounting / Auditing / Taxation'},
      {id: 532002, category: 'Admin / Secretarial'},
      {id: 532003, category: 'Advertising / Media'},
      {id: 532004, category: 'Architecture / Interior Design'},
      {id: 532007, category: 'Banking and Finance'},
      {id: 532008, category: 'Building and Construction'},
      {id: 532005, category: 'Consulting'},
      {id: 532010, category: 'Customer Service'},
      {id: 532011, category: 'Design'},
      {id: 532012, category: 'Education and Training'},
      {id: 532013, category: 'Engineering'},
      {id: 532014, category: 'Entertainment'},
      {id: 532015, category: 'Environment / Health'},
      {id: 532016, category: 'Events / Promotions'},
      {id: 532017, category: 'F&B'},
      {id: 532026, category: 'General Management'},
      {id: 532018, category: 'General Work'},
      {id: 532019, category: 'Healthcare / Pharmaceutical'},
      {id: 532020, category: 'Hospitality'},
      {id: 532021, category: 'Human Resources'},
      {id: 532022, category: 'Information Technology'},
      {id: 532023, category: 'Insurance'},
      {id: 532024, category: 'Legal'},
      {id: 532025, category: 'Logistics / Supply Chain'},
      {id: 532027, category: 'Manufacturing'},
      {id: 532028, category: 'Marketing / Public Relations'},
      {id: 532029, category: 'Medical / Therapy Services'},
      {id: 532031, category: 'Personal Care / Beauty'},
      {id: 532032, category: 'Professional Services'},
      {id: 532033, category: 'Public / Civil Service'},
      {id: 532034, category: 'Purchasing / Merchandising'},
      {id: 532035, category: 'Real Estate / Property Management'},
      {id: 532036, category: 'Repair and Maintenance'},
      {id: 532006, category: 'Risk Management'},
      {id: 532038, category: 'Sales / Retail'},
      {id: 532039, category: 'Sciences / Laboratory / R&D'},
      {id: 532040, category: 'Security and Investigation'},
      {id: 532009, category: 'Social Services'},
      {id: 532041, category: 'Telecommunications'},
      {id: 532042, category: 'Travel / Tourism'},
      {id: 532030, category: 'Others'},
    ]);
  });
});
