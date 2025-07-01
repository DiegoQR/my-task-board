import express, {Request, Response} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import boardsRouter from './routes/boardsRouter';
import tasksRouter from './routes/tasksRouter';
import config from './config/config';

const app = express();
const PORT = config.port;

app.use(cors());
app.use(helmet());
app.use(express.json());

boardsRouter(app);
tasksRouter(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🌎`);
});