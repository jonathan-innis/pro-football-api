import mongoose = require('mongoose');
import {prop} from 'typegoose';
import {Player} from './Player';
import {Model, Document} from 'mongoose';
import { MONGO_URL } from '../../constants';

mongoose.connect(MONGO_URL);

class DefensiveLine extends Player{
    @prop() sacks?: number;

    @prop() tackles?: number;

    @prop() forcedFumbles?: number;
}

export const DefensiveLineModel: Model<Document> = new DefensiveLine().getModelForClass(DefensiveLine);