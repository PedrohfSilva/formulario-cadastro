const stateField = document.querySelector('select#state')
const cityField = document.querySelector('select#city')

window.onload = getStates()

function getStates() {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
    fetch(url)
        .then(res => res.json())
        .then(states => {
            for(let state of states) {
                stateField.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

stateField.addEventListener('change', (event) => {
    document.querySelector('div#state-field label').style.display = 'inline'
    document.querySelector('div#city-field label').style.display = 'none'

    stateField.classList.add('valid')
    cityField.classList.remove('valid')
    cityField.disabled = true
    cityField.innerHTML = '<option value="">Selecione a Cidade</option>'
    getCities(event)
})

function getCities(event) {
    let stateSelected = event.target.value
    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateSelected}/municipios`

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for(let city of cities) {
                cityField.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            cityField.disabled = false
        })
}

cityField.addEventListener('change', () => {
    cityField.classList.add('valid')
    document.querySelector('div#city-field label').style.display = 'inline'
})


stateField.addEventListener('focus', () => {
    document.querySelector('select#state option:nth-child(1)')
        .style.display = 'none'
})

cityField.addEventListener('focus', () => {
    document.querySelector('select#city option:nth-child(1)')
        .style.display = 'none'
})
