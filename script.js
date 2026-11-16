/* ==========================================================================
   SALOUA NEGAFA — ELITE CAFTAN
   Script principal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initLanguageSwitch();
  initCollectionsCarousel();
  initGallerySlider();
  initInstagramVideos();
  initScrollReveal();
  document.getElementById('current-year').textContent = new Date().getFullYear();
});

/* ==========================================================================
   1. MENU MOBILE
   ========================================================================== */

function initMobileNav() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('main-nav');

  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  // Ferme le menu quand on clique sur un lien
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   2. SWITCH DE LANGUE FR / AR
   Pour ajouter/modifier un texte : ajoute data-i18n="ma_cle" dans le HTML
   puis renseigne "ma_cle" dans les deux objets fr / ar ci-dessous.
   ========================================================================== */

/* Textes FR / AR : une clé = un attribut data-i18n dans le HTML */
const translations = {
  "fr": {
    "skip_link": "Aller au contenu principal",
    "nav_home": "Accueil",
    "nav_collections": "Collections",
    "nav_approach": "Notre approche",
    "nav_gallery": "Galerie",
    "nav_contact": "Contact",
    "nav_cta": "Réserver",
    "hero_eyebrow": "Negafa Royal Chaimae",
    "hero_title": "Des tenues d’exception pour le plus beau jour de votre vie",
    "hero_btn": "Voir nos collections",
    "collections_eyebrow": "Nos collections",
    "collections_title": "Une tenue pour chaque instant de votre histoire",
    "col1_title": "Robe de mariée",
    "col1_text": "Des créations élégantes et raffinées pour sublimer la mariée lors de son jour unique.",
    "col2_title": "Caftan & Takchita",
    "col2_text": "Des tenues traditionnelles revisitées avec élégance pour vos cérémonies et moments forts.",
    "col3_title": "Tenues invitées",
    "col3_text": "Des pièces élégantes pour être resplendissante à chaque mariage auquel vous êtes conviée.",
    "col4_title": "Collection prestige",
    "col4_text": "Des pièces d’exception pour les mariées en quête d’un rendu unique et luxueux.",
    "col5_title": "Accessoires mariage",
    "col5_text": "Bijoux, ceintures et détails raffinés pour compléter parfaitement votre tenue.",
    "collections_cta": "Demander un rendez-vous",
    "ig_eyebrow": "Instagram",
    "ig_title": "Découvrez notre univers sur Instagram",
    "ig_btn": "Suivre @negafa_royal_chaimae",
    "ig_reel_link": "Voir le reel",
    "approach_eyebrow": "Notre approche",
    "approach_title": "Sublimer chaque femme pour son jour unique",
    "approach_text": "Chez Negafa Royal Chaimae, chaque mariée est accompagnée avec attention et élégance pour trouver les tenues qui reflètent parfaitement sa beauté et son histoire. Nous prenons le temps de vous écouter, de vous conseiller et de vous guider dans le choix de vos robes afin de créer une expérience unique, dans une ambiance raffinée et chaleureuse. Votre satisfaction et votre confiance sont au cœur de chaque étape de votre préparation.",
    "approach_signature": "— Chaimae",
    "gallery_title": "Nos créations",
    "gallery_btn": "Voir plus de créations",
    "reviews_eyebrow": "Avis clients",
    "reviews_title": "Elles nous ont fait confiance",
    "reviews_summary": "Basé sur les avis de nos clientes",
    "review1_author": "imane irainat",
    "review1_date": "Octobre 2023",
    "review1_text": "« Chaïmae , une prestation exceptionnelle dans l’ordre de la grandeur marocaine.  Avec une finition de professionnalisme et d’accompagnement sans faille.  Des pièces magnifiques et des matériaux de qualités venue tout droit de nos artisans menuisier. Rien à redire ! »",
    "review2_author": "Sarah RIAHI",
    "review2_date": "Juin 2026",
    "review2_text": "« Chaimae a été un amour ! Je la recommande à 1000%\nCompréhensive, toujours à l'écoute, à la recherche de solution.. bref c'est une personne avec un coeur en or »",
    "review3_author": "ynès berkane",
    "review3_date": "Août 2025",
    "review3_text": "« Vraiment la meilleure des negafa sans elle mon mariage aurait pas été si aussi bien c’est une personne professionnelle avec un très grand cœur mash’allah je vous conseille de aller chez elle et de lui faire confiance !!! Merci encore Chaimae❤️❤️❤️❤️❤️ »",
    "contact_eyebrow": "Contact",
    "contact_title": "Réservez votre rendez-vous",
    "contact_text": "Un projet, une envie, une question ? Écrivez-nous directement sur Instagram, nous vous répondons avec plaisir.",
    "contact_btn": "Écrivez-nous sur Instagram",
    "contact_address": "Sur rendez-vous",
    "footer_tagline": "Des tenues d’exception pour le plus beau jour de votre vie",
    "footer_rights": "Tous droits réservés."
  },
  "ar": {
    "skip_link": "الانتقال إلى المحتوى الرئيسي",
    "nav_home": "الرئيسية",
    "nav_collections": "المجموعات",
    "nav_approach": "منهجنا",
    "nav_gallery": "معرض الصور",
    "nav_contact": "اتصلي بنا",
    "nav_cta": "احجزي موعدك",
    "hero_eyebrow": "نݣافة رويال شيماء",
    "hero_title": "أزياء استثنائية لأجمل يوم في حياتك",
    "hero_btn": "اكتشفي مجموعاتنا",
    "collections_eyebrow": "مجموعاتنا",
    "collections_title": "إطلالة تليق بكل لحظة من قصتك",
    "col1_title": "فستان الزفاف",
    "col1_text": "تصاميم أنيقة وراقية لإبراز جمال العروس في يومها الفريد.",
    "col2_title": "قفطان وتقشيطة",
    "col2_text": "أزياء تقليدية بلمسة عصرية أنيقة لمناسباتك وحفلاتك المميزة.",
    "col3_title": "إطلالات المدعوات",
    "col3_text": "قطع أنيقة لتألقي في كل حفل زفاف تتم دعوتك إليه.",
    "col4_title": "مجموعة النخبة",
    "col4_text": "قطع استثنائية للعرائس الباحثات عن إطلالة فاخرة وفريدة من نوعها.",
    "col5_title": "إكسسوارات الزفاف",
    "col5_text": "مجوهرات وأحزمة وتفاصيل راقية لإتمام إطلالتك بشكل مثالي.",
    "collections_cta": "اطلبي موعداً",
    "ig_eyebrow": "إنستغرام",
    "ig_title": "اكتشفي عالمنا على إنستغرام",
    "ig_btn": "تابعينا @negafa_royal_chaimae",
    "ig_reel_link": "مشاهدة الريل",
    "approach_eyebrow": "منهجنا",
    "approach_title": "نُبرز جمال كل امرأة في يومها الفريد",
    "approach_text": "في نݣافة رويال شيماء، تحظى كل عروس بمرافقة مهتمة وأنيقة لإيجاد الأزياء التي تعكس جمالها وقصتها بشكل مثالي. نأخذ الوقت الكافي للإصغاء إليك، ونصحك، وإرشادك في اختيار فساتينك لخلق تجربة فريدة، في أجواء راقية ودافئة. رضاك وثقتك هما في صميم كل خطوة من تحضيراتك.",
    "approach_signature": "— شيماء",
    "gallery_title": "إبداعاتنا",
    "gallery_btn": "اكتشفي المزيد من إبداعاتنا",
    "reviews_eyebrow": "آراء العميلات",
    "reviews_title": "لقد وثقن بنا",
    "reviews_summary": "بناءً على آراء عميلاتنا",
    "review1_author": "imane irainat",
    "review1_date": "أكتوبر 2023",
    "review1_text": "« شيماء، خدمة استثنائية بمستوى العظمة المغربية. بلمسة نهائية احترافية ومرافقة لا تشوبها شائبة. قطع رائعة ومواد عالية الجودة قادمة مباشرة من حِرفيي النجارة لدينا. لا ملاحظات إطلاقاً! »",
    "review2_author": "Sarah RIAHI",
    "review2_date": "يونيو 2026",
    "review2_text": "« كانت شيماء لطيفة جداً! أنصح بها بنسبة 1000%\nمتفهمة، تُصغي دائماً، وتبحث عن الحلول.. باختصار هي إنسانة بقلب من ذهب »",
    "review3_author": "ynès berkane",
    "review3_date": "غشت 2025",
    "review3_text": "« بصراحة أفضل نݣافة، بدونها ما كان زفافي ليكون بهذا الجمال. إنسانة محترفة بقلب كبير جداً ما شاء الله، أنصحكم بالذهاب إليها ووضع ثقتكم فيها!!! شكراً مرة أخرى شيماء ❤️❤️❤️❤️❤️ »",
    "contact_eyebrow": "اتصلي بنا",
    "contact_title": "احجزي موعدك",
    "contact_text": "لديك مشروع أو رغبة أو سؤال؟ راسلينا مباشرة عبر إنستغرام، يسعدنا الرد عليك.",
    "contact_btn": "راسلينا عبر إنستغرام",
    "contact_address": "بموعد مسبق",
    "footer_tagline": "أزياء استثنائية لأجمل يوم في حياتك",
    "footer_rights": "جميع الحقوق محفوظة."
  }
};
function initLanguageSwitch() {
  const button = document.getElementById('lang-switch');
  if (!button) return;

  let currentLang = 'fr';

  button.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'ar' : 'fr';
    applyLanguage(currentLang);

    button.querySelectorAll('.lang-switch__option').forEach((opt) => {
      opt.classList.toggle('is-active', opt.dataset.langOption === currentLang);
    });
  });
}

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  // Trouver la section actuellement affichée
  const sections = [...document.querySelectorAll("section[id]")];

  let currentSection = null;
  let progress = 0;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 150 && rect.bottom > 150) {
      currentSection = section;

      progress =
        (window.scrollY - section.offsetTop) /
        Math.max(section.offsetHeight, 1);

      progress = Math.max(0, Math.min(1, progress));
      break;
    }
  }

  // Changement de langue
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  // Retour au même endroit dans la section
  requestAnimationFrame(() => {
    if (currentSection) {
      const y =
        currentSection.offsetTop +
        currentSection.offsetHeight * progress;

      window.scrollTo({
        top: y,
        behavior: "instant"
      });
    }
  });
}

/* ==========================================================================
   3. CARROUSEL COLLECTIONS
   ========================================================================== */

function initCollectionsCarousel() {
  const track = document.querySelector('.carousel__track');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (!track || !prevBtn || !nextBtn) return;

  // Distance de défilement = largeur d'une carte + l'espacement (gap)
  function getScrollAmount() {
    const card = track.querySelector('.card');
    if (!card) return 300;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 24;
    return card.offsetWidth + gap;
  }

  // Active/désactive les flèches selon la position de défilement
  function updateArrowStates() {
    const { scrollLeft, scrollWidth, clientWidth } = track;
    const isRTL = document.documentElement.dir === 'rtl';
    const atStart = isRTL ? scrollLeft >= -60 : scrollLeft <= 5;
    const atEnd = isRTL
      ? Math.abs(scrollLeft) + clientWidth >= scrollWidth - 5
      : scrollLeft + clientWidth >= scrollWidth - 5;

    prevBtn.classList.toggle('disabled', atStart);
    nextBtn.classList.toggle('disabled', atEnd);
  }

  prevBtn.addEventListener('click', () => {
    const direction = document.documentElement.dir === 'rtl' ? 1 : -1;
    track.scrollBy({ left: direction * getScrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    const direction = document.documentElement.dir === 'rtl' ? -1 : 1;
    track.scrollBy({ left: direction * getScrollAmount(), behavior: 'smooth' });
  });

  track.addEventListener('scroll', updateArrowStates, { passive: true });
  window.addEventListener('resize', updateArrowStates);

  updateArrowStates();
}

/* ==========================================================================
   5. SLIDER GALERIE
   ========================================================================== */

function initGallerySlider() {
  const track = document.getElementById('gallery-track');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');

  if (!track) return;

  const slides = Array.from(track.children);
  let index = 0;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    const isRTL = document.documentElement.dir === 'rtl';
    track.style.transform = `translateX(${isRTL ? index * 100 : -index * 100}%)`;
  }

  prevBtn?.addEventListener('click', () => goTo(index - 1));
  nextBtn?.addEventListener('click', () => goTo(index + 1));

  // Support du swipe tactile
  let startX = 0;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goTo(index - 1) : goTo(index + 1);
    }
  });
}

/* ==========================================================================
   6. LECTURE DES VIDÉOS INSTAGRAM
   ========================================================================== */

function initInstagramVideos() {
  document.querySelectorAll('.ig-card__media').forEach((card) => {
    const video = card.querySelector('video');
    const playBtn = card.querySelector('.ig-card__play');

    if (!video || !playBtn) return;

    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        card.classList.add('is-playing');
      } else {
        video.pause();
        card.classList.remove('is-playing');
      }
    });

    video.addEventListener('click', () => {
      video.pause();
      card.classList.remove('is-playing');
    });
  });
}

/* ==========================================================================
   7. APPARITION AU SCROLL
   ========================================================================== */

function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.carousel, .ig-card, .approach__inner, .review-card, .section__title'
  );

  targets.forEach((el) => el.classList.add('reveal'));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}