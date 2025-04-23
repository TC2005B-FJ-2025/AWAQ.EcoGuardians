// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import translationEN from './traducción/en/translation.json';
// import translationES from './traducción/es/translation.json';

import translationEN from './en/translation.json';
import translationES from './es/translation.json';
// Configuración del objeto de recursos
const resources = {
  en: { translation: translationEN },
  es: { translation: translationES },
};

i18n
  .use(initReactI18next) // conecta con React
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'es', // idioma por defecto
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // React ya se encarga del escape
    },
  });

export default i18n;
