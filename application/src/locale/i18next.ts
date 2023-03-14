import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import en from './en.json';
const resources = {
    en: { translation: en },
};


i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        detection: {
            order: ["AsyncStorage", "lang"],
            lookupQuerystring: "lang",
            lookupLocalStorage: "lang",
            caches: ["localStorage"],
            keySeparator: false,
            fallbackLng: "en",
            interpolation: {
                escapeValue: false,
            },
        },
    }).then();

export default 18n;