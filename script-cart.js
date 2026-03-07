let cookie = document.cookie

function addTrip(tableau){
    for (let i=0; i < tableau.length; i++){
        let heure = moment(tableau[i].date).format('HH:mm');
        document.getElementById('card').innerHTML += `
        <div class="trip-card">
                    <div class="route"> ${tableau[i].trajet}</div>
                    <div class="time">${heure}</div>
                    <div class="price">${tableau[i].price} €</div>
                    <div><button class="delete-button" id="${tableau[i]._id}">x</button></div>
                </div>`
    }
};

async function getAllTrips(cookie) {
    document.querySelector('#card').innerHTML = '<p>Mon panier</p>';
   const response = await fetch('http://localhost:3000/trips/alltrips', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'
    },
		body: JSON.stringify({ cookie: cookie}),
	})
    const data = await response.json();
    if (data.voyages == 0 || data.result == false) {
        (document.querySelector('#card').children.length > 1) ? '' : document.getElementById('card').innerHTML += `
        <div style="margin-bottom: 25px">Le panier est vide, veuillez ajouter des trajets</div>`        
    } else {
    addTrip(data.voyages) }
    calculateTotalPrice();
}
function calculateTotalPrice() {
    document.querySelector('#total').textContent = '';
    let trajets = document.querySelectorAll('.price')
    let total = 0;
    
    trajets.forEach(trajet => {
        total += parseInt(trajet.innerHTML)
    });
    document.querySelector('#total').textContent = `Total : ${total}€`
};

getAllTrips(cookie);


document.querySelector('#card').addEventListener('click', async function(e) {
    console.log(e.target)
    if(e.target.className == "delete-button") {
        let id = e.target.id;
        await fetch('http://localhost:3000/trips/deleteatrip', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'
    },
		body: JSON.stringify({ cookie: cookie, id: id}),
	}).then(response => response.json()).then(async data => await getAllTrips(cookie))
        
    }
});

document.querySelector('#purchase-button').addEventListener('click', function() {
    let allTrips = document.querySelectorAll('.trip-card');
    
    allTrips.forEach(async trajet => {
        
        const response = await fetch('http://localhost:3000/trips/addtobooking', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'
    },
		body: JSON.stringify({ cookie: cookie, cartId: trajet.children[3].firstElementChild.id}),
	})
        const data = await response.json();
        data
        await getAllTrips(cookie);
    })
    
})