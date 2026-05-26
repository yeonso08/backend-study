import express from 'express';
import {pool} from "./db/pool";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use('/auth', authRouter)

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = 4000;

const startServer = async () => {
    try {
        await pool.query('SELECT NOW()');

        console.log('DB connected');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('DB connection failed', error);
    }
};

startServer();