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
    let heure = ''; //Moment
    document.getElementById('card-right').innerHTML += `
    <div class="voyage">
      <div class="trajetName">${object.departure} > ${object.arrival}</div>
      <div class="heure">${heure}</div>
      <div class="prix">${object.price}</div>
      <div class="book-btn"><button type="button">Book</div>
    </div>`
} 

let myCookie = document.cookie;
document.getElementById('btn-search').addEventListener('click', function() {
    let departure = document.querySelector('#depart').value;
    let arrival = document.querySelector('#arrivee').value;
    let date = document.querySelector('#date').value;
    console.log(departure + ' ' + arrival + ' ' + date);
    fetch('http://localhost:3000/trips/request/' + departure +'/'+arrival+'/'+date)
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        document.querySelector('.trip').remove();
        data.trips.forEach(element => createDivResult(element))
      }
    })
});

document.getElementById('card-right').addEventListener('click', function() {
  console.log(this);
})