import express from 'express';
import {pool} from "./db/pool";
import authRouter from "./routes/auth.routes";
import postRouter from "./routes/post.routes";
import commentRouter from "./routes/comment.routes";

const app = express();

app.use(express.json());
app.use('/auth', authRouter)
app.use('/post', postRouter);
app.use('/post/:postId/comments', commentRouter);

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