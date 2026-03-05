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

let myCookie = document.cookie;
document.getElementById('btn-search').addEventListener('click', function() {
    let departure = document.querySelector('#depart').value;
    let arrival = document.querySelector('#arrivee').value;
    let date = document.querySelector('#date').value;
    console.log(departure + ' ' + arrival + ' ' + date);
    fetch('http://localhost:3000/trips/request/' + departure +'/'+arrival+'/'+date)
    .then(response => response.json())
    .then(data => console.log(data))
})