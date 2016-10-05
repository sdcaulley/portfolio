(function(module) {
  var repoView = {};

  var source = $('#repo-template').text();
  var repoCompiler = Handlebars.compile(source);

  repoView.renderRepos = function() {
    $('#about ul').empty().append(
      reposObj.withTheAttribute('name').map(repoCompiler)
    );
  };
  reposObj.requestRepos(repoView.renderRepos);

  module.repoView = repoView;
})(window);
