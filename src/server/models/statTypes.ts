import { RecordData } from "../../constants";

export interface PassingStats{
    [year: number]: {
        age: number,
        team: string,
        position: string,
        number: number,
        games: number,
        record: RecordData,
        completions: number,
        attempts: number,
        completionPct: number,
        yards: number,
        touchdowns: number,
        touchdownPct: number,
        interceptions: number,
        interceptionPct: number,
        longestPass: number,
        yardsPerAttempt: number,
        adjustedYardsPerAttempt: number,
        yardsPerCompletion: number,
        yardsPerGame: number,
        quarterbackRating: number,
        sacks: number,
        yardsLostDueToSacks: number,
        netYardsPerAttempt: number,
        adjustedNetYardsPerAttempt: number,
        pctTimesSacked: number,
        fourthQuarterComebacks: number,
        gameWinningDrives: number,
        approximateValue: number
    }
}