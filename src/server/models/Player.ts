import { prop, Typegoose } from 'typegoose-es5';
import {Model, Document} from 'mongoose';
import { DraftInfo } from '../../types/playerTypes';
import { Stats } from '../../types/statTypes';

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

export const PlayerModel: Model<Document> = new Player().getModelForClass(Player, {schemaOptions: {collection: 'players'}});