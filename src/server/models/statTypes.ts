import { RecordData } from "../../constants";
import { longStackTraces } from "bluebird";
import { getApproximateValue } from "../../scraper/player-helper/playerHelper";

export interface PassingStats{
    [year: number]: {
        age: number | null,
        team: string | null,
        position: string | null,
        number: number | null,
        games: number | null,
        gamesStarted: number | null,
        record: RecordData | null,
        completions: number | null,
        attempts: number | null,
        completionPct: number | null,
        yards: number | null,
        touchdowns: number | null,
        touchdownPct: number | null,
        interceptions: number | null,
        interceptionPct: number | null,
        long: number | null,
        yardsPerAttempt: number | null,
        adjustedYardsPerAttempt: number | null,
        yardsPerCompletion: number | null,
        yardsPerGame: number | null,
        quarterbackRating: number | null,
        sacks: number | null,
        yardsLostDueToSacks: number | null,
        netYardsPerAttempt: number | null,
        adjustedNetYardsPerAttempt: number | null,
        pctTimesSacked: number | null,
        fourthQuarterComebacks: number | null,
        gameWinningDrives: number | null
    }
}

export interface RushingReceivingStats{
    [year: number]: {
        age: number | null,
        team: string | null,
        position: string | null,
        number: number | null,
        games: number | null,
        gamesStarted: number | null,
        rushingAttempts: number | null,
        rushingYards: number | null,
        rushingTouchdowns: number | null,
        long: number | null,
        yardsPerAttempt: number | null,
        rushingYardsPerGame: number | null,
        rushingAttemptsPerGame: number | null,
        receptions: number | null,
        receivingYards: number | null,
        yardsPerReception: number | null,
        receivingTouchdowns: number | null,
        receptionsPerGame: number | null,
        receivingYardsPerGame: number | null,
        touches: number | null,
        yardsPerTouch: number | null,
        yardsFromScrimmage: number | null,
        totalTouchdowns: number | null,
        fumbles: number | null,
        approximateValue: number | null
    }
}