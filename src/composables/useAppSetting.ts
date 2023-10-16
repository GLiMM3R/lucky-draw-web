export const useAppSetting = () => {
  const setLanguage = (language: string) => {
    localStorage.setItem('lang', language)
  }

  const getLanguage = () => {
    return localStorage.getItem('lang')
  }

  return { setLanguage, getLanguage }
}
