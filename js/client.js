const socket = io('http://localhost:8000');



const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');



var audio = new Audio('bing.mp3');



const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }

}



const name = prompt('Enter Your Name');
socket.emit('new-user-joined', name);


socket.on('user-joined', name => {
    append(`${name} Joined the Chat`, 'right')
})


socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})


socket.on('leave', name => {
    append(`${name} Left The Chat`, 'left')
})




form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
