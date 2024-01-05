import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from 'i18next-browser-languagedetector'


import translationsInEng from '@locales/en/translation.json'
import translationsInFrench from '@locales/fr/translation.json'

const selectedLanguage = localStorage.getItem('selectedLanguage')


// the translations
const resources = {
  en: {
    translation: translationsInEng
  },
  fr: {
    translation: translationsInFrench
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: selectedLanguage || "fr",
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    ns: "translation",
    defaultNS: "translation"
  })

export { i18n }