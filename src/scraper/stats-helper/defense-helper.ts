import { DefenseStats } from "../../types/statTypes";
import { parseIntOrNull } from "../helperFunctions";

export function getDefenseStats($: CheerioStatic): DefenseStats{
    let defenseStats: DefenseStats = {};
    const data = $('#defense th > a');
    $(data).each((index: number, element: CheerioElement) => {
        const year: number = parseInt($(element).text());
        defenseStats[year] = {
            age: parseIntOrNull(getTableStat($, index, 'age')),
            team: getTableTeam($, index) === '' ? null : getTableTeam($, index),
            position: getTableStat($, index, 'pos') === '' ? null : getTableStat($, index, 'pos'),
            number: parseIntOrNull(getTableStat($, index, 'uniform_number')),
            games: parseIntOrNull(getTableStat($, index, 'g')),
            gamesStarted: parseIntOrNull(getTableStat($, index, 'gs')),
            interceptions: parseIntOrNull(getTableStat($, index, 'def_int')),
            interceptionYards: parseIntOrNull(getTableStat($, index, 'def_int_yds')),
            interceptionTouchdowns: parseIntOrNull(getTableStat($, index, 'def_int_td')),
            interceptionLong: parseIntOrNull(getTableStat($, index, 'def_int_long')),
            passesDefended: parseIntOrNull(getTableStat($, index, 'pass_defended')),
            forcedFumbles: parseIntOrNull(getTableStat($, index, 'fumbles_forced')),
            fumbles: parseIntOrNull(getTableStat($, index, 'fumbles')),
            fumblesRecovered: parseIntOrNull(getTableStat($, index, 'fumbles_rec')),
            fumbleYards: parseIntOrNull(getTableStat($, index, 'fumbles_rec_yds')),
            fumbleTouchdowns: parseIntOrNull(getTableStat($, index, 'fumble_rec_td')),
            sacks: parseIntOrNull(getTableStat($, index, 'sacks')),
            totalTackles: parseIntOrNull(getTableStat($, index, 'tackles_combined')),
            soloTackles: parseIntOrNull(getTableStat($, index, 'tackles_solo')),
            assistedTackles: parseIntOrNull(getTableStat($, index, 'tackles_assists')),
            tacklesForLoss: parseIntOrNull(getTableStat($, index, 'tackles_loss')),
            quarterbackHits: parseIntOrNull(getTableStat($, index, 'qb_hits')),
            safeties: parseIntOrNull(getTableStat($, index, 'safety_md'))
        };
    });
    return defenseStats;
}

function getTableStat($: CheerioStatic, index: number, stat: string): string{
    return $(`#defense tbody tr:nth-child(${index + 1}) td[data-stat="${stat}"]`).text();
}

function getTableTeam($: CheerioStatic, index: number): string{
    return $(`#defense tbody tr:nth-child(${index + 1}) td[data-stat="team"] > a`).attr('title');
}