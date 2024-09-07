const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('./config/passport');
const db = require('./models/db');
const routes = require('./routes/routes');
const { swaggerUi, specs } = require('./config/swagger');
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser'); // Import body-parser
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

// Middleware for logging HTTP requests
app.use(morgan('dev'));

// Middleware for enabling CORS
app.use(cors());

// Optionally, configure CORS with specific options
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware for session management
app.use(session({
    secret: process.env.SESSION_SECRET, // Use environment variable for the secret key
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use('/api/v1', routes);

// Serve API documentation using Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Sync database and start the server
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});