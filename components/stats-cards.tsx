import styles from "./stats-cards.module.css";

function fmt(n: number) {
  return "$" + n.toFixed(2);
}

export function StatsCards({
  total,
  avg,
  count,
  max,
}: {
  total: number;
  avg: number;
  count: number;
  max: number;
}) {
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <div className={styles.label}>Total Spent</div>
        <div className={`${styles.value} ${styles.green}`}>{fmt(total)}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>Avg per Trip</div>
        <div className={styles.value}>{fmt(avg)}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>Trips Logged</div>
        <div className={styles.value}>{count}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>Highest Bill</div>
        <div className={`${styles.value} ${styles.red}`}>{fmt(max)}</div>
      </div>
    </div>
  );
}
