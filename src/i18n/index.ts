import en from './en/en.json'
import la from './la/la.json'

const languages = {
  en: en,
  la: la
}

export const defaultLocale = 'en'

export const messages = Object.assign(languages)
