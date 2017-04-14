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
    if ( !helperFunctions.checkForSignInDisplay( this.display ) ) {
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

  // Completion functions

  completeOperations: function () {
    while ( this.operations.length ) {
      this.poppedOperand = this.operands.pop()
      this.display = helperFunctions.lookUpFunctions(
        this.operations.pop(),
        this.display,
        this.poppedOperand
      )
    }
    this.value = ''
    return this.displayScreen()
  },

  // Functions that control calculator based on input

  handleInput: function () {
    if ( helperFunctions.isNumber( this.value ) ) {
      this.displayScreen()
    } else if ( helperFunctions.isOperation( this.value ) ) {
      this.handleOperations()
    } else {
      this.handleSpecialOperations()
    }
  },

  handleOperations: function () {
    if ( helperFunctions.isEqualSign( this.value ) ) {
      return this.completeOperations()
    } else if ( !helperFunctions.queuedOperations( this.operations ) ) {
      this.operations.push( this.value )
      this.operands.push( this.display )
      this.displayFlag = false
      this.display = '0'
    }
  },

  handleSpecialOperations: function () {
    if ( helperFunctions.checkForAllClear( this.value ) ) {
      return this.allClear()
    }
    if ( helperFunctions.checkForDecimal( this.value ) ) {
      if ( !helperFunctions.displayContainsDecimal( this.display ) ) {
        this.displayScreen()
      }
      return
    }
    if ( helperFunctions.checkForSign( this.value ) ) {
      return this.changeSign()
    }
    if ( helperFunctions.checkForPercentage( this.value ) ) {
      return this.computePercentage()
    }
  }
}

var helperFunctions = {
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

  // Boolean functions

  checkForAllClear: function ( input ) {
    return input === 'AC'
  },

  checkForDecimal: function ( input ) {
    return input === '.'
  },

  checkForPercentage: function ( input ) {
    return input === '%'
  },

  checkForSign: function ( input ) {
    return input === 'sign'
  },

  checkForSignInDisplay: function ( display ) {
    return display.includes( '-' )
  },

  displayContainsDecimal: function ( display ) {
    return display.includes( '.' )
  },

  isEqualSign: function ( input ) {
    return input === '='
  },

  isNumber: function ( input ) {
    return /^\d+$/.test( input )
  },

  isOperation: function ( input ) {
    return [ '=', 'X', '/', '+', '-' ].includes( input )
  },

  queuedOperations: function ( operations ) {
    return operations.length !== 0
  },

  // Look up table for functions

  lookUpFunctions: function ( operator, operandOne, operandTwo ) {
    var firstValue = parseFloat( operandOne )
    var secondValue = parseFloat( operandTwo )
    /* eslint-disable key-spacing */
    var functions = {
      'X'        : helperFunctions.multiply( firstValue, secondValue ),
      '/'        : helperFunctions.divide( firstValue, secondValue ),
      '+'        : helperFunctions.add( firstValue, secondValue ),
      '-'        : helperFunctions.subtract( firstValue, secondValue ),
      'null'     : '0',
      'undefined': '0'
    }
    /* eslint-enable */
    return functions[ operator ] || '0'
  }
}

var Calc = new Calculator() //eslint-disable-line
var clickElement = document.querySelector( '.calculator-keypad' )

clickElement.addEventListener( 'click', calculatorHandler )
document.addEventListener( 'keydown', calculatorHandler )

function calculatorHandler ( event ) {
  var displayElement = document.querySelector( '.calculator-display' )
  var eventKey

  if ( event.key ) {
    eventKey = parsedKey( event.key )
  }

  var value = event.key ? eventKey : event.target.value
  var calculatorButton = document.querySelector( `[value='${eventKey}']` )

  if ( eventKey !== null && eventKey ) {
    var originalBackground = window
      .getComputedStyle( calculatorButton, null )
        .getPropertyValue( 'backgroundColor' )
    var originalOpacity = window
      .getComputedStyle( calculatorButton, null )
        .getPropertyValue( 'opacity' )
    var originalColor = window
      .getComputedStyle( calculatorButton, null )
        .getPropertyValue( 'color' )
    calculatorButton.style.backgroundColor = 'black'
    calculatorButton.style.color = 'white'
    calculatorButton.style.opacity = '.7'
    setTimeout( function () {
      calculatorButton.style.backgroundColor = originalBackground
      calculatorButton.style.color = originalColor
      calculatorButton.style.opacity = originalOpacity
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
