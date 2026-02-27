import '../css/style.css'
import { changeLanguage, translateTo } from './functions'

// Handle dark mode

// Adds dark class on html element
document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
)
// Dark mode button logic
const darkModeButton = document.querySelector('[data-dark-mode-button]')
darkModeButton?.addEventListener('click', () => {
    document.documentElement.classList.toggle("dark")
})

export const translationFolder = `${import.meta.env.BASE_URL}translation`
export const englishLanguageLink = document.querySelector('[data-english-language]')
export const frenchLanguageLink = document.querySelector('[data-french-language]')


// boot the Frecnh language if it's the default language in the user's browser
const navigatorLanguage = navigator.language.split('-')[0] as "en"|"fr"| string
if (navigatorLanguage === "fr") {
    translateTo('fr')
    document.documentElement.lang = "fr"
}
changeLanguage()

const activeLanguage = document.querySelector<HTMLElement>('[data-active-language]')!
const languageDialog = document.querySelector<HTMLDialogElement>('[data-language-dialog]')


activeLanguage?.addEventListener('click', () => {
    if (!languageDialog?.open) {
        languageDialog?.show()
    } else if (languageDialog?.open) {
        languageDialog.close()
    }
})

englishLanguageLink?.addEventListener('click', (e) => {
    e.preventDefault()
    translateTo("en")
    document.documentElement.lang = "en"
    changeLanguage()

    languageDialog?.close()
    activeLanguage.innerText = "EN"

})

frenchLanguageLink?.addEventListener('click', (e) => {
    e.preventDefault()
    translateTo('fr')
    document.documentElement.lang = "fr"
    changeLanguage()

    languageDialog?.close()
    activeLanguage.innerText = "FR"


})


