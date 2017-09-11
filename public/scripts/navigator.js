'use strict';

var app = app || {};

(function(module) {

  function Nav(pageDataObj) {
    Object.keys(pageDataObj).forEach(key => this[key] = pageDataObj[key]);
  }

  Nav.currentPage = 'Home';

  Nav.all = [];

  Nav.fetchAll = function(callback) {
    $.getJSON('./data/navData.json')
      .done((rawData) => {
        Nav.all = rawData.map(page => new Nav(page));
        if(callback) callback();
      })
  }

  Nav.goTo = function(pageName) {
    let $body = $('body');
    let $home = $('#home');
    let $main = $('main');
    $body.fadeOut(800, () => {
      if($home.children()) $home.empty();
      if($main.children()) $main.empty();
      
      this.insertPage(pageName, app.Nav.setListener);


      $body.fadeIn(800);
    });

  }

  Nav.insertPage = function(pageName, callback) {
    let thisPage = Nav.all.filter(page => page['pageName'] === pageName.replace('-button', ''))[0];
    $(thisPage.parentEl).load(thisPage.path, () => {
      $('.nav-location').removeClass('nav-location');
      $(`#${pageName}-button`).addClass('nav-location');

      if(callback) callback();
    });
  }


  Nav.setListener = function() {
    $('.home-nav').on('click', 'li', function(e) {
      e.preventDefault();
      console.log(e.target.id);
      Nav.goTo(e.target.id);
    })
  }

  module.Nav = Nav;

})(app);