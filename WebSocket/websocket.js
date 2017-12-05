var url = document.getElementById("WSSURL");
var eventValue = document.getElementById("eventType");


//websocket 有4个方法onopen(evt), onmessage(evt), onerror(evt), onclose(evt); 可以用来获取response的data
var okCoinWebSocket = {};
okCoinWebSocket.init = function(uri){ 	
	this.wsuri = uri
	okCoinWebSocket.webSocket = new WebSocket(okCoinWebSocket.wsuri);
 } 

 function writeToScreen(message){
	document.getElementById("output").innerHTML += message+ "</br>";
} 

function onOpen(evt){
	if(okCoinWebSocket.webSocket.readyState =0){
		console.log("connecting")
	}
	if(okCoinWebSocket.webSocket.readyState =1){
		console.log("open")
		writeToScreen("Connected");	
	}
	
}

function onMessage(message){
	console.log(message.data);
	var messageArray = JSON.parse(message.data)
	createTable(messageArray);
}

function createTable(array){
	var str = '<table border="1">'
	for(var i=0; i < array.length; i++){
		str +='<tr>';
		for(var j in array[i]){
			str += '<td>' + JSON.stringify(array[i][j]) + '</td>'
		}
		str += '</tr>'
	}
	str += '</table>'
	writeToScreen(str);
}

function onError(evt){
	writeToScreen('<span style="color:red">ERROR: </span>' + evt.data)
}

function onClose(evt){
	if(okCoinWebSocket.webSocket.readyState=2){
		console.log("closing")
	}
	if(okCoinWebSocket.webSocket.readyState=3){
		console.log("closed")
		writeToScreen("Disconnect")
	}
	
}

function tryToConnect(){
	okCoinWebSocket.init(url.value);
	okCoinWebSocket.webSocket.onopen = function(evt){
		onOpen(evt)
	}
}

function doSend(message){
	writeToScreen("Send: "+message);
	okCoinWebSocket.webSocket.send(message)

}

function tryToSend(){
	doSend(eventValue.value);
	okCoinWebSocket.webSocket.onmessage = function(evt){
		onMessage(evt)
	}
	okCoinWebSocket.webSocket.onerror = function(evt){
		onError(evt)
	}
}

function tryToDisconnect(){
	okCoinWebSocket.webSocket.close()
	okCoinWebSocket.webSocket.onclose = function(evt){
		onClose(evt)
	}
}

function tryToClearScreen(){
	var parentNode=document.getElementById("output");
 	var children=parentNode.childNodes;
	for(i=children.length-1; i>=0; i--){
		parentNode.removeChild(children[i])
	} 
} 




	








		