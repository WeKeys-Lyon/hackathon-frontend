let cookie = document.cookie;
function addLine(tableau){
    console.log(tableau)
    tableau.sort((a,b) => moment(a.date) - moment(b.date));
    console.log(tableau)
    tableau.forEach(booking => {
        let heure = moment(booking.date).format('HH:mm');
        let diff = Math.round(moment().diff(booking.date,'minutes')/60)
        let difference = ``;
        if (diff > 0) {
           difference = `Train parti depuis ${diff} heures`;
        }  else {
            difference = `Départ dans ${Math.abs(diff)} heures`
        }
        document.querySelector('#card').innerHTML += `
        <div class ="trip-card">
                    <div class="route">${booking.trajet}</div>
                    <div class="time">${heure}</div>
                    <div class="price">${booking.price}€</div>
                    <div class="countdown">${difference}</div>
                </div>`;
    })
};

async function getBookings(cookie) {
    document.querySelector('#card').innerHTML += '<p>Mes réservations</p>';
    await fetch('http://localhost:3000/trips/allbookings', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'
    },
		body: JSON.stringify({ cookie: cookie}),
	}).then(response => response.json()).then( data => {
        console.log(data)
        if (data.voyages == 0 || data.result == false) {
            document.querySelector('#card').innerHTML += `
            <div style="margin-bottom: 25px">Les réservations sont vides, veuillez faire des achats de billets</div>`
        } else {
        addLine(data.voyages);
        }
        document.querySelector('#card').innerHTML += '<p id="greentext">Profitez de vos voyages avec Tickethack !</p>';

    })
};
getBookings(cookie)