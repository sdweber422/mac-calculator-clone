var Calc = new Calculator() //eslint-disable-line
var clickElement = document.querySelector( '.calculator-keypad' )

clickElement.addEventListener( 'click', calculatorHandler.bind( this ) )
document.addEventListener( 'keypress', calculatorHandler.bind( this ) )

function calculatorHandler ( event ) {
  var displayElement = document.querySelector( '.calculator-display' )
  var value = ( !event.key ) ? event.target.value : parsedKey( event.key )

  Calc.acceptInput( value )
  if ( Calc.shouldDisplay() ) {
    displayResizer( displayElement )
    formatDisplay( displayElement )
  }
}

function formatDisplay ( display ) {
  if ( Calc.getDisplayLength() < 24 ) {
    if ( Calc.getDisplayLength() === 1 ) {
      displayResizer( display )
    }
    display.innerHTML = Calc.getDisplay()
  }
}

function displayResizer ( display ) {
  var displayLength = Calc.getDisplayLength()
  if ( displayLength > 8 ) {
    var fontSize = window.getComputedStyle( display, null )
      .getPropertyValue( 'font-size' )
    fontSize = fontSize.slice( 0, fontSize.length - 2 )
    var alteredFontSize = fontSize - ( fontSize / 10 )
    if ( alteredFontSize > 20 ) {
      display.style.fontSize = `${alteredFontSize}px`
    }
  } else {
    display.style.fontSize = '56px'
  }
}

function parsedKey ( value ) {
  if ( value.charCodeAt() > 44 && value.charCodeAt() < 58 ) {
    return value
  } else {
    switch ( value.charCodeAt() ) {
      case 127: return 'AC'
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
