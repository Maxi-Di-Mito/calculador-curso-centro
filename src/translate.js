import i18next, { changeLanguage } from "i18next";
import data from './translations.json';

i18next.init({
  lng: "es",
  resources: data
});


// When the page content is ready...
document.addEventListener("DOMContentLoaded", translateEverything);

export function translateEverything() {
  document
    // Find all elements that have the key attribute
    .querySelectorAll("[data-i18n]")
    .forEach(translateElement);
}

// Replace the inner text of the given HTML element
// with the translation in the active locale,
// corresponding to the element's data-i18n-key
function translateElement(element) {
  const key = element.getAttribute("data-i18n");
  // const translation = data[locale][key];
  const translation = i18next.t(key);
  element.innerText = translation;
}

window.changeLocale = l => {
  i18next.changeLanguage(l);
  translateEverything();
};

export function updateLanguage(key) {
  i18next.changeLanguage(key);
  translateEverything();
}

export function getText(key, context = {}) {
  return i18next.t(key, context);
}
