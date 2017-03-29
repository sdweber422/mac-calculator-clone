var Calculator = function() {
  this.display = 0
  this.input
}

Calculator.prototype.getDisplay = function() {
  return this.display
}

Calculator.prototype.keypress = function( value ) {
  if ( value === 'AC' ) {
    this.display = 0
  }
  else if ( this.display === 0 ) {
    this.display = value
  }
  else {
    this.display += value
  }
}

Calculator.prototype.getDisplayLength = function() {
  return String(this.display).length
}
