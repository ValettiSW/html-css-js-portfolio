function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}


//LANGUAGE SWITCHER

const translations = {
  en: {
    // navbar
    about: "About",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",

    // profile section
    hello: "Hello, I'm",
    role: "Frontend Developer",
    downloadCV: "Download CV",
    contactInfo: "Contact Info",

    // about section
    getToKnow: "Get To Know More",
    aboutTitle: "About Me",
    experienceTitle: "Experience",
    experienceDesc: "1+ years <br>Frontend Development",
    educationTitle: "Education",
    educationDesc: "Computer Science Degree <br>To be completed",
    aboutText: "Computer Systems Analyst student with training in programming, databases, and web    development. Knowledge of Python (basic), JavaScript, HTML, and CSS (early-intermediate level), basic use of MySQL, and foundational backend development in C. Analytical, organized, and committed to continuous learning. Interested in developing within technological environments where I can apply logic, data analysis, and process optimization. Highly motivated to learn new tools and methodologies according to team needs.",

    // experience section
    exploreMy: "Explore My",
    experienceMain: "Experience",

    // projects section
    browseRecent: "Browse My Recent",
    projectsTitle: "Projects",

    // contact section
    getInTouch: "Get in Touch",
    contactTitle: "Contact Me",

    // footer
    footerText: "Copyright © 2026 Gabriel Valetti. All Rights Reserved.",
  },

  es: {
    // navbar
    about: "Sobre mí",
    experience: "Experiencia",
    projects: "Proyectos",
    contact: "Contacto",

    // profile section
    hello: "Hola, soy",
    role: "Desarrollador Frontend",
    downloadCV: "Descargar CV",
    contactInfo: "Información de contacto",

    // about section
    getToKnow: "Conoce más",
    aboutTitle: "Sobre mí",
    experienceTitle: "Experiencia",
    experienceDesc: "Más de 1 año <br>en Desarrollo Frontend",
    educationTitle: "Educación",
    educationDesc: "Licenciatura en Ciencias de la Computación <br>En curso",
    aboutText: "Estudiante de Analista en Computación con formación en programación, bases de datos y desarrollo web. Con conocimientos en Python (básico), JavaScript, HTML y CSS (nivel intermedio inicial), uso básico de MySQL y fundamentos de desarrollo backend en lenguaje C. Perfil analítico, organizado y orientado al aprendizaje continuo. Interesado en desarrollarme en entornos tecnológicos donde pueda aplicar lógica, análisis y optimización de procesos. Alta motivación para aprender nuevas herramientas y metodologías según las necesidades del equipo.",


    // experience section
    exploreMy: "Explora mi",
    experienceMain: "Experiencia",

    // projects section
    browseRecent: "Explora mis últimos",
    projectsTitle: "Proyectos",

    // contact section
    getInTouch: "Ponte en contacto",
    contactTitle: "Contáctame",

    // footer
    footerText: "Copyright © 2026 Gabriel Valetti. Todos los derechos reservados.",
  }
};

// Selectores de idioma (desktop y mobile)
const langSelectDesktop = document.getElementById('language-select');
const langSelectMobile = document.getElementById('language-select-mobile');

function syncSelectors(lang) {
  if (langSelectDesktop) langSelectDesktop.value = lang;
  if (langSelectMobile) langSelectMobile.value = lang;
}

function changeLanguage(lang) {
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  localStorage.setItem('lang', lang);
}

// eventos
[langSelectDesktop, langSelectMobile].forEach(select => {
  if (select) {
    select.addEventListener('change', e => {
      const lang = e.target.value;
      syncSelectors(lang);
      changeLanguage(lang);
    });
  }
});

// idioma guardado
window.addEventListener('load', () => {
  const savedLang = localStorage.getItem('lang') || 'en';
  syncSelectors(savedLang);
  changeLanguage(savedLang);
});
