import {expect} from 'chai';
import {EMPLOYMENT_TYPES, POSITION_LEVELS} from './mcf';

describe('mcf', () => {
  it('should have correct employment types', () => {
    expect(EMPLOYMENT_TYPES).to.deep.equal([
      {id: '07', name: 'Permanent'},
      {id: '08', name: 'Full Time'},
      {id: '05', name: 'Part Time'},
      {id: '03', name: 'Contract'},
      {id: '09', name: 'Flexi-work'},
      {id: '02', name: 'Temporary'},
    ]);
  });
  it('should have correct position levels', () => {
    expect(POSITION_LEVELS).to.deep.equal([
      {id: 1, description: 'Senior Management'},
      {id: 2, description: 'Middle Management'},
      {id: 3, description: 'Manager'},
      {id: 7, description: 'Professional'},
      {id: 8, description: 'Senior Executive'},
      {id: 9, description: 'Executive'},
      {id: 10, description: 'Junior Executive'},
      {id: 11, description: 'Non-executive'},
      {id: 12, description: 'Fresh/entry level'},
    ]);
  });
});
