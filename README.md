# crypto-api

## Levantar proyecto

- ejecutar en consola el siguiente comando:
```docker-compose up (-d si se desea en modo detached)```

- docker-compose up levanta el archivo docker-compose.yml del path donde se ejecuta

- en el docker-compose se inician 3 servicios: la base de datos, un adminer de mysql, el servicio de pm2 que levanta la imagen generada por el Dockerfile

  - db: tiene el servicio de mysql con su configuracion inicial y un volumen donde se especifica una ruta, los archivos .sql dentro de esa ruta son ejecutados y esta es la migracion inicial
  
  - adminer: es una interfaz que facilita la vista y las queries en mysql
  - pm2: hace build de la imagen del Dockerfile, en la cual se copian al container las carpetas necesarias, se expone un puerto y se inicializa pm2 con la configuracion que se encuentra en pm2.json
  
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
      
## NPM Scripts

En el package.json estan los siguientes scripts:

- start: levanta la app

- test: corre los tests de la carpeta ./backend/tests

- migrate: corre una migracion inicial con todos los archivos que se encuentran en ./backend/mysql

- cleanDB: hace un drop de todas las tablas

Todos estos scripts tienen su version local que toma el DB_HOST=localhost para mysql. Por ejemplo:

```npm run start:local ```

## Aclaraciones

- Se considero que las currencies eran fijas y se las inserto previamente en la base.

- Se subio un .env.example porque no es buena practica subir el .env (.gitignore), se debe reemplazar el nombre para ejecutar la app.
