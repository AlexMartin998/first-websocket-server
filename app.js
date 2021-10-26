'use strict';
console.clear();

const app = require('./models/server.model.js');

app.listen();

/* 










*/

// -------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////
/** S14: Sockets - Fundamentos de los sockets
 * Inicio del proyecto - Fundamentos sobre Web Sockets
  - Inicio del proyecto: Websocket Server
	  npm i cors express dotenv
			- Modificamos el server.model para q trabaje con sockets
			- CORS: Asegura que funcione la App y que se puedan hacer peticiones externas.

	- Instalacion de socket.io:      https://www.npmjs.com/package/socket.io
							npm install socket.io
	  - Es un handler de socket. Facilita trabajar con sockets.
		  - Tambien existe un  socket io client  para trabajar en casos en el front no esta en el mismo lugar q el back, cosa q es bastante comun en Mobile Apps q requiren una comunicacion en tiempo real con el backend. Todo funciona igual q con el socket.io
		- Uso: 
		  - Crear el Server <- Express
			- Inportar io
			  - Creamos un websocket server. Esto en base al server de express q ya tenemos
						this.server = require('http').createServer(this.app);
    				this.io = require('socket.io')(this.server); // All sockets
				- En el listen() en lugar del this.app.listen() de express lo cambiamos al websocket server de socket.io:   this.server.listen()
				- Verificamos la configuracion correcta de nuestro websocket server:
					- Ingresamos al path    http://localhost:3300/socket.io/socket.io.js
					- Ese mismo path lo requerimos en el HTML antes del src del socket-client.js
					- Si al recargar la pagina en el navegador NO da error, ya esta todo bien configurado.
					- Tambien en la pestana de Network debe aparecer que se descarga el socket.io.js
				- Si tenemos el Front en otro server, debemos especificar nuestra ruta princiapl xq ya es un websocket server

	- Configuracion de  socket.io  Frontend: Docs: https://socket.io/docs/v4/
	  - El   this.io   hace referencia a nuestro servidor se sockets. El cual es != a nuestra app de express, but estan conectados. Como q tuvieramos 2 mundos viviendo en el mismo lado.
		- Nuestro websocket server intentara reconectarse, un # determinado de veces, cuando el server se caiga. 
		- Ahora podemos saber cuando un cliente se conecta y se desconecta.
		  - const socket = io();   <--   Basta con esto en el socket-client.js

	- Mensajes de conexion y desconexion - Cliente
		- En el socket-client.js:
			- Podemos escuchar un evento con el socket.on('event', cb)
			
	- Emitir desde el Client - Escuchar desde el Server
	  - Desde el cliente:
		  - Enviar/Emitir un mensaje:     socket.emit('send-message', payload);
			  - El 'event' puede ser lo que queramos. NO mayus, cosas raras.
				- 2do arg, lo que queremos enviar. Por lo general se envia un Object xq este puede enviar mas informacion.
		- Desde el server:
		  - Escuchar el server:
				- Devemos escuchar el Mismo Evento que utilizamos en el Client
							socket.on('send-message', payload => {
								console.log(payload);
							});
		
	- Emitir desde el Server - Escuchar desde el Client
	  - Lo realmente poderoso de los Sockets es que el Server pueda enviar algo al/los Clients cuando algo sucede.
		- Se debe enviar Literal Objects de JS. Es lo mas comun.
		- El mismo evento q se dispara en el server es el que debe escuchar el cliente.

	- Retroalimentacion de emisiones del cliente hacia el servidor
	  - En el   socket.emit('envent', data, cb)   podemos enviar como 3er argumento un Callback. Este lo recibiriamos en el server para ejecutarlo.
		  - Ejemplo: Solo el cliente q envia algo puede recibirlo. El otro(s) cliente no.
		- Esto No es algo que se use muy amenudo, but esta bien q se sepa.

	- Broadcast - Ordenar nuestro codigo
	  - Debemos refactorizar el codigo xq a medida que crece el proyecto necesitamos trabajar con mas eventos.
		- El   this.io    se usa en casos muy concretos:
		  - En una Peticion REST   SI q necesitariamos el  this.io
		- Para emitir algo a todos los demas clientes menos al q lo envia:
		  		socket.broadcast.emit('send-message-from-server', payload);
		
	- Subir a Heroku
	  - Nuevo proyecto. No olvidar el script antes de subir:  "start": "node app.js"
 */
