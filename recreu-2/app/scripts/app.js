(function(){

    angular.module('angularSpa', [
    'ngRoute', 'ui.bootstrap', 'uiGmapgoogle-maps', 'infinite-scroll', 'ngCookies'
    ])
     
    .run(function($rootScope, $location, $cookieStore) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
          if ($cookieStore.get('logueado') == false || $cookieStore.get('logueado') == null) {
            //incluir dentro del if todas las vistas prohibidas para los invitados
            if( next.templateUrl == 'views/exploracion.html' || 
                next.templateUrl == 'views/mis_actividades.html' || 
                next.templateUrl == 'views/mis_notificaciones.html' || 
                next.templateUrl == 'views/nueva_actividad.html' ||
                next.templateUrl == 'views/verActividad.html' ) { 
              $location.path('');
             //$scope.go("/'log_in'");
            }
          }
          else {

            if(next.templateUrl == 'views/log_in.html' || next.templateUrl == 'views/sign_up.html' || next.templateUrl == 'views/main.html'  ) {              
              $location.path('explora');
              }
 
            }        

              //restricciones de pagina de administrador
              if($cookieStore.get('esAdministrador')==false )
              {

                    console.log('oe ya po ctmare');

                    //incluir en este if las paginas que solo puede ver el administrador
                   if(next.templateUrl == 'views/reportes.html')
                   {
                        $location.path('explora');
                   }

            }
          
        })
      })

    .config(function($routeProvider){

        $routeProvider

        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'mainController'
          })
        .when('/log_in',{
            templateUrl: 'views/log_in.html',
            controller: 'logInController'
          })
        .when('/sign_up',{
            templateUrl: 'views/sign_up.html',
            controller: 'signUpController'
          })
        .when('/explora',{
            templateUrl: 'views/actividad/exploracion.html',
            controller: 'exploracionController'
        })
        .when('/explora/categoria=:nombreCategoria',{
            templateUrl: 'views/actividad/exploracion.html',
            controller: 'exploracionController'
        })
        .when('/configuraciones',{
            templateUrl: 'views/configuraciones.html',
            controller: 'configuracionesController'
        })
        .when('/explora/mis_actividades',{
            templateUrl: 'views/actividad/mis_actividades.html',
            controller: 'misActividadesController'
        })
        .when('/explora/mis_notificaciones',{
            templateUrl: 'views/actividad/mis_notificaciones.html',
            controller: 'misNotificacionesController'
        })
        
        .when('/actividad/crear',{
            templateUrl: 'views/actividad/nueva_actividad.html',
            controller: 'nuevaActividadController'
        })
        .when('/actividad/id=:actividadId',{
            templateUrl: 'views/actividad/verActividad.html',
            controller: 'verActividadController'
        })
        .when('/reportes',{
            templateUrl: 'views/reportes.html',
            controller: 'reportesCtrl' ,
        })
        .when('/verPerfil/perfil=:perfilId',{
            templateUrl: 'views/verPerfil.html',
            controller: 'verPerfilCtrl'
        })



    })


})();
