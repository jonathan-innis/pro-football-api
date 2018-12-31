import { Receiver } from "../../types/playerTypes";
import { parseFloatOrNull, parseIntOrNull} from '../helperFunctions';

export function getReceiverData($: CheerioStatic): Receiver{
    const receptions = parseIntOrNull(getSummaryData($, 1));
    const yards = parseIntOrNull(getSummaryData($, 2));
    const yardsPerReception = parseFloatOrNull(getSummaryData($, 3));
    const touchdowns = parseIntOrNull(getSummaryData($, 4));
    const fantasyPoints = parseFloatOrNull(getSummaryData($, 5));
    return {receptions, yards, yardsPerReception, touchdowns, fantasyPoints};
}

function getSummaryData($: CheerioStatic, index: number): string{
    const data = $(`#info > div.stats_pullout > div:nth-child(3) > div:nth-child(${index}) > p:last-child`);
    return $(data[0]).text();
}