import { prop, index, Typegoose } from 'typegoose';

export type DraftInfo = {
    team: string,
    round: number,
    overall: number,
    year: Date
}

export type RecordData = {
    won: number,
    lost: number,
    tied: number
}

@index({name: 'text'})
export abstract class Player extends Typegoose{
    @prop({required: true, index: true}) name?: string;

    @prop({required: true, index: true}) position?: string;

    @prop() height?: number;

    @prop() weight?: number;

    @prop() birthDate?: Date;

    @prop() birthPlace?: string;

    @prop({index: true}) college?: string;

    @prop() highSchool?: string;

    @prop() draft?: DraftInfo;

    @prop({index: true}) hallOfFame?: boolean;

    @prop() gamesPlayed?: number;

    @prop() approximateValue?: number;
}