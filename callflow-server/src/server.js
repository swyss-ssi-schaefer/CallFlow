// server.js
const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3000;

// Geheimschlüssel für JWT
const SECRET_KEY = 'dein-geheimer-schluessel';

// Middleware zum Parsen von JSON
app.use(express.json());

// Mock-Datenbank für Benutzer
let users = [
  { id: 1, username: 'admin', password: '$2a$10$XzTg0lgLg2rVRkp0vJ5N8R8U4ziWZQF5X.fXz7EziPtxuHKsiP8ou', role: 'admin' }, // Passwort: 'admin123'
  { id: 2, username: 'superadmin', password: '$2a$10$XzTg0lgLg2rVRkp0vJ5N8R8U4ziWZQF5X.fXz7EziPtxuHKsiP8ou', role: 'superadmin' } // Passwort: 'admin123'
];

// Anmelde-Route (Login)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Überprüfe, ob der Benutzer existiert
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).send('Benutzer nicht gefunden');
  }

  // Überprüfe das Passwort
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (!isMatch) {
      return res.status(400).send('Falsches Passwort');
    }

    // JWT erstellen
    const payload = {
      userId: user.id,
      role: user.role
    };
    const token = jwt.encode(payload, SECRET_KEY);

    res.json({ token });
  });
});

// Middleware zum Überprüfen des JWT und der Benutzerrolle
function checkAuth(roles = []) {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send('Kein Token bereitgestellt');
    }

    try {
      const decoded = jwt.decode(token, SECRET_KEY);
      
      // Überprüfe, ob die Rolle des Benutzers der zugelassenen Rolle entspricht
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).send('Zugriff verweigert: Unzureichende Berechtigungen');
      }

      // Benutzerinformationen in der Anfrage speichern
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).send('Ungültiges Token');
    }
  };
}

// Beispiel für eine geschützte Route (nur Superadmins haben Zugriff)
app.get('/admin', checkAuth(['superadmin']), (req, res) => {
  res.send('Willkommen, Superadmin!');
});

// Beispiel für eine geschützte Route (Admins haben Zugriff)
app.get('/admin-dashboard', checkAuth(['admin', 'superadmin']), (req, res) => {
  res.send('Willkommen im Admin-Dashboard!');
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
