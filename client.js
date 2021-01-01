// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');
const submitButton = document.getElementById("submit-message");

// Connected to the WebSocket Server
socket.addEventListener('open', function (event) {
    console.log("connected")
    if (socket.readyState === WebSocket.OPEN ) {
        document.getElementById("status").innerHTML = "ONLINE";
    }
});
// Disconnected from the WebSocket Server
socket.addEventListener('close', function (event) {
    if (socket.readyState === WebSocket.CLOSED ) {
        document.getElementById("status").innerHTML = "OFFLINE";
    }
});
// Listen for messages
socket.addEventListener('message', function (event) {
    insertMessage("server",event.data); 
});
const sendMsg = () => {
    const message = document.getElementById("message-input");
    if (message.value) {
        insertMessage("client",message.value);
        if (socket.readyState == WebSocket.CLOSED) {
            insertMessage("server","Server is offline.")
        } else{
            socket.send(message.value);
        }
        message.value = "";
        
    }
}
// Create a message box for sent message
const insertMessage = (from,messageData) => {
    let messageWrapper = document.createElement("div");
    if (from === "client") {
        messageWrapper.classList.add("sent-message");
    } else if(from === "server"){
        messageWrapper.classList.add("incoming-message");   
    }
    messageWrapper.innerText = messageData;
    document.querySelector(".messages").appendChild(messageWrapper);
    let messages = document.querySelector(".messages");
    messages.scrollTop = messages.scrollHeight;
}
