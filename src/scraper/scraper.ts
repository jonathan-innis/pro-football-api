import rp = require('request-promise');
import cheerio = require('cheerio');
import mongoose = require('mongoose');
import {MONGO_URL, DraftInfo, PlayerInfo} from '../constants';
import {getName, getPositions, getHeight, getWeight, getBirthDate, getBirthPlace, getCollege, getHighSchool, getDraftInfo, getHallOfFame, getGamesPlayed, getApproximateValue} from './playerHelperFunctions';
import { PlayerModel } from '../server/models/Player';

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
            model.save().then(() => {console.log(`Saved ${playerInfo.name}`)});
        }
    }
}

async function getPlayerLinks(URL: string): Promise<String[]> {
    const playerLinks: String[] = [];
    const html = await rp(URL);
    const $: CheerioStatic = cheerio.load(html);
    $('#div_players > p > a').each((i, element) => {
        playerLinks.push($(element).attr('href'));
    });
    return playerLinks;
}

async function getPlayerInfo(URL: string): Promise<PlayerInfo>{
    const html = await rp(URL);
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
    return {name, positions, height, weight, birthDate, birthPlace, colleges, highSchool, draftInfo, hallOfFame, gamesPlayed, approximateValue};
}