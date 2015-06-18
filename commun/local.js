var i18n = require('i18n-light');
const BASE_URL = document.location.origin;

i18n.configure({
  defaultLocale: 'en',
  context: {
    'en': require('../locales/en.json'),
    'fr': require('../locales/fr.json'),
    'ru': require('../locales/ru.json')
  }
});

module.exports = i18n;
module.exports.locales = ['en', 'fr', 'ru'];
