import { RecordData } from "../../constants";
import { QuarterBack } from "../../server/models/playerTypes";
import {parseRecord, parseFloatOrNull, parseIntOrNull} from '../helperFunctions';

export function getQuarterBackData($: CheerioStatic): QuarterBack{
    const record: RecordData | null = getRecord($);
    const completionPct: number | null = getCompletionPct($);
    const yards: number | null = getCareerYards($);
    const yardsPerAttempt: number | null = getYardsPerAttempt($);
    const touchdowns: number | null = getTouchdowns($);
    const interceptions: number | null = getInterceptions($);
    const fantasyPoints: number | null = getFantasyPoints($);
    return {record, completionPct, yards, yardsPerAttempt, touchdowns, interceptions, fantasyPoints};
}

function getRecord($: CheerioStatic): RecordData | null{
    const data = $('#info > div.stats_pullout > div:nth-child(3) > div:nth-child(1) > p:last-child');
    const rawRecord = $(data[0]).text();
    return parseRecord(rawRecord);
}

function getCompletionPct($: CheerioStatic): number | null{
    const data = $('#info > div.stats_pullout > div:nth-child(3) > div:nth-child(2) > p:last-child');
    const rawCompletionPct = $(data[0]).text();
    return parseFloatOrNull(rawCompletionPct);
}

function getCareerYards($: CheerioStatic): number | null{
    const data = $('#info > div.stats_pullout > div:nth-child(3) > div:nth-child(3) > p:last-child');
    const rawCareerYards = $(data[0]).text();
    return parseIntOrNull(rawCareerYards);
}

function getYardsPerAttempt($: CheerioStatic): number | null{
    const data = $('#info > div.stats_pullout > div:nth-child(3) > div:nth-child(4) > p:last-child');
    const rawYardsPerAttempt = $(data[0]).text();
    return parseFloatOrNull(rawYardsPerAttempt);
}

function getTouchdowns($: CheerioStatic): number | null{
    const data = $('#info > div.stats_pullout > div:nth-child(3) > div:nth-child(5) > p:last-child');
    const rawTouchdowns = $(data[0]).text();
    return parseIntOrNull(rawTouchdowns);
}

function getInterceptions($: CheerioStatic): number | null{
    const data = $('#info > div.stats_pullout > div:nth-child(3) > div:nth-child(6) > p:last-child');
    const rawInterceptions = $(data[0]).text();
    return parseIntOrNull(rawInterceptions);
}

function getFantasyPoints($: CheerioStatic): number | null{
    const data = $('#info > div.stats_pullout > div:nth-child(3) > div:nth-child(7) > p:last-child');
    const rawFantasyPoints = $(data[0]).text();
    return parseFloatOrNull(rawFantasyPoints);
}