import { DefenseStats } from "../../types/stat-types";
import { parseIntOrNull } from "../helper-functions";

export class DefenseStatsParser{
    $: CheerioStatic;
    stats: DefenseStats = {};

    constructor($: CheerioStatic){
        this.$ = $;
    }

    parse(): void{
        try{
            const $ = this.$;
            const data = $('#defense th > a');
            $(data).each((index: number, element: CheerioElement) => {
                const year: number = parseInt($(element).text());
                this.stats[year] = {
                    age: parseIntOrNull(this.getTableStat(index, 'age')),
                    team: this.getTableTeam(index) === '' ? null : this.getTableTeam(index),
                    position: this.getTableStat(index, 'pos') === '' ? null : this.getTableStat(index, 'pos'),
                    number: parseIntOrNull(this.getTableStat(index, 'uniform_number')),
                    games: parseIntOrNull(this.getTableStat(index, 'g')),
                    gamesStarted: parseIntOrNull(this.getTableStat(index, 'gs')),
                    interceptions: parseIntOrNull(this.getTableStat(index, 'def_int')),
                    interceptionYards: parseIntOrNull(this.getTableStat(index, 'def_int_yds')),
                    interceptionTouchdowns: parseIntOrNull(this.getTableStat(index, 'def_int_td')),
                    interceptionLong: parseIntOrNull(this.getTableStat(index, 'def_int_long')),
                    passesDefended: parseIntOrNull(this.getTableStat(index, 'pass_defended')),
                    forcedFumbles: parseIntOrNull(this.getTableStat(index, 'fumbles_forced')),
                    fumbles: parseIntOrNull(this.getTableStat(index, 'fumbles')),
                    fumblesRecovered: parseIntOrNull(this.getTableStat(index, 'fumbles_rec')),
                    fumbleYards: parseIntOrNull(this.getTableStat(index, 'fumbles_rec_yds')),
                    fumbleTouchdowns: parseIntOrNull(this.getTableStat(index, 'fumble_rec_td')),
                    sacks: parseIntOrNull(this.getTableStat(index, 'sacks')),
                    totalTackles: parseIntOrNull(this.getTableStat(index, 'tackles_combined')),
                    soloTackles: parseIntOrNull(this.getTableStat(index, 'tackles_solo')),
                    assistedTackles: parseIntOrNull(this.getTableStat(index, 'tackles_assists')),
                    tacklesForLoss: parseIntOrNull(this.getTableStat(index, 'tackles_loss')),
                    quarterbackHits: parseIntOrNull(this.getTableStat(index, 'qb_hits')),
                    safeties: parseIntOrNull(this.getTableStat(index, 'safety_md'))
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
            return $(`#defense tbody tr:nth-child(${index + 1}) td[data-stat="${stat}"]`).text();
        }
        catch(error){
            console.error(error);
            return '';
        }
    }
    
    getTableTeam(index: number): string{
        try{
            const $ = this.$;
            return $(`#defense tbody tr:nth-child(${index + 1}) td[data-stat="team"] > a`).attr('title');
        }
        catch(error){
            console.error(error);
            return '';
        }
    }
}