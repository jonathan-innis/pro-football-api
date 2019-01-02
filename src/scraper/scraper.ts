import rp = require('request-promise');
import cheerio = require('cheerio');
import mongoose = require('mongoose');
import {Document} from 'mongoose';
import { MONGO_URL } from '../types/constants';
import { DraftInfo, PlayerInfo } from '../types/playerTypes';
import {getName, getPositions, getHeight, getWeight, getBirthDate, getBirthPlace, getCollege, getHighSchool, getDraftInfo, getHallOfFame, getGamesPlayed, getApproximateValue} from './playerHelperFunctions';
import { getStats } from './stats-helper/statsHelper';
import { QuarterBackModel, QuarterBack } from '../server/models/Quarterback';
import { ReceiverModel, Receiver } from '../server/models/Receiver';
import { RunningBackModel, RunningBack } from '../server/models/RunningBack';
import { KickerModel, Kicker } from '../server/models/Kicker';
import { DefensiveBackfieldModel, DefensiveBackfield } from '../server/models/DefensiveBackfield';
import { DefensiveLineModel, DefensiveLine } from '../server/models/DefensiveLine';
import { PlayerModel } from '../server/models/Player';
import { OffensiveLine, OffensiveLineModel } from '../server/models/OffensiveLine';
import { getFirstHeader, preprocessHTML } from './helperFunctions';

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

            const playerInfo: PlayerInfo = getPlayerInfo($);
            saveModel($, playerInfo);
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

function getPlayerInfo($: CheerioStatic): PlayerInfo{
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
    const stats = getStats($);
    
    return {name, positions, height, weight, birthDate, birthPlace, colleges, highSchool, draftInfo, hallOfFame, gamesPlayed, approximateValue, stats};
}

function saveModel($: CheerioStatic, playerInfo: PlayerInfo): void{
    const firstHeader = getFirstHeader($);
    let model: Document;
    switch(firstHeader){
        case 'QBrec':
            const quarterBackData = QuarterBack.getData($);
            model = new QuarterBackModel({...playerInfo, ...quarterBackData});
            model.save();
            break;
        case 'Rec':
            const receiverData = Receiver.getData($);
            model = new ReceiverModel({...playerInfo, ...receiverData});
            model.save();
            break;
        case 'Rush':
            const runningBackData = RunningBack.getData($);
            model = new RunningBackModel({...playerInfo, ...runningBackData});
            model.save();
            break;
        case 'FGM':
            const kickerData = Kicker.getData($);
            model = new KickerModel({...playerInfo, ...kickerData});
            model.save();
            break;
        case 'Int':
            const defensiveBackfieldData = DefensiveBackfield.getData($);
            model = new DefensiveBackfieldModel({...playerInfo, ...defensiveBackfieldData});
            model.save();
            break;
        case 'Sk':
            const defensiveLineData = DefensiveLine.getData($);
            model = new DefensiveLineModel({...playerInfo, ...defensiveLineData});
            model.save();
            break;
        case 'GS':
            const offensiveLineData = OffensiveLine.getData($);
            model = new OffensiveLineModel({...playerInfo, ...offensiveLineData});
            model.save();
            break;
        case 'Rt':
            break;
        default:
            model = new PlayerModel(playerInfo);
            model.save();
            break;
    }
}