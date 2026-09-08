const supportedLanguages = ["en", "es"];
const localeCache = {};

function getNestedValue(object, key) {
  return key.split(".").reduce((value, part) => value?.[part], object);
}

function getPreferredLanguage() {
  const savedLanguage = localStorage.getItem("lang");
  if (supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = navigator.language?.slice(0, 2);
  return supportedLanguages.includes(browserLanguage) ? browserLanguage : "en";
}

async function loadLocale(language) {
  if (!localeCache[language]) {
    const response = await fetch(`./locales/${language}.json`);
    if (!response.ok) {
      throw new Error(`Unable to load locale: ${language}`);
    }
    localeCache[language] = await response.json();
  }

  return localeCache[language];
}

function updateLocalizedContent(locale) {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const translation = getNestedValue(locale, element.dataset.i18n);
    if (typeof translation === "string") {
      element.innerHTML = translation;
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach(element => {
    const translation = getNestedValue(locale, element.dataset.i18nAttr);
    const attribute = element.dataset.i18nAttribute;
    if (typeof translation === "string" && attribute) {
      element.setAttribute(attribute, translation);
    }
  });
}

function syncLanguageSelectors(language) {
  document.querySelectorAll("[data-language-select]").forEach(select => {
    select.value = language;
  });
}

function updateGiscusLanguage(language) {
  const giscusScript = document.getElementById("giscus-script");
  if (giscusScript) {
    giscusScript.dataset.lang = language;
  }

  const giscusFrame = document.querySelector("iframe.giscus-frame");
  if (giscusFrame?.contentWindow) {
    giscusFrame.contentWindow.postMessage(
      { giscus: { setConfig: { lang: language } } },
      "https://giscus.app"
    );
  }
}

function watchGiscusFrame() {
  const container = document.getElementById("giscus-container");
  if (!container) return;

  const observer = new MutationObserver(() => {
    const giscusFrame = container.querySelector("iframe.giscus-frame");
    if (giscusFrame) {
      updateGiscusLanguage(getPreferredLanguage());
      observer.disconnect();
    }
  });

  observer.observe(container, { childList: true, subtree: true });
}

async function setLanguage(language) {
  const selectedLanguage = supportedLanguages.includes(language) ? language : "en";

  try {
    const locale = await loadLocale(selectedLanguage);
    updateLocalizedContent(locale);
    syncLanguageSelectors(selectedLanguage);
    updateGiscusLanguage(selectedLanguage);
    document.documentElement.lang = selectedLanguage;
    localStorage.setItem("lang", selectedLanguage);
  } catch (error) {
    console.error(error);
  }
}

window.setLanguage = setLanguage;

document.querySelectorAll("[data-language-select]").forEach(select => {
  select.addEventListener("change", event => setLanguage(event.target.value));
});

setLanguage(getPreferredLanguage());
watchGiscusFrame();
