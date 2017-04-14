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

var Calc = new Calculator() //eslint-disable-line
var clickElement = document.querySelector( '.calculator-keypad' )

clickElement.addEventListener( 'click', calculatorHandler.bind( this ) )
document.addEventListener( 'keypress', calculatorHandler.bind( this ) )

function calculatorHandler ( event ) {
  var displayElement = document.querySelector( '.calculator-display' )
  var eventKey

  if ( event.key ) {
    eventKey = parsedKey( event.key )
  }

  var value = ( !event.key ) ? event.target.value : eventKey
  var calculatorButton = document.querySelector( `[value='${eventKey}']` )

  if ( eventKey !== null && eventKey ) {
    calculatorButton.style.backgroundColor = 'black'
    calculatorButton.style.color = 'white'
    calculatorButton.style.opacity = '.7'
    setTimeout( function () {
      calculatorButton.style.backgroundColor = '#e6e8ed'
      calculatorButton.style.color = 'black'
      calculatorButton.style.opacity = '1'
    }, 200 )
  }

  Calc.acceptInput( value )
  if ( Calc.shouldDisplay() ) {
    displayResizer( displayElement )
    formatDisplay( displayElement )
  }

  if ( event.target.value ) {
    var eventTarget = document.querySelector( `[value='${event.target.value}']` )
    eventTarget.blur()
  }
}

function formatDisplay ( display ) {
  if ( Calc.getDisplayLength() < 22 ) {
    if ( Calc.getDisplayLength() === 1 ) {
      displayResizer( display )
    }
    display.innerHTML = Calc.getDisplay()
  }
}

function displayResizer ( display ) {
  var displayLength = Calc.getDisplayLength()

  if ( displayLength > 8 ) {
    var alteredFontSize
    switch ( displayLength ) {
      case 9 :
      case 10: alteredFontSize = 46
        break
      case 11:
      case 12: alteredFontSize = 38
        break
      case 13:
      case 14: alteredFontSize = 30
        break
      case 15:
      case 16: alteredFontSize = 22
        break
      default: alteredFontSize = 20
    }
    display.style.fontSize = `${alteredFontSize}px`
  } else {
    display.style.fontSize = '56px'
  }
}

function parsedKey ( value ) {
  if ( value.charCodeAt() > 44 && value.charCodeAt() < 58 ) {
    return value
  } else {
    switch ( value.charCodeAt() ) {
      case 69 : return '='
      case 42 :
      case 88 :
      case 120: return 'X'
      case 37 : return '%'
      case 43 : return '+'
      default : return null
    }
  }
}
