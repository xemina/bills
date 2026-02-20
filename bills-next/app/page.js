'use client';
import { useState, useEffect } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
  :root {
    --bg: #f9f8f6; --surface: #ffffff; --border: #e9e6e1;
    --text: #18171a; --muted: #9a9590; --accent: #2d6a4f;
    --accent-light: #eaf3ee; --accent2: #b5451b;
    --shadow: 0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; padding: 56px 24px 80px; }
  .page { max-width: 600px; margin: 0 auto; animation: up 0.4s ease both; }
  @keyframes up { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  .emoji { font-size: 52px; display: block; margin-bottom: 18px; }
  h1 { font-family: 'DM Serif Display', serif; font-size: 40px; letter-spacing: -0.5px; margin-bottom: 6px; line-height: 1.1; }
  .meta { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--muted); margin-bottom: 44px; letter-spacing: 0.3px; }
  .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 40px; }
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 18px 22px; box-shadow: var(--shadow); }
  .card-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.3px; color: var(--muted); font-family: 'DM Mono', monospace; margin-bottom: 8px; }
  .card-value { font-family: 'DM Mono', monospace; font-size: 26px; font-weight: 500; color: var(--text); }
  .card-value.green { color: var(--accent); }
  .card-value.red { color: var(--accent2); }
  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .section-title { font-family: 'DM Serif Display', serif; font-size: 20px; }
  .table-wrap { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; box-shadow: var(--shadow); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
  .form-group { display: flex; flex-direction: column; gap: 5px; }
  label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.2px; color: var(--muted); font-family: 'DM Mono', monospace; }
  input[type="date"], input[type="number"], input[type="text"], select {
    border: 1px solid var(--border); border-radius: 7px; padding: 10px 12px;
    font-family: 'DM Mono', monospace; font-size: 14px; background: var(--bg);
    color: var(--text); outline: none; transition: border-color 0.15s; width: 100%;
  }
  input:focus, select:focus { border-color: var(--accent); }
  select { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239a9590' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; cursor: pointer; }
  .btn-save { background: var(--accent); color: white; border: none; border-radius: 7px; padding: 9px 20px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: opacity 0.15s; }
  .btn-save:hover { opacity: 0.85; }
  .btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
  .month-block { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; box-shadow: var(--shadow); margin-bottom: 16px; animation: up 0.3s ease both; }
  .month-header { display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; background: #f3f1ee; border-bottom: 1px solid var(--border); }
  .month-title { font-family: 'DM Serif Display', serif; font-size: 16px; color: var(--text); }
  .month-total { font-family: 'DM Mono', monospace; font-size: 14px; font-weight: 500; color: var(--accent); }
  .item-row { display: grid; grid-template-columns: 1fr 110px; padding: 11px 20px; border-bottom: 1px solid var(--border); align-items: center; gap: 10px; }
  .item-row:last-child { border-bottom: none; }
  .item-name { font-family: 'DM Mono', monospace; font-size: 13px; color: var(--text); display: flex; align-items: center; gap: 8px; }
  .item-count { font-size: 11px; color: var(--muted); background: #f0ede8; border-radius: 20px; padding: 1px 8px; font-family: 'DM Mono', monospace; }
  .item-amount { font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 500; text-align: right; color: var(--text); }
  .grand-total-block { background: var(--accent-light); border: 2px solid var(--accent); border-radius: 10px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
  .grand-total-label { font-family: 'DM Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); }
  .grand-total-val { font-family: 'DM Mono', monospace; font-size: 20px; font-weight: 500; color: var(--accent); }
  .empty { padding: 52px 20px; text-align: center; color: var(--muted); font-size: 14px; line-height: 1.8; }
  .empty-icon { font-size: 30px; margin-bottom: 10px; display: block; }
  .error-msg { background: #fdeee8; border: 1px solid #f5c6b8; border-radius: 7px; padding: 10px 14px; color: var(--accent2); font-family: 'DM Mono', monospace; font-size: 12px; margin-bottom: 16px; }
  @media (max-width: 480px) { .cards { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } h1 { font-size: 30px; } }
`;

function fmt(n) { return '$' + parseFloat(n).toFixed(2); }

export default function Home() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({ date: today, item: '', amount: '' });

  useEffect(() => {
    fetch('/api/bills')
      .then(r => r.json())
      .then(data => { setRecords(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setError('Failed to load records.'); setLoading(false); });
  }, []);

  async function addEntry() {
    if (!form.date || !form.item || !form.amount) {
      setError('Please fill in all fields.'); return;
    }
    setSaving(true); setError('');
    try {
      const res = await fetch('/api/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: form.date, item: form.item, amount: parseFloat(form.amount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      setRecords(prev => [...prev, data]);
      setForm({ date: today, item: '', amount: '' });
    } catch (e) {
      setError(e.message);
    }
    setSaving(false);
  }

  const total = records.reduce((s, r) => s + parseFloat(r.amount), 0);
  const avg = records.length ? total / records.length : 0;
  const max = records.length ? Math.max(...records.map(r => parseFloat(r.amount))) : 0;

  // Group by month
  const byMonth = {};
  records.forEach(r => {
    const key = r.date.slice(0, 7);
    if (!byMonth[key]) byMonth[key] = [];
    byMonth[key].push(r);
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="page">
        <span className="emoji">🧾</span>
        <h1>Grocery Bills</h1>
        <p className="meta">
          {records.length
            ? `${records.length} entr${records.length === 1 ? 'y' : 'ies'} · updated ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
            : 'No entries yet'}
        </p>

        <div className="cards">
          <div className="card"><div className="card-label">Total Spent</div><div className="card-value green">{fmt(total)}</div></div>
          <div className="card"><div className="card-label">Avg per Trip</div><div className="card-value">{fmt(avg)}</div></div>
          <div className="card"><div className="card-label">Trips Logged</div><div className="card-value">{records.length}</div></div>
          <div className="card"><div className="card-label">Highest Bill</div><div className="card-value red">{fmt(max)}</div></div>
        </div>

        <div className="section-header">
          <span className="section-title">New Entry</span>
        </div>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <div className="table-wrap" style={{ marginBottom: '36px' }}>
          <div style={{ padding: '20px 20px 0' }}>
            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Item</label>
                <select value={form.item} onChange={e => setForm({ ...form, item: e.target.value })}>
                  <option value="" disabled>Select category</option>
                  <option value="食材">食材</option>
                  <option value="坚果">坚果</option>
                  <option value="蔬菜粉">蔬菜粉</option>
                  <option value="调味品">调味品</option>
                  <option value="零食">零食</option>
                </select>
              </div>
              <div className="form-group">
                <label>Total ($)</label>
                <input type="number" placeholder="0.00" step="0.01" min="0" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
              </div>
            </div>
          </div>
          <div style={{ padding: '0 20px 20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-save" onClick={addEntry} disabled={saving}>
              {saving ? 'Saving…' : '＋ Add Entry'}
            </button>
          </div>
        </div>

        <div className="section-header">
          <span className="section-title">Monthly Summary</span>
        </div>

        {loading && <div style={{ textAlign: 'center', padding: '30px', fontFamily: "'DM Mono', monospace", fontSize: '13px', color: '#9a9590' }}>Loading…</div>}

        {!loading && records.length === 0 && (
          <div className="empty">
            <span className="empty-icon">🛒</span>
            No bills recorded yet.<br />Fill in the form above to start tracking.
          </div>
        )}

        {Object.keys(byMonth).sort().map(monthKey => {
          const entries = byMonth[monthKey];
          const monthTotal = entries.reduce((s, r) => s + parseFloat(r.amount), 0);
          const byItem = {};
          entries.forEach(r => {
            const item = r.item || '—';
            if (!byItem[item]) byItem[item] = { total: 0, count: 0 };
            byItem[item].total += parseFloat(r.amount);
            byItem[item].count += 1;
          });
          const [year, mon] = monthKey.split('-');
          const monthLabel = new Date(year, mon - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          return (
            <div className="month-block" key={monthKey}>
              <div className="month-header">
                <span className="month-title">{monthLabel}</span>
                <span className="month-total">{fmt(monthTotal)}</span>
              </div>
              {Object.entries(byItem).sort((a, b) => b[1].total - a[1].total).map(([item, data]) => (
                <div className="item-row" key={item}>
                  <div className="item-name">
                    {item}
                    {data.count > 1 && <span className="item-count">×{data.count}</span>}
                  </div>
                  <div className="item-amount">{fmt(data.total)}</div>
                </div>
              ))}
            </div>
          );
        })}

        {records.length > 0 && (
          <div className="grand-total-block">
            <div className="grand-total-label">Grand Total</div>
            <div className="grand-total-val">{fmt(total)}</div>
          </div>
        )}
      </div>
    </>
  );
}
