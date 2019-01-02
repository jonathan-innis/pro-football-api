import {prop} from 'typegoose-es5';
import { Player } from "./Player";
import {Model, Document} from 'mongoose';
import { parseIntOrNull, getSummaryData, parseFloatOrNull } from '../../scraper/helperFunctions';

export class Returner extends Player{
    @prop() returns?: number | null;
    @prop() yards?: number | null;
    @prop() touchdowns?: number | null;

    static getData($: CheerioStatic){
        const returns: number | null = parseIntOrNull(getSummaryData($, 1));
        const yards: number | null = parseIntOrNull(getSummaryData($, 2));
        const touchdowns: number | null = parseIntOrNull(getSummaryData($, 3));
        return {returns, yards, touchdowns};
    }
}

export const ReturnerModel: Model<Document> = new Returner().getModelForClass(Returner, {schemaOptions: {collection: 'players'}});