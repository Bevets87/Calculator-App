(function (window) {

  'use strict';

  function Model () {
    this.state = {
      display: 0,
      entry: [],
      store: []
    }
  }

  Model.prototype.setState = function (state, cb) {
    var self = this;
    self.state = Object.assign(
      {},
      self.state,
      state
    )
    cb(self.state)
  }

  window.app = window.app || {};
  window.app.Model = Model
}(window))
