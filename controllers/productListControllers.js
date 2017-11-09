angular.module("sportsStore").constant("productListActiveClass","btn-primary")
  .constant("productsListPageCount",3)
  .controller("productListCtrl",function ($scope,$filter,productListActiveClass,
                                          productsListPageCount,cart)
  {
    var selectedCategory = null;
    $scope.selectedPage = 1;
    $scope.pageSize = productsListPageCount;
    $scope.selectPage = function(choosenPage)
    {
        $scope.selectedPage = choosenPage;

    }
    $scope.getPageClass = function (page)
    {
        return $scope.selectedPage == page ? productListActiveClass:"";
    }

    $scope.selectCategory = function (choosenCategory)
    {
        selectedCategory = choosenCategory;
        $scope.selectedPage = 1;
    };
    $scope.categoryFilterFn = function (product)
    {
        return selectedCategory == null || product.category == selectedCategory;
    };
    $scope.getCategoryClass = function (category)
    {
        return selectedCategory == category ? productListActiveClass : "";
    };
    $scope.addProductToCart = function (product)
    {
        cart.addProduct(product.id,product.name,product.price);
    };
  });
