/**
 * Revenue Types - Following Interface Segregation Principle
 * Separate interfaces for different concerns
 */

export type TimePeriod = "Monthly" | "Yearly";

export interface IRevenueDataPoint {
    month: string;
    shooter: number;
    racing: number;
}

export interface IRevenueStats {
    shooter: {
        value: number;
        change: string;
    };
    racing: {
        value: number;
        change: string;
    };
    netRevenue: {
        value: number;
        change: string;
    };
}

export interface IChartConfig {
    shooterColor: string;
    racingColor: string;
    gridColor: string;
    textColor: string;
}

export interface IRevenueChartProps {
    data: IRevenueDataPoint[];
    config?: Partial<IChartConfig>;
    onDataPointHover?: (data: IRevenueDataPoint | null) => void;
}
