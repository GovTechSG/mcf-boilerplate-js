import {DISTRICTS as MCF_DISTRICTS} from '../mcf';
import {DISTRICTS as ICMS_DISTRICTS} from '../icms';
import {DISTRICTS as MSF_DISTRICTS} from '../msf';

// ICMS <-> MCF transformation
export const mapIcmsToMcfDistrict = (id: number) =>
  MCF_DISTRICTS.find((district) => district.id === (id === 9999 ? 998 : id));

export const mapMcfToIcmsDistrict = (id: number) =>
  ICMS_DISTRICTS.find((district) => district.id === (id === 998 ? 9999 : id));

// MCF <-> MSF transformation
export const mapMsfToMcfDistrict = (id: number) => MCF_DISTRICTS.find((district) => district.id === id);

export const mapMcfToMsfDistrict = (id: number) => MSF_DISTRICTS.find((district) => district.district === id);
