import {prop} from 'typegoose-es5';
import { Player } from "./Player";
import {Model, Document} from 'mongoose';
import { parseIntOrNull, getSummaryData, parseFloatOrNull } from '../../scraper/helperFunctions';

export class Receiver extends Player{
    @prop() receptions?: number | null;
    @prop() yards?: number | null;
    @prop() yardsPerReception?: number | null;
    @prop() touchdowns?: number | null;
    @prop() fantasyPoints?: number | null;

    static getData($: CheerioStatic){
        const receptions = parseIntOrNull(getSummaryData($, 1));
        const yards = parseIntOrNull(getSummaryData($, 2));
        const yardsPerReception = parseFloatOrNull(getSummaryData($, 3));
        const touchdowns = parseIntOrNull(getSummaryData($, 4));
        const fantasyPoints = parseFloatOrNull(getSummaryData($, 5));
        return {receptions, yards, yardsPerReception, touchdowns, fantasyPoints};
    }
}

export const ReceiverModel: Model<Document> = new Receiver().getModelForClass(Receiver, {schemaOptions: {collection: 'players'}});