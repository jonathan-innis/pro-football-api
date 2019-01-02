import { PassingStats } from "../../types/statTypes";
import { parseRecord, parseFloatOrNull, parseIntOrNull } from "../helperFunctions";

export function getPassingStats($: CheerioStatic): PassingStats{
    let passingStats: PassingStats = {};
    const data = $('#passing th > a');
    $(data).each((index: number, element: CheerioElement) => {
        const year: number = parseInt($(element).text());
        passingStats[year] = {
            age: parseIntOrNull(getTableStat($, index, 'age')),
            team: getTableTeam($, index) === '' ? null : getTableTeam($, index),
            position: getTableStat($, index, 'pos') === '' ? null : getTableStat($, index, 'pos'),
            number: parseIntOrNull(getTableStat($, index, 'uniform_number')),
            games: parseIntOrNull(getTableStat($, index, 'g')),
            gamesStarted: parseIntOrNull(getTableStat($, index, 'gs')),
            record: parseRecord(getTableStat($, index, 'qb_rec')),
            completions: parseIntOrNull(getTableStat($, index, 'pass_cmp')),
            attempts: parseIntOrNull(getTableStat($, index, 'pass_att')),
            completionPct: parseFloatOrNull(getTableStat($, index, 'pass_cmp_perc')),
            yards: parseIntOrNull(getTableStat($, index, 'pass_yds')),
            touchdowns: parseIntOrNull(getTableStat($, index, 'pass_td')),
            touchdownPct: parseFloatOrNull(getTableStat($, index, 'pass_td_perc')),
            interceptions: parseIntOrNull(getTableStat($, index, 'pass_int')),
            interceptionPct: parseFloatOrNull(getTableStat($, index, 'pass_int_perc')),
            long: parseIntOrNull(getTableStat($, index, 'pass_long')),
            yardsPerAttempt: parseFloatOrNull(getTableStat($, index, 'pass_yds_per_att')),
            adjustedNetYardsPerAttempt: parseFloatOrNull(getTableStat($, index, 'pass_adj_yds_per_att')),
            yardsPerCompletion: parseFloatOrNull(getTableStat($, index, 'pass_yds_per_cmp')),
            yardsPerGame: parseFloatOrNull(getTableStat($, index, 'pass_yds_per_g')),
            quarterbackRating: parseFloatOrNull(getTableStat($, index, 'pass_rating')),
            sacks: parseIntOrNull(getTableStat($, index, 'pass_sacked')),
            yardsLostDueToSacks: parseFloatOrNull(getTableStat($, index, 'pass_sacked_yds')),
            netYardsPerAttempt: parseFloatOrNull(getTableStat($, index, 'pass_net_yds_per_att')),
            adjustedYardsPerAttempt: parseFloatOrNull(getTableStat($, index, 'pass_adj_net_yds_per_att')),
            pctTimesSacked: parseFloatOrNull(getTableStat($, index, 'pass_sacked_perc')),
            fourthQuarterComebacks: parseIntOrNull(getTableStat($, index, 'comebacks')),
            gameWinningDrives: parseIntOrNull(getTableStat($, index, 'gwd'))
        };
    });
    return passingStats;
}

function getTableStat($: CheerioStatic, index: number, stat: string): string{
    return $(`#passing tbody tr:nth-child(${index + 1}) td[data-stat="${stat}"]`).text();
}

function getTableTeam($: CheerioStatic, index: number): string{
    return $(`#passing tbody tr:nth-child(${index + 1}) td[data-stat="team"] > a`).attr('title');
}