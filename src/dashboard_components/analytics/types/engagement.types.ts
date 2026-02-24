/**
 * Game Engagement Types
 * Following Interface Segregation Principle
 */

export type TimeRange = "24H" | "7D" | "30D";

export interface IEngagementDataPoint {
    time: string;
    shooter: number;
    racing: number;
}

export interface IEngagementChartProps {
    data: IEngagementDataPoint[];
    timeRange: TimeRange;
    config?: Partial<IEngagementChartConfig>;
}

export interface IEngagementChartConfig {
    shooterColor: string;
    racingColor: string;
    gridColor: string;
    textColor: string;
}
