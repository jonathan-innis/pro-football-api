import mongoose = require('mongoose');
import {prop} from 'typegoose';
import {Player, RecordData} from './Player';
import {Model, Document} from 'mongoose';
import { MONGO_URL } from '../../constants';

mongoose.connect(MONGO_URL);

class QuarterBack extends Player{
    @prop() record?: RecordData;

    @prop({index: true}) completionPct?: number;

    @prop() yards?: number;

    @prop() yardsPerAttempt?: number;

    @prop() touchdowns?: number;

    @prop() interceptions?: number;

    @prop({index: true}) fantasyPoints?: number;
}

export const QuarterBackModel: Model<Document> = new QuarterBack().getModelForClass(QuarterBack);