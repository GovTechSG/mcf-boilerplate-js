import Case from 'case';

interface IKey {
  id: string;
  label: string;
  value: string;
  url: string;
}

interface ICategory {
  [category: string]: IKey;
}

function Key(label: string, url: string): IKey {
  return {id: Case.snake(url), label, value: label, url};
}

export const CATEGORY: ICategory = {
  ACCOUNTING_AUDITING_TAXATION: Key('Accounting / Auditing / Taxation', 'accounting'),
  ADMIN_SECRETARIAL: Key('Admin / Secretarial', 'admin'),
  ADVERTISING_MEDIA: Key('Advertising / Media', 'advertising'),
  ARCHITECTURE_INTERIOR_DESIGN: Key('Architecture / Interior Design', 'architecture'),
  BANKING_AND_FINANCE: Key('Banking and Finance', 'banking-finance'),
  BUILDING_AND_CONSTRUCTION: Key('Building and Construction', 'building-construction'),
  CONSULTING: Key('Consulting', 'consulting'),
  CUSTOMER_SERVICE: Key('Customer Service', 'customer-service'),
  DESIGN: Key('Design', 'design'),
  EDUCATION_AND_TRAINING: Key('Education and Training', 'education-training'),
  ENGINEERING: Key('Engineering', 'engineering'),
  ENTERTAINMENT: Key('Entertainment', 'entertainment'),
  ENVIRONMENT_HEALTH: Key('Environment / Health', 'environment'),
  EVENTS_PROMOTIONS: Key('Events / Promotions', 'events'),
  F_N_B: Key('F&B', 'food-and-beverage'),
  GENERAL_MANAGEMENT: Key('General Management', 'general-management'),
  GENERAL_WORK: Key('General Work', 'general-work'),
  HEALTHCARE_PHARMACEUTICAL: Key('Healthcare / Pharmaceutical', 'healthcare'),
  HOSPITALITY: Key('Hospitality', 'hospitality'),
  HUMAN_RESOURCES: Key('Human Resources', 'human-resources'),
  INFORMATION_TECHNOLOGY: Key('Information Technology', 'information-technology'),
  INSURANCE: Key('Insurance', 'insurance'),
  LEGAL: Key('Legal', 'legal'),
  LOGISTICS_SUPPLY_CHAIN: Key('Logistics / Supply Chain', 'logistics'),
  MANUFACTURING: Key('Manufacturing', 'manufacturing'),
  MARKETING_PUBLIC_RELATIONS: Key('Marketing / Public Relations', 'marketing'),
  MEDICAL_THERAPY_SERVICES: Key('Medical / Therapy Services', 'medical'),
  OTHERS: Key('Others', 'others'),
  PERSONAL_CARE_BEAUTY: Key('Personal Care / Beauty', 'personal-care'),
  PROFESSIONAL_SERVICES: Key('Professional Services', 'professional-services'),
  PUBLIC_CIVIL_SERVICES: Key('Public / Civil Service', 'public'),
  PURCHASING_MERCHANDISING: Key('Purchasing / Merchandising', 'purchasing'),
  REAL_ESTATE_PROPERTY_MANAGEMENT: Key('Real Estate / Property Management', 'real-estate'),
  REPAIR_MAINTENANCE: Key('Repair and Maintenance', 'repair-maintenance'),
  RISK_MANAGEMENT: Key('Risk Management', 'risk-management'),
  SALES_RETAIL: Key('Sales / Retail', 'sales'),
  SCIENCES_LABORATORY_R_N_D: Key('Sciences / Laboratory / R&D', 'sciences'),
  SECURITY_AND_INVESTIGATION: Key('Security and Investigation', 'security'),
  SOCIAL_SERVICES: Key('Social Services', 'social-services'),
  TELECOMMUNICATIONS: Key('Telecommunications', 'telecommunications'),
  TRAVEL_TOURISM: Key('Travel / Tourism', 'travel'),
};
