/* eslint-disable no-console */
/* eslint-disable indent */
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

// Assignment 1
app.get('/sum', (req, res) => {
 
  const {a,b} = req.query;
  
  if(!a) {
    return res.send('A is required').status(400);
  }
  
  if(!b) {
    return res.status(400).send('B is required');
  }
  
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (Number.isNaN(numA)){
      return res.send('A has to be a number!').status(400);
  }

  if (Number.isNaN(numB)){
      return res.send('B has to be a number!').status(400);
  }
  
  const c = numA + numB;

  const resString = `The sum of ${numA} and ${numB} is ${c}`;
  
  res.send(resString).status(200);
});

// Assignment 2
app.get('/cipher', (req, res) => {

    const {text, shift} = req.query;

    if(!text) {
        return res.send('Text is required').status(400);
    }

    if(!shift) {
        return res.send('Shift is required').status(400);
    }

    const numberShift = parseFloat(shift);

    if(Number.isNaN(numberShift)) {
        return res.send('Shift has to be a number').status(400);
    }

    const start = 'A'.charCodeAt(0);

    const cipher = text.toUpperCase().split('').map(char => {
        
        const code = char.charCodeAt(0);

        if(code < start || code > (start +26)){
            return char;
        }

        let dif = code - start;

        dif = dif + numberShift;

        dif = dif % 26;

        const shiftCharacter = String.fromCharCode(start + dif);

        return shiftCharacter;
    })

    .join('');

    res.send(cipher).status(200);

});

//Assignment 3
app.get('/lotto', (req, res) => {

  const {numbers} = req.query;

  if(!numbers){
    return res.send('Numbers are required!').status(400);
  }

  if(!Array.isArray(numbers)){
    return res.send('Numbers has to be an array!').status(400);
  }

  const guess = numbers.map(n => parseInt(n)).filter(n => !Number.isNaN(n) && (n >= 1 && n <=20));

  //should it be !=6 or !==6 ?
  if(guess.length !== 6){
    return res.send('Numbers have to have six digits between 1-20').status(400);
  }

  const stockNum = Array(20).fill(1).map((_,i) => i+1);

  const winNumbers = [];
  for(let i=0; i<6; i++){
    const ran = Math.floor(Math.random()*stockNum.length);
    winNumbers.push(stockNum[ran]);
    stockNum.splice(ran,1);
  }

  let dif = winNumbers.filter(n => !guess.includes(n));

  let resText;

  switch(dif.length){
    case 0:
    resText = 'You just won a billion dollars!!!';
    break;
    case 1:
    resText = 'You just won 100 dollars!!';
    break;
    case 2:
    resText = 'You have won a free ticket!';
    break;
    default:
      resText = 'Sorry, you did not win any prizes';
  }

  res.send(resText);

});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

