import {prop} from 'typegoose-es5';
import { Player } from "./Player";
import {Model, Document} from 'mongoose';
import { RecordData } from '../../types/playerTypes';
import { parseRecord, parseFloatOrNull, parseIntOrNull, getSummaryData } from '../../scraper/helperFunctions';

export class QuarterBack extends Player{
    @prop() record?: RecordData | null;
    @prop() completionPct?: number | null;
    @prop() yards?: number | null;
    @prop() yardsPerAttempt?: number | null;
    @prop() touchdowns?: number | null;
    @prop() interceptions?: number | null;
    @prop() fantasyPoints?: number | null;

    static getData($: CheerioStatic){
        const record: RecordData | null = parseRecord(getSummaryData($, 1));
        const completionPct: number | null = parseFloatOrNull(getSummaryData($, 2));
        const yards: number | null = parseIntOrNull(getSummaryData($, 3));
        const yardsPerAttempt: number | null = parseFloatOrNull(getSummaryData($, 4));
        const touchdowns: number | null = parseIntOrNull(getSummaryData($, 5));
        const interceptions: number | null = parseIntOrNull(getSummaryData($, 6));
        const fantasyPoints: number | null = parseIntOrNull(getSummaryData($, 7));
        return {record, completionPct, yards, yardsPerAttempt, touchdowns, interceptions, fantasyPoints};
    }
}

export const QuarterBackModel: Model<Document> = new QuarterBack().getModelForClass(QuarterBack, {schemaOptions: {collection: 'players'}});