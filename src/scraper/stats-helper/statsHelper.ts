import { getPassingStats } from "./passingHelper";
import { getRushingReceivingStats } from "./rushingReceivingHelper";
import { getDefenseStats } from "./defenseHelper";
import { getKickingStats } from "./kickingHelper";

export function getStats($: CheerioStatic){
    const data = $('div.table_wrapper div.section_heading > h2');
    $(data).each((index: number, element: CheerioElement) => {
        const header = $(element).text();
        if (header === 'Passing'){
            const passingStats = getPassingStats($);
            console.log(passingStats);
        }
        else if (header === 'Rushing & Receiving' || header === 'Receiving & Rushing'){
            const rushingReceivingStats = getRushingReceivingStats($);
            console.log(rushingReceivingStats);
        }
        else if (header === 'Defense & Fumbles'){
            const defenseStats = getDefenseStats($);
            console.log(defenseStats);
        }
        else if (header === 'Kicking & Punting'){
            const kickingStats = getKickingStats($);
            console.log(kickingStats);
        }
    });
}