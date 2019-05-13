import {expect} from 'chai';
import {mapIcmsToMcfDistrict, mapMcfToIcmsDistrict, mapMcfToMsfDistrict, mapMsfToMcfDistrict} from './districts';

describe('mapIcmsToMcfDistrict', () => {
  it('should map to D01 when id is 1', () => {
    expect(mapIcmsToMcfDistrict(1)).to.deep.equal({
      id: 1,
      location: 'D01 Cecil, Marina, People’s Park, Raffles Place',
      region: 'Central',
      sectors: ['01', '02', '03', '04', '05', '06'],
    });
  });
  it('should map to D02 when id is 2', () => {
    expect(mapIcmsToMcfDistrict(2)).to.deep.equal({
      id: 2,
      location: 'D02 Anson, Tanjong Pagar',
      region: 'Central',
      sectors: ['07', '08'],
    });
  });
  it('should map to D03 when id is 3', () => {
    expect(mapIcmsToMcfDistrict(3)).to.deep.equal({
      id: 3,
      location: 'D03 Queenstown, Tiong Bahru',
      region: 'South',
      sectors: ['14', '15', '16'],
    });
  });
  it('should map to D04 when id is 4', () => {
    expect(mapIcmsToMcfDistrict(4)).to.deep.equal({
      id: 4,
      location: 'D04 Harbourfront,Telok Blangah, Sentosa Island',
      region: 'South',
      sectors: ['09', '10'],
    });
  });
  it('should map to D05 when id is 5', () => {
    expect(mapIcmsToMcfDistrict(5)).to.deep.equal({
      id: 5,
      location: 'D05 Clementi New Town, Hong Leong Garden, Pasir Panjang',
      region: 'South',
      sectors: ['11', '12', '13'],
    });
  });
  it('should map to D06 when id is 6', () => {
    expect(mapIcmsToMcfDistrict(6)).to.deep.equal({
      id: 6,
      location: 'D06 Beach Road, High Street',
      region: 'East',
      sectors: ['17'],
    });
  });
  it('should map to D07 when id is 7', () => {
    expect(mapIcmsToMcfDistrict(7)).to.deep.equal({
      id: 7,
      location: 'D07 Golden Mile, Middle Road',
      region: 'East',
      sectors: ['18', '19'],
    });
  });
  it('should map to D08 when id is 8', () => {
    expect(mapIcmsToMcfDistrict(8)).to.deep.equal({
      id: 8,
      location: 'D08 Little India',
      region: 'Central',
      sectors: ['20', '21'],
    });
  });
  it('should map to D09 when id is 9', () => {
    expect(mapIcmsToMcfDistrict(9)).to.deep.equal({
      id: 9,
      location: 'D09 Cairnhill, Orchard, River Valley',
      region: 'Central',
      sectors: ['22', '23'],
    });
  });
  it('should map to D10 when id is 10', () => {
    expect(mapIcmsToMcfDistrict(10)).to.deep.equal({
      id: 10,
      location: 'D10 Ardmore, Bukit Timah, Holland Road, Tanglin',
      region: 'Central',
      sectors: ['24', '25', '26', '27'],
    });
  });
  it('should map to D11 when id is 11', () => {
    expect(mapIcmsToMcfDistrict(11)).to.deep.equal({
      id: 11,
      location: 'D11 Novena, Thomson, Watten Estate',
      region: 'Central',
      sectors: ['28', '29', '30'],
    });
  });
  it('should map to D12 when id is 12', () => {
    expect(mapIcmsToMcfDistrict(12)).to.deep.equal({
      id: 12,
      location: 'D12 Balestier, Serangoon, Toa Payoh',
      region: 'Central',
      sectors: ['31', '32', '33'],
    });
  });
  it('should map to D13 when id is 13', () => {
    expect(mapIcmsToMcfDistrict(13)).to.deep.equal({
      id: 13,
      location: 'D13 Macpherson, Braddell',
      region: 'Central',
      sectors: ['34', '35', '36', '37'],
    });
  });
  it('should map to D14 when id is 14', () => {
    expect(mapIcmsToMcfDistrict(14)).to.deep.equal({
      id: 14,
      location: 'D14 Geylang, Eunos',
      region: 'East',
      sectors: ['38', '39', '40', '41'],
    });
  });
  it('should map to D15 when id is 15', () => {
    expect(mapIcmsToMcfDistrict(15)).to.deep.equal({
      id: 15,
      location: 'D15 Katong, Joo Chiat, Amber Road',
      region: 'East',
      sectors: ['42', '43', '44', '45'],
    });
  });
  it('should map to D16 when id is 16', () => {
    expect(mapIcmsToMcfDistrict(16)).to.deep.equal({
      id: 16,
      location: 'D16 Upper East Coast, Bedok, Eastwood, Kew Drive',
      region: 'East',
      sectors: ['46', '47', '48'],
    });
  });
  it('should map to D17 when id is 17', () => {
    expect(mapIcmsToMcfDistrict(17)).to.deep.equal({
      id: 17,
      location: 'D17 Loyang, Changi',
      region: 'East',
      sectors: ['49', '50', '81', '91'],
    });
  });
  it('should map to D18 when id is 18', () => {
    expect(mapIcmsToMcfDistrict(18)).to.deep.equal({
      id: 18,
      location: 'D18 Tampines, Pasir Ris',
      region: 'East',
      sectors: ['51', '52'],
    });
  });
  it('should map to D19 when id is 19', () => {
    expect(mapIcmsToMcfDistrict(19)).to.deep.equal({
      id: 19,
      location: 'D19 Serangoon Garden, Hougang, Sengkang, Punggol',
      region: 'North',
      sectors: ['53', '54', '55', '82'],
    });
  });
  it('should map to D20 when id is 20', () => {
    expect(mapIcmsToMcfDistrict(20)).to.deep.equal({
      id: 20,
      location: 'D20 Bishan, Ang Mo Kio',
      region: 'North',
      sectors: ['56', '57'],
    });
  });
  it('should map to D21 when id is 21', () => {
    expect(mapIcmsToMcfDistrict(21)).to.deep.equal({
      id: 21,
      location: 'D21 Upper Bukit Timah, Clementi Park, Ulu Pandan',
      region: 'West',
      sectors: ['58', '59'],
    });
  });
  it('should map to D22 when id is 22', () => {
    expect(mapIcmsToMcfDistrict(22)).to.deep.equal({
      id: 22,
      location: 'D22 Jurong, Jurong Island, Tuas',
      region: 'West',
      sectors: ['60', '61', '62', '63', '64'],
    });
  });
  it('should map to D23 when id is 23', () => {
    expect(mapIcmsToMcfDistrict(23)).to.deep.equal({
      id: 23,
      location: 'D23 Hillview, Dairy Farm, Bukit Panjang, Choa Chu Kang',
      region: 'West',
      sectors: ['65', '66', '67', '68'],
    });
  });
  it('should map to D24 when id is 24', () => {
    expect(mapIcmsToMcfDistrict(24)).to.deep.equal({
      id: 24,
      location: 'D24 Lim Chu Kang, Tengah',
      region: 'West',
      sectors: ['69', '70', '71'],
    });
  });
  it('should map to D25 when id is 25', () => {
    expect(mapIcmsToMcfDistrict(25)).to.deep.equal({
      id: 25,
      location: 'D25 Kranji, Woodgrove, Woodlands',
      region: 'North',
      sectors: ['72', '73'],
    });
  });
  it('should map to D26 when id is 26', () => {
    expect(mapIcmsToMcfDistrict(26)).to.deep.equal({
      id: 26,
      location: 'D26 Upper Thomson, Springleaf',
      region: 'North',
      sectors: ['77', '78'],
    });
  });
  it('should map to D27 when id is 27', () => {
    expect(mapIcmsToMcfDistrict(27)).to.deep.equal({
      id: 27,
      location: 'D27 Yishun, Sembawang',
      region: 'North',
      sectors: ['75', '76'],
    });
  });
  it('should map to D28 when id is 28', () => {
    expect(mapIcmsToMcfDistrict(28)).to.deep.equal({
      id: 28,
      location: 'D28 Seletar',
      region: 'North',
      sectors: ['79', '80'],
    });
  });
  it('should map to Islandwide when id is 9999', () => {
    expect(mapIcmsToMcfDistrict(9999)).to.deep.equal({
      id: 998,
      location: 'Islandwide',
      region: 'Islandwide',
      sectors: [],
    });
  });
});

describe('mapMcfToIcmsDistrict', () => {
  it('should map to D01 Central when id is 1', () => {
    expect(mapMcfToIcmsDistrict(1)).to.deep.equal({
      id: 1,
      region: 'Central',
    });
  });
  it('should map to D02 Central when id is 2', () => {
    expect(mapMcfToIcmsDistrict(2)).to.deep.equal({
      id: 2,
      region: 'Central',
    });
  });
  it('should map to D03 South when id is 3', () => {
    expect(mapMcfToIcmsDistrict(3)).to.deep.equal({
      id: 3,
      region: 'South',
    });
  });
  it('should map to D04 South when id is 4', () => {
    expect(mapMcfToIcmsDistrict(4)).to.deep.equal({
      id: 4,
      region: 'South',
    });
  });
  it('should map to D05 South when id is 5', () => {
    expect(mapMcfToIcmsDistrict(5)).to.deep.equal({
      id: 5,
      region: 'South',
    });
  });
  it('should map to D06 East when id is 6', () => {
    expect(mapMcfToIcmsDistrict(6)).to.deep.equal({
      id: 6,
      region: 'East',
    });
  });
  it('should map to D07 East when id is 7', () => {
    expect(mapMcfToIcmsDistrict(7)).to.deep.equal({
      id: 7,
      region: 'East',
    });
  });
  it('should map to D08 Central when id is 8', () => {
    expect(mapMcfToIcmsDistrict(8)).to.deep.equal({
      id: 8,
      region: 'Central',
    });
  });
  it('should map to D09 Central when id is 9', () => {
    expect(mapMcfToIcmsDistrict(9)).to.deep.equal({
      id: 9,
      region: 'Central',
    });
  });
  it('should map to D10 Central when id is 10', () => {
    expect(mapMcfToIcmsDistrict(10)).to.deep.equal({
      id: 10,
      region: 'Central',
    });
  });
  it('should map to D11 Central when id is 11', () => {
    expect(mapMcfToIcmsDistrict(11)).to.deep.equal({
      id: 11,
      region: 'Central',
    });
  });
  it('should map to D12 Central when id is 12', () => {
    expect(mapMcfToIcmsDistrict(12)).to.deep.equal({
      id: 12,
      region: 'Central',
    });
  });
  it('should map to D13 Central when id is 13', () => {
    expect(mapMcfToIcmsDistrict(13)).to.deep.equal({
      id: 13,
      region: 'Central',
    });
  });
  it('should map to D14 East when id is 14', () => {
    expect(mapMcfToIcmsDistrict(14)).to.deep.equal({
      id: 14,
      region: 'East',
    });
  });
  it('should map to D15 East when id is 15', () => {
    expect(mapMcfToIcmsDistrict(15)).to.deep.equal({
      id: 15,
      region: 'East',
    });
  });
  it('should map to D16 East when id is 16', () => {
    expect(mapMcfToIcmsDistrict(16)).to.deep.equal({
      id: 16,
      region: 'East',
    });
  });
  it('should map to D17 East when id is 17', () => {
    expect(mapMcfToIcmsDistrict(17)).to.deep.equal({
      id: 17,
      region: 'East',
    });
  });
  it('should map to D18 East when id is 18', () => {
    expect(mapMcfToIcmsDistrict(18)).to.deep.equal({
      id: 18,
      region: 'East',
    });
  });
  it('should map to D19 North when id is 19', () => {
    expect(mapMcfToIcmsDistrict(19)).to.deep.equal({
      id: 19,
      region: 'North',
    });
  });
  it('should map to D20 North when id is 20', () => {
    expect(mapMcfToIcmsDistrict(20)).to.deep.equal({
      id: 20,
      region: 'North',
    });
  });
  it('should map to D21 West when id is 21', () => {
    expect(mapMcfToIcmsDistrict(21)).to.deep.equal({
      id: 21,
      region: 'West',
    });
  });
  it('should map to D22 West when id is 22', () => {
    expect(mapMcfToIcmsDistrict(22)).to.deep.equal({
      id: 22,
      region: 'West',
    });
  });
  it('should map to D23 West when id is 23', () => {
    expect(mapMcfToIcmsDistrict(23)).to.deep.equal({
      id: 23,
      region: 'West',
    });
  });
  it('should map to D24 West when id is 24', () => {
    expect(mapMcfToIcmsDistrict(24)).to.deep.equal({
      id: 24,
      region: 'West',
    });
  });
  it('should map to D25 North when id is 25', () => {
    expect(mapMcfToIcmsDistrict(25)).to.deep.equal({
      id: 25,
      region: 'North',
    });
  });
  it('should map to D26 North when id is 26', () => {
    expect(mapMcfToIcmsDistrict(26)).to.deep.equal({
      id: 26,
      region: 'North',
    });
  });
  it('should map to D27 North when id is 27', () => {
    expect(mapMcfToIcmsDistrict(27)).to.deep.equal({
      id: 27,
      region: 'North',
    });
  });
  it('should map to D28 North when id is 28', () => {
    expect(mapMcfToIcmsDistrict(28)).to.deep.equal({
      id: 28,
      region: 'North',
    });
  });
  it('should map to Islandwide when id is 998', () => {
    expect(mapMcfToIcmsDistrict(998)).to.deep.equal({
      id: 9999,
      region: 'Islandwide',
    });
  });
  it('should map to Overseas when id is 999', () => {
    expect(mapMcfToIcmsDistrict(999)).to.be.undefined;
  });
});

describe('mapMsfToMcfDistrict', () => {
  it('should map to D01 when id is 1', () => {
    expect(mapMsfToMcfDistrict(1)).to.deep.equal({
      id: 1,
      location: 'D01 Cecil, Marina, People’s Park, Raffles Place',
      region: 'Central',
      sectors: ['01', '02', '03', '04', '05', '06'],
    });
  });
  it('should map to D02 when id is 2', () => {
    expect(mapMsfToMcfDistrict(2)).to.deep.equal({
      id: 2,
      location: 'D02 Anson, Tanjong Pagar',
      region: 'Central',
      sectors: ['07', '08'],
    });
  });
  it('should map to D03 when id is 3', () => {
    expect(mapMsfToMcfDistrict(3)).to.deep.equal({
      id: 3,
      location: 'D03 Queenstown, Tiong Bahru',
      region: 'South',
      sectors: ['14', '15', '16'],
    });
  });
  it('should map to D04 when id is 4', () => {
    expect(mapMsfToMcfDistrict(4)).to.deep.equal({
      id: 4,
      location: 'D04 Harbourfront,Telok Blangah, Sentosa Island',
      region: 'South',
      sectors: ['09', '10'],
    });
  });
  it('should map to D05 when id is 5', () => {
    expect(mapMsfToMcfDistrict(5)).to.deep.equal({
      id: 5,
      location: 'D05 Clementi New Town, Hong Leong Garden, Pasir Panjang',
      region: 'South',
      sectors: ['11', '12', '13'],
    });
  });
  it('should map to D06 when id is 6', () => {
    expect(mapMsfToMcfDistrict(6)).to.deep.equal({
      id: 6,
      location: 'D06 Beach Road, High Street',
      region: 'East',
      sectors: ['17'],
    });
  });
  it('should map to D07 when id is 7', () => {
    expect(mapMsfToMcfDistrict(7)).to.deep.equal({
      id: 7,
      location: 'D07 Golden Mile, Middle Road',
      region: 'East',
      sectors: ['18', '19'],
    });
  });
  it('should map to D08 when id is 8', () => {
    expect(mapMsfToMcfDistrict(8)).to.deep.equal({
      id: 8,
      location: 'D08 Little India',
      region: 'Central',
      sectors: ['20', '21'],
    });
  });
  it('should map to D09 when id is 9', () => {
    expect(mapMsfToMcfDistrict(9)).to.deep.equal({
      id: 9,
      location: 'D09 Cairnhill, Orchard, River Valley',
      region: 'Central',
      sectors: ['22', '23'],
    });
  });
  it('should map to D10 when id is 10', () => {
    expect(mapMsfToMcfDistrict(10)).to.deep.equal({
      id: 10,
      location: 'D10 Ardmore, Bukit Timah, Holland Road, Tanglin',
      region: 'Central',
      sectors: ['24', '25', '26', '27'],
    });
  });
  it('should map to D11 when id is 11', () => {
    expect(mapMsfToMcfDistrict(11)).to.deep.equal({
      id: 11,
      location: 'D11 Novena, Thomson, Watten Estate',
      region: 'Central',
      sectors: ['28', '29', '30'],
    });
  });
  it('should map to D12 when id is 12', () => {
    expect(mapMsfToMcfDistrict(12)).to.deep.equal({
      id: 12,
      location: 'D12 Balestier, Serangoon, Toa Payoh',
      region: 'Central',
      sectors: ['31', '32', '33'],
    });
  });
  it('should map to D13 when id is 13', () => {
    expect(mapMsfToMcfDistrict(13)).to.deep.equal({
      id: 13,
      location: 'D13 Macpherson, Braddell',
      region: 'Central',
      sectors: ['34', '35', '36', '37'],
    });
  });
  it('should map to D14 when id is 14', () => {
    expect(mapMsfToMcfDistrict(14)).to.deep.equal({
      id: 14,
      location: 'D14 Geylang, Eunos',
      region: 'East',
      sectors: ['38', '39', '40', '41'],
    });
  });
  it('should map to D15 when id is 15', () => {
    expect(mapMsfToMcfDistrict(15)).to.deep.equal({
      id: 15,
      location: 'D15 Katong, Joo Chiat, Amber Road',
      region: 'East',
      sectors: ['42', '43', '44', '45'],
    });
  });
  it('should map to D16 when id is 16', () => {
    expect(mapMsfToMcfDistrict(16)).to.deep.equal({
      id: 16,
      location: 'D16 Upper East Coast, Bedok, Eastwood, Kew Drive',
      region: 'East',
      sectors: ['46', '47', '48'],
    });
  });
  it('should map to D17 when id is 17', () => {
    expect(mapMsfToMcfDistrict(17)).to.deep.equal({
      id: 17,
      location: 'D17 Loyang, Changi',
      region: 'East',
      sectors: ['49', '50', '81', '91'],
    });
  });
  it('should map to D18 when id is 18', () => {
    expect(mapMsfToMcfDistrict(18)).to.deep.equal({
      id: 18,
      location: 'D18 Tampines, Pasir Ris',
      region: 'East',
      sectors: ['51', '52'],
    });
  });
  it('should map to D19 when id is 19', () => {
    expect(mapMsfToMcfDistrict(19)).to.deep.equal({
      id: 19,
      location: 'D19 Serangoon Garden, Hougang, Sengkang, Punggol',
      region: 'North',
      sectors: ['53', '54', '55', '82'],
    });
  });
  it('should map to D20 when id is 20', () => {
    expect(mapMsfToMcfDistrict(20)).to.deep.equal({
      id: 20,
      location: 'D20 Bishan, Ang Mo Kio',
      region: 'North',
      sectors: ['56', '57'],
    });
  });
  it('should map to D21 when id is 21', () => {
    expect(mapMsfToMcfDistrict(21)).to.deep.equal({
      id: 21,
      location: 'D21 Upper Bukit Timah, Clementi Park, Ulu Pandan',
      region: 'West',
      sectors: ['58', '59'],
    });
  });
  it('should map to D22 when id is 22', () => {
    expect(mapMsfToMcfDistrict(22)).to.deep.equal({
      id: 22,
      location: 'D22 Jurong, Jurong Island, Tuas',
      region: 'West',
      sectors: ['60', '61', '62', '63', '64'],
    });
  });
  it('should map to D23 when id is 23', () => {
    expect(mapMsfToMcfDistrict(23)).to.deep.equal({
      id: 23,
      location: 'D23 Hillview, Dairy Farm, Bukit Panjang, Choa Chu Kang',
      region: 'West',
      sectors: ['65', '66', '67', '68'],
    });
  });
  it('should map to D24 when id is 24', () => {
    expect(mapMsfToMcfDistrict(24)).to.deep.equal({
      id: 24,
      location: 'D24 Lim Chu Kang, Tengah',
      region: 'West',
      sectors: ['69', '70', '71'],
    });
  });
  it('should map to D25 when id is 25', () => {
    expect(mapMsfToMcfDistrict(25)).to.deep.equal({
      id: 25,
      location: 'D25 Kranji, Woodgrove, Woodlands',
      region: 'North',
      sectors: ['72', '73'],
    });
  });
  it('should map to D26 when id is 26', () => {
    expect(mapMsfToMcfDistrict(26)).to.deep.equal({
      id: 26,
      location: 'D26 Upper Thomson, Springleaf',
      region: 'North',
      sectors: ['77', '78'],
    });
  });
  it('should map to D27 when id is 27', () => {
    expect(mapMsfToMcfDistrict(27)).to.deep.equal({
      id: 27,
      location: 'D27 Yishun, Sembawang',
      region: 'North',
      sectors: ['75', '76'],
    });
  });
  it('should map to D28 when id is 28', () => {
    expect(mapMsfToMcfDistrict(28)).to.deep.equal({
      id: 28,
      location: 'D28 Seletar',
      region: 'North',
      sectors: ['79', '80'],
    });
  });
  it('should map to Islandwide when id is 998', () => {
    expect(mapMsfToMcfDistrict(998)).to.deep.equal({
      id: 998,
      location: 'Islandwide',
      region: 'Islandwide',
      sectors: [],
    });
  });
  it('should map to Overseas when id is 999', () => {
    expect(mapMsfToMcfDistrict(999)).to.deep.equal({
      id: 999,
      location: 'Overseas',
      region: 'Overseas',
      sectors: [],
    });
  });
});

describe('mapMcfToMsfDistrict', () => {
  it('should map to D01 when id is 1', () => {
    expect(mapMcfToMsfDistrict(1)).to.deep.equal({
      district: 1,
      isDeleted: false,
      location: 'D01 Cecil, Marina, People’s Park, Raffles Place',
      sector: '01, 02, 03, 04, 05, 06',
    });
  });
  it('should map to D02 when id is 2', () => {
    expect(mapMcfToMsfDistrict(2)).to.deep.equal({
      district: 2,
      isDeleted: false,
      location: 'D02 Anson, Tanjong Pagar',
      sector: '07, 08',
    });
  });
  it('should map to D03 when id is 3', () => {
    expect(mapMcfToMsfDistrict(3)).to.deep.equal({
      district: 3,
      isDeleted: false,
      location: 'D03 Queenstown, Tiong Bahru',
      sector: '14,15, 16',
    });
  });
  it('should map to D04 when id is 4', () => {
    expect(mapMcfToMsfDistrict(4)).to.deep.equal({
      district: 4,
      isDeleted: false,
      location: 'D04 Harbourfront,Telok Blangah, Sentosa Island',
      sector: '09, 10',
    });
  });
  it('should map to D05 when id is 5', () => {
    expect(mapMcfToMsfDistrict(5)).to.deep.equal({
      district: 5,
      isDeleted: false,
      location: 'D05 Clementi New Town, Hong Leong Garden, Pasir Panjang',
      sector: '11, 12, 13',
    });
  });
  it('should map to D06 when id is 6', () => {
    expect(mapMcfToMsfDistrict(6)).to.deep.equal({
      district: 6,
      isDeleted: false,
      location: 'D06 Beach Road, High Street',
      sector: '17',
    });
  });
  it('should map to D07 when id is 7', () => {
    expect(mapMcfToMsfDistrict(7)).to.deep.equal({
      district: 7,
      isDeleted: false,
      location: 'D07 Golden Mile, Middle Road',
      sector: '18, 19',
    });
  });
  it('should map to D08 when id is 8', () => {
    expect(mapMcfToMsfDistrict(8)).to.deep.equal({
      district: 8,
      isDeleted: false,
      location: 'D08 Little India',
      sector: '20, 21',
    });
  });
  it('should map to D09 when id is 9', () => {
    expect(mapMcfToMsfDistrict(9)).to.deep.equal({
      district: 9,
      isDeleted: false,
      location: 'D09 Cairnhill, Orchard, River Valley',
      sector: '22, 23',
    });
  });
  it('should map to D10 when id is 10', () => {
    expect(mapMcfToMsfDistrict(10)).to.deep.equal({
      district: 10,
      isDeleted: false,
      location: 'D10 Ardmore, Bukit Timah, Holland Road, Tanglin',
      sector: '24, 25, 26, 27',
    });
  });
  it('should map to D11 when id is 11', () => {
    expect(mapMcfToMsfDistrict(11)).to.deep.equal({
      district: 11,
      isDeleted: false,
      location: 'D11 Novena, Thomson, Watten Estate',
      sector: '28, 29, 30',
    });
  });
  it('should map to D12 when id is 12', () => {
    expect(mapMcfToMsfDistrict(12)).to.deep.equal({
      district: 12,
      isDeleted: false,
      location: 'D12 Balestier, Serangoon, Toa Payoh',
      sector: '31, 32, 33',
    });
  });
  it('should map to D13 when id is 13', () => {
    expect(mapMcfToMsfDistrict(13)).to.deep.equal({
      district: 13,
      isDeleted: false,
      location: 'D13 Macpherson, Braddell',
      sector: '34, 35, 36, 37',
    });
  });
  it('should map to D14 when id is 14', () => {
    expect(mapMcfToMsfDistrict(14)).to.deep.equal({
      district: 14,
      isDeleted: false,
      location: 'D14 Geylang, Eunos',
      sector: '38, 39, 40, 41',
    });
  });
  it('should map to D15 when id is 15', () => {
    expect(mapMcfToMsfDistrict(15)).to.deep.equal({
      district: 15,
      isDeleted: false,
      location: 'D15 Katong, Joo Chiat, Amber Road',
      sector: '42, 43, 44, 45',
    });
  });
  it('should map to D16 when id is 16', () => {
    expect(mapMcfToMsfDistrict(16)).to.deep.equal({
      district: 16,
      isDeleted: false,
      location: 'D16 Upper East Coast, Bedok, Eastwood, Kew Drive',
      sector: '46, 47, 48',
    });
  });
  it('should map to D17 when id is 17', () => {
    expect(mapMcfToMsfDistrict(17)).to.deep.equal({
      district: 17,
      isDeleted: false,
      location: 'D17 Loyang, Changi',
      sector: '49, 50, 81, 91',
    });
  });
  it('should map to D18 when id is 18', () => {
    expect(mapMcfToMsfDistrict(18)).to.deep.equal({
      district: 18,
      isDeleted: false,
      location: 'D18 Tampines, Pasir Ris',
      sector: '51, 52',
    });
  });
  it('should map to D19 when id is 19', () => {
    expect(mapMcfToMsfDistrict(19)).to.deep.equal({
      district: 19,
      isDeleted: false,
      location: 'D19 Serangoon Garden, Hougang, Sengkang, Punggol',
      sector: '53, 54, 55, 82',
    });
  });
  it('should map to D20 when id is 20', () => {
    expect(mapMcfToMsfDistrict(20)).to.deep.equal({
      district: 20,
      isDeleted: false,
      location: 'D20 Bishan, Ang Mo Kio',
      sector: '56, 57',
    });
  });
  it('should map to D21 when id is 21', () => {
    expect(mapMcfToMsfDistrict(21)).to.deep.equal({
      district: 21,
      isDeleted: false,
      location: 'D21 Upper Bukit Timah, Clementi Park, Ulu Pandan',
      sector: '58, 59',
    });
  });
  it('should map to D22 when id is 22', () => {
    expect(mapMcfToMsfDistrict(22)).to.deep.equal({
      district: 22,
      isDeleted: false,
      location: 'D22 Jurong, Jurong Island, Tuas',
      sector: '60, 61, 62, 63, 64',
    });
  });
  it('should map to D23 when id is 23', () => {
    expect(mapMcfToMsfDistrict(23)).to.deep.equal({
      district: 23,
      isDeleted: false,
      location: 'D23 Hillview, Dairy Farm, Bukit Panjang, Choa Chu Kang',
      sector: '65, 66, 67, 68',
    });
  });
  it('should map to D24 when id is 24', () => {
    expect(mapMcfToMsfDistrict(24)).to.deep.equal({
      district: 24,
      isDeleted: false,
      location: 'D24 Lim Chu Kang, Tengah',
      sector: '69, 70, 71',
    });
  });
  it('should map to D25 when id is 25', () => {
    expect(mapMcfToMsfDistrict(25)).to.deep.equal({
      district: 25,
      isDeleted: false,
      location: 'D25 Kranji, Woodgrove, Woodlands',
      sector: '72, 73',
    });
  });
  it('should map to D26 when id is 26', () => {
    expect(mapMcfToMsfDistrict(26)).to.deep.equal({
      district: 26,
      isDeleted: false,
      location: 'D26 Upper Thomson, Springleaf',
      sector: '77, 78',
    });
  });
  it('should map to D27 when id is 27', () => {
    expect(mapMcfToMsfDistrict(27)).to.deep.equal({
      district: 27,
      isDeleted: false,
      location: 'D27 Yishun, Sembawang',
      sector: '75, 76',
    });
  });
  it('should map to D28 when id is 28', () => {
    expect(mapMcfToMsfDistrict(28)).to.deep.equal({
      district: 28,
      isDeleted: false,
      location: 'D28 Seletar',
      sector: '79, 80',
    });
  });
  it('should map to Islandwide when id is 998', () => {
    expect(mapMcfToMsfDistrict(998)).to.deep.equal({
      district: 998,
      isDeleted: false,
      location: 'Islandwide',
      sector: '9999',
    });
  });
  it('should map to Overseas when id is 999', () => {
    expect(mapMcfToMsfDistrict(999)).to.deep.equal({
      district: 999,
      isDeleted: false,
      location: 'Overseas',
      sector: 'XX',
    });
  });
});
