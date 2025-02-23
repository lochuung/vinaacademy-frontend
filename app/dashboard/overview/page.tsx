"use client"; // Chỉ định rằng file này sẽ được render phía client

import React from 'react'; // Import React
import OverViewLayout from './layout'; // Import component OverViewLayout từ file layout

// Định nghĩa component OverviewPage
export default function OverviewPage() {
    return (
        // Sử dụng OverViewLayout và truyền các component con vào các props tương ứng
        <OverViewLayout
            sales={<SalesComponent />} // Truyền component SalesComponent vào prop sales
            pie_stats={<PieChartComponent />} // Truyền component PieChartComponent vào prop pie_stats
            bar_stats={<BarChartComponent />} // Truyền component BarChartComponent vào prop bar_stats
            area_stats={<AreaChartComponent />} // Truyền component AreaChartComponent vào prop area_stats
        />
    );
}

// Định nghĩa component SalesComponent
function SalesComponent() {
    return <div className="bg-white p-4 shadow rounded-lg">Sales Chart</div>; // Trả về một div chứa văn bản "Sales Chart"
}

// Định nghĩa component PieChartComponent
function PieChartComponent() {
    return <div className="bg-white p-4 shadow rounded-lg">Pie Chart</div>; // Trả về một div chứa văn bản "Pie Chart"
}

// Định nghĩa component BarChartComponent
function BarChartComponent() {
    return <div className="bg-white p-4 shadow rounded-lg">Bar Chart</div>; // Trả về một div chứa văn bản "Bar Chart"
}

// Định nghĩa component AreaChartComponent
function AreaChartComponent() {
    return <div className="bg-white p-4 shadow rounded-lg">Area Chart</div>; // Trả về một div chứa văn bản "Area Chart"
}