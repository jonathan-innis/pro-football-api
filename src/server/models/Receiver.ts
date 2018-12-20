import mongoose = require('mongoose');
import {prop} from 'typegoose';
import {Player} from './Player';
import {Model, Document} from 'mongoose';
import { MONGO_URL } from '../../constants';

mongoose.connect(MONGO_URL);

class Receiver extends Player{
    @prop() receptions?: number;

    @prop() yards?: number;

    @prop() yardsPerReception?: number;

    @prop() touchdowns?: number;

    @prop({index: true}) fantasyPoints?: number;
}

export const ReceiverModel: Model<Document> = new Receiver().getModelForClass(Receiver);