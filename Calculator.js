var Calculator = function () {
  this.operations = []
  this.operands = []
  this.display = '0'
}

Calculator.prototype = {

  acceptInput: function ( value ) {
    if ( value === null ) {
      return
    }
    this.value = value
    this.handleInput()
  },

  allClear: function () {
    this.operands = []
    this.operations = []
    this.display = '0'
    this.value = '0'
    console.log( 'this.display', this.display )
    console.log( 'this.display.length', this.display.length )
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

  displayScreen: function () {
    if ( this.display === '0' ) {
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

  isNumber: function () {
    return [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ].includes( parseInt( this.value ) )
  },

  isOperation: function () {
    return [ '=', 'X', '/', '+', '-' ].includes( this.value )
  }
}
