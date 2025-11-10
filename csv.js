export function toCSV(rows, categories){
const catMap = new Map(categories.map(c=>[c.id, c]));
const headers = ['Date','Type','Category','Amount','Note'];
const lines = [headers.join(',')];
for(const r of rows){
const cat = catMap.get(r.categoryId)?.name || '';
const fields = [r.date, r.type, cat, String(r.amount), (r.note||'')]
.map(s => '"'+String(s).replaceAll('"','""')+'"');
lines.push(fields.join(','));
}
return lines.join('\n');
}


export function downloadCSV(content, filename='transactions.csv'){
const blob = new Blob([content], {type:'text/csv;charset=utf-8;'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url; a.download = filename; a.click();
URL.revokeObjectURL(url);
}