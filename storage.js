// LocalStorage wrapper & schema helpers
const KEYS = {
TX: 'pft_transactions',
CAT: 'pft_categories'
};


export function uid(prefix){
return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
}


export function getTransactions(){
return JSON.parse(localStorage.getItem(KEYS.TX) || '[]');
}
export function saveTransactions(list){
localStorage.setItem(KEYS.TX, JSON.stringify(list));
}


export function getCategories(){
const def = [
{ id:'cat_salary', name:'Salary', type:'income' },
{ id:'cat_freelance', name:'Freelance', type:'income' },
{ id:'cat_groceries', name:'Groceries', type:'expense' },
{ id:'cat_rent', name:'Rent', type:'expense' }
];
const raw = localStorage.getItem(KEYS.CAT);
if(!raw){ localStorage.setItem(KEYS.CAT, JSON.stringify(def)); return def; }
return JSON.parse(raw);
}
export function saveCategories(list){
localStorage.setItem(KEYS.CAT, JSON.stringify(list));
}


export function addTransaction(tx){
const list = getTransactions();
list.push(tx);
saveTransactions(list);
}
export function removeTransaction(id){
const list = getTransactions().filter(t => t.id !== id);
saveTransactions(list);
}


export function addCategory(cat){
const list = getCategories();
list.push(cat);
saveCategories(list);
}
export function removeCategory(id){
const list = getCategories().filter(c => c.id !== id);
saveCategories(list);
}