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

  Nav.fillBurger = function() {
    let $navBurger = $('#nav-burger');
    let $navBurgerImageBar = $('.nav-burger-image-bar');

    let $elUl = $(`<ul id='nav-burger-ul' class='hidden'></ul>`)
    $navBurger.append($elUl);

    Nav.all.forEach(page => {
      let $elLi = $(`<li id=${page.pageName}-button>${page.pageName}</li>`);
      $elUl.append($elLi);
    });

    this.setListener('#nav-burger');
    $navBurgerImageBar.on('click', function(e) {
      e.preventDefault();

      $('#nav-burger-ul').toggle();
      if($navBurger.hasClass('shown')) {
        $navBurger.removeClass('shown');
        $navBurgerImageBar.removeClass('shown');
      }
      else {
        $navBurger.addClass('shown');
        $navBurgerImageBar.addClass('shown');
      }
    })
  }

  Nav.goTo = function(pageName) {
    let fadeThru = 400;
    fadeThru /= 2;
    let $body = $('#body');

    $body.fadeOut(fadeThru, () => {
      if($body.children()) $body.empty();
      
      this.insertPage(pageName, () => { app.Nav.setListener('.home-nav-ul') });
      

      $body.fadeIn(fadeThru);
    });

  }

  Nav.insertPage = function(pageName, callback) {
    let thisPage = Nav.all.filter(page => page['pageName'] === pageName.replace('-button', ''))[0];
    $(thisPage.parentEl).load(thisPage.path, () => {
      $('.nav-location').removeClass('nav-location');
      $(`#${pageName}-button`).addClass('nav-location');

      let $navBurger = $('#nav-burger');

      if(thisPage.usesNavBurger && $navBurger.hasClass('hidden')) $navBurger.removeClass('hidden');
      else if(!thisPage.usesNavBurger && !$navBurger.hasClass('hidden')) $navBurger.addClass('hidden');

      if(callback) callback();
    });
  }


  Nav.setListener = function(navName) {
    $(navName).on('click', 'li', function(e) {
      e.preventDefault();
      Nav.goTo(e.target.id);
      if(navName === '#nav-burger') {
        $('#nav-burger-ul').toggle();
        $('#nav-burger').removeClass('shown');
        $('.nav-burger-image-bar').removeClass('shown');
      }
    })
  }

  module.Nav = Nav;

})(app);