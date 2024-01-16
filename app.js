const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path')

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;

/*  */
app.use(express.static('public'));
const cors = require('cors');
app.use(cors());
/*  */

/* ------------------------Sockets--------------------------------- */
let totalSockets = new Set();
io.on('connection', mainConnection)
/* Connection Handling */
function mainConnection(socket) {
    console.log(socket.id)
    totalSockets.add(socket.id)
    io.emit('total-users', totalSockets.size)

    /* Message Handling */
    socket.on('chat message', (message) => {
        socket.broadcast.emit('chat message', message);
    })
    /* Disconection Handling */
    socket.on('disconnect', () => {
        console.log(socket.id)
        io.emit('chat message', "<u>Someone Disconnected</u>");
        totalSockets.delete(socket.id)
        io.emit('total-users', totalSockets.size)
    })
}

/* ------------------------Get Requests--------------------------------- */
app.get('/', (req, res) => {
    const realPath = path.join(__dirname, "index.html")
    res.sendFile(realPath)
})

app.get('/index.js', (req, res) => {
    res.type('text/css');
    res.sendFile(__dirname + '/index.js');
});

app.get("/public/style.css", (req, res) => {
    res.type('text/css');
    res.sendFile(__dirname + '/style.css');
});
/* ---------------------------Port Forwarding---------------------------- */

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
})