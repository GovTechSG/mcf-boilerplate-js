import {expect} from 'chai';
import {EMPLOYMENT_TYPES} from './mcf';

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
});
