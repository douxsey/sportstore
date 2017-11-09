angular.module("sportsStoreAdmin")
.constant("productsUrl","http://localhost:2503/products/")
.config(function ($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
})
.controller("productsCtrl",function ($scope,$resource,productsUrl) {
  $scope.productsResource = $resource(productsUrl+":id",{id:"@id"});

  $scope.listOfProducts = function ()
    {
        $scope.products = $scope.productsResource.query();
    }
  $scope.deleteProduct = function (product) {
      product.$delete().then(function () {
          $scope.products.splice($scope.products.indexOf(),1);
      });
  }
  $scope.addProduct = function (product) {
      new $scope.productsResource(product).$save().then(function (newProduct) {
          $scope.products.push(newProduct);
          $scope.editedProduct = null;
      })
  }
  $scope.updateProduct = function (product) {
      product.$save();
      $scope.editedProduct = null;
  }

  $scope.startEdit = function (product) {
      $scope.editedProduct = product;
  }

  $scope.cancelEdit = function () {
      $scope.editedProduct = null;
  }
  $scope.listOfProducts();
});
