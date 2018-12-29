import { RushingReceivingStats } from "../../server/models/statTypes";
import { parseRecord, parseFloatOrNull, parseIntOrNull } from "../helperFunctions";

export function getRushingReceivingStats($: CheerioStatic): RushingReceivingStats{
    let rushingReceivingStats: RushingReceivingStats = {};
    const data = $('#rushing_and_receiving th > a');
    $(data).each((index: number, element: CheerioElement) => {
        const year: number = parseInt($(element).text());
        rushingReceivingStats[year] = {
            age: parseIntOrNull(getTableStat($, index, 'age')),
            team: getTableTeam($, index) === '' ? null : getTableTeam($, index),
            position: getTableStat($, index, 'pos') === '' ? null : getTableStat($, index, 'uniform_number'),
            number: parseIntOrNull(getTableStat($, index, 'uniform_number')),
            games: parseIntOrNull(getTableStat($, index, 'g')),
            gamesStarted: parseIntOrNull(getTableStat($, index, 'gs')),
            rushingAttempts: parseIntOrNull(getTableStat($, index, 'rush_att')),
            rushingYards: parseIntOrNull(getTableStat($, index, 'rush_yds')),
            rushingTouchdowns: parseIntOrNull(getTableStat($, index, 'rush_td')),
            long: parseIntOrNull(getTableStat($, index, 'rush_long')),
            yardsPerAttempt: parseFloatOrNull(getTableStat($, index, 'rush_yds_per_att')),
            rushingYardsPerGame: parseFloatOrNull(getTableStat($, index, 'rush_yds_per_g')),
            rushingAttemptsPerGame: parseFloatOrNull(getTableStat($, index, 'rush_att_per_g')),
            receptions: parseIntOrNull(getTableStat($, index, 'rec')),
            receivingYards: parseIntOrNull(getTableStat($, index, 'rec_yds')),
            yardsPerReception: parseFloatOrNull(getTableStat($, index, 'rec_yds_per_rec')),
            receivingTouchdowns: parseIntOrNull(getTableStat($, index, 'rec_td')),
            receptionsPerGame: parseFloatOrNull(getTableStat($, index, 'rec_per_g')),
            receivingYardsPerGame: parseFloatOrNull(getTableStat($, index, 'rec_yds_per_g')),
            touches: parseIntOrNull(getTableStat($, index, 'touches')),
            yardsPerTouch: parseFloatOrNull(getTableStat($, index, 'yds_per_touch')),
            yardsFromScrimmage: parseIntOrNull(getTableStat($, index, 'yds_from_scrimmage')),
            totalTouchdowns: parseIntOrNull(getTableStat($, index, 'rush_receive_td')),
            fumbles: parseIntOrNull(getTableStat($, index, 'fumbles')),
            approximateValue: parseFloatOrNull(getTableStat($, index, 'av'))
        };
    });
    return rushingReceivingStats;
}

function getTableStat($: CheerioStatic, index: number, stat: string): string{
    return $(`#rushing_and_receiving tbody tr:nth-child(${index + 1}) td[data-stat="${stat}"]`).text();
}

function getTableTeam($: CheerioStatic, index: number): string{
    return $(`#passing tbody tr:nth-child(${index + 1}) td[data-stat="team"] > a`).attr('title');
}