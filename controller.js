var calc = new Calculator()
window.onload = document
  .getElementById( 'calculator-output' )
  .innerHTML = calc.getDisplay()

function clickHandler(event) {
  var displayScreen = document.getElementById( 'calculator-output' )
  var keystroke = event.target.dataset.value
  console.log( 'keystroke', keystroke )
  var displayLength = calc.getDisplayLength()

  sendInputToCalculator( keystroke )
  checkForAllClear( keystroke, displayScreen )
  adjustDisplayFont( displayLength, displayScreen )
  checkForOverFlowingDisplay( displayLength, displayScreen )
}

function defaultFontSize( displayScreen ) {
  displayScreen.style.fontSize = '50px'
}

function checkForAllClear( keypress, displayScreen ) {
  if ( keypress === 'AC' ) {
    defaultFontSize( displayScreen )
  }
}

function checkForOverFlowingDisplay( displayLength, displayScreen ) {
  if ( displayLength < 25 ) {
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
