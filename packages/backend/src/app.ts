import express, {Request, Response} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import boardsRouter from './routes/boardsRouter';
import tasksRouter from './routes/tasksRouter';
import config from './config/config';
import { logErrors, wrapErrors, errorHandler, notFoundMiddleware as notFound } from './utils/middlewares/errorMiddlewares';

const app = express();
const PORT = config.port;

app.use(cors());
app.use(helmet());
app.use(express.json());

boardsRouter(app);
tasksRouter(app);

app.use(notFound);

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🌎`);
});