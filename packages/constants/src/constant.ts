function Key(id: string, label: string, value: string, url: string) {
  return {id, label, value: typeof value === 'undefined' ? id : value, url};
}


export const CATEGORY = {
  ACCOUNTING_AUDITING_TAXATION:  Key(
    'accounting_auditing_taxation',
    'Accounting / Auditing / Taxation',
    'Accounting / Auditing / Taxation',
    'accounting',
  ),
  ADMIN_SECRETARIAL:  Key(
    'admin_secretarial',
    'Admin / Secretarial',
    'Admin / Secretarial',
    'admin',
  ),
  ADVERTISING_MEDIA:  Key(
    'advertising_media',
    'Advertising / Media',
    'Advertising / Media',
    'advertising',
  ),
  ARCHITECTURE_INTERIOR_DESIGN:  Key(
    'architecture_interior_design',
    'Architecture / Interior Design',
    'Architecture / Interior Design',
    'architecture',
  ),
  BANKING_AND_FINANCE:  Key(
    'banking_finance',
    'Banking and Finance',
    'Banking and Finance',
    'banking-finance',
  ),
  BUILDING_AND_CONSTRUCTION:  Key(
    'building_construction',
    'Building and Construction',
    'Building and Construction',
    'building-construction',
  ),
  CONSULTING:  Key(
    'consulting',
    'Consulting',
    'Consulting',
    'consulting',
  ),
  CUSTOMER_SERVICE:  Key(
    'customer_service',
    'Customer Service',
    'Customer Service',
    'customer-service',
  ),
  DESIGN:  Key(
    'design',
    'Design',
    'Design',
    'design',
  ),
  EDUCATION_AND_TRAINING:  Key(
    'education_training',
    'Education and Training',
    'Education and Training',
    'education-training',
  ),
  ENGINEERING:  Key(
    'engineering',
    'Engineering',
    'Engineering',
    'engineering',
  ),
  ENTERTAINMENT:  Key(
    'entertainment',
    'Entertainment',
    'Entertainment',
    'entertainment',
  ),
  ENVIRONMENT_HEALTH:  Key(
    'environment_health',
    'Environment / Health',
    'Environment / Health',
    'environment',
  ),
  EVENTS_PROMOTIONS:  Key(
    'events_promotions',
    'Events / Promotions',
    'Events / Promotions',
    'events',
  ),
  F_N_B:  Key(
    'f_n_b',
    'F&B',
    'F&B',
    'food-and-beverage',
  ),
  GENERAL_MANAGEMENT:  Key(
    'general_management',
    'General Management',
    'General Management',
    'general-management',
  ),
  GENERAL_WORK:  Key(
    'general_work',
    'General Work',
    'General Work',
    'general-work',
  ),
  HEALTHCARE_PHARMACEUTICAL:  Key(
    'healthcare_pharmaceutical',
    'Healthcare / Pharmaceutical',
    'Healthcare / Pharmaceutical',
    'healthcare',
  ),
  HOSPITALITY:  Key(
    'hospitality',
    'Hospitality',
    'Hospitality',
    'hospitality',
  ),
  HUMAN_RESOURCES:  Key(
    'human_resources',
    'Human Resources',
    'Human Resources',
    'human-resources',
  ),
  INFORMATION_TECHNOLOGY:  Key(
    'information_technology',
    'Information Technology',
    'Information Technology',
    'information-technology',
  ),
  INSURANCE:  Key(
    'insurance',
    'Insurance',
    'Insurance',
    'insurance',
  ),
  LEGAL:  Key(
    'legal',
    'Legal',
    'Legal',
    'legal',
  ),
  LOGISTICS_SUPPLY_CHAIN:  Key(
    'logistics_supply_chain',
    'Logistics / Supply Chain',
    'Logistics / Supply Chain',
    'logistics',
  ),
  MANUFACTURING:  Key(
    'manufacturing',
    'Manufacturing',
    'Manufacturing',
    'manufacturing',
  ),
  MARKETING_PUBLIC_RELATIONS:  Key(
    'marketing_public_relations',
    'Marketing / Public Relations',
    'Marketing / Public Relations',
    'marketing',
  ),
  MEDICAL_THERAPY_SERVICES:  Key(
    'medical_therapy_services',
    'Medical / Therapy Services',
    'Medical / Therapy Services',
    'medical',
  ),
  PERSONAL_CARE_BEAUTY:  Key(
    'personal_care_beauty',
    'Personal Care / Beauty',
    'Personal Care / Beauty',
    'personal-care',
  ),
  PROFESSIONAL_SERVICES:  Key(
    'professional_services',
    'Professional Services',
    'Professional Services',
    'professional-services',
  ),
  PUBLIC_CIVIL_SERVICES:  Key(
    'public_civil_service',
    'Public / Civil Service',
    'Public / Civil Service',
    'public',
  ),
  PURCHASING_MERCHANDISING:  Key(
    'purchasing_merchandising',
    'Purchasing / Merchandising',
    'Purchasing / Merchandising',
    'purchasing',
  ),
  REAL_ESTATE_PROPERTY_MANAGEMENT:  Key(
    'real_estate_property_management',
    'Real Estate / Property Management',
    'Real Estate / Property Management',
    'real-estate',
  ),
  REPAIR_MAINTENANCE:  Key(
    'repair_maintenance',
    'Repair and Maintenance',
    'Repair and Maintenance',
    'repair-maintenance',
  ),
  RISK_MANAGEMENT:  Key(
    'risk_management',
    'Risk Management',
    'Risk Management',
    'risk-management',
  ),
  SALES_RETAIL:  Key(
    'sales_retail',
    'Sales / Retail',
    'Sales / Retail',
    'sales',
  ),
  SCIENCES_LABORATORY_R_N_D:  Key(
    'sciences_laboratory_r_n_d',
    'Sciences / Laboratory / R&D',
    'Sciences / Laboratory / R&D',
    'sciences',
  ),
  SECURITY_AND_INVESTIGATION:  Key(
    'security_investigation',
    'Security and Investigation',
    'Security and Investigation',
    'security',
  ),
  SOCIAL_SERVICES:  Key(
    'social_services',
    'Social Services',
    'Social Services',
    'social-services',
  ),
  TELECOMMUNICATIONS:  Key(
    'telecommunications',
    'Telecommunications',
    'Telecommunications',
    'telecommunications',
  ),
  TRAVEL_TOURISM:  Key(
    'travel_tourism',
    'Travel / Tourism',
    'Travel / Tourism',
    'travel',
  ),
  OTHERS:  Key('others', 'Others', 'Others', 'others'),
};

