document.getElementById('send-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        addMessage(userInput, 'user');
        sendToBackend(userInput);
        document.getElementById('user-input').value = '';
    }
});

function addMessage(message, sender) {
    const outputSection = document.getElementById('output-section');
    const messageElement = document.createElement('div');
    messageElement.classList.add('output-message', sender);
    messageElement.textContent = message;
    outputSection.appendChild(messageElement);
    outputSection.scrollTop = outputSection.scrollHeight;
}

function sendToBackend(message) {
    fetch('/api/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'message': message })
    })
    .then(response => response.json())
    .then(data => {
        addMessage(data.reply, 'ai');
    })
    .catch(error => {
        console.error('Errore:', error);
    });
}
