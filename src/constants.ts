export const MONGO_URL = 'mongodb://localhost:27017/football';

export type DraftInfo = {
    team: string;
    round: number;
    overall: number;
    year: number;
}

export type PlayerInfo = {
    name: string;
    positions: string[];
    height: number;
    weight: number;
    birthDate: Date;
    birthPlace: string;
    colleges: string[] | null;
    highSchool: string | null;
    draftInfo: DraftInfo | null;
    hallOfFame: boolean;
    gamesPlayed: number;
    approximateValue: number | null;
}

export type RecordData = {
    won: number,
    lost: number,
    tied: number
}