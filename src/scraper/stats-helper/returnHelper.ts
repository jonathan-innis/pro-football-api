import { ReturnStats } from "../../server/models/statTypes";
import { parseFloatOrNull, parseIntOrNull } from "../helperFunctions";

export function getReturnStats($: CheerioStatic): ReturnStats{
    let returnStats: ReturnStats = {};
    const data = $('#returns th > a');
    $(data).each((index: number, element: CheerioElement) => {
        const year: number = parseInt($(element).text());
        returnStats[year] = {
            age: parseIntOrNull(getTableStat($, index, 'age')),
            team: getTableTeam($, index) === '' ? null : getTableTeam($, index),
            position: getTableStat($, index, 'pos') === '' ? null : getTableStat($, index, 'pos'),
            number: parseIntOrNull(getTableStat($, index, 'uniform_number')),
            games: parseIntOrNull(getTableStat($, index, 'g')),
            gamesStarted: parseIntOrNull(getTableStat($, index, 'gs')),
            puntReturns: parseIntOrNull(getTableStat($, index, 'punt_ret')),
            puntReturnYards: parseIntOrNull(getTableStat($, index, 'punt_ret_yds')),
            puntReturnTouchdowns: parseIntOrNull(getTableStat($, index, 'punt_ret_td')),
            puntReturnLong: parseIntOrNull(getTableStat($, index, 'punt_ret_long')),
            yardsPerPuntReturn: parseFloatOrNull(getTableStat($, index, 'punt_ret_yds_per_ret')),
            kickReturns: parseIntOrNull(getTableStat($, index, 'kick_ret')),
            kickReturnYards: parseIntOrNull(getTableStat($, index, 'kick_ret_yds')),
            kickReturnTouchdowns: parseIntOrNull(getTableStat($, index, 'kick_ret_td')),
            kickReturnLong: parseIntOrNull(getTableStat($, index, 'kick_ret_long')),
            yardsPerKickReturn: parseFloatOrNull(getTableStat($, index, 'kick_ret_yds_per_ret')),
            allPurposeYards: parseFloatOrNull(getTableStat($, index, 'all_purpose_yds'))
        };
    });
    return returnStats;
}

function getTableStat($: CheerioStatic, index: number, stat: string): string{
    return $(`#returns tbody tr:nth-child(${index + 1}) td[data-stat="${stat}"]`).text();
}

function getTableTeam($: CheerioStatic, index: number): string{
    return $(`#returns tbody tr:nth-child(${index + 1}) td[data-stat="team"] > a`).attr('title');
}