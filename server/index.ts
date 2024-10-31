import express from 'express';
import holidaysRoute from './src/routes/holidays';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.CALENDARIFIC_API_KEY;

app.use(express.json());
app.use('/api/holidays', holidaysRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
