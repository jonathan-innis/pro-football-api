import { getPassingStats } from "./passingHelper";
import { getRushingReceivingStats } from "./rushingHelper";

export function getStats($: CheerioStatic){
    const data = $('div.table_wrapper div.section_heading > h2');
    $(data).each((index: number, element: CheerioElement) => {
        const header = $(element).text();
        if (header === 'Passing'){
            const passingStats = getPassingStats($);
            console.log(passingStats);
        }
        else if (header === 'Rushing & Receiving'){
            const rushingReceivingStats = getRushingReceivingStats($);
            console.log(rushingReceivingStats);
        }
    });
}