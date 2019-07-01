import {expect} from 'chai';
import {mapIcmsToMcfScheme, mapMcfToIcmsScheme, mapMcfToMsfScheme, mapMsfToMcfScheme} from './schemes';

describe('mapIcmsToMcfScheme', () => {
  it('should map to Career Support when id is 541001', () => {
    expect(mapIcmsToMcfScheme(541001)).to.deep.equal({
      id: 4,
      scheme: 'Career Support',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/wsg-career-support-programme-employers.html',
    });
  });
  it('should map to Professional Conversion Programme (PCP) when id is 541002', () => {
    expect(mapIcmsToMcfScheme(541002)).to.deep.equal({
      id: 2,
      scheme: 'Professional Conversion Programme (PCP)',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/professional-conversion-programmes-employers.html',
    });
  });
  it('should map to P-Max when id is 541003', () => {
    expect(mapIcmsToMcfScheme(541003)).to.deep.equal({
      id: 1,
      scheme: 'P-Max',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/p-max-employer.html',
    });
  });
  it('should map to Career Trial when id is 541005', () => {
    expect(mapIcmsToMcfScheme(541005)).to.deep.equal({
      id: 3,
      scheme: 'Career Trial',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/career-trial-employers.html',
    });
  });
});

describe('mapMcfToIcmsScheme', () => {
  it('should map to CSP when id is 4', () => {
    expect(mapMcfToIcmsScheme(4)).to.deep.equal({id: 541001, scheme: 'CSP'});
  });
  it('should map to PCP when id is 2', () => {
    expect(mapMcfToIcmsScheme(2)).to.deep.equal({id: 541002, scheme: 'PCP'});
  });
  it('should map to P-Max when id is 1', () => {
    expect(mapMcfToIcmsScheme(1)).to.deep.equal({id: 541003, scheme: 'P-Max'});
  });
  it('should map to Career Trial when id is 3', () => {
    expect(mapMcfToIcmsScheme(3)).to.deep.equal({id: 541005, scheme: 'Career Trial'});
  });
});

describe('mapMsfToMcfScheme', () => {
  it('should map to Career Support when id is 01', () => {
    expect(mapMsfToMcfScheme('01')).to.deep.equal({
      id: 4,
      scheme: 'Career Support',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/wsg-career-support-programme-employers.html',
    });
  });
  it('should map to Professional Conversion Programme (PCP) when id is 05', () => {
    expect(mapMsfToMcfScheme('05')).to.deep.equal({
      id: 2,
      scheme: 'Professional Conversion Programme (PCP)',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/professional-conversion-programmes-employers.html',
    });
  });
  it('should map to P-Max when id is 02', () => {
    expect(mapMsfToMcfScheme('02')).to.deep.equal({
      id: 1,
      scheme: 'P-Max',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/p-max-employer.html',
    });
  });
  it('should map to Career Trial when id is 06', () => {
    expect(mapMsfToMcfScheme('06')).to.deep.equal({
      id: 3,
      scheme: 'Career Trial',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/career-trial-employers.html',
    });
  });
});

describe('mapMcfToMsfScheme', () => {
  it('should map to CSP when id is 4', () => {
    expect(mapMcfToMsfScheme(4)).to.deep.equal({id: '01', programme: 'CSP'});
  });
  it('should map to PCP when id is 2', () => {
    expect(mapMcfToMsfScheme(2)).to.deep.equal({id: '05', programme: 'PCP'});
  });
  it('should map to P-Max when id is 1', () => {
    expect(mapMcfToMsfScheme(1)).to.deep.equal({id: '02', programme: 'P-Max'});
  });
  it('should map to Career Trial when id is 3', () => {
    expect(mapMcfToMsfScheme(3)).to.deep.equal({id: '06', programme: 'Career Trial'});
  });
});
