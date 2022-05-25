import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import translationJA from "src/assets/locales/ja/translation.json"

const fallbackLng = "ja"

export const languages = [
  {
    translation: translationJA,
    key: "ja",
    label: "日本語",
  },
]

const resources = languages.reduce(
  (prev, curr) => ({ ...prev, [curr.key]: { translation: curr.translation } }),
  {}
)

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,
    debug: false,
    interpolation: { escapeValue: false },
  })

export default i18n
