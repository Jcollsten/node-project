import express from 'express';
import routes from './routes/index';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS
dotenv.config();
const app = express();
// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
}));
app.use(bodyParser.json());
app.use('/api', routes);
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
