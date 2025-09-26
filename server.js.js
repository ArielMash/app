// server.js
import express from 'express';
import cors from 'cors';
import pg from 'pg';

const app = express();
app.use(cors());               // מאפשר קריאה מהאתר שלך (CORS)
app.use(express.json());       // מאפשר קריאה של JSON מהבקשות

// חיבור ל-Postgres
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

// יצירת טבלה אם היא לא קיימת
pool.query(`
  CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(150),
    created_at TIMESTAMP DEFAULT NOW()
  );
`).catch(err => console.error("Error creating table:", err));

// קבלת טופס מהאתר
app.post('/api/form', async (req,res) => {
  const { name, phone, email } = req.body;
  try {
    await pool.query(
      'INSERT INTO leads (name, phone, email) VALUES ($1,$2,$3)',
      [name, phone, email]
    );
    res.json({ status: 'ok' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ status: 'error' });
  }
});

// אפשרות לראות את כל ההגשות (לניהול, רק לך)
app.get('/api/leads', async (req,res) => {
  // אפשר להוסיף אימות עם אימייל שלך כאן
  try {
    const { rows } = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(rows);
  } catch(err) {
    console.error(err);
    res.status(500).json({ status: 'error' });
  }
});

// הפעלת השרת
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
