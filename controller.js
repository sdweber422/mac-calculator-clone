var Calculator = require( './Calculator' )
var clickHandler = document.getElementById( 'calculator-keypad' )

clickHandler.addEventListener( '.click', function( event ) {
  var value = event.target
  console.log( event.target )
} )
