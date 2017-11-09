var sportsModule = angular.module("sportsStore",["customFilters","cart","ngRoute"]);
sportsModule.config(function ($routeProvider)
  {
    $routeProvider.when("/checkout",{templateUrl:"/views/checkoutSummary.html"});
    $routeProvider.when("/products",{templateUrl:"/views/productsList.html"});
    $routeProvider.when("/placeorder",{templateUrl:"/views/placeOrder.html"});
    $routeProvider.when("/complete",{templateUrl:"/views/thankYou.html"});
    $routeProvider.otherwise({templateUrl:"/views/productsList.html"});
  }
)
.constant("dataUrl","http://localhost:2503/products")
.constant("orderUrl","http://localhost:2503/orders")
.controller("sportsStoreCtrl",function ($scope,$http,$location,dataUrl,orderUrl,cart){

  $scope.data = {};
  $scope.data.products = [];
  $http.get(dataUrl).success(function (res)
  {
    $scope.data.products = res;
  }).error(function (err){
    $scope.data.error = err;
  });
  $scope.sendOrder = function (shippingDetails)
  {
      var order = angular.copy(shippingDetails);
      order.products = cart.getProducts();
      $http.post(orderUrl,order)
      .success(function (data) {
        $scope.data.orderId  = data.id;
        cart.reset();
        $location.url("/complete");
      }).error(function (error) {
          $scope.data.orderError  = error;
      }).finally(function () {

        alert($location.path("/complete") );
      });
  };
  /*  $scope.data = {
      products:[
        {
          name:"product 1",
          description:"description 1",
          category:"category 1",
          price:100
        },
        {
          name:"product 2",
          description:"description 2",
          category:"category 2",
          price:100
        },
        {
          name:"product 3",
          description:"description 3",
          category:"category 3",
          price:100
        },
        {
          name:"product 4",
          description:"description 4",
          category:"category 4",
          price:100
        }
      ]
    } */
})
