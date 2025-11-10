import { applyFilters, summarize } from './filters.js';


function expect(name, condition){
const li = document.createElement('li');
li.className = condition ? 'ok' : 'fail';
li.textContent = (condition ? '✔ ' : '✖ ') + name;
document.getElementById('results').appendChild(li);
if(!condition) throw new Error('Test failed: ' + name);
}


// Fixtures
const rows = [
{ id:'1', type:'income', amount:1000, date:'2025-11-01', categoryId:'a' },
{ id:'2', type:'expense', amount:200, date:'2025-11-02', categoryId:'b' },
{ id:'3', type:'expense', amount:300, date:'2025-11-03', categoryId:'b' },
{ id:'4', type:'income', amount:500, date:'2025-10-31', categoryId:'a' },
];


try{
// Filter by type
const onlyIncome = applyFilters(rows, { type:'income', category:'all', from:null, to:null, min:null, max:null, sort:'date_desc' });
expect('filter income count', onlyIncome.length === 2);


// Date range
const nov = applyFilters(rows, { type:'all', category:'all', from:'2025-11-01', to:'2025-11-30', min:null, max:null, sort:'date_desc' });
expect('date range includes only Nov', nov.every(r=>r.date.startsWith('2025-11')));


// Amount range
const min250 = applyFilters(rows, { type:'all', category:'all', from:null, to:null, min:250, max:null, sort:'date_desc' });
expect('min amount >= 250', min250.every(r=>r.amount>=250));


// Sort
const asc = applyFilters(rows, { type:'all', category:'all', from:null, to:null, min:null, max:null, sort:'amount_asc' });
expect('amount asc sorted', asc.map(r=>r.amount).join(',')==='200,300,500,1000');


// Summaries
const s = summarize(rows);
expect('income sum', s.income === 1500);
expect('expense sum', s.expense === 500);
expect('balance calc', s.balance === 1000);


console.log('All tests passed');
}catch(e){
console.error(e);
}