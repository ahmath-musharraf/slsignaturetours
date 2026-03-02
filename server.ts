import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const db = new Database("tours.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS tours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    duration TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    itinerary TEXT NOT NULL,
    includes TEXT NOT NULL,
    excludes TEXT NOT NULL,
    image_url TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tour_id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    guests INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY(tour_id) REFERENCES tours(id)
  );

  CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    image_url TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT NOT NULL
  );
`);

// Seed initial data if empty
const tourCount = db.prepare("SELECT COUNT(*) as count FROM tours").get() as { count: number };
if (tourCount.count === 0) {
  const insertTour = db.prepare(`
    INSERT INTO tours (title, category, duration, price, description, itinerary, includes, excludes, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertTour.run(
    "Cultural Triangle Explorer",
    "Cultural Tours",
    "7 Days",
    1200,
    "Journey through the heart of Sri Lanka's ancient civilizations.",
    JSON.stringify([
      { day: 1, title: "Arrival & Negombo", desc: "Welcome to Sri Lanka! Relax by the beach." },
      { day: 2, title: "Anuradhapura", desc: "Explore the first capital of Sri Lanka." },
      { day: 3, title: "Sigiriya Rock", desc: "Climb the majestic Lion Rock fortress." }
    ]),
    JSON.stringify(["Accommodation", "Breakfast", "Guide", "Transport"]),
    JSON.stringify(["Lunch", "Dinner", "Entrance Fees"]),
    "https://images.unsplash.com/photo-1588598136852-d71803f3937d?auto=format&fit=crop&w=800&q=80"
  );

  insertTour.run(
    "Wild Sri Lanka Safari",
    "Wildlife Safari",
    "5 Days",
    950,
    "Encounter leopards, elephants, and exotic birds in their natural habitat.",
    JSON.stringify([
      { day: 1, title: "Yala Arrival", desc: "Evening safari in Yala National Park." },
      { day: 2, title: "Udawalawe", desc: "Visit the Elephant Transit Home." }
    ]),
    JSON.stringify(["Jeep Safaris", "Accommodation", "Park Fees"]),
    JSON.stringify(["International Flights", "Personal Expenses"]),
    "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80"
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/tours", (req, res) => {
    const tours = db.prepare("SELECT * FROM tours").all();
    res.json(tours);
  });

  app.get("/api/tours/:id", (req, res) => {
    const tour = db.prepare("SELECT * FROM tours WHERE id = ?").get(req.params.id);
    if (tour) res.json(tour);
    else res.status(404).json({ error: "Tour not found" });
  });

  app.post("/api/bookings", (req, res) => {
    const { tour_id, name, email, phone, date, guests } = req.body;
    const info = db.prepare(`
      INSERT INTO bookings (tour_id, name, email, phone, date, guests)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(tour_id, name, email, phone, date, guests);
    res.json({ id: info.lastInsertRowid });
  });

  app.get("/api/blogs", (req, res) => {
    const blogs = db.prepare("SELECT * FROM blogs").all();
    res.json(blogs);
  });

  app.post("/api/contacts", (req, res) => {
    const { name, email, phone, message } = req.body;
    const date = new Date().toISOString();
    const info = db.prepare(`
      INSERT INTO contacts (name, email, phone, message, date)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email, phone, message, date);
    res.json({ id: info.lastInsertRowid });
  });

  // Admin Routes (Simplified for demo)
  app.get("/api/admin/bookings", (req, res) => {
    const bookings = db.prepare(`
      SELECT b.*, t.title as tour_title 
      FROM bookings b 
      LEFT JOIN tours t ON b.tour_id = t.id
    `).all();
    res.json(bookings);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
