var projectView = {};

projectView.handleMainNav = function () {
  $('.main-nav .tab').on('click', function() {
    var tabValue = $(this).attr('data-content');
    $('.tab-content').hide();
    $('#' + tabValue).fadeIn('slow');

  });

  $('.main-nav .tab:first').click();
};

projectView.setTeasers = function() {
  /* Hide any elements after the first 2 (<p> Tags in case)
  in any article body: */
  $('.project-description *:nth-of-type(n+3)').hide();

  descriptionExpand = function(e) {
    e.preventDefault();
    $(this).parent().find('.project-description *:nth-of-type(n+3)').show();
    $(this).html('Show Less').removeAttr('class').attr('class', 'show-less').on('click', descriptionCollapse);
  };

  descriptionCollapse = function(e) {
    e.preventDefault();
    $(this).parent().find('.project-description *:nth-of-type(n+3)').hide();
    $(this).html('More').removeAttr('class').attr('class', 'read-on').on('click', descriptionExpand);
  };

  $('.read-on').on('click', descriptionExpand);
};

//Call all the methods
projectView.handleMainNav();
projectView.setTeasers();
