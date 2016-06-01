var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {
    title: 'Custom Food'
  });
});

/* Registro de usuarios */
router.get('/registro', function(req, res, next) {
  res.render('registro', {
    title: 'Registro de usuario'
  });
});

/* Acceso de usuarios */
router.get('/acceso', function(req, res, next) {
  res.render('acceso', {
    title: 'Acceso de usuario '
  });
});

/* Recetas */
router.get('/recetas', function(req, res, next) {
  res.render('recetas', {
    title: 'Recetas'
  });
});

/* Login de usuarios. */
router.get('/moderar', function(req, res, next) {
  res.render('admin/acceso', {
    title: 'Panel de administración'
  , layout: false
  });
});

module.exports = router;
