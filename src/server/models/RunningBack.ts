import mongoose = require('mongoose');
import {prop} from 'typegoose';
import {Player} from './Player';
import {Model, Document} from 'mongoose';
import { MONGO_URL } from '../../constants';

mongoose.connect(MONGO_URL);

class RunningBack extends Player{
    @prop() attempts?: number;

    @prop() yards?: number;

    @prop() yardsPerAttempt?: number;

    @prop() touchdowns?: number;

    @prop({index: true}) fantasyPoints?: number;
}

export const RunningBackModel: Model<Document> = new RunningBack().getModelForClass(RunningBack);