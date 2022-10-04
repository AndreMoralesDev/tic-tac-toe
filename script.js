const d = document;
let items = new Array(9).fill("").map((e,i)=> d.getElementById(`item${++i}`));
let continuar = true;
let winner = "ellipse-outline"
const $btnStartGame = d.getElementById("btn-start-game");
const $grid = d.querySelector("main");
const $btnInGame = d.getElementById("btn-in-game");
const $btnBack = d.getElementById("btn-back");
const $btnRetry = d.getElementById("btn-retry");
const $btnOnePlayer = d.getElementById("btn-one-player");
const $btnTwoPlayers = d.getElementById("btn-two-players");
const $body = d.querySelector("body");
const $blockScreen = d.querySelector(".block-screen");
const $audioPop = d.getElementById("audio-pop");
const $audioGameOver = d.getElementById("audio-game-over");
const $audioWinner = d.getElementById("audio-winner");
const $audioTransition = d.getElementById("audio-transition");

let onePlayer = false;
let attempPlayer = 0;

const ganador = () => {
    let res = items.map(e => e.getAttribute("name"));
    let resWin = false;
    for (let i = 0; i < 2;  i++) {
        if (
            (res[0] === winner && res[1] === winner && res[2] === winner) ||
            (res[3] === winner && res[4] === winner && res[5] === winner) ||
            (res[6] === winner && res[7] === winner && res[8] === winner) ||
            (res[0] === winner && res[3] === winner && res[6] === winner) ||
            (res[1] === winner && res[4] === winner && res[7] === winner) ||
            (res[2] === winner && res[5] === winner && res[8] === winner) ||
            (res[0] === winner && res[4] === winner && res[8] === winner) ||
            (res[2] === winner && res[4] === winner && res[6] === winner)
        ) resWin = true;
        if (!resWin) winner = "close-outline"
    }
    if (!resWin) winner = "ellipse-outline"
    return resWin;
}
const deshabilitarOpciones = () => items.forEach(e => e.style.pointerEvents = "none")
const habilidarOpciones = () => items.forEach(e => e.style.pointerEvents = "auto")

const validarGanador = () =>{
    if (ganador()) {
        deshabilitarOpciones();
        attempPlayer = 0;
        continuar = false;
        if (winner === "ellipse-outline") {
            d.querySelector("body").style.backgroundColor = "#2c2";
            $audioWinner.play()
        } else {
            d.querySelector("body").style.backgroundColor = "#c22";
            $audioGameOver.play();
        } 
    } else {
        let res = items.filter(e=>e.getAttribute("name") === null).length;
        if (!res) {
            continuar = false;
            $body.style.backgroundColor = "#e47124";
        }
    }
}

const reiniciarControles = () => {
    $body.style.backgroundColor = "#cdd86f";
    res = [...d.getElementsByClassName("grid-item")]
    res.map(e=>e.removeChild(e.querySelector("ion-icon")))
    for (let i = 1; i <= 9; i++) {
        let ionIcon = d.createElement("ion-icon");
        ionIcon.classList.add("option")
        ionIcon.setAttribute("id",`item${i}`)
        res[i-1].appendChild(ionIcon);
    }
    items = new Array(9).fill("").map((e,i)=> d.getElementById(`item${++i}`));
    continuar = true;
}

const turnoMaquina = () => {
    $blockScreen.style.display = "inline-block"
    let opcion;
    setTimeout(() => {
        do opcion = items[Math.round(Math.random() * 8)] 
        while (opcion.getAttribute("name") !== null)
        opcion.setAttribute("name","close-outline");
        opcion.classList.add("close-outline-icon");
        $audioPop.play();
        $blockScreen.style.display = "none";
        validarGanador()
    }, 1000);
}

const botonesJugadores = () => {
    $audioTransition.play();
    $btnInGame.classList.replace("display-none","btn-in-game-container");
    $grid.classList.remove("display-none");
    $btnOnePlayer.classList.add("display-none");
    $btnTwoPlayers.classList.add("display-none");
}

d.addEventListener("click", e => {
    if (items.includes(e.target)){
        let option = items[items.indexOf(e.target)];
        if (onePlayer){
            option.setAttribute("name","ellipse-outline");
            validarGanador();
            if (continuar) turnoMaquina();
        } else {
            if (attempPlayer % 2 === 0) option.setAttribute("name","ellipse-outline")
            else {
                option.setAttribute("name","close-outline");
                option.classList.add("close-outline-icon");
            }
            attempPlayer ++;
            validarGanador();
        }
        option.style.pointerEvents = "none";
        $audioPop.play();
    }
    if(e.target === $btnStartGame){
        $audioTransition.play();
        $btnStartGame.classList.add("display-none");
        $btnOnePlayer.classList.remove("display-none");
        $btnTwoPlayers.classList.remove("display-none");
    }
    if(e.target === $btnOnePlayer){
        botonesJugadores();
        onePlayer = true;
        turnoMaquina();
    }
    if(e.target === $btnTwoPlayers){
        botonesJugadores();
    }
    if(e.target === $btnBack){
        $audioTransition.play();
        $btnInGame.classList.replace("btn-in-game-container","display-none");
        $grid.classList.add("display-none");
        $btnOnePlayer.classList.remove("display-none");
        $btnTwoPlayers.classList.remove("display-none");
        reiniciarControles();
        onePlayer = false;
    }
    if(e.target === $btnRetry){
        $audioTransition.play();
        reiniciarControles();
        if (onePlayer) turnoMaquina();
    }
})