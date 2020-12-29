import {expect} from 'chai';
import {
  mapIcmsToMcfJobCategory,
  mapMcfToIcmsJobCategory,
  mapMcfToMsfJobCategory,
  mapMsfToMcfJobCategory,
} from './jobCategories';

describe('mapIcmsToMcfJobCategory', () => {
  it('should map to Customer Service when id is 532010', () => {
    expect(mapIcmsToMcfJobCategory(532010)).to.deep.equal({id: 8, category: 'Customer Service'});
  });
  it('should map to Information Technology when id is 532022', () => {
    expect(mapIcmsToMcfJobCategory(532022)).to.deep.equal({
      category: 'Information Technology',
      id: 21,
    });
  });
  it('should map to Travel / Tourism when id is 532042', () => {
    expect(mapIcmsToMcfJobCategory(532042)).to.deep.equal({
      category: 'Travel / Tourism',
      id: 40,
    });
  });
  it('should map to Admin / Secretarial when id is 532002', () => {
    expect(mapIcmsToMcfJobCategory(532002)).to.deep.equal({
      category: 'Admin / Secretarial',
      id: 2,
    });
  });
  it('should map to Building and Construction when id is 532008', () => {
    expect(mapIcmsToMcfJobCategory(532008)).to.deep.equal({
      category: 'Building and Construction',
      id: 6,
    });
  });
  it('should map to Education and Training when id is 532012', () => {
    expect(mapIcmsToMcfJobCategory(532012)).to.deep.equal({
      category: 'Education and Training',
      id: 10,
    });
  });
  it('should map to Sales / Retail when id is 532038', () => {
    expect(mapIcmsToMcfJobCategory(532038)).to.deep.equal({
      category: 'Sales / Retail',
      id: 35,
    });
  });
  it('should map to Others when id is 532030', () => {
    expect(mapIcmsToMcfJobCategory(532030)).to.deep.equal({
      category: 'Others',
      id: 41,
    });
  });
  it('should map to Real Estate / Property Management when id is 532035', () => {
    expect(mapIcmsToMcfJobCategory(532035)).to.deep.equal({
      category: 'Real Estate / Property Management',
      id: 32,
    });
  });
  it('should map to Engineering when id is 532013', () => {
    expect(mapIcmsToMcfJobCategory(532013)).to.deep.equal({
      category: 'Engineering',
      id: 11,
    });
  });
  it('should map to Advertising / Media when id is 532003', () => {
    expect(mapIcmsToMcfJobCategory(532003)).to.deep.equal({
      category: 'Advertising / Media',
      id: 3,
    });
  });
  it('should map to Events / Promotions when id is 532016', () => {
    expect(mapIcmsToMcfJobCategory(532016)).to.deep.equal({
      category: 'Events / Promotions',
      id: 14,
    });
  });
  it('should map to Marketing / Public Relations when id is 532028', () => {
    expect(mapIcmsToMcfJobCategory(532028)).to.deep.equal({
      category: 'Marketing / Public Relations',
      id: 26,
    });
  });
  it('should map to Design when id is 532011', () => {
    expect(mapIcmsToMcfJobCategory(532011)).to.deep.equal({
      category: 'Design',
      id: 9,
    });
  });
  it('should map to Public / Civil Service when id is 532033', () => {
    expect(mapIcmsToMcfJobCategory(532033)).to.deep.equal({
      category: 'Public / Civil Service',
      id: 30,
    });
  });
  it('should map to Accounting / Auditing / Taxation when id is 532001', () => {
    expect(mapIcmsToMcfJobCategory(532001)).to.deep.equal({
      category: 'Accounting / Auditing / Taxation',
      id: 1,
    });
  });
  it('should map to Human Resources when id is 532021', () => {
    expect(mapIcmsToMcfJobCategory(532021)).to.deep.equal({
      category: 'Human Resources',
      id: 20,
    });
  });
  it('should map to Sciences / Laboratory / R&D when id is 532039', () => {
    expect(mapIcmsToMcfJobCategory(532039)).to.deep.equal({
      category: 'Sciences / Laboratory / R&D',
      id: 36,
    });
  });
  it('should map to Personal Care / Beauty when id is 532031', () => {
    expect(mapIcmsToMcfJobCategory(532031)).to.deep.equal({
      category: 'Personal Care / Beauty',
      id: 28,
    });
  });
  it('should map to Logistics / Supply Chain when id is 532025', () => {
    expect(mapIcmsToMcfJobCategory(532025)).to.deep.equal({
      category: 'Logistics / Supply Chain',
      id: 24,
    });
  });
  it('should map to Healthcare / Pharmaceutical when id is 532019', () => {
    expect(mapIcmsToMcfJobCategory(532019)).to.deep.equal({
      category: 'Healthcare / Pharmaceutical',
      id: 18,
    });
  });
  it('should map to F&B when id is 532017', () => {
    expect(mapIcmsToMcfJobCategory(532017)).to.deep.equal({
      category: 'F&B',
      id: 15,
    });
  });
  it('should map to Medical / Therapy Services when id is 532029', () => {
    expect(mapIcmsToMcfJobCategory(532029)).to.deep.equal({
      category: 'Medical / Therapy Services',
      id: 27,
    });
  });
  it('should map to Consulting when id is 532005', () => {
    expect(mapIcmsToMcfJobCategory(532005)).to.deep.equal({
      category: 'Consulting',
      id: 7,
    });
  });
  it('should map to Risk Management when id is 532006', () => {
    expect(mapIcmsToMcfJobCategory(532006)).to.deep.equal({
      category: 'Risk Management',
      id: 34,
    });
  });
  it('should map to Professional Services when id is 532032', () => {
    expect(mapIcmsToMcfJobCategory(532032)).to.deep.equal({
      category: 'Professional Services',
      id: 29,
    });
  });
  it('should map to Insurance when id is 532023', () => {
    expect(mapIcmsToMcfJobCategory(532023)).to.deep.equal({
      category: 'Insurance',
      id: 22,
    });
  });
  it('should map to Telecommunications when id is 532041', () => {
    expect(mapIcmsToMcfJobCategory(532041)).to.deep.equal({
      category: 'Telecommunications',
      id: 39,
    });
  });
  it('should map to Social Services when id is 532009', () => {
    expect(mapIcmsToMcfJobCategory(532009)).to.deep.equal({
      category: 'Social Services',
      id: 38,
    });
  });
  it('should map to Security and Investigation when id is 532040', () => {
    expect(mapIcmsToMcfJobCategory(532040)).to.deep.equal({
      category: 'Security and Investigation',
      id: 37,
    });
  });
  it('should map to General Management when id is 532026', () => {
    expect(mapIcmsToMcfJobCategory(532026)).to.deep.equal({
      category: 'General Management',
      id: 16,
    });
  });
  it('should map to Manufacturing when id is 532027', () => {
    expect(mapIcmsToMcfJobCategory(532027)).to.deep.equal({
      category: 'Manufacturing',
      id: 25,
    });
  });
  it('should map to Banking and Finance when id is 532007', () => {
    expect(mapIcmsToMcfJobCategory(532007)).to.deep.equal({
      category: 'Banking and Finance',
      id: 5,
    });
  });
  it('should map to Hospitality when id is 532020', () => {
    expect(mapIcmsToMcfJobCategory(532020)).to.deep.equal({
      category: 'Hospitality',
      id: 19,
    });
  });
  it('should map to General Work when id is 532018', () => {
    expect(mapIcmsToMcfJobCategory(532018)).to.deep.equal({
      category: 'General Work',
      id: 17,
    });
  });
  it('should map to Repair and Maintenance when id is 532036', () => {
    expect(mapIcmsToMcfJobCategory(532036)).to.deep.equal({
      category: 'Repair and Maintenance',
      id: 33,
    });
  });
  it('should map to Architecture / Interior Design when id is 532004', () => {
    expect(mapIcmsToMcfJobCategory(532004)).to.deep.equal({
      category: 'Architecture / Interior Design',
      id: 4,
    });
  });
  it('should map to Environment / Health when id is 532015', () => {
    expect(mapIcmsToMcfJobCategory(532015)).to.deep.equal({
      category: 'Environment / Health',
      id: 13,
    });
  });
  it('should map to Purchasing / Merchandising when id is 532034', () => {
    expect(mapIcmsToMcfJobCategory(532034)).to.deep.equal({
      category: 'Purchasing / Merchandising',
      id: 31,
    });
  });
  it('should map to Legal when id is 532024', () => {
    expect(mapIcmsToMcfJobCategory(532024)).to.deep.equal({
      category: 'Legal',
      id: 23,
    });
  });
  it('should map to Entertainment when id is 532014', () => {
    expect(mapIcmsToMcfJobCategory(532014)).to.deep.equal({
      category: 'Entertainment',
      id: 12,
    });
  });
  it('should map to Wholesale Trade when id is 532043', () => {
    expect(mapIcmsToMcfJobCategory(532043)).to.deep.equal({
      category: 'Wholesale Trade',
      id: 42,
    });
  });
});

describe('mapMcfToIcmsJobCategory', () => {
  it('should map to Customer Service when id is 8', () => {
    expect(mapMcfToIcmsJobCategory(8)).to.deep.equal({id: 532010, category: 'Customer Service'});
  });
  it('should map to Information Technology when id is 21', () => {
    expect(mapMcfToIcmsJobCategory(21)).to.deep.equal({
      category: 'Information Technology',
      id: 532022,
    });
  });
  it('should map to Travel / Tourism when id is 40', () => {
    expect(mapMcfToIcmsJobCategory(40)).to.deep.equal({
      category: 'Travel / Tourism',
      id: 532042,
    });
  });
  it('should map to Admin / Secretarial when id is 2', () => {
    expect(mapMcfToIcmsJobCategory(2)).to.deep.equal({
      category: 'Admin / Secretarial',
      id: 532002,
    });
  });
  it('should map to Building and Construction when id is 6', () => {
    expect(mapMcfToIcmsJobCategory(6)).to.deep.equal({
      category: 'Building and Construction',
      id: 532008,
    });
  });
  it('should map to Education and Training when id is 10', () => {
    expect(mapMcfToIcmsJobCategory(10)).to.deep.equal({
      category: 'Education and Training',
      id: 532012,
    });
  });
  it('should map to Sales / Retail when id is 35', () => {
    expect(mapMcfToIcmsJobCategory(35)).to.deep.equal({
      category: 'Sales / Retail',
      id: 532038,
    });
  });
  it('should map to Others when id is 41', () => {
    expect(mapMcfToIcmsJobCategory(41)).to.deep.equal({
      category: 'Others',
      id: 532030,
    });
  });
  it('should map to Real Estate / Property Management when id is 32', () => {
    expect(mapMcfToIcmsJobCategory(32)).to.deep.equal({
      category: 'Real Estate / Property Management',
      id: 532035,
    });
  });
  it('should map to Engineering when id is 11', () => {
    expect(mapMcfToIcmsJobCategory(11)).to.deep.equal({
      category: 'Engineering',
      id: 532013,
    });
  });
  it('should map to Advertising / Media when id is 3', () => {
    expect(mapMcfToIcmsJobCategory(3)).to.deep.equal({
      category: 'Advertising / Media',
      id: 532003,
    });
  });
  it('should map to Events / Promotions when id is 14', () => {
    expect(mapMcfToIcmsJobCategory(14)).to.deep.equal({
      category: 'Events / Promotions',
      id: 532016,
    });
  });
  it('should map to Marketing / Public Relations when id is 26', () => {
    expect(mapMcfToIcmsJobCategory(26)).to.deep.equal({
      category: 'Marketing / Public Relations',
      id: 532028,
    });
  });
  it('should map to Design when id is 9', () => {
    expect(mapMcfToIcmsJobCategory(9)).to.deep.equal({
      category: 'Design',
      id: 532011,
    });
  });
  it('should map to Public / Civil Service when id is 30', () => {
    expect(mapMcfToIcmsJobCategory(30)).to.deep.equal({
      category: 'Public / Civil Service',
      id: 532033,
    });
  });
  it('should map to Accounting / Auditing / Taxation when id is 1', () => {
    expect(mapMcfToIcmsJobCategory(1)).to.deep.equal({
      category: 'Accounting / Auditing / Taxation',
      id: 532001,
    });
  });
  it('should map to Human Resources when id is 20', () => {
    expect(mapMcfToIcmsJobCategory(20)).to.deep.equal({
      category: 'Human Resources',
      id: 532021,
    });
  });
  it('should map to Sciences / Laboratory / R&D when id is 36', () => {
    expect(mapMcfToIcmsJobCategory(36)).to.deep.equal({
      category: 'Sciences / Laboratory / R&D',
      id: 532039,
    });
  });
  it('should map to Personal Care / Beauty when id is 28', () => {
    expect(mapMcfToIcmsJobCategory(28)).to.deep.equal({
      category: 'Personal Care / Beauty',
      id: 532031,
    });
  });
  it('should map to Logistics / Supply Chain when id is 24', () => {
    expect(mapMcfToIcmsJobCategory(24)).to.deep.equal({
      category: 'Logistics / Supply Chain',
      id: 532025,
    });
  });
  it('should map to Healthcare / Pharmaceutical when id is 18', () => {
    expect(mapMcfToIcmsJobCategory(18)).to.deep.equal({
      category: 'Healthcare / Pharmaceutical',
      id: 532019,
    });
  });
  it('should map to F&B when id is 15', () => {
    expect(mapMcfToIcmsJobCategory(15)).to.deep.equal({
      category: 'F&B',
      id: 532017,
    });
  });
  it('should map to Medical / Therapy Services when id is 27', () => {
    expect(mapMcfToIcmsJobCategory(27)).to.deep.equal({
      category: 'Medical / Therapy Services',
      id: 532029,
    });
  });
  it('should map to Consulting when id is 7', () => {
    expect(mapMcfToIcmsJobCategory(7)).to.deep.equal({
      category: 'Consulting',
      id: 532005,
    });
  });
  it('should map to Risk Management when id is 34', () => {
    expect(mapMcfToIcmsJobCategory(34)).to.deep.equal({
      category: 'Risk Management',
      id: 532006,
    });
  });
  it('should map to Professional Services when id is 29', () => {
    expect(mapMcfToIcmsJobCategory(29)).to.deep.equal({
      category: 'Professional Services',
      id: 532032,
    });
  });
  it('should map to Insurance when id is 22', () => {
    expect(mapMcfToIcmsJobCategory(22)).to.deep.equal({
      category: 'Insurance',
      id: 532023,
    });
  });
  it('should map to Telecommunications when id is 39', () => {
    expect(mapMcfToIcmsJobCategory(39)).to.deep.equal({
      category: 'Telecommunications',
      id: 532041,
    });
  });
  it('should map to Social Services when id is 38', () => {
    expect(mapMcfToIcmsJobCategory(38)).to.deep.equal({
      category: 'Social Services',
      id: 532009,
    });
  });
  it('should map to Security and Investigation when id is 37', () => {
    expect(mapMcfToIcmsJobCategory(37)).to.deep.equal({
      category: 'Security and Investigation',
      id: 532040,
    });
  });
  it('should map to General Management when id is 16', () => {
    expect(mapMcfToIcmsJobCategory(16)).to.deep.equal({
      category: 'General Management',
      id: 532026,
    });
  });
  it('should map to Manufacturing when id is 25', () => {
    expect(mapMcfToIcmsJobCategory(25)).to.deep.equal({
      category: 'Manufacturing',
      id: 532027,
    });
  });
  it('should map to Banking and Finance when id is 5', () => {
    expect(mapMcfToIcmsJobCategory(5)).to.deep.equal({
      category: 'Banking and Finance',
      id: 532007,
    });
  });
  it('should map to Hospitality when id is 19', () => {
    expect(mapMcfToIcmsJobCategory(19)).to.deep.equal({
      category: 'Hospitality',
      id: 532020,
    });
  });
  it('should map to General Work when id is 17', () => {
    expect(mapMcfToIcmsJobCategory(17)).to.deep.equal({
      category: 'General Work',
      id: 532018,
    });
  });
  it('should map to Repair and Maintenance when id is 33', () => {
    expect(mapMcfToIcmsJobCategory(33)).to.deep.equal({
      category: 'Repair and Maintenance',
      id: 532036,
    });
  });
  it('should map to Architecture / Interior Design when id is 4', () => {
    expect(mapMcfToIcmsJobCategory(4)).to.deep.equal({
      category: 'Architecture / Interior Design',
      id: 532004,
    });
  });
  it('should map to Environment / Health when id is 13', () => {
    expect(mapMcfToIcmsJobCategory(13)).to.deep.equal({
      category: 'Environment / Health',
      id: 532015,
    });
  });
  it('should map to Purchasing / Merchandising when id is 31', () => {
    expect(mapMcfToIcmsJobCategory(31)).to.deep.equal({
      category: 'Purchasing / Merchandising',
      id: 532034,
    });
  });
  it('should map to Legal when id is 23', () => {
    expect(mapMcfToIcmsJobCategory(23)).to.deep.equal({
      category: 'Legal',
      id: 532024,
    });
  });
  it('should map to Entertainment when id is 12', () => {
    expect(mapMcfToIcmsJobCategory(12)).to.deep.equal({
      category: 'Entertainment',
      id: 532014,
    });
  });
  it('should map to Wholesale Trade when id is 42', () => {
    expect(mapMcfToIcmsJobCategory(42)).to.deep.equal({
      category: 'Wholesale Trade',
      id: 532043,
    });
  });
});

describe('mapMsfToMcfJobCategory', () => {
  it('should map to Customer Service when id is 8', () => {
    expect(mapMsfToMcfJobCategory(8)).to.deep.equal({id: 8, category: 'Customer Service'});
  });
  it('should map to Information Technology when id is 21', () => {
    expect(mapMsfToMcfJobCategory(21)).to.deep.equal({
      category: 'Information Technology',
      id: 21,
    });
  });
  it('should map to Travel / Tourism when id is 40', () => {
    expect(mapMsfToMcfJobCategory(40)).to.deep.equal({
      category: 'Travel / Tourism',
      id: 40,
    });
  });
  it('should map to Admin / Secretarial when id is 2', () => {
    expect(mapMsfToMcfJobCategory(2)).to.deep.equal({
      category: 'Admin / Secretarial',
      id: 2,
    });
  });
  it('should map to Building and Construction when id is 6', () => {
    expect(mapMsfToMcfJobCategory(6)).to.deep.equal({
      category: 'Building and Construction',
      id: 6,
    });
  });
  it('should map to Education and Training when id is 10', () => {
    expect(mapMsfToMcfJobCategory(10)).to.deep.equal({
      category: 'Education and Training',
      id: 10,
    });
  });
  it('should map to Sales / Retail when id is 35', () => {
    expect(mapMsfToMcfJobCategory(35)).to.deep.equal({
      category: 'Sales / Retail',
      id: 35,
    });
  });
  it('should map to Others when id is 41', () => {
    expect(mapMsfToMcfJobCategory(41)).to.deep.equal({
      category: 'Others',
      id: 41,
    });
  });
  it('should map to Real Estate / Property Management when id is 32', () => {
    expect(mapMsfToMcfJobCategory(32)).to.deep.equal({
      category: 'Real Estate / Property Management',
      id: 32,
    });
  });
  it('should map to Engineering when id is 11', () => {
    expect(mapMsfToMcfJobCategory(11)).to.deep.equal({
      category: 'Engineering',
      id: 11,
    });
  });
  it('should map to Advertising / Media when id is 3', () => {
    expect(mapMsfToMcfJobCategory(3)).to.deep.equal({
      category: 'Advertising / Media',
      id: 3,
    });
  });
  it('should map to Events / Promotions when id is 14', () => {
    expect(mapMsfToMcfJobCategory(14)).to.deep.equal({
      category: 'Events / Promotions',
      id: 14,
    });
  });
  it('should map to Marketing / Public Relations when id is 26', () => {
    expect(mapMsfToMcfJobCategory(26)).to.deep.equal({
      category: 'Marketing / Public Relations',
      id: 26,
    });
  });
  it('should map to Design when id is 9', () => {
    expect(mapMsfToMcfJobCategory(9)).to.deep.equal({
      category: 'Design',
      id: 9,
    });
  });
  it('should map to Public / Civil Service when id is 30', () => {
    expect(mapMsfToMcfJobCategory(30)).to.deep.equal({
      category: 'Public / Civil Service',
      id: 30,
    });
  });
  it('should map to Accounting / Auditing / Taxation when id is 1', () => {
    expect(mapMsfToMcfJobCategory(1)).to.deep.equal({
      category: 'Accounting / Auditing / Taxation',
      id: 1,
    });
  });
  it('should map to Human Resources when id is 20', () => {
    expect(mapMsfToMcfJobCategory(20)).to.deep.equal({
      category: 'Human Resources',
      id: 20,
    });
  });
  it('should map to Sciences / Laboratory / R&D when id is 36', () => {
    expect(mapMsfToMcfJobCategory(36)).to.deep.equal({
      category: 'Sciences / Laboratory / R&D',
      id: 36,
    });
  });
  it('should map to Personal Care / Beauty when id is 28', () => {
    expect(mapMsfToMcfJobCategory(28)).to.deep.equal({
      category: 'Personal Care / Beauty',
      id: 28,
    });
  });
  it('should map to Logistics / Supply Chain when id is 24', () => {
    expect(mapMsfToMcfJobCategory(24)).to.deep.equal({
      category: 'Logistics / Supply Chain',
      id: 24,
    });
  });
  it('should map to Healthcare / Pharmaceutical when id is 18', () => {
    expect(mapMsfToMcfJobCategory(18)).to.deep.equal({
      category: 'Healthcare / Pharmaceutical',
      id: 18,
    });
  });
  it('should map to F&B when id is 15', () => {
    expect(mapMsfToMcfJobCategory(15)).to.deep.equal({
      category: 'F&B',
      id: 15,
    });
  });
  it('should map to Medical / Therapy Services when id is 27', () => {
    expect(mapMsfToMcfJobCategory(27)).to.deep.equal({
      category: 'Medical / Therapy Services',
      id: 27,
    });
  });
  it('should map to Consulting when id is 7', () => {
    expect(mapMsfToMcfJobCategory(7)).to.deep.equal({
      category: 'Consulting',
      id: 7,
    });
  });
  it('should map to Risk Management when id is 34', () => {
    expect(mapMsfToMcfJobCategory(34)).to.deep.equal({
      category: 'Risk Management',
      id: 34,
    });
  });
  it('should map to Professional Services when id is 29', () => {
    expect(mapMsfToMcfJobCategory(29)).to.deep.equal({
      category: 'Professional Services',
      id: 29,
    });
  });
  it('should map to Insurance when id is 22', () => {
    expect(mapMsfToMcfJobCategory(22)).to.deep.equal({
      category: 'Insurance',
      id: 22,
    });
  });
  it('should map to Telecommunications when id is 39', () => {
    expect(mapMsfToMcfJobCategory(39)).to.deep.equal({
      category: 'Telecommunications',
      id: 39,
    });
  });
  it('should map to Social Services when id is 38', () => {
    expect(mapMsfToMcfJobCategory(38)).to.deep.equal({
      category: 'Social Services',
      id: 38,
    });
  });
  it('should map to Security and Investigation when id is 37', () => {
    expect(mapMsfToMcfJobCategory(37)).to.deep.equal({
      category: 'Security and Investigation',
      id: 37,
    });
  });
  it('should map to General Management when id is 16', () => {
    expect(mapMsfToMcfJobCategory(16)).to.deep.equal({
      category: 'General Management',
      id: 16,
    });
  });
  it('should map to Manufacturing when id is 25', () => {
    expect(mapMsfToMcfJobCategory(25)).to.deep.equal({
      category: 'Manufacturing',
      id: 25,
    });
  });
  it('should map to Banking and Finance when id is 5', () => {
    expect(mapMsfToMcfJobCategory(5)).to.deep.equal({
      category: 'Banking and Finance',
      id: 5,
    });
  });
  it('should map to Hospitality when id is 19', () => {
    expect(mapMsfToMcfJobCategory(19)).to.deep.equal({
      category: 'Hospitality',
      id: 19,
    });
  });
  it('should map to General Work when id is 17', () => {
    expect(mapMsfToMcfJobCategory(17)).to.deep.equal({
      category: 'General Work',
      id: 17,
    });
  });
  it('should map to Repair and Maintenance when id is 33', () => {
    expect(mapMsfToMcfJobCategory(33)).to.deep.equal({
      category: 'Repair and Maintenance',
      id: 33,
    });
  });
  it('should map to Architecture / Interior Design when id is 4', () => {
    expect(mapMsfToMcfJobCategory(4)).to.deep.equal({
      category: 'Architecture / Interior Design',
      id: 4,
    });
  });
  it('should map to Environment / Health when id is 13', () => {
    expect(mapMsfToMcfJobCategory(13)).to.deep.equal({
      category: 'Environment / Health',
      id: 13,
    });
  });
  it('should map to Purchasing / Merchandising when id is 31', () => {
    expect(mapMsfToMcfJobCategory(31)).to.deep.equal({
      category: 'Purchasing / Merchandising',
      id: 31,
    });
  });
  it('should map to Legal when id is 23', () => {
    expect(mapMsfToMcfJobCategory(23)).to.deep.equal({
      category: 'Legal',
      id: 23,
    });
  });
  it('should map to Entertainment when id is 12', () => {
    expect(mapMsfToMcfJobCategory(12)).to.deep.equal({
      category: 'Entertainment',
      id: 12,
    });
  });
  it('should map to Wholesale Trade when id is 42', () => {
    expect(mapMsfToMcfJobCategory(42)).to.deep.equal({
      category: 'Wholesale Trade',
      id: 42,
    });
  });
});

describe('mapMcfToMsfJobCategory', () => {
  it('should map to Customer Service when id is 8', () => {
    expect(mapMcfToMsfJobCategory(8)).to.deep.equal({jobCategoryId: 8, jobCategoryName: 'Customer Service'});
  });
  it('should map to Information Technology when id is 21', () => {
    expect(mapMcfToMsfJobCategory(21)).to.deep.equal({
      jobCategoryId: 21,
      jobCategoryName: 'Information Technology',
    });
  });
  it('should map to Travel / Tourism when id is 40', () => {
    expect(mapMcfToMsfJobCategory(40)).to.deep.equal({
      jobCategoryId: 40,
      jobCategoryName: 'Travel / Tourism',
    });
  });
  it('should map to Admin / Secretarial when id is 2', () => {
    expect(mapMcfToMsfJobCategory(2)).to.deep.equal({
      jobCategoryId: 2,
      jobCategoryName: 'Admin / Secretarial',
    });
  });
  it('should map to Building and Construction when id is 6', () => {
    expect(mapMcfToMsfJobCategory(6)).to.deep.equal({
      jobCategoryId: 6,
      jobCategoryName: 'Building and Construction',
    });
  });
  it('should map to Education and Training when id is 10', () => {
    expect(mapMcfToMsfJobCategory(10)).to.deep.equal({
      jobCategoryId: 10,
      jobCategoryName: 'Education and Training',
    });
  });
  it('should map to Sales / Retail when id is 35', () => {
    expect(mapMcfToMsfJobCategory(35)).to.deep.equal({
      jobCategoryId: 35,
      jobCategoryName: 'Sales / Retail',
    });
  });
  it('should map to Others when id is 41', () => {
    expect(mapMcfToMsfJobCategory(41)).to.deep.equal({
      jobCategoryId: 41,
      jobCategoryName: 'Others',
    });
  });
  it('should map to Real Estate / Property Management when id is 32', () => {
    expect(mapMcfToMsfJobCategory(32)).to.deep.equal({
      jobCategoryId: 32,
      jobCategoryName: 'Real Estate / Property Management',
    });
  });
  it('should map to Engineering when id is 11', () => {
    expect(mapMcfToMsfJobCategory(11)).to.deep.equal({
      jobCategoryId: 11,
      jobCategoryName: 'Engineering',
    });
  });
  it('should map to Advertising / Media when id is 3', () => {
    expect(mapMcfToMsfJobCategory(3)).to.deep.equal({
      jobCategoryId: 3,
      jobCategoryName: 'Advertising / Media',
    });
  });
  it('should map to Events / Promotions when id is 14', () => {
    expect(mapMcfToMsfJobCategory(14)).to.deep.equal({
      jobCategoryId: 14,
      jobCategoryName: 'Events / Promotions',
    });
  });
  it('should map to Marketing / Public Relations when id is 26', () => {
    expect(mapMcfToMsfJobCategory(26)).to.deep.equal({
      jobCategoryId: 26,
      jobCategoryName: 'Marketing / Public Relations',
    });
  });
  it('should map to Design when id is 9', () => {
    expect(mapMcfToMsfJobCategory(9)).to.deep.equal({
      jobCategoryId: 9,
      jobCategoryName: 'Design',
    });
  });
  it('should map to Public / Civil Service when id is 30', () => {
    expect(mapMcfToMsfJobCategory(30)).to.deep.equal({
      jobCategoryId: 30,
      jobCategoryName: 'Public / Civil Service',
    });
  });
  it('should map to Accounting / Auditing / Taxation when id is 1', () => {
    expect(mapMcfToMsfJobCategory(1)).to.deep.equal({
      jobCategoryId: 1,
      jobCategoryName: 'Accounting / Auditing / Taxation',
    });
  });
  it('should map to Human Resources when id is 20', () => {
    expect(mapMcfToMsfJobCategory(20)).to.deep.equal({
      jobCategoryId: 20,
      jobCategoryName: 'Human Resources',
    });
  });
  it('should map to Sciences / Laboratory / R&D when id is 36', () => {
    expect(mapMcfToMsfJobCategory(36)).to.deep.equal({
      jobCategoryId: 36,
      jobCategoryName: 'Sciences / Laboratory / R&D',
    });
  });
  it('should map to Personal Care / Beauty when id is 28', () => {
    expect(mapMcfToMsfJobCategory(28)).to.deep.equal({
      jobCategoryId: 28,
      jobCategoryName: 'Personal Care / Beauty',
    });
  });
  it('should map to Logistics / Supply Chain when id is 24', () => {
    expect(mapMcfToMsfJobCategory(24)).to.deep.equal({
      jobCategoryId: 24,
      jobCategoryName: 'Logistics / Supply Chain',
    });
  });
  it('should map to Healthcare / Pharmaceutical when id is 18', () => {
    expect(mapMcfToMsfJobCategory(18)).to.deep.equal({
      jobCategoryId: 18,
      jobCategoryName: 'Healthcare / Pharmaceutical',
    });
  });
  it('should map to F&B when id is 15', () => {
    expect(mapMcfToMsfJobCategory(15)).to.deep.equal({
      jobCategoryId: 15,
      jobCategoryName: 'F&B',
    });
  });
  it('should map to Medical / Therapy Services when id is 27', () => {
    expect(mapMcfToMsfJobCategory(27)).to.deep.equal({
      jobCategoryId: 27,
      jobCategoryName: 'Medical / Therapy Services',
    });
  });
  it('should map to Consulting when id is 7', () => {
    expect(mapMcfToMsfJobCategory(7)).to.deep.equal({
      jobCategoryId: 7,
      jobCategoryName: 'Consulting',
    });
  });
  it('should map to Risk Management when id is 34', () => {
    expect(mapMcfToMsfJobCategory(34)).to.deep.equal({
      jobCategoryId: 34,
      jobCategoryName: 'Risk Management',
    });
  });
  it('should map to Professional Services when id is 29', () => {
    expect(mapMcfToMsfJobCategory(29)).to.deep.equal({
      jobCategoryId: 29,
      jobCategoryName: 'Professional Services',
    });
  });
  it('should map to Insurance when id is 22', () => {
    expect(mapMcfToMsfJobCategory(22)).to.deep.equal({
      jobCategoryId: 22,
      jobCategoryName: 'Insurance',
    });
  });
  it('should map to Telecommunications when id is 39', () => {
    expect(mapMcfToMsfJobCategory(39)).to.deep.equal({
      jobCategoryId: 39,
      jobCategoryName: 'Telecommunications',
    });
  });
  it('should map to Social Services when id is 38', () => {
    expect(mapMcfToMsfJobCategory(38)).to.deep.equal({
      jobCategoryId: 38,
      jobCategoryName: 'Social Services',
    });
  });
  it('should map to Security and Investigation when id is 37', () => {
    expect(mapMcfToMsfJobCategory(37)).to.deep.equal({
      jobCategoryId: 37,
      jobCategoryName: 'Security and Investigation',
    });
  });
  it('should map to General Management when id is 16', () => {
    expect(mapMcfToMsfJobCategory(16)).to.deep.equal({
      jobCategoryId: 16,
      jobCategoryName: 'General Management',
    });
  });
  it('should map to Manufacturing when id is 25', () => {
    expect(mapMcfToMsfJobCategory(25)).to.deep.equal({
      jobCategoryId: 25,
      jobCategoryName: 'Manufacturing',
    });
  });
  it('should map to Banking and Finance when id is 5', () => {
    expect(mapMcfToMsfJobCategory(5)).to.deep.equal({
      jobCategoryId: 5,
      jobCategoryName: 'Banking and Finance',
    });
  });
  it('should map to Hospitality when id is 19', () => {
    expect(mapMcfToMsfJobCategory(19)).to.deep.equal({
      jobCategoryId: 19,
      jobCategoryName: 'Hospitality',
    });
  });
  it('should map to General Work when id is 17', () => {
    expect(mapMcfToMsfJobCategory(17)).to.deep.equal({
      jobCategoryId: 17,
      jobCategoryName: 'General Work',
    });
  });
  it('should map to Repair and Maintenance when id is 33', () => {
    expect(mapMcfToMsfJobCategory(33)).to.deep.equal({
      jobCategoryId: 33,
      jobCategoryName: 'Repair and Maintenance',
    });
  });
  it('should map to Architecture / Interior Design when id is 4', () => {
    expect(mapMcfToMsfJobCategory(4)).to.deep.equal({
      jobCategoryId: 4,
      jobCategoryName: 'Architecture / Interior Design',
    });
  });
  it('should map to Environment / Health when id is 13', () => {
    expect(mapMcfToMsfJobCategory(13)).to.deep.equal({
      jobCategoryId: 13,
      jobCategoryName: 'Environment / Health',
    });
  });
  it('should map to Purchasing / Merchandising when id is 31', () => {
    expect(mapMcfToMsfJobCategory(31)).to.deep.equal({
      jobCategoryId: 31,
      jobCategoryName: 'Purchasing / Merchandising',
    });
  });
  it('should map to Legal when id is 23', () => {
    expect(mapMcfToMsfJobCategory(23)).to.deep.equal({
      jobCategoryId: 23,
      jobCategoryName: 'Legal',
    });
  });
  it('should map to Entertainment when id is 12', () => {
    expect(mapMcfToMsfJobCategory(12)).to.deep.equal({
      jobCategoryId: 12,
      jobCategoryName: 'Entertainment',
    });
  });
  it('should map to Wholesale Trade when id is 42', () => {
    expect(mapMcfToMsfJobCategory(42)).to.deep.equal({
      jobCategoryId: 42,
      jobCategoryName: 'Wholesale Trade',
    });
  });
});
