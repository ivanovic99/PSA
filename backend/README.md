# Backend of the project

## Configuration and requiered packages

In this backend we are using MongoDB (mongoose) and Node.js to build and run it.
If you want to try it in your local you'll need to have them installed in your computer. Here are a couple of videos that might help you get it done (they are meant for Linux Ubuntu OS):
Install Node.js: https://www.youtube.com/watch?v=KtTe_ckT3iM
Install MongoDB: https://www.youtube.com/watch?v=HSIh8UswVVY


Once you have the prerequisites mentioned above, you'll be able to run this project following this commands:







#Esqueleto basico de un Back-End con MongoDB

Es un proyecto que tiene como objetivo ser el punto de partida para futuros proyectos.
Solamente crea una DB con un modelo Ticket, su funcion createTicket asociada y un endpoint tickets.

Para correrlo se debe parar en la carpeta Root (gestion_soporte) y correr el comando "npm install".
Luego se debe abrir otra terminal y correr el comando "sudo mongod" para iniciar la DB.
Por ultimo, de nuevo en la terminal donde se hizo el "npm install", hay que pararse en la carpeta root/backend para 
correr el comando "node index.js" y listo! Deberia aparecer dos mensajes que digan:
"Conexión exitosa a la base de datos".
"Servidor iniciado en el puerto 3000"

