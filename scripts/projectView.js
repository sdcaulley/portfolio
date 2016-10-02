(function(module) {

  var projectView = {};
  //Dynamically populate selector with categories and number of projects per category
  projectView.populateFilters = function() {
    var concatArray = Projects.allProjects.reduce(function(acc, curr) {
      return acc.concat(curr.skillShowcased);
    },[]);
    var myout = concatArray.reduce(function(prev, next) {
      prev[next] = (prev[next] || 0) + 1;
      return prev;
    }, {});
    for (keys in myout) {
      this.keys = myout.keys;
      var optionTag = '<option value="' + keys + '">' + keys + ' ' + myout[keys] + '</option>';
      $('#category-filter').append(optionTag);
    };
  };
  //Display projects by category
  projectView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        var categoryValue = $(this).val();
        $('article').hide();
        $('article li').each(function () {
          var skillsTag = $(this).text();
          if (skillsTag === categoryValue) {
            $(this).parentsUntil('#projects').fadeIn('slow');
          }
        });
      } else {
        $('article:not(".template")').show();
      }
    });
  };
  //Main navigation has tabular function
  projectView.handleMainNav = function () {
    $('.main-nav li').on('click', function() {
      var tabValue = $(this).attr('data-content');
      $('.tab-content').hide();
      $('#' + tabValue).fadeIn('slow');
    });
    $('.main-nav li:first').click();
  };
  //Hide and expand text
  projectView.setTeasers = function() {
    $('.project-description *:nth-of-type(n+3)').hide();
    $('article').on('click', 'a.read-on', function(e) {
      e.preventDefault();
      if($(this).text() === 'More') {
        $(this).parent().find('*').fadeIn();
        $(this).html('Show Less');
      } else {
        $(this).html('More');
        $(this).parent().find('.project-description *:nth-of-type(n+3)').hide();
      }
    });
  };
  //Create the over all page view
  projectView.renderIndexPage = function() {
    Projects.allProjects.forEach(function(a) {
      $('#projects').append(a.toHtml());
    });
    projectView.handleMainNav();
    projectView.setTeasers();
    projectView.populateFilters();
    projectView.handleCategoryFilter();
  };
  //Set the page in motion
  Projects.fetchAll();
  module.projectView = projectView;
})(window);
