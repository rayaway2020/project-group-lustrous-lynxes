import express from 'express';
import mongoose from 'mongoose';
import routes from '../src/routes/index.js';
import YoutubeMusicApi from 'youtube-music-api';

const app = express();
const port = process.env.PORT || 3001;
const api = new YoutubeMusicApi();

app.use(express.json());

app.use('/', routes);


app.get('/', (req, res) => res.send('Hello World!'));



app.get('/search', (req, res) => {
    const searchQuery = req.query.search_query;
    api.initalize().then(info => {
        api.search(searchQuery, "song").then(result => {
            res.send(result.content);
        })
    })
});

mongoose.connect('mongodb://localhost:27017/MusicApp', { useNewUrlParser: true })
    .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));