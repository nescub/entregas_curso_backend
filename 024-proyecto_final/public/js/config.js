function getSystemConfig(){   
    return fetch('/api/config', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
    })
        .then(response => response.json())  
}

function searchTemplate(path) {
    return fetch(path)
        .then(response => response.text())
}

async function renderSystemParameters() {
    const systemConfig = await getSystemConfig()
    const parameters = []

    for (const property in systemConfig) {
        parameters.push({key: property, value: systemConfig[property]})
    }

    const templateText = await searchTemplate('/templates/systemConfiguration.hbs')
    const template = Handlebars.compile(templateText)
    const context = { parameters: parameters, parametersExist: parameters.length > 0 }
    const html = template(context)
    
    document.getElementById('ParameterList').innerHTML = html
}

renderSystemParameters()