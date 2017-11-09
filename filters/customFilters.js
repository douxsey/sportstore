angular.module("customFilters",[])
.filter("unique",function ()
{
  return function (data,propertyName)
  {
    var result = [];
    var keys = [];
    for(i = 0 ; i < data.length; i++)
    {
      var val = data[i][propertyName];
      if(angular.isUndefined(keys[val]))
      {
        keys[val] = true;
        result.push(val);
      }
    }
    return result;
  };
})
.filter("range",function()
{
  return function (data,choosenPage,sizePerPage)
  {
      var start_index = (choosenPage - 1) * sizePerPage;
      if( angular.isArray(data) && angular.isNumber(choosenPage) && angular.isNumber(sizePerPage) )
      {
          if(data.length < start_index)
              return [];
          return data.splice(start_index,(start_index+1)*sizePerPage);
      }
      return data;

  };
})
.filter("pageCount",function ()
{
    return function (data,sizePerPage)
    {
        var nbrOfPage = Math.ceil(data.length / sizePerPage);
        var result = [];
        if( angular.isArray(data) )
        {
          for (var i = 0 ; i < nbrOfPage ; i++)
          {
              result.push(i);
          }
          return result;
        }
        return data;

    };
});
