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
        if (header === 'Passing'){
            const passingStats = getPassingStats($);
            stats['passing'] = passingStats;
        }
        else if (header === 'Rushing & Receiving' || header === 'Receiving & Rushing'){
            const rushingReceivingStats = getRushingReceivingStats($);
            stats['rushingreceiving'] = rushingReceivingStats;
        }
        else if (header === 'Defense & Fumbles'){
            const defenseStats = getDefenseStats($);
            stats['defense'] = defenseStats;
        }
        else if (header === 'Kicking & Punting'){
            const kickingStats = getKickingStats($);
            stats['kicking'] = kickingStats;
        }
        else if (header === 'Kick & Punt Returns'){
            const returnStats = getReturnStats($);
            stats['returns'] = returnStats;
        }
    });

    return stats;
}