import {EMPLOYMENT_TYPES as MSF_EMPLOYMENT_TYPES} from './msf';

const MCF_ORDER = ['Permanent', 'Full Time', 'Part Time', 'Contract', 'Flexi-work', 'Temporary'];

interface IEmploymentType {
  id: string;
  name: string;
}
const isEmploymentType = (employmentType?: IEmploymentType): employmentType is IEmploymentType =>
  employmentType !== undefined && !!employmentType.id && !!employmentType.name;

export const mapMsfToMcf = () => {
  // transform Flexi Time (MSF) to Flexi-work (MCF)
  const transformedMsfEmploymentTypes = MSF_EMPLOYMENT_TYPES.map(
    (employmentType) =>
      employmentType.name === 'Flexi Time' ? {...employmentType, name: 'Flexi-work'} : employmentType,
  );
  // transform expected ordered mcf employment to msf format by mapping by name
  return (
    MCF_ORDER.map((name) =>
      transformedMsfEmploymentTypes.find((employmentType) => employmentType.name === name),
    ).filter(isEmploymentType) || []
  );
};
export const EMPLOYMENT_TYPES: IEmploymentType[] = mapMsfToMcf();
