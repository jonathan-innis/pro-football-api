import { getPassingStats } from "./passingHelper";
import { getRushingReceivingStats } from "./rushingReceivingHelper";
import { getDefenseStats } from "./defenseHelper";
import { getKickingStats } from "./kickingHelper";
import { getReturnStats } from "./returnHelper";
import { Stats } from "../../types/statTypes";

export function getStats($: CheerioStatic): Stats{
    const data = $('div.table_wrapper div.section_heading > h2');
    let stats: Stats = {};
    $(data).each((index: number, element: CheerioElement) => {
        const header = $(element).text();
        switch(header){
            case('Passing'):
                const passingStats = getPassingStats($);
                stats['passing'] = passingStats;
                break;
            case('Rushing & Receiving'):
            case('Receiving & Rushing'):
                const rushingReceivingStats = getRushingReceivingStats($);
                stats['rushingreceiving'] = rushingReceivingStats;
                break;
            case('Defense & Fumbles'):
                const defenseStats = getDefenseStats($);
                stats['defense'] = defenseStats;
                break;
            case('Kicking & Punting'):
                const kickingStats = getKickingStats($);
                stats['kicking'] = kickingStats;
                break;
            case('Kick & Punt Returns'):
                const returnStats = getReturnStats($);
                stats['returns'] = returnStats;
                break;
            default:
                break;
        }
    });

    return stats;
}