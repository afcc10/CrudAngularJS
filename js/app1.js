angular.module('tarjetaCredito', [])
.controller('tarjetasCreditoController', function($scope, $http){
    $scope.estadoForm = "Nuevo";    
    $scope.data = {
        endpoints:{
            tarjetasCredito: "https://localhost:44323/api/TarjetaCredito",
            cliente: "https://localhost:44323/api/Clientes"
        },
        tarjetasCredito: [],
        clientes:[]
    };

    $scope.tarjetaCredito={
        id:'',
        titular:'',
        numeroTarjeta:'',
        fechaExpiracion:'',
        cvv:'',
        fecha: '',
        clienteCedula: ''
    }

    $scope.mensajes = {
        exitoso: '',
        error: '',
        validacion:''
    }

    //Mensajes exitosos
    $scope.exitoso = function (mensaje) {
        $scope.mensajes.exitoso = mensaje;
        $('#modalMensajes').modal('open');
        return;
    }

    //Mensajes de Validacion
    $scope.validacionMensaje = function (mensaje) {
        $scope.mensajes.validacion = mensaje;
        $('#modalValidaciones').modal('open');
        return;
    }

    //Mensajes de error
    $scope.mostrarError = function (mensaje) {
        $scope.mensajes.error = mensaje;
        $('#modalErrores').modal('open');
        return;
    }

    //Obtener las tarjetas
    $scope.getTarjetas = function () {
        $http.get($scope.data.endpoints.tarjetasCredito)
            .then(function (data, status, headers, config) {
                $scope.data.tarjetasCredito = data.data;
            }, function (data, status, headers, config) {
                $scope.mostrarError("Error al obtener las tarjetas");
            });
    };

    //Obtener los clientes
    $scope.getClientes = function () {
        $http.get($scope.data.endpoints.cliente)
            .then(function (data, status, headers, config) {
                $scope.data.clientes = data.data;
            }, function (data, status, headers, config) {
                $scope.mostrarError("Error al obtener los clientes");
            });
    };

   

     //Metodo de Post y Put
     $scope.GuardarTarjeta = function () {       
          
        if ($scope.estadoForm == "Nuevo") {
            $scope.crearTarjeta();
        } else {
            $scope.editarTarjeta();
        }
    }

    $scope.editar = function (id) {        
        $scope.estadoForm = "Actualizar";
        $scope.tarjetaCredito = angular.copy($scope.obtenerTarjeta(id));
    }

    $scope.obtenerTarjeta = function (id) {        
        for (i in $scope.data.tarjetasCredito) {
            if ($scope.data.tarjetasCredito[i].id == id) {
                return $scope.data.tarjetasCredito[i];
            }
        }
    }

     //GuardarTarjetaNueva
     $scope.crearTarjeta = function () {
        if ($scope.validarFormulario()){
            var tblTarjetas = {
                id: 0,
                Titular: $scope.tarjetaCredito.titular,
                NumeroTarjeta: $scope.tarjetaCredito.numeroTarjeta,
                FechaExpiracion: $scope.tarjetaCredito.fechaExpiracion,
                CVV: $scope.tarjetaCredito.cvv,
                Fecha: $scope.tarjetaCredito.fecha,
            }
            $http.post(
                $scope.data.endpoints.tarjetasCredito,
                JSON.stringify(tblTarjetas)
            ).then(function (data, status, headers, config) {
                $scope.exitoso("Se ha creado la tarjeta");
                console.log("Prueba");
                $scope.getTarjetas();
                $scope.estadoForm = "Nuevo";
                $scope.limpiarFormulario();
            }, function (data, status, headers, config) {
                $scope.mostrarError("Error al guardar la tarjeta");
            });
        }
        
    }

    //Actualizar tarjeta
    $scope.editarTarjeta = function () {        
        var tblTarjetas = {
            id: $scope.tarjetaCredito.id,
            Titular: $scope.tarjetaCredito.titular,
            NumeroTarjeta: $scope.tarjetaCredito.numeroTarjeta,
            FechaExpiracion: $scope.tarjetaCredito.fechaExpiracion,
            CVV: $scope.tarjetaCredito.cvv,
            Fecha: $scope.tarjetaCredito.fecha,
        };

        $http.put(
            $scope.data.endpoints.tarjetasCredito + '/' + $scope.tarjetaCredito.id,
            JSON.stringify(tblTarjetas)
        ).then(function (data, status, headers, config) {
            $scope.exitoso("Se ha actualizado la tarjeta");
            $scope.getTarjetas();
            $scope.estadoForm = "Nuevo";
        }, function (data, status, headers, config) {
            $scope.mostrarError("Error al guardar la tarjeta");
        });
    }

    //eliminar tarjeta
    $scope.eliminarTarjeta = function (id) {
        
        var dataSend = {
            id: id
        };

        $http.delete(
            $scope.data.endpoints.tarjetasCredito + '/' + id,
            JSON.stringify(dataSend)
        ).then(function (data, status, headers, config) {
            $scope.exitoso("Se ha eliminado la tarjeta");
            $scope.getTarjetas();
            $scope.estadoForm = "Nuevo";
        }, function (data, status, headers, config) {
            $scope.mostrarError("Error al eliminar la tarjeta");
        });
    }

    $scope.validarFormulario = function(){
        
        if ($scope.estadoForm != "Nuevo"){
            if ($scope.tarjetaCredito.id.length==0){
                $scope.validacionMensaje("Debe escoger una tarjeta para editar");
                return false;
        }
        
        }
        if ($scope.tarjetaCredito.titular==''){
            $scope.validacionMensaje("Debe digitar el nombre del titular");
            return false;
        }
        if ($scope.tarjetaCredito.numeroTarjeta.length==0){
            $scope.validacionMensaje("Debe digitar un numero de tarjeta");
            return false;
        }

        if ($scope.tarjetaCredito.numeroTarjeta.length > 16 || $scope.tarjetaCredito.numeroTarjeta.length < 16){
            $scope.validacionMensaje("Debe digitar un numero de tarjeta de 16 caracteres");
            return false;
        }

        if ($scope.tarjetaCredito.fechaExpiracion.length==0){
            $scope.validacionMensaje("Debe digitar fecha de expiracion");
            return false;
        }
        if ($scope.tarjetaCredito.cvv.length==0){
            $scope.validacionMensaje("Debe digitar cvv");
            return false;
        }        
        return true;
    }

    $scope.limpiarFormulario = function(){
        $scope.tarjetaCredito = {            
            id: '',
            Titular : '', 
            
            NumeroTarjeta: '',
            FechaExpiracion: '',
            fecha: '',
            CVV: ''
        }

        $scope.estadoForm = "Nuevo";        
    }

    //llamdo inicial
    $scope.getTarjetas();
    $scope.getClientes();
})