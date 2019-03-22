import {expect} from 'chai';
import {mapIcmsToMsfEmploymentType, mapIcmsToMsfJobCategory, mapIcmsToMsfPositionLevel} from './msf';

describe('msf', () => {
  describe('employment types', () => {
    it('should map to Part Time when id is 440002', () => {
      expect(mapIcmsToMsfEmploymentType(440002)).to.deep.equal({id: '05', name: 'Part Time'});
    });
    it('should map to Permanent when id is 440003', () => {
      expect(mapIcmsToMsfEmploymentType(440003)).to.deep.equal({id: '07', name: 'Permanent'});
    });
    it('should map to Temporary when id is 440004', () => {
      expect(mapIcmsToMsfEmploymentType(440004)).to.deep.equal({id: '02', name: 'Temporary'});
    });
    it('should map to Contract when id is 440005', () => {
      expect(mapIcmsToMsfEmploymentType(440005)).to.deep.equal({id: '03', name: 'Contract'});
    });
    it('should map to Freelance when id is 440006', () => {
      expect(mapIcmsToMsfEmploymentType(440006)).to.deep.equal({id: '06', name: 'Freelance'});
    });
    it('should map to Full Time when id is 440007', () => {
      expect(mapIcmsToMsfEmploymentType(440007)).to.deep.equal({id: '08', name: 'Full Time'});
    });
    it('should map to Flexi Time when id is 440008', () => {
      expect(mapIcmsToMsfEmploymentType(440008)).to.deep.equal({id: '09', name: 'Flexi Time'});
    });
    it('should map to Internship when id is 440009', () => {
      expect(mapIcmsToMsfEmploymentType(440009)).to.deep.equal({id: '10', name: 'Internship'});
    });
  });
  describe('position levels', () => {
    it('should map to Senior Executive when id is 357009', () => {
      expect(mapIcmsToMsfPositionLevel(357009)).to.deep.equal({id: 8, description: 'Senior Executive'});
    });
    it('should map to Junior Executive when id is 357008', () => {
      expect(mapIcmsToMsfPositionLevel(357008)).to.deep.equal({id: 10, description: 'Junior Executive'});
    });
    it('should map to Non-executive when id is 357007', () => {
      expect(mapIcmsToMsfPositionLevel(357007)).to.deep.equal({id: 11, description: 'Non-executive'});
    });
    it('should map to Manager when id is 357003', () => {
      expect(mapIcmsToMsfPositionLevel(357003)).to.deep.equal({id: 3, description: 'Manager'});
    });
    it('should map to Executive when id is 357006', () => {
      expect(mapIcmsToMsfPositionLevel(357006)).to.deep.equal({id: 9, description: 'Executive'});
    });
    it('should map to Fresh/entry level when id is 357004', () => {
      expect(mapIcmsToMsfPositionLevel(357004)).to.deep.equal({id: 12, description: 'Fresh / Entry level'});
    });
    it('should map to Professional when id is 357005', () => {
      expect(mapIcmsToMsfPositionLevel(357005)).to.deep.equal({id: 7, description: 'Professional'});
    });
    it('should map to Middle Management when id is 357002', () => {
      expect(mapIcmsToMsfPositionLevel(357002)).to.deep.equal({id: 2, description: 'Middle Management'});
    });
    it('should map to Senior Management when id is 357001', () => {
      expect(mapIcmsToMsfPositionLevel(357001)).to.deep.equal({id: 1, description: 'Senior Management'});
    });
  });
  describe('position levels', () => {
    it('should map to Customer Service when id is 532010', () => {
      expect(mapIcmsToMsfJobCategory(532010)).to.deep.equal({jobCategoryId: 8, jobCategoryName: 'Customer Service'});
    });
    it('should map to Information Technology when id is 532022', () => {
      expect(mapIcmsToMsfJobCategory(532022)).to.deep.equal({
        jobCategoryId: 21,
        jobCategoryName: 'Information Technology',
      });
    });
    it('should map to Travel / Tourism when id is 532042', () => {
      expect(mapIcmsToMsfJobCategory(532042)).to.deep.equal({
        jobCategoryId: 40,
        jobCategoryName: 'Travel / Tourism',
      });
    });
    it('should map to Admin / Secretarial when id is 532002', () => {
      expect(mapIcmsToMsfJobCategory(532002)).to.deep.equal({
        jobCategoryId: 2,
        jobCategoryName: 'Admin / Secretarial',
      });
    });
    it('should map to Building and Construction when id is 532008', () => {
      expect(mapIcmsToMsfJobCategory(532008)).to.deep.equal({
        jobCategoryId: 6,
        jobCategoryName: 'Building and Construction',
      });
    });
    it('should map to Education and Training when id is 532012', () => {
      expect(mapIcmsToMsfJobCategory(532012)).to.deep.equal({
        jobCategoryId: 10,
        jobCategoryName: 'Education and Training',
      });
    });
    it('should map to Sales / Retail when id is 532038', () => {
      expect(mapIcmsToMsfJobCategory(532038)).to.deep.equal({
        jobCategoryId: 35,
        jobCategoryName: 'Sales / Retail',
      });
    });
    it('should map to Others when id is 532030', () => {
      expect(mapIcmsToMsfJobCategory(532030)).to.deep.equal({
        jobCategoryId: 41,
        jobCategoryName: 'Others',
      });
    });
    it('should map to Real Estate / Property Management when id is 532035', () => {
      expect(mapIcmsToMsfJobCategory(532035)).to.deep.equal({
        jobCategoryId: 32,
        jobCategoryName: 'Real Estate / Property Management',
      });
    });
    it('should map to Engineering when id is 532013', () => {
      expect(mapIcmsToMsfJobCategory(532013)).to.deep.equal({
        jobCategoryId: 11,
        jobCategoryName: 'Engineering',
      });
    });
    it('should map to Advertising / Media when id is 532003', () => {
      expect(mapIcmsToMsfJobCategory(532003)).to.deep.equal({
        jobCategoryId: 3,
        jobCategoryName: 'Advertising / Media',
      });
    });
    it('should map to Events / Promotions when id is 532016', () => {
      expect(mapIcmsToMsfJobCategory(532016)).to.deep.equal({
        jobCategoryId: 14,
        jobCategoryName: 'Events / Promotions',
      });
    });
    it('should map to Marketing / Public Relations when id is 532028', () => {
      expect(mapIcmsToMsfJobCategory(532028)).to.deep.equal({
        jobCategoryId: 26,
        jobCategoryName: 'Marketing / Public Relations',
      });
    });
    it('should map to Design when id is 532011', () => {
      expect(mapIcmsToMsfJobCategory(532011)).to.deep.equal({
        jobCategoryId: 9,
        jobCategoryName: 'Design',
      });
    });
    it('should map to Public / Civil Service when id is 532033', () => {
      expect(mapIcmsToMsfJobCategory(532033)).to.deep.equal({
        jobCategoryId: 30,
        jobCategoryName: 'Public / Civil Service',
      });
    });
    it('should map to Accounting / Auditing / Taxation when id is 532001', () => {
      expect(mapIcmsToMsfJobCategory(532001)).to.deep.equal({
        jobCategoryId: 1,
        jobCategoryName: 'Accounting / Auditing / Taxation',
      });
    });
    it('should map to Human Resources when id is 532021', () => {
      expect(mapIcmsToMsfJobCategory(532021)).to.deep.equal({
        jobCategoryId: 20,
        jobCategoryName: 'Human Resources',
      });
    });
    it('should map to Sciences / Laboratory / R&D when id is 532039', () => {
      expect(mapIcmsToMsfJobCategory(532039)).to.deep.equal({
        jobCategoryId: 36,
        jobCategoryName: 'Sciences / Laboratory / R&D',
      });
    });
    it('should map to Personal Care / Beauty when id is 532031', () => {
      expect(mapIcmsToMsfJobCategory(532031)).to.deep.equal({
        jobCategoryId: 28,
        jobCategoryName: 'Personal Care / Beauty',
      });
    });
    it('should map to Logistics / Supply Chain when id is 532025', () => {
      expect(mapIcmsToMsfJobCategory(532025)).to.deep.equal({
        jobCategoryId: 24,
        jobCategoryName: 'Logistics / Supply Chain',
      });
    });
    it('should map to Healthcare / Pharmaceutical when id is 532019', () => {
      expect(mapIcmsToMsfJobCategory(532019)).to.deep.equal({
        jobCategoryId: 18,
        jobCategoryName: 'Healthcare / Pharmaceutical',
      });
    });
    it('should map to Healthcare / Pharmaceutical when id is 532019', () => {
      expect(mapIcmsToMsfJobCategory(532019)).to.deep.equal({
        jobCategoryId: 18,
        jobCategoryName: 'Healthcare / Pharmaceutical',
      });
    });
    it('should map to F&B when id is 532017', () => {
      expect(mapIcmsToMsfJobCategory(532017)).to.deep.equal({
        jobCategoryId: 15,
        jobCategoryName: 'F&B',
      });
    });
    it('should map to Medical / Therapy Services when id is 532029', () => {
      expect(mapIcmsToMsfJobCategory(532029)).to.deep.equal({
        jobCategoryId: 27,
        jobCategoryName: 'Medical / Therapy Services',
      });
    });
    it('should map to Consulting when id is 532005', () => {
      expect(mapIcmsToMsfJobCategory(532005)).to.deep.equal({
        jobCategoryId: 7,
        jobCategoryName: 'Consulting',
      });
    });
    it('should map to Risk Management when id is 532006', () => {
      expect(mapIcmsToMsfJobCategory(532006)).to.deep.equal({
        jobCategoryId: 34,
        jobCategoryName: 'Risk Management',
      });
    });
    it('should map to Professional Services when id is 532032', () => {
      expect(mapIcmsToMsfJobCategory(532032)).to.deep.equal({
        jobCategoryId: 29,
        jobCategoryName: 'Professional Services',
      });
    });
    it('should map to Insurance when id is 532023', () => {
      expect(mapIcmsToMsfJobCategory(532023)).to.deep.equal({
        jobCategoryId: 22,
        jobCategoryName: 'Insurance',
      });
    });
    it('should map to Telecommunications when id is 532041', () => {
      expect(mapIcmsToMsfJobCategory(532041)).to.deep.equal({
        jobCategoryId: 39,
        jobCategoryName: 'Telecommunications',
      });
    });
    it('should map to Social Services when id is 532009', () => {
      expect(mapIcmsToMsfJobCategory(532009)).to.deep.equal({
        jobCategoryId: 38,
        jobCategoryName: 'Social Services',
      });
    });
    it('should map to Security and Investigation when id is 532040', () => {
      expect(mapIcmsToMsfJobCategory(532040)).to.deep.equal({
        jobCategoryId: 37,
        jobCategoryName: 'Security and Investigation',
      });
    });
    it('should map to General Management when id is 532026', () => {
      expect(mapIcmsToMsfJobCategory(532026)).to.deep.equal({
        jobCategoryId: 16,
        jobCategoryName: 'General Management',
      });
    });
    it('should map to Manufacturing when id is 532027', () => {
      expect(mapIcmsToMsfJobCategory(532027)).to.deep.equal({
        jobCategoryId: 25,
        jobCategoryName: 'Manufacturing',
      });
    });
    it('should map to Banking and Finance when id is 532007', () => {
      expect(mapIcmsToMsfJobCategory(532007)).to.deep.equal({
        jobCategoryId: 5,
        jobCategoryName: 'Banking and Finance',
      });
    });
    it('should map to Hospitality when id is 532020', () => {
      expect(mapIcmsToMsfJobCategory(532020)).to.deep.equal({
        jobCategoryId: 19,
        jobCategoryName: 'Hospitality',
      });
    });
    it('should map to General Work when id is 532018', () => {
      expect(mapIcmsToMsfJobCategory(532018)).to.deep.equal({
        jobCategoryId: 17,
        jobCategoryName: 'General Work',
      });
    });
    it('should map to Repair and Maintenance when id is 532036', () => {
      expect(mapIcmsToMsfJobCategory(532036)).to.deep.equal({
        jobCategoryId: 33,
        jobCategoryName: 'Repair and Maintenance',
      });
    });
    it('should map to Architecture / Interior Design when id is 532004', () => {
      expect(mapIcmsToMsfJobCategory(532004)).to.deep.equal({
        jobCategoryId: 4,
        jobCategoryName: 'Architecture / Interior Design',
      });
    });
    it('should map to Environment / Health when id is 532015', () => {
      expect(mapIcmsToMsfJobCategory(532015)).to.deep.equal({
        jobCategoryId: 13,
        jobCategoryName: 'Environment / Health',
      });
    });
    it('should map to Purchasing / Merchandising when id is 532034', () => {
      expect(mapIcmsToMsfJobCategory(532034)).to.deep.equal({
        jobCategoryId: 31,
        jobCategoryName: 'Purchasing / Merchandising',
      });
    });
    it('should map to Legal when id is 532024', () => {
      expect(mapIcmsToMsfJobCategory(532024)).to.deep.equal({
        jobCategoryId: 23,
        jobCategoryName: 'Legal',
      });
    });
    it('should map to Entertainment when id is 532014', () => {
      expect(mapIcmsToMsfJobCategory(532014)).to.deep.equal({
        jobCategoryId: 12,
        jobCategoryName: 'Entertainment',
      });
    });
  });
});
