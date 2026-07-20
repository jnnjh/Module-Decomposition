const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Custom Middleware 1: Logger -------------------------------------
// Logs the HTTP method, URL, and a timestamp for every incoming request.
function loggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next(); // pass control to the next middleware/route handler
}

// --- Custom Middleware 2: Response Time -------------------------------
// Measures how long each request takes to process and logs it once
// the response has finished sending.
function responseTimeMiddleware(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} took ${duration}ms`);
  });

  next();
}

// Register both custom middlewares (they run in this order, for every request)
app.use(loggerMiddleware);
app.use(responseTimeMiddleware);

// --- Routes -------------------------------------------------------------
app.get('/', (req, res) => {
  res.json({ message: 'Welcome! This app uses two custom-written middlewares.' });
});

app.get('/about', (req, res) => {
  res.json({ message: 'Logger + Response Time middlewares are active on this app.' });
});

app.listen(PORT, () => {
  console.log(`Custom middleware app listening on port ${PORT}`);
});
