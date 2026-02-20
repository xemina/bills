import { neon } from '@neondatabase/serverless';

function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return neon(process.env.DATABASE_URL);
}

async function initTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS bills (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
      item TEXT,
      amount NUMERIC(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

export async function GET() {
  try {
    const sql = getDb();
    await initTable(sql);
    const rows = await sql`SELECT * FROM bills ORDER BY date ASC, created_at ASC`;
    return Response.json(rows);
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const sql = getDb();
    await initTable(sql);
    const { date, item, amount } = await req.json();
    const rows = await sql`
      INSERT INTO bills (date, item, amount)
      VALUES (${date}, ${item}, ${amount})
      RETURNING *
    `;
    return Response.json(rows[0], { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const sql = getDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await sql`DELETE FROM bills WHERE id = ${id}`;
    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
