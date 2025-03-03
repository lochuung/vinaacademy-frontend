import { Card } from "@/components/ui/card";

interface ChartsGridProps {
    barChart: React.ReactNode;
    areaChart: React.ReactNode;
    pieChart: React.ReactNode;
    recentSales: React.ReactNode;
}

export function ChartsGrid({
    barChart,
    areaChart,
    pieChart,
    recentSales,
}: ChartsGridProps) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">{barChart}</div>
            <Card className="col-span-4 md:col-span-3">{recentSales}</Card>
            <div className="col-span-4">{areaChart}</div>
            <div className="col-span-4 md:col-span-3">{pieChart}</div>
        </div>
    );
}
