# crypto-api

## Levantar proyecto

- ejecutar en consola el siguiente comando:
```docker-compose up (-d si se desea en modo detached)```

- docker-compose up levanta el archivo docker-compose.yml del path donde se ejecuta

- en el docker-compose se inician 3 servicios: la base de datos, un adminer de mysql, el servicio de pm2 que levanta la imagen generada por el Dockerfile

  - db: tiene el servicio de mysql con su configuración inicial y un volumen donde se relaciona una ruta del host con una del container. Los archivos .sql dentro de esa ruta son ejecutados y esta es la migración inicial
  
  - adminer: es una interfaz que facilita la vista y las queries en mysql
  
  - pm2: hace build de la imagen del Dockerfile, en la cual se copian al container las carpetas necesarias, se expone un puerto y se inicializa pm2 con la configuración que se encuentra en pm2.json
  
  ```FROM keymetrics/pm2:latest-alpine
     # Bundle APP files
      COPY backend backend/
      COPY package.json .
      COPY pm2.json .
      COPY .env .

      # Install app dependencies
      ENV NPM_CONFIG_LOGLEVEL warn
      RUN npm install --production

      # Expose the listening port of your app
      EXPOSE 8000

      # # Show current folder structure in logs
      # RUN ls -al -R

      CMD [ "pm2-runtime", "start", "pm2.json" ]
      
## Aclaraciones importantes

- Se consideró que las currencies eran fijas y se las insertó previamente en la base, al hacer la migración.

- Se subió un .env.example porque no es buena práctica subir el .env (.gitignore), se debe reemplazar el nombre por .env para ejecutar la app.

- Se agregó una colección de postman en formato .json con ejemplos de pedidos a los servicios.
      
      
## NPM Scripts

En el package.json están los siguientes scripts:

- start: levanta la app

- test: corre los tests de la carpeta "./backend/tests". Para utilizarlo, hay que ejecutar ```npm install mocha -g``` en la consola correspondiente (host o container)

- migrate: corre una migracion inicial con todos los archivos que se encuentran en "./backend/mysql"

- cleanDB: hace un drop de todas las tablas

Todos estos scripts tienen su version local que toma el DB_HOST=localhost para mysql. Este script es solo para linux, para windows es necesario hacer el set de la variable de ambiente de otra manera. Por ejemplo:

```npm run start:local ```

