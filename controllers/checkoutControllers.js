
angular.module("sportsStore")
.controller("checkoutSummaryCtrl",function ($scope,cart) {

    $scope.cartData = cart.getProducts();
    $scope.total = function () {
      var tot  = 0;
    for (var i = 0; i < $scope.cartData.length; i++) {
      tot += $scope.cartData[i].price * $scope.cartData[i].count;
    }
    return tot;
    };
    $scope.removeProduct = function (id) {
      cart.removeProduct(id);
    };
});
