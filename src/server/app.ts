import express = require('express');
import mongoose = require('mongoose');
import {MONGO_URL} from '../types/constants';

import {WelcomeController} from './controllers';

const app: express.Application = express();
const port: number = 3000;

app.use('./welcome', WelcomeController);

mongoose.connect(MONGO_URL, {useNewUrlParser: true}).then(() => {
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    })
})