import { RecordData } from "./player-types";

export interface Stats{
    [type: string]: PassingStats | RushingReceivingStats | DefenseStats | KickingStats | ReturnStats;
}

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

export interface DefenseStats{
    [year: number]: {
        age: number | null,
        team: string | null,
        position: string | null,
        number: number | null,
        games: number | null,
        gamesStarted: number | null,
        interceptions: number | null,
        interceptionYards: number | null,
        interceptionTouchdowns: number | null,
        interceptionLong: number | null,
        passesDefended: number | null,
        forcedFumbles: number | null,
        fumbles: number | null,
        fumblesRecovered: number | null,
        fumbleYards: number | null,
        fumbleTouchdowns: number | null,
        sacks: number | null,
        totalTackles: number | null,
        soloTackles: number | null,
        assistedTackles: number | null,
        tacklesForLoss: number | null,
        quarterbackHits: number | null,
        safeties: number | null
    }
}

export interface KickingStats{
    [year: number]:{
        age: number | null,
        team: string | null,
        position: string | null,
        number: number | null,
        games: number | null,
        gamesStarted: number | null,
        fieldGoalAttempts_0_19: number | null,
        fieldGoalMakes_0_19: number | null,
        fieldGoalAttempts_20_29: number | null,
        fieldGoalMakes_20_29: number | null,
        fieldGoalAttempts_30_39: number | null,
        fieldGoalMakes_30_39: number | null,
        fieldGoalAttempts_40_49: number | null,
        fieldGoalMakes_40_49: number | null,
        fieldGoalAttempts_50_above: number | null,
        fieldGoalMakes_50_above: number | null,
        totalFieldGoalsAttempted: number | null,
        totalFieldGoalsMade: number | null,
        longestFieldGoal: number | null,
        fieldGoalPct: number | null,
        xPtsAttempted: number | null,
        xPtsMade: number | null,
        xPtsPct: number | null,
        punts: number | null,
        puntingYards: number | null,
        longestPunt: number | null,
        blockedPunts: number | null,
        yardsPerPunt: number | null,
        approximateValue: number | null
    }
}

export interface ReturnStats{
    [year: number]:{
        age: number | null,
        team: string | null,
        position: string | null,
        number: number | null,
        games: number | null,
        gamesStarted: number | null,
        puntReturns: number | null,
        puntReturnYards: number | null,
        puntReturnTouchdowns: number | null,
        puntReturnLong: number | null,
        yardsPerPuntReturn: number | null,
        kickReturns: number | null,
        kickReturnYards: number | null,
        kickReturnTouchdowns: number | null,
        kickReturnLong: number | null,
        yardsPerKickReturn: number | null,
        allPurposeYards: number | null
    }
}
