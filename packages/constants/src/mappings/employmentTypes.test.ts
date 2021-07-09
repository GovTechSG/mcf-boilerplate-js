import {expect} from 'chai';
import {
  mapIcmsToMcfEmploymentType,
  mapMcfToIcmsEmploymentType,
  mapMcfToMsfEmploymentType,
  mapMsfToMcfEmploymentType,
} from './employmentTypes';

describe('mapIcmsToMcfEmploymentType', () => {
  it('should map to Part Time when id is 440002', () => {
    expect(mapIcmsToMcfEmploymentType(440002)).to.deep.equal({id: 5, employmentType: 'Part Time'});
  });
  it('should map to Permanent when id is 440003', () => {
    expect(mapIcmsToMcfEmploymentType(440003)).to.deep.equal({id: 7, employmentType: 'Permanent'});
  });
  it('should map to Temporary when id is 440004', () => {
    expect(mapIcmsToMcfEmploymentType(440004)).to.deep.equal({id: 2, employmentType: 'Temporary'});
  });
  it('should map to Contract when id is 440005', () => {
    expect(mapIcmsToMcfEmploymentType(440005)).to.deep.equal({id: 3, employmentType: 'Contract'});
  });
  it('should map to Freelance when id is 440006', () => {
    expect(mapIcmsToMcfEmploymentType(440006)).to.deep.equal({id: 6, employmentType: 'Freelance'});
  });
  it('should map to Full Time when id is 440007', () => {
    expect(mapIcmsToMcfEmploymentType(440007)).to.deep.equal({id: 8, employmentType: 'Full Time'});
  });
  it('should map to Flexi-work when id is 440008', () => {
    expect(mapIcmsToMcfEmploymentType(440008)).to.deep.equal({id: 9, employmentType: 'Flexi-work'});
  });
  it('should map to Internship when id is 440009', () => {
    expect(mapIcmsToMcfEmploymentType(440009)).to.deep.equal({id: 10, employmentType: 'Internship/Traineeship'});
  });
});

describe('mapMcfToIcmsEmploymentType', () => {
  it('should map to Part Time when id is 5', () => {
    expect(mapMcfToIcmsEmploymentType(5)).to.deep.equal({id: 440002, employmentType: 'Part Time'});
  });
  it('should map to Permanent when id is 7', () => {
    expect(mapMcfToIcmsEmploymentType(7)).to.deep.equal({id: 440003, employmentType: 'Permanent'});
  });
  it('should map to Temporary when id is 2', () => {
    expect(mapMcfToIcmsEmploymentType(2)).to.deep.equal({id: 440004, employmentType: 'Temporary'});
  });
  it('should map to Contract when id is 3', () => {
    expect(mapMcfToIcmsEmploymentType(3)).to.deep.equal({id: 440005, employmentType: 'Contract'});
  });
  it('should map to Full Time when id is 8', () => {
    expect(mapMcfToIcmsEmploymentType(8)).to.deep.equal({id: 440007, employmentType: 'Full Time'});
  });
  it('should map to Flexi work when id is 9', () => {
    expect(mapMcfToIcmsEmploymentType(9)).to.deep.equal({id: 440008, employmentType: 'Flexi work'});
  });
  it('should map to Internship when id is 10', () => {
    expect(mapMcfToIcmsEmploymentType(10)).to.deep.equal({id: 440009, employmentType: 'Internship'});
  });
  it('should map to Freelance when id is 6', () => {
    expect(mapMcfToIcmsEmploymentType(6)).to.deep.equal({id: 440006, employmentType: 'Freelance'});
  });
});

describe('mapMsfToMcfEmploymentType', () => {
  it('should map to Part Time when id is 05', () => {
    expect(mapMsfToMcfEmploymentType('05')).to.deep.equal({id: 5, employmentType: 'Part Time'});
  });
  it('should map to Permanent when id is 07', () => {
    expect(mapMsfToMcfEmploymentType('07')).to.deep.equal({id: 7, employmentType: 'Permanent'});
  });
  it('should map to Temporary when id is 02', () => {
    expect(mapMsfToMcfEmploymentType('02')).to.deep.equal({id: 2, employmentType: 'Temporary'});
  });
  it('should map to Contract when id is 03', () => {
    expect(mapMsfToMcfEmploymentType('03')).to.deep.equal({id: 3, employmentType: 'Contract'});
  });
  it('should map to Freelance when id is 06', () => {
    expect(mapMsfToMcfEmploymentType('06')).to.deep.equal({id: 6, employmentType: 'Freelance'});
  });
  it('should map to Full Time when id is 08', () => {
    expect(mapMsfToMcfEmploymentType('08')).to.deep.equal({id: 8, employmentType: 'Full Time'});
  });
  it('should map to Flexi-work when id is 09', () => {
    expect(mapMsfToMcfEmploymentType('09')).to.deep.equal({id: 9, employmentType: 'Flexi-work'});
  });
  it('should map to Internship when id is 10', () => {
    expect(mapMsfToMcfEmploymentType('10')).to.deep.equal({id: 10, employmentType: 'Internship/Traineeship'});
  });
});

describe('mapMcfToMsfEmploymentType', () => {
  it('should map to Part Time when id is 5', () => {
    expect(mapMcfToMsfEmploymentType(5)).to.deep.equal({ilpId: '05', ilpDescription: 'Part Time'});
  });
  it('should map to Permanent when id is 7', () => {
    expect(mapMcfToMsfEmploymentType(7)).to.deep.equal({ilpId: '07', ilpDescription: 'Permanent'});
  });
  it('should map to Temporary when id is 2', () => {
    expect(mapMcfToMsfEmploymentType(2)).to.deep.equal({ilpId: '02', ilpDescription: 'Temporary'});
  });
  it('should map to Contract Basis when id is 3', () => {
    expect(mapMcfToMsfEmploymentType(3)).to.deep.equal({ilpId: '03', ilpDescription: 'Contract Basis'});
  });
  it('should map to Full Time when id is 8', () => {
    expect(mapMcfToMsfEmploymentType(8)).to.deep.equal({ilpId: '08', ilpDescription: 'Full Time'});
  });
  it('should map to Flexi Work when id is 9', () => {
    expect(mapMcfToMsfEmploymentType(9)).to.deep.equal({ilpId: '09', ilpDescription: 'Flexi Work'});
  });
  it('should map to Internship when id is 10', () => {
    expect(mapMcfToMsfEmploymentType(10)).to.deep.equal({ilpId: '10', ilpDescription: 'Internship'});
  });
  it('should map to Freelance when id is 6', () => {
    expect(mapMcfToMsfEmploymentType(6)).to.deep.equal({ilpId: '06', ilpDescription: 'Freelance'});
  });
});
