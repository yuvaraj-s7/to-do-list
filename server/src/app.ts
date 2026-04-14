import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import eventRoutes from './routes/eventRoutes';
import chatRoutes from './routes/chatRoutes';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import { swaggerSpec } from './config/swagger';

export const app = express();
app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todoRoutes);
app.use('/events', authMiddleware, eventRoutes);
app.use('/chat', authMiddleware, chatRoutes);

app.use(errorHandler);
