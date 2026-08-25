document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#main-nav');

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((element) => reveal.observe(element));

  if (!document.querySelector('link[data-interactive-style]')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'interactive.css';
    style.dataset.interactiveStyle = 'true';
    document.head.appendChild(style);
  }

  import('./pricing-config.js').then(({ BASE_PRODUCTS, ADDONS, calculateEstimate }) => {
    injectPremiumLayer(BASE_PRODUCTS, ADDONS, calculateEstimate);
  }).catch(() => {
    // Core site remains usable even if the optional pricing layer fails to load.
  });
});

function injectPremiumLayer(BASE_PRODUCTS, ADDONS, calculateEstimate) {
  if (document.querySelector('#premium-services')) return;
  const isEnglish = document.documentElement.lang === 'en';
  const main = document.querySelector('main');
  const contact = document.querySelector('#contact');
  const nav = document.querySelector('#main-nav');
  if (!main || !contact) return;

  if (nav) {
    const pricingLink = [...nav.querySelectorAll('a')].find((link) => link.getAttribute('href') === '#pricing');
    if (pricingLink && !nav.querySelector('[data-premium-nav]')) {
      const extras = document.createElement('a');
      extras.href = '#premium-services';
      extras.dataset.premiumNav = 'true';
      extras.textContent = isEnglish ? 'Extras' : 'Екстри';
      nav.insertBefore(extras, pricingLink.nextSibling);
    }
  }

  const t = isEnglish ? {
    servicesEyebrow: 'Productized services', servicesTitle: 'Premium services with clear, fixed entry pricing.', servicesLead: 'Choose a focused service without starting a full custom project. Final scope is confirmed before delivery.', choose: 'Add to estimator →', oneTime: 'one-time', monthly: '/ month', estimatorEyebrow: 'Project configurator', estimatorTitle: 'Build your project.', estimatorLead: 'Select a starting package and optional services. The result is an indicative estimate, not a binding quotation.', base: 'Starting package', addons: 'Optional services', total: 'Estimated investment', note: 'PayPal buttons remain tied to the four fixed core packages. This estimator does not change those payment links.', request: 'Request this configuration →', reset: 'Reset', noSelection: 'Select a starting package', contactMessage: 'Hello SEPANG TECH GROUP,\n\nI am interested in this configuration:\n'
  } : {
    servicesEyebrow: 'Продуктови услуги', servicesTitle: 'Премиум услуги с ясни фиксирани начални цени.', servicesLead: 'Изберете конкретна услуга, без да започвате пълен custom проект. Финалният обхват се потвърждава преди изпълнение.', choose: 'Добави в конфигуратора →', oneTime: 'еднократно', monthly: '/ месец', estimatorEyebrow: 'Конфигуратор на проект', estimatorTitle: 'Изгради своя проект.', estimatorLead: 'Изберете основен пакет и допълнителни услуги. Резултатът е ориентировъчна инвестиция, а не обвързваща оферта.', base: 'Основен пакет', addons: 'Допълнителни услуги', total: 'Ориентировъчна инвестиция', note: 'PayPal бутоните остават свързани само с четирите фиксирани основни пакета. Конфигураторът не променя тези платежни връзки.', request: 'Заяви тази конфигурация →', reset: 'Изчисти', noSelection: 'Изберете основен пакет', contactMessage: 'Здравейте, SEPANG TECH GROUP,\n\nИнтересувам се от следната конфигурация:\n'
  };

  const addonCopy = isEnglish ? {
    landing:['Landing Page','€349','one-time'], ux:['UX / Website Audit','€149','one-time'], seoAudit:['Technical SEO Audit','€149','one-time'],
    analytics:['Analytics + Search Console setup','€99','one-time'], speed:['Speed & Core Web Vitals','€199','one-time'], migration:['Website Migration','€249','one-time'],
    bilingual:['BG + EN language package','€149','one-time'], booking:['Booking / Appointment system','€249','one-time'], api:['API integration — starter','€299','one-time'],
    crm:['CRM integration — starter','€349','one-time'], brand:['Logo & mini brand kit','€249','one-time'], maintenance:['Website maintenance','€49','/ month'],
    security:['Security + backups','€69','/ month'], seoGrowth:['SEO & GEO growth','€199','/ month'], ai:['AI automation starter','€299','/ month']
  } : {
    landing:['Landing Page','€349','еднократно'], ux:['UX / Website Audit','€149','еднократно'], seoAudit:['Технически SEO одит','€149','еднократно'],
    analytics:['Google Analytics + Search Console','€99','еднократно'], speed:['Speed & Core Web Vitals','€199','еднократно'], migration:['Миграция на сайт','€249','еднократно'],
    bilingual:['BG + EN езиков пакет','€149','еднократно'], booking:['Booking / записване на час','€249','еднократно'], api:['API интеграция — starter','€299','еднократно'],
    crm:['CRM интеграция — starter','€349','еднократно'], brand:['Лого + mini brand kit','€249','еднократно'], maintenance:['Поддръжка на сайт','€49','/ месец'],
    security:['Сигурност + backup','€69','/ месец'], seoGrowth:['SEO & GEO growth','€199','/ месец'], ai:['AI automation starter','€299','/ месец']
  };

  const serviceSection = document.createElement('section');
  serviceSection.id = 'premium-services';
  serviceSection.className = 'section section-soft premium-layer';
  const serviceCards = Object.entries(addonCopy).map(([key, [label, price, cadence]]) => `
    <article class="product-card reveal">
      <div class="product-top"><span>${escapeHtml(ADDONS[key].label.toUpperCase())}</span><b>${price}</b></div>
      <h3>${escapeHtml(label)}</h3>
      <p>${cadence === '/ месец' || cadence === '/ month' ? (isEnglish ? 'Ongoing service for continuous improvement and support.' : 'Текуща услуга за непрекъснато развитие и поддръжка.') : (isEnglish ? 'Focused delivery with a clearly defined starting scope.' : 'Фокусирана услуга с ясно дефиниран начален обхват.')}</p>
      <button class="product-add" type="button" data-addon="${key}">${t.choose}</button>
    </article>`).join('');

  serviceSection.innerHTML = `
    <div class="wrap">
      <div class="section-head reveal">
        <div><div class="eyebrow dark-text">${t.servicesEyebrow}</div><h2>${t.servicesTitle}</h2></div>
        <p>${t.servicesLead}</p>
      </div>
      <div class="product-grid">${serviceCards}</div>
    </div>`;

  const estimator = document.createElement('section');
  estimator.id = 'estimator';
  estimator.className = 'section dark-section premium-layer';
  const baseOptions = Object.entries(BASE_PRODUCTS).map(([key, product]) => `<option value="${key}">${escapeHtml(product.label)} — €${product.price.toFixed(2)}</option>`).join('');
  const addonChecks = Object.entries(addonCopy).map(([key, [label, price, cadence]]) => `
    <label class="estimate-option"><input type="checkbox" value="${key}"><span><strong>${escapeHtml(label)}</strong><small>${price} ${cadence}</small></span></label>`).join('');
  estimator.innerHTML = `
    <div class="wrap estimator-grid">
      <div class="estimator-copy reveal">
        <div class="eyebrow">${t.estimatorEyebrow}</div>
        <h2>${t.estimatorTitle}</h2>
        <p>${t.estimatorLead}</p>
        <div class="estimator-callout">${t.note}</div>
      </div>
      <div class="estimator-card reveal">
        <label class="estimate-label">${t.base}<select id="estimate-base"><option value="">${t.noSelection}</option>${baseOptions}</select></label>
        <div class="estimate-label">${t.addons}</div>
        <div class="estimate-options">${addonChecks}</div>
        <div class="estimate-total"><span>${t.total}</span><strong id="estimate-total">€0.00</strong></div>
        <div class="estimate-actions"><button class="btn btn-light" id="estimate-request" type="button">${t.request}</button><button class="btn btn-outline" id="estimate-reset" type="button">${t.reset}</button></div>
      </div>
    </div>`;

  main.insertBefore(serviceSection, contact);
  main.insertBefore(estimator, contact);

  const baseSelect = document.querySelector('#estimate-base');
  const totalEl = document.querySelector('#estimate-total');
  const checkboxes = [...document.querySelectorAll('.estimate-option input')];
  const renderTotal = () => {
    const result = calculateEstimate(baseSelect.value, checkboxes.filter((box) => box.checked).map((box) => box.value));
    totalEl.textContent = `€${result.total.toFixed(2)}`;
    document.querySelectorAll('.estimate-option').forEach((item) => item.classList.toggle('selected', item.querySelector('input').checked));
  };
  baseSelect.addEventListener('change', renderTotal);
  checkboxes.forEach((box) => box.addEventListener('change', renderTotal));

  document.querySelectorAll('.product-add').forEach((button) => button.addEventListener('click', () => {
    const target = document.querySelector(`.estimate-option input[value="${button.dataset.addon}"]`);
    if (target) { target.checked = true; renderTotal(); document.querySelector('#estimator').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }));

  document.querySelector('#estimate-reset').addEventListener('click', () => { baseSelect.value = ''; checkboxes.forEach((box) => { box.checked = false; }); renderTotal(); });
  document.querySelector('#estimate-request').addEventListener('click', () => {
    const result = calculateEstimate(baseSelect.value, checkboxes.filter((box) => box.checked).map((box) => box.value));
    if (!baseSelect.value) { baseSelect.focus(); return; }
    const selected = checkboxes.filter((box) => box.checked).map((box) => addonCopy[box.value][0]);
    const select = document.querySelector('select[name="service"]');
    const message = document.querySelector('textarea[name="message"]');
    const baseLabel = BASE_PRODUCTS[baseSelect.value].label;
    if (select) select.value = localizeServiceOption(baseSelect.value, isEnglish);
    if (message) message.value = `${t.contactMessage}${baseLabel}${selected.length ? `\n${selected.map((item) => `+ ${item}`).join('\n')}` : ''}\n\n${t.total}: €${result.total.toFixed(2)}`;
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function localizeServiceOption(key, isEnglish) {
  const map = isEnglish ? { website:'Website', store:'Online store', software:'Custom software', mobile:'Mobile application' } : { website:'Уеб сайт', store:'Онлайн магазин', software:'Софтуер по поръчка', mobile:'Мобилно приложение' };
  return map[key] || '';
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
}
