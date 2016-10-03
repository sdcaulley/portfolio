(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('.tab-content').hide();
    $('#about').fadeIn();
  };
  module.aboutController = aboutController;
})(window);
