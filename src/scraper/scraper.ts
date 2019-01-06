import rp = require('request-promise');
import cheerio = require('cheerio');
import mongoose = require('mongoose');
import { MONGO_URL } from '../types/constants';
import { PlayerScraper } from './PlayerScraper';
import { preprocessHTML } from './helper-functions';

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
            const URL = `https://www.pro-football-reference.com${link}`;
            const html = preprocessHTML(await rp(URL));
            const $: CheerioStatic = cheerio.load(html);
            
            const playerScraper = new PlayerScraper($);
            playerScraper.getPlayerInfo();
            playerScraper.saveModel();
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