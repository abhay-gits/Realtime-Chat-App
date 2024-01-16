let tone = new Audio('tone.mp3')
const socket = io();
const messages = document.querySelector('#messages');
const form = document.getElementById('form')
const btn = document.getElementById('sendBtn')
const startBtn = document.getElementById('startBtn')

/* -------------First Page----------------- */
startBtn.addEventListener('click', namefun);
function namefun() {
    const name = document.getElementById('name');
    userName = name.value;
    document.getElementById('firstPage').style.display = "none";
    document.getElementById('container').style.display = "block";
    socket.emit('chat message', `<u>${userName} connected</u>`);
    return userName;
}
let userName = "User";
userName = namefun;
/* --------Input taking $ Emitting--------- */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let input = document.getElementById('input');
    let inputData = `${userName}  ):  ${input.value}`;
    if (input.value) {
        socket.emit('chat message', inputData);
        whoseMessage(true, input.value)
        input.value = "";
    }
})

/* -----------Recieving------------ */
socket.on('chat message', (message) => {
    whoseMessage(false, message);
    tone.play();
})
/* --------------Main Function------------ */
function whoseMessage(mine, message) {
    const li = document.createElement('li');
    if (mine) {
        li.classList.add("right")
    }
    else if (!mine) {
        li.classList.add("left")
    }
    li.innerHTML = message;
    messages.appendChild(li);
    autoScroll();
}

/* ------------Auto Scroll--------------- */
const area = document.getElementById('area')
function autoScroll() {
    area.scrollTo(0, area.scrollHeight)
}
/* --------------Online Status------------ */
socket.on('total-users', (data) => {
    document.getElementById('total-users').textContent = data;
})

