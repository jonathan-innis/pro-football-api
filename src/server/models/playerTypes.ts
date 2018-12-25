import { RecordData } from "../../constants";

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
    receptions: number;
    yards: number;
    yardsPerReception: number;
    touchdowns: number;
    fantasyPoints: number;
}

export type RunningBack = {
    attempts: number;
    yards: number;
    yardsPerAttempt: number;
    touchdowns: number;
    fantasyPoints: number;
}