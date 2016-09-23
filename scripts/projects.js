var projects = [];

function Projects (object) {
  this.title = object.title;
  this.projectUrl = object.projectUrl;
  this.projectImage = object.projectImage;
  this.projectCompleted = object.projectCompleted;
  this.projectDescription = object.projectDescription;
  this.skillShowcased = object.skillShowcased;
}

Projects.prototype.toHtml = function() {
  this.daysAgo = parseInt((new Date() - new Date(this.projectCompleted))/60/60/24/1000);
  this.publishStatus = 'published ' + this.daysAgo + ' days ago';
  $.each(this.skillShowcased, function(index, value){
    var skills = '<li data-category="' + value + '">' + value + '</li>';
    $('article ul').append(skills);
  });
  var source = $('#template').html();
  var template = Handlebars.compile(source);
  var html = template(this);

  return html;

};

codingProjects.sort(function(curElem, nextElem) {
  return (new Date(nextElem.projectCompleted)) - (new Date(curElem.projectCompleted));
});

codingProjects.forEach(function(ele) {
  projects.push(new Projects(ele));
});

projects.forEach(function(a) {
  $('#projects').append(a.toHtml());
});
