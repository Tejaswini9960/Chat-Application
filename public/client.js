


const socket = io();
let name1;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do {
    name1 = prompt('Please enter your name: ');
    if (name1 === null) {
        alert('Name is required to join the chat');
    }
} while (!name1);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: name1,
        message: message.trim()
    };
    // Append 
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    // Send to server 
    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

// Receive messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}
