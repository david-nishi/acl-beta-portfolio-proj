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
  }

  Project.all = [];

  Project.prototype.toHTML = function() {
    var template = $('#projectTemplate').html();
    var templateFiller = Handlebars.compile(template);
    $('main').append(templateFiller(this));
  }

  Project.fetchData = function(callback) {
    $.getJSON('./data/projectData.json')
      .done(rawData => {
        Project.all = rawData.projectData.map(projectData => new Project(projectData));
        if(callback) callback();
      })
      .fail( () => console.log('failed to get .json data'))
  }

  module.Project = Project;

})(app);
