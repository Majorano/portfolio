import '../css/style.css'


const englishLanguageLink = document.querySelector('.english-language')
const frenchLanguageLink = document.querySelector('.french-language')



async function translateTo(language: "en" | "fr") {

    const attributesList = ["[data-text-i-am]", "[data-text-me]", "[data-text-language", "[data-text-webdev]", "[data-text-bitcoin]"]


    let data: string
    if (document.documentElement.lang !== "en" && language === "en") {
        const r = await fetch('/public/translation/en.html')
        if (!r.ok) return
        data = await r.text()
    } else if (document.documentElement.lang !== "fr" && language === "fr") {

        const r = await fetch('/public/translation/fr.html')
        if (!r.ok) return
        data = await r.text()
        
    } else return
    
    const domParser = new DOMParser()
    const newDom = domParser.parseFromString(data, 'text/html')
    console.log(newDom)


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
        englishLanguageLink?.classList.add('active-link')
        frenchLanguageLink?.classList.remove('active-link')

    } else if (document.documentElement.lang === "fr") {
        frenchLanguageLink?.classList.add('active-link')
        englishLanguageLink?.classList.remove('active-link')
    }
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
