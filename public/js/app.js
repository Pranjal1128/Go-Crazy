let socket = io();

const startingSection = document.querySelector('.starting-section');
const homeBtn = document.querySelector('.home-btn');
let crazyButton = document.getElementById('crazyButton');
const startButton = document.getElementById('startButton');

function hideStartButton() {
    startButton.style.display = "none";
    crazyButton.style.display = "block";
    startingSection.style.display = "none";
}

function resetToDefault() {
    startButton.style.display = "block";
    crazyButton.style.display = "none";
    startingSection.style.display = "block";
}

function goCrazy(offLeft, offTop) {
    let top, left;

    left = offLeft;
    top = offTop;

    crazyButton.style.top = top + 'px';
    crazyButton.style.left = left + 'px';
    crazyButton.style.animation = "none";
}

crazyButton.addEventListener('click', () => {
    socket.emit('crazyIsClicked', {
        offsetLeft: Math.random() * ((window.innerWidth - crazyButton.clientWidth) - 100),
        offsetTop: Math.random() * ((window.innerHeight - crazyButton.clientHeight) - 50)
    });
})

startButton.addEventListener('click', () => {
    socket.emit('startGame');
});

socket.on('startGame', () => {
    hideStartButton();
});

socket.on('crazyIsClicked', (data) => {
    goCrazy(data.offsetLeft, data.offsetTop);
}); 

homeBtn.addEventListener('click', () => {
    socket.emit('reset');
});

socket.on('reset', () => {
    resetToDefault();
});
