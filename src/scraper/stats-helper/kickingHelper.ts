import { KickingStats } from "../../server/models/statTypes";
import { parseIntOrNull, parseFloatOrNull } from "../helperFunctions";

export function getKickingStats($: CheerioStatic): KickingStats{
    let kickingStats: KickingStats = {};
    const data = $('#kicking th > a');
    $(data).each((index: number, element: CheerioElement) => {
        const year: number = parseInt($(element).text());
        kickingStats[year] = {
            age: parseIntOrNull(getTableStat($, index, 'age')),
            team: getTableTeam($, index) === '' ? null : getTableTeam($, index),
            position: getTableStat($, index, 'pos') === '' ? null : getTableStat($, index, 'pos'),
            number: parseIntOrNull(getTableStat($, index, 'uniform_number')),
            games: parseIntOrNull(getTableStat($, index, 'g')),
            gamesStarted: parseIntOrNull(getTableStat($, index, 'gs')),
            fieldGoalAttempts_0_19: parseIntOrNull(getTableStat($, index, 'fga1')),
            fieldGoalMakes_0_19: parseIntOrNull(getTableStat($, index, 'fgm1')),
            fieldGoalAttempts_20_29: parseIntOrNull(getTableStat($, index, 'fga2')),
            fieldGoalMakes_20_29: parseIntOrNull(getTableStat($, index, 'fgm2')),
            fieldGoalAttempts_30_39: parseIntOrNull(getTableStat($, index, 'fga3')),
            fieldGoalMakes_30_39: parseIntOrNull(getTableStat($, index, 'fgm3')),
            fieldGoalAttempts_40_49: parseIntOrNull(getTableStat($, index, 'fga4')),
            fieldGoalMakes_40_49: parseIntOrNull(getTableStat($, index, 'fgm4')),
            fieldGoalAttempts_50_above: parseIntOrNull(getTableStat($, index, 'fgm5')),
            fieldGoalMakes_50_above: parseIntOrNull(getTableStat($, index, 'fgm5')),
            totalFieldGoalsAttempted: parseIntOrNull(getTableStat($, index, 'fga')),
            totalFieldGoalsMade: parseIntOrNull(getTableStat($, index, 'fgm')),
            longestFieldGoal: parseIntOrNull(getTableStat($, index, 'fg_long')),
            fieldGoalPct: parseFloatOrNull(getTableStat($, index, 'fg_perc')),
            xPtsAttempted: parseIntOrNull(getTableStat($, index, 'xpa')),
            xPtsMade: parseIntOrNull(getTableStat($, index, 'xpm')),
            xPtsPct: parseFloatOrNull(getTableStat($, index, 'xp_perc')),
            punts: parseIntOrNull(getTableStat($, index, 'punt')),
            puntingYards: parseIntOrNull(getTableStat($, index, 'punt_yds')),
            longestPunt: parseIntOrNull(getTableStat($, index, 'punt_long')),
            blockedPunts: parseIntOrNull(getTableStat($, index, 'punt_blocked')),
            yardsPerPunt: parseFloatOrNull(getTableStat($, index, 'punt_yds_per_punt')),
            approximateValue: parseFloatOrNull(getTableStat($, index, 'av'))
        };
    });
    return kickingStats;
}

function getTableStat($: CheerioStatic, index: number, stat: string): string{
    return $(`#kicking tbody tr:nth-child(${index + 1}) td[data-stat="${stat}"]`).text();
}

function getTableTeam($: CheerioStatic, index: number): string{
    return $(`#kicking tbody tr:nth-child(${index + 1}) td[data-stat="team"] > a`).attr('title');
}