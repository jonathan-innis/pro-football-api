import { KickingStats } from "../../types/stat-types";
import { parseIntOrNull, parseFloatOrNull } from "../helper-functions";

export class KickingStatsParser{
    $: CheerioStatic;
    stats: KickingStats = {};

    constructor($: CheerioStatic){
        this.$ = $;
    }

    parse(): void{
        const $ = this.$;
        const data = $('#kicking th > a');
        $(data).each((index: number, element: CheerioElement) => {
            const year: number = parseInt($(element).text());
            this.stats[year] = {
                age: parseIntOrNull(this.getTableStat(index, 'age')),
                team: this.getTableTeam(index) === '' ? null : this.getTableTeam(index),
                position: this.getTableStat(index, 'pos') === '' ? null : this.getTableStat(index, 'pos'),
                number: parseIntOrNull(this.getTableStat(index, 'uniform_number')),
                games: parseIntOrNull(this.getTableStat(index, 'g')),
                gamesStarted: parseIntOrNull(this.getTableStat(index, 'gs')),
                fieldGoalAttempts_0_19: parseIntOrNull(this.getTableStat(index, 'fga1')),
                fieldGoalMakes_0_19: parseIntOrNull(this.getTableStat(index, 'fgm1')),
                fieldGoalAttempts_20_29: parseIntOrNull(this.getTableStat(index, 'fga2')),
                fieldGoalMakes_20_29: parseIntOrNull(this.getTableStat(index, 'fgm2')),
                fieldGoalAttempts_30_39: parseIntOrNull(this.getTableStat(index, 'fga3')),
                fieldGoalMakes_30_39: parseIntOrNull(this.getTableStat(index, 'fgm3')),
                fieldGoalAttempts_40_49: parseIntOrNull(this.getTableStat(index, 'fga4')),
                fieldGoalMakes_40_49: parseIntOrNull(this.getTableStat(index, 'fgm4')),
                fieldGoalAttempts_50_above: parseIntOrNull(this.getTableStat(index, 'fgm5')),
                fieldGoalMakes_50_above: parseIntOrNull(this.getTableStat(index, 'fgm5')),
                totalFieldGoalsAttempted: parseIntOrNull(this.getTableStat(index, 'fga')),
                totalFieldGoalsMade: parseIntOrNull(this.getTableStat(index, 'fgm')),
                longestFieldGoal: parseIntOrNull(this.getTableStat(index, 'fg_long')),
                fieldGoalPct: parseFloatOrNull(this.getTableStat(index, 'fg_perc')),
                xPtsAttempted: parseIntOrNull(this.getTableStat(index, 'xpa')),
                xPtsMade: parseIntOrNull(this.getTableStat(index, 'xpm')),
                xPtsPct: parseFloatOrNull(this.getTableStat(index, 'xp_perc')),
                punts: parseIntOrNull(this.getTableStat(index, 'punt')),
                puntingYards: parseIntOrNull(this.getTableStat(index, 'punt_yds')),
                longestPunt: parseIntOrNull(this.getTableStat(index, 'punt_long')),
                blockedPunts: parseIntOrNull(this.getTableStat(index, 'punt_blocked')),
                yardsPerPunt: parseFloatOrNull(this.getTableStat(index, 'punt_yds_per_punt')),
                approximateValue: parseFloatOrNull(this.getTableStat(index, 'av'))
            };
        });
    }
    
    getTableStat(index: number, stat: string): string{
        const $ = this.$;
        return $(`#kicking tbody tr:nth-child(${index + 1}) td[data-stat="${stat}"]`).text();
    }
    
    getTableTeam(index: number): string{
        const $ = this.$;
        return $(`#kicking tbody tr:nth-child(${index + 1}) td[data-stat="team"] > a`).attr('title');
    }
}