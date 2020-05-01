var stompClient = null; 

function connect() {
    var socket = new SockJS('/socket');
	stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/message', function(output){
        	chatOutput(JSON.parse(output.body));
        });
    });
}

function disconnect() {
    stompClient.disconnect();
    setConnected(false);
    console.log("Disconnected");
}

function setConnected(connected) {
    document.getElementById('connect').style.display = connected ? 'none' : 'block';
    document.getElementById('disconnect').style.visibility = !connected ? 'hidden' : 'visible';
    document.getElementById('userBlock').style.display = connected ? 'none' : 'block';
    document.getElementById('chatBlock').style.visibility = !connected ? 'hidden' : 'visible';
    document.getElementById('chatResponse').innerHTML = '';
}

function sendMssage() {
    var user = document.getElementById('user').value;
    var message = document.getElementById('message').value;
    stompClient.send("/app/send/message", {}, JSON.stringify({ 'user': user, 'message': message }));
    document.getElementById('message').value="";
}

Element.prototype.insertChildAtIndex = function(child, index) {
  if (!index) index = 0
  if (index >= this.children.length) {
    this.appendChild(child)
  } else {
    this.insertBefore(child, this.children[index])
  }
}

function chatOutput(jsonMsg) {
    var response = document.getElementById('chatResponse');
    var p = document.createElement('p');
	message = jsonMsg.user + " ("+
	    jsonMsg.dateTime +"): " +
	    jsonMsg.message;
    p.appendChild(document.createTextNode(message));
    p.classList.add("message");
    response.insertChildAtIndex(p, 0);
}