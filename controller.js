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
      calculatorButton.style.backgroundColor = 'gray'
      calculatorButton.style.color = 'black'
      calculatorButton.style.opacity = '1'
    }, 200 )
  }

  Calc.acceptInput( value )
  if ( Calc.shouldDisplay() ) {
    displayResizer( displayElement )
    formatDisplay( displayElement )
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
