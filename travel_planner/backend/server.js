const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Charger les données de voyage depuis un fichier JSON
function loadTrips() {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'trips.json'), 'utf-8');
    return JSON.parse(data);
}

// Sauvegarder les données de voyage dans un fichier JSON
function saveTrips(trips) {
    fs.writeFileSync(path.join(__dirname, 'data', 'trips.json'), JSON.stringify(trips, null, 2));
}

// Route pour récupérer tous les voyages
app.get('/api/trips', (req, res) => {
    const trips = loadTrips();
    res.json(trips);
});

// Route pour ajouter un voyage
app.post('/api/trips', (req, res) => {
    const trips = loadTrips();
    const newTrip = req.body;
    trips.push(newTrip);
    saveTrips(trips);
    res.status(201).json(newTrip);
});

// Route pour ajouter une activité à un voyage
app.post('/api/trips/:id/activities', (req, res) => {
    const trips = loadTrips();
    const trip = trips.find(t => t.id === req.params.id);
    if (trip) {
        trip.activities.push(req.body);
        saveTrips(trips);
        res.status(201).json(req.body);
    } else {
        res.status(404).send('Voyage non trouvé');
    }
});

// WebSocket pour le chat en temps réel
io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');
    
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message); // Diffuser le message à tous les utilisateurs
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur a quitté');
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
