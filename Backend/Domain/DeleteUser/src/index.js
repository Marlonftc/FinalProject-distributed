const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/deleteuser.routes');
const connectToDatabase = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const startServer = async () => {
  try {
    const db = await connectToDatabase();
    app.locals.db = db;

    app.listen(process.env.PORT, () => {
      console.log(`🚀 DeleteUser service running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Fallo al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
