const BAR_CHART_OPTIONS = {
        responsive              : true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: { position: 'top'},
    }

function dataBarChartHandler(data) {

    let datasets = [];

    $.each(data, (key, value) => {
        datasets.push({
            label: (value.name).escape(),
            backgroundColor: `#${randomHexColor()}`,
            data: [value.total],
        })
    });

    return datasets;

}

async function brandChartHandler() {
    const ajaxData = [
        {
            "name": "Brand 1",
            "total": 10
        },
        {
            "name": "Brand 2",
            "total": 15
        },
        {
            "name": "Brand 3",
            "total": 8
        },
        {
            "name": "Brand 4",
            "total": 0
        },
        {
            "name": "Brand 5",
            "total": 13
        }
    ];

    let barChartData = {
        labels: ["Total"],
        datasets: dataBarChartHandler(ajaxData)
    }

    let barChartCanvas = $('#brand-chart').get(0).getContext('2d');

    let barChart = new Chart(barChartCanvas, {
        type: 'bar', 
        data: barChartData,
        options: BAR_CHART_OPTIONS
    })
}

async function categoryChartHandler() {
    const ajaxData = [
        {
            "name": "Category 1",
            "total": 33
        },
        {
            "name": "Category 2",
            "total": 45
        },
        {
            "name": "Category 3",
            "total": 4
        },
        {
            "name": "Category 4",
            "total": 10
        },
        {
            "name": "Category 5",
            "total": 13
        }
    ];

    let barChartData = {
        labels: ["Total"],
        datasets: dataBarChartHandler(ajaxData)
    }

    let barChartCanvas = $('#category-chart').get(0).getContext('2d');

    let barChart = new Chart(barChartCanvas, {
        type: 'bar', 
        data: barChartData,
        options: BAR_CHART_OPTIONS
    })
}

async function dashboardChartRun() {
    await brandChartHandler();
    await categoryChartHandler();
}

$(document).ready(() => {
    if (DASHBOARD_PAGE) {
        dashboardChartRun();
    }
});