import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from '../src/routes/index.js';
import 'dotenv/config'


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/', routes);


mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true })
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on port ${PORT}!`)
        )
    )
    .catch((err) => console.log(err.message));
