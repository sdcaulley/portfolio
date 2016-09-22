var projectView = {};

projectView.handleMainNav = function () {
  $('.main-nav .tab').on('click', function() {
    var tabValue = $(this).attr('data-content');
    $('.tab-content').hide();
    $('#' + tabValue).fadeIn('slow');

  });

  $('.main-nav .tab:first').click();
};

//Call all the methods
projectView.handleMainNav();
