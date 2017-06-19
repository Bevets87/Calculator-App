(function (window) {

  'use strict';

  function Controller (model, view) {
    self.model = model;
    self.view = view;

    self.view.bind('handleDigits', function (e) {
      self.model.state.entry.push(e.target.value);
      self.model.setState({entry: self.model.state.entry, display: self.model.state.entry.join('')}, function (state) {
        self.view.render('displayResult', state.display);
      })
    })

    self.view.bind('operate', function (e) {
      var state = self.model.state;
      var operators = ['*','+','/','-','%'];
      var lastStoreIndex = state.store.length - 1;
      if (operators.indexOf(state.store[lastStoreIndex]) >= 0 && state.entry.length == 0) {
        state.store.splice(lastStoreIndex, 1, e.target.value);
        self.model.setState({store: state.store}, function (state) {});
      } else {
        state.store.push(state.entry.join(''))
        var result = eval(state.store.join(''))
        state.store = []
        state.store.push(result)
        state.store.push(event.target.value)
        state.entry = []
        self.model.setState({
          display: result,
          store: state.store,
          entry: state.entry
        }, function (state) {
          self.view.render('displayResult', state.display);
        })
      }
    })

    self.view.bind('clear', function (e) {
      self.model.setState({
        display: 0,
        entry: [],
        store: [],
      }, function (state) {
        self.view.render('displayResult', state.display);
      })
    })

    self.view.bind('delete', function (e) {
      var state = self.model.state;
      if (state.entry.length > 0) {
        state.entry.pop()
        self.model.setState({
          entry: state.entry,
          display: state.entry.join('')
        }, function (state) {
          self.view.render('displayResult', state.display);
        })
      } else {
        state.display.toString()
        self.model.setState({
          display: state.display
        }, function (state) {
          self.view.render('displayResult', state.display);
        })
      }
    })

    self.view.bind('evaluate', function (e) {
      var state = self.model.state;
      state.store.push(state.entry.join(''));
      var result = eval(state.store.join(''));
      state.store = [];
      state.store.push(result)
      state.entry = [];
      self.model.setState({
        display: result,
        store: state.store,
        entry: state.entry
      }, function (state) {
        self.view.render('displayResult', state.display);
      })
    })
  }

  window.app = window.app || {};
  window.app.Controller = Controller;
}(window))
