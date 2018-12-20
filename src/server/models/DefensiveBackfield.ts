import mongoose = require('mongoose');
import {prop} from 'typegoose';
import {Player} from './Player';
import {Model, Document} from 'mongoose';
import { MONGO_URL } from '../../constants';

mongoose.connect(MONGO_URL);

export class DefensiveBackField extends Player{
    @prop() interceptions?: number;

    @prop() yards?: number;

    @prop() touchdowns?: number;
}

export const DefensiveBackFieldModel: Model<Document> = new DefensiveBackField().getModelForClass(DefensiveBackField);