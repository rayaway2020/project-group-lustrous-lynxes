import express from 'express';
import mongoose from 'mongoose';
import routes from '../src/routes/index.js';
import { fileURLToPath } from 'url';
import path from 'path';
import YoutubeMusicApi from 'youtube-music-api';

const app = express();
const port = process.env.PORT || 3001;
const api = new YoutubeMusicApi();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/search', (req, res) => {
    const searchQuery = req.query.search_query;
    api.initalize().then(info => {
        api.search(searchQuery, 'song').then(result => {
            res.send(result.content);
        });
    });
});

mongoose
    .connect('mongodb://localhost:27017/MusicApp', { useNewUrlParser: true })
    .then(() =>
        app.listen(port, () =>
            console.log(`App server listening on port ${port}!`)
        )
    );
