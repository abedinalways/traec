/**
 * Transactions Types - Following Interface Segregation Principle
 * Separate interfaces for different concerns
 */

import { TimePeriod } from "./revenue.types";

export interface ITransactionDataPoint {
    month: string;
    shooter: number;
    racing: number;
}

export interface ITransactionChartProps {
    data: ITransactionDataPoint[];
    period: TimePeriod;
    config?: Partial<ITransactionChartConfig>;
    onDataPointHover?: (data: ITransactionDataPoint | null) => void;
}

export interface ITransactionChartConfig {
    shooterColor: string;
    racingColor: string;
    gridColor: string;
    textColor: string;
    activeDotColor: string;
}
