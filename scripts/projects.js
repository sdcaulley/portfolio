//Object constructor
function Projects (object) {
  for (keys in object) {
    this[keys] = object[keys];
  }
}

Projects.prototype.toHtml = function() {
  this.daysAgo = parseInt((new Date() - new Date(this.projectCompleted))/60/60/24/1000);
  this.publishStatus = 'Published ' + this.daysAgo + ' days ago';

  var source = $('#template').html();
  var template = Handlebars.compile(source);
  var html = template(this);

  return html;

};

Projects.loadAll = function(input) {
  Projects.allProjects = input.sort(function(a,b) {
    return (new Date(b.projectCompleted)) - (new Date(a.projectCompleted));
  }).map(function(ele) {
    return new Projects(ele);
  });
};

Projects.fetchAll = function() {
  var $getETag = function() {
    $.getJSON('/scripts/projectObjects.json').done(function(response, status, jqxhr){
      var eTag = (jqxhr.getResponseHeader('ETag'));
      return eTag;
    });
  };
  var $setLocalStorage = function () {
    $.getJSON('/scripts/projectObjects.json').done(function(response, status, jqxhr){
      localStorage.eTag = jqxhr.getResponseHeader('ETag');
      localStorage.projectObjects = response;
      Projects.loadAll(response);
      projectView.renderIndexPage();
    });
  };
  if (localStorage.projectObjects) {
    if ($getETag() === localStorage.getItem('ETag')) {
      Projects.loadAll(JSON.parse(localStorage.getItem('projectObjects')));
      projectView.renderIndexPage();
    } else {
      $setLocalStorage();
    }
  } else {
    $setLocalStorage();
  }
};
