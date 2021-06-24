# MS-EXMERDEV
Microservicios implementando NodeJS RabbitMQ
## Prerrequisitos
* NodeJs v12
* RabbitMQ 3.6
## Ejecución de Servidores
### Microservicio A
1. `cd microservicio-a`
2. Instalar dependencias `npm install`
3. Crear variable de entorno `URL_RABBITMQ` en el archivo `src/.env`. (Opcional) Existe valores por defecto.
4. `npm run ms-a`
### Microservicio B
1. `cd microservicio-b`
2. Instalar dependencias `npm install`
3. Crear variable de entorno `URL_RABBITMQ` en el archivo `src/.env`. (Opcional) Existe valores por defecto.
4. `npm run ms-b`
## Ejecución de Pruebas
Se desarrollo un endpoint que obtiene un saludo.

Navegar a [http://localhost:3000/api/greeting](http://localhost:3000/api/greeting)

El `ms-a` se comunica con el `ms-b` a través de RabbitMQ para obtener una respuesta.

Se puede enviar un parámetro para un mensage personalizado:

[http://localhost:3000/api/greeting?name=klever](http://localhost:3000/api/greeting?name=klever)
