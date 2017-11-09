angular.module("sportsStoreAdmin",["ngRoute","ngResource"])
.config(function ($routeProvider)
{
  $routeProvider.when("/login",{
    templateUrl:"/views/adminLogin.html"
  });
  $routeProvider.when("/main",{
    templateUrl:"/views/adminMain.html"
  });
  $routeProvider.otherwise({
    redirectTo:"/login"
  });
})
.constant("authUrl","http://localhost:2503/users/login")
.constant("ordersUrl","http://localhost:2503/orders")
.controller("authCtrl",function ($scope,$http,$location,authUrl) {
  $scope.authenticate = function (username,pass)
  {

      $http.post(authUrl,{
        username:username,
        password : pass
      },{
        withCredentials:true
      }).success(function(data)
    {
      $location.path("/main");
    }).error(function(error)
  {
    $scope.authenticationError = error;
  });
  }
})
.controller("mainCtrl",function($scope)
{
    $scope.screens = [{name:"products",templateUrl:"/views/adminProducts.html"},
                      {name:"orders",templateUrl:"/views/adminOrders.html"}];

    $scope.selectedScreen = $scope.screens[0];

    $scope.setScreen = function (pos)
    {
      $scope.selectedScreen = (pos < $scope.screens.length)
                              ?$scope.screens[pos]:$scope.screens[0];
    }
    $scope.getScreen = function()
    {
        return $scope.selectedScreen.templateUrl;
    }

})
.controller("ordersCtrl",function ($scope,$http,ordersUrl) {
  $scope.ordersData = [];
  $http.get(ordersUrl,{withCredentials:true})
        .success(function (data) {
          $scope.ordersData = data;
        })
        .error(function (error) {
          $scope.ordersError = error;
        });
  $scope.selectedOrder = null;
  $scope.selectOrder = function (order)
  {
      $scope.selectedOrder = order;
  };
  $scope.calcTotal = function (order) {
    var tot = 0;
      for (var i = 0; i < order.products.length; i++) {
         tot += order.products[i].count * order.products[i].price;
      }
    return tot;
  }
});
