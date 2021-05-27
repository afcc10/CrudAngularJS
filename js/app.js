angular.module('tarjetaCredito', ['ngResource'])
.service('TarjetaCreditoService', function ($http) {
    var numTarjeta = 1;
     
    var tarjetasCredito = [];    
    
    this.obtenerTarjetas = function () {
            $http.get('https://localhost:44323/api/TarjetaCredito')
            .then(function(response) {
                return response.data;                
              });
            //.success(success)
            //.error(failure);        
        //return tarjetasCredito;
    }
     
    this.guardar = function (tarjetaCredito) {
        if (tarjetaCredito.id == null) {
            tarjetaCredito.id = numTarjeta++;
            tarjetasCredito.push(tarjetaCredito);
        } else {
            for (i in tarjetasCredito) {
                if (tarjetasCredito[i].id == tarjetaCredito.id) {
                    tarjetasCredito[i] = tarjetaCredito;
                }
            }
        }
    }
    
    this.borrar = function (id) {
        for (i in tarjetasCredito) {
            if (tarjetasCredito[i].id == id) {
                tarjetasCredito.splice(i, 1);
            }
        }
    }
 
    this.obtenerTarjeta = function (id) {
        for (i in tarjetasCredito) {
            if (tarjetasCredito[i].id == id) {
                return tarjetasCredito[i];
            }
        }
    }
})
//.factory('TarjetaCreditoFactory',function($http){


    //return $resource('https://localhost:44323/api/TarjetaCredito/:id');

//})


 
.controller('tarjetasCreditoController', function ($scope, TarjetaCreditoService,$http) {
 
    /*debugger
    var x = TarjetaCreditoService.obtenerTarjetas();
    console.log(x);*/

    $http.get('https://localhost:44323/api/TarjetaCredito')
        .then(function(response) {
           // debugger
         $scope.tarjetasCredito = response.data;                
      });
 
    $scope.guardarTarjetas = function () {
        TarjetaCreditoService.guardar($scope.nuevaTarjeta);
        $scope.nuevaTarjeta = {};
    }
 
    $scope.borrar = function (id) {
        TarjetaCreditoService.borrar(id);
        if ($scope.nuevaTarjeta-id == id){
            $scope.nuevaTarjeta = {};
        }
    }
 
    $scope.editar = function (id) {
        $scope.nuevaTarjeta = angular.copy(TarjetaCreditoService.obtenerTarjeta(id));

    }
})