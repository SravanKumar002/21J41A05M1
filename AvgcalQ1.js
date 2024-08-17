const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

// number arrays
const validateNumberArray = (req, res, next) => {
  const { numbers } = req.body;

  if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
    return res
      .status(400)
      .json({ error: "Numbers array is required and must not be empty" });
  }

  next();
};
//hello
//  calculate the average of numbers
app.post("/numbers/average", validateNumberArray, (req, res) => {
  const { numbers } = req.body;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;

  res.json({
    numbers,
    avg: average,
  });
});

//  even numbers
app.post("/numbers/even", validateNumberArray, (req, res) => {
  const { numbers } = req.body;
  const evenNumbers = numbers.filter((num) => num % 2 === 0);

  res.json({
    evenNumbers,
  });
});

// Get random numbers from a list
const getRandomNumbersFromList = (list, count) => {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * list.length);
    randomNumbers.push(list[randomIndex]);
  }
  return randomNumbers;
};

//  Fibonacci sequence
const generateFibonacci = (n) => {
  if (n <= 0) return [];
  const fib = [0, 1];
  while (fib.length < n) {
    const nextNumber = fib[fib.length - 1] + fib[fib.length - 2];
    fib.push(nextNumber);
  }
  return fib.slice(0, n);
};

// Fibonacci sequence
app.post("/numbers/fibonacci", (req, res) => {
  const { count } = req.body;

  if (typeof count !== "number" || count <= 0) {
    return res.status(400).json({ error: "Count must be a positive number" });
  }

  const fibonacciNumbers = generateFibonacci(count);

  res.json({
    count,
    fibonacciNumbers,
  });
});

// get random numbers from a list
app.post("/numbers/random", validateNumberArray, (req, res) => {
  const { numbers, count } = req.body;

  if (typeof count !== "number" || count <= 0) {
    return res.status(400).json({ error: "Positive count is required" });
  }

  const randomNumbers = getRandomNumbersFromList(numbers, count);

  res.json({
    randomNumbers,
  });
});

// Prime numbers

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
};

// Endpoint to check if a number is prime
app.post("/numbers/prime", (req, res) => {
  const { number } = req.body;

  if (typeof number !== "number") {
    return res.status(400).json({ error: "A valid number is required" });
  }

  const result = isPrime(number);

  res.json({
    number,
    isPrime: result,
  });
});
