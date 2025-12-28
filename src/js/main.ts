import '../css/style.css'


const englishLanguageLink = document.querySelector('.english-language')
const frenchLanguageLink = document.querySelector('.french-language')

function changeLanguage() {
    if (document.documentElement.lang  === "en") {
        englishLanguageLink?.classList.add('active-link')
        frenchLanguageLink?.classList.remove('active-link')
        
    } else if (document.documentElement.lang  === "fr") {
        frenchLanguageLink?.classList.add('active-link')
        englishLanguageLink?.classList.remove('active-link')
    }
}

changeLanguage()

englishLanguageLink?.addEventListener('click', (e) => {
    e.preventDefault()
    document.documentElement.lang  = "en"
    changeLanguage()
})

frenchLanguageLink?.addEventListener('click', (e) => {
    e.preventDefault()
    document.documentElement.lang  = "fr"
    changeLanguage()
})
