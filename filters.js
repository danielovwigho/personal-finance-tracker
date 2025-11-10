// Filtering & sorting helpers
export function applyFilters(transactions, {
type='all', category='all', from=null, to=null, min=null, max=null, sort='date_desc'
}){
let rows = [...transactions];
if(type !== 'all') rows = rows.filter(r => r.type === type);
if(category !== 'all') rows = rows.filter(r => r.categoryId === category);
if(from) rows = rows.filter(r => r.date >= from);
if(to) rows = rows.filter(r => r.date <= to);
if(min != null && min !== '') rows = rows.filter(r => Number(r.amount) >= Number(min));
if(max != null && max !== '') rows = rows.filter(r => Number(r.amount) <= Number(max));


switch(sort){
case 'date_asc': rows.sort((a,b)=> a.date.localeCompare(b.date)); break;
case 'date_desc': rows.sort((a,b)=> b.date.localeCompare(a.date)); break;
case 'amount_asc': rows.sort((a,b)=> Number(a.amount)-Number(b.amount)); break;
case 'amount_desc': rows.sort((a,b)=> Number(b.amount)-Number(a.amount)); break;
}
return rows;
}


export function summarize(rows){
const income = rows.filter(r=>r.type==='income').reduce((s,r)=>s+Number(r.amount),0);
const expense = rows.filter(r=>r.type==='expense').reduce((s,r)=>s+Number(r.amount),0);
return { income, expense, balance: income - expense };
}