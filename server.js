'use strict';

const Hapi = require('hapi');

// Crear un servidor con un host y port
const server = new Hapi.Server();
server.connection({ 
  host: 'localhost'
, port: 3000 
});

// Ruta raiz
server.route({
  method: 'GET'
, path:'/'
, handler: function (request, reply) {
    var obj = {
      name: 'CustomFood'
    , author: 'Miguel González Aravena'
    , email: 'contacto@miguelgonzaleza.com'
    , time: Math.round(new Date().getTime() / 1000)
    };

    reply(obj);
  }
});

// Iniciar el servidor
server.start((err) => {
  if(err) {
    throw err;
  }
  console.log('Servidor iniciado en :', server.info.uri);
});