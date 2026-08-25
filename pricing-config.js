export const BASE_PRODUCTS = {
  website: { label: 'Business Website', price: 761.84 },
  store: { label: 'Online Store', price: 1274.04 },
  software: { label: 'Custom Software', price: 2551.04 },
  mobile: { label: 'Mobile Application', price: 2039.03 }
};

export const ADDONS = {
  landing: { label: 'Landing Page', price: 349 },
  ux: { label: 'UX / Website Audit', price: 149 },
  seoAudit: { label: 'Technical SEO Audit', price: 149 },
  analytics: { label: 'Analytics + Search Console setup', price: 99 },
  speed: { label: 'Speed & Core Web Vitals', price: 199 },
  migration: { label: 'Website Migration', price: 249 },
  bilingual: { label: 'BG + EN language package', price: 149 },
  booking: { label: 'Booking / Appointment system', price: 249 },
  api: { label: 'API integration — starter', price: 299 },
  crm: { label: 'CRM integration — starter', price: 349 },
  brand: { label: 'Logo & mini brand kit', price: 249 },
  maintenance: { label: 'Website maintenance', price: 49 },
  security: { label: 'Security + backups', price: 69 },
  seoGrowth: { label: 'SEO & GEO growth', price: 199 },
  ai: { label: 'AI automation starter', price: 299 }
};

export function calculateEstimate(productKey, addonKeys = []) {
  const base = BASE_PRODUCTS[productKey]?.price ?? 0;
  const addons = addonKeys.reduce((sum, key) => sum + (ADDONS[key]?.price ?? 0), 0);
  return {
    base,
    addons,
    total: Number((base + addons).toFixed(2))
  };
}
