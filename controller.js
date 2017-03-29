var calc = new Calculator()
window.onload = document
  .getElementById( 'calculator-output' )
  .innerHTML = calc.getDisplay()

function clickHandler(event) {
  var displayScreen = document.getElementById( 'calculator-output' )
  var keystroke = event.target.dataset.value
  var displayLength = calc.getDisplayLength()

  sendInputToCalculator( keystroke )
  // checkForOperation( keystroke )
  checkForAllClear( keystroke, displayScreen )
  checkForEqualSign( keystroke, displayLength, displayScreen )
  adjustDisplayFont( displayLength, displayScreen )
  checkForOverFlowingDisplay( keystroke, displayLength, displayScreen )
}

function defaultFontSize( displayScreen ) {
  displayScreen.style.fontSize = '50px'
}

function checkForEqualSign( keypress, displayScreen ) {
  if ( keypress === '=' ) {

  }
}

function checkForOperation( keypress ) {
  if ( [ 'X', '/', '+', '-' ].includes( keypress ) ) {
    return true
  }
  return false
}

function checkForAllClear( keypress, displayScreen ) {
  if ( keypress === 'AC' ) {
    calc.resetDisplay()
    defaultFontSize( displayScreen )
    checkForOverFlowingDisplay( 0, displayScreen )
  }
}

function checkForOverFlowingDisplay( keypress, displayLength, displayScreen ) {
  if ( displayLength < 25 && !checkForOperation( keypress ) ) {
    displayScreen.innerHTML = calc.getDisplay()
  }
}

function sendInputToCalculator( keypress ) {
  calc.keypress( keypress )
}

function adjustDisplayFont( displayLength, displayScreen ) {
  if ( displayLength > 7 ) {
    var fontReducer = window.getComputedStyle( displayScreen ).getPropertyValue( 'font-size' ).slice(0,2)
    fontReducer = parseInt(fontReducer) - (fontReducer/10)
    if ( fontReducer < 16 ) {
      fontReducer = 16
    }
    displayScreen.style.fontSize = `${fontReducer}px`
  }
}

// Event listener
document.getElementById( 'calculator' ).addEventListener( 'click', clickHandler.bind(this))
