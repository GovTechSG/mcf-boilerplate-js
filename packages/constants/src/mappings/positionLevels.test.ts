import {expect} from 'chai';
import {
  mapIcmsToMcfPositionLevel,
  mapMcfToIcmsPositionLevel,
  mapMcfToMsfPositionLevel,
  mapMsfToMcfPositionLevel,
} from './positionLevels';

describe('mapIcmsToMcfPositionLevel', () => {
  it('should map to Senior Executive when id is 357009', () => {
    expect(mapIcmsToMcfPositionLevel(357009)).to.deep.equal({id: 8, position: 'Senior Executive'});
  });
  it('should map to Junior Executive when id is 357008', () => {
    expect(mapIcmsToMcfPositionLevel(357008)).to.deep.equal({id: 10, position: 'Junior Executive'});
  });
  it('should map to Non-executive when id is 357007', () => {
    expect(mapIcmsToMcfPositionLevel(357007)).to.deep.equal({id: 11, position: 'Non-executive'});
  });
  it('should map to Manager when id is 357003', () => {
    expect(mapIcmsToMcfPositionLevel(357003)).to.deep.equal({id: 3, position: 'Manager'});
  });
  it('should map to Executive when id is 357006', () => {
    expect(mapIcmsToMcfPositionLevel(357006)).to.deep.equal({id: 9, position: 'Executive'});
  });
  it('should map to Fresh/entry level when id is 357004', () => {
    expect(mapIcmsToMcfPositionLevel(357004)).to.deep.equal({id: 12, position: 'Fresh/entry level'});
  });
  it('should map to Professional when id is 357005', () => {
    expect(mapIcmsToMcfPositionLevel(357005)).to.deep.equal({id: 7, position: 'Professional'});
  });
  it('should map to Middle Management when id is 357002', () => {
    expect(mapIcmsToMcfPositionLevel(357002)).to.deep.equal({id: 2, position: 'Middle Management'});
  });
  it('should map to Senior Management when id is 357001', () => {
    expect(mapIcmsToMcfPositionLevel(357001)).to.deep.equal({id: 1, position: 'Senior Management'});
  });
});

describe('mapMcfToIcmsPositionLevel', () => {
  it('should map to Senior Executive when id is 8', () => {
    expect(mapMcfToIcmsPositionLevel(8)).to.deep.equal({id: 357009, position: 'Senior Executive'});
  });
  it('should map to Junior Executive when id is 10', () => {
    expect(mapMcfToIcmsPositionLevel(10)).to.deep.equal({id: 357008, position: 'Junior Executive'});
  });
  it('should map to Non-executive when id is 11', () => {
    expect(mapMcfToIcmsPositionLevel(11)).to.deep.equal({id: 357007, position: 'Non-executive'});
  });
  it('should map to Manager when id is 3', () => {
    expect(mapMcfToIcmsPositionLevel(3)).to.deep.equal({id: 357003, position: 'Manager'});
  });
  it('should map to Executive when id is 9', () => {
    expect(mapMcfToIcmsPositionLevel(9)).to.deep.equal({id: 357006, position: 'Executive'});
  });
  it('should map to Fresh/entry level when id is 12', () => {
    expect(mapMcfToIcmsPositionLevel(12)).to.deep.equal({id: 357004, position: 'Fresh/entry level'});
  });
  it('should map to Professional when id is 7', () => {
    expect(mapMcfToIcmsPositionLevel(7)).to.deep.equal({id: 357005, position: 'Professional'});
  });
  it('should map to Middle Management when id is 2', () => {
    expect(mapMcfToIcmsPositionLevel(2)).to.deep.equal({id: 357002, position: 'Middle Management'});
  });
  it('should map to Senior Management when id is 1', () => {
    expect(mapMcfToIcmsPositionLevel(1)).to.deep.equal({id: 357001, position: 'Senior Management'});
  });
});

describe('mapMsfToMcfPositionLevel', () => {
  it('should map to Senior Executive when id is 8', () => {
    expect(mapMsfToMcfPositionLevel(8)).to.deep.equal({id: 8, position: 'Senior Executive'});
  });
  it('should map to Junior Executive when id is 10', () => {
    expect(mapMsfToMcfPositionLevel(10)).to.deep.equal({id: 10, position: 'Junior Executive'});
  });
  it('should map to Non-executive when id is 11', () => {
    expect(mapMsfToMcfPositionLevel(11)).to.deep.equal({id: 11, position: 'Non-executive'});
  });
  it('should map to Manager when id is 3', () => {
    expect(mapMsfToMcfPositionLevel(3)).to.deep.equal({id: 3, position: 'Manager'});
  });
  it('should map to Executive when id is 9', () => {
    expect(mapMsfToMcfPositionLevel(9)).to.deep.equal({id: 9, position: 'Executive'});
  });
  it('should map to Fresh/entry level when id is 12', () => {
    expect(mapMsfToMcfPositionLevel(12)).to.deep.equal({id: 12, position: 'Fresh/entry level'});
  });
  it('should map to Professional when id is 7', () => {
    expect(mapMsfToMcfPositionLevel(7)).to.deep.equal({id: 7, position: 'Professional'});
  });
  it('should map to Middle Management when id is 2', () => {
    expect(mapMsfToMcfPositionLevel(2)).to.deep.equal({id: 2, position: 'Middle Management'});
  });
  it('should map to Senior Management when id is 1', () => {
    expect(mapMsfToMcfPositionLevel(1)).to.deep.equal({id: 1, position: 'Senior Management'});
  });
});

describe('mapMcfToMsfPositionLevel', () => {
  it('should map to Senior Executive when id is 8', () => {
    expect(mapMcfToMsfPositionLevel(8)).to.deep.equal({jobLevelCode: 8, description: 'Senior Executive'});
  });
  it('should map to Junior Executive when id is 10', () => {
    expect(mapMcfToMsfPositionLevel(10)).to.deep.equal({jobLevelCode: 10, description: 'Junior Executive'});
  });
  it('should map to Non-executive when id is 11', () => {
    expect(mapMcfToMsfPositionLevel(11)).to.deep.equal({jobLevelCode: 11, description: 'Non-executive'});
  });
  it('should map to Manager when id is 3', () => {
    expect(mapMcfToMsfPositionLevel(3)).to.deep.equal({jobLevelCode: 3, description: 'Manager'});
  });
  it('should map to Executive when id is 9', () => {
    expect(mapMcfToMsfPositionLevel(9)).to.deep.equal({jobLevelCode: 9, description: 'Executive'});
  });
  it('should map to Fresh / Entry level when id is 12', () => {
    expect(mapMcfToMsfPositionLevel(12)).to.deep.equal({jobLevelCode: 12, description: 'Fresh / Entry level'});
  });
  it('should map to Professional when id is 7', () => {
    expect(mapMcfToMsfPositionLevel(7)).to.deep.equal({jobLevelCode: 7, description: 'Professional'});
  });
  it('should map to Middle Management when id is 2', () => {
    expect(mapMcfToMsfPositionLevel(2)).to.deep.equal({jobLevelCode: 2, description: 'Middle Management'});
  });
  it('should map to Senior Management when id is 1', () => {
    expect(mapMcfToMsfPositionLevel(1)).to.deep.equal({jobLevelCode: 1, description: 'Senior Management'});
  });
});
