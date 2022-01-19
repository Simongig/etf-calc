

var elements = {
    seed_capital: document.getElementById("seed_capital"),
    monthly_deposit: document.getElementById("monthly_deposit"),
    annual_performance: document.getElementById("annual_performance"),
    duration: document.getElementById("duration")
}
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: label_set,
        datasets: [{
            label: 'seed capital',
            data: data_set,
            backgroundColor: [
                'rgb(255, 99, 132)',
            ]
        }, {
            label: 'monthly deposit',
            data: data_set,
            backgroundColor: [
                'rgb(75, 192, 192)',
            ]
        }, {
            label: 'gain',
            data: data_set,
            backgroundColor: [
                'rgb(54, 162, 235)',
            ]
        },
        ]
    },
    options: {
        responsive: true,
        aspectRatio: 4/3,
        scales: {
            x: {
                stacked: true
            },
            y: {
                beginAtZero: true,
                stacked: true
            }
        }
    }
});

var seed_capital = 10000;
var monthly_deposit = 300;
var monthly_deposit_total = 0;
var annual_performance = 5;
var duration = 10;
var gain = 0;
var data_set = [];
var label_set = []

function setup() {
    elements.seed_capital.placeholder = seed_capital;
    elements.monthly_deposit.placeholder = monthly_deposit;
    elements.annual_performance.placeholder = annual_performance;
    elements.duration.placeholder = duration;
}

function updateChart() {
    clearChartData()
    set_chart_constraints()
    console.log(`seed: ${seed_capital}, monthly: ${monthly_deposit}, annual: ${annual_performance}, duration: ${duration}`)

    for (let index = 0; index < duration; index++) {
        myChart.data.labels.push(index);
    }

    calculate_etf()
    myChart.update();
}

function set_chart_constraints() {

    seed_capital = parseInt(elements.seed_capital.value) ? parseInt(elements.seed_capital.value) : 10000;
    monthly_deposit = parseInt(elements.monthly_deposit.value) ? parseInt(elements.monthly_deposit.value) : 300;
    annual_performance = parseInt(elements.annual_performance.value) ? parseInt(elements.annual_performance.value) : 5;
    duration = parseInt(elements.duration.value) ? parseInt(elements.duration.value) : 10;
}

function clearChartData() {
    myChart.data.labels = []
    myChart.data.datasets.forEach(dataset =>
        dataset.data = [])
    monthly_deposit_total = 0
    gain = 0
}

function calculate_etf() {
    for (let index = 0; index < duration; index++) {
        if (monthly_deposit) {
            monthly_deposit_total += 12 * monthly_deposit
        }
        gain += (seed_capital + monthly_deposit_total + gain) / 100 * (annual_performance);
        myChart.data.datasets[0].data.push((seed_capital))
        myChart.data.datasets[1].data.push((monthly_deposit_total))
        myChart.data.datasets[2].data.push((gain))
    }
}
function main() {
    for (const [key, value] of Object.entries(elements)) {
        value.addEventListener("keyup", ev => {
            console.log(ev.key)
            updateChart()
        })
    }

    setup()
    updateChart()
}

main()