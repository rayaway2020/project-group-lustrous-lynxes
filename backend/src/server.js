import express from 'express';
import mongoose from 'mongoose';
import routes from '../src/routes/index.js';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/', (req, res) => res.send('Hello World!'));

mongoose
    .connect('mongodb://localhost:27017/MusicApp', { useNewUrlParser: true })
    .then(() =>
        app.listen(port, () =>
            console.log(`App server listening on port ${port}!`)
        )
    );
