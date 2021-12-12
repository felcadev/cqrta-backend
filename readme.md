# CQRTA

Proyecto que busca que las personas puedan tener un código qr y que este tenga asociado un archivo. Con el tiempo el archivo puede ir cambiando sin necesidad de que el código qr cambie.

## Instalación

Se requiere generar un archivo .env (cambiar de nombre .env.example a .env) o en su defecto agregar las variables de entorno necesarias para el funcionamiento del software.

### Variables

* PORT - Puerto para lanzar la aplicación
* DB_CNN - Conexión de base de datos de mongodb
* JWT_SECRET - Palabra o semilla para creación de JWT
* AWS_ACCESS_KEY_ID - Variable de AWS para el uso de S3
* AWS_SECRET_ACCESS_KEY - Variable de AWS para el uso de S3
* AWS_BUCKET_NAME - Variable de AWS para el uso de S3

### Construcción

Para construir de nuevo todos los archivos de node_modules que son necesarias para el funcionamiento ejecutar:

```
npm install
```

### Lanzamiento

Luego de configurar las variables de entornos, para lanzar la aplicación en modo de desarrollo, ejecutar:

```
npm run start:dev
```

## Construido con 🛠️

* [NodeJS](https://nodejs.org/en/) - Entorno de ejecución
* [Express](https://expressjs.com/es/) - Framework para crear aplicaciones de backend
* [S3](https://aws.amazon.com/es/s3/) - Servicio de AWS para hospedar archivos
* [JWT](https://jwt.io/) - Librería para crear tokens