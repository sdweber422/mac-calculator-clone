# Mac Calculator Clone

Replicate the builtin Mac calculator as a web app.

This this the base repo for the [Mac Calculator Clone](http://jsdev.learnersguild.org/goals/150) goal.

![calculator-with-history](https://cloud.githubusercontent.com/assets/8385/22572149/9be3c83e-e957-11e6-9431-9b9742b6b4af.png)

## Installation and Setup

This is the second attempt at a mac calculator clone, and all code for this 2nd attempt will be on branches beginning with `2nd-attempt`
To install:
```
git clone https://github.com/sdweber422/mac-calculator-clone
cd mac-calculator-clone
open index.html
```

## Usage and Examples
##### The Mac Calculator supports:
- addition
- subtraction
- multiplication
- division
- clear (display '0' and reset calculator memory)
- change of sign (toggles between positive and negative)
- percentage (change number into its decimal equivalent (number/100) for computation)

##### Rules
The Mac Calculator buttons follow certain rules which govern what is displayed (and also what is computed, covered in the next section). The '=' will always reset operator key presses to zero.

- '=' : Display varies as follows:
  - 1st key press: Displays the results of all entered operations and operands
  - Subsequent key presses: Applies last operator used with last operand to displayed value
  - Special case: If equal was hit for result (or a number was entered), then an operator, then equal again, the operands used with the operator are both the results of the first equal result

```
9 + 9 - 3 = // Display will be 15
6 + =       // Display will be 12  
4 X 4 =     // Display will be 16;
=           // if '=' hit again, answer will be 64
+ =         // if '+', then '=' pressed at this point, answer will be 128
```
- '+' : Display varies as follows:
  - 1st key press: Most recently entered number
  - Subsequent key presses: Displays as if equal button has been pressed, but is expecting to add another input afterwards
  - Repeated key presses maintain the display until another number has been entered
- '-' : Same display rules as addition button, but with subtraction functionality. Grouped with addition so that either operation counts as a key press
```
9 +           // Display will be 9
8 - 5 -       // Display will be 3
9 - 5 +       // Display will be 4
9 + 9 + + + + // Display will be 18
5 + 3 x 6 +   // Display will be 23
```
- 'x' : Display varies as follows:
  - 1st key press - Most recently entered number
  - Subsequent key presses: Displays result of most recent multiplication operation
  - Repeated key presses maintain the display until another number has been entered
- '&#247;' : Same display rules as multiplication button, but with division functionality. Grouped with multiplication so that either operation counts as a key press

```
9 x         // Display will be 9
3 x 5 x     // Display will be 15
6 / 3 x     // Display will be 2
4 + 3 x 6 x // Display will be 18
```
##### Order of operations
The Mac Calculator follows an order of operations where multiplication and division are given precedence over addition and subtraction. The Mac Calculator will follow the order of operations as long as '=' has not been pressed or '+'  or '-' has not been pressed twice. Below are examples that illustrate this concept:

```
2 * 5 + 3 = 7
3 + 5 x 2 = 13
3 + 5 x 6 x 2 + // This operation will be broken into steps below
3 + 5 x         // Display will be 5
6 x             // Display will be 30 (adding 3 is not evaluated yet)
2 +             // Display will be 63 (5 x 6 x 2 = 60, then add 3)
```
