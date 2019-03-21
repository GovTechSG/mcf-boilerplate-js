import {expect} from 'chai';
import {mapIcmsToMsf} from './msf';

describe('msf', () => {
  it('should map to Part Time when id is 440002', () => {
    expect(mapIcmsToMsf(440002)).to.deep.equal({id: '05', name: 'Part Time'});
  });
  it('should map to Permanent when id is 440003', () => {
    expect(mapIcmsToMsf(440003)).to.deep.equal({id: '07', name: 'Permanent'});
  });
  it('should map to Temporary when id is 440004', () => {
    expect(mapIcmsToMsf(440004)).to.deep.equal({id: '02', name: 'Temporary'});
  });
  it('should map to Contract when id is 440005', () => {
    expect(mapIcmsToMsf(440005)).to.deep.equal({id: '03', name: 'Contract'});
  });
  it('should map to Freelance when id is 440006', () => {
    expect(mapIcmsToMsf(440006)).to.deep.equal({id: '06', name: 'Freelance'});
  });
  it('should map to Full Time  when id is 440007', () => {
    expect(mapIcmsToMsf(440007)).to.deep.equal({id: '08', name: 'Full Time'});
  });
  it('should map to Flexi Time when id is 440008', () => {
    expect(mapIcmsToMsf(440008)).to.deep.equal({id: '09', name: 'Flexi Time'});
  });
  it('should map to Internship when id is 440009', () => {
    expect(mapIcmsToMsf(440009)).to.deep.equal({id: '10', name: 'Internship'});
  });
});
