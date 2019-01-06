import {prop} from 'typegoose-es5';
import { Player } from "./Player";
import {Model, Document} from 'mongoose';
import { parseIntOrNull, getSummaryData } from '../../scraper/helper-functions';

export class Kicker extends Player{
    @prop() fieldGoalMakes?: number | null;
    @prop() fieldGoalAttempts?: number | null;
    @prop() extraPointMakes?: number | null;
    @prop() extraPointAttempts?: number | null;

    static getData($: CheerioStatic){
        const fieldGoalMakes: number | null = parseIntOrNull(getSummaryData($, 1));
        const fieldGoalAttempts: number | null = parseIntOrNull(getSummaryData($, 2));
        const extraPointMakes: number | null = parseIntOrNull(getSummaryData($, 3));
        const extraPointAttempts: number | null = parseIntOrNull(getSummaryData($, 4));
        return {fieldGoalMakes, fieldGoalAttempts, extraPointMakes, extraPointAttempts};
    }
}

export const KickerModel: Model<Document> = new Kicker().getModelForClass(Kicker, {schemaOptions: {collection: 'players'}});