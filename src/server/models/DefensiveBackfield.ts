import {prop} from 'typegoose-es5';
import { Player } from "./Player";
import {Model, Document} from 'mongoose';
import { parseIntOrNull, getSummaryData } from '../../scraper/helperFunctions';

export class DefensiveBackfield extends Player{
    @prop() interceptions?: number | null;
    @prop() yards?: number | null;
    @prop() touchdowns?: number | null;
    
    static getData($: CheerioStatic){
        const interceptions: number | null = parseIntOrNull(getSummaryData($, 1));
        const yards: number | null = parseIntOrNull(getSummaryData($, 2));
        const touchdowns: number | null = parseIntOrNull(getSummaryData($, 3));
        return {interceptions, yards, touchdowns};
    }
}

export const DefensiveBackfieldModel: Model<Document> = new DefensiveBackfield().getModelForClass(DefensiveBackfield, {schemaOptions: {collection: 'players'}});