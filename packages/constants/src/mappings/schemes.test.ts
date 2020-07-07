import {expect} from 'chai';
import {mapIcmsToMcfScheme, mapMcfToIcmsScheme, mapMcfToMsfScheme, mapMsfToMcfScheme} from './schemes';
import {SCHEME_ID} from '../mcf';

describe('mapIcmsToMcfScheme', () => {
  it('should map to Career Support Programme when id is 541001', () => {
    expect(mapIcmsToMcfScheme(541001)).to.deep.equal({
      id: SCHEME_ID.CAREER_SUPPORT,
      scheme: 'Career Support Programme',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/wsg-career-support-programme-employers.html',
    });
  });
  it('should map to Professional Conversion Programme when id is 541002', () => {
    expect(mapIcmsToMcfScheme(541002)).to.deep.equal({
      id: SCHEME_ID.PCP,
      scheme: 'Professional Conversion Programme',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/professional-conversion-programmes-employers.html',
    });
  });
  it('should map to P-Max when id is 541003', () => {
    expect(mapIcmsToMcfScheme(541003)).to.deep.equal({
      id: SCHEME_ID.P_MAX,
      scheme: 'P-Max',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/p-max-employer.html',
    });
  });
  it('should map to Career Trial when id is 541005', () => {
    expect(mapIcmsToMcfScheme(541005)).to.deep.equal({
      id: SCHEME_ID.CAREER_TRIAL,
      scheme: 'Career Trial',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/career-trial-employers.html',
    });
  });
  it('should map to SGUnited Traineeships when id is 541006', () => {
    expect(mapIcmsToMcfScheme(541006)).to.deep.equal({
      id: SCHEME_ID.SG_UNITED_TRAINEESHIPS,
      scheme: 'SGUnited Traineeships',
      startDate: '2020-06-01',
      expiryDate: '2047-06-01',
      link: 'https://www.wsg.gov.sg/SGUnitedTraineeships-HostCompanies.html',
    });
  });
  it('should map to SGUnited Mid-Career Pathways when id is 541007', () => {
    expect(mapIcmsToMcfScheme(541007)).to.deep.equal({
      id: SCHEME_ID.SG_UNITED_MID_CAREER_PATHWAYS,
      scheme: 'SGUnited Mid-Career Pathways',
      startDate: '2020-07-01',
      expiryDate: '2047-07-01',
      link: 'https://www.wsg.gov.sg/SGUnitedMidCareerPathways-HostOrganisations.html',
    });
  });
});

describe('mapMcfToIcmsScheme', () => {
  it('should map to CSP when id is 4', () => {
    expect(mapMcfToIcmsScheme(SCHEME_ID.CAREER_SUPPORT)).to.deep.equal({id: 541001, scheme: 'CSP'});
  });
  it('should map to PCP when id is 2', () => {
    expect(mapMcfToIcmsScheme(SCHEME_ID.PCP)).to.deep.equal({id: 541002, scheme: 'PCP'});
  });
  it('should map to P-Max when id is 1', () => {
    expect(mapMcfToIcmsScheme(SCHEME_ID.P_MAX)).to.deep.equal({id: 541003, scheme: 'P-Max'});
  });
  it('should map to Career Trial when id is 3', () => {
    expect(mapMcfToIcmsScheme(SCHEME_ID.CAREER_TRIAL)).to.deep.equal({id: 541005, scheme: 'Career Trial'});
  });
  it('should map to SGUnited Traineeships when id is 5', () => {
    expect(mapMcfToIcmsScheme(SCHEME_ID.SG_UNITED_TRAINEESHIPS)).to.deep.equal({
      id: 541006,
      scheme: 'SGUnited Traineeships',
    });
  });
  it('should map to SGUnited Mid-Career Pathways when id is 6', () => {
    expect(mapMcfToIcmsScheme(SCHEME_ID.SG_UNITED_MID_CAREER_PATHWAYS)).to.deep.equal({
      id: 541007,
      scheme: 'SGUnited Mid-Career Pathways',
    });
  });
});

describe('mapMsfToMcfScheme', () => {
  it('should map to Career Support Programme when id is 01', () => {
    expect(mapMsfToMcfScheme('01')).to.deep.equal({
      id: SCHEME_ID.CAREER_SUPPORT,
      scheme: 'Career Support Programme',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/wsg-career-support-programme-employers.html',
    });
  });
  it('should map to Professional Conversion Programme when id is 05', () => {
    expect(mapMsfToMcfScheme('05')).to.deep.equal({
      id: SCHEME_ID.PCP,
      scheme: 'Professional Conversion Programme',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/professional-conversion-programmes-employers.html',
    });
  });
  it('should map to P-Max when id is 02', () => {
    expect(mapMsfToMcfScheme('02')).to.deep.equal({
      id: SCHEME_ID.P_MAX,
      scheme: 'P-Max',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/p-max-employer.html',
    });
  });
  it('should map to Career Trial when id is 06', () => {
    expect(mapMsfToMcfScheme('06')).to.deep.equal({
      id: SCHEME_ID.CAREER_TRIAL,
      scheme: 'Career Trial',
      startDate: '1977-05-25',
      expiryDate: '2055-05-04',
      link: 'http://www.wsg.gov.sg/programmes-and-initiatives/career-trial-employers.html',
    });
  });
  it('should map to SGUnited Traineeships when id is 07', () => {
    expect(mapMsfToMcfScheme('07')).to.deep.equal({
      id: SCHEME_ID.SG_UNITED_TRAINEESHIPS,
      scheme: 'SGUnited Traineeships',
      startDate: '2020-06-01',
      expiryDate: '2047-06-01',
      link: 'https://www.wsg.gov.sg/SGUnitedTraineeships-HostCompanies.html',
    });
  });
  it('should map to SGUnited Mid-Career Pathways when id is 07', () => {
    expect(mapMsfToMcfScheme('08')).to.deep.equal({
      id: SCHEME_ID.SG_UNITED_MID_CAREER_PATHWAYS,
      scheme: 'SGUnited Mid-Career Pathways',
      startDate: '2020-07-01',
      expiryDate: '2047-07-01',
      link: 'https://www.wsg.gov.sg/SGUnitedMidCareerPathways-HostOrganisations.html',
    });
  });
});

describe('mapMcfToMsfScheme', () => {
  it('should map to CSP when id is 4', () => {
    expect(mapMcfToMsfScheme(SCHEME_ID.CAREER_SUPPORT)).to.deep.equal({id: '01', programme: 'CSP'});
  });
  it('should map to PCP when id is 2', () => {
    expect(mapMcfToMsfScheme(SCHEME_ID.PCP)).to.deep.equal({id: '05', programme: 'PCP'});
  });
  it('should map to P-Max when id is 1', () => {
    expect(mapMcfToMsfScheme(SCHEME_ID.P_MAX)).to.deep.equal({id: '02', programme: 'P-Max'});
  });
  it('should map to Career Trial when id is 3', () => {
    expect(mapMcfToMsfScheme(SCHEME_ID.CAREER_TRIAL)).to.deep.equal({id: '06', programme: 'Career Trial'});
  });
  it('should map to SGUnited Traineeships when id is 5', () => {
    expect(mapMcfToMsfScheme(SCHEME_ID.SG_UNITED_TRAINEESHIPS)).to.deep.equal({
      id: '07',
      programme: 'SGUnited Traineeships',
    });
  });
  it('should map to SGUnited Mid-Career Pathways when id is 6', () => {
    expect(mapMcfToMsfScheme(SCHEME_ID.SG_UNITED_MID_CAREER_PATHWAYS)).to.deep.equal({
      id: '08',
      programme: 'SGUnited Mid-Career Pathways',
    });
  });
});
