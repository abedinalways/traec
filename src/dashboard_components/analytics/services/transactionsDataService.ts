/**
 * Transactions Data Service - Following Dependency Inversion Principle
 * Abstract data operations from components
 */

import { ITransactionDataPoint } from "../types/transactions.types";
import { TimePeriod } from "../types/revenue.types";

export class TransactionsDataService {
    /**
     * Get monthly transactions data
     * Different from revenue data - represents transaction counts/volumes
     */
    static getMonthlyData(): ITransactionDataPoint[] {
        return [
            { month: "Jan", shooter: 180, racing: 120 },
            { month: "Feb", shooter: 280, racing: 160 },
            { month: "Mar", shooter: 220, racing: 190 },
            { month: "Apr", shooter: 380, racing: 240 },
            { month: "May", shooter: 320, racing: 280 },
            { month: "Jun", shooter: 360, racing: 720 },
            { month: "Jul", shooter: 420, racing: 480 },
            { month: "Aug", shooter: 480, racing: 320 },
            { month: "Sep", shooter: 450, racing: 360 },
            { month: "Oct", shooter: 520, racing: 380 },
            { month: "Nov", shooter: 580, racing: 420 },
            { month: "Dec", shooter: 620, racing: 480 },
        ];
    }

    /**
     * Get yearly aggregated transactions data
     */
    static getYearlyData(): ITransactionDataPoint[] {
        const monthlyData = this.getMonthlyData();
        const yearlyShooter = monthlyData.reduce((sum, item) => sum + item.shooter, 0);
        const yearlyRacing = monthlyData.reduce((sum, item) => sum + item.racing, 0);

        return [
            { month: "Year", shooter: yearlyShooter, racing: yearlyRacing },
        ];
    }

    /**
     * Get data based on time period
     */
    static getDataByPeriod(period: TimePeriod): ITransactionDataPoint[] {
        return period === "Monthly" ? this.getMonthlyData() : this.getYearlyData();
    }

    /**
     * Calculate percentage change for a data point
     */
    static calculateChange(current: number, previous: number): string {
        if (previous === 0) return "+0%";
        const change = ((current - previous) / previous) * 100;
        const sign = change >= 0 ? "+" : "";
        return `${sign}${change.toFixed(0)}%`;
    }
}
