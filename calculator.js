var Calculator = function() {
  this.display = 0
  this.firstOperand = 0
  this.secondOperand = 0
  this.operation
}

Calculator.prototype.getDisplay = function() {
  return this.display
}

Calculator.prototype.resetDisplay = function() {
  this.display = 0
}

Calculator.prototype.keypress = function( value ) {
  if (
    !this.checkForMultiplication( value ) &&
    !this.checkForEqualSign( value )
  ) {
    this.checkForInitialKeypress( value )
    }

  // this.checkForDivision( value )
  // this.checkForAddition( value )
  // this.checkForSubtraction( value )
  this.checkForAllClear( value )
}

Calculator.prototype.getDisplayLength = function() {
  return String(this.display).length
}

Calculator.prototype.checkForMultiplication = function( value ) {
  if ( value === 'X' ) {
    if ( this.firstOperand !== 0 ) {
      this.checkForEqualSign( '=' )
    }
    else {
      this.firstOperand = this.display
      this.display = 0
      this.operation = 'X'
    }
    return true
  }
  return false
}

Calculator.prototype.checkForDivision = function( value ) {
  if ( value === '/' ) {
    if ( this.firstOperand ) {

    }
  }
}

Calculator.prototype.checkForEqualSign = function( value ) {
  if ( value === '=' ) {
    if ( this.operation === 'X' ) {
      console.log( 'this.display', this.display )
      console.log( 'this.firstOperand', this.firstOperand )
      this.secondOperand = this.display
      this.display = this.firstOperand * this.secondOperand
      this.firstOperand = this.display
      console.log( 'this.display', this.display )
      this.display = 0
    }
    return true
  }
  return false
}

Calculator.prototype.checkForAllClear = function( value ) {
  if ( value === 'AC' ) {
    this.display = 0
    this.firstOperand = 0
  }
}

Calculator.prototype.checkForInitialKeypress = function( value ) {
  if ( this.display === 0 ) {
    this.display = value
  }
  else {
    this.display += value
  }
}
