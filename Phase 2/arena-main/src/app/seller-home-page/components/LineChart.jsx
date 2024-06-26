import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
    const [chartData, setChartData] = useState({
        series: [],
        labels: [],
    });

    useEffect(() => {
        fetchPrices();
    }, []);

    const fetchPrices = async () => {
        try {
            const response = await fetch("api/gamesListings"); // Assuming this endpoint returns game prices
            if (response.ok) {
                const data = await response.json();
                console.log(data.map((game) => game.price));

                const prices = data.map((game) => game.price);
                const labels = data.map((game) => game.title);

                setChartData({ series: [{ data: prices }], labels });
            } else {
                console.error("Failed to fetch game prices");
            }
        } catch (error) {
            console.error("An error occurred while fetching prices:", error);
        }
    };

    const { series, labels } = chartData;
    const chartOptions = {
        colors: ['#79e200'], // Setting line color to green
        sparkline: {
            enabled: false,
        },
        theme: {
            mode: "dark",
        },
        stroke: {
            curve: "smooth",
        },
        chart: {
            type: "line",
            height: 350,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            background: "black",
        },
        legend: {
            show: false,
        },
        yaxis: {
            title: {
                text: "Price",
            },
        },
        xaxis: {
            type: "category",
            
        },
        tooltip: {
            shared: false,
            y: {
                formatter: (val) => `$${val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`,
            },
        },
    };

    return (
        <>
            {(typeof window !== 'undefined') &&
                <Chart
                    options={chartOptions}
                    series={series}
                    type="line"
                    height={chartOptions.chart.height}
                />
            }
        </>
    );
};

export default LineChart;
