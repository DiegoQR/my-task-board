import express, {Request, Response} from 'express';
import cors from 'cors';
import boardsRouter from './routes/boardsRouter';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

boardsRouter(app)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🌎`);
});