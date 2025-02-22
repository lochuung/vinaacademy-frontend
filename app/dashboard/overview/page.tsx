"use client";

import React from 'react';
import OverViewLayout from './layout';
export default async function OverviewPage() {
    return (
        <OverViewLayout
            sales={<SalesComponent />}
            pie_stats={<PieChartComponent />}
            bar_stats={<BarChartComponent />}
            area_stats={<AreaChartComponent />}
        />
    );
}

function SalesComponent() {
    return <div className="bg-white p-4 shadow rounded-lg">Sales Chart</div>;
}

function PieChartComponent() {
    return <div className="bg-white p-4 shadow rounded-lg">Pie Chart</div>;
}

function BarChartComponent() {
    return <div className="bg-white p-4 shadow rounded-lg">Bar Chart</div>;
}

function AreaChartComponent() {
    return <div className="bg-white p-4 shadow rounded-lg">Area Chart</div>;
}