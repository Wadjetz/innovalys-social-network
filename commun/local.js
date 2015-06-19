import i18n from 'i18n-light'
const BASE_URL = document.location.origin;
const Storage = localStorage;
let defaultLocale = "en";

i18n.configure({
  defaultLocale: 'en',
  context: {
    'en': require('../locales/en.json'),
    'fr': require('../locales/fr.json'),
    'ru': require('../locales/ru.json'),
    'ch': require('../locales/ch.json')
  }
});

if(Storage.getItem("locale")) {
  let local = Storage.getItem("locale")
  i18n.setLocale(local);
} else {
  Storage.setItem("locale", "en");
}

export default i18n;

export const locales = ['en', 'fr', 'ru', 'ch'];

export function changeLocale(locale) {
  Storage.setItem("locale", locale);
  i18n.setLocale(locale);
}
