var myApp = angular
  .module('myApp', ['ngRoute', 'ui.bootstrap', 'angularTrix', 'ngBootbox', 'datatables']);

/* Configurar rutas */
myApp.config(function($routeProvider) {
  $routeProvider
  // Home
    .when('/', {
      templateUrl: '/pages/home.html',
      controller: 'MainCtrl'
    })
    // Agregar recetas
    .when('/recetas/agregar', {
      templateUrl: '/pages/agregar-recetas.html',
      controller: 'AgregarRecetasCtrl'
    })
    //Recetas
    .when('/recetas', {
      templateUrl: '/pages/recetas.html',
      controller: 'RecetasCtrl'
    })
    //Receta
    .when('/receta/:id', {
      templateUrl: '/pages/receta.html',
      controller: 'RecetaCtrl'
    })
    // Perfil de usuario
    .when('/usuario/:id', {
      templateUrl: '/pages/perfil.html',
      controller: 'PerfilCtrl'
    })
    // Acceder
    .when('/acceso', {
      templateUrl: '/pages/acceso.html',
      controller: 'AccesoCtrl'
    })
    // Acceder
    .when('/registro', {
      templateUrl: '/pages/registro.html',
      controller: 'RegistroCtrl'
    })
    // Home Admin
    .when('/panel', {
      templateUrl: '/pages/admin/home.html',
      controller: 'AdminIndexCtrl'
    })
    // Admin usuarios
    .when('/panel/moderadores', {
      templateUrl: '/pages/admin/moderadores.html',
      controller: 'AModeradoresCtrl'
    })
    // Admin usuarios
    .when('/panel/usuarios', {
      templateUrl: '/pages/admin/usuarios.html',
      controller: 'AUsuariosCtrl'
    })
    // Admin recetas
    .when('/panel/recetas', {
      templateUrl: '/pages/admin/recetas.html',
      controller: 'ARecetasCtrl'
    })
    // Admin comentarios
    .when('/panel/comentarios', {
      templateUrl: '/pages/admin/comentarios.html',
      controller: 'AComentariosCtrl'
    })

  ;
});

myApp
  .controller('MainCtrl', ['$scope', function($scope) {

  }])
  .controller('AgregarRecetasCtrl', ['$scope', function($scope) {

  }])
  .controller('RecetasCtrl', ['$scope', function($scope) {

  }])
  .controller('RecetaCtrl', ['$scope', function($scope) {

  }])
  .controller('AccesoCtrl', ['$scope', function($scope) {

  }])
  .controller('RegistroCtrl', ['$scope', function($scope) {

  }])
  .controller('PerfilCtrl', ['$scope', function($scope) {

  }])
  .controller('AdminIndexCtrl', ['$scope', '$location', function($scope, $location) {
    //$location.url('/administrador/index');
    //console.log($location);
  }])
  .controller('AComentariosCtrl', ['$scope', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder', function($scope, $compile, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.message = '';
    vm.edit = edit;
    vm.delete = deleteRow;
    vm.dtInstance = {};
    vm.persons = {};
    vm.dtOptions = DTOptionsBuilder.fromSource('/admin/data/comentarios')
      .withPaginationType('full_numbers')
      .withOption('createdRow', createdRow);
    vm.dtColumns = [
      DTColumnBuilder.newColumn('id').withTitle('ID'),
      DTColumnBuilder.newColumn('comentario').withTitle('Comentario'),
      DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable()
      .renderWith(actionsHtml)
    ];

    function edit(person) {
      vm.message = 'You are trying to edit the row: ' + JSON.stringify(person);
      // Edit some data and call server to make changes...
      // Then reload the data so that DT is refreshed
      vm.dtInstance.reloadData();
    }

    function deleteRow(person) {
      vm.message = 'You are trying to remove the row: ' + JSON.stringify(person);
      // Delete some data and call server to make changes...
      // Then reload the data so that DT is refreshed
      vm.dtInstance.reloadData();
    }

    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }

    function actionsHtml(data, type, full, meta) {
      vm.persons[data.id] = data;
      return '<button class="btn btn-warning" ng-click="showCase.edit(showCase.persons[' + data.id + '])">' +
        '   <i class="glyphicon glyphicon-edit"></i>' +
        '</button>&nbsp;' +
        '<button class="btn btn-danger" ng-bootbox-confirm="¿Estás seguro que deseas eliminar este elemento?" ng-bootbox-confirm-action="showCase.delete(showCase.persons[' + data.id + '])" )"="" ng-bootbox-confirm-action-cancel="confirmCallbackCancel(attr1, attr2)">' +
        '   <i class="glyphicon glyphicon-trash"></i>' +
        '</button>';
    }
  }])
  .controller('ARecetasCtrl', ['$scope', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder', function($scope, $compile, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.message = '';
    vm.edit = edit;
    vm.delete = deleteRow;
    vm.dtInstance = {};
    vm.persons = {};
    vm.dtOptions = DTOptionsBuilder.fromSource('/admin/data/recetas')
      .withPaginationType('full_numbers')
      .withOption('createdRow', createdRow);
    vm.dtColumns = [
      DTColumnBuilder.newColumn('id').withTitle('ID'),
      DTColumnBuilder.newColumn('titulo').withTitle('Título'),
      DTColumnBuilder.newColumn('ingredientes').withTitle('Ingredientes'),
      DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable()
      .renderWith(actionsHtml)
    ];

    function edit(person) {
      vm.message = 'You are trying to edit the row: ' + JSON.stringify(person);
      // Edit some data and call server to make changes...
      // Then reload the data so that DT is refreshed
      vm.dtInstance.reloadData();
    }

    function deleteRow(person) {
      vm.message = 'You are trying to remove the row: ' + JSON.stringify(person);
      // Delete some data and call server to make changes...
      // Then reload the data so that DT is refreshed
      vm.dtInstance.reloadData();
    }

    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }

    function actionsHtml(data, type, full, meta) {
      vm.persons[data.id] = data;
      return '<button class="btn btn-warning" >' +
        '   <i class="glyphicon glyphicon-edit"></i>' +
        '</button>&nbsp;' +
        '<button class="btn btn-success"><i class="glyphicon glyphicon-cutlery"></i></button>&nbsp;' +
        '<div class="btn-group"><button class="btn btn-success"><i class="glyphicon glyphicon-ok"></i></button>&nbsp;<button class="btn btn-danger" ng-bootbox-confirm="¿Estás seguro que deseas eliminar este elemento?" ng-bootbox-confirm-action="showCase.delete(showCase.persons[' + data.id + '])" )"="" ng-bootbox-confirm-action-cancel="confirmCallbackCancel(attr1, attr2)"><i class="glyphicon glyphicon-remove"></i></button></div>'
        ;
    }
  }])
  .controller('AUsuariosCtrl', ['$scope', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder', function($scope, $compile, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.message = '';
    vm.edit = edit;
    vm.delete = deleteRow;
    vm.dtInstance = {};
    vm.persons = {};
    vm.dtOptions = DTOptionsBuilder.fromSource('/admin/data/usuarios')
      .withPaginationType('full_numbers')
      .withOption('createdRow', createdRow);
    vm.dtColumns = [
      DTColumnBuilder.newColumn('id').withTitle('ID'),
      DTColumnBuilder.newColumn('correo').withTitle('Correo'),
      DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable()
      .renderWith(actionsHtml)
    ];

    function edit(person) {
      vm.message = 'You are trying to edit the row: ' + JSON.stringify(person);
      // Edit some data and call server to make changes...
      // Then reload the data so that DT is refreshed
      vm.dtInstance.reloadData();
    }

    function deleteRow(person) {
      vm.message = 'You are trying to remove the row: ' + JSON.stringify(person);
      // Delete some data and call server to make changes...
      // Then reload the data so that DT is refreshed
      vm.dtInstance.reloadData();
    }

    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }

    function actionsHtml(data, type, full, meta) {
      vm.persons[data.id] = data;
      return '<button class="btn btn-warning" ng-click="showCase.edit(showCase.persons[' + data.id + '])">' +
        '   <i class="glyphicon glyphicon-edit"></i>' +
        '</button>&nbsp;' +
        '<button class="btn btn-danger" ng-bootbox-confirm="¿Estás seguro que deseas eliminar este elemento?" ng-bootbox-confirm-action="showCase.delete(showCase.persons[' + data.id + '])" )"="" ng-bootbox-confirm-action-cancel="confirmCallbackCancel(attr1, attr2)">' +
        '   <i class="glyphicon glyphicon-trash"></i>' +
        '</button>';
    }
  }])
  .controller('AModeradoresCtrl', ['$scope', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder', function($scope, $compile, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.message = '';
    vm.edit = edit;
    vm.delete = deleteRow;
    vm.dtInstance = {};
    vm.persons = {};
    vm.dtOptions = DTOptionsBuilder.fromSource('/admin/data/moderadores')
      .withPaginationType('full_numbers')
      .withOption('createdRow', createdRow);
    vm.dtColumns = [
      DTColumnBuilder.newColumn('id').withTitle('ID'),
      DTColumnBuilder.newColumn('correo').withTitle('Correo'),
      DTColumnBuilder.newColumn(null).withTitle('Acciones').notSortable()
      .renderWith(actionsHtml)
    ];

    function edit(person) {
      vm.message = 'You are trying to edit the row: ' + JSON.stringify(person);
      // Edit some data and call server to make changes...
      // Then reload the data so that DT is refreshed
      vm.dtInstance.reloadData();
    }

    function deleteRow(person) {
      vm.message = 'You are trying to remove the row: ' + JSON.stringify(person);
      // Delete some data and call server to make changes...
      // Then reload the data so that DT is refreshed
      vm.dtInstance.reloadData();
    }

    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }

    function actionsHtml(data, type, full, meta) {
      vm.persons[data.id] = data;
      return '<button class="btn btn-warning" ng-click="showCase.edit(showCase.persons[' + data.id + '])">' +
        '   <i class="glyphicon glyphicon-edit"></i>' +
        '</button>&nbsp;' +
        '<button class="btn btn-danger" ng-bootbox-confirm="¿Estás seguro que deseas eliminar este elemento?" ng-bootbox-confirm-action="showCase.delete(showCase.persons[' + data.id + '])" )"="" ng-bootbox-confirm-action-cancel="confirmCallbackCancel(attr1, attr2)">' +
        '   <i class="glyphicon glyphicon-trash"></i>' +
        '</button>';
    }
  }])
  .controller('PuntuarCtrl', ['$scope', function($scope) {
    $scope.rate = 0;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [{
      stateOn: 'glyphicon-ok-sign',
      stateOff: 'glyphicon-ok-circle'
    }, {
      stateOn: 'glyphicon-star',
      stateOff: 'glyphicon-star-empty'
    }, {
      stateOn: 'glyphicon-heart',
      stateOff: 'glyphicon-ban-circle'
    }, {
      stateOn: 'glyphicon-heart'
    }, {
      stateOff: 'glyphicon-off'
    }];
  }])
  .controller('NavBarCtrl', ['$scope', function($scope) {
    $scope.isCollapsed = true;
  }])
  .controller('BusquedaCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    var _selected;
    var ingredientes = [];

    $scope.selected = undefined;
    $scope.ingredientes = [];
    $scope.listaIngredientes = ['Aceite', 'Arroz', 'Azucar', 'Fideos', 'Lechuga', 'Pollo', 'Sal', 'Tomate', 'Zanahoria'];

    $scope.agregarIngrediente = function() {
        $scope.ingredientes.push($scope.selected);
        console.log($scope.ingredientes);
        $scope.show = true;
        $scope.selected = '';
      }
      // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
      return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(response) {
        return response.data.results.map(function(item) {
          return item.formatted_address;
        });
      });
    };

    $scope.buscar = function() {
      //$location.path('resultados');
    }

  }]);
