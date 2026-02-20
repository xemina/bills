"use client";

import { useState, useEffect, useCallback } from "react";
import { StatsCards } from "./stats-cards";
import { EntryForm } from "./entry-form";
import { MonthlySummary } from "./monthly-summary";
import styles from "./bills-app.module.css";

interface Bill {
  id: number;
  date: string;
  item: string;
  amount: string;
  created_at: string;
}

export function BillsApp() {
  const [records, setRecords] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRecords = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bills");
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      }
    } catch (e) {
      console.error("Failed to load:", e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const addRecord = async (date: string, item: string, amount: number) => {
    const res = await fetch("/api/bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, item, amount }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Server error: " + res.status);
    }
    const newRecord = await res.json();
    setRecords((prev) => [...prev, newRecord]);
  };

  const deleteRecord = async (id: number) => {
    const res = await fetch(`/api/bills?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const total = records.reduce((s, r) => s + parseFloat(r.amount), 0);
  const avg = records.length ? total / records.length : 0;
  const max = records.length
    ? Math.max(...records.map((r) => parseFloat(r.amount)))
    : 0;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Grocery Bills</h1>
      <p className={styles.meta}>
        {records.length
          ? `${records.length} entr${records.length === 1 ? "y" : "ies"}`
          : "No entries yet"}
      </p>

      <StatsCards total={total} avg={avg} count={records.length} max={max} />

      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>New Entry</span>
      </div>
      <EntryForm onAdd={addRecord} />

      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>Monthly Summary</span>
      </div>

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : records.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>No bills recorded yet.</span>
          <br />
          Fill in the form above to start tracking.
        </div>
      ) : (
        <MonthlySummary records={records} onDelete={deleteRecord} />
      )}
    </div>
  );
}
