import { PassingStats } from "../../types/stat-types";
import { parseIntOrNull, parseRecord, parseFloatOrNull } from "../helper-functions";

export class PassingStatsParser{
    $: CheerioStatic;
    stats: PassingStats = {};

    constructor($: CheerioStatic){
        this.$ = $;
    }

    parse(): void{
        const $ = this.$;
        const data = $('#passing th > a');
        $(data).each((index: number, element: CheerioElement) => {
            const year: number = parseInt($(element).text());
            this.stats[year] = {
                age: parseIntOrNull(this.getTableStat(index, 'age')),
                team: this.getTableTeam(index) === '' ? null : this.getTableTeam(index),
                position: this.getTableStat(index, 'pos') === '' ? null : this.getTableStat(index, 'pos'),
                number: parseIntOrNull(this.getTableStat(index, 'uniform_number')),
                games: parseIntOrNull(this.getTableStat(index, 'g')),
                gamesStarted: parseIntOrNull(this.getTableStat(index, 'gs')),
                record: parseRecord(this.getTableStat(index, 'qb_rec')),
                completions: parseIntOrNull(this.getTableStat(index, 'pass_cmp')),
                attempts: parseIntOrNull(this.getTableStat(index, 'pass_att')),
                completionPct: parseFloatOrNull(this.getTableStat(index, 'pass_cmp_perc')),
                yards: parseIntOrNull(this.getTableStat(index, 'pass_yds')),
                touchdowns: parseIntOrNull(this.getTableStat(index, 'pass_td')),
                touchdownPct: parseFloatOrNull(this.getTableStat(index, 'pass_td_perc')),
                interceptions: parseIntOrNull(this.getTableStat(index, 'pass_int')),
                interceptionPct: parseFloatOrNull(this.getTableStat(index, 'pass_int_perc')),
                long: parseIntOrNull(this.getTableStat(index, 'pass_long')),
                yardsPerAttempt: parseFloatOrNull(this.getTableStat(index, 'pass_yds_per_att')),
                adjustedNetYardsPerAttempt: parseFloatOrNull(this.getTableStat(index, 'pass_adj_yds_per_att')),
                yardsPerCompletion: parseFloatOrNull(this.getTableStat(index, 'pass_yds_per_cmp')),
                yardsPerGame: parseFloatOrNull(this.getTableStat(index, 'pass_yds_per_g')),
                quarterbackRating: parseFloatOrNull(this.getTableStat(index, 'pass_rating')),
                sacks: parseIntOrNull(this.getTableStat(index, 'pass_sacked')),
                yardsLostDueToSacks: parseFloatOrNull(this.getTableStat(index, 'pass_sacked_yds')),
                netYardsPerAttempt: parseFloatOrNull(this.getTableStat(index, 'pass_net_yds_per_att')),
                adjustedYardsPerAttempt: parseFloatOrNull(this.getTableStat(index, 'pass_adj_net_yds_per_att')),
                pctTimesSacked: parseFloatOrNull(this.getTableStat(index, 'pass_sacked_perc')),
                fourthQuarterComebacks: parseIntOrNull(this.getTableStat(index, 'comebacks')),
                gameWinningDrives: parseIntOrNull(this.getTableStat(index, 'gwd'))
            };
        });
    }
    
    getTableStat(index: number, stat: string): string{
        const $ = this.$;
        return $(`#passing tbody tr:nth-child(${index + 1}) td[data-stat="${stat}"]`).text();
    }
    
    getTableTeam(index: number): string{
        const $ = this.$;
        return $(`#passing tbody tr:nth-child(${index + 1}) td[data-stat="team"] > a`).attr('title');
    }
}