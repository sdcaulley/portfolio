(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];

  reposObj.requestRepos = function(callback) {
    $.ajax({
      url: '/github/users/sdcaulley/repos',
      success: function(data) {
        reposObj.allRepos = data;
        callback();
      }
    });
  };

  reposObj.withTheAttribute = function(myAttr) {
    var dateArray = [];
    var dateConvert = function(string) {
      var mm = string.substr(5,2);
      var dd = string.substr(8,2);
      var yy = string.substr(0,4);
      string = mm + '/' + dd + '/' + yy; //2016-09-14
      return string;
    };

    reposObj.allRepos.forEach(function(obj) {
      obj.created_at = dateConvert(obj.created_at);
      obj.pushed_at = dateConvert(obj.pushed_at);
      dateArray.push(obj);
    });

    return dateArray.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  module.reposObj = reposObj;
})(window);
