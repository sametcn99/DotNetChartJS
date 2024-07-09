console.log("ChartJS.js loaded");

function createChart(chartModelJSON) {
    try {
        console.log("///////////////");
        const chartData = JSON.parse(chartModelJSON);
        console.log('Parsed chart data:', chartData.label, chartData.type, chartData);

        if (!validateChartData(chartData)) {
            displayError(`Invalid chart data: ${JSON.stringify(chartData)}`);
            return;
        }

        const ctx = document.getElementById(chartData.chartId);
        if (!ctx) {
            displayError(`Element with id ${chartData.chartId} not found.`);
            return;
        }

        const chart = new Chart(ctx, {
            type: chartData.type,
            data: {
                labels: chartData.labels,
                datasets: chartData.datasets.map(dataset => ({
                    type: dataset.type,
                    label: dataset.label,
                    fill: true,
                    data: dataset.data || dataset.dataBubble || dataset.dataScatter,
                    backgroundColor: dataset.backgroundColor,
                    borderWidth: 1,
                    hoverOffset: 4
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 20,
                            padding: 10
                        }
                    }
                },
                animations: {
                    tension: {
                        duration: 5000,
                        easing: 'linear',
                        from: 1,
                        to: 0,
                        loop: true
                    }
                }
            }
        });
        console.log('Chart created:', chartData.label, chartData.type, chart);
    } catch (error) {
        displayError(`Error creating chart: ${error.message}`);
    }
}

function validateChartData(chartData) {
    if (!chartData.chartId || typeof chartData.chartId !== 'string') {
        console.error('Invalid or missing chartId');
        return false;
    }
    if (!chartData.type || typeof chartData.type !== 'string') {
        console.error('Invalid or missing chart type');
        return false;
    }
    if (!Array.isArray(chartData.labels) || chartData.labels.length === 0) {
        console.error('Invalid or missing labels');
        return false;
    }
    if (!Array.isArray(chartData.datasets) || chartData.datasets.length === 0) {
        console.error('Invalid or missing datasets');
        return false;
    }
    for (const dataset of chartData.datasets) {
        if ((!Array.isArray(dataset.data) || dataset.data.length === 0) &&
            (!Array.isArray(dataset.dataBubble) || dataset.dataBubble.length === 0) &&
            (!Array.isArray(dataset.dataScatter) || dataset.dataScatter.length === 0)) {
            console.error('Invalid or missing dataset data');
            return false;
        }
        if (!Array.isArray(dataset.backgroundColor) || dataset.backgroundColor.length === 0) {
            console.error('Invalid or missing dataset backgroundColor');
            return false;
        }
    }
    console.log('Chart data is valid', chartData.label, chartData.type);
    return true;
}

function displayError(message) {
    const ctx = document.getElementById(chartData.chartId);
    if (ctx) {
        ctx.innerHTML = `<div style="color: red;">${message}</div>`;
    }
    console.error(message);
}
