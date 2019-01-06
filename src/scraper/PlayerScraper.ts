import { PlayerInfo, DraftInfo } from "../types/player-types";
import { searchOverviewBlock, getFirstHeader } from "./helper-functions";
import { Stats } from "../types/stat-types";
import { QuarterBack, QuarterBackModel } from "../server/models/Quarterback";
import { Receiver, ReceiverModel } from "../server/models/Receiver";
import { RunningBackModel, RunningBack } from "../server/models/RunningBack";
import { Kicker, KickerModel } from "../server/models/Kicker";
import { DefensiveBackfield, DefensiveBackfieldModel } from "../server/models/DefensiveBackfield";
import { DefensiveLine, DefensiveLineModel } from "../server/models/DefensiveLine";
import { OffensiveLine, OffensiveLineModel } from "../server/models/OffensiveLine";
import { Returner, ReturnerModel } from "../server/models/Returner";
import { PlayerModel } from "../server/models/Player";
import { Document } from 'mongoose';
import { PassingStatsParser } from "./stats-parsers/PassingStatsParser";
import { RushingReceivingStatsParser } from "./stats-parsers/RushingReceivingStatsParser";
import { DefenseStatsParser } from "./stats-parsers/DefenseStatsParser";
import { KickingStatsParser } from "./stats-parsers/KickingStatsParser";
import { ReturnStatsParser } from "./stats-parsers/ReturnStatsParser";

export class PlayerScraper{
    $: CheerioStatic;
    playerInfo?: PlayerInfo;

    constructor($: CheerioStatic){
        this.$ = $;
    }

    getPlayerInfo(): void{
        const name: string = this.getName();
        const positions: string[] = this.getPositions();
        const height: number = this.getHeight();
        const weight: number = this.getWeight();
        const birthDate: Date = this.getBirthDate();
        const birthPlace: string | null = this.getBirthPlace();
        const colleges: string[] | null = this.getCollege()
        const highSchool: string | null = this.getHighSchool();
        const draftInfo: DraftInfo | null = this.getDraftInfo();
        const hallOfFame: boolean = this.getHallOfFame();
        const gamesPlayed: number = this.getGamesPlayed();
        const approximateValue: number | null = this.getApproximateValue();
        const stats = this.getStats();

        this.playerInfo = {name, positions, height, weight, birthDate, birthPlace, colleges, highSchool, draftInfo, hallOfFame, gamesPlayed, approximateValue, stats};
    }

    saveModel(): void{
        const $ = this.$;
        const firstHeader = getFirstHeader($);
        let model: Document;
        switch(firstHeader){
            case 'QBrec':
                const quarterBackData = QuarterBack.getData($);
                model = new QuarterBackModel({...this.playerInfo, ...quarterBackData});
                model.save().then(() =>{
                    if (this.playerInfo)
                        console.log(`Saved ${this.playerInfo.name}`);
                });
                break;
            case 'Rec':
                const receiverData = Receiver.getData($);
                model = new ReceiverModel({...this.playerInfo, ...receiverData});
                model.save().then(() =>{
                    if (this.playerInfo)
                        console.log(`Saved ${this.playerInfo.name}`);
                });
                break;
            case 'Rush':
                const runningBackData = RunningBack.getData($);
                model = new RunningBackModel({...this.playerInfo, ...runningBackData});
                model.save().then(() =>{
                    if (this.playerInfo)
                        console.log(`Saved ${this.playerInfo.name}`);
                });
                break;
            case 'FGM':
                const kickerData = Kicker.getData($);
                model = new KickerModel({...this.playerInfo, ...kickerData});
                model.save().then(() =>{
                    if (this.playerInfo)
                        console.log(`Saved ${this.playerInfo.name}`);
                });
                break;
            case 'Int':
                const defensiveBackfieldData = DefensiveBackfield.getData($);
                model = new DefensiveBackfieldModel({...this.playerInfo, ...defensiveBackfieldData});
                model.save().then(() =>{
                    if (this.playerInfo)
                        console.log(`Saved ${this.playerInfo.name}`);
                });
                break;
            case 'Sk':
                const defensiveLineData = DefensiveLine.getData($);
                model = new DefensiveLineModel({...this.playerInfo, ...defensiveLineData});
                model.save().then(() =>{
                    if (this.playerInfo)
                        console.log(`Saved ${this.playerInfo.name}`);
                });
                break;
            case 'GS':
                const offensiveLineData = OffensiveLine.getData($);
                model = new OffensiveLineModel({...this.playerInfo, ...offensiveLineData});
                model.save().then(() =>{
                    if (this.playerInfo)
                        console.log(`Saved ${this.playerInfo.name}`);
                });
                break;
            case 'Ret':
            case 'Rt':
                const returnerData = Returner.getData($);
                model = new ReturnerModel({...this.playerInfo, ...returnerData});
                model.save().then(() =>{
                    if (this.playerInfo)
                        console.log(`Saved ${this.playerInfo.name}`);
                });
                break;
            default:
                firstHeader && this.playerInfo ? console.log(this.playerInfo.name, firstHeader) : null;
                model = new PlayerModel(this.playerInfo);
                model.save().then(() =>{
                    if (this.playerInfo)
                        console.log(`Saved ${this.playerInfo.name}`);
                });
                break;
        }
    }

    getStats(): Stats{
        const $ = this.$;
        const data = $('div.table_wrapper div.section_heading > h2');
        let stats: Stats = {};
        $(data).each((index: number, element: CheerioElement) => {
            const header = $(element).text();
            switch(header){
                case('Passing'):
                    const passingStatsParser = new PassingStatsParser($);
                    passingStatsParser.parse();
                    stats['passing'] = passingStatsParser.stats;
                    break;
                case('Rushing & Receiving'):
                case('Receiving & Rushing'):
                    const rushingReceivingStatsParser = new RushingReceivingStatsParser($);
                    rushingReceivingStatsParser.parse();
                    stats['rushingreceiving'] = rushingReceivingStatsParser.stats;
                    break;
                case('Defense & Fumbles'):
                    const defenseStatsParser = new DefenseStatsParser($);
                    defenseStatsParser.parse();
                    stats['defense'] = defenseStatsParser.stats;
                    break;
                case('Kicking & Punting'):
                    const kickingStatsParser = new KickingStatsParser($);
                    kickingStatsParser.parse();
                    stats['kicking'] = kickingStatsParser.stats;
                    break;
                case('Kick & Punt Returns'):
                    const returnStatsParser = new ReturnStatsParser($);
                    returnStatsParser.parse();
                    stats['returns'] = returnStatsParser.stats;
                    break;
                default:
                    break;
            }
        });

        return stats;
    }

    getName(): string{
        const $ = this.$;
        try{
            const data = $('#meta > div > h1');
            return $(data[0]).text();
        }
        catch(error){
            console.error(error);
            return '';
        }
    }
    
    getPositions(): string[]{
        try{
            const $ = this.$;
            const data = $('#meta > div > p:nth-child(3)');
            const rawPos = $(data[0]).text().replace(/(\n\t|\n|\t)/gm,"");
            let pos = rawPos.split('Position: ')[1];
            if (pos.indexOf('Throws:') !== -1){
                pos = pos.slice(undefined, pos.indexOf('Throws:'));
            }
            return pos.split('-').filter((element: string) => {return element !== ''});
        }
        catch(error){
            console.error(error);
            return [];
        }
    }
    
    getHeight(): number{
        try{
            const $ = this.$;
            const data = $('#meta > div > p:nth-child(4) span:nth-child(1)');
            const rawHeight = $(data[0]).text();
            const feet = parseInt(rawHeight.split('-')[0]);
            const inches = parseInt(rawHeight.split('-')[1]);
            return (feet*12) + inches;
        }
        catch(error){
            console.error(error);
            return 0;
        }
    }
    
    getWeight(): number{
        try{
            const $ = this.$;
            const data = $('#meta > div > p:nth-child(4) span:nth-child(2)');
            return parseInt($(data[0]).text().split('lb')[0]);
        }
        catch(error){
            console.error(error);
            return 0;
        }
    }
    
    getBirthDate(): Date{
        try{
            const $ = this.$;
            const data = $('#necro-birth');
            const rawDate = $(data[0]).attr('data-birth');
            return new Date(rawDate);
        }
        catch(error){
            console.error(error);
            return new Date();
        }
    }
    
    getBirthPlace(): string | null{
        try{
            const $ = this.$;
            const data = $('#meta > div > p:nth-child(5) > span:nth-child(3)');
            const rawPlace = $(data[0]).text().replace(/(\n\t|\n)/gm,""); //replaces extra tabs and newlines
            if (rawPlace){
                const place = rawPlace.split('in')[1].slice(1); //removes the word in and gets rid of extra spaces
                return place;
            }
            return null;
        }
        catch(error){
            console.error(error);
            return '';
        }
    }
    
    getCollege(): string[] | null{
        try{
            const $ = this.$;
            let rawColleges = searchOverviewBlock($, 'College: ');
            
            if (rawColleges){
                if (rawColleges.includes('(College Stats)'))
                    rawColleges = rawColleges.slice(undefined, rawColleges.length - 16);
                let colleges = rawColleges.split(',');
                for (let i = 0; i < colleges.length; i++){
                    if (i === 0) colleges[i] = colleges[i].slice(2);
                    else colleges[i] = colleges[i].slice(1);
                }
                if (colleges[0] == 'none') return null;
                return colleges;
            }
            return null;
        }
        catch(error){
            console.error(error);
            return null;
        }
    }
    
    getHighSchool(): string | null{
        try{
            const $ = this.$;
            let rawHighSchool = searchOverviewBlock($, 'High School: ');
            
            if (rawHighSchool){
                const highSchool = rawHighSchool.slice(2);
                return highSchool;
            }
            return null;
        }
        catch(error){
            console.error(error);
            return null;
        }
    }
    
    getDraftInfo(): {team: string, round: number, overall: number, year: number} | null{
        try{
            const $ = this.$;
            let rawDraftInfo = searchOverviewBlock($, 'Draft: ');
    
            if (rawDraftInfo){
                const teamIndex = rawDraftInfo.indexOf('in the');
                const team = rawDraftInfo.slice(undefined, teamIndex - 1);
    
                const roundIndex = rawDraftInfo.indexOf('round');
                const round = parseInt(rawDraftInfo.slice(teamIndex + 7, roundIndex - 3));
    
                const startOverall = rawDraftInfo.indexOf('(');
                const endOverall = rawDraftInfo.indexOf('overall');
                const overall = parseInt(rawDraftInfo.slice(startOverall + 1, endOverall - 3));
    
                const yearIndex = rawDraftInfo.indexOf('of the');
                const year = parseInt(rawDraftInfo.slice(yearIndex + 7, yearIndex + 11));
    
                return {team, round, overall, year};
            }
            return null;
        }
        catch(error){
            console.error(error);
            return null;
        }
    }
    
    getHallOfFame(): boolean{
        const $ = this.$;
        if (searchOverviewBlock($, 'Hall of Fame: ')) return true;
        return false;
    }
    
    getGamesPlayed(): number{
        const $ = this.$;
        const data = $('#info > div.stats_pullout > div:nth-child(2) > div:nth-child(1) > p');
        const rawGames = $(data[0]).text();
        return parseInt(rawGames);
    }
    
    getApproximateValue(): number | null{
        const $ = this.$;
        const data = $('#info > div.stats_pullout > div:nth-child(2) > div:nth-child(2) > p');
        const rawValue = $(data[0]).text();
        if (rawValue === '') return null;
        return parseInt(rawValue);
    }
}