const express = require('express');
require('./config/db');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const settingsRoutes = require('./routes/usersettings.routes');
app.use('/api/settings', settingsRoutes);

const setupSwagger = require('./swagger');
setupSwagger(app); // <-- Ponlo después de las rutas

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`UserSettings running on port ${PORT}`));
