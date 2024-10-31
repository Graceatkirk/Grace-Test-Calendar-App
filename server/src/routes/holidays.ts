// server/routes/holidays.ts
import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();

// Types
interface Holiday {
  name: string;
  description: string;
  date: {
    iso: string;
    datetime: {
      year: number;
      month: number;
      day: number;
    };
  };
}

interface CalendarificResponse {
  response: {
    holidays: Holiday[];
  };
}

router.get('/', async (req: Request, res: Response) => {
  try {
    const response = await fetch(`https://calendarific.com/api/v2/holidays?api_key=aQZGn0v589N9AT68YoL7RaduBoyiUAG9&country=US&year=2024`);
    const data: CalendarificResponse = await response.json() as CalendarificResponse;
    res.json(data.response.holidays);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch holidays' });
  }
});

export default router;
