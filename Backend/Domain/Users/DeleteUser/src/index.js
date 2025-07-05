const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/deleteuser.routes');
const connectToDatabase = require('./config/db');
const { setupSwagger } = require('./swagger'); // 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger route
setupSwagger(app); // 

// Main routes
app.use('/api/users', userRoutes);

const startServer = async () => {
  try {
    const db = await connectToDatabase();
    app.locals.db = db;

    app.listen(process.env.PORT, () => {
      console.log(`DeleteUser service running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(' Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
