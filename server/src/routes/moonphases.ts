// server/routes/moonphases.ts
import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();

// Types
interface MoonPhase {
  phase_name: string;
  date: string;
}

interface MoonPhaseResponse {
  phases: MoonPhase[];
}

router.get('/', async (req: Request, res: Response) => {
  try {
    const date = req.query.date as string || '2024-01-01';
    const response = await fetch(`https://api.moonphase.com/endpoint?api_key=${process.env.MOON_PHASE_API_KEY}&date=${date}`);
    const data: MoonPhaseResponse = await response.json() as MoonPhaseResponse;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch moon phases' });
  }
});

export default router;

