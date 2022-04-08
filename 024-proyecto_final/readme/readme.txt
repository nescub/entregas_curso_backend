###############################################################################################
###############################################################################################

Para arrancar esta aplicacion servidor:

    1- Moverse al directorio "024-proyecto_final"
    2- Ejecutar npm install (solo la primera vez)
    3- Definir modo de ejecucion (opcional) - Leer apartado "Configuracion" de este documento.
    4- Ejecutar npm start

    IMPORTANTE: esta aplicación es una aplicacion desarrolada para ejecutarse sobre nodejs. 
                Se requeire nodejs instalado.

    Ejemplo PowerShell:
        PS C:\> cd .\Nestor\CURSO_Desarrollo_Backend\REPO_ENTREGABLES\024-proyecto_final\
        PS C:\Nestor\CURSO_Desarrollo_Backend\REPO_ENTREGABLES\024-proyecto_final> npm install
        PS C:\Nestor\CURSO_Desarrollo_Backend\REPO_ENTREGABLES\024-proyecto_final> $Env:NODE_ENV='desa'
        PS C:\Nestor\CURSO_Desarrollo_Backend\REPO_ENTREGABLES\024-proyecto_final> npm start

###############################################################################################
###############################################################################################

Configuracion:

    Ruta al archivo de configuracion produccion: 024-proyecto_final/config/cfg.properties
    Ruta al archivo de configuracion desarrollo: 024-proyecto_final/config/cfg_desa.properties

    IMPORTANTE:
        - Por defecto la aplicacion toma la configuracion de produccion (cfg.properties).

        - Para que tome la configuracion de desarrollo (cfg_desa.properties) se debe definir
          la variable de entorno NODE_ENV con valor igual a desa (NODE_ENV=desa), antes de
          iniciar la aplicacion servidor.
          Ejemplo de definicion de variable de entorno en PowerShell:
             $Env:NODE_ENV='desa'
             

###############################################################################################
###############################################################################################

API RESTs implementadas por la aplicacion servidor - Leer:

- api_rest_usuarios.txt
- api_rest_accessToken.txt
- api_rest_productos.txt
- api_rest_carrito.txt
- api_rest_ordenes.txt

- api_rest_config.txt
- api_rest_chat.txt

###############################################################################################
###############################################################################################

Vistas implementadas por la aplicacion servidor:

    Chat (websocket) -> http://localhost:50300/chat/
    Parametros de configuracion -> http://localhost:50300/config/

###############################################################################################
###############################################################################################

