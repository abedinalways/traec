/**
 * Game Engagement Data Service
 * Single Responsibility: Provide game engagement data
 * Dependency Inversion Principle: Abstract data layer
 */

import { IEngagementDataPoint, TimeRange } from "../types/engagement.types";

export class GameEngagementDataService {
    /**
     * Get 24-hour engagement data
     */
    static get24HourData(): IEngagementDataPoint[] {
        return [
            { time: "00:00", shooter: 12, racing: 3 },
            { time: "04:00", shooter: 15, racing: 4 },
            { time: "08:00", shooter: 28, racing: 6 },
            { time: "12:00", shooter: 35, racing: 7 },
            { time: "16:00", shooter: 38, racing: 8 },
            { time: "20:00", shooter: 32, racing: 9 },
            { time: "23:59", shooter: 18, racing: 5 },
        ];
    }

    /**
     * Get 7-day engagement data
     */
    static get7DayData(): IEngagementDataPoint[] {
        return [
            { time: "Mon", shooter: 320, racing: 85 },
            { time: "Tue", shooter: 380, racing: 92 },
            { time: "Wed", shooter: 420, racing: 105 },
            { time: "Thu", shooter: 450, racing: 115 },
            { time: "Fri", shooter: 480, racing: 125 },
            { time: "Sat", shooter: 520, racing: 140 },
            { time: "Sun", shooter: 490, racing: 130 },
        ];
    }

    /**
     * Get 30-day engagement data
     */
    static get30DayData(): IEngagementDataPoint[] {
        return [
            { time: "Week 1", shooter: 2100, racing: 580 },
            { time: "Week 2", shooter: 2400, racing: 650 },
            { time: "Week 3", shooter: 2700, racing: 720 },
            { time: "Week 4", shooter: 2900, racing: 780 },
        ];
    }

    /**
     * Get data by time range
     */
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
}
