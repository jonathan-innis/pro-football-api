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

export function getSummaryData($: CheerioStatic, index: number): string{
    const data = $(`#info > div.stats_pullout > div:nth-child(3) > div:nth-child(${index}) > p:last-child`);
    return $(data[0]).text();
}

export function preprocessHTML(html: any): any{
    let commentEnd;
    let placeholderStart = html.indexOf('<div class="placeholder"></div>', 0);
    while (placeholderStart !== -1){
        let commentStart = html.indexOf('<!--', placeholderStart);
        let nextDivStart = html.indexOf('<div', commentStart);
        if (nextDivStart - commentStart <= 15){
            html = html.slice(undefined, commentStart) + html.slice(commentStart + 4, undefined);
            commentEnd = html.indexOf('-->', nextDivStart);
            html = html.slice(undefined, commentEnd) + html.slice(commentEnd + 4, undefined);
        }
        placeholderStart = html.indexOf('<div class="placeholder"></div>', nextDivStart);
    }
    return html;
}

export function getFirstHeader($: CheerioStatic): string{
    let data = $('#info > div.stats_pullout > div:nth-child(3) > div:nth-child(1) > h4');
    return $(data[0]).text();
}

export function searchOverviewBlock($: CheerioStatic, searchableItem: string): string | null{
    let element = null;
    let blockIndex = 1;
    while (!element && blockIndex < 10){
        let data = $(`#meta > div > p:nth-child(${blockIndex})`);
        let rawElement = $(data[0]).text().replace(/(\n\t|\n|\t)/gm,"");
        element = rawElement.split(searchableItem)[1];
        if (element){
            return element;
        }
        blockIndex++;
    }
    return null;
}