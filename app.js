import {
  uid,
  getTransactions,
  saveTransactions,
  addTransaction,
  removeTransaction,
  getCategories,
  saveCategories,
  addCategory,
  removeCategory
} from './storage.js';
import { applyFilters, summarize } from './filters.js';
import { toCSV, downloadCSV } from './csv.js';
import { renderIncomeExpenseChart } from './charts.js';

// Elements
const txForm = document.getElementById('tx-form');
const txType = document.getElementById('tx-type');
const txAmount = document.getElementById('tx-amount');
const txDate = document.getElementById('tx-date');
const txCategory = document.getElementById('tx-category');
const txNote = document.getElementById('tx-note');

const catForm = document.getElementById('cat-form');
const catName = document.getElementById('cat-name');
const catType = document.getElementById('cat-type');
const catList = document.getElementById('cat-list');

const filterForm = document.getElementById('filter-form');
const fType = document.getElementById('f-type');
const fCategory = document.getElementById('f-category');
const fFrom = document.getElementById('f-from');
const fTo = document.getElementById('f-to');
const fMin = document.getElementById('f-min');
const fMax = document.getElementById('f-max');
const fSort = document.getElementById('f-sort');
const btnReset = document.getElementById('btn-reset');
const btnExport = document.getElementById('btn-export');

const tbody = document.getElementById('tx-tbody');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const balance = document.getElementById('balance');
const chartCanvas = document.getElementById('ie-chart');

// Init default date
if (txDate) txDate.value = new Date().toISOString().slice(0, 10);

let state = {
  transactions: getTransactions(),
  categories: getCategories(),
  filters: {
    type: 'all',
    category: 'all',
    from: null,
    to: null,
    min: null,
    max: null,
    sort: 'date_desc'
  }
};

function fmt(n) {
  return Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function refreshCategorySelects() {
  const currentType = txType.value;

  // Transaction form category select (only matching type)
  txCategory.innerHTML = '';
  const matches = state.categories.filter(c => c.type === currentType);
  if (matches.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'No categories — add one below';
    txCategory.appendChild(opt);
  } else {
    matches.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      txCategory.appendChild(opt);
    });
  }

  // Filter select (all categories)
  const prev = fCategory.value || 'all';
  fCategory.innerHTML = '';
  const all = document.createElement('option');
  all.value = 'all';
  all.textContent = 'All';
  fCategory.appendChild(all);
  state.categories.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.name} (${c.type})`;
    fCategory.appendChild(opt);
  });
  fCategory.value = prev;
}

function renderCategories() {
  catList.innerHTML = '';
  state.categories.forEach(c => {
    const li = document.createElement('li');
    li.className = 'cat-item';
    li.innerHTML = `
      <span>${c.name} <span class="tag">(${c.type})</span></span>
      <button class="action-del" data-id="${c.id}">Delete</button>
    `;
    li.querySelector('button').addEventListener('click', () => {
      removeCategory(c.id);
      // Also remove transactions pointing to deleted category
      const tx = getTransactions().filter(t => t.categoryId !== c.id);
      saveTransactions(tx);
      state.categories = getCategories();
      state.transactions = getTransactions();
      refreshCategorySelects();
      render();
    });
    catList.appendChild(li);
  });
}

function renderTable() {
  const categoriesMap = new Map(state.categories.map(c => [c.id, c]));
  const rows = applyFilters(state.transactions, state.filters);
  tbody.innerHTML = '';
  rows.forEach(r => {
    const tr = document.createElement('tr');
    const catLabel = categoriesMap.get(r.categoryId)?.name || '';
    tr.innerHTML = `
      <td>${r.date}</td>
      <td>${r.type}</td>
      <td>${catLabel}</td>
      <td class="right">${fmt(r.amount)}</td>
      <td>${r.note || ''}</td>
      <td class="right"><button class="action-del" data-id="${r.id}">Delete</button></td>
    `;
    tr.querySelector('button').addEventListener('click', () => {
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

function render() {
  refreshCategorySelects();
  renderCategories();
  renderTable();
}

// Events
txType.addEventListener('change', refreshCategory

