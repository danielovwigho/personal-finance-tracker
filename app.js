import { uid, getTransactions, saveTransactions, addTransaction, removeTransaction, getCategories, saveCategories, addCategory, removeCategory } from './storage.js';
const catName = categories.get(r.categoryId)?.name || '';
tr.innerHTML = `
<td>${r.date}</td>
<td>${r.type}</td>
<td>${catName}</td>
<td class="right">${fmt(r.amount)}</td>
<td>${r.note||''}</td>
<td class="right"><button class="action-del" data-id="${r.id}">Delete</button></td>
`;
tr.querySelector('button').addEventListener('click', ()=>{
removeTransaction(r.id);
state.transactions = getTransactions();
render();
});
tbody.appendChild(tr);
});


const sum = summarize(rows);
totalIncome.textContent = fmt(sum.income);
totalExpense.textContent = fmt(sum.expense);
balance.textContent = fmt(sum.balance);


renderIncomeExpenseChart(chartCanvas, sum);
}


function render(){
refreshCategorySelects();
renderCategories();
renderTable();
}


// Events


txType.addEventListener('change', refreshCategorySelects);


txForm.addEventListener('submit', (e)=>{
e.preventDefault();
const tx = {
id: uid('tx'),
type: txType.value,
amount: Number(txAmount.value),
date: txDate.value,
categoryId: txCategory.value,
note: txNote.value.trim(),
createdAt: Date.now()
};
if(!tx.date || !tx.categoryId || !(tx.amount>=0)) return;
addTransaction(tx);
state.transactions = getTransactions();
txAmount.value = '';
txNote.value = '';
render();
});


catForm.addEventListener('submit', (e)=>{
e.preventDefault();
const name = catName.value.trim();
const type = catType.value;
if(!name) return;
addCategory({ id: uid('cat'), name, type });
state.categories = getCategories();
catName.value = '';
render();
});


filterForm.addEventListener('submit', (e)=>{
e.preventDefault();
state.filters = {
type: fType.value,
category: fCategory.value,
from: fFrom.value || null,
to: fTo.value || null,
min: fMin.value,
max: fMax.value,
sort: fSort.value
};
render();
});


btnReset.addEventListener('click', ()=>{
fType.value='all'; fCategory.value='all'; fFrom.value=''; fTo.value=''; fMin.value=''; fMax.value=''; fSort.value='date_desc';
state.filters = { type:'all', category:'all', from:null, to:null, min:null, max:null, sort:'date_desc' };
render();
});


btnExport.addEventListener('click', ()=>{
const rows = applyFilters(state.transactions, state.filters);
const csv = toCSV(rows, state.categories);
downloadCSV(csv, 'finance-tracker.csv');
});


// First paint
render();