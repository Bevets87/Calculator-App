(function (window) {

  'use strict';

  function Controller (model, view) {
    self.model = model;
    self.view = view;

    self.view.bind('initCalculator', function () {
      self.model.setState({
        entry: ['0'],
        expression: [],
        display: 0
      }, function (state) {
        self.view.render('displayResult', state.display)
      })
    })

    self.view.bind('handleDigits', function (e) {
      var { entry, expression, display } = self.model.state
      if (entry.length < 12) {
        if (entry[0] == '0') {
          entry.splice(0,1,e.target.value)
        } else if (e.target.value === '.' && entry.indexOf(e.target.value) >= 0) {
          entry = entry 
        } else {
          entry.push(e.target.value)
        }
      }
      self.model.setState({
        entry: entry,
        display: entry.join('')
      }, function (state) {
        self.view.render('displayResult', state.display);
      })
    })

    self.view.bind('operate', function (e) {
      var { expression, entry, display } = self.model.state
      if (expression.length == 0) {
        expression.push(entry.join(''))
        expression.push(e.target.value)
      } else if (expression.length == 1) {
        if (entry.length == 1) {
          expression = []
          expression.push(entry.join(''))
          expression.push(e.target.value)
        } else {
          expression.push(e.target.value)
        }
      } else {
        if (entry.length == 0 ) {
          expression.splice(1,1,e.target.value)
        } else {
          expression.push(entry.join(''))
          display = eval(expression.join(''))
          if (display.toString().length > 11) {
            display = display.toExponential(3)
          }
          expression = []
          expression.push(display)
          expression.push(e.target.value)
        }
      }
      self.model.setState({
        entry: [],
        expression: expression,
        display: display.toString()
      }, function (state) {
        self.view.render('displayResult', state.display)
      })
    })

    self.view.bind('clear', function (e) {
      self.model.setState({
        display: 0,
        entry: ['0'],
        expression: []
      }, function (state) {
        self.view.render('displayResult', state.display);
      })
    })

    self.view.bind('delete', function (e) {
      var { entry, display } = self.model.state
      if (entry.length > 0) {
        if (entry.length == 1) {
          entry = ['0']
          display = entry.join('')
        } else {
          entry.pop()
        }
        self.model.setState({
          entry: entry,
          display: entry.join('')
        }, function (state) {
          self.view.render('displayResult', state.display);
        })
      }
    })

    self.view.bind('evaluate', function (e) {
      var { expression, display, entry } = self.model.state
      if (expression.length == 2 && entry.length > 0) {
        expression.push(entry.join(''))
        entry = []
        display = eval(expression.join(''))
        if (display.toString().length > 11) {
          display = display.toExponential(3)
        }
        expression = []
        expression.push(display.toString())
      }
      self.model.setState({
        expression: expression,
        display: display,
        entry: entry
      }, function (state) {
        self.view.render('displayResult', state.display)
      })
    })
  }

  window.app = window.app || {};
  window.app.Controller = Controller;
}(window))
