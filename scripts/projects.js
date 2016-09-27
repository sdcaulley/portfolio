function Projects (object) {
  for (keys in object) {
    this[keys] = object[keys];
  }
}

Projects.all = [];

Projects.prototype.toHtml = function() {
  this.daysAgo = parseInt((new Date() - new Date(this.projectCompleted))/60/60/24/1000);
  this.publishStatus = 'published ' + this.daysAgo + ' days ago';

  var source = $('#template').html();
  var template = Handlebars.compile(source);
  var html = template(this);

  return html;

};

Projects.loadAll = function(input) {
  input.sort(function(a,b) {
    return (new Date(b.projectCompleted)) - (new Date(a.projectCompleted));
  }).forEach(function(ele) {
    Projects.all.push(new Projects(ele));
  });
};

Projects.fetchAll = function() {
  var text = '';
  var eTag = '';
  if (localStorage.projectObjects) {
    $.ajax('/scripts/projectObjects.json').done(function(response, status, jqxhr){
      eTag = (jqxhr.getResponseHeader('ETag'));
      var storedEtag = localStorage.getItem('ETag');
      if (eTag === storedEtag) {
        text = localStorage.getItem('projectObjects');
        text = JSON.parse(text);
        Projects.loadAll(text);
        projectView.renderIndexPage();
      }
      else {
        $.getJSON('/scripts/projectObjects.json').done(function(data) {
          text = JSON.stringify(data);
          localStorage.setItem('projectObjects', text);
          text = JSON.parse(text);
          Projects.loadAll(text);
          projectView.renderIndexPage();
        });
      }
    });
  } else {
    $.ajax('/scripts/projectObjects.json').done(function(response, status, jqxhr){
      var eTag = (jqxhr.getResponseHeader('ETag'));
      console.log(eTag);
      localStorage.setItem('ETag', eTag);
    });
    $.getJSON('/scripts/projectObjects.json').done(function(data) {
      text = JSON.stringify(data);
      localStorage.setItem('projectObjects', text);
      text = JSON.parse(text);
      Projects.loadAll(text);
      projectView.renderIndexPage();
    });
  }
};
