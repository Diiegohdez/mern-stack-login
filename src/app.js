import express, { json } from "express";
import morgan  from "morgan";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();


//http://localhost:5173
app.use(cors({
    origin: 'https://fastidious-cannoli-b879a6.netlify.app',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);




export default app;