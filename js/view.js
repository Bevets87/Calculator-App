(function (window) {

  'use strict';

  function View () {
    this.$result = document.getElementById('result');
    this.$buttons = document.querySelectorAll('button');

  }

  View.prototype.bind = function (event, handler) {
    var self = this;
    if (event === 'initCalculator') {
      window.addEventListener('load', function () {
          handler()
      })
    }
    for (var button in self.$buttons) {
      switch (self.$buttons[button].className) {
        case 'num':
          if (event === 'handleDigits') {
              self.$buttons[button].addEventListener('click', function (e) {
              handler(e)
            })
          }
          break;
        case 'operator':
          if (event === 'operate') {
            self.$buttons[button].addEventListener('click', function (e) {
              handler(e)
            })
          }
          break;
        case 'clear':
          if (event === 'clear') {
            self.$buttons[button].addEventListener('click', function (e) {
              handler(e)
            })
          }
          break;
        case 'delete':
          if (event === 'delete') {
            self.$buttons[button].addEventListener('click', function (e) {
              handler(e)
            })
          }
          break;
        case 'equals':
          if (event === 'evaluate') {
            self.$buttons[button].addEventListener('click', function (e) {
              handler(e)
            })
          }
          break;
      }
    }
  }

  View.prototype.render = function (cmd, parameter) {
    var self = this;
    var viewCommands = {
      'displayResult': function () {
        self.$result.textContent = parameter;
      }
    }
    viewCommands[cmd]();
  }
  window.app = window.app || {};
  window.app.View = View;
}(window))
