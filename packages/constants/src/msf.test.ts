import {expect} from 'chai';
import {mapIcmsToMsfEmploymentTypes, mapIcmsToMsfPositionLevels} from './msf';

describe('msf', () => {
  describe('employment types', () => {
    it('should map to Part Time when id is 440002', () => {
      expect(mapIcmsToMsfEmploymentTypes(440002)).to.deep.equal({id: '05', name: 'Part Time'});
    });
    it('should map to Permanent when id is 440003', () => {
      expect(mapIcmsToMsfEmploymentTypes(440003)).to.deep.equal({id: '07', name: 'Permanent'});
    });
    it('should map to Temporary when id is 440004', () => {
      expect(mapIcmsToMsfEmploymentTypes(440004)).to.deep.equal({id: '02', name: 'Temporary'});
    });
    it('should map to Contract when id is 440005', () => {
      expect(mapIcmsToMsfEmploymentTypes(440005)).to.deep.equal({id: '03', name: 'Contract'});
    });
    it('should map to Freelance when id is 440006', () => {
      expect(mapIcmsToMsfEmploymentTypes(440006)).to.deep.equal({id: '06', name: 'Freelance'});
    });
    it('should map to Full Time when id is 440007', () => {
      expect(mapIcmsToMsfEmploymentTypes(440007)).to.deep.equal({id: '08', name: 'Full Time'});
    });
    it('should map to Flexi Time when id is 440008', () => {
      expect(mapIcmsToMsfEmploymentTypes(440008)).to.deep.equal({id: '09', name: 'Flexi Time'});
    });
    it('should map to Internship when id is 440009', () => {
      expect(mapIcmsToMsfEmploymentTypes(440009)).to.deep.equal({id: '10', name: 'Internship'});
    });
  });
  describe('position levels', () => {
    it('should map to Senior Executive when id is 357009', () => {
      expect(mapIcmsToMsfPositionLevels(357009)).to.deep.equal({id: 8, description: 'Senior Executive'});
    });
    it('should map to Junior Executive when id is 357008', () => {
      expect(mapIcmsToMsfPositionLevels(357008)).to.deep.equal({id: 10, description: 'Junior Executive'});
    });
    it('should map to Non-executive when id is 357007', () => {
      expect(mapIcmsToMsfPositionLevels(357007)).to.deep.equal({id: 11, description: 'Non-executive'});
    });
    it('should map to Manager when id is 357003', () => {
      expect(mapIcmsToMsfPositionLevels(357003)).to.deep.equal({id: 3, description: 'Manager'});
    });
    it('should map to Executive when id is 357006', () => {
      expect(mapIcmsToMsfPositionLevels(357006)).to.deep.equal({id: 9, description: 'Executive'});
    });
    it('should map to Fresh/entry level when id is 357004', () => {
      expect(mapIcmsToMsfPositionLevels(357004)).to.deep.equal({id: 12, description: 'Fresh / Entry level'});
    });
    it('should map to Professional when id is 357005', () => {
      expect(mapIcmsToMsfPositionLevels(357005)).to.deep.equal({id: 7, description: 'Professional'});
    });
    it('should map to Middle Management when id is 357002', () => {
      expect(mapIcmsToMsfPositionLevels(357002)).to.deep.equal({id: 2, description: 'Middle Management'});
    });
    it('should map to Senior Management when id is 357001', () => {
      expect(mapIcmsToMsfPositionLevels(357001)).to.deep.equal({id: 1, description: 'Senior Management'});
    });
  });
});
