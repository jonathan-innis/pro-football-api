import { RecordData } from '../types/playerTypes';

export function parseFloatOrNull(element: string): number | null{
    if (isNaN(parseFloat(element))){
        return null;
    }
    return parseFloat(element);
}

export function parseIntOrNull(element: string): number | null{
    if (isNaN(parseInt(element))){
        return null;
    }
    return parseInt(element);
}

export function parseRecord(element: string): RecordData | null{
    const splitRecord = element.split('-');
    if (splitRecord.length !== 3) return null;
    return {won: parseInt(splitRecord[0]), lost: parseInt(splitRecord[1]), tied: parseInt(splitRecord[2])};
}