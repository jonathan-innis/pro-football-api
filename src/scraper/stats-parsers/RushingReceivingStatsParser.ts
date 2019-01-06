import { RushingReceivingStats } from "../../types/stat-types";
import { parseIntOrNull, parseFloatOrNull } from "../helper-functions";

export class RushingReceivingStatsParser{
    $: CheerioStatic;
    stats: RushingReceivingStats = {};

    constructor($: CheerioStatic){
        this.$ = $;
    }

    parse(): void{
        const $ = this.$;
        const data = $('#rushing_and_receiving th > a');
        $(data).each((index: number, element: CheerioElement) => {
            const year: number = parseInt($(element).text());
            this.stats[year] = {
                age: parseIntOrNull(this.getTableStat(index, 'age')),
                team: this.getTableTeam(index) === '' ? null : this.getTableTeam(index),
                position: this.getTableStat(index, 'pos') === '' ? null : this.getTableStat(index, 'uniform_number'),
                number: parseIntOrNull(this.getTableStat(index, 'uniform_number')),
                games: parseIntOrNull(this.getTableStat(index, 'g')),
                gamesStarted: parseIntOrNull(this.getTableStat(index, 'gs')),
                rushingAttempts: parseIntOrNull(this.getTableStat(index, 'rush_att')),
                rushingYards: parseIntOrNull(this.getTableStat(index, 'rush_yds')),
                rushingTouchdowns: parseIntOrNull(this.getTableStat(index, 'rush_td')),
                long: parseIntOrNull(this.getTableStat(index, 'rush_long')),
                yardsPerAttempt: parseFloatOrNull(this.getTableStat(index, 'rush_yds_per_att')),
                rushingYardsPerGame: parseFloatOrNull(this.getTableStat(index, 'rush_yds_per_g')),
                rushingAttemptsPerGame: parseFloatOrNull(this.getTableStat(index, 'rush_att_per_g')),
                receptions: parseIntOrNull(this.getTableStat(index, 'rec')),
                receivingYards: parseIntOrNull(this.getTableStat(index, 'rec_yds')),
                yardsPerReception: parseFloatOrNull(this.getTableStat(index, 'rec_yds_per_rec')),
                receivingTouchdowns: parseIntOrNull(this.getTableStat(index, 'rec_td')),
                receptionsPerGame: parseFloatOrNull(this.getTableStat(index, 'rec_per_g')),
                receivingYardsPerGame: parseFloatOrNull(this.getTableStat(index, 'rec_yds_per_g')),
                touches: parseIntOrNull(this.getTableStat(index, 'touches')),
                yardsPerTouch: parseFloatOrNull(this.getTableStat(index, 'yds_per_touch')),
                yardsFromScrimmage: parseIntOrNull(this.getTableStat(index, 'yds_from_scrimmage')),
                totalTouchdowns: parseIntOrNull(this.getTableStat(index, 'rush_receive_td')),
                fumbles: parseIntOrNull(this.getTableStat(index, 'fumbles')),
                approximateValue: parseFloatOrNull(this.getTableStat(index, 'av'))
            };
        });
    }
    
    getTableStat(index: number, stat: string): string{
        const $ = this.$;
        return $(`#rushing_and_receiving tbody tr:nth-child(${index + 1}) td[data-stat="${stat}"]`).text();
    }
    
    getTableTeam(index: number): string{
        const $ = this.$;
        return $(`#passing tbody tr:nth-child(${index + 1}) td[data-stat="team"] > a`).attr('title');
    }
}