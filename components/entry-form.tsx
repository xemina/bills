"use client";

import { useState } from "react";
import styles from "./entry-form.module.css";

const CATEGORIES = ["食材", "坚果", "蔬菜粉", "调味品", "零食"];

export function EntryForm({ onAdd }: { onAdd: (date: string, item: string, amount: number) => Promise<void> }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    const amt = parseFloat(amount);
    if (!date || !item || isNaN(amt) || amt < 0) {
      alert("Please fill in all fields.");
      return;
    }
    setSaving(true);
    try {
      await onAdd(date, item, amt);
      setItem("");
      setAmount("");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      alert("Failed to save: " + message);
    }
    setSaving(false);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Date</label>
          <input
            type="date"
            className={styles.input}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Item</label>
          <select
            className={styles.select}
            value={item}
            onChange={(e) => setItem(e.target.value)}
          >
            <option value="" disabled>Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>{"Total ($)"}</label>
          <input
            type="number"
            className={styles.input}
            placeholder="0.00"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.btnSave}
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "Saving..." : "+ Add Entry"}
        </button>
      </div>
    </div>
  );
}
