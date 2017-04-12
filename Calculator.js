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

  // Computation Functions

  add: function ( operandOne, operandTwo ) {
    return operandOne + operandTwo
  },

  divide: function ( operandOne, operandTwo ) {
    return operandOne / operandTwo
  },

  multiply: function ( operandOne, operandTwo ) {
    return operandOne * operandTwo
  },

  subtract: function ( operandOne, operandTwo ) {
    return operandOne - operandTwo
  },

  // Completion functions

  completeOperations: function () {
    while ( this.operations.length ) {
      this.poppedOperand = this.operands.pop()
      this.display = this.lookUpFunctions(
        this.operations.pop(),
        this.display,
        this.poppedOperand
      )
    }
    this.value = ''
    console.log( 'equals' )
    return this.displayScreen()
  },

  // Functions that control calculator based on input

  handleInput: function () {
    if ( this.isNumber() ) {
      this.displayScreen()
    } else if ( this.isOperation() ) {
      this.handleOperations()
    } else {
      this.handleSpecialOperations()
    }
  },

  handleOperations: function () {
    if ( this.isEqualSign() ) {
      return this.completeOperations()
    } else if ( !this.queuedOperations() ) {
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
      return this.computePercentage()
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
      'X'        : this.multiply( firstValue, secondValue ),
      '/'        : this.divide( firstValue, secondValue ),
      '+'        : this.add( firstValue, secondValue ),
      '-'        : this.subtract( firstValue, secondValue ),
      'null'     : '0',
      'undefined': '0'
    }
    /* eslint-enable */
    return functions[ operator ] || '0'
  }
}
