import { QuarterBack, RecordData } from "../../types/playerTypes";
import {parseRecord, parseFloatOrNull, parseIntOrNull} from '../helperFunctions';

export function getQuarterBackData($: CheerioStatic): QuarterBack{
    const record: RecordData | null = parseRecord(getSummaryData($, 1));
    const completionPct: number | null = parseFloatOrNull(getSummaryData($, 2));
    const yards: number | null = parseIntOrNull(getSummaryData($, 3));
    const yardsPerAttempt: number | null = parseFloatOrNull(getSummaryData($, 4));
    const touchdowns: number | null = parseIntOrNull(getSummaryData($, 5));
    const interceptions: number | null = parseIntOrNull(getSummaryData($, 6));
    const fantasyPoints: number | null = parseIntOrNull(getSummaryData($, 7));
    return {record, completionPct, yards, yardsPerAttempt, touchdowns, interceptions, fantasyPoints};
}

function getSummaryData($: CheerioStatic, index: number): string{
    const data = $(`#info > div.stats_pullout > div:nth-child(3) > div:nth-child(${index}) > p:last-child`);
    return $(data[0]).text();
}