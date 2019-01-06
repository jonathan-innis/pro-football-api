import { Stats } from "./stat-types";

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
    birthPlace: string | null;
    colleges: string[] | null;
    highSchool: string | null;
    draftInfo: DraftInfo | null;
    hallOfFame: boolean;
    gamesPlayed: number;
    approximateValue: number | null;
    stats: Stats;
}

export type RecordData = {
    won: number,
    lost: number,
    tied: number
}