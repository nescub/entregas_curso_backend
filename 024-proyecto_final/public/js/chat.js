const socket = io.connect()

async function sendMessage() {
    const newMessage = {
        author: document.getElementById('message_dir_email').value,
        text: document.getElementById('message_text').value
    }

    socket.emit('new-message', newMessage)
}

function renderMessages(messages) {
    const html = messages.map((elem, index) => {
        return(`<div>
            <strong style="color:blue;">${elem.author}</strong>
            <span style="color:brown;">[${elem.dateTime}]:</span>
            <em style="color:green;">${elem.text}</em>
            </div>`)
    }).join(" ")

    document.getElementById('MessageList').innerHTML = html
}

socket.on('message-list', messages => { renderMessages(messages) })
socket.on('message-error', error => { alert(error.description ) })

