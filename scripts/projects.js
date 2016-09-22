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
  var skills = 'Technologies: ';
  var $newProject = $('article.project-template').clone();
  $newProject.find('a').attr('href', this.projectUrl);
  $newProject.find('img').attr('src', this.projectImage);
  $newProject.find('h3').html(this.title);
  $.each(this.skillShowcased, function(index, value){
    skills += value + ' ';
  });
  $newProject.find('dl').html(skills);
  $newProject.find('time[pubdate]').attr('title', this.projectCompleted);
  $newProject.find('time').html('Completed about ' + parseInt((new Date() - new Date(this.projectCompleted))/60/60/24/1000) + ' days ago');
  $newProject.find('section.project-description').html(this.projectDescription);
  $newProject.removeClass('project-template');
  $newProject.attr('class', 'desktop-view');
  return $newProject;
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
