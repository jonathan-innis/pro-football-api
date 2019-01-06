import { ReturnStats } from "../../types/stat-types";
import { parseIntOrNull, parseFloatOrNull } from "../helper-functions";

export class ReturnStatsParser{
    $: CheerioStatic;
    stats: ReturnStats = {};

    constructor($: CheerioStatic){
        this.$ = $;
    }

    parse(): void{
        try{
            const $ = this.$;
            const data = $('#returns th > a');
            $(data).each((index: number, element: CheerioElement) => {
                const year: number = parseInt($(element).text());
                this.stats[year] = {
                    age: parseIntOrNull(this.getTableStat(index, 'age')),
                    team: this.getTableTeam(index) === '' ? null : this.getTableTeam(index),
                    position: this.getTableStat(index, 'pos') === '' ? null : this.getTableStat(index, 'pos'),
                    number: parseIntOrNull(this.getTableStat(index, 'uniform_number')),
                    games: parseIntOrNull(this.getTableStat(index, 'g')),
                    gamesStarted: parseIntOrNull(this.getTableStat(index, 'gs')),
                    puntReturns: parseIntOrNull(this.getTableStat(index, 'punt_ret')),
                    puntReturnYards: parseIntOrNull(this.getTableStat(index, 'punt_ret_yds')),
                    puntReturnTouchdowns: parseIntOrNull(this.getTableStat(index, 'punt_ret_td')),
                    puntReturnLong: parseIntOrNull(this.getTableStat(index, 'punt_ret_long')),
                    yardsPerPuntReturn: parseFloatOrNull(this.getTableStat(index, 'punt_ret_yds_per_ret')),
                    kickReturns: parseIntOrNull(this.getTableStat(index, 'kick_ret')),
                    kickReturnYards: parseIntOrNull(this.getTableStat(index, 'kick_ret_yds')),
                    kickReturnTouchdowns: parseIntOrNull(this.getTableStat(index, 'kick_ret_td')),
                    kickReturnLong: parseIntOrNull(this.getTableStat(index, 'kick_ret_long')),
                    yardsPerKickReturn: parseFloatOrNull(this.getTableStat(index, 'kick_ret_yds_per_ret')),
                    allPurposeYards: parseFloatOrNull(this.getTableStat(index, 'all_purpose_yds'))
                };
            });
        }
        catch(error){
            console.error(error);
        }
    }
    
    getTableStat(index: number, stat: string): string{
        try{
            const $ = this.$;
            return $(`#returns tbody tr:nth-child(${index + 1}) td[data-stat="${stat}"]`).text();
        }
        catch(error){
            console.error(error);
            return '';
        }
    }
    
    getTableTeam(index: number): string{
        try{
            const $ = this.$;
            return $(`#returns tbody tr:nth-child(${index + 1}) td[data-stat="team"] > a`).attr('title');
        }
        catch(error){
            console.error(error);
            return '';
        }
    }
}