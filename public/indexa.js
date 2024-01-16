const socket = io();
const tone = new Audio('tone.mp3')
socket.on('total-users', (data) => {
    document.getElementById('total-users').textContent = data;

})
const messages = document.querySelector('#messages');
const form = document.getElementById('form')
const input = document.getElementById('input').value;
const btn = document.getElementById('sendBtn')
const clear = document.getElementById('clear');

const startBtn = document.getElementById('startBtn')
let userName = "User";

startBtn.addEventListener('click', namefun);
function namefun() {
    const name = document.getElementById('name');
    userName = name.value;
    document.getElementById('firstPage').style.display = "none";
    document.getElementById('container').style.display = "block";
    socket.emit('chat message', `<u>${userName} connected</u>`);
    return userName;
}
userName = namefun;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    /* -----------------Emit--------------- */
    if (input.value) {
        socket.emit('chat message',input /* `${userName}  ):  ${input.value}` */);
        whoseMessage(true,input)
        input.value = "";
    }

})

socket.on('chat message', (message) => {
    whoseMessage(false,message)
    /* const li = document.createElement('li');
    li.innerHTML = message;
    messages.appendChild(li);
    tone.play();
    autoScroll();
    clear.addEventListener('click', () => {
        messages.removeChild(li);
    }) */
})

const area = document.getElementById('area')
function autoScroll(){
    area.scrollTo(0,area.scrollHeight)
}

function whoseMessage(mine,data){
    const element =`
    <li class="${whoseMessage?'left':'right'}">
        ${data}
        </li>`
        messages.innerHTML += element;
}