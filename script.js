//Creation d'un cookie
function createCookie() { 
  var now = new Date();
  var time = now.getTime();
  var expireTime = time + 1000*36000;
  now.setTime(expireTime);
  number =  Math.floor(Math.random() * 50000);
    (!document.cookie) ? document.cookie = 'cookie='+number+';expires='+now.toUTCString()+';path=/' : '';
  }
(document.cookie) ? '' : createCookie();
document.getElementById('date').valueAsDate = new Date();

//Création div des résultat
function createDivResult(object) {
    //faire le calcule de l'heure du voyage
    let heure = moment(object.date['$date']).format('HH:mm'); //Moment
    document.getElementById('card-right').innerHTML += `
    <div class="voyage">
      <div class="trajetName">${object.departure} > ${object.arrival}</div>
      <div class="heure">${heure}</div>
      <div class="prix">${object.price} €</div>
      <div style="content-visibility: hidden">${object.date['$date']}</div>
      <div class="book-btn"><button type="button">Book</div>
    </div>`
} 

async function addToCart(object, cookie){
  let {trajet, date, prix} = object;
  console.log(trajet)
  await fetch('http://localhost:3000/trips/addtocart', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'
    },
		body: JSON.stringify({ cookie: cookie, trajet: trajet, date: date, price: parseInt(prix) }),
	}).then(response => response.json()).then(data => console.log(data))
}

let myCookie = document.cookie;
document.getElementById('btn-search').addEventListener('click',function() {
    let departure = document.querySelector('#depart').value.trim();
    let arrival = document.querySelector('#arrivee').value.trim();
    let date = document.querySelector('#date').value;
    console.log(departure + ' ' + arrival + ' ' + date);
    fetch('http://localhost:3000/trips/request/' + departure +'/'+arrival+'/'+date)
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        
         if (document.querySelector('.trip')) {document.querySelector('#card-right').innerHTML = '';
         } else {document.getElementById('card-right').innerHTML = '';}
        data.trips.forEach(element => createDivResult(element))
        document.getElementById('card-right').style.width = '33vw';
        document.getElementById('card-right').style.minWidth = '316px';
      } else {
        if (document.querySelector('.trip')) {
          document.querySelector('.trip').innerHTML = `
        
                    <img id = 'loupe' src='./images/notfound.png'>
                    <p id='bookyourtrip'>Je n'ai pas trouvé de trajet pour vos choix</p>
          `
        } else {
          document.getElementById('card-right').style.width = '25vw';
                    document.querySelector('#card-right').innerHTML = `
          <div class="trip">
                    <img id = 'train' src='./images/notfound.png'>
                    <p id='bookyourtrip'>Je n'ai pas trouvé de trajet pour vos choix</p>
                </div>`
        }
        
      }
    });
});

let x = document.getElementById('card-right')
document.getElementById('card-right').addEventListener('click', async (e) => {
  if(e.target.parentElement.classList.contains('book-btn')) {
    
    let cartObject = {};
    cartObject = {
      trajet: e.target.parentElement.parentElement.children[0].innerText,
      date: e.target.parentElement.parentElement.children[3].firstChild.data,
      prix: e.target.parentElement.parentElement.children[2].innerText
    }
    let cookie = document.cookie;
    
    await addToCart(cartObject, cookie)
  }
});
