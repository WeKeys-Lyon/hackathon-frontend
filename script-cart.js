let cookie = document.cookie

function addTrip(tableau){
    
    for (let i=0; i < tableau.length; i++){
        console.log(tableau[i])
        let heure = moment(tableau[i].date).format('HH:mm');
        document.getElementById('card').innerHTML += `
        <div id="trip-card">
                    <span class="route"> ${tableau[i].trajet}</span>
                    <span class="time">${heure}</span>
                    <span class="price">${tableau[i].price} €</span>
                    <button class="delete-button" id="${tableau[i]._id}">x</button>
                </div>`
    }
}
async function getAllTrips(cookie) {
   await fetch('http://localhost:3000/trips/alltrips', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'
    },
		body: JSON.stringify({ cookie: cookie}),
	}).then(response => response.json()).then(data => {
        console.log(data.voyages)
        addTrip(data.voyages)

    })
}

getAllTrips(cookie);