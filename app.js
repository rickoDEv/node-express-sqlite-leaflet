const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/add-location', (req, res) => {

    const { name, lat, long } = req.body;

    db.run('INSERT INTO locations (name, lat, long) VALUES (?, ?, ?)', [name, lat, long], (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('/');
    });
});

app.get('/locations', (req, res) => {
    db.all('SELECT * FROM locations', [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.json(rows);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
