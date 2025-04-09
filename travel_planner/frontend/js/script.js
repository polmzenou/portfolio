document.getElementById('theme-switch').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Charger les voyages
fetch('/api/trips')
    .then(response => response.json())
    .then(trips => {
        const tripList = document.getElementById('trip-list');
        trips.forEach(trip => {
            const tripElement = document.createElement('div');
            tripElement.innerHTML = `
                <h2>${trip.name}</h2>
                <p>Budget: ${trip.budget}€</p>
                <button onclick="viewTrip('${trip.id}')">Voir</button>
            `;
            tripList.appendChild(tripElement);
        });
    });

// Afficher un voyage
function viewTrip(id) {
    // Redirection ou affichage détaillé du voyage
    alert('Voir le voyage ' + id);
}

async function fetchTrips() {
    const response = await fetch('http://localhost:5000/api/trips'); // Assure-toi que l'URL correspond bien à celle du serveur backend
    const trips = await response.json();
    console.log(trips); // Vérifie dans la console si les données sont bien récupérées
    // Ensuite, tu peux ajouter du code pour afficher ces données sur la page.
  }
  