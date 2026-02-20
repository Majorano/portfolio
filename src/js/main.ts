import '../css/style.css'

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

const englishLanguageLink = document.querySelector('[data-english-language]')
const frenchLanguageLink = document.querySelector('[data-french-language]')

const translationFolder = `${import.meta.env.BASE_URL}translation`

async function translateTo(language: "en" | "fr") {

    const attributesList = ["[data-text-i-am]", "[data-text-me]", "[data-text-language", "[data-text-webdev]", "[data-text-bitcoin]"]


    let data: string
    if (document.documentElement.lang !== "en" && language === "en") {
        const r = await fetch(`${translationFolder}/en.html`)
        if (!r.ok) return
        data = await r.text()
    } else if (document.documentElement.lang !== "fr" && language === "fr") {

        const r = await fetch(`${translationFolder}/fr.html`)
        if (!r.ok) return
        data = await r.text()

    } else return

    const domParser = new DOMParser()
    const newDom = domParser.parseFromString(data, 'text/html')

    for (const attribute of attributesList) {
        const newText = newDom.querySelector<HTMLParagraphElement>(attribute)?.innerText
        const element = document.querySelector<HTMLParagraphElement>(attribute)
        if (element && newText) {
            element.innerText = newText
        }
    }
}

function changeLanguage() {
    if (document.documentElement.lang === "en") {
        frenchLanguageLink?.classList.add('inactive-link')
        englishLanguageLink?.classList.remove('inactive-link')

    } else if (document.documentElement.lang === "fr") {
        englishLanguageLink?.classList.add('inactive-link')
        frenchLanguageLink?.classList.remove('inactive-link')
    }
}

// boot the Frecnh language if it's the default language in the user's browser
const navigatorLanguage = navigator.language.split('-')[0] as "en"|"fr"| string
if (navigatorLanguage === "fr") {
    translateTo('fr')
    document.documentElement.lang = "fr"
}
changeLanguage()

englishLanguageLink?.addEventListener('click', (e) => {
    e.preventDefault()
    translateTo("en")
    document.documentElement.lang = "en"
    changeLanguage()

})

frenchLanguageLink?.addEventListener('click', (e) => {
    e.preventDefault()
    translateTo('fr')
    document.documentElement.lang = "fr"
    changeLanguage()

})


