# Backend of the project

## Configuration and requiered packages

In this backend we are using MongoDB (mongoose) and Node.js to build and run it.
If you want to try it in your local you'll need to have them installed in your computer. Here are a couple of videos that might help you get it done (they are meant for Linux Ubuntu OS):
Install Node.js: https://www.youtube.com/watch?v=KtTe_ckT3iM
Install MongoDB: https://www.youtube.com/watch?v=HSIh8UswVVY


Once you have the prerequisites mentioned above, you'll be able to run this project following this commands:

First of all, you'll need to create a .env file in the root folder of the project. This file will contain the environment variables that are needed to run the project. The variables that you'll need to add are the following:
```
PORT = <the_port_number_that_you_want>
SESSION_SECRET = <your_session_secret>
JWT_SECRET = <your_swt_secret>
SALT_WORK_FACTOR = <the_salt_factor_number_that_pleases_you>
MONGODB_URI = <your_mongo_uri>
```

In order to build and run the project, you'll need to install all the packages that are required to run the project. To do so, you'll need to run the following command in the root folder of the project:
```
npm install
```

Then, you'll need to run the MongoDB server. To do so, you'll need to run the following command in a new terminal:
```
sudo mongod
```

Finally, you'll need to run the project. To do so, you'll need to run the following command in the root folder of the project:
```
npm start
```



// explain npm install

// explain sudo mongod

// explain npm start

// clarify that in the frontend, a parameter called "secret_token" needs to be added to the headers in order to make the requests to the backend and that this parameter needs to have the value of the JWT token that is generated when the user logs in.

## Project structure



## Testing

To run the tests, first of all, you need to have a terminal running the MongoDB server. To do so, you'll need to run the following command in a new terminal:
```
sudo mongod
```

Then, you'll need to run the project. To do so, you'll need to open another terminal and run the following command in the root folder of the project:

```
npm start
```

Finally open one last terminal and being again in the root folder of the project, run the following command:

```
npm test
```


#Esqueleto basico de un Back-End con MongoDB

Es un proyecto que tiene como objetivo ser el punto de partida para futuros proyectos.
Solamente crea una DB con un modelo Ticket, su funcion createTicket asociada y un endpoint tickets.

Para correrlo se debe parar en la carpeta Root (gestion_soporte) y correr el comando "npm install".
Luego se debe abrir otra terminal y correr el comando "sudo mongod" para iniciar la DB.
Por ultimo, de nuevo en la terminal donde se hizo el "npm install", hay que pararse en la carpeta root/backend para 
correr el comando "node index.js" y listo! Deberia aparecer dos mensajes que digan:
"Conexión exitosa a la base de datos".
"Servidor iniciado en el puerto 3000"

