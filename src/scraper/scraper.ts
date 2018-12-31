import rp = require('request-promise');
import cheerio = require('cheerio');
import mongoose = require('mongoose');
import { MONGO_URL } from '../types/constants';
import { DraftInfo, PlayerInfo } from '../types/playerTypes';
import {getName, getPositions, getHeight, getWeight, getBirthDate, getBirthPlace, getCollege, getHighSchool, getDraftInfo, getHallOfFame, getGamesPlayed, getApproximateValue} from './player-helper/playerHelper';
import { PlayerModel } from '../server/models/Player';
import { getQuarterBackData } from './player-helper/quarterbackHelper';
import { getStats } from './stats-helper/statsHelper';
import { getReceiverData } from './player-helper/receiverHelper';

mongoose.connect(MONGO_URL, {useNewUrlParser: true}).then(() => {
    scrape().then(() => {
        console.log("Finished scraping");
        process.exit();
    })
});

async function scrape(): Promise<void> {
    let URL: string;
    for (let i = 0; i < 26; i++){
        URL = `https://www.pro-football-reference.com/players/${(i+10).toString(36).toUpperCase()}/`;
        const playerLinks = await getPlayerLinks(URL);
        for (let link of playerLinks){
            const playerInfo: PlayerInfo = await getPlayerInfo(`https://www.pro-football-reference.com${link}`);
            const model = new PlayerModel(playerInfo)
            model.save();
        }
    }
}

async function getPlayerLinks(URL: string): Promise<String[]> {
    const playerLinks: String[] = [];
    let html = await rp(URL);
    const $: CheerioStatic = cheerio.load(html);
    $('#div_players > p > a').each((i, element) => {
        playerLinks.push($(element).attr('href'));
    });
    return playerLinks;
}

async function getPlayerInfo(URL: string): Promise<PlayerInfo>{
    const html = preprocessHTML(await rp(URL));
    const $: CheerioStatic = cheerio.load(html);
    const name: string = getName($);
    const positions: string[] = getPositions($);
    const height: number = getHeight($);
    const weight: number = getWeight($);
    const birthDate: Date = getBirthDate($);
    const birthPlace: string = getBirthPlace($);
    const colleges: string[] | null = getCollege($)
    const highSchool: string | null = getHighSchool($);
    const draftInfo: DraftInfo | null = getDraftInfo($);
    const hallOfFame: boolean = getHallOfFame($);
    const gamesPlayed: number = getGamesPlayed($);
    const approximateValue: number | null = getApproximateValue($);

    const firstHeader = getFirstHeader($);

    if (firstHeader === 'QBrec'){
        const quarterBackData = getQuarterBackData($);
    }
    else if (firstHeader === 'Rec'){
        const receiverData = getReceiverData($);
    }

    const stats = getStats($);
    return {name, positions, height, weight, birthDate, birthPlace, colleges, highSchool, draftInfo, hallOfFame, gamesPlayed, approximateValue, stats};
}

function preprocessHTML(html: any): any{
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

function getFirstHeader($: CheerioStatic): string{
    let data = $('#info > div.stats_pullout > div:nth-child(3) > div:nth-child(1) > h4');
    return $(data[0]).text();
}