/**
 * Transaction Volume Data Service
 * Single Responsibility: Provide transaction volume (TRX) data
 */

import { IEngagementDataPoint, TimeRange } from "../types/engagement.types";

export class TransactionVolumeDataService {
    static get24HourData(): IEngagementDataPoint[] {
        return [
            { time: "00:00", shooter: 85.2, racing: 12.5 },
            { time: "04:00", shooter: 92.1, racing: 18.3 },
            { time: "08:00", shooter: 156.4, racing: 24.8 },
            { time: "12:00", shooter: 198.7, racing: 30.2 },
            { time: "16:00", shooter: 212.5, racing: 34.5 },
            { time: "20:00", shooter: 185.3, racing: 28.9 },
            { time: "23:59", shooter: 98.6, racing: 15.4 },
        ];
    }

    static get7DayData(): IEngagementDataPoint[] {
        return [
            { time: "Mon", shooter: 1250.5, racing: 285.2 },
            { time: "Tue", shooter: 1380.2, racing: 312.4 },
            { time: "Wed", shooter: 1520.8, racing: 358.6 },
            { time: "Thu", shooter: 1680.4, racing: 395.2 },
            { time: "Fri", shooter: 1820.6, racing: 428.5 },
            { time: "Sat", shooter: 1950.3, racing: 465.8 },
            { time: "Sun", shooter: 1880.1, racing: 442.3 },
        ];
    }

    static get30DayData(): IEngagementDataPoint[] {
        return [
            { time: "Week 1", shooter: 5820.5, racing: 1420.8 },
            { time: "Week 2", shooter: 6480.2, racing: 1580.4 },
            { time: "Week 3", shooter: 7120.6, racing: 1720.2 },
            { time: "Week 4", shooter: 7580.3, racing: 1850.5 },
        ];
    }

    static getDataByRange(timeRange: TimeRange): IEngagementDataPoint[] {
        switch (timeRange) {
            case "24H":
                return this.get24HourData();
            case "7D":
                return this.get7DayData();
            case "30D":
                return this.get30DayData();
            default:
                return this.get24HourData();
        }
    }

    static formatTRX(value: number): string {
        return `${value.toFixed(2)} TRX`;
    }
}
