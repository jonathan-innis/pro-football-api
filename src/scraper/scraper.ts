import rp = require('request-promise');
import cheerio = require('cheerio');
import mongoose = require('mongoose');
import {MONGO_URL} from '../constants';
import {getName, getPositions, getHeight, getWeight, getBirthDate, getBirthPlace, getCollege} from './playerHelperFunctions';

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
            await getPlayerInfo(`https://www.pro-football-reference.com${link}`);
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

async function getPlayerInfo(URL: string): Promise<void>{
    const html = await rp(URL);
    const $: CheerioStatic = cheerio.load(html);
    const name: string = getName($);
    const positions: string[] = getPositions($);
    const height: number = getHeight($);
    const weight: number = getWeight($);
    const birthDate: Date = getBirthDate($);
    const birthPlace: string = getBirthPlace($);
    const colleges: string[] | null = getCollege($)
    console.log(name, positions, height, weight, birthDate, birthPlace, colleges);
}