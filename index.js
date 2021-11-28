const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config('.env');

const PORT = process.env.PORT || 5000;

const app = express();

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS, // 10min
  max: process.env.RATE_LIMIT_MAX
});

// Rate limiting
if (process.env.NODE_ENV === "production") {
  app.use('/api/', limiter);
}

app.set('trust proxy', 1);

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static('client/public'))

// Routes
app.use('/api', require('./routes'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));