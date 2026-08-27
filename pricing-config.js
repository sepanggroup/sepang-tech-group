/* Runtime safety: keep full-page captures and direct navigation from leaving reveal content hidden. */
if (typeof document !== 'undefined') {
  const revealSafety = (root) => {
    root.querySelectorAll?.('.reveal:not(.visible)').forEach((element) => element.classList.add('visible'));
  };
  revealSafety(document);
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) revealSafety(node);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
}

export const BASE_PRODUCTS = {
  website: { label: 'Business Website', price: 761.84, paymentUrl: 'https://www.paypal.com/ncp/payment/KBL65LTBNK568' },
  store: { label: 'Online Store', price: 1274.04, paymentUrl: 'https://www.paypal.com/ncp/payment/7AFUQ6PKWXG7W' },
  software: { label: 'Custom Software', price: 2551.04, paymentUrl: 'https://www.paypal.com/ncp/payment/MFZDQ9TX4532E' },
  mobile: { label: 'Mobile Application', price: 2039.03, paymentUrl: 'https://www.paypal.com/ncp/payment/HX5UVLP8VX7MY' }
};

export const ADDONS = {
  landing: { label: 'Landing Page', price: 349, paymentUrl: 'https://www.paypal.com/ncp/payment/FGNHSNGS24CNQ', cadence: 'one-time' },
  ux: { label: 'UX / Website Audit', price: 149, paymentUrl: 'https://www.paypal.com/ncp/payment/VYPZPSE4EHZGN', cadence: 'one-time' },
  seoAudit: { label: 'Technical SEO Audit', price: 149, paymentUrl: 'https://www.paypal.com/ncp/payment/Z3KL2J2WMNGKU', cadence: 'one-time' },
  analytics: { label: 'Analytics + Search Console setup', price: 99, paymentUrl: 'https://www.paypal.com/ncp/payment/7BF7BT6SK9CNU', cadence: 'one-time' },
  speed: { label: 'Speed & Core Web Vitals', price: 199, paymentUrl: 'https://www.paypal.com/ncp/payment/8BZX29ZAU7P88', cadence: 'one-time' },
  migration: { label: 'Website Migration', price: 249, paymentUrl: 'https://www.paypal.com/ncp/payment/CH98NKL4UBUYA', cadence: 'one-time' },
  bilingual: { label: 'BG + EN language package', price: 149, paymentUrl: 'https://www.paypal.com/ncp/payment/2LMKEWSEGGM9N', cadence: 'one-time' },
  booking: { label: 'Booking / Appointment system', price: 249, paymentUrl: 'https://www.paypal.com/ncp/payment/P9XK8ZXDGFHXQ', cadence: 'one-time' },
  api: { label: 'API integration — starter', price: 299, paymentUrl: 'https://www.paypal.com/ncp/payment/WFNNLSK23L62L', cadence: 'one-time' },
  crm: { label: 'CRM integration — starter', price: 349, paymentUrl: 'https://www.paypal.com/ncp/payment/URTAQQWG96V3G', cadence: 'one-time' },
  brand: { label: 'Logo & mini brand kit', price: 249, paymentUrl: 'https://www.paypal.com/ncp/payment/JLW89W2SPCLZ8', cadence: 'one-time' },
  maintenance: { label: 'Website maintenance', price: 49, planId: 'P-98944406YX3977206NKHOKNA', cadence: 'monthly' },
  security: { label: 'Security + backups', price: 69, planId: 'P-4WD94670L61834622NKHOQHY', cadence: 'monthly' },
  seoGrowth: { label: 'SEO & GEO growth', price: 199, planId: 'P-7HJ962506S651103BNKHOSIQ', cadence: 'monthly' },
  ai: { label: 'AI automation starter', price: 299, planId: 'P-7LF56748BL111320TNKHOUAQ', cadence: 'monthly' }
};

export const PAYMENT_LINKS = Object.fromEntries(
  Object.entries(ADDONS)
    .filter(([, value]) => value.paymentUrl)
    .map(([key, value]) => [key, value.paymentUrl])
);

export const SUBSCRIPTION_PLANS = Object.fromEntries(
  Object.entries(ADDONS)
    .filter(([, value]) => value.planId)
    .map(([key, value]) => [key, value.planId])
);

export function calculateEstimate(productKey, addonKeys = []) {
  const base = BASE_PRODUCTS[productKey]?.price ?? 0;
  const selected = addonKeys.map((key) => ADDONS[key]).filter(Boolean);
  const oneTime = selected
    .filter((item) => item.cadence !== 'monthly')
    .reduce((sum, item) => sum + item.price, 0);
  const monthly = selected
    .filter((item) => item.cadence === 'monthly')
    .reduce((sum, item) => sum + item.price, 0);
  const launchTotal = Number((base + oneTime).toFixed(2));
  return {
    base,
    oneTime,
    monthly,
    launchTotal,
    total: Number((launchTotal + monthly).toFixed(2))
  };
}
