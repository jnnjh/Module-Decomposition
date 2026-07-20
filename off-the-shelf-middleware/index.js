const express = require('express');
const morgan = require('morgan'); // off-the-shelf logging middleware (npm package)

const app = express();
const PORT = process.env.PORT || 3001;

// --- Off-the-shelf middleware: morgan -----------------------------------
// Replaces our hand-written "loggerMiddleware" with a well-tested,
// widely-used npm package that does the same job (request logging).
app.use(morgan('dev'));

// --- Custom Middleware: Response Time (kept from the original app) -----
function responseTimeMiddleware(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} took ${duration}ms`);
  });

  next();
}

app.use(responseTimeMiddleware);

// --- Routes -------------------------------------------------------------
app.get('/', (req, res) => {
  res.json({ message: 'Welcome! This app uses morgan (off-the-shelf) plus one custom middleware.' });
});

app.get('/about', (req, res) => {
  res.json({ message: 'Morgan handles logging; response time is still tracked with custom middleware.' });
});

app.listen(PORT, () => {
  console.log(`Off-the-shelf middleware app listening on port ${PORT}`);
});
