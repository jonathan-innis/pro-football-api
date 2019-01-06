import {prop} from 'typegoose-es5';
import { Player } from "./Player";
import {Model, Document} from 'mongoose';
import { parseIntOrNull, getSummaryData, parseFloatOrNull } from '../../scraper/helper-functions';

export class RunningBack extends Player{
    @prop() attempts?: number | null;
    @prop() yards?: number | null;
    @prop() yardsPerAttempt?: number | null;
    @prop() touchdowns?: number | null;
    @prop() fantasyPoints?: number | null;

    static getData($: CheerioStatic){
        const attempts: number | null = parseIntOrNull(getSummaryData($, 1));
        const yards: number | null = parseIntOrNull(getSummaryData($, 2));
        const yardsPerAttempt: number | null = parseFloatOrNull(getSummaryData($, 3));
        const touchdowns: number | null = parseIntOrNull(getSummaryData($, 4));
        const fantasyPoints: number | null = parseFloatOrNull(getSummaryData($, 5));
        return {attempts, yards, yardsPerAttempt, touchdowns, fantasyPoints};
    }
}

export const RunningBackModel: Model<Document> = new RunningBack().getModelForClass(RunningBack, {schemaOptions: {collection: 'players'}});