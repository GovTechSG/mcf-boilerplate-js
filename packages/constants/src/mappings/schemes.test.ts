import {expect} from 'chai';
import {mapIcmsToMcfScheme, mapMcfToIcmsScheme} from './schemes';

describe('mapIcmsToMcfScheme', () => {
  it('should map to Career Support when id is 541001', () => {
    expect(mapIcmsToMcfScheme(541001)).to.deep.equal({id: 4, scheme: 'Career Support'});
  });
  it('should map to Professional Conversion Programme (PCP) when id is 541002', () => {
    expect(mapIcmsToMcfScheme(541002)).to.deep.equal({id: 2, scheme: 'Professional Conversion Programme (PCP)'});
  });
  it('should map to P-Max when id is 541003', () => {
    expect(mapIcmsToMcfScheme(541003)).to.deep.equal({id: 1, scheme: 'P-Max'});
  });
  it('should map to Career Trial when id is 541005', () => {
    expect(mapIcmsToMcfScheme(541005)).to.deep.equal({id: 3, scheme: 'Career Trial'});
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
