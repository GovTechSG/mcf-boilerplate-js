import {expect} from 'chai';
import {mapIcmsToMcfSubScheme} from './subSchemes';

describe('mapIcmsToMcfSubScheme', () => {
  it('should map to WSQ Advanced Certificate in Industrial Design (PnT) when id is 606001', () => {
    expect(mapIcmsToMcfSubScheme(606001)).to.deep.equal({
      endDate: '2017-12-31',
      id: 1,
      programme: 'WSQ Advanced Certificate in Industrial Design (PnT)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2015-01-26',
    });
  });
  it('should map to PCP for Desktop/IT Support Administrators when id is 606002', () => {
    expect(mapIcmsToMcfSubScheme(606002)).to.deep.equal({
      endDate: '2019-02-04',
      id: 2,
      programme: 'PCP for Desktop/IT Support Administrators',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-02-17',
    });
  });
  it('should map to PCP for ERP Specialist when id is 606003', () => {
    expect(mapIcmsToMcfSubScheme(606003)).to.deep.equal({
      endDate: '2019-02-04',
      id: 3,
      programme: 'PCP for ERP Specialist',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-02-17',
    });
  });
  it('should map to PCP for ERP Specialist when id is 606006', () => {
    expect(mapIcmsToMcfSubScheme(606006)).to.deep.equal({
      endDate: '2019-02-04',
      id: 6,
      programme: 'PCP for ERP Specialist',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-02-17',
    });
  });
  it('should map to PCP for International Trading Executives when id is 606011', () => {
    expect(mapIcmsToMcfSubScheme(606011)).to.deep.equal({
      endDate: '2019-05-31',
      id: 11,
      programme: 'PCP for International Trading Executives',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-11-07',
    });
  });
  it('should map to PCP for Biologics Manufacturing Sector when id is 606012', () => {
    expect(mapIcmsToMcfSubScheme(606012)).to.deep.equal({
      endDate: '2017-12-31',
      id: 12,
      programme: 'PCP for Biologics Manufacturing Sector',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2015-01-01',
    });
  });
  it('should map to BOOST when id is 606014', () => {
    expect(mapIcmsToMcfSubScheme(606014)).to.deep.equal({
      endDate: '2017-06-30',
      id: 14,
      programme: 'BOOST',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2014-07-01',
    });
  });
  it('should map to Development and Apprenticeship (DNA) Programme - Pharmaceuticals Manufacturing when id is 606016', () => {
    expect(mapIcmsToMcfSubScheme(606016)).to.deep.equal({
      endDate: '2019-02-21',
      id: 16,
      programme: 'Development and Apprenticeship (DNA) Programme - Pharmaceuticals Manufacturing',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-02-22',
    });
  });
  it('should map to Development and Apprenticeship (DNA) Programme - Biologics  Manufacturing when id is 606017', () => {
    expect(mapIcmsToMcfSubScheme(606017)).to.deep.equal({
      endDate: '2019-02-21',
      id: 17,
      programme: 'Development and Apprenticeship (DNA) Programme - Biologics  Manufacturing',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-02-22',
    });
  });
  it('should map to PCP for Energy Management Sector (Project Manager) when id is 606018', () => {
    expect(mapIcmsToMcfSubScheme(606018)).to.deep.equal({
      endDate: '2018-05-31',
      id: 18,
      programme: 'PCP for Energy Management Sector (Project Manager)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-08-01',
    });
  });
  it('should map to PCP for Retail Store Manager when id is 606021', () => {
    expect(mapIcmsToMcfSubScheme(606021)).to.deep.equal({
      endDate: '2019-05-17',
      id: 21,
      programme: 'PCP for Retail Store Manager',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-04-01',
    });
  });
  it('should map to PCP for MICE Executives when id is 606022', () => {
    expect(mapIcmsToMcfSubScheme(606022)).to.deep.equal({
      endDate: '2019-05-10',
      id: 22,
      programme: 'PCP for MICE Executives',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-04-12',
    });
  });
  it('should map to PCP for Assistant Chef when id is 606023', () => {
    expect(mapIcmsToMcfSubScheme(606023)).to.deep.equal({
      endDate: '2017-12-30',
      id: 23,
      programme: 'PCP for Assistant Chef',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-07-01',
    });
  });
  it('should map to PCP for Restaurant Manager when id is 606024', () => {
    expect(mapIcmsToMcfSubScheme(606024)).to.deep.equal({
      endDate: '2017-12-30',
      id: 24,
      programme: 'PCP for Restaurant Manager',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-07-01',
    });
  });
  it('should map to PCP for Public Transport Rail Sector (Station Manager/ Assistant Station Manager) when id is 606025', () => {
    expect(mapIcmsToMcfSubScheme(606025)).to.deep.equal({
      endDate: '2020-05-31',
      id: 25,
      programme: 'PCP for Public Transport Rail Sector (Station Manager/ Assistant Station Manager)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2015-11-07',
    });
  });
  it('should map to Local BOOST (TP) when id is 606026', () => {
    expect(mapIcmsToMcfSubScheme(606026)).to.deep.equal({
      endDate: '2018-08-31',
      id: 26,
      programme: 'Local BOOST (TP)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2015-09-01',
    });
  });
  it('should map to Local BOOST (SP) when id is 606027', () => {
    expect(mapIcmsToMcfSubScheme(606027)).to.deep.equal({
      endDate: '2019-02-21',
      id: 27,
      programme: 'Local BOOST (SP)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-02-22',
    });
  });
  it('should map to PCP for Logistics (Officer) when id is 606028', () => {
    expect(mapIcmsToMcfSubScheme(606028)).to.deep.equal({
      endDate: '2019-06-30',
      id: 28,
      programme: 'PCP for Logistics (Officer)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-06-15',
    });
  });
  it('should map to PCP for Logistics (Executive) when id is 606029', () => {
    expect(mapIcmsToMcfSubScheme(606029)).to.deep.equal({
      endDate: '2019-06-30',
      id: 29,
      programme: 'PCP for Logistics (Executive)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-06-15',
    });
  });
  it('should map to PCP for Wafer Fab Engineer when id is 606030', () => {
    expect(mapIcmsToMcfSubScheme(606030)).to.deep.equal({
      endDate: '2019-05-31',
      id: 30,
      programme: 'PCP for Wafer Fab Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-07-01',
    });
  });
  it('should map to PCP for Wafer Fab Assistant Engineer when id is 606031', () => {
    expect(mapIcmsToMcfSubScheme(606031)).to.deep.equal({
      endDate: '2019-05-31',
      id: 31,
      programme: 'PCP for Wafer Fab Assistant Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-07-01',
    });
  });
  it('should map to PCP for A&T Engineer when id is 606032', () => {
    expect(mapIcmsToMcfSubScheme(606032)).to.deep.equal({
      endDate: '2019-05-31',
      id: 32,
      programme: 'PCP for A&T Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-07-01',
    });
  });
  it('should map to PCP for A&T Assistant Engineer when id is 606033', () => {
    expect(mapIcmsToMcfSubScheme(606033)).to.deep.equal({
      endDate: '2019-05-31',
      id: 33,
      programme: 'PCP for A&T Assistant Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-07-01',
    });
  });
  it('should map to PCP for Aircraft Maintenance (Avionics) Technician when id is 606034', () => {
    expect(mapIcmsToMcfSubScheme(606034)).to.deep.equal({
      endDate: '2018-05-30',
      id: 34,
      programme: 'PCP for Aircraft Maintenance (Avionics) Technician',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-09-22',
    });
  });
  it('should map to PCP for Aircraft Maintenance (Mechanical) Technician when id is 606035', () => {
    expect(mapIcmsToMcfSubScheme(606035)).to.deep.equal({
      endDate: '2018-05-30',
      id: 35,
      programme: 'PCP for Aircraft Maintenance (Mechanical) Technician',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-09-22',
    });
  });
  it('should map to PCP for Engine Build Technician when id is 606036', () => {
    expect(mapIcmsToMcfSubScheme(606036)).to.deep.equal({
      endDate: '2018-05-30',
      id: 36,
      programme: 'PCP for Engine Build Technician',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-09-22',
    });
  });
  it('should map to PCP for Engine Repair and Overhaul Technician when id is 606037', () => {
    expect(mapIcmsToMcfSubScheme(606037)).to.deep.equal({
      endDate: '2018-05-30',
      id: 37,
      programme: 'PCP for Engine Repair and Overhaul Technician',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-09-22',
    });
  });
  it('should map to PCP for Professional Executives (Hotel Industry) when id is 606038', () => {
    expect(mapIcmsToMcfSubScheme(606038)).to.deep.equal({
      endDate: '2018-12-17',
      id: 38,
      programme: 'PCP for Professional Executives (Hotel Industry)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-12-18',
    });
  });
  it('should map to PCP for Pre-School Teachers when id is 606040', () => {
    expect(mapIcmsToMcfSubScheme(606040)).to.deep.equal({
      endDate: '2018-08-10',
      id: 39,
      programme: 'PCP for Pre-School Teachers',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2015-08-01',
    });
  });
  it('should map to PCP for Public Transport Rail Sector (Executive Engineer/ Assistant Engineer) when id is 606041', () => {
    expect(mapIcmsToMcfSubScheme(606041)).to.deep.equal({
      endDate: '2020-05-31',
      id: 40,
      programme: 'PCP for Public Transport Rail Sector (Executive Engineer/ Assistant Engineer)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-01-01',
    });
  });
  it('should map to PCP for Marine (Engineer) when id is 606042', () => {
    expect(mapIcmsToMcfSubScheme(606042)).to.deep.equal({
      endDate: '2019-05-01',
      id: 41,
      programme: 'PCP for Marine (Engineer)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-10-01',
    });
  });
  it('should map to PCP for Marine (Assistant Engineer) when id is 606043', () => {
    expect(mapIcmsToMcfSubScheme(606043)).to.deep.equal({
      endDate: '2019-05-01',
      id: 42,
      programme: 'PCP for Marine (Assistant Engineer)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-10-01',
    });
  });
  it('should map to PCP for Marine (Technician) when id is 606044', () => {
    expect(mapIcmsToMcfSubScheme(606044)).to.deep.equal({
      endDate: '2019-05-01',
      id: 43,
      programme: 'PCP for Marine (Technician)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-10-01',
    });
  });
  it('should map to PCP for Physiotherapists when id is 606045', () => {
    expect(mapIcmsToMcfSubScheme(606045)).to.deep.equal({
      endDate: '2019-09-01',
      id: 44,
      programme: 'PCP for Physiotherapists',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-01-19',
    });
  });
  it('should map to PCP for Occupational Therapists when id is 606046', () => {
    expect(mapIcmsToMcfSubScheme(606046)).to.deep.equal({
      endDate: '2019-09-01',
      id: 45,
      programme: 'PCP for Occupational Therapists',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-01-19',
    });
  });
  it('should map to PCP for Diagnostic Radiographers when id is 606047', () => {
    expect(mapIcmsToMcfSubScheme(606047)).to.deep.equal({
      endDate: '2019-09-01',
      id: 46,
      programme: 'PCP for Diagnostic Radiographers',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-01-19',
    });
  });
  it('should map to PCP for Social Workers when id is 606048', () => {
    expect(mapIcmsToMcfSubScheme(606048)).to.deep.equal({
      endDate: '2020-06-01',
      id: 47,
      programme: 'PCP for Social Workers',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-07-01',
    });
  });
  it('should map to PCP for Manufacturing Associate when id is 606049', () => {
    expect(mapIcmsToMcfSubScheme(606049)).to.deep.equal({
      endDate: '2019-05-31',
      id: 48,
      programme: 'PCP for Manufacturing Associate',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-11-01',
    });
  });
  it('should map to PCP for Manufacturing Professional when id is 606050', () => {
    expect(mapIcmsToMcfSubScheme(606050)).to.deep.equal({
      endDate: '2020-05-31',
      id: 49,
      programme: 'PCP for Manufacturing Professional',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-11-01',
    });
  });
  it('should map to PCP for Technical Sales Engineer/Manager when id is 606051', () => {
    expect(mapIcmsToMcfSubScheme(606051)).to.deep.equal({
      endDate: '2020-05-31',
      id: 50,
      programme: 'PCP for Technical Sales Engineer/Manager',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-11-01',
    });
  });
  it('should map to PCP for Component OEM Engineer when id is 606052', () => {
    expect(mapIcmsToMcfSubScheme(606052)).to.deep.equal({
      endDate: '2019-05-31',
      id: 51,
      programme: 'PCP for Component OEM Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-01-05',
    });
  });
  it('should map to PCP for Component OEM Assistant Engineer when id is 606053', () => {
    expect(mapIcmsToMcfSubScheme(606053)).to.deep.equal({
      endDate: '2019-05-31',
      id: 52,
      programme: 'PCP for Component OEM Assistant Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-01-05',
    });
  });
  it('should map to PCP for Complex Equipment Engineer when id is 606054', () => {
    expect(mapIcmsToMcfSubScheme(606054)).to.deep.equal({
      endDate: '2019-05-31',
      id: 53,
      programme: 'PCP for Complex Equipment Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-01-05',
    });
  });
  it('should map to PCP for Complex Equipment Assistant Engineer when id is 606055', () => {
    expect(mapIcmsToMcfSubScheme(606055)).to.deep.equal({
      endDate: '2019-05-31',
      id: 54,
      programme: 'PCP for Complex Equipment Assistant Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-01-05',
    });
  });
  it('should map to PCP for Air Transport (Ground Operations Officer) when id is 606056', () => {
    expect(mapIcmsToMcfSubScheme(606056)).to.deep.equal({
      endDate: '2019-05-31',
      id: 55,
      programme: 'PCP for Air Transport (Ground Operations Officer)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-02-01',
    });
  });
  it('should map to PCP for System Integrator Engineer when id is 606057', () => {
    expect(mapIcmsToMcfSubScheme(606057)).to.deep.equal({
      endDate: '2018-11-30',
      id: 56,
      programme: 'PCP for System Integrator Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-01-09',
    });
  });
  it('should map to PCP for System Integrator Assistant Engineer when id is 606058', () => {
    expect(mapIcmsToMcfSubScheme(606058)).to.deep.equal({
      endDate: '2018-11-30',
      id: 57,
      programme: 'PCP for System Integrator Assistant Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-01-09',
    });
  });
  it('should map to PCP for Pharmaceuticals when id is 606059', () => {
    expect(mapIcmsToMcfSubScheme(606059)).to.deep.equal({
      endDate: '2018-05-31',
      id: 58,
      programme: 'PCP for Pharmaceuticals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-11-01',
    });
  });
  it('should map to PCP for Chemicals Manufacturing when id is 606060', () => {
    expect(mapIcmsToMcfSubScheme(606060)).to.deep.equal({
      endDate: '2018-05-31',
      id: 59,
      programme: 'PCP for Chemicals Manufacturing',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-07-11',
    });
  });
  it('should map to PCP for Regional Operations Manager when id is 606061', () => {
    expect(mapIcmsToMcfSubScheme(606061)).to.deep.equal({
      endDate: '2020-05-31',
      id: 60,
      programme: 'PCP for Regional Operations Manager',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-02-24',
    });
  });
  it('should map to PCP for Regional Technical Programme Manager when id is 606062', () => {
    expect(mapIcmsToMcfSubScheme(606062)).to.deep.equal({
      endDate: '2020-05-31',
      id: 61,
      programme: 'PCP for Regional Technical Programme Manager',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-02-24',
    });
  });
  it('should map to PCP for Professional Executives when id is 606063', () => {
    expect(mapIcmsToMcfSubScheme(606063)).to.deep.equal({
      endDate: '2020-05-31',
      id: 62,
      programme: 'PCP for Professional Executives',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-01-01',
    });
  });
  it('should map to PCP for Infocomm Sales & Marketing when id is 606064', () => {
    expect(mapIcmsToMcfSubScheme(606064)).to.deep.equal({
      endDate: '2019-02-28',
      id: 63,
      programme: 'PCP for Infocomm Sales & Marketing',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-02-01',
    });
  });
  it('should map to PCP for Lift Technicians when id is 606065', () => {
    expect(mapIcmsToMcfSubScheme(606065)).to.deep.equal({
      endDate: '2019-05-31',
      id: 64,
      programme: 'PCP for Lift Technicians',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-06-01',
    });
  });
  it('should map to PCP for Digital Marketing when id is 606066', () => {
    expect(mapIcmsToMcfSubScheme(606066)).to.deep.equal({
      endDate: '2019-06-28',
      id: 65,
      programme: 'PCP for Digital Marketing',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-02-17',
    });
  });
  it('should map to PCP for Infocomm and Sales when id is 606067', () => {
    expect(mapIcmsToMcfSubScheme(606067)).to.deep.equal({
      endDate: '2019-02-04',
      id: 66,
      programme: 'PCP for Infocomm and Sales',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-02-17',
    });
  });
  it('should map to PCP for Care Coordinator Associates when id is 606068', () => {
    expect(mapIcmsToMcfSubScheme(606068)).to.deep.equal({
      endDate: '2019-03-31',
      id: 67,
      programme: 'PCP for Care Coordinator Associates',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-06-12',
    });
  });
  it('should map to PCP for Compliance Professionals when id is 606069', () => {
    expect(mapIcmsToMcfSubScheme(606069)).to.deep.equal({
      endDate: '2018-05-31',
      id: 68,
      programme: 'PCP for Compliance Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-10-01',
    });
  });
  it('should map to PCP for Hotel Executives when id is 606070', () => {
    expect(mapIcmsToMcfSubScheme(606070)).to.deep.equal({
      endDate: '2018-06-08',
      id: 69,
      programme: 'PCP for Hotel Executives',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-05-25',
    });
  });
  it('should map to PCP for Travel Executives when id is 606071', () => {
    expect(mapIcmsToMcfSubScheme(606071)).to.deep.equal({
      endDate: '2018-06-11',
      id: 70,
      programme: 'PCP for Travel Executives',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-05-03',
    });
  });
  it('should map to PCP for Registered Nurses when id is 606072', () => {
    expect(mapIcmsToMcfSubScheme(606072)).to.deep.equal({
      endDate: '2020-05-31',
      id: 71,
      programme: 'PCP for Registered Nurses',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-04-01',
    });
  });
  it('should map to PCP for Air Freight Officer when id is 606073', () => {
    expect(mapIcmsToMcfSubScheme(606073)).to.deep.equal({
      endDate: '2019-05-31',
      id: 72,
      programme: 'PCP for Air Freight Officer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-06-01',
    });
  });
  it('should map to PCP for Air Freight Executive when id is 606074', () => {
    expect(mapIcmsToMcfSubScheme(606074)).to.deep.equal({
      endDate: '2019-05-31',
      id: 73,
      programme: 'PCP for Air Freight Executive',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-06-01',
    });
  });
  it('should map to PCP for Digital Professionals when id is 606075', () => {
    expect(mapIcmsToMcfSubScheme(606075)).to.deep.equal({
      endDate: '2021-03-31',
      id: 74,
      programme: 'PCP for Digital Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-04-01',
    });
  });
  it('should map to PCP for Associate Researcher when id is 606076', () => {
    expect(mapIcmsToMcfSubScheme(606076)).to.deep.equal({
      endDate: '2019-05-31',
      id: 75,
      programme: 'PCP for Associate Researcher',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-06-01',
    });
  });
  it('should map to PCP for Aerospace Officers when id is 606077', () => {
    expect(mapIcmsToMcfSubScheme(606077)).to.deep.equal({
      endDate: '2019-05-31',
      id: 76,
      programme: 'PCP for Aerospace Officers',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-06-28',
    });
  });
  it('should map to PCP for Aerospace Executives when id is 606078', () => {
    expect(mapIcmsToMcfSubScheme(606078)).to.deep.equal({
      endDate: '2019-05-31',
      id: 77,
      programme: 'PCP for Aerospace Executives',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-06-28',
    });
  });
  it('should map to PCP for Banking Executives when id is 606079', () => {
    expect(mapIcmsToMcfSubScheme(606079)).to.deep.equal({
      endDate: '2019-01-31',
      id: 78,
      programme: 'PCP for Banking Executives',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-04-01',
    });
  });
  it('should map to PCP for Financial Professionals when id is 606080', () => {
    expect(mapIcmsToMcfSubScheme(606080)).to.deep.equal({
      endDate: '2019-01-31',
      id: 79,
      programme: 'PCP for Financial Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-06-01',
    });
  });
  it('should map to PCP for Global Ready Infrastructure Talent when id is 606081', () => {
    expect(mapIcmsToMcfSubScheme(606081)).to.deep.equal({
      endDate: '2019-03-31',
      id: 80,
      programme: 'PCP for Global Ready Infrastructure Talent',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-04-01',
    });
  });
  it('should map to PCP for Auxiliary Police Officer (APO) when id is 606082', () => {
    expect(mapIcmsToMcfSubScheme(606082)).to.deep.equal({
      endDate: '2019-12-31',
      id: 81,
      programme: 'PCP for Auxiliary Police Officer (APO)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-05-01',
    });
  });
  it('should map to PCP for Apprentice Teachers (EIPIC/ Special Education) when id is 606083', () => {
    expect(mapIcmsToMcfSubScheme(606083)).to.deep.equal({
      endDate: '2019-06-30',
      id: 82,
      programme: 'PCP for Apprentice Teachers (EIPIC/ Special Education)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-07-01',
    });
  });
  it('should map to PCP for Enrolled Nurses when id is 606084', () => {
    expect(mapIcmsToMcfSubScheme(606084)).to.deep.equal({
      endDate: '2020-05-31',
      id: 83,
      programme: 'PCP for Enrolled Nurses',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-01-01',
    });
  });
  it('should map to PCP for Airline Station Manager (Singapore Airlines) when id is 606085', () => {
    expect(mapIcmsToMcfSubScheme(606085)).to.deep.equal({
      endDate: '2019-05-31',
      id: 84,
      programme: 'PCP for Airline Station Manager (Singapore Airlines)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-08-11',
    });
  });
  it('should map to PCP for e-Commerce Supply Chain Professionals when id is 606086', () => {
    expect(mapIcmsToMcfSubScheme(606086)).to.deep.equal({
      endDate: '2020-05-31',
      id: 85,
      programme: 'PCP for e-Commerce Supply Chain Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-08-14',
    });
  });
  it('should map to PCP for Dental Surgery Assistants when id is 606039', () => {
    expect(mapIcmsToMcfSubScheme(606039)).to.deep.equal({
      endDate: '2019-03-01',
      id: 86,
      programme: 'PCP for Dental Surgery Assistants',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-03-01',
    });
  });
  it('should map to PCP for Educational Therapists when id is 606087', () => {
    expect(mapIcmsToMcfSubScheme(606087)).to.deep.equal({
      endDate: '2019-12-31',
      id: 87,
      programme: 'PCP for Educational Therapists',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-01-01',
    });
  });
  it('should map to PCP for GRIT when id is 606088', () => {
    expect(mapIcmsToMcfSubScheme(606088)).to.deep.equal({
      endDate: '2019-03-31',
      id: 88,
      programme: 'PCP for GRIT',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-04-01',
    });
  });
  it('should map to PCP for Game Writers when id is 606089', () => {
    expect(mapIcmsToMcfSubScheme(606089)).to.deep.equal({
      endDate: '2019-02-28',
      id: 89,
      programme: 'PCP for Game Writers',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-05-23',
    });
  });
  it('should map to PCP for Food Services Executives - Select Group when id is 606090', () => {
    expect(mapIcmsToMcfSubScheme(606090)).to.deep.equal({
      endDate: '2018-10-24',
      id: 90,
      programme: 'PCP for Food Services Executives - Select Group',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-10-25',
    });
  });
  it('should map to PCP for Electronics Assistant Engineer when id is 606091', () => {
    expect(mapIcmsToMcfSubScheme(606091)).to.deep.equal({
      endDate: '2020-05-31',
      id: 91,
      programme: 'PCP for Electronics Assistant Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-11-01',
    });
  });
  it('should map to PCP for Electronics Engineer when id is 606092', () => {
    expect(mapIcmsToMcfSubScheme(606092)).to.deep.equal({
      endDate: '2020-05-31',
      id: 92,
      programme: 'PCP for Electronics Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-11-01',
    });
  });
  it('should map to PCP for Advanced Manufacturing Engineer when id is 606093', () => {
    expect(mapIcmsToMcfSubScheme(606093)).to.deep.equal({
      endDate: '2020-05-31',
      id: 93,
      programme: 'PCP for Advanced Manufacturing Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-06-21',
    });
  });
  it('should map to PCP for Advanced Manufacturing Assistant Engineer when id is 606094', () => {
    expect(mapIcmsToMcfSubScheme(606094)).to.deep.equal({
      endDate: '2020-05-31',
      id: 94,
      programme: 'PCP for Advanced Manufacturing Assistant Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-06-21',
    });
  });
  it('should map to PCP for Public Transport Bus (Service Controller/ Assistant Service Controller) when id is 606095', () => {
    expect(mapIcmsToMcfSubScheme(606095)).to.deep.equal({
      endDate: '2019-05-31',
      id: 95,
      programme: 'PCP for Public Transport Bus (Service Controller/ Assistant Service Controller)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-11-01',
    });
  });
  it('should map to PCP for Food Services Executives - Super Bean when id is 606096', () => {
    expect(mapIcmsToMcfSubScheme(606096)).to.deep.equal({
      endDate: '2018-11-23',
      id: 96,
      programme: 'PCP for Food Services Executives - Super Bean',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-11-24',
    });
  });
  it('should map to PCP for Medical Technology Assistant Engineer when id is 606097', () => {
    expect(mapIcmsToMcfSubScheme(606097)).to.deep.equal({
      endDate: '2019-05-31',
      id: 97,
      programme: 'PCP for Medical Technology Assistant Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-10-01',
    });
  });
  it('should map to PCP for Medical Technology Engineer when id is 606098', () => {
    expect(mapIcmsToMcfSubScheme(606098)).to.deep.equal({
      endDate: '2019-05-31',
      id: 98,
      programme: 'PCP for Medical Technology Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-10-01',
    });
  });
  it('should map to PCP for Professional Executives (Human Resource) when id is 606099', () => {
    expect(mapIcmsToMcfSubScheme(606099)).to.deep.equal({
      endDate: '2018-12-31',
      id: 99,
      programme: 'PCP for Professional Executives (Human Resource)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-01-01',
    });
  });
  it('should map to PCP for Registered Nurses (Degree) when id is 606100', () => {
    expect(mapIcmsToMcfSubScheme(606100)).to.deep.equal({
      endDate: '2019-08-31',
      id: 100,
      programme: 'PCP for Registered Nurses (Degree)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-01-19',
    });
  });
  it('should map to PCP for Air Transport Professionals when id is 606101', () => {
    expect(mapIcmsToMcfSubScheme(606101)).to.deep.equal({
      endDate: '2019-05-31',
      id: 101,
      programme: 'PCP for Air Transport Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-02-02',
    });
  });
  it('should map to PCP for Utilities Engineer/Assistant Engineer when id is 606102', () => {
    expect(mapIcmsToMcfSubScheme(606102)).to.deep.equal({
      endDate: '2020-05-31',
      id: 102,
      programme: 'PCP for Utilities Engineer/Assistant Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-11-01',
    });
  });
  it('should map to PCP for Full Stack Software Developer when id is 606103', () => {
    expect(mapIcmsToMcfSubScheme(606103)).to.deep.equal({
      endDate: '2019-11-30',
      id: 103,
      programme: 'PCP for Full Stack Software Developer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-05-25',
    });
  });
  it('should map to PCP for BIM Professionals when id is 606104', () => {
    expect(mapIcmsToMcfSubScheme(606104)).to.deep.equal({
      endDate: '2020-05-30',
      id: 104,
      programme: 'PCP for BIM Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-07-06',
    });
  });
  it('should map to AnT PCP for Artificial Intelligence Software Developer when id is 606105', () => {
    expect(mapIcmsToMcfSubScheme(606105)).to.deep.equal({
      endDate: '2019-05-31',
      id: 105,
      programme: 'AnT PCP for Artificial Intelligence Software Developer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-01-01',
    });
  });
  it('should map to AnT PCP for Food Production Specialist when id is 606106', () => {
    expect(mapIcmsToMcfSubScheme(606106)).to.deep.equal({
      endDate: '2020-05-31',
      id: 106,
      programme: 'AnT PCP for Food Production Specialist',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-11-10',
    });
  });
  it('should map to AnT PCP for Logistics (Executive) when id is 606107', () => {
    expect(mapIcmsToMcfSubScheme(606107)).to.deep.equal({
      endDate: '2019-05-31',
      id: 107,
      programme: 'AnT PCP for Logistics (Executive)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-05-01',
    });
  });
  it('should map to AnT PCP for Logistics (Officer) when id is 606108', () => {
    expect(mapIcmsToMcfSubScheme(606108)).to.deep.equal({
      endDate: '2019-05-31',
      id: 108,
      programme: 'AnT PCP for Logistics (Officer)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-05-01',
    });
  });
  it('should map to Local BOOST when id is 606109', () => {
    expect(mapIcmsToMcfSubScheme(606109)).to.deep.equal({
      endDate: '2019-02-01',
      id: 109,
      programme: 'Local BOOST',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2015-09-01',
    });
  });
  it('should map to PCP for Aerospace Executive when id is 606110', () => {
    expect(mapIcmsToMcfSubScheme(606110)).to.deep.equal({
      endDate: '2019-05-31',
      id: 110,
      programme: 'PCP for Aerospace Executive',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-06-21',
    });
  });
  it('should map to PCP for Aerospace Officer when id is 606111', () => {
    expect(mapIcmsToMcfSubScheme(606111)).to.deep.equal({
      endDate: '2019-05-31',
      id: 111,
      programme: 'PCP for Aerospace Officer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-06-21',
    });
  });
  it('should map to PCP for Airline Station Manager when id is 606112', () => {
    expect(mapIcmsToMcfSubScheme(606112)).to.deep.equal({
      endDate: '2019-05-31',
      id: 112,
      programme: 'PCP for Airline Station Manager',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-05-02',
    });
  });
  it('should map to PCP for Assistant Engineer when id is 606113', () => {
    expect(mapIcmsToMcfSubScheme(606113)).to.deep.equal({
      endDate: '2020-05-01',
      id: 113,
      programme: 'PCP for Assistant Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-06-01',
    });
  });
  it('should map to PCP for Biopharmaceutical Manufacturing Managers, Executives and Technicians when id is 606114', () => {
    expect(mapIcmsToMcfSubScheme(606114)).to.deep.equal({
      endDate: '2019-02-20',
      id: 114,
      programme: 'PCP for Biopharmaceutical Manufacturing Managers, Executives and Technicians',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-02-21',
    });
  });
  it('should map to PCP for Bus Service Controller / Assistant Bus Service Controller when id is 606115', () => {
    expect(mapIcmsToMcfSubScheme(606115)).to.deep.equal({
      endDate: '2019-05-31',
      id: 115,
      programme: 'PCP for Bus Service Controller / Assistant Bus Service Controller',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-10-15',
    });
  });
  it('should map to PCP for Care Coordinator/Patient Navigator Associates when id is 606116', () => {
    expect(mapIcmsToMcfSubScheme(606116)).to.deep.equal({
      endDate: '2019-03-31',
      id: 116,
      programme: 'PCP for Care Coordinator/Patient Navigator Associates',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-04-01',
    });
  });
  it('should map to PCP for Consultants - Ernst & Young when id is 606117', () => {
    expect(mapIcmsToMcfSubScheme(606117)).to.deep.equal({
      endDate: '2019-03-31',
      id: 117,
      programme: 'PCP for Consultants - Ernst & Young',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-04-01',
    });
  });
  it('should map to PCP for Consumer Banking Professionals when id is 606118', () => {
    expect(mapIcmsToMcfSubScheme(606118)).to.deep.equal({
      endDate: '2020-05-31',
      id: 118,
      programme: 'PCP for Consumer Banking Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-04-19',
    });
  });
  it('should map to PCP for Data Science Professional when id is 606119', () => {
    expect(mapIcmsToMcfSubScheme(606119)).to.deep.equal({
      endDate: '2019-12-01',
      id: 119,
      programme: 'PCP for Data Science Professional',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-01-01',
    });
  });
  it('should map to PCP for Digital Advertising Professionals when id is 606120', () => {
    expect(mapIcmsToMcfSubScheme(606120)).to.deep.equal({
      endDate: '2020-05-31',
      id: 120,
      programme: 'PCP for Digital Advertising Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-09-01',
    });
  });
  it('should map to PCP for Early Intervention and Special Education Learning Facilitators when id is 606121', () => {
    expect(mapIcmsToMcfSubScheme(606121)).to.deep.equal({
      endDate: '2019-06-30',
      id: 121,
      programme: 'PCP for Early Intervention and Special Education Learning Facilitators',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-07-01',
    });
  });
  it('should map to PCP for Executive Engineer when id is 606122', () => {
    expect(mapIcmsToMcfSubScheme(606122)).to.deep.equal({
      endDate: '2020-05-01',
      id: 122,
      programme: 'PCP for Executive Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-06-01',
    });
  });
  it('should map to PCP for Financial Forensic Professionals when id is 606123', () => {
    expect(mapIcmsToMcfSubScheme(606123)).to.deep.equal({
      endDate: '2020-05-31',
      id: 123,
      programme: 'PCP for Financial Forensic Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-06-01',
    });
  });
  it('should map to PCP for Food Services Executive - Kopi Roti and Oosterbay when id is 606124', () => {
    expect(mapIcmsToMcfSubScheme(606124)).to.deep.equal({
      endDate: '2019-06-12',
      id: 124,
      programme: 'PCP for Food Services Executive - Kopi Roti and Oosterbay',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-06-13',
    });
  });
  it('should map to PCP for Food Services Executives when id is 606125', () => {
    expect(mapIcmsToMcfSubScheme(606125)).to.deep.equal({
      endDate: '2019-12-31',
      id: 125,
      programme: 'PCP for Food Services Executives',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-08-21',
    });
  });
  it('should map to PCP for Fund Management Executives (Dymon Asia) when id is 606126', () => {
    expect(mapIcmsToMcfSubScheme(606126)).to.deep.equal({
      endDate: '2019-07-31',
      id: 126,
      programme: 'PCP for Fund Management Executives (Dymon Asia)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-08-01',
    });
  });
  it('should map to PCP for Furniture & Industrial Designers when id is 606127', () => {
    expect(mapIcmsToMcfSubScheme(606127)).to.deep.equal({
      endDate: '2019-02-28',
      id: 127,
      programme: 'PCP for Furniture & Industrial Designers',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-03-01',
    });
  });
  it('should map to PCP for Graphic Designers when id is 606128', () => {
    expect(mapIcmsToMcfSubScheme(606128)).to.deep.equal({
      endDate: '2019-02-28',
      id: 128,
      programme: 'PCP for Graphic Designers',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-03-01',
    });
  });
  it('should map to PCP for Ground Operations Officer when id is 606129', () => {
    expect(mapIcmsToMcfSubScheme(606129)).to.deep.equal({
      endDate: '2019-05-31',
      id: 129,
      programme: 'PCP for Ground Operations Officer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-01-01',
    });
  });
  it('should map to PCP for Infocomm Sales and Marketing when id is 606130', () => {
    expect(mapIcmsToMcfSubScheme(606130)).to.deep.equal({
      endDate: '2019-06-28',
      id: 130,
      programme: 'PCP for Infocomm Sales and Marketing',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-04-20',
    });
  });
  it('should map to PCP for Intellectual Property Professionals when id is 606131', () => {
    expect(mapIcmsToMcfSubScheme(606131)).to.deep.equal({
      endDate: '2019-08-19',
      id: 131,
      programme: 'PCP for Intellectual Property Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-02-20',
    });
  });
  it('should map to PCP for Internal Auditors when id is 606132', () => {
    expect(mapIcmsToMcfSubScheme(606132)).to.deep.equal({
      endDate: '2019-12-31',
      id: 132,
      programme: 'PCP for Internal Auditors',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-01-01',
    });
  });
  it('should map to PCP for IT Desktop Support Executive when id is 606133', () => {
    expect(mapIcmsToMcfSubScheme(606133)).to.deep.equal({
      endDate: '2019-06-28',
      id: 133,
      programme: 'PCP for IT Desktop Support Executive',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-04-20',
    });
  });
  it('should map to PCP for IT System Support Engineer when id is 606134', () => {
    expect(mapIcmsToMcfSubScheme(606134)).to.deep.equal({
      endDate: '2019-06-28',
      id: 134,
      programme: 'PCP for IT System Support Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-04-20',
    });
  });
  it('should map to PCP for IT/Desktop and System Administrators when id is 606135', () => {
    expect(mapIcmsToMcfSubScheme(606135)).to.deep.equal({
      endDate: '2019-06-28',
      id: 135,
      programme: 'PCP for IT/Desktop and System Administrators',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-04-20',
    });
  });
  it('should map to PCP for MICE Executives - Adrenalin Group Pte Ltd when id is 606136', () => {
    expect(mapIcmsToMcfSubScheme(606136)).to.deep.equal({
      endDate: '2019-05-10',
      id: 136,
      programme: 'PCP for MICE Executives - Adrenalin Group Pte Ltd',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-05-11',
    });
  });
  it('should map to PCP for MICE Executives - Aspen Event Planners Pte Ltd when id is 606137', () => {
    expect(mapIcmsToMcfSubScheme(606137)).to.deep.equal({
      endDate: '2019-05-10',
      id: 137,
      programme: 'PCP for MICE Executives - Aspen Event Planners Pte Ltd',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-05-11',
    });
  });
  it('should map to PCP for MICE Executives - Kingsmen Creatives Ltd when id is 606138', () => {
    expect(mapIcmsToMcfSubScheme(606138)).to.deep.equal({
      endDate: '2019-05-31',
      id: 138,
      programme: 'PCP for MICE Executives - Kingsmen Creatives Ltd',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-06-01',
    });
  });
  it('should map to PCP for Microsoft SQL Server Administrator / Developer when id is 606139', () => {
    expect(mapIcmsToMcfSubScheme(606139)).to.deep.equal({
      endDate: '2020-01-01',
      id: 139,
      programme: 'PCP for Microsoft SQL Server Administrator / Developer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-02-01',
    });
  });
  it('should map to PCP for Mobile Application Developer (Android & iOS) when id is 606140', () => {
    expect(mapIcmsToMcfSubScheme(606140)).to.deep.equal({
      endDate: '2020-01-01',
      id: 140,
      programme: 'PCP for Mobile Application Developer (Android & iOS)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-02-01',
    });
  });
  it('should map to PCP for Network and Infrastructure Officers - Singtel when id is 606141', () => {
    expect(mapIcmsToMcfSubScheme(606141)).to.deep.equal({
      endDate: '2019-04-30',
      id: 141,
      programme: 'PCP for Network and Infrastructure Officers - Singtel',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-10-01',
    });
  });
  it('should map to PCP for Network Engineer when id is 606142', () => {
    expect(mapIcmsToMcfSubScheme(606142)).to.deep.equal({
      endDate: '2020-01-01',
      id: 142,
      programme: 'PCP for Network Engineer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-02-01',
    });
  });
  it('should map to PCP for Operations (Banking) Professionals when id is 606143', () => {
    expect(mapIcmsToMcfSubScheme(606143)).to.deep.equal({
      endDate: '2020-05-31',
      id: 143,
      programme: 'PCP for Operations (Banking) Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-04-19',
    });
  });
  it('should map to PCP for Private Banking Professionals when id is 606144', () => {
    expect(mapIcmsToMcfSubScheme(606144)).to.deep.equal({
      endDate: '2020-05-31',
      id: 144,
      programme: 'PCP for Private Banking Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-04-19',
    });
  });
  it('should map to PCP for Professional Executives - Hotel Sector (Amara Singapore) when id is 606145', () => {
    expect(mapIcmsToMcfSubScheme(606145)).to.deep.equal({
      endDate: '2019-03-01',
      id: 145,
      programme: 'PCP for Professional Executives - Hotel Sector (Amara Singapore)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-03-01',
    });
  });
  it('should map to PCP for Professional Executives - Hotel Sector (Goodwood Park Hotel) when id is 606146', () => {
    expect(mapIcmsToMcfSubScheme(606146)).to.deep.equal({
      endDate: '2019-03-01',
      id: 146,
      programme: 'PCP for Professional Executives - Hotel Sector (Goodwood Park Hotel)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-09-01',
    });
  });
  it('should map to PCP for Professional Executives - Hotel Sector (Grand Copthorne Waterfront) when id is 606147', () => {
    expect(mapIcmsToMcfSubScheme(606147)).to.deep.equal({
      endDate: '2019-05-20',
      id: 147,
      programme: 'PCP for Professional Executives - Hotel Sector (Grand Copthorne Waterfront)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-11-21',
    });
  });
  it('should map to PCP for Professional Executives - Hotel Sector (Intercontinental Singapore Robertson Quay) when id is 606148', () => {
    expect(mapIcmsToMcfSubScheme(606148)).to.deep.equal({
      endDate: '2019-03-07',
      id: 148,
      programme: 'PCP for Professional Executives - Hotel Sector (Intercontinental Singapore Robertson Quay)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-09-08',
    });
  });
  it('should map to PCP for Professional Executives - Hotel Sector (Intercontinental Singapore) when id is 606149', () => {
    expect(mapIcmsToMcfSubScheme(606149)).to.deep.equal({
      endDate: '2019-06-03',
      id: 149,
      programme: 'PCP for Professional Executives - Hotel Sector (Intercontinental Singapore)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-06-04',
    });
  });
  it('should map to PCP for Public Transport Rail Operations Professionals when id is 606150', () => {
    expect(mapIcmsToMcfSubScheme(606150)).to.deep.equal({
      endDate: '2020-05-31',
      id: 150,
      programme: 'PCP for Public Transport Rail Operations Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-10-01',
    });
  });
  it('should map to PCP for Retail Professionals when id is 606151', () => {
    expect(mapIcmsToMcfSubScheme(606151)).to.deep.equal({
      endDate: '2021-03-31',
      id: 151,
      programme: 'PCP for Retail Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2016-05-01',
    });
  });
  it('should map to PCP for Salesforce Platform Professionals when id is 606152', () => {
    expect(mapIcmsToMcfSubScheme(606152)).to.deep.equal({
      endDate: '2019-07-31',
      id: 152,
      programme: 'PCP for Salesforce Platform Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-08-01',
    });
  });
  it('should map to PCP for SAP HANA Consultant when id is 606153', () => {
    expect(mapIcmsToMcfSubScheme(606153)).to.deep.equal({
      endDate: '2020-01-22',
      id: 153,
      programme: 'PCP for SAP HANA Consultant',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-02-01',
    });
  });
  it('should map to PCP for Software Developer (.NET) when id is 606154', () => {
    expect(mapIcmsToMcfSubScheme(606154)).to.deep.equal({
      endDate: '2020-01-01',
      id: 154,
      programme: 'PCP for Software Developer (.NET)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-02-01',
    });
  });
  it('should map to PCP for South East Asia Ready Talents when id is 606155', () => {
    expect(mapIcmsToMcfSubScheme(606155)).to.deep.equal({
      endDate: '2020-05-31',
      id: 155,
      programme: 'PCP for South East Asia Ready Talents',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-08-01',
    });
  });
  it('should map to PCP for Speech Therapists when id is 606156', () => {
    expect(mapIcmsToMcfSubScheme(606156)).to.deep.equal({
      endDate: '2020-05-30',
      id: 156,
      programme: 'PCP for Speech Therapists',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-01-01',
    });
  });
  it('should map to PCP for System Administrator (Windows Server, Linux & MacOS) when id is 606157', () => {
    expect(mapIcmsToMcfSubScheme(606157)).to.deep.equal({
      endDate: '2020-01-01',
      id: 157,
      programme: 'PCP for System Administrator (Windows Server, Linux & MacOS)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-02-01',
    });
  });
  it('should map to PCP for Tourism Executives (RWS) when id is 606158', () => {
    expect(mapIcmsToMcfSubScheme(606158)).to.deep.equal({
      endDate: '2019-08-16',
      id: 158,
      programme: 'PCP for Tourism Executives (RWS)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-08-17',
    });
  });
  it('should map to PCP for Trust Administration Professionals when id is 606159', () => {
    expect(mapIcmsToMcfSubScheme(606159)).to.deep.equal({
      endDate: '2020-05-31',
      id: 159,
      programme: 'PCP for Trust Administration Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2018-04-19',
    });
  });
  it('should map to PCP for Web Developer when id is 606160', () => {
    expect(mapIcmsToMcfSubScheme(606160)).to.deep.equal({
      endDate: '2020-01-01',
      id: 160,
      programme: 'PCP for Web Developer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-02-01',
    });
  });
  it('should map to PCP for Web Developer (Linux, MySQL & PHP) when id is 606161', () => {
    expect(mapIcmsToMcfSubScheme(606161)).to.deep.equal({
      endDate: '2020-01-01',
      id: 161,
      programme: 'PCP for Web Developer (Linux, MySQL & PHP)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2017-02-01',
    });
  });
  it('should map to PCP for Southeast Asia Ready Talents when id is 606162', () => {
    expect(mapIcmsToMcfSubScheme(606162)).to.deep.equal({
      endDate: '2020-05-31',
      id: 162,
      programme: 'PCP for Southeast Asia Ready Talents',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Supply Chain Professionals when id is 606163', () => {
    expect(mapIcmsToMcfSubScheme(606163)).to.deep.equal({
      endDate: '2020-05-31',
      id: 163,
      programme: 'PCP for Supply Chain Professionals',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Data Analyst when id is 606164', () => {
    expect(mapIcmsToMcfSubScheme(606164)).to.deep.equal({
      endDate: '2019-12-31',
      id: 164,
      programme: 'PCP for Data Analyst',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Digital Marketing Specialist when id is 606165', () => {
    expect(mapIcmsToMcfSubScheme(606165)).to.deep.equal({
      endDate: '2019-06-28',
      id: 165,
      programme: 'PCP for Digital Marketing Specialist',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Infocomm Sales & Marketing Specialist when id is 606166', () => {
    expect(mapIcmsToMcfSubScheme(606166)).to.deep.equal({
      endDate: '2019-06-28',
      id: 166,
      programme: 'PCP for Infocomm Sales & Marketing Specialist',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Salesforce Sales Cloud Consultant when id is 606167', () => {
    expect(mapIcmsToMcfSubScheme(606167)).to.deep.equal({
      endDate: '2019-07-31',
      id: 167,
      programme: 'PCP for Salesforce Sales Cloud Consultant',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Salesforce Service Cloud Consultant when id is 606168', () => {
    expect(mapIcmsToMcfSubScheme(606168)).to.deep.equal({
      endDate: '2019-07-31',
      id: 168,
      programme: 'PCP for Salesforce Service Cloud Consultant',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Salesforce Marketing Cloud Specialist when id is 606169', () => {
    expect(mapIcmsToMcfSubScheme(606169)).to.deep.equal({
      endDate: '2019-07-31',
      id: 169,
      programme: 'PCP for Salesforce Marketing Cloud Specialist',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Microsoft SQL Server Administrator/Developer when id is 606170', () => {
    expect(mapIcmsToMcfSubScheme(606170)).to.deep.equal({
      endDate: '2020-01-31',
      id: 170,
      programme: 'PCP for Microsoft SQL Server Administrator/Developer',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Software Developer (Java) when id is 606171', () => {
    expect(mapIcmsToMcfSubScheme(606171)).to.deep.equal({
      endDate: '2020-01-31',
      id: 171,
      programme: 'PCP for Software Developer (Java)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Network Security Analyst when id is 606172', () => {
    expect(mapIcmsToMcfSubScheme(606172)).to.deep.equal({
      endDate: '2020-01-31',
      id: 172,
      programme: 'PCP for Network Security Analyst',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Systems Administrator (Windows, Server, Linux, and MacOS) when id is 606173', () => {
    expect(mapIcmsToMcfSubScheme(606173)).to.deep.equal({
      endDate: '2020-01-31',
      id: 173,
      programme: 'PCP for Systems Administrator (Windows, Server, Linux, and MacOS)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Consultants (Deloitte) when id is 606174', () => {
    expect(mapIcmsToMcfSubScheme(606174)).to.deep.equal({
      endDate: '2019-07-31',
      id: 174,
      programme: 'PCP for Consultants (Deloitte)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Consultants (Ernst & Young) when id is 606175', () => {
    expect(mapIcmsToMcfSubScheme(606175)).to.deep.equal({
      endDate: '2019-05-31',
      id: 175,
      programme: 'PCP for Consultants (Ernst & Young)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to PCP for Consultants (KPMG) when id is 606176', () => {
    expect(mapIcmsToMcfSubScheme(606176)).to.deep.equal({
      endDate: '2019-09-30',
      id: 176,
      programme: 'PCP for Consultants (KPMG)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-04-26',
    });
  });
  it('should map to Attach and Train programme for Biologics Manufacturing (TP) when id is 606177', () => {
    expect(mapIcmsToMcfSubScheme(606177)).to.deep.equal({
      endDate: '2020-05-31',
      id: 177,
      programme: 'Attach and Train programme for Biologics Manufacturing (TP)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-05-31',
    });
  });
  it('should map to PCP for Biopharmaceuticals Manufacturing when id is 606178', () => {
    expect(mapIcmsToMcfSubScheme(606178)).to.deep.equal({
      endDate: '2020-03-31',
      id: 178,
      programme: 'PCP for Biopharmaceuticals Manufacturing',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-05-31',
    });
  });
  it('should map to Attach and Train programme for Biologics Manufacturing (SP) when id is 606179', () => {
    expect(mapIcmsToMcfSubScheme(606179)).to.deep.equal({
      endDate: '2020-05-31',
      id: 179,
      programme: 'Attach and Train programme for Biologics Manufacturing (SP)',
      scheme: {
        expiryDate: '2055-05-04',
        id: 2,
        scheme: 'Professional Conversion Programme (PCP)',
        startDate: '1977-05-25',
      },
      startDate: '2019-05-31',
    });
  });
});
