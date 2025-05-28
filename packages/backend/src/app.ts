import express, {Request, Response} from 'express';
import cors from 'cors';
import boardsRouter from './routes/boardsRouter';
import config from './config/config';

const app = express();
const PORT = config.port;

app.use(cors());
app.use(express.json());

boardsRouter(app)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🌎`);
});