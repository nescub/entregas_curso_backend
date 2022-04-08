import fs from 'fs'

function getPathConfigFile() {
    if (process.env.NODE_ENV  == 'desa') {
        return './config/cfg_desa.properties'
    }

    return './config/cfg.properties'
}

function getSystemConfigurationParameters() {

    // se definen parametros con valores por defecto
    const parameters = {
        SERVER_LISTENING_PORT: 50100,
        TOKEN_EXPIRES_IN_SECONDS: 600,
        PRODUCT_PERSISTENCE_SUPPORT: 'FILE',            //valores posibles: 'FILE' o 'FIREBASE' o 'MONGODB' o 'MEMORY'
        CART_PERSISTENCE_SUPPORT: 'FILE',               //valores posibles: 'FILE' o 'FIREBASE' o 'MONGODB' o 'MEMORY'
        USER_PERSISTENCE_SUPPORT: 'FILE',               //valores posibles: 'FILE' o 'FIREBASE' o 'MONGODB' o 'MEMORY'
        MESSAGE_PERSISTENCE_SUPPORT: 'FILE',            //valores posibles: 'FILE' o 'FIREBASE' o 'MONGODB' o 'MEMORY'
        ORDER_PERSISTENCE_SUPPORT: 'FILE',              //valores posibles: 'FILE' o 'FIREBASE' o 'MONGODB' o 'MEMORY'
        PATH_FIREBASE_ADMIN_SDK_JSON: '',               //ejemplo: './config/firebase/proyecto-nescub-coderhouse-firebase-adminsdk-3tlsq-ec7b438e54.json'
        CONNECTION_STRING_MONGODB: '',                  //ejemplo: 'mongodb://localhost/NOMBRE_DB'
        EMAIL_SMTP_HOST: '',
        EMAIL_SMTP_PORT: 0,
        EMAIL_ACCOUNT_USER: '',
        EMAIL_ACCOUNT_PASS: '',
        EMAIL_ADDRESS_NOTIFICATION_USER: '',
        EMAIL_ADDRESS_NOTIFICATION_ORDER: ''
    }

    const parameterIntegerKeys = [ 'SERVER_LISTENING_PORT', 'TOKEN_EXPIRES_IN_SECONDS', 'EMAIL_SMTP_PORT' ]

    const parameterBooleanKeys = []
    const parameterBooleanValues = [ 'true', 'false' ]

    const parameterPersistenceKeys =  [ 'PRODUCT_PERSISTENCE_SUPPORT', 'CART_PERSISTENCE_SUPPORT', 'USER_PERSISTENCE_SUPPORT', 'MESSAGE_PERSISTENCE_SUPPORT', 'ORDER_PERSISTENCE_SUPPORT' ]
    const parameterPersistenceValues = ['FILE', 'FIREBASE', 'MONGODB', 'MEMORY' ]

    try {
        const cfgData = fs.readFileSync(getPathConfigFile(), 'utf-8')
        const cfgLines = cfgData.split('\r\n')

        for (let i = 0; i < cfgLines.length; i++) {

            if ((cfgLines[i].length > 0) && (cfgLines[i][0] != '#')) {
                const parameterLine = cfgLines[i].split('=')

                if( parameterLine.length >= 2 ) {
                    const parameterKey = parameterLine[0]
                    const parameterValue = parameterLine.slice(1,parameterLine.length).join('=')

                    if ((Object.keys(parameters).includes(parameterKey)) && (parameterValue.length > 0)) {
                        if (parameterBooleanKeys.includes(parameterKey)) {
                            if (parameterBooleanValues.includes(parameterValue)) {
                                parameters[parameterKey] = (parameterValue === 'true')
                            }
                        }
                        else if (parameterPersistenceKeys.includes(parameterKey)) {
                            if (parameterPersistenceValues.includes(parameterValue)) {
                                parameters[parameterKey] = parameterValue
                            }
                        }
                        else if (parameterIntegerKeys.includes(parameterKey)) {
                            parameters[parameterKey] = parseInt(parameterValue)
                        }
                        else {
                            parameters[parameterKey] = parameterValue
                        }
                    }
                }
            }
        }

    } catch (error) {
        throw new Error(`Error al leer archivo de configuracion: ${error.message}`)
    }

    return parameters
}

const config = getSystemConfigurationParameters()

export { config }