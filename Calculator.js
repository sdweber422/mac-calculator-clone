var Calculator = function () {
  this.operations = []
  this.operands = []
  this.display = '0'
  this.displayFlag = true
}

Calculator.prototype = {

  // Functions which interact with external interface

  acceptInput: function ( value ) {
    if ( value === null ) {
      return
    }
    this.value = value
    this.handleInput()
  },

  displayScreen: function () {
    this.displayFlag = true
    if ( this.display === '' ) {
      this.display = '0'
    } else if ( this.display === '0' ) {
      this.display = this.value
    } else {
      this.display += this.value
    }
  },

  getDisplay: function () {
    return this.display
  },

  getDisplayLength: function () {
    return this.display.length
  },

  shouldDisplay: function () {
    return this.displayFlag
  },

  // Special operation functions

  allClear: function () {
    this.operands = []
    this.operations = []
    this.display = '0'
    this.displayFlag = true
    this.value = '0'
    return this.displayScreen()
  },

  changeSign: function () {
    if ( !this.checkForSignInDisplay() ) {
      this.display = '-' + this.display
    } else {
      this.display = this.display.slice( -( this.getDisplayLength() - 1 ) )
    }
  },

  computePercentage: function () {
    this.display = ( this.display / 100 )
    this.value = ''
    return this.displayScreen()
  },

  completeOperations: function () {
    while ( this.operations.length ) {
      this.display = this.lookUpFunctions(
        this.operations.pop(),
        this.display,
        this.operands.pop()
      )
    }
    this.value = ''
    this.displayFlag = true
    return this.displayScreen()
  },

  // Functions that control calculator based on input

  handleInput: function () {
    if ( this.isNumber() ) {
      this.displayScreen()
      return
    }
    if ( this.isOperation() ) {
      this.handleOperations()
      return
    }
    return this.handleSpecialOperations()
  },

  handleOperations: function () {
    if ( this.isEqualSign() ) {
      return this.completeOperations()
    }
    if ( !this.queuedOperations() ) {
      this.operations.push( this.value )
      this.operands.push( this.display )
      this.displayFlag = false
      this.display = '0'
    }
  },

  handleSpecialOperations: function () {
    if ( this.checkForAllClear() ) {
      return this.allClear()
    }
    if ( this.checkForDecimal() ) {
      if ( !this.displayContainsDecimal() ) {
        this.displayScreen()
      }
      return
    }
    if ( this.checkForSign() ) {
      return this.changeSign()
    }
    if ( this.checkForPercentage() ) {
      this.computePercentage()
    }
  },

  // Boolean functions

  checkForAllClear: function () {
    return this.value === 'AC'
  },

  checkForDecimal: function () {
    return this.value === '.'
  },

  checkForPercentage: function () {
    return this.value === '%'
  },

  checkForSign: function () {
    return this.value === 'sign'
  },

  checkForSignInDisplay: function () {
    return this.display.includes( '-' )
  },

  displayContainsDecimal: function () {
    return this.display.includes( '.' )
  },

  isEqualSign: function () {
    return this.value === '='
  },

  isNumber: function () {
    return [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].includes( parseInt( this.value ) )
  },

  isOperation: function () {
    return [ '=', 'X', '/', '+', '-' ].includes( this.value )
  },

  queuedOperations: function () {
    return this.operations.length !== 0
  },

  // Look up table for functions

  lookUpFunctions: function ( operator, operandOne, operandTwo ) {
    var firstValue = parseFloat( operandOne )
    var secondValue = parseFloat( operandTwo )
    /* eslint-disable key-spacing */
    var functions = {
      'X'        : firstValue * secondValue,
      '/'        : firstValue / secondValue,
      '+'        : firstValue + secondValue,
      '-'        : firstValue - secondValue,
      'null'     : '0',
      'undefined': '0'
    }
    /* eslint-enable */
    return functions[ operator ] || '0'
  }
}
