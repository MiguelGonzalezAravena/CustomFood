var express = require('express')
  , router = express.Router()
  , exphbs  = require('express-handlebars')
  , app = express()
;

/* Vista principal */
router.get('/', function(req, res, next) {
  res.render('admin/home', {
    title: 'Panel de administración'
  , layout: 'main_admin'
  });
});

/* data_mods */
router.get('/data/moderadores', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var mods = [];
  mods.push({id: 5, correo: 'miguel.gonzalez.93@gmail.com'});
  mods.push({id: 6, correo: 'contacto@miguelgonzaleza.com'});
  mods.push({id: 7, correo: 'miguel@yopmail.com'});
  res.send(JSON.stringify(mods));
});

/* data_usuarios */
router.get('/data/usuarios', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var usuarios = [];
  usuarios.push({id: 5, correo: 'miguel.gonzalez.93@gmail.com'});
  usuarios.push({id: 6, correo: 'contacto@miguelgonzaleza.com'});
  usuarios.push({id: 7, correo: 'miguel@yopmail.com'});
  res.send(JSON.stringify(usuarios));
});

/* data_recetas */
router.get('/data/recetas', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var recetas = [];
  recetas.push({id: 5, titulo: 'Receta 1', ingredientes: ['Arroz', 'Leche'], receta: 'Debe hacer el arroz, y luego colocar la leche.'});
  recetas.push({id: 6, titulo: 'Receta 2', ingredientes: ['Aceite', 'Fideos', 'Salsa'], receta: 'Debe primero colocar el aceite y luego con agua hervida coloca los fideos en una olla.'});
  recetas.push({id: 7, titulo: 'Receta 3', ingredientes: ['Arroz', 'Leche'], receta: 'Debe hacer el arroz, y luego colocar la leche.'});
  res.send(JSON.stringify(recetas));
});

/* data_comentarios */
router.get('/data/comentarios', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var comentarios = [];
  comentarios.push({id: 5, id_receta: 5, id_usuario: 5, comentario: 'Muy rica receta, me quedó excelente. Quedé como rey :)'});
  comentarios.push({id: 6, id_receta: 6, id_usuario: 5, comentario: 'Se me quemó el arroz, no dice el tiempo de cocción.'});
  comentarios.push({id: 7, id_receta: 7, id_usuario: 5, comentario: 'Muy rica receta, me quedó excelente. Quedé como rey :)'});
  res.send(JSON.stringify(comentarios));
});


module.exports = router;
