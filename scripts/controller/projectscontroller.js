(function(module) {
  var projectsController = {};

  projectsController.reveal = function() {
    $('.tab-content').hide();
    $('#home').fadeIn();
  };

  module.projectsController = projectsController;
})(window);
