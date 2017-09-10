'use strict';

var app = app || {};

(function(module) {

  function Project(rawData) {
    this.all = [];
    this.name = rawData.name;      // string
    this.dateStart = rawData.dates[0];     // string 'mm-dd-yyyy'
    this.dateEnd = rawData.dates[1];     
    this.context = rawData.context;     // string
    this.technologies = rawData.technologies;   // array of strings
    this.url = rawData.url;
    this.image = rawData.image;

    this.all.push(this);
  }

  Project.prototype.toHTML = function() {
    var template = $('#projectTemplate').html();
    var templateFiller = Handlebars.compile(template);
    $('main').append(templateFiller(this));
  }

  Project.fetchData = function() {
    $.getJSON('./data/projectData.json')
      .done(rawData => {
        rawData.projectData.forEach((projectData) => new Project(projectData));
      })
      .fail( () => console.log('failed to get .json data'))
  }

  module.Project = Project;

})(app);
