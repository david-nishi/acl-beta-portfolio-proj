'use strict';


var projects = [];
function Project(name, dateStart, dateEnd, context, technologies) {
  this.name = name;      // string
  this.dateStart = dateStart;     // string 'mm-dd-yyyy'
  this.dateEnd = dateEnd;     
  this.context = context;     // string
  this.technologies = technologies;   // array of strings

  projects.push(this);
}