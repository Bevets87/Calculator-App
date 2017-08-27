(function (window) {

  'use strict';

  function Model () {
    this.state = {
      display: 0,
      entry: [],
      expression: []
    }
  }

  Model.prototype.setState = function (state, cb) {
    var self = this;
    cb = cb || null
    self.state = Object.assign(
      {},
      self.state,
      state
    )
    if (cb) {
      cb(self.state)
    }
  }

  window.app = window.app || {};
  window.app.Model = Model
}(window))
