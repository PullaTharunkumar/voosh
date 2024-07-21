const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors')

const app = express();
app.use(express.json());

app.use(cors())
  

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
