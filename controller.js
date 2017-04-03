var calc = new Calculator()
window.onload = document
  .getElementById( 'calculator-output' )
  .innerHTML = calc.getDisplay()

/********* Event listeners **********/

document.getElementById( 'calculator' ).addEventListener( 'click', clickHandler.bind( this ) )
document.addEventListener( 'keypress', keypressHandler.bind( this ) )

/********* Event Listener functions *********/

function clickHandler( event ) {
  var displayScreen = document.getElementById( 'calculator-output' )
  var buttonPush = event.target.dataset.value
  var displayLength = calc.getDisplayLength()

  sendInputToCalculator( buttonPush )
  if ( !checkForOperation( buttonPush ) ) {
    displayOnScreen( buttonPush, displayLength, displayScreen )
  }
}

function keypressHandler( event ) {
  var displayScreen = document.getElementById( 'calculator-output' )
  var keystroke = event.key
  var displayLength = calc.getDisplayLength()
  var validKeystrokes = [
    '0', '1', '2', '3', '4',
    '5', '6', '7', '8', '9' ,
     '.', 'X', '/', '+', '-',
     '=', '*'
    ]

  if( validKeystrokes.includes( keystroke ) ) {
    sendInputToCalculator( keystroke )
    if ( !checkForOperation( keystroke ) ) {
      displayOnScreen( keystroke, displayLength, displayScreen )
    }
  }
}

/********* Helper functions **********/

function adjustDisplayFont( displayLength, displayScreen ) {
  if ( displayLength > 7 ) {
    var fontReducer = window.getComputedStyle( displayScreen ).getPropertyValue( 'font-size' ).slice(0,2)
    fontReducer = parseInt(fontReducer) - (parseInt(fontReducer)/10)
    if ( fontReducer < 16 ) {
      fontReducer = 16
    }
    displayScreen.style.fontSize = `${fontReducer}px`
  }
}

function checkForOperation( keypress ) {
  if ( [ 'X', '/', '+', '-', '*' ].includes( keypress ) && !shouldDisplay() ) {
    return true
  }
  return false
}

function checkForOverFlowingDisplay( keypress, displayLength, displayScreen ) {
  if ( displayLength < 25 && !checkForOperation( keypress ) ) {
    displayScreen.innerHTML = calc.getDisplay()
  }
}

function displayOnScreen ( keypress, displayLength, displayScreen ) {
  adjustDisplayFont( displayLength, displayScreen )
  checkForOverFlowingDisplay( keypress, displayLength, displayScreen )
}

function sendInputToCalculator( keypress ) {
  calc.keypress( keypress )
}

function shouldDisplay() {
  return calc.displayResults()
}
