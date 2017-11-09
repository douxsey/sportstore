angular.module("cart",[])
.factory("cart",function()
{
  var cartData = [];
  return {
      addProduct:function (id,name,price)
      {
        var alreadyAdded = false;
        for (var i = 0; i < cartData.length && !alreadyAdded; i++) {
          if(cartData[i].id == id)
          {
              cartData[i].count++;
              alreadyAdded = true;
          }
        }
        if(!alreadyAdded)
        {
            cartData.push({id:id,name:name,price:price,count:1});
        }
      },
      removeProduct:function (id)
      {
          var founded = false;
          for (var i = 0; i < cartData.length && !founded; i++)
          {
            if ( cartData[i].id == id )
            {
              cartData.splice(i,1);
              founded = true;
            }

          }
      },
      getProducts : function ()
      {
        return cartData;
      },
      reset : function ()
      {
        cartData.length = 0;
      }
    };
})
.directive("cartSummary",function (cart)
  {
      return {
          restrict:"E",
          templateUrl: "components/cart/cartSummary.html",
          controller : function ($scope)
          {
            var cartData = cart.getProducts();
            $scope.itemCount = function ()
            {
                var count = 0;

                for (var i = 0; i < cartData.length; i++) {
                  count += cartData[i].count;
                }
                return count;
            };
            $scope.total = function ()
            {
                var total = 0;

                for (var i = 0; i < cartData.length; i++) {
                  total += cartData[i].price * cartData[i].count;
                }
                return total;
            }
          }
      };
  }
)
