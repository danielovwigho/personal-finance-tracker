let chartRef = null;


export function renderIncomeExpenseChart(ctx, summary){
if(!window.Chart || !ctx) return; // Chart.js not loaded or no canvas
if(chartRef){ chartRef.destroy(); }
chartRef = new Chart(ctx, {
type: 'bar',
data: {
labels: ['Income','Expense','Balance'],
datasets: [{
label: 'Amount',
data: [summary.income, summary.expense, summary.balance]
}]
},
options: {
responsive: true,
plugins: { legend: { display: false } },
scales: { y: { beginAtZero: true } }
}
});
}