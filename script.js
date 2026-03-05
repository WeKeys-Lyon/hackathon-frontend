//Creation d'un cookie
function createCookie() { 
  var now = new Date();
  var time = now.getTime();
  var expireTime = time + 1000*36000;
  now.setTime(expireTime);
  number =  Math.floor(Math.random() * 50000);
    (!document.cookie) ? document.cookie = 'cookie='+number+';expires='+now.toUTCString()+';path=/' : '';
  }
createCookie();
document.getElementById('date').valueAsDate = new Date();

//Création div des résultat
function createDivResult(object) {
    //faire le calcule de l'heure du voyage
    let heure = moment(object.date['$date']).format('HH:mm'); //Moment
    document.getElementById('card-right').innerHTML += `
    <div class="voyage">
      <div class="trajetName">${object.departure} > ${object.arrival}</div>
      <div class="heure">${heure}</div>
      <div class="prix">${object.price}</div>
      <div style="content-visibility: hidden">${object.date['$date']}</div>
      <div class="book-btn"><button type="button">Book</div>
    </div>`
} 

function addToCart(object, cookie){
  let {trajet, date, prix} = object;
  console.log(trajet)
  fetch('http://localhost:3000/trips/addtocart', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
		body: JSON.stringify({ cookie: cookie, trajet: trajet, date: date, prix: prix }),
	}).then(response => response.json()).then(data => console.log(data))
}

let myCookie = document.cookie;
document.getElementById('btn-search').addEventListener('click',function() {
    let departure = document.querySelector('#depart').value;
    let arrival = document.querySelector('#arrivee').value;
    let date = document.querySelector('#date').value;
    console.log(departure + ' ' + arrival + ' ' + date);
    fetch('http://localhost:3000/trips/request/' + departure +'/'+arrival+'/'+date)
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        console.log(data)
        document.querySelector('.trip').remove();
        data.trips.forEach(element => createDivResult(element))
      }
    });
    let x = document.getElementById('card-right')
    document.getElementById('card-right').addEventListener('click', async (e) => {
      if(e.target.parentElement.classList.contains('book-btn')) {
        console.log(e.target.parentElement.parentElement);
        let cartObject = {};
        cartObject = {
          trajet: e.target.parentElement.parentElement.children[0].innerText,
          date: e.target.parentElement.parentElement.children[3].firstChild.data,
          prix: e.target.parentElement.parentElement.children[2].innerText
        }
        let cookie = document.cookie;
        console.log(cartObject + cookie)
        await addToCart(cartObject, cookie)
      }
});


});
