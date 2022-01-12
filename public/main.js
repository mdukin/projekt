
const peer = new Peer()
var conn =null;

let njegovIzbor = null;
let mojIzbor = null;
let bitka = document.createElement("div")
let njegov = document.createElement("h1")

var ourId = document.getElementById("this_id");
var idInput = document.getElementById("id");
var connectButton = document.getElementById("connect-button");
if(connectButton)
connectButton.addEventListener('click', join);

function game(gumb_data){ 
  mojIzbor = gumb_data
  document.getElementById("game").style.display = "none";
  bitka.style.display = "flex";
  bitka.style.justifyContent = "space-evenly"
  let moj = document.createElement("h1")
  moj.innerText = mojIzbor.toUpperCase()
  let vs = document.createElement("div")
  vs.innerText = "VS"
  vs.style.fontSize = "100px";

  bitka.append( moj)
  bitka.append(vs)
  bitka.append(njegov)
  document.body.append(bitka)

  conn.send(mojIzbor)
  played = true;
  if(njegovIzbor != null) gameOver()
  
}

function gameOver(){

  njegov.innerText = njegovIzbor.toUpperCase()
  let rez = document.createElement("h1")
  rez.id = "rez";
  if(mojIzbor == "skare" && njegovIzbor == "papir" || 
  mojIzbor == "papir" && njegovIzbor == "kamen" ||
  mojIzbor == "kamen" && njegovIzbor == "skare") rez.innerText = "POBJEDA"
  else if(mojIzbor == njegovIzbor) rez.innerText = "REMI"
  else rez.innerText = "PORAZ"

  document.body.append(rez)

}


function connListeners(){
  conn.on('open', function () {       
    document.getElementById("game").style.display = "flex";
    let top = document.getElementById("top_join")
    if(top){  
      top.innerText ="connected to:\n "  + conn.peer ;
      document.body.removeChild(document.getElementById("connect"))
    }
 });     

  conn.on('data', function(data){
    njegovIzbor = data;
    if(mojIzbor) gameOver()
  });
}

function join() {
    if (conn) {
        conn.close();
    }

    conn = peer.connect(idInput.value);   
    
    connListeners()
                   
 };

 peer.on('connection', function(c) {
   if(conn) return
  conn = c;
  let top = document.getElementById("top_create")
  top.append(document.createElement('br'));
  top.append(document.createElement('br'));
  top.append("someone connected to me");
  connListeners()
});

peer.on('open', function(id) {
  if(ourId)
  ourId.innerText = id;
  console.log('My peer ID is: ' + id);
});