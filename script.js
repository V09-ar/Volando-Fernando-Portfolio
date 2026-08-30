const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));

const roles = ['Web Developer', 'AI / ML', 'Data Analytics', 'Project Coordination', 'Digital Solutions'];
let roleIndex = 0;
const roleElement = document.querySelector('#role');
setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  roleElement.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-6px)' }, { opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 420, easing: 'ease-out' });
  roleElement.textContent = roles[roleIndex];
}, 2700);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const countObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const duration = 850;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    observer.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach((element) => countObserver.observe(element));

document.querySelectorAll('.skill-card p').forEach((skillList) => {
  const tags = skillList.textContent.split(/\s+[^\p{L}\p{N}]+\s+/u).filter(Boolean);
  const wrapper = document.createElement('div');
  wrapper.className = 'skill-tags';
  tags.forEach((tag) => {
    const pill = document.createElement('span');
    pill.textContent = tag;
    wrapper.appendChild(pill);
  });
  skillList.replaceWith(wrapper);
});

const certificateCategories = ['Azure AI', 'Azure AI', 'Data', 'Azure AI', 'Data Engineering', 'Azure AI', 'Azure AI', 'Power BI'];
document.querySelectorAll('.cert-grid > p').forEach((certificate, index) => {
  const provider = document.createElement('span');
  provider.textContent = 'Microsoft / LinkedIn Learning';
  const category = document.createElement('small');
  category.textContent = certificateCategories[index];
  certificate.append(provider, category);
});

const cases = {
  sweatsmart: { title: 'SweatSmart AI Fabrics', type: 'AI / Machine Learning / Data', problem: 'Fabric selection can require interpreting multiple comfort and performance considerations.', objective: 'Create an interactive application for analysing fabric performance and generating fabric recommendations.', approach: 'Combined data analysis and machine learning in an accessible Streamlit application.', technology: 'Python, Pandas, Scikit-learn, Streamlit and Power BI.', contribution: 'Developed the interactive AI application and its fabric recommendation workflow.', result: 'A live application for exploring fabric performance and recommendations.', links: '<a href="https://sweatsmart-ai-fabrics.streamlit.app/" target="_blank" rel="noopener">Open live demo ↗</a>' },
  research: { title: 'AI-Powered Fabric Technology Simulation', type: 'Final Year Research / 94% Project Mark', problem: 'Novel fabric technology needs a structured way to evaluate sweat management, temperature regulation and comfort.', objective: 'Develop an AI-powered simulation and evaluation framework for fabric technology in the clothing industry.', approach: 'Applied data analytics, predictive modelling and data visualisation to fabric performance evaluation.', technology: 'Python, Pandas, Scikit-learn, predictive modelling and data visualisation.', contribution: 'Developed the AI-driven evaluation framework as the final year project.', result: 'Final Year Project mark: 94%.', links: '' },
  mycloth: { title: 'MyCloth.lk', type: 'E-commerce / Web Development', problem: 'An e-commerce platform needed a web foundation with essential launch and delivery configuration.', objective: 'Develop and launch an e-commerce platform using WordPress and WooCommerce.', approach: 'Configured the platform around the supplied web, cloud, security and SEO requirements.', technology: 'WordPress, WooCommerce, AWS, Cloudflare, SSL and SEO.', contribution: 'Developed and launched the e-commerce platform, including hosting, SSL, Cloudflare and SEO configuration; explored AI-based fabric recommendation features.', result: 'Live e-commerce website.', links: '<a href="https://mycloth.lk/" target="_blank" rel="noopener">Visit MyCloth.lk ↗</a>' },
  printx: { title: 'PrintX Global', type: 'Business Website / Web Development', problem: 'The business needed a responsive website aligned with client requirements and branding objectives.', objective: 'Design and develop the business website structure and content experience.', approach: 'Implemented the website with ongoing attention to search optimisation, performance and maintenance.', technology: 'WordPress and SEO.', contribution: 'Designed and developed the responsive website, handling content management, SEO, performance optimisation, maintenance, updates, troubleshooting and technical improvements.', result: 'Live responsive business website.', links: '<a href="https://printxglobal.com/" target="_blank" rel="noopener">Visit PrintX Global ↗</a>' }
};
const modal = document.querySelector('.case-modal');
const content = document.querySelector('#case-content');
document.querySelectorAll('.case-button').forEach((button) => button.addEventListener('click', () => {
  const item = cases[button.dataset.case];
  content.innerHTML = `<p class="case-kicker">${item.type}</p><h2 id="modal-title">${item.title}</h2><div class="case-grid"><div><h3>01 - The challenge</h3><p>${item.problem}</p></div><div><h3>02 - The objective</h3><p>${item.objective}</p></div><div><h3>03 - My approach</h3><p>${item.approach}</p></div><div><h3>04 - Technology</h3><p>${item.technology}</p></div><div><h3>05 - My contribution</h3><p>${item.contribution}</p></div><div><h3>06 - Outcome</h3><p>${item.result}</p></div><div><h3>07 - Lessons</h3><p>Project information available on request.</p></div><div><h3>Links</h3><p>${item.links || 'Project information available on request.'}</p></div></div>`;
  modal.showModal();
}));
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });

const topButton = document.querySelector('.back-to-top');
const siteHeader = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  topButton.classList.toggle('visible', window.scrollY > 700);
  siteHeader.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });
topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const pointer = document.querySelector('.custom-cursor');
  document.addEventListener('pointermove', ({ clientX, clientY }) => {
    pointer.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
  });
  document.querySelectorAll('a, button').forEach((target) => {
    target.addEventListener('pointerenter', () => pointer.classList.add('active'));
    target.addEventListener('pointerleave', () => pointer.classList.remove('active'));
  });
}
