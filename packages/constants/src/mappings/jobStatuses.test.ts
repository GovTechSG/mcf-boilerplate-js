import {expect} from 'chai';
import {mapIcmsToMcfJobStatuses, mapMcfToIcmsJobStatuses} from './jobStatuses';

describe('mapIcmsToMcfJobStatuses', () => {
  it('should map to Closed when id is 9', () => {
    expect(mapIcmsToMcfJobStatuses(9)).to.deep.equal({id: 1, status: 'Closed'});
  });
  it('should map to Draft when id is 83', () => {
    expect(mapIcmsToMcfJobStatuses(83)).to.deep.equal({id: 2, status: 'Draft'});
  });
  it('should map to Open when id is 102', () => {
    expect(mapIcmsToMcfJobStatuses(102)).to.deep.equal({id: 3, status: 'Open'});
  });
  it('should map to Re-open when id is 103', () => {
    expect(mapIcmsToMcfJobStatuses(103)).to.deep.equal({id: 4, status: 'Re-open'});
  });
});

describe('mapMcfToIcmsJobStatuses', () => {
  it('should map to Closed when id is 1', () => {
    expect(mapMcfToIcmsJobStatuses(1)).to.deep.equal({id: 9, status: 'Closed'});
  });
  it('should map to Draft when id is 2', () => {
    expect(mapMcfToIcmsJobStatuses(2)).to.deep.equal({id: 83, status: 'Draft'});
  });
  it('should map to Open when id is 3', () => {
    expect(mapMcfToIcmsJobStatuses(3)).to.deep.equal({id: 102, status: 'Open'});
  });
  it('should map to Re-open when id is 4', () => {
    expect(mapMcfToIcmsJobStatuses(4)).to.deep.equal({id: 103, status: 'Re-open'});
  });
});
