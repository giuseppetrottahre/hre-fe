
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const fallbackLng = ['it']
const availableLanguages = ['it','en','de']

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng,
	backend:{
	    requestOptions: {
                cache: 'no-store',
            },
	},
        detection: {
            checkWhitelist: true
        },
        debug: false,
        whitelist: availableLanguages,
        interpolation: {
            escapeValue: false // no need for react. it escapes by default
        }
    })

export default i18n
