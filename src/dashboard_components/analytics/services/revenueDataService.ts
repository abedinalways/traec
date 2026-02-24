
import { IRevenueDataPoint, IRevenueStats, TimePeriod } from "../types/revenue.types";

export class RevenueDataService {
    /**
     * Get monthly revenue data
     */
    static getMonthlyData(): IRevenueDataPoint[] {
        return [
            { month: "Jan", shooter: 200, racing: 150 },
            { month: "Feb", shooter: 300, racing: 180 },
            { month: "Mar", shooter: 250, racing: 200 },
            { month: "Apr", shooter: 400, racing: 250 },
            { month: "May", shooter: 350, racing: 300 },
            { month: "Jun", shooter: 388.23, racing: 780.02 },
            { month: "Jul", shooter: 450, racing: 320 },
            { month: "Aug", shooter: 500, racing: 350 },
            { month: "Sep", shooter: 480, racing: 380 },
            { month: "Oct", shooter: 550, racing: 400 },
            { month: "Nov", shooter: 600, racing: 450 },
            { month: "Dec", shooter: 650, racing: 500 },
        ];
    }

    /**
     * Get yearly aggregated data
     */
    static getYearlyData(): IRevenueDataPoint[] {
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
    static getDataByPeriod(period: TimePeriod): IRevenueDataPoint[] {
        return period === "Monthly" ? this.getMonthlyData() : this.getYearlyData();
    }

    /**
     * Get revenue statistics
     */
    static getRevenueStats(): IRevenueStats {
        const monthlyData = this.getMonthlyData();
        const totalShooter = monthlyData.reduce((sum, item) => sum + item.shooter, 0);
        const totalRacing = monthlyData.reduce((sum, item) => sum + item.racing, 0);

        return {
            shooter: {
                value: 75000,
                change: "10%",
            },
            racing: {
                value: 10000,
                change: "10%",
            },
            netRevenue: {
                value: 85000,
                change: "12%",
            },
        };
    }

    /**
     * Format currency value
     */
    static formatCurrency(value: number): string {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    }
}
