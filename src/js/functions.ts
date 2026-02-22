import { englishLanguageLink, frenchLanguageLink, translationFolder } from "./main"
/**
 * This function needs:
 * a translation folder, 
 * .json translation files in which the keys are data-atrributes of real HTMLElemnts and the values are the text
 */
export async function translateTo(language: "en" | "fr") {

    let data: Object
    if (document.documentElement.lang !== "en" && language === "en") {
        const r = await fetch(`${translationFolder}/en.json`)
        if (!r.ok) return
        data = await r.json()
    } else if (document.documentElement.lang !== "fr" && language === "fr") {

        const r = await fetch(`${translationFolder}/fr.json`)
        if (!r.ok) return
        data = await r.json()

    } else return

    for (const [key, value] of Object.entries(data)) {
        const htmlElement = document.querySelector<HTMLElement>(`[${key}]`)
        if (htmlElement) {
            htmlElement.innerText = value
        }
    }
}

export function changeLanguage() {
    if (document.documentElement.lang === "en") {
        frenchLanguageLink?.classList.add('inactive-link')
        englishLanguageLink?.classList.remove('inactive-link')

    } else if (document.documentElement.lang === "fr") {
        englishLanguageLink?.classList.add('inactive-link')
        frenchLanguageLink?.classList.remove('inactive-link')
    }
}