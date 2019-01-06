import {prop} from 'typegoose-es5';
import { Player } from "./Player";
import {Model, Document} from 'mongoose';
import { parseFloatOrNull, getSummaryData, parseIntOrNull } from '../../scraper/helper-functions';

export class DefensiveLine extends Player{
    @prop() sacks?: number | null;
    @prop() soloTackles?: number | null;
    @prop() forcedFumbles?: number | null;

    static getData($: CheerioStatic){
        const sacks: number | null = parseFloatOrNull(getSummaryData($, 1));
        const soloTackles: number | null = parseIntOrNull(getSummaryData($, 2));
        const forcedFumbles: number | null = parseIntOrNull(getSummaryData($, 3));
        return {sacks, soloTackles, forcedFumbles};
    }
}

export const DefensiveLineModel: Model<Document> = new DefensiveLine().getModelForClass(DefensiveLine, {schemaOptions: {collection: 'players'}});