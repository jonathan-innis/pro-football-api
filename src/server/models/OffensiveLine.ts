import {prop} from 'typegoose-es5';
import { Player } from "./Player";
import {Model, Document} from 'mongoose';
import { parseIntOrNull, getSummaryData } from '../../scraper/helper-functions';

export class OffensiveLine extends Player{
    @prop() gamesStarted?: number | null;

    static getData($: CheerioStatic){
        const gamesStarted: number | null = parseIntOrNull(getSummaryData($, 1));
        return {gamesStarted};
    }
}

export const OffensiveLineModel: Model<Document> = new OffensiveLine().getModelForClass(OffensiveLine, {schemaOptions: {collection: 'players'}});