import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // Create table if it doesn't exist yet
    await sql`
      CREATE TABLE IF NOT EXISTS bills (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        item TEXT,
        amount NUMERIC(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    if (req.method === 'GET') {
      const { rows } = await sql`SELECT * FROM bills ORDER BY date ASC, created_at ASC`;
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { date, item, amount } = req.body;
      const { rows } = await sql`
        INSERT INTO bills (date, item, amount)
        VALUES (${date}, ${item}, ${amount})
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await sql`DELETE FROM bills WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
