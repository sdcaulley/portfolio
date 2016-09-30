  var projectView = {};
  var category = ['Wordpress', 'JavaScript', 'HTML', 'CSS', 'Themeing'];

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
      var optionTag = '<option value="' + keys + '">' + keys + '" "' + myout[keys] + '</option>';
      $('#category-filter').append(optionTag);
    };
  };

  projectView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        var categoryValue = $(this).val();
        $('article').hide();
        $('article li').each(function () {
          var skillsTag = $(this).text();
          if (skillsTag === categoryValue) {
            $(this).parent().parent().parent().parent().fadeIn('slow');
          }
        });
      } else {
        $('article:not(".template")').show();
      }
    });
  };

  projectView.handleMainNav = function () {
    $('.main-nav li').on('click', function() {
      var tabValue = $(this).attr('data-content');
      $('.tab-content').hide();
      $('#' + tabValue).fadeIn('slow');
    });

    $('.main-nav li:first').click();
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

  projectView.renderIndexPage = function() {
    Projects.allProjects.forEach(function(a) {
      $('#projects').append(a.toHtml());
    });
    projectView.handleMainNav();
    projectView.setTeasers();
    projectView.populateFilters();
    projectView.handleCategoryFilter();
  };

  //Call all the methods
  Projects.fetchAll();
