var Calculator = function() {
  this.display = 0
  this.operators = []
  this.operands = []
  this.resetDisplayFlag = true
  this.poppedOperator = null
  this.poppedOperand = null
  this.resultArray = []
}

Calculator.prototype = {

  checkForAllClear: function( value ) {
    if ( value === 'AC' ) {
      this.display = 0
      this.operators = []
      this.operands = []
      this.resetDisplayFlag = true
      this.poppedOperator = null
      this.poppedOperand = null
    }
  },

  completeOperation: function() {
    while ( this.operators.length ) {
      var secondOperand = this.operands.pop()
      var firstOperand = this.operands.pop()
      this.poppedOperand = secondOperand
      this.poppedOperator = this.operators.pop()
      this.display = this.operatorLookUpTable(
        this.poppedOperator,
        firstOperand,
        secondOperand
      )
      this.operands.push( this.display )
      this.resetDisplayFlag = true
      console.log( 'this.display', this.display )
    }
  },

  numberHandler: function( value ) {
    if ( this.resetDisplayFlag ) {
      this.display = value
      this.resetDisplayFlag = false
    }
    else {
      this.display += value
    }
  },

  operatorHandler: function( value ) {
    if ( value === '=' ) {
      if ( this.resetDisplayFlag === true ) {
        console.log( 'Here' )
        this.operators.push( this.poppedOperator )
        this.operands.push( this.poppedOperand )
        this.completeOperation()
      }
      else {
        this.poppedOperator = null
        this.poppedOperand =  null
        this.operands.push( this.display )
        this.completeOperation()
      }
      return true
    }
    if ( [ 'X', '/', '+', '-' ].includes( value ) ) {
      if ( this.operators.length ) {
        var multiplicationDivisionSigns = [ 'X', '/' ]
        var additionSubtractionSigns = [ '+', '-' ]
        var lastOperator = this.operators[ this.operators.length - 1 ]
        var lastOperand = this.operands[ this.operands.length - 1 ]
        if (
          multiplicationDivisionSigns.includes( lastOperator ) &&
          multiplicationDivisionSigns.includes( value )
          ) {
          this.operators.pop()
          this.operators.push( value, lastOperator )
          this.operands.pop()
          this.operands.push( this.display, lastOperand )
          this.performOperation()
        }
        else if (
          additionSubtractionSigns.includes( lastOperator ) &&
          multiplicationDivisionSigns.includes( value )
          ) {
          this.operators.push( value )
          this.operands.push( this.display )
          this.resetDisplay()
          this.resetDisplayFlag = true
        }
        else {
          console.log( 'We made it' )
          console.log( 'this.operators', this.operators )
          console.log( 'this.operands', this.operands )
          this.operands.push( this.display )
          this.completeOperation()
          this.operators.push( value )
        }
      }
      else {
        this.operators.push( value )
        this.operands.push( this.display )
        this.resetDisplay()
        this.resetDisplayFlag = true
      }

      return true
    }
    return false
  },

  performOperation: function() {
    var secondOperand = this.operands.pop()
    var firstOperand = this.operands.pop()
    this.poppedOperand = secondOperand
    this.poppedOperator = this.operators.pop()
    this.display = this.operatorLookUpTable(
      this.poppedOperator,
      firstOperand,
      secondOperand
    )
    this.operands.push( this.display )
    this.resetDisplayFlag = true
    console.log( 'this.display', this.display )
  },

  getDisplay: function() {
    return this.display
  },

  getDisplayLength: function() {
    return String(this.display).length
  },

  keypress: function( value ) {
    if (
      !this.operatorHandler( value )
    ) {
      this.numberHandler( value )
    }
    this.resultArray.push( value )
    this.checkForAllClear( value )
    console.log( 'this.operators', this.operators )
    console.log( 'this.operands', this.operands )
    console.log( 'this.resultArray', this.resultArray )
  },

  isOperatorListFull: function() {
    return this.resetDisplayFlag
  },

  operatorLookUpTable: function( operator, value1, value2 ) {
    console.log( 'value1', value1 )
    console.log( 'value2', value2 )
    let operatorLookUp = {
      ['X']       : parseFloat( value1 ) * parseFloat( value2 ),
      ['/']       : parseFloat( value1 ) / parseFloat( value2 ),
      ['+']       : parseFloat( value1 ) + parseFloat( value2 ),
      ['-']       : parseFloat( value1 ) - parseFloat( value2 ),
      [null]      : 0,
      [undefined] : 0
    }
    return operatorLookUp[ operator ]
  },

  resetDisplay: function() {
    this.display = 0
  }
}
