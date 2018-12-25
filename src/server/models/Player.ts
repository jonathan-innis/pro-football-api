import { prop, Typegoose } from 'typegoose-es5';
import {Model, Document} from 'mongoose';
import { DraftInfo } from '../../constants';
import { QuarterBack, RunningBack, Receiver, OffensiveLine, DefensiveLine, DefensiveBackfield } from './playerTypes';
import { PassingStats } from './statTypes';

type Stats = {
    careerStats: CareerStats;
    yearlyStats: YearlyStats;
}

interface CareerStats {
    [position: string]: QuarterBack | RunningBack | Receiver | OffensiveLine | DefensiveLine | DefensiveBackfield;
}

interface YearlyStats{
    [type: string]: PassingStats;
}

export class Player extends Typegoose{
    @prop({required: true}) name?: string;

    @prop({required: true}) positions?: string[];

    @prop() height?: number;

    @prop() weight?: number;

    @prop() birthDate?: Date;

    @prop() birthPlace?: string;

    @prop({index: true}) colleges?: string[] | null;

    @prop() highSchool?: string | null;

    @prop() draftInfo?: DraftInfo | null;

    @prop({required: true}) hallOfFame?: boolean;

    @prop() gamesPlayed?: number;

    @prop() approximateValue?: number | null;

    @prop() stats?: Stats;
}

export const PlayerModel: Model<Document> = new Player().getModelForClass(Player);