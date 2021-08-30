const express = require('express');
const strings = require('./lib/strings');
const numbers = require('./lib/numbers');

const app = express();

app.use(express.json());

// strings
app.get('/strings/hello/world', (req, res) => {
  res.status(200).send({ result: strings.sayHello('world') });
});

app.get('/strings/hello/:string', (req, res) => {
  res.status(200).send({ result: strings.sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.status(200).send({ result: strings.uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.status(200).send({ result: strings.lowercase(req.params.string) });
});

app.get('/strings/first-character/:string', (req, res) => {
  res.status(200).send({ result: strings.firstCharacter(req.params.string, req.query.length) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  res.status(200).send({ result: strings.firstCharacters(req.params.string, req.query.length) });
});

// numbers
app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).send({ error: `Parameters must be valid numbers.` });
  } else {
    res.status(200).send({ result: numbers.add(a, b) });
  }
});

app.get('/numbers/subtract/:a/from/:b', (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).send({ error: `Parameters must be valid numbers.` });
  } else {
    res.status(200).send({ result: numbers.subtract(b, a) });
  }
});

app.post('/numbers/multiply', (req, res) => {
  if (!req.body.a || !req.body.b) {
    res.status(400).send({ error: `Parameters "a" and "b" are required.` });
  }
  const a = Number(req.body.a);
  const b = Number(req.body.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).send({ error: `Parameters "a" and "b" must be valid numbers.` });
  }
  res.status(200).send({ result: numbers.multiply(a, b) });
});

app.post('/numbers/divide', (req, res) => {
  if (req.body.a === undefined || req.body.b === undefined) {
    return res.status(400).send({ error: `Parameters "a" and "b" are required.` });
  }
  const a = Number(req.body.a);
  const b = Number(req.body.b);

  if (b === 0) {
    res.status(400).send({ error: `Unable to divide by 0.` });
  } else if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).send({ error: `Parameters "a" and "b" must be valid numbers.` });
  } else {
    res.status(200).send({ result: numbers.divide(a, b) });
  }
});

app.post('/numbers/remainder', (req, res) => {
  if (req.body.a === undefined || req.body.b === undefined) {
    return res.status(400).send({ error: `Parameters "a" and "b" are required.` });
  }
  const a = Number(req.body.a);
  const b = Number(req.body.b);

  if (b === 0) {
    res.status(400).send({ error: `Unable to divide by 0.` });
  } else if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).send({ error: `Parameters must be valid numbers.` });
  } else {
    res.status(200).send({ result: numbers.remainder(a, b) });
  }
});

module.exports = app;
