import { AllStats } from './statTypes';

export type OffensiveLine = {
    gamesStarted: number;
}

export type DefensiveLine = {
    sacks: number;
    forcedFumbles: number;
    tackles: number;
}

export type DefensiveBackfield = {
    interceptions: number;
    yards: number;
    touchdowns: number;
}

export type QuarterBack = {
    record: RecordData | null;
    completionPct: number | null;
    yards: number | null;
    yardsPerAttempt: number | null;
    touchdowns: number | null;
    interceptions: number | null;
    fantasyPoints: number | null;
}

export type Receiver = {
    receptions: number | null;
    yards: number | null;
    yardsPerReception: number | null;
    touchdowns: number | null;
    fantasyPoints: number | null;
}

export type RunningBack = {
    attempts: number;
    yards: number;
    yardsPerAttempt: number;
    touchdowns: number;
    fantasyPoints: number;
}

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
    stats: AllStats;
}

export type RecordData = {
    won: number,
    lost: number,
    tied: number
}