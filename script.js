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
