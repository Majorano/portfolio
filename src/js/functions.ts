import { englishLanguageLink, frenchLanguageLink, translationFolder } from "./main"


export async function translateTo(language: "en" | "fr") {

    const attributesList = ["[data-text-me]", "[data-text-language", "[data-text-webdev]", "[data-text-bitcoin]"]


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

export function changeLanguage() {
    if (document.documentElement.lang === "en") {
        frenchLanguageLink?.classList.add('inactive-link')
        englishLanguageLink?.classList.remove('inactive-link')

    } else if (document.documentElement.lang === "fr") {
        englishLanguageLink?.classList.add('inactive-link')
        frenchLanguageLink?.classList.remove('inactive-link')
    }
}