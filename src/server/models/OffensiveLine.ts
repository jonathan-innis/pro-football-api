import mongoose = require('mongoose');
import {prop} from 'typegoose';
import {Player} from './Player';
import {Model, Document} from 'mongoose';
import { MONGO_URL } from '../../constants';

mongoose.connect(MONGO_URL);

class OffensiveLine extends Player{
    @prop() gamesStarted?: number;
}

export const OffensiveLineModel: Model<Document> = new OffensiveLine().getModelForClass(OffensiveLine);