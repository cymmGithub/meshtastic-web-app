import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Inicjalizacja bazy danych
const db = new Database(join(__dirname, "messages.db"));

// Tworzenie tabeli messages jeśli nie istnieje
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id TEXT NOT NULL,
    receiver_id TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT 0
  )
`);

// Endpointy API
app.post("/api/messages", (req, res) => {
   try {
      const { senderId, receiverId, title, content } = req.body;

      // Walidacja danych wejściowych
      if (!senderId || !receiverId || !title || !content) {
         return res.status(400).json({
            error: "Missing required fields",
            details: {
               senderId: !senderId ? "Sender ID is required" : null,
               receiverId: !receiverId ? "Receiver ID is required" : null,
               title: !title ? "Title is required" : null,
               content: !content ? "Message content is required" : null,
            },
         });
      }

      const stmt = db.prepare(`
      INSERT INTO messages (sender_id, receiver_id, title, content)
      VALUES (?, ?, ?, ?)
    `);

      const result = stmt.run(senderId, receiverId, title, content);
      res.json({ id: result.lastInsertRowid });
   } catch (error) {
      console.error("Error saving message:", error);
      res.status(500).json({ error: "Failed to save message" });
   }
});

app.get("/api/messages", (req, res) => {
   try {
      const stmt = db.prepare(`
         SELECT 
            id,
            sender_id as senderId,
            receiver_id as receiverId,
            title,
            content,
            timestamp,
            is_read as isRead
         FROM messages
         ORDER BY timestamp DESC
      `);

      const messages = stmt.all();
      res.json(messages);
   } catch (error) {
      console.error("Błąd podczas pobierania wiadomości:", error);
      res.status(500).json({ 
         error: "Nie udało się pobrać wiadomości",
         details: error.message 
      });
   }
});

app.get("/api/messages/:userId/unread", (req, res) => {
   try {
      const { userId } = req.params;
      const stmt = db.prepare(`
      SELECT * FROM messages 
      WHERE receiver_id = ? AND is_read = 0
      ORDER BY timestamp DESC
    `);

      const messages = stmt.all(userId);
      res.json(messages);
   } catch (error) {
      console.error("Error fetching unread messages:", error);
      res.status(500).json({ error: "Failed to fetch unread messages" });
   }
});

app.put("/api/messages/:messageId/read", (req, res) => {
   try {
      const { messageId } = req.params;
      const stmt = db.prepare(`
      UPDATE messages 
      SET is_read = 1 
      WHERE id = ?
    `);

      stmt.run(messageId);
      res.json({ success: true });
   } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ error: "Failed to mark message as read" });
   }
});

app.delete("/api/messages/:messageId", (req, res) => {
   try {
      const { messageId } = req.params;
      const stmt = db.prepare(`
      DELETE FROM messages 
      WHERE id = ?
    `);

      stmt.run(messageId);
      res.json({ success: true });
   } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ error: "Failed to delete message" });
   }
});

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});
